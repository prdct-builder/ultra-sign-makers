// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { discoverSites, renderHead } from '../build/multi-site'

describe('build-time site discovery', () => {
  it('finds every site folder and validates it', async () => {
    const sites = await discoverSites()
    expect(sites.map((s) => s.id)).toEqual(expect.arrayContaining(['ultra-sign-makers', 'zmr-fabrications']))
  })
})

describe('renderHead', () => {
  it('writes SEO, theme and colour-scheme tags for the site', async () => {
    const [ultra] = (await discoverSites()).filter((s) => s.id === 'ultra-sign-makers')
    const head = renderHead(ultra)
    expect(head).toContain('<title>Ultra Sign Makers — Custom Signboards, LED Signage &amp; 3D Letters</title>')
    expect(head).toContain('<style id="site-theme" data-site="ultra-sign-makers">')
    expect(head).toContain('"ultra-sign-makers-color-scheme"')
    // No live URL yet, so no canonical or og:image (they must be absolute).
    expect(head).not.toContain('rel="canonical"')
    expect(head).not.toContain('og:image')
  })

  it('adds canonical and absolute og:image once a site has a URL', async () => {
    const [zmr] = (await discoverSites()).filter((s) => s.id === 'zmr-fabrications')
    const head = renderHead(zmr)
    expect(head).toContain('<link rel="canonical" href="https://zmr-fabrications.web.app/">')
    expect(head).toContain('<meta property="og:image" content="https://zmr-fabrications.web.app/og-image.png">')
  })

  it('escapes values so content cannot break out of tags or attributes', async () => {
    const [ultra] = (await discoverSites()).filter((s) => s.id === 'ultra-sign-makers')
    const head = renderHead({ ...ultra, name: 'A "B"', seo: { ...ultra.seo, title: '</title><script>x</script>', description: '"><img>' } })
    expect(head).toContain('<title>&lt;/title&gt;&lt;script&gt;x&lt;/script&gt;</title>')
    expect(head).toContain('content="&quot;&gt;&lt;img&gt;"')
    expect(head).toContain('content="A &quot;B&quot;"')
  })
})
