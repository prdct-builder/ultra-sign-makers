import { describe, expect, it } from 'vitest'
import { hexToChannels, themeToCss } from '@/platform/theme/themeToCss'
import { resolveSite } from '@/platform/site/resolve'
import { builtInSectionTypes } from '@/platform/sections'
import { validateLinks, validateSiteConfig, validateSiteMeta } from '@/platform/site/validate'
import { createAssetResolver } from '@/platform/assets'
import { pageTitle } from '@/platform/composables/useSeo'
import type { SiteConfig } from '@/platform/site/types'
import { fixtureSite, sites } from './helpers'

describe('theme', () => {
  it('converts hex to Tailwind channel format', () => {
    expect(hexToChannels('#ff6b35')).toBe('255 107 53')
    expect(hexToChannels('#fff')).toBe('255 255 255')
    expect(() => hexToChannels('orange')).toThrow()
  })

  it('scopes every token to its own site so themes cannot leak', () => {
    const css = themeToCss('acme', sites['zmr-fabrications'].theme)
    const selectors = css.match(/^:root[^{]*\{/gm)
    expect(selectors).toEqual([':root[data-site="acme"] {', ':root[data-site="acme"].dark {'])
    expect(css).toContain('--c-primary-500: 249 115 22;')
    expect(css).toContain('--font-display:')
  })

  it('produces different tokens for different sites', () => {
    const a = themeToCss('x', sites['ultra-sign-makers'].theme)
    const b = themeToCss('x', sites['zmr-fabrications'].theme)
    expect(a).not.toBe(b)
  })
})

describe('resolveSite', () => {
  const list = [
    { id: 'brand-a', domains: ['brand-a.com'] },
    { id: 'brand-b', domains: ['brand-b.com', 'shop.brand-b.com'] }
  ]
  const base = { sites: list, defaultSiteId: 'brand-a', allowPathPrefix: true }

  it('selects by path prefix in development', () => {
    expect(resolveSite({ ...base, hostname: 'localhost', pathname: '/brand-b/contact' })).toEqual({
      status: 'found',
      siteId: 'brand-b',
      base: '/brand-b/',
      via: 'path'
    })
  })

  it('selects by domain, ignoring www and case', () => {
    expect(resolveSite({ ...base, hostname: 'WWW.Brand-B.com', pathname: '/' })).toMatchObject({ siteId: 'brand-b', via: 'domain', base: '/' })
    expect(resolveSite({ ...base, hostname: 'shop.brand-b.com', pathname: '/' })).toMatchObject({ siteId: 'brand-b' })
  })

  it('ignores path prefixes when they are not allowed (production)', () => {
    expect(resolveSite({ ...base, allowPathPrefix: false, hostname: 'brand-a.com', pathname: '/brand-b' })).toMatchObject({ siteId: 'brand-a', via: 'domain' })
  })

  it('falls back to the build default', () => {
    expect(resolveSite({ ...base, hostname: 'preview.web.app', pathname: '/about' })).toMatchObject({ siteId: 'brand-a', via: 'default' })
  })

  it('reports unknown sites instead of guessing', () => {
    expect(resolveSite({ ...base, defaultSiteId: null, hostname: 'localhost', pathname: '/brand-c' })).toEqual({ status: 'unknown', requested: 'brand-c' })
  })
})

describe('validation', () => {
  const valid = fixtureSite()

  it('accepts a valid site', () => {
    expect(validateSiteConfig(valid, builtInSectionTypes)).toEqual([])
  })

  it('reports unknown section types and missing custom components', () => {
    const site = {
      ...valid,
      pages: [{ path: '/', sections: [{ type: 'heroo' }, { type: 'custom', component: 'Nope' }] }]
    } as unknown as SiteConfig
    const errors = validateSiteConfig(site, builtInSectionTypes)
    expect(errors.some((e) => e.includes('"heroo" is not a registered section type'))).toBe(true)
    expect(errors.some((e) => e.includes('custom component "Nope"'))).toBe(true)
  })

  it('requires a home page, unique paths and phones', () => {
    const site = { ...valid, contact: { phones: [] }, pages: [{ path: '/a', sections: [] }, { path: '/a', sections: [] }] } as SiteConfig
    const errors = validateSiteConfig(site, builtInSectionTypes).join('\n')
    expect(errors).toContain("needs a home page with path '/'")
    expect(errors).toContain('duplicate path')
    expect(errors).toContain('at least one phone')
  })

  it('rejects bad theme colours and ids', () => {
    const bad = { ...valid, id: 'Bad Id', theme: { ...valid.theme, palette: { ...valid.theme.palette, ink: 'navy' } } }
    const errors = validateSiteMeta(bad).join('\n')
    expect(errors).toContain('lowercase-kebab-case')
    expect(errors).toContain('palette.ink must be a hex colour')
  })

  it('reports links to missing sections and pages', () => {
    const site = { ...valid, navigation: { ...valid.navigation, header: [{ label: 'X', section: 'missing' }, { label: 'Y', to: '/nowhere' }] } }
    const errors = validateLinks(site, ['home', 'faq']).join('\n')
    expect(errors).toContain('section "missing"')
    expect(errors).toContain('page "/nowhere"')
  })
})

describe('assets', () => {
  it('resolves known files and returns undefined (placeholder) for missing ones', () => {
    const asset = createAssetResolver({ './assets/logo.svg': '/assets/logo-abc.svg' })
    expect(asset('logo.svg')).toBe('/assets/logo-abc.svg')
    expect(asset('missing.png')).toBeUndefined()
  })
})

describe('seo', () => {
  it('uses the site title on the home page and "Page — Site" elsewhere', () => {
    expect(pageTitle('Acme', 'Acme — Widgets')).toBe('Acme — Widgets')
    expect(pageTitle('Acme', 'Acme — Widgets', { path: '/x', title: 'Pricing' })).toBe('Pricing — Acme')
  })
})
