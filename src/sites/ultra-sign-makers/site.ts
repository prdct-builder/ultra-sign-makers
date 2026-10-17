import type { SiteMeta } from '@/platform/site/types'
import { theme } from './theme'

/** Read at build time to write index.html — keep this file free of Vue and image imports. */
const meta: SiteMeta = {
  id: 'ultra-sign-makers',
  name: 'Ultra Sign Makers',
  domains: [], // TODO: add the live domain(s), e.g. 'ultrasignmakers.in'
  url: '', // TODO: add the live website URL (enables canonical and og:url/og:image tags)
  locale: 'en-IN',
  seo: {
    title: 'Ultra Sign Makers — Custom Signboards, LED Signage & 3D Letters',
    description:
      'Ultra Sign Makers designs and manufactures custom signboards, LED signboards, 3D acrylic letters, stainless steel and aluminium letter signs, ACP elevations and in-shop branding for businesses across India. Call now for a free quote.',
    themeColor: '#ff6b35'
  },
  theme,
  features: {
    darkMode: true,
    scrollProgress: true,
    backToTop: true
  }
}

export default meta
