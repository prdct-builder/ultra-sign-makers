import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfigFromFile, type Plugin } from 'vite'
import type { SiteMeta } from '../src/platform/site/types'
import { validateSiteMeta } from '../src/platform/site/validate'
import { themeToCss } from '../src/platform/theme/themeToCss'
import { storageKeyFor } from '../src/platform/theme/colorSchemeKey'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const SITES_DIR = path.join(ROOT, 'src/sites')

const VIRTUAL_ID = 'virtual:sites'
const RESOLVED_ID = '\0' + VIRTUAL_ID

/** Every folder in src/sites with a site.ts is a site. Discovery runs at build time only. */
export function siteFolders(): string[] {
  return fs
    .readdirSync(SITES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(SITES_DIR, d.name, 'site.ts')))
    .map((d) => d.name)
    .sort()
}

/** Loads each site's Node-safe site.ts (TypeScript, via Vite's own loader) and validates it. */
export async function discoverSites(): Promise<SiteMeta[]> {
  const sites: SiteMeta[] = []
  const errors: string[] = []
  for (const folder of siteFolders()) {
    const file = path.join(SITES_DIR, folder, 'site.ts')
    const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' }, file, ROOT, 'silent')
    const meta = loaded?.config as unknown as SiteMeta | undefined
    if (!meta) {
      errors.push(`${folder}: site.ts has no default export`)
      continue
    }
    if (meta.id !== folder) errors.push(`${folder}: id "${meta.id}" must match its folder name`)
    errors.push(...validateSiteMeta(meta))
    sites.push(meta)
  }
  if (errors.length) throw new Error(`Invalid site configuration:\n  - ${errors.join('\n  - ')}`)
  return sites
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Everything a crawler or link preview reads, rendered into index.html for one site. */
export function renderHead(site: SiteMeta): string {
  const { seo, url, theme, features } = site
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}">`,
    `<meta name="theme-color" content="${escape(seo.themeColor)}">`,
    `<meta name="color-scheme" content="${features.darkMode ? 'light dark' : 'light'}">`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`,
    `<link rel="apple-touch-icon" href="/favicon.svg">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escape(site.name)}">`,
    `<meta property="og:title" content="${escape(seo.title)}">`,
    `<meta property="og:description" content="${escape(seo.description)}">`
  ]
  if (url) {
    tags.push(`<link rel="canonical" href="${escape(url)}/">`, `<meta property="og:url" content="${escape(url)}/">`)
    if (seo.ogImage) {
      tags.push(
        `<meta property="og:image" content="${escape(`${url}/${seo.ogImage.replace(/^\//, '')}`)}">`,
        `<meta name="twitter:card" content="summary_large_image">`
      )
    }
  }
  if (theme.fonts.stylesheet) {
    tags.push(
      `<link rel="preconnect" href="https://fonts.googleapis.com">`,
      `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
      `<link id="site-fonts" rel="stylesheet" href="${escape(theme.fonts.stylesheet)}">`
    )
  }
  tags.push(`<style id="site-theme" data-site="${site.id}">\n${themeToCss(site.id, theme)}</style>`)

  // Apply the saved/OS colour scheme before Vue mounts, so there's no flash of the wrong theme.
  const key = JSON.stringify(storageKeyFor(site.id))
  tags.push(
    features.darkMode
      ? `<script>(function(){try{var s=localStorage.getItem(${key});var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();</script>`
      : `<script>document.documentElement.style.colorScheme='light'</script>`
  )
  return tags.map((t) => `  ${t}`).join('\n')
}

interface Options {
  sites: SiteMeta[]
  /** The site being built, or the default site in dev. */
  activeId: string
  command: 'build' | 'serve'
}

export function multiSite({ sites, activeId, command }: Options): Plugin {
  const active = sites.find((s) => s.id === activeId)
  if (!active) throw new Error(`Unknown site "${activeId}". Sites: ${sites.map((s) => s.id).join(', ')}`)
  // A production build contains one site only; dev serves all of them.
  const included = command === 'build' ? [active] : sites
  const entry = (id: string) => `/src/sites/${id}/index.ts`

  return {
    name: 'multi-site',

    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined
    },

    load(id) {
      if (id !== RESOLVED_ID) return
      const index = JSON.stringify(included.map(({ id, name, domains }) => ({ id, name, domains })))
      if (command === 'build') {
        return [
          `import site from ${JSON.stringify(entry(active.id))}`,
          `export const siteIndex = ${index}`,
          `export const defaultSiteId = ${JSON.stringify(active.id)}`,
          `export const allowPathPrefix = false`,
          `export async function loadSite() { return site }`
        ].join('\n')
      }
      const loaders = included.map((s) => `  ${JSON.stringify(s.id)}: () => import(${JSON.stringify(entry(s.id))})`).join(',\n')
      return [
        `const loaders = {\n${loaders}\n}`,
        `export const siteIndex = ${index}`,
        `export const defaultSiteId = ${JSON.stringify(active.id)}`,
        `export const allowPathPrefix = true`,
        `export async function loadSite(id) { return (await loaders[id]()).default }`
      ].join('\n')
    },

    transformIndexHtml(html) {
      return html
        .replace('<html lang="en">', `<html lang="${escape(active.locale)}" data-site="${active.id}">`)
        .replace('<!-- site:head -->', renderHead(active).trimStart())
    },

    // Dev only: /<site-id>/favicon.svg etc. come from that site's public/ folder.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const [, siteId, ...rest] = (req.url ?? '').split('?')[0].split('/')
        if (!rest.length || !sites.some((s) => s.id === siteId)) return next()
        const publicDir = path.join(SITES_DIR, siteId, 'public')
        const file = path.join(publicDir, ...rest.map(decodeURIComponent))
        if (!file.startsWith(publicDir + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        res.setHeader('Content-Type', file.endsWith('.svg') ? 'image/svg+xml' : 'application/octet-stream')
        fs.createReadStream(file).pipe(res)
      })
    }
  }
}
