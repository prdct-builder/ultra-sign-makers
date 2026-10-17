import { Gem, Hammer, Clock, PencilRuler } from '@lucide/vue'

// ── Site config & navigation ────────────────────────────────────

export const site = {
  name: 'Ultra Sign Makers',
  url: '', // TODO: add the live website URL for Ultra Sign Makers
  // Leave empty to show the site name as text instead of a logo image
  light_logo: '', // TODO: add Ultra Sign Makers logo (for light backgrounds)
  dark_logo: '', // TODO: add Ultra Sign Makers logo (for dark backgrounds)
  tagline:
    'High-quality signage solutions for your business — 3D acrylic letters, ACP elevations, stainless steel and aluminium letter signs, LED signboards and in-shop branding.',
  email: { display: '', href: '' }, // TODO: replace with Ultra Sign Makers email
  phones: [
    { display: '+91-7330645071', href: 'tel:+917330645071' },
    { display: '+91-8686922979', href: 'tel:+918686922979' }
  ],
  address: 'Near SriKrishna Neuro Hospital, Kachiguda Road, Hyderabad',
  addressShort: 'Hyderabad, Telangana',
  pincode: '500063',
  hours: '24/7', // TODO: update with actual business hours if different
  mapEmbedUrl: '', // TODO: add Google Maps embed URL for the real location
  mapTitle: 'Ultra Sign Makers location'
}

export const primaryPhone = site.phones[0]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#products' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
]

export const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#products' },
      { label: 'Gallery', href: '#gallery' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Reviews', href: '#reviews' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' }
    ]
  }
]

// ── Hero ────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'High-quality signage solutions for your business',
  headlineWords: ['Premium Signage', 'Solutions That Make', 'Your Brand Stand Out'],
  headlineAccentFrom: 1,
  description:
    'Ultra Sign Makers designs and manufactures custom signboards, illuminated LED signage, 3D acrylic letters, ACP elevations and in-shop branding — helping Indian businesses get noticed.',
  image: {
    src: '/cover_pic.webp',
    alt: 'Ultra Sign Makers custom signage and branding'
  },
  primaryCta: { label: 'Get a Free Quote', href: primaryPhone.href },
  secondaryCta: { label: 'View Our Services', href: '#products' },
  quickStats: [
    { label: 'Services', value: '10+' },
    { label: 'Sectors served', value: '10+' },
    { label: 'Signage', value: 'Custom' }
  ],
  callBadgePrimary: { title: 'Call for a quote', subtitle: site.phones[0].display },
  callBadgeSecondary: { title: 'Call for a quote', subtitle: site.phones[1].display },
  availabilityBadge: 'Request a Quote'
}

// ── About ───────────────────────────────────────────────────────

export const about = {
  eyebrow: 'About Us',
  headingBefore: 'Signage that gives your brand ',
  headingHighlight: 'visibility',
  headingAfter: ' and presence',
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
    src: '', // TODO: add an Ultra Sign Makers photo — the image column is hidden while empty
    alt: 'Ultra Sign Makers signage and branding showcase'
  },
  badge: { value: '10+', label: 'signage and branding solutions for businesses' }
}

// ── Products / services ─────────────────────────────────────────

export const productsContent = {
  eyebrow: 'Our services',
  headingBefore: 'Signage Solutions That ',
  headingHighlight: 'Elevate Your Brand',
  headingAfter: ''
}

