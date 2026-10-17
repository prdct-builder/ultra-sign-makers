import type { AboutContent } from '@/platform/site/types'
import { asset } from '../assets'

export const about: AboutContent = {
  eyebrow: 'About Us',
  heading: { before: 'Signage that gives your brand ', highlight: 'visibility', after: ' and presence' },
  paragraphs: [
    'Ultra Sign Makers is a signage manufacturing and visual branding company serving Indian businesses. We design and fabricate custom signboards, 3D acrylic letters, stainless steel and aluminium channel letter signs, LED signboards, ACP elevations and in-shop branding.',
    'Whether you run a single store or a growing chain, we work with you to turn your brand into signage that is clear, durable and noticed — from the first enquiry to the final board.'
  ],
  points: [
    'Custom signboards, 3D letters, LED signage and ACP elevation works',
    'Signage for retail, jewellery, restaurants, hospitals, schools and offices',
    'Branding solutions designed around your business and storefront',
    'Direct conversation with our team to understand your requirements'
  ],
  image: {
    src: asset('about.webp'), // TODO: add assets/about.webp — a placeholder shows until then
    alt: 'Ultra Sign Makers signage and branding showcase'
  },
  badge: { value: '10+', label: 'signage and branding solutions for businesses' }
}
