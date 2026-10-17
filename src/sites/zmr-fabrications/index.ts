import type { SiteConfig } from '@/platform/site/types'
import meta from './site'
import { contact } from './contact'
import { navigation } from './navigation'
import { asset } from './assets'
import OnCallBand from './components/OnCallBand.vue'
import { about, contactSection, faq, gallery, hero, products, reviews, stats, whyUs } from './content/home'

const site: SiteConfig = {
  ...meta,
  brand: {
    logo: { light: asset('logo-light.png'), dark: asset('logo-dark.png') },
    tagline:
      'Quality scaffolding solutions for construction needs — custom fabrication of column boxes, prop jacks, cup locks, spans, base jacks, and centering plates.'
  },
  contact,
  navigation,
  components: { OnCallBand },
  pages: [
    {
      path: '/',
      // Stats lead straight after the hero, and a site-only call band sits before the FAQ.
      sections: [
        { type: 'hero', decor: 'blobs', content: hero },
        { type: 'stats', content: stats },
        { type: 'products', content: products },
        { type: 'about', content: about },
        { type: 'whyUs', content: whyUs },
        { type: 'gallery', content: gallery },
        { type: 'reviews', content: reviews },
        {
          type: 'custom',
          component: 'OnCallBand',
          props: {
            heading: 'Need components on site? Call us any time.',
            text: 'Our team is available 24 hours on call for orders, availability and delivery.'
          }
        },
        { type: 'faq', content: faq },
        { type: 'contact', content: contactSection }
      ]
    }
  ]
}

export default site
