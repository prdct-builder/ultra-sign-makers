import type { HeroContent } from '@/platform/site/types'
import { asset } from '../assets'
import { contact, primaryPhone } from '../contact'

export const hero: HeroContent = {
  eyebrow: 'High-quality signage solutions for your business',
  headlineWords: ['Premium Signage', 'Solutions That Make', 'Your Brand Stand Out'],
  headlineAccentFrom: 1,
  description:
    'Ultra Sign Makers designs and manufactures custom signboards, illuminated LED signage, 3D acrylic letters, ACP elevations and in-shop branding — helping Indian businesses get noticed.',
  image: {
    src: asset('cover.webp'),
    alt: 'Ultra Sign Makers custom signage and branding'
  },
  primaryCta: { label: 'Get a Free Quote', link: { href: primaryPhone.href } },
  secondaryCta: { label: 'View Our Services', link: { section: 'products' } },
  quickStats: [
    { label: 'Services', value: '10+' },
    { label: 'Sectors served', value: '10+' },
    { label: 'Signage', value: 'Custom' }
  ],
  callBadges: contact.phones.map((phone) => ({ title: 'Call for a quote', subtitle: phone.display })),
  availabilityBadge: 'Request a Quote'
}
