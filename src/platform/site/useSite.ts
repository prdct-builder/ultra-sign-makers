import { inject, type App, type InjectionKey } from 'vue'
import type { SiteConfig } from './types'

export interface ActiveSite {
  config: SiteConfig
  /** Router base, '/' in production or '/<id>/' when selected by path. */
  base: string
}

const SITE_KEY: InjectionKey<ActiveSite> = Symbol('site')

/** Provided once per app instance (not a module singleton), so SSR requests could never share it. */
export function provideSite(app: App, site: ActiveSite) {
  app.provide(SITE_KEY, site)
}

export function useSite(): ActiveSite {
  const site = inject(SITE_KEY)
  if (!site) throw new Error('useSite() called outside a site app — is provideSite() missing?')
  return site
}

/** URL of a file in the active site's public/ folder, e.g. publicUrl(base, 'favicon.svg'). */
export function publicUrl(base: string, file: string): string {
  return base + file.replace(/^\//, '')
}
