import { mount } from '@vue/test-utils'
import App from '@/platform/App.vue'
import { createSiteRouter } from '@/platform/router'
import { provideSite } from '@/platform/site/useSite'
import { configureDarkMode } from '@/platform/composables/useDarkMode'
import type { SiteConfig } from '@/platform/site/types'
import { builtInSectionTypes } from '@/platform/sections'
import { validateSiteConfig } from '@/platform/site/validate'
import { hero } from '@/sites/ultra-sign-makers/content/hero'

const siteModules = import.meta.glob<{ default: SiteConfig }>('../src/sites/*/index.ts', { eager: true })

/** Every registered site, keyed by folder name. */
export const sites: Record<string, SiteConfig> = Object.fromEntries(
  Object.entries(siteModules).map(([file, mod]) => [file.split('/').at(-2)!, mod.default])
)

/** Mounts the full app for a site, the same way boot.ts does. */
export async function mountSite(config: SiteConfig, path = '/') {
  configureDarkMode(config.id, config.features.darkMode)
  const router = createSiteRouter(config, '/')
  router.push(path)
  await router.isReady()
  const wrapper = mount(App, {
    attachTo: document.body,
    global: { plugins: [router, { install: (app) => provideSite(app, { config, base: '/' }) }] }
  })
  return { wrapper, router }
}

/** Ids of the sections rendered on the page, in order. */
export function renderedSectionIds(root: ParentNode = document) {
  return Array.from(root.querySelectorAll('main section[id]')).map((s) => s.id)
}

/** A small valid site for testing platform behaviour without depending on a real brand. */
export function fixtureSite(overrides: Partial<SiteConfig> = {}): SiteConfig {
  const base = sites['ultra-sign-makers']
  const site: SiteConfig = {
    ...base,
    id: 'fixture',
    name: 'Fixture Co',
    brand: { tagline: 'Test tagline' },
    pages: [
      {
        path: '/',
        sections: [
          { type: 'hero', variant: 'centered', content: { ...hero, image: { alt: 'No photo' } } },
          { type: 'faq', content: { eyebrow: 'FAQ', heading: 'Questions', description: 'Answers', items: [{ question: 'Q1?', answer: 'A1' }] } }
        ]
      },
      { path: '/services', title: 'Services', sections: [{ type: 'stats', content: { items: [{ target: 3, label: 'Things' }] } }] }
    ],
    navigation: { header: [{ label: 'FAQ', section: 'faq' }, { label: 'Services', to: '/services' }], callLabel: 'Call', footerColumns: [] },
    ...overrides
  }
  const errors = validateSiteConfig(site, builtInSectionTypes)
  if (errors.length) throw new Error(errors.join('\n'))
  return site
}
