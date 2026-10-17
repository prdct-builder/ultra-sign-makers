import type { SiteConfig } from '@/platform/site/types'
import meta from './site'
import { contact } from './contact'
import { navigation } from './navigation'
import { hero } from './content/hero'
import { about } from './content/about'
import { products } from './content/products'
import { contactSection, faq, gallery, reviews, stats, whyUs } from './content/sections'
import { asset } from './assets'

const site: SiteConfig = {
  ...meta,
  brand: {
    // TODO: add assets/logo-light.png and assets/logo-dark.png — the mark + name show until then.
    logo: { light: asset('logo-light.png'), dark: asset('logo-dark.png') },
    tagline:
      'High-quality signage solutions for your business — 3D acrylic letters, ACP elevations, stainless steel and aluminium letter signs, LED signboards and in-shop branding.'
  },
  contact,
  navigation,
  pages: [
    {
      path: '/',
      sections: [
        { type: 'hero', content: hero },
        { type: 'about', content: about },
        { type: 'products', content: products },
        { type: 'whyUs', content: whyUs },
        { type: 'stats', content: stats },
        { type: 'gallery', content: gallery },
        { type: 'reviews', content: reviews },
        { type: 'faq', content: faq },
        { type: 'contact', content: contactSection }
      ]
    }
  ]
}

export default site
