# Multi-site business website platform

One Vue 3 + Vite + Tailwind codebase that builds several independent business websites. Each site has its own branding, theme, content, images, navigation and page layout. Shared components never contain a brand's text or colours.

Sites in this repo:

| Site | Folder | Dev URL |
|---|---|---|
| Ultra Sign Makers | `src/sites/ultra-sign-makers` | http://localhost:3000/ultra-sign-makers/ (also `/`) |
| ZMR Fabrications | `src/sites/zmr-fabrications` | http://localhost:3000/zmr-fabrications/ |

## Commands

```bash
npm install
npm run dev                         # all sites; / shows the default site, /<site-id>/ any site
npm run dev -- zmr-fabrications     # make another site the default at /
npm run build                       # every site → dist/<site-id>/
npm run build -- ultra-sign-makers  # one site
npm run preview -- ultra-sign-makers
npm test                            # validates every site config + platform tests
npm run typecheck
npm run lint
npm run check                       # typecheck + lint + test + build, run before committing
```

Requires Node.js 18+.

## How it fits together

```
src/
  main.ts                    entry: mounts the active site
  platform/                  shared core (no brand content)
    boot.ts                  resolve site → validate → theme → router → mount
    App.vue                  layout shell (navbar, page, footer)
    router.ts                vue-router built from a site's pages
    sections.ts              section registry: type → component, anchor, empty-check
    assets.ts                per-site image lookup with placeholder fallback
    site/                    types, validation, resolver, useSite()
    theme/                   theme types, tokens → CSS variables
    components/{layout,sections,ui}/
    composables/             dark mode, scroll spy, reveal, SEO, counters
    styles/main.css          base styles; all colours are CSS variables
  sites/<site-id>/
    site.ts                  name, domains, URL, SEO, theme, feature flags (read at build time)
    theme.ts                 colours (light + dark), fonts, effects
    index.ts                 full site: brand, contact, navigation, pages
    contact.ts, navigation.ts
    content/*.ts             section content
    assets/                  images, bundled and fingerprinted by Vite
    public/                  copied as-is: favicon.svg, og-image, robots.txt
    components/              optional site-only components
build/multi-site.ts          Vite plugin: site discovery, index.html head, dev routing
scripts/site.mjs             dev/build/preview for one or all sites
tests/                       Vitest
```

### Choosing the site

- **Production:** one build per site. `npm run build` produces `dist/<site-id>/`, and each build contains only that site's code, content and images. At build time the plugin writes the title, description, canonical URL, Open Graph tags, favicon, theme CSS and fonts into `index.html`, so link previews and crawlers see the right site without running JavaScript.
- **Development:** every site is served at once. `/<site-id>/…` selects a site by path, and `/` shows the default site.
- **Resolution order** (`src/platform/site/resolve.ts`): path prefix (dev only) → domain (`site.ts` → `domains`) → the build's site. An unknown site in development shows a page listing the valid sites.

### Theme

`theme.ts` defines colour scales (`primary`, `accent`, `neutral`, `steel`, `ink`), semantic colours for light and dark mode (page, text, surfaces, eyebrow, highlight …), fonts and effects (progress bar, hero glow, card hover). `themeToCss` turns these into CSS variables scoped to `:root[data-site="<id>"]`, so one site's theme can never apply to another.

Tailwind classes such as `bg-primary-600`, `text-slate-600` and `border-line` read those variables. Components therefore use normal Tailwind classes and never hardcode brand colours.

### Pages and sections

A page is a list of sections:

```ts
{ path: '/', sections: [
  { type: 'hero', variant: 'centered', decor: 'blobs', content: hero },
  { type: 'products', content: products },
  { type: 'custom', component: 'OnCallBand', props: { heading: '…', text: '…' } },
] }
```

