import { HardHat, ShieldCheck, Clock, Factory, PhoneCall } from '@lucide/vue'
import type {
  AboutContent,
  ContactContent,
  FaqContent,
  GalleryContent,
  HeroContent,
  ProductsContent,
  ReviewsContent,
  StatsContent,
  WhyUsContent
} from '@/platform/site/types'
import { asset } from '../assets'
import { contact, primaryPhone } from '../contact'

export const hero: HeroContent = {
  eyebrow: 'Top quality products for all your fabrication needs',
  eyebrowIcon: HardHat,
  headlineWords: ['Precision-Fabricated', 'Scaffolding', 'Solutions'],
  headlineAccentFrom: 1,
  description:
    'ZMR Fabrications specializes in the custom fabrication of column boxes, prop jacks, cup locks, spans, base jacks, and centering plates — built to precise standards for strength, durability, and safety.',
  image: { src: asset('cover.png'), alt: 'ZMR Fabrications workshop fabricating scaffolding components' },
  primaryCta: { label: 'Call Now to Order', link: { href: primaryPhone.href } },
  secondaryCta: { label: 'View Products', link: { section: 'products' } },
  quickStats: [
    { label: 'Delivered', value: '500+' },
    { label: 'Experience', value: '8+ yrs' },
    { label: 'Support', value: '24/7' }
  ],
  callBadges: contact.phones.map((phone) => ({ title: 'Call to order', subtitle: phone.display })),
  availabilityBadge: 'Available 24/7'
}

export const stats: StatsContent = {
  items: [
    { target: 500, suffix: '+', label: 'Products delivered' },
    { target: 8, suffix: '+', label: 'Years of experience' },
    { target: 1000, suffix: '+', label: 'Happy customers' },
    { target: 24, suffix: '/7', label: 'Support availability' }
  ]
}

export const products: ProductsContent = {
  eyebrow: 'Our products',
  heading: { before: 'Quality Fabrications Products That ', highlight: 'Build Your Vision' },
  ctaLabel: 'Call to order',
  items: [
    {
      image: asset('products/centring_plates.jpeg'),
      title: 'Centering Plates',
      description:
        'Scaffolding centering plates provide firm and stable support for slab formwork systems. Engineered for durability and easy handling on all types of construction sites. Made from high-quality steel for long-lasting performance and load-bearing capacity.'
    },
    {
      image: asset('products/prop_jacks.jpeg'),
      title: 'Prop Jacks',
      description:
        'Prop jacks offer adjustable vertical support for shuttering and formwork systems. Robust, easy to install, and designed to handle heavy loads with maximum stability. Manufactured from high-grade steel with a corrosion-resistant finish for long-term use.'
    },
    {
      image: asset('products/spans.jpeg'),
      title: 'Spans',
      description:
        'Our high-quality scaffolding spans offer reliable horizontal support for your structures. Manufactured for strength and stability, they ensure safe load distribution across frames. Rust-resistant and built to last, ideal for all types of construction projects.'
    },
    {
      image: asset('products/column_boxes.jpeg'),
      title: 'Column Boxes',
      description:
        'We offer a wide range of scaffolding column boxes for precise and efficient concrete column casting. Available in various sizes and configurations to suit all structural requirements. Durable, reusable, and easy to assemble — ideal for both residential and commercial projects.'
    },
    {
      image: asset('products/scaffolding_cuplocks.jpeg'),
      title: 'Cup Locks',
      description:
        'Scaffolding cup locks are modular systems used to provide strong and stable support for construction and maintenance work at height. They feature a unique locking mechanism with top and bottom cups to securely hold horizontal ledgers in place. Known for quick assembly, durability, and adaptability to complex structures.'
    },
    {
      image: asset('products/base_jacks.jpeg'),
      title: 'Base Jacks',
      description:
        'Ensure a strong foundation for your scaffolding with our heavy-duty base jacks. Designed for maximum stability and easy height adjustment on uneven surfaces. Durable, galvanized finish for long-lasting performance in tough site conditions.'
    }
  ]
}

export const about: AboutContent = {
  eyebrow: 'About Us',
  heading: { before: 'Building the ', highlight: 'backbone', after: ' of safe construction' },
  paragraphs: [
    'At ZMR Fabrications, we specialize in the custom fabrication and manufacturing of high-quality construction and scaffolding components. Our core expertise includes the production of C-plates, jack-pipes, spans, base jacks, and column boxes, all built to precise standards to ensure strength, durability, and safety.',
    'We are committed to delivering reliable products with on-time delivery and exceptional service — proud to support the infrastructure and construction sectors with components that form the backbone of safe and efficient work environments.'
  ],
  points: [
    'Custom fabrication of column boxes, prop jacks, spans, base jacks & centering plates',
    'Components built to precise standards for strength, durability, and safety',
    'Reliable, on-time delivery and exceptional service',
    'Strong focus on quality craftsmanship, material integrity & customer satisfaction'
  ],
  image: { src: asset('about.png'), alt: 'ZMR Fabrications scaffolding at a multi-storey construction site' },
  badge: { value: '8+', label: 'years fabricating construction components' }
}

