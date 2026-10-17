import type { SiteMeta } from '../site/types'
import { themeToCss } from './themeToCss'

function upsert<K extends keyof HTMLElementTagNameMap>(selector: string, tag: K, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLElementTagNameMap[K]>(selector)
  if (!el) {
    el = document.createElement(tag)
    document.head.appendChild(el)
  }
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
  return el
}

/**
 * Makes sure the document carries the active site's theme, fonts and icon.
 * Production builds already have these in index.html (see build/multi-site.ts),
 * so this only changes anything when switching sites by path in development.
 */
export function applySiteDocument(meta: SiteMeta, faviconHref: string) {
  const root = document.documentElement
  root.dataset.site = meta.id
  root.lang = meta.locale

  const style = upsert('style#site-theme', 'style', { id: 'site-theme' })
  if (style.dataset.site !== meta.id) {
    style.textContent = themeToCss(meta.id, meta.theme)
    style.dataset.site = meta.id
  }

  if (meta.theme.fonts.stylesheet) {
    upsert('link#site-fonts', 'link', { id: 'site-fonts', rel: 'stylesheet', href: meta.theme.fonts.stylesheet })
  }
  upsert('link[rel="icon"]', 'link', { rel: 'icon', type: 'image/svg+xml', href: faviconHref })
  upsert('meta[name="theme-color"]', 'meta', { name: 'theme-color', content: meta.seo.themeColor })
}
