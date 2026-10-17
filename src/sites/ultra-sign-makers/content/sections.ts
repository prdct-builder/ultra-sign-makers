import { Gem, Hammer, Clock, PencilRuler } from '@lucide/vue'
import type {
  ContactContent,
  FaqContent,
  GalleryContent,
  ReviewsContent,
  StatsContent,
  WhyUsContent
} from '@/platform/site/types'
import { asset } from '../assets'

export const stats: StatsContent = {
  items: [
    { target: 10, suffix: '+', label: 'Signage services offered' },
    { target: 10, suffix: '+', label: 'Business sectors we serve' },
    { target: 100, suffix: '%', label: 'Custom-made signage' },
    { target: 1, suffix: '', label: 'Partner for all your signage needs' }
  ]
}

export const whyUs: WhyUsContent = {
  eyebrow: 'Why choose us',
  heading: { before: 'Signage that represents your business with ', highlight: 'quality and clarity' },
  description:
    'From the first conversation to the finished signboard, we focus on craftsmanship, clear communication and signage that suits your brand and your space.',
  image: {
    src: asset('why-us.webp'), // TODO: add assets/why-us.webp — a placeholder shows until then
    alt: 'Ultra Sign Makers signage fabrication'
  },
  reasons: [
    {
      icon: Gem,
      title: 'Premium Quality Materials',
      description: 'We use high-grade acrylic, stainless steel, aluminium, ACP and LED components for signage that looks sharp and lasts.'
    },
    {
      icon: Hammer,
      title: 'Expert Craftsmanship',
      description: 'Every letter, edge and finish is fabricated with care by an experienced team that knows signage inside out.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'We plan production around your launch or renovation schedule and deliver your signage when you need it.'
    },
    {
      icon: PencilRuler,
      title: 'Custom Designs and Solutions',
      description: 'Signage designed around your brand, size and storefront — never a one-size-fits-all template.'
    }
  ]
}

export const gallery: GalleryContent = {
  eyebrow: 'Gallery',
  heading: { before: 'Explore our ', highlight: 'signage and branding solutions' },
  // Add photos as { src: asset('gallery/shopfront-1.webp'), alt: '…' }. Placeholder tiles show while empty.
  items: [],
  placeholderCount: 6
}

export const reviews: ReviewsContent = {
  eyebrow: 'Reviews',
  heading: { before: 'What Our ', highlight: 'Customers Say' },
  // Add genuine Ultra Sign Makers reviews: { rating: 5, headline: '…', quote: '…', name: '…', date: '…' }.
  // The section and its nav links stay hidden while this is empty.
  items: []
}

export const faq: FaqContent = {
  eyebrow: 'FAQ',
  heading: 'Frequently asked questions',
  description: "Can't find the answer you're looking for? Reach out to our team below.",
  items: [
    {
      question: 'What types of signage do you make?',
      answer:
        'We manufacture 3D acrylic letter signboards, stainless steel letter signs, liquid letter signs, aluminium channel letter signs, LED signboards, ACP elevation works, in-shop branding and other custom business signage.'
    },
    {
      question: 'Can I get signage made to my own design and size?',
      answer:
        'Yes. Our signage is made to suit your brand, storefront and space. Share your logo, size and location details, and our team will discuss the best options with you.'
    },
    {
      question: 'Which businesses do you work with?',
      answer:
        'We create signage for retail stores, jewellery showrooms, clothing brands, restaurants, hotels, hospitals, educational institutions, corporate offices, real estate developers, shopping complexes and franchises.'
    },
    {
      question: 'Do you handle projects with multiple outlets?',
      answer:
        'Yes, you can enquire about branding for multiple locations. Contact us with your requirements and the number of outlets, and we will discuss it with you.'
    },
    {
      question: 'What should I share to get a quotation?',
      answer:
        'Your business name and logo, the type of signage you need, approximate size, and the location where it will be installed. The more detail you share, the more accurate your quote will be.'
    },
    {
      question: 'How can I request a quote?',
      answer:
        'Call or email us with your signage requirements, and our team will guide you through the options and next steps.'
    }
  ]
}

export const contactSection: ContactContent = {
  eyebrow: 'Get in touch',
  heading: { before: 'Contact ', highlight: 'Us' },
  description:
    'Planning a new signboard or rebranding your business? Call or write to us with your requirements and request a quote from Ultra Sign Makers.',
  ctaLabel: 'Call for a Free Quote'
}
