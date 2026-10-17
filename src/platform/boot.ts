/* eslint-disable vue/one-component-per-file -- these are createApp() calls, not component definitions */
import { createApp } from 'vue'
import { allowPathPrefix, defaultSiteId, loadSite, siteIndex } from 'virtual:sites'
import App from './App.vue'
import SiteNotFound from './components/SiteNotFound.vue'
import { resolveSite } from './site/resolve'
import { provideSite, publicUrl } from './site/useSite'
import { validateLinks, validateSiteConfig } from './site/validate'
import { builtInSectionTypes, homeAnchors } from './sections'
import { createSiteRouter } from './router'
import { applySiteDocument } from './theme/applyTheme'
import { configureDarkMode } from './composables/useDarkMode'

/** Resolves the active site, then mounts it — or a helpful page if there isn't one. */
export async function mountSite(selector: string) {
  const resolution = resolveSite({
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    sites: siteIndex,
    defaultSiteId,
    allowPathPrefix
  })

  if (resolution.status === 'unknown') {
    createApp(SiteNotFound, { requested: resolution.requested, sites: siteIndex }).mount(selector)
    return
  }

  const config = await loadSite(resolution.siteId)

  if (import.meta.env.DEV) {
    const errors = [
      ...validateSiteConfig(config, builtInSectionTypes),
      ...validateLinks(config, homeAnchors(config, { includeHidden: true }))
    ]
    if (errors.length) {
      errors.forEach((e) => console.error(`[site config] ${e}`))
      createApp(SiteNotFound, { requested: config.id, sites: siteIndex, errors }).mount(selector)
      return
    }
  }

  applySiteDocument(config, publicUrl(resolution.base, 'favicon.svg'))
  configureDarkMode(config.id, config.features.darkMode)

  const app = createApp(App)
  provideSite(app, { config, base: resolution.base })
  const router = createSiteRouter(config, resolution.base)
  app.use(router)
  await router.isReady()
  app.mount(selector)
}
