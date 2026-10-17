import { describe, expect, it } from 'vitest'
import { builtInSectionTypes, homeAnchors } from '@/platform/sections'
import { validateLinks, validateSiteConfig } from '@/platform/site/validate'
import { sites } from './helpers'

describe('registered sites', () => {
  it('finds at least two sites', () => {
    expect(Object.keys(sites).sort()).toEqual(expect.arrayContaining(['ultra-sign-makers', 'zmr-fabrications']))
  })

  for (const [folder, site] of Object.entries(sites)) {
    describe(folder, () => {
      it('has an id matching its folder', () => {
        expect(site.id).toBe(folder)
      })

      it('passes config validation', () => {
        expect(validateSiteConfig(site, builtInSectionTypes)).toEqual([])
      })

      it('only links to sections and pages that exist', () => {
        expect(validateLinks(site, homeAnchors(site, { includeHidden: true }))).toEqual([])
      })
    })
  }

  it('gives each site its own brand', () => {
    const [a, b] = [sites['ultra-sign-makers'], sites['zmr-fabrications']]
    expect(a.theme.palette.primary[500]).not.toBe(b.theme.palette.primary[500])
    expect(a.name).not.toBe(b.name)
    expect(a.navigation.header.map((l) => l.label)).not.toEqual(b.navigation.header.map((l) => l.label))
  })
})
