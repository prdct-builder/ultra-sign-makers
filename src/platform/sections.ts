import type { Component } from 'vue'
import type { SectionConfig, SectionType, SiteConfig } from './site/types'
import Hero from './components/sections/Hero.vue'
import About from './components/sections/About.vue'
import Products from './components/sections/Products.vue'
import Stats from './components/sections/Stats.vue'
import WhyChooseUs from './components/sections/WhyChooseUs.vue'
import Gallery from './components/sections/Gallery.vue'
import Reviews from './components/sections/Reviews.vue'
import FAQ from './components/sections/FAQ.vue'
import Contact from './components/sections/Contact.vue'

type BuiltInType = Exclude<SectionType, 'custom'>

interface SectionDefinition {
  component: Component
  /** Default anchor id, or null for sections that are not link targets. */
  anchor: string | null
  /** Sections that report empty are left off the page and out of the navigation. */
  isEmpty?: (section: SectionConfig) => boolean
}

export const sectionRegistry: Record<BuiltInType, SectionDefinition> = {
  hero: { component: Hero, anchor: 'home' },
  about: { component: About, anchor: 'about' },
  products: { component: Products, anchor: 'products' },
  stats: { component: Stats, anchor: null },
  whyUs: { component: WhyChooseUs, anchor: 'why-us' },
  gallery: { component: Gallery, anchor: 'gallery' },
  reviews: {
    component: Reviews,
    anchor: 'reviews',
    isEmpty: (s) => s.type === 'reviews' && s.content.items.length === 0
  },
  faq: {
    component: FAQ,
    anchor: 'faq',
    isEmpty: (s) => s.type === 'faq' && s.content.items.length === 0
  },
  contact: { component: Contact, anchor: 'contact' }
}

export const builtInSectionTypes = Object.keys(sectionRegistry) as BuiltInType[]

export function sectionAnchor(section: SectionConfig): string | null {
  if (section.id) return section.id
  return section.type === 'custom' ? null : sectionRegistry[section.type].anchor
}

export function isSectionVisible(section: SectionConfig): boolean {
  if (section.type === 'custom') return true
  return !sectionRegistry[section.type].isEmpty?.(section)
}

export function resolveSectionComponent(section: SectionConfig, site: SiteConfig): Component | undefined {
  if (section.type === 'custom') return site.components?.[section.component]
  return sectionRegistry[section.type].component
}

/**
 * Anchors of the home page's sections in order — drives nav links and the scroll spy.
 * Sections that are empty (and so not rendered) are skipped unless includeHidden is set.
 */
export function homeAnchors(site: SiteConfig, { includeHidden = false } = {}): string[] {
  const home = site.pages.find((p) => p.path === '/')
  return (home?.sections ?? [])
    .filter((s) => includeHidden || isSectionVisible(s))
    .map(sectionAnchor)
    .filter((id): id is string => id !== null)
}