- **Built-in types:** `hero` (variants `split` and `centered`), `about`, `products`, `stats`, `whyUs`, `gallery`, `reviews`, `faq`, `contact`.
- **Order:** sections appear in whatever order you list them.
- **Empty sections:** a section with nothing to show (e.g. `reviews` with no items) is left out, along with its nav links.
- **Clean URLs:** home-page sections get clean URLs (`/about`, `/contact`), and the address bar follows your scroll position.
- **Extra pages:** add `{ path: '/services', title: 'Services', sections: [...] }`, or `{ path: '/x', component: 'MyPage' }` for a fully custom page.
- **Site-only components:** go in `sites/<id>/components/` and are registered under `components` in the site's `index.ts`.

### Images

Put images in `sites/<id>/assets/` and reference them with `asset('products/led.webp')`. A missing file returns `undefined`, and the component shows a labelled placeholder, so a site works before its photos arrive. Files in `sites/<id>/public/` keep their exact names; use this for `favicon.svg` and the social preview image (`seo.ogImage`).

## Adding a new website

> **Full step-by-step guide:** [docs/ADDING-A-WEBSITE.md](docs/ADDING-A-WEBSITE.md). It covers every file, section reference, deployment, troubleshooting and a checklist. The short version:

1. **Create the folder.** Copy an existing site folder to `src/sites/<new-id>/`. The folder name is the site id: lowercase-kebab-case, e.g. `brand-b`.
2. **Edit `site.ts`.** Set `id` (must equal the folder name), `name`, `domains`, `url` (empty until live), `seo` and `features`. Keep this file free of Vue and image imports, because it's read at build time.
3. **Edit `theme.ts`.** Set the brand palette, light and dark semantic colours, fonts (with the Google Fonts URL in `stylesheet`) and effects.
4. **Add assets.** Put the logo and photos in `assets/`, and `favicon.svg` (plus `og-image.png` if you have a URL) in `public/`.
5. **Fill in content.** Update `contact.ts`, `navigation.ts` and `content/*.ts`.
6. **Compose pages.** In `index.ts`, list the sections, choose variants, and register any `components` the site needs.
7. **Check it.** Run `npm test`, which validates the new site's config and links, then `npm run dev` and open `http://localhost:3000/<new-id>/`.
8. **Build it.** Run `npm run build -- <new-id>` to produce `dist/<new-id>/`.
9. **Deploy it.** See Deployment below.

Registration is automatic: any folder in `src/sites/` with a `site.ts` is a site. You don't need to change shared components or routing.

**When to change the platform instead:** if a new site needs a section that other sites could reuse, add it to `platform/components/sections/` and register it in `platform/sections.ts` and `SectionConfig` in `platform/site/types.ts`. If only that site needs it, keep it in the site's `components/` folder.

## Deployment

Each site is hosted on its own, so different sites can use different providers, accounts and domains. Any static host works as long as it serves `index.html` for unknown paths. [docs/ADDING-A-WEBSITE.md → Part 6](docs/ADDING-A-WEBSITE.md#part-6--build-and-deploy) has step-by-step instructions for Firebase, Netlify, Cloudflare Pages, Vercel and cPanel shared hosting.

### Firebase Hosting

`firebase.json` has one hosting target per site, each serving `dist/<site-id>` with a rewrite to `index.html`. That rewrite is needed for clean URLs like `/contact`. Targets aren't linked to Firebase projects yet, so `firebase deploy` stops instead of deploying anywhere. To set up a site:

```bash
firebase use --add                                         # pick the site's Firebase project
firebase target:apply hosting <site-id> <firebase-site-name>
npm run build -- <site-id>
firebase deploy --only hosting:<site-id>
```

Then add the custom domain in the Firebase console, add it to `domains` in `site.ts`, and set `url`.

> `.firebaserc` still names the old `zmr-fabrications` project as the default. Check which project you're deploying to before running any deploy.

## Notes

- **Single-page app:** content renders in the browser. The `<head>` tags are static per site, so search engines and link previews get correct titles and descriptions. If you later need full server-rendered pages, the resolver and `useSite()` already avoid shared module state.
- **Dark mode:** each site stores its choice under `<site-id>-color-scheme`. Set `features.darkMode: false` to force light mode.
- **Git:** ZMR Fabrications' photos (`src/sites/zmr-fabrications/assets/`) are kept out of git, so a fresh clone shows placeholders for them.
