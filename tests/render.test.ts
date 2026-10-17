import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { replaceWithoutScroll } from '@/platform/router'
import type { SiteConfig } from '@/platform/site/types'
import { fixtureSite, mountSite, renderedSectionIds, sites } from './helpers'

afterEach(() => {
  document.body.innerHTML = ''
})

const navLabels = () => Array.from(document.querySelectorAll('header nav ul a')).map((a) => a.textContent?.trim())

describe('Ultra Sign Makers', () => {
  it('renders its sections in order, skipping Reviews while there are none', async () => {
    const { wrapper } = await mountSite(sites['ultra-sign-makers'])
    expect(renderedSectionIds()).toEqual(['home', 'about', 'products', 'why-us', 'gallery', 'faq', 'contact'])
    expect(navLabels()).toEqual(['About', 'Services', 'Gallery', 'FAQ', 'Contact'])
    wrapper.unmount()
  })

  it('shows placeholders for missing photos and the map', async () => {
    const { wrapper } = await mountSite(sites['ultra-sign-makers'])
    const labels = Array.from(document.querySelectorAll('[role="img"]')).map((el) => el.getAttribute('aria-label'))
    expect(labels).toContain('Map coming soon')
    expect(labels).toContain('Photo coming soon')
    expect(labels).toContain('LED Signboards')
    wrapper.unmount()
  })

  it('shows the brand mark and name while there is no logo image', async () => {
    const { wrapper } = await mountSite(sites['ultra-sign-makers'])
    expect(document.querySelector('header')?.textContent).toContain('Ultra Sign Makers')
    expect(document.querySelector('header img[src$="favicon.svg"]')).not.toBeNull()
    wrapper.unmount()
  })
})

describe('ZMR Fabrications', () => {
  it('uses its own section order, including its site-only call band and reviews', async () => {
    const { wrapper } = await mountSite(sites['zmr-fabrications'])
    expect(renderedSectionIds()).toEqual(['home', 'products', 'about', 'why-us', 'gallery', 'reviews', 'faq', 'contact'])
    expect(document.body.textContent).toContain('Need components on site? Call us any time.')
    expect(navLabels()).toContain('Products')
    expect(navLabels()).toContain('Reviews')
    wrapper.unmount()
  })
})

describe('routing', () => {
  it('serves home-page sections at clean paths', async () => {
    const { wrapper, router } = await mountSite(sites['ultra-sign-makers'], '/faq')
    expect(router.currentRoute.value.name).not.toBe('not-found')
    expect(renderedSectionIds()).toContain('faq')
    wrapper.unmount()
  })

  it('shows a 404 page for unknown paths and for hidden sections', async () => {
    const { wrapper } = await mountSite(sites['ultra-sign-makers'], '/does-not-exist')
    expect(document.body.textContent).toContain('Page not found')
    wrapper.unmount()

    const hidden = await mountSite(sites['ultra-sign-makers'], '/reviews')
    expect(document.body.textContent).toContain('Page not found')
    hidden.wrapper.unmount()
  })

  it('never scrolls the page when the scroll spy updates the URL, even when updates overlap', async () => {
    const { wrapper, router } = await mountSite(sites['ultra-sign-makers'])
    // Let any scroll still pending from an earlier test (it waits up to 30 frames for its section) finish first.
    await new Promise((r) => setTimeout(r, 600))
    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView')
    // Fast scrolling fires several URL updates before the first one finishes.
    replaceWithoutScroll(router, '/about')
    replaceWithoutScroll(router, '/products')
    replaceWithoutScroll(router, '/faq')
    await flushPromises()
    await new Promise((r) => setTimeout(r, 50))
    expect(router.currentRoute.value.path).toBe('/faq')
    expect(scrollSpy).not.toHaveBeenCalled()

    // A real link navigation still scrolls to its section.
    await router.push('/contact')
    await flushPromises()
    await new Promise((r) => setTimeout(r, 50))
    expect(scrollSpy).toHaveBeenCalled()
    scrollSpy.mockRestore()
    wrapper.unmount()
  })

  it('supports extra pages built from different sections', async () => {
    const { wrapper, router } = await mountSite(fixtureSite(), '/services')
    expect(document.body.textContent).toContain('Things')
    expect(document.title).toBe('Services — Fixture Co')
    await router.push('/')
    await flushPromises()
    expect(document.querySelector('main section#home')).not.toBeNull()
    wrapper.unmount()
  })
})

describe('platform features', () => {
  it('renders the centered hero variant with a placeholder image', async () => {
    const { wrapper } = await mountSite(fixtureSite())
    expect(document.querySelector('#home .text-center')).not.toBeNull()
    expect(document.querySelector('#home [aria-label="No photo"]')).not.toBeNull()
    wrapper.unmount()
  })

  it('hides the dark-mode toggle when a site turns the feature off', async () => {
    const site: SiteConfig = fixtureSite({ features: { darkMode: false, scrollProgress: false, backToTop: false } })
    const { wrapper } = await mountSite(site)
    expect(document.querySelector('[aria-label*="dark mode"]')).toBeNull()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    wrapper.unmount()
  })
})
