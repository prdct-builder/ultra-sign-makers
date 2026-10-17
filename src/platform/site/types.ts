import type { Component } from 'vue'
import type { Theme } from '../theme/types'

/** Node-safe part of a site: everything the build needs for index.html (no Vue, no assets). */
export interface Features {
  darkMode: boolean
  scrollProgress: boolean
  backToTop: boolean
}

export interface SiteMeta {
  /** Folder name under src/sites, lowercase-kebab. Also the dev URL prefix: localhost:3000/<id>. */
  id: string
  name: string
  /** Production hostnames that resolve to this site, e.g. ['ultrasignmakers.in', 'www.ultrasignmakers.in']. */
  domains: string[]
  /** Canonical origin without trailing slash. Empty until the site has a live URL. */
  url: string
  /** `<html lang>`. */
  locale: string
  seo: {
    title: string
    description: string
    /** File in the site's public/ folder used for social previews. Needs `url` to be set. */
    ogImage?: string
    /** Browser UI colour on mobile (hex). */
    themeColor: string
  }
  theme: Theme
  features: Features
}

export interface Phone {
  display: string
  href: string
}

export interface Contact {
  phones: Phone[]
  email?: { display: string; href: string } | null
  address?: string
  addressShort?: string
  pincode?: string
  hours?: string
  map?: { embedUrl: string; title: string }
}

export interface SiteImage {
  /** Resolved URL, or undefined to show a placeholder. */
  src?: string
  alt: string
}

/** Where a link goes: a section on the home page, another page, or a raw URL (tel:, mailto:, https:). */
export type LinkTarget = { section: string } | { to: string } | { href: string }

export type NavLink = LinkTarget & { label: string }

export interface Cta {
  label: string
  link: LinkTarget
}

export interface Navigation {
  header: NavLink[]
  /** Label shown on the header call button. */
  callLabel: string
  footerColumns: { title: string; links: NavLink[] }[]
}

/** Heading split so one part can be highlighted, e.g. "Contact " + "Us". */
export interface Heading {
  before: string
  highlight: string
  after?: string
}

// ── Section content ────────────────────────────────────────────

export interface HeroContent {
  eyebrow: string
  /** Icon before the eyebrow text (defaults to Sparkles). */
  eyebrowIcon?: Component
  headlineWords: string[]
  /** Index of the first highlighted headline word. */
  headlineAccentFrom: number
  description: string
  image: SiteImage
  primaryCta: Cta
  secondaryCta: Cta
  quickStats: { label: string; value: string }[]
  callBadges: { title: string; subtitle: string }[]
  availabilityBadge: string
}

export interface AboutContent {
  eyebrow: string
  heading: Heading
  paragraphs: string[]
  points: string[]
  image: SiteImage
  badge: { value: string; label: string }
}

export interface ProductsContent {
  eyebrow: string
  heading: Heading
  ctaLabel: string
  items: { title: string; description: string; image?: string }[]
}

export interface StatsContent {
  items: { target: number; prefix?: string; suffix?: string; label: string }[]
}

export interface WhyUsContent {
  eyebrow: string
  heading: Heading
  description: string
  image: SiteImage
  reasons: { icon: Component; title: string; description: string }[]
}

export interface GalleryContent {
  eyebrow: string
  heading: Heading
  items: SiteImage[]
  /** Placeholder tiles shown while `items` is empty. */
  placeholderCount?: number
}

export interface ReviewsContent {
  eyebrow: string
  heading: Heading
  items: { rating: number; headline: string; quote: string; name: string; date: string }[]
}

export interface FaqContent {
  eyebrow: string
  heading: string
  description: string
  items: { question: string; answer: string }[]
}

export interface ContactContent {
  eyebrow: string
  heading: Heading
  description: string
  ctaLabel: string
}

interface SectionBase {
  /** Anchor id; defaults to the section type's own (hero → "home", whyUs → "why-us"). */
  id?: string
}

export type SectionConfig =
  | (SectionBase & { type: 'hero'; variant?: 'split' | 'centered'; decor?: 'none' | 'blobs'; content: HeroContent })
  | (SectionBase & { type: 'about'; content: AboutContent })
  | (SectionBase & { type: 'products'; content: ProductsContent })
  | (SectionBase & { type: 'stats'; content: StatsContent })
  | (SectionBase & { type: 'whyUs'; content: WhyUsContent })
  | (SectionBase & { type: 'gallery'; content: GalleryContent })
  | (SectionBase & { type: 'reviews'; content: ReviewsContent })
  | (SectionBase & { type: 'faq'; content: FaqContent })
  | (SectionBase & { type: 'contact'; content: ContactContent })
  /** A site-specific component registered in the site's `components`. */
  | (SectionBase & { type: 'custom'; component: string; props?: Record<string, unknown> })

export type SectionType = SectionConfig['type']

export interface PageConfig {
  /** Route path. The home page is '/'; its section anchors also get clean URLs (/about, /contact). */
  path: string
  /** Shown as "<title> — <site name>"; the home page uses seo.title. */
  title?: string
  description?: string
  /** Build the page from sections... */
  sections?: SectionConfig[]
  /** ...or render a site-specific component for the whole page. */
  component?: string
}

export interface SiteConfig extends SiteMeta {
  brand: {
    /** Logo images for light and dark backgrounds. When missing, the mark + site name are shown. */
    logo?: { light?: string; dark?: string }
    /** Square brand mark (defaults to the site's favicon.svg). */
    mark?: string
    tagline: string
  }
  contact: Contact
  navigation: Navigation
  pages: PageConfig[]
  /** Site-specific components, referenced by name from `custom` sections or `page.component`. */
  components?: Record<string, Component>
}
