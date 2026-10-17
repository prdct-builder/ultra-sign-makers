import type { SiteMeta } from '@/platform/site/types'
import { theme } from './theme'

/** Read at build time to write index.html — keep this file free of Vue and image imports. */
const meta: SiteMeta = {
  id: 'zmr-fabrications',
  name: 'ZMR Fabrications',
  domains: ['zmr-fabrications.web.app'],
  url: 'https://zmr-fabrications.web.app',
  locale: 'en-IN',
  seo: {
    title: 'ZMR Fabrications — Precision-Fabricated Scaffolding Solutions',
    description:
      'ZMR Fabrications manufactures high-quality scaffolding and construction components — column boxes, prop jacks, cup locks, spans, base jacks, and centering plates. Based in Nandigama, Andhra Pradesh. Call now to order.',
    ogImage: 'og-image.png',
    themeColor: '#ea580c'
  },
  theme,
  features: {
    darkMode: true,
    scrollProgress: true,
    backToTop: true
  }
}

export default meta