export const whyUs: WhyUsContent = {
  eyebrow: 'Why choose us',
  heading: { before: 'Built for contractors who refuse to ', highlight: 'compromise on quality' },
  description:
    'From material sourcing to final delivery, every product we fabricate is held to the same standard — strong, reliable, and ready for the job site.',
  image: { src: asset('why-us.png'), alt: 'ZMR Fabrications welder at work' },
  reasons: [
    { icon: Factory, title: 'High-grade materials', description: 'Every product is manufactured from high-grade, corrosion-resistant steel built to last.' },
    { icon: ShieldCheck, title: 'Built to precise standards', description: 'Strength, durability, and safety are engineered into every component we fabricate.' },
    { icon: Clock, title: 'On-time delivery', description: 'We commit to reliable delivery schedules so your project timelines stay on track.' },
    { icon: PhoneCall, title: '24/7 customer support', description: "We're available around the clock — call us anytime with questions or orders." }
  ]
}

const galleryPhoto = (file: string, alt: string) => ({ src: asset(`gallery/${file}`), alt })

export const gallery: GalleryContent = {
  eyebrow: 'Gallery',
  heading: { before: 'Explore our stunning ', highlight: 'fabrications craftsmanship' },
  items: [
    galleryPhoto('house_1.PNG', 'Multi-storey building under construction with scaffolding'),
    galleryPhoto('prop_jacks_1.jpg', 'Prop jacks in use on a construction site'),
    galleryPhoto('spans_1.PNG', 'Steel scaffolding spans'),
    galleryPhoto('centring_plates_1.PNG', 'Centering plates stacked on site'),
    galleryPhoto('base_jack_1.png', 'Base jack components ready for delivery'),
    galleryPhoto('house_2.PNG', 'Residential building construction with scaffolding'),
    galleryPhoto('prop_jacks_2.PNG', 'Prop jacks supporting formwork'),
    galleryPhoto('spans_2.PNG', 'Scaffolding spans on a job site'),
    galleryPhoto('centring_plates_2.PNG', 'Centering plates used for slab formwork'),
    galleryPhoto('prop_jacks_3.jpg', 'Prop jacks installed at a construction site'),
    galleryPhoto('house_3.PNG', 'Construction site with scaffolding in place'),
    galleryPhoto('spans_3.PNG', 'Scaffolding spans stacked for delivery'),
    galleryPhoto('centring_plates_3.jpg', 'Centering plates fabrication close-up'),
    galleryPhoto('prop_jacks_4.PNG', 'Prop jacks manufactured on-site'),
    galleryPhoto('prop_jacks_5.jpg', 'Prop jacks stacked and ready for delivery')
  ]
}

export const reviews: ReviewsContent = {
  eyebrow: 'Reviews',
  heading: { before: 'Reviews from ', highlight: 'Our Customers' },
  items: [
    {
      rating: 5,
      headline: 'Reliable and Durable',
      quote:
        "We've been using the centering plates and prop jacks from this supplier for over six months on multiple sites. The build quality is excellent – no rusting, warping, or bending even after extended use. The plates fit perfectly and provide solid support during slab work. Highly recommended for contractors looking for reliability on site.",
      name: 'Anji Nandula',
      date: '24 Jul'
    },
    { rating: 4, headline: 'Worth the investment', quote: 'Excellent spans and column boxes. Durability is good.', name: 'Siddik', date: '12 Jul' },
    {
      rating: 5,
      headline: 'Top-Quality Products',
      quote:
        'We ordered a full batch of scaffolding accessories including prop jacks, centering plates, and spans. Every product was manufactured to spec, arrived on time, and performed flawlessly during our latest project.',
      name: 'Ravi',
      date: '19 May'
    }
  ]
}

export const faq: FaqContent = {
  eyebrow: 'FAQ',
  heading: 'Frequently asked questions',
  description: "Can't find the answer you're looking for? Reach out to our team below.",
  items: [
    {
      question: 'What materials are your products made from?',
      answer:
        'All our scaffolding components — column boxes, prop jacks, cup locks, spans, base jacks, and centering plates — are manufactured from high-grade steel with a corrosion-resistant, galvanized finish for long-term durability.'
    },
    {
      question: 'Do you offer custom sizes and configurations?',
      answer:
        'Yes. Our products are available in various sizes and configurations to suit residential, commercial, and industrial structural requirements. Get in touch to discuss your specific needs.'
    },
    {
      question: 'What is your delivery area?',
      answer:
        "We're based in Nandigama, Andhra Pradesh, and deliver to construction sites across the region. Call us to confirm delivery to your location."
    },
    {
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes, we offer competitive pricing for bulk orders. Contact us with your quantity and specifications for a custom quote.'
    },
    {
      question: 'Are your products reusable?',
      answer:
        'Absolutely. Our fabrications are built to be durable and reusable across multiple projects, reducing long-term costs for contractors and builders.'
    },
    {
      question: 'How can I place an order?',
      answer: "Call us anytime — we're available 24 hours a day — and our team will walk you through availability and delivery."
    }
  ]
}

export const contactSection: ContactContent = {
  eyebrow: 'Get in touch',
  heading: { before: 'Contact ', highlight: 'Us' },
  description: "Quality scaffolding solutions for construction needs. We love our customers — we're here for you 24/7. Call us anytime!",
  ctaLabel: 'Call Now to Order'
}