// Leave `image` empty to show the card without a photo.
export const products = [
  {
    image: '',
    title: '3D Acrylic Letter Signboards',
    description:
      'Dimensional acrylic lettering that gives your business name depth and a clean, modern look. A popular choice for retail stores, showrooms, clinics and offices that want a sharp first impression, available in sizes and styles to match your brand.'
  },
  {
    image: '',
    title: 'ACP Elevation Works',
    description:
      'Commercial facade cladding and elevation signage that transforms the front of your building. Well suited for shopping complexes, showrooms, hospitals, institutions and commercial properties looking for a polished, branded exterior.'
  },
  {
    image: '',
    title: 'Stainless Steel Letter Signs',
    description:
      'Stainless steel letters with a refined metallic finish for a premium, lasting presence. Ideal for corporate offices, jewellery showrooms, hotels and brands that want a classy identity at the entrance.'
  },
  {
    image: '',
    title: 'Liquid Letter Signs',
    description:
      'Glossy, smooth-finish letters that give your signboard a distinctive, contemporary look. A stylish option for cafés, boutiques, salons and showrooms looking to stand out from the crowd.'
  },
  {
    image: '',
    title: 'Aluminium Channel Letter Signs',
    description:
      'Channel letters fabricated in aluminium for bold, well-defined signage that reads clearly from the street. Suited to storefronts, restaurants, franchises and commercial establishments that need strong visibility, day and night.'
  },
  {
    image: '',
    title: 'LED Signboards',
    description:
      'Illuminated signboards that keep your brand visible after dark. From shop name boards to branded display signs, our LED signage helps restaurants, hospitals, hotels and retail outlets attract attention around the clock.'
  },
  {
    image: '',
    title: 'In-Shop Branding',
    description:
      'Interior signage and branding that carries your identity inside the store. Wall graphics, display branding and directional signs help create a consistent brand experience for retail spaces, clinics and offices.'
  },
  {
    image: '',
    title: 'Custom Signage Solutions',
    description:
      'Have a signage idea that does not fit a standard format? Share your requirement and we will discuss custom business signboards, promotional displays and branding solutions made specifically for your business.'
  }
]

// ── Stats ───────────────────────────────────────────────────────

export const stats = [
  { target: 10, suffix: '+', label: 'Signage services offered' },
  { target: 10, suffix: '+', label: 'Business sectors we serve' },
  { target: 100, suffix: '%', label: 'Custom-made signage' },
  { target: 1, suffix: '', label: 'Partner for all your signage needs' }
]

// ── Why choose us ───────────────────────────────────────────────

export const whyChooseUsContent = {
  eyebrow: 'Why choose us',
  headingBefore: 'Signage that represents your business with ',
  headingHighlight: 'quality and clarity',
  headingAfter: '',
  description:
    'From the first conversation to the finished signboard, we focus on craftsmanship, clear communication and signage that suits your brand and your space.',
  image: {
    src: '', // TODO: add an Ultra Sign Makers photo — the image column is hidden while empty
    alt: 'Ultra Sign Makers signage fabrication'
  }
}

export const reasons = [
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

// ── Gallery ─────────────────────────────────────────────────────

export const galleryContent = {
  eyebrow: 'Gallery',
  headingBefore: 'Explore our ',
  headingHighlight: 'signage and branding solutions',
  headingAfter: ''
}

// Add Ultra Sign Makers photos in this shape: { src: '/gallery/...', alt: '...' }
export const galleryItems = []

// The Gallery section and its nav/footer links are hidden while there are no photos.
export const showGallery = galleryItems.length > 0

// ── Reviews ─────────────────────────────────────────────────────

export const reviewsContent = {
  eyebrow: 'Reviews',
  headingBefore: 'What Our ',
  headingHighlight: 'Customers Say',
  headingAfter: ''
}

// The previous reviews belonged to another company and have been removed.
// Add genuine Ultra Sign Makers reviews in this shape:
// { rating: 5, headline: '...', quote: '...', name: '...', date: '...' }
export const testimonials = []

// The Reviews section and its nav/footer links are hidden while there are no reviews.
export const showReviews = testimonials.length > 0

// Used by the navbar and footer to drop links to hidden sections.
export const isLinkVisible = (link) =>
  (showReviews || link.href !== '#reviews') && (showGallery || link.href !== '#gallery')

// ── FAQ ─────────────────────────────────────────────────────────

export const faqContent = {
  eyebrow: 'FAQ',
  heading: 'Frequently asked questions',
  description: "Can't find the answer you're looking for? Reach out to our team below."
}

export const faqs = [
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

// ── Contact ─────────────────────────────────────────────────────

export const contactContent = {
  eyebrow: 'Get in touch',
  headingBefore: 'Contact ',
  headingHighlight: 'Us',
  headingAfter: '',
  description:
    'Planning a new signboard or rebranding your business? Call or write to us with your requirements and request a quote from Ultra Sign Makers.'
}
