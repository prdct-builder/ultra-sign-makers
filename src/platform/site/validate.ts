import type { ColorScale, Theme } from '../theme/types'
import { isHex } from '../theme/themeToCss'
import type { LinkTarget, SectionConfig, SiteConfig, SiteMeta } from './types'

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function checkScale(errors: string[], name: string, scale: ColorScale | undefined) {
  if (!scale) return errors.push(`theme.palette.${name} is missing`)
  for (const step of STEPS) {
    if (!isHex(scale[step] ?? '')) errors.push(`theme.palette.${name}.${step} must be a hex colour, got "${scale[step]}"`)
  }
}

function checkTheme(errors: string[], theme: Theme | undefined) {
  if (!theme) return errors.push('theme is missing')
  for (const name of ['primary', 'accent', 'neutral', 'steel'] as const) checkScale(errors, name, theme.palette?.[name])
  if (!isHex(theme.palette?.ink ?? '')) errors.push('theme.palette.ink must be a hex colour')
  if (!theme.light || !theme.dark) errors.push('theme.light and theme.dark are required')
  if (!theme.fonts?.sans || !theme.fonts?.display) errors.push('theme.fonts.sans and theme.fonts.display are required')
}

/** Checks the Node-safe part of a site. Returns readable errors; empty means valid. */
export function validateSiteMeta(meta: SiteMeta): string[] {
  const errors: string[] = []
  if (!ID.test(meta.id ?? '')) errors.push(`id "${meta.id}" must be lowercase-kebab-case`)
  if (!meta.name) errors.push('name is required')
  if (!Array.isArray(meta.domains)) errors.push('domains must be an array (it can be empty)')
  if (meta.url && !/^https?:\/\/[^/]+$/.test(meta.url)) errors.push(`url "${meta.url}" must be an origin like https://example.com (no trailing slash)`)
  if (!meta.seo?.title || !meta.seo?.description) errors.push('seo.title and seo.description are required')
  if (meta.seo && !isHex(meta.seo.themeColor ?? '')) errors.push('seo.themeColor must be a hex colour')
  checkTheme(errors, meta.theme)
  return errors.map((e) => `${meta.id ?? '(no id)'}: ${e}`)
}

/** Checks a full site config against the registered section types. */
export function validateSiteConfig(site: SiteConfig, sectionTypes: readonly string[]): string[] {
  const errors = validateSiteMeta(site).map((e) => e.slice(e.indexOf(': ') + 2))
  const components = site.components ?? {}
  const paths = new Set<string>()
  const anchors = new Set<string>()

  if (!site.contact?.phones?.length) errors.push('contact.phones needs at least one phone number')
  if (!site.pages?.some((p) => p.path === '/')) errors.push("pages needs a home page with path '/'")

  site.pages?.forEach((page, i) => {
    const where = `pages[${i}] (${page.path})`
    if (!page.path?.startsWith('/')) errors.push(`${where}: path must start with '/'`)
    if (paths.has(page.path)) errors.push(`${where}: duplicate path`)
    paths.add(page.path)
    if (!!page.sections === !!page.component) errors.push(`${where}: set exactly one of sections or component`)
    if (page.component && !components[page.component]) errors.push(`${where}: component "${page.component}" is not in the site's components`)

    page.sections?.forEach((section: SectionConfig, j) => {
      const at = `${where}.sections[${j}]`
      if (section.type === 'custom') {
        if (!components[section.component]) errors.push(`${at}: custom component "${section.component}" is not in the site's components`)
      } else if (!sectionTypes.includes(section.type)) {
        errors.push(`${at}: "${section.type}" is not a registered section type (${sectionTypes.join(', ')})`)
      }
      if (page.path === '/' && section.id) {
        if (anchors.has(section.id)) errors.push(`${at}: duplicate section id "${section.id}"`)
        anchors.add(section.id)
      }
    })
  })

  return errors.map((e) => `${site.id ?? '(no id)'}: ${e}`)
}

/** Section links must name a section on the home page; page links must name a page. */
export function validateLinks(site: SiteConfig, anchorIds: string[]): string[] {
  const errors: string[] = []
  const pagePaths = new Set(site.pages.map((p) => p.path))
  const check = (target: LinkTarget, where: string) => {
    if ('section' in target && !anchorIds.includes(target.section)) errors.push(`${where}: section "${target.section}" is not on the home page`)
    if ('to' in target && !pagePaths.has(target.to)) errors.push(`${where}: page "${target.to}" does not exist`)
  }
  site.navigation.header.forEach((l, i) => check(l, `navigation.header[${i}]`))
  site.navigation.footerColumns.forEach((c, i) => c.links.forEach((l, j) => check(l, `navigation.footerColumns[${i}].links[${j}]`)))
  return errors.map((e) => `${site.id}: ${e}`)
}
