# How to add a new website

This guide walks you through creating a new website on this platform, from an empty folder to a live site on Firebase, Netlify, Cloudflare Pages, Vercel or ordinary cPanel hosting, each site with its own hosting and domain. You never copy the whole application. Each website is one folder under `src/sites/`, and everything else is shared.

> **Rule of thumb:** to add or change a website, you should only need to touch files inside `src/sites/<your-site>/`. If you find yourself editing `src/platform/`, you're changing the shared platform for *every* site (see [Part 7](#part-7--adding-something-the-platform-doesnt-have-yet)).

---

## Contents

1. [Before you start](#part-1--before-you-start)
2. [Create the site folder](#part-2--create-the-site-folder)
3. [Fill in each file](#part-3--fill-in-each-file)
4. [Section reference](#part-4--section-reference)
5. [Preview and check your site](#part-5--preview-and-check-your-site)
6. [Build and deploy](#part-6--build-and-deploy)
7. [Adding something the platform doesn't have yet](#part-7--adding-something-the-platform-doesnt-have-yet)
8. [Troubleshooting](#part-8--troubleshooting)
9. [Checklist](#part-9--checklist)

---

## Part 1 — Before you start

### What you need

- **Node.js 18 or newer.** Check with `node -v`.
- **The project installed.** Run `npm install` once in the project folder.
- **A code editor.** VS Code is recommended. Because the project uses TypeScript, the editor underlines mistakes in your site files as you type.

### Gather this information first

| Item | Example | Required? |
|---|---|---|
| Business name | `Brand B Interiors` | Yes |
| Site id: short, lowercase, words joined by hyphens | `brand-b-interiors` | Yes |
| Phone number(s) | `+91-9000000000` | Yes, at least one |
| Email, address, pincode, hours | | Optional; rows hide when empty |
| Brand colours: a main colour and a secondary colour | `#2563eb`, `#f59e0b` | Yes |
| Fonts | Inter, Poppins | Yes; can stay as the defaults |
| Logo for light backgrounds and for dark backgrounds (PNG/SVG) | | Optional; a placeholder mark + name show without it |
| Square icon as SVG (`favicon.svg`) | | Recommended |
| Photos: hero, about, products, gallery | | Optional; placeholders show without them |
| Live website address | `https://brandb.in` | Optional until you go live |
| Google Maps embed link | | Optional; "Map coming soon" shows without it |

### How the pieces fit

```
src/
  platform/              ← shared by every site — don't put brand content here
  sites/
    ultra-sign-makers/   ← one folder = one website
    zmr-fabrications/
    your-new-site/       ← what you'll create
```

Inside a site folder:

```
src/sites/your-new-site/
  site.ts          name, domain, SEO text, theme, on/off features   (read at build time)
  theme.ts         colours, fonts, visual effects
  index.ts         puts it all together: brand, contact, navigation, pages
  contact.ts       phone, email, address, hours, map
  navigation.ts    header and footer links
  assets.ts        one line — lets content files use asset('photo.webp')
  content/         the text and images for each section
  assets/          photos and logos (bundled and optimised by Vite)
  public/          files copied as-is: favicon.svg, og-image.png
  components/      (optional) Vue components only this site uses
```

**There's no registration step.** Any folder in `src/sites/` that contains a `site.ts` file is automatically a website.

---

## Part 2 — Create the site folder

The easiest way is to copy an existing site and edit it.

1. **Copy the folder.** Copy `src/sites/ultra-sign-makers` and rename the copy to your site id, e.g. `src/sites/brand-b-interiors`.

   ```bash
   cp -r src/sites/ultra-sign-makers src/sites/brand-b-interiors
   ```

2. **Clear out the old images.** Delete the copied photos in `assets/` (keep the folder) and replace `public/favicon.svg` with your own.

3. **Edit each file.** Work through [Part 3](#part-3--fill-in-each-file) in order.

> ⚠️ **The folder name and the `id` in `site.ts` must be identical.** Use only lowercase letters, numbers and hyphens: `brand-b-interiors` ✅, `Brand B` ❌, `brand_b` ❌.

---

## Part 3 — Fill in each file

### 3.1 `site.ts` — identity and SEO

This file is read **while building**, outside the browser, so it has two rules:

- **Imports:** use only `import type ...` from `@/...`. Normal imports are fine only from files next to it, like `./theme`.
- **No Vue components or images** in this file.

```ts
import type { SiteMeta } from '@/platform/site/types'
import { theme } from './theme'

const meta: SiteMeta = {
  id: 'brand-b-interiors',            // must equal the folder name
  name: 'Brand B Interiors',          // shown in the header, footer, copyright
  domains: [],                        // later: ['brandb.in', 'www.brandb.in']
  url: '',                            // later: 'https://brandb.in' (no trailing slash)
  locale: 'en-IN',                    // <html lang="…">
  seo: {
    title: 'Brand B Interiors — Modular Kitchens & Wardrobes in Pune',   // browser tab + Google title
    description: 'One or two sentences that describe the business for Google and link previews.',
    ogImage: 'og-image.png',          // optional: file in public/, used only when url is set
    themeColor: '#2563eb'             // mobile browser bar colour (hex)
  },
  theme,
  features: {
    darkMode: true,                   // false = always light, no toggle button
    scrollProgress: true,             // thin bar at the top while scrolling
    backToTop: true                   // round "back to top" button
  }
}

export default meta
```

**SEO tips:**
- Keep the title under about 60 characters.
- Keep the description between 120 and 160 characters.
- `og-image.png` should be 1200×630 pixels. It's what WhatsApp and Facebook show when the link is shared.

### 3.2 `theme.ts` — colours, fonts, effects

The theme is what makes each site look different. Every value here becomes a CSS variable that applies **only to this site**.

```ts
import type { Theme } from '@/platform/theme/types'

export const theme: Theme = {
  palette: {
    primary: { 50: '#eff6ff', 100: '#dbeafe', /* … */ 500: '#3b82f6', /* … */ 950: '#172554' },
    accent:  { /* 50 … 950 */ },
    neutral: { /* 50 … 950 — greys for text, borders, backgrounds */ },
    steel:   { /* 50 … 950 — brand-tinted greys (stats band, labels) */ },
    ink: '#0f172a'                     // one dark colour used for thin borders
  },
  light: { /* colours for light mode — see table below */ },
  dark:  { /* the same keys, for dark mode */ },
  fonts: {
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
    display: "'Poppins', ui-sans-serif, system-ui, sans-serif",
    stylesheet: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap'
  },
  effects: {
    progressBar: 'linear-gradient(to right, #3b82f6, #f59e0b)',   // or 'none'
    cardHover: 'linear-gradient(to bottom right, rgb(59 130 246 / 0.06), transparent)', // or 'none'
    badgeIcon: '#3b82f6',              // background of the phone icons on the hero photo
    heroGlow: 'none'                   // e.g. 'radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.16), transparent 70%)'
  },
  containerWidth: '80rem'              // max page width
}
```

#### Colour scales (`palette`)

Each scale needs all 11 steps: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`, written as hex.

- **Don't invent 11 shades by hand.** Pick your brand colour and generate a scale with a tool such as **uicolors.app** or **tints.dev**, or copy one from the [Tailwind colour list](https://tailwindcss.com/docs/customizing-colors).
- **Choose the right step:**
  - `primary-600` is used for buttons. Make sure white text on it is readable.
  - `primary-500` is used for glows.
  - `primary-50` to `100` are used for soft tinted backgrounds.
- **For `neutral` and `steel`:** if unsure, use Tailwind's `slate` scale for both. `ultra-sign-makers/theme.ts` does exactly this.

#### Light and dark colours (`light` / `dark`)

Both need every key below. Values can be hex, `rgb(…)` or `rgb(… / 0.5)` for transparency.

| Key | What it colours | Light mode example | Dark mode example |
|---|---|---|---|
| `page` | Page background | `#ffffff` | `#0b1220` |
| `fg` | Normal text | `#0f172a` | `#f1f5f9` |
| `heading` | Headings | `#0f172a` | `#ffffff` |
| `muted` | Secondary text | `#475569` | `#94a3b8` |
| `line` | Thin borders around images and dividers | `rgb(15 23 42 / 0.1)` | `rgb(255 255 255 / 0.1)` |
| `surface` | Card background | `#ffffff` | `#151f30` |
| `surfaceLine` | Card border | `rgb(15 23 42 / 0.1)` | `rgb(255 255 255 / 0.1)` |
| `raised` | Floating badges on photos | `#ffffff` | `#151f30` |
| `glass` | Navbar background after scrolling (keep it slightly transparent) | `rgb(255 255 255 / 0.7)` | `rgb(11 18 32 / 0.7)` |
| `eyebrowFg` / `eyebrowBg` / `eyebrowLine` | The small pill labels above headings ("About Us") | text / fill / border | |
| `highlight` | The highlighted words in headings. **Must be a CSS gradient.** For a solid colour, repeat it: `linear-gradient(#2563eb, #2563eb)` | `linear-gradient(to right, #2563eb, #7c3aed)` | |
| `status` | The small status badge on the hero image | `#047857` | `#34d399` |
| `focusRing` | Keyboard focus outline | `#2563eb` | `#60a5fa` |
| `selection` | Highlighted (selected) text | `rgb(37 99 235 / 0.3)` | |
| `scrollbar` | Scrollbar thumb | `#cbd5e1` | `#334155` |

> **Accessibility:** text colours (`fg`, `muted`, `eyebrowFg`, `status`) should have at least **4.5 : 1 contrast** against `page`. Check pairs with a free tool such as WebAIM's contrast checker.

#### Fonts

- **`sans` and `display`** are CSS `font-family` lists. `display` is used for headings.
- **`stylesheet`** is the Google Fonts link that loads them. On fonts.google.com, select your fonts and copy the `href` from the `<link>` it gives you.
- **No Google Fonts:** to use only system fonts, remove `stylesheet` and set e.g. `sans: "ui-sans-serif, system-ui, sans-serif"`.

### 3.3 `public/` — favicon and share image

| File | Purpose |
|---|---|
| `public/favicon.svg` | Browser tab icon. It's also the "mark" shown next to the name when you don't have a logo yet. A square SVG works best. |
| `public/og-image.png` | Optional link preview image, 1200×630. Only used when `url` is set in `site.ts`. |
| `public/robots.txt` | Optional. |
| `public/_redirects`, `public/vercel.json`, `public/.htaccess` | Only if you host on Netlify, Vercel or cPanel. See [Part 6](#the-one-rule-for-every-host). |

Files in `public/` keep their exact name and are served from the site root, e.g. `https://brandb.in/favicon.svg`.

### 3.4 `assets/` and `assets.ts` — photos and logos

Put photos and logos in `assets/`. You can use sub-folders:

```
assets/
  logo-light.png         logo for light backgrounds (usually dark text)
  logo-dark.png          logo for dark backgrounds (usually light text)
  cover.webp             hero photo
  about.webp
  why-us.webp
  products/kitchen.webp
  gallery/project-1.webp
```

`assets.ts` stays exactly as copied. It gives content files an `asset()` helper:

```ts
import { asset } from '../assets'

asset('cover.webp')               // → the optimised URL of assets/cover.webp
asset('products/kitchen.webp')    // sub-folders work too
asset('not-there-yet.webp')       // → undefined → a labelled placeholder is shown
```

**Image tips:**
- **Format:** use `.webp` where you can. It's much smaller than PNG or JPEG.
- **Size:** hero about 1600px wide, product and gallery images about 1200px wide.
- **Missing images don't break anything.** The page shows a grey placeholder with the image's label, so you can launch with text first and add photos later.
- **Accepted types:** `.png .jpg .jpeg .webp .avif .gif .svg`, and upper-case versions like `.PNG`.

### 3.5 `contact.ts` — contact details

```ts
import type { Contact } from '@/platform/site/types'

export const contact: Contact = {
  phones: [
    { display: '+91-9000000000', href: 'tel:+919000000000' },   // first phone = "Call Now" buttons
    { display: '+91-9000000001', href: 'tel:+919000000001' }
  ],
  email: { display: 'hello@brandb.in', href: 'mailto:hello@brandb.in' },   // or null to hide
  address: '12 MG Road, Pune',          // optional — row hidden when missing
  addressShort: 'Pune, Maharashtra',    // optional — shown in the footer bottom bar
  pincode: '411001',                    // optional
  hours: 'Mon–Sat, 10 AM – 7 PM',       // optional
  map: {                                // optional — "Map coming soon" placeholder without it
    embedUrl: 'https://www.google.com/maps?q=…&output=embed',
    title: 'Brand B Interiors location'
  }
}

export const primaryPhone = contact.phones[0]
```

- **`href` format:** phone links must be `tel:` followed by digits only. Email links must start with `mailto:`.
- **Map link:** in Google Maps, find the business, then choose **Share → Embed a map → Copy HTML**, and use only the `src="…"` value.

### 3.6 `navigation.ts` — header and footer links

```ts
import type { Navigation } from '@/platform/site/types'

export const navigation: Navigation = {
  header: [
    { label: 'About', section: 'about' },        // scrolls to a section on the home page
    { label: 'Projects', section: 'gallery' },
    { label: 'Pricing', to: '/pricing' },        // goes to another page you defined
    { label: 'Instagram', href: 'https://instagram.com/brandb' },  // any external link
    { label: 'Contact', section: 'contact' }
  ],
  callLabel: 'Call Now',                         // text on the header call button
  footerColumns: [
    { title: 'Company', links: [{ label: 'About', section: 'about' }] },
    { title: 'Help', links: [{ label: 'FAQ', section: 'faq' }, { label: 'Contact', section: 'contact' }] }
  ]
}
```

There are three kinds of link:

| Kind | Example | Goes to |
|---|---|---|
| `section` | `{ section: 'faq' }` | A section on the home page. Its URL becomes `/faq`. |
| `to` | `{ to: '/pricing' }` | Another page in `pages` |
| `href` | `{ href: 'tel:…' }` / `'https://…'` | Phone, email or another website. External sites open in a new tab. |

Section names are the anchors listed in [Part 4](#part-4--section-reference). **A link to a section that's hidden (e.g. `reviews` with no reviews) disappears automatically** and reappears once the section has content.

### 3.7 `content/` — the text of each section

Each section gets its content from a plain object. You can organise the files however you like: one file per section, as in `ultra-sign-makers/content/`, or one file for the whole page, as in `zmr-fabrications/content/home.ts`.

Example `content/hero.ts`:

```ts
import { Sparkles } from '@lucide/vue'
import type { HeroContent } from '@/platform/site/types'
import { asset } from '../assets'
import { contact, primaryPhone } from '../contact'

export const hero: HeroContent = {
  eyebrow: 'Modular interiors, designed in Pune',
  eyebrowIcon: Sparkles,                                 // optional icon (any lucide.dev icon)
  headlineWords: ['Kitchens That', 'Work As Good', 'As They Look'],
  headlineAccentFrom: 1,                                 // words from index 1 onward are highlighted
  description: 'One or two sentences under the headline.',
  image: { src: asset('cover.webp'), alt: 'A finished modular kitchen' },
  primaryCta: { label: 'Get a Free Quote', link: { href: primaryPhone.href } },
  secondaryCta: { label: 'See Our Work', link: { section: 'gallery' } },
  quickStats: [
    { label: 'Projects', value: '300+' },
    { label: 'Experience', value: '12 yrs' },
    { label: 'Warranty', value: '10 yrs' }
  ],
  callBadges: contact.phones.map((p) => ({ title: 'Call us', subtitle: p.display })),   // up to 2
  availabilityBadge: 'Free site visit'
}
```

The fields for every section type are in [Part 4](#part-4--section-reference). If you get one wrong, the editor underlines it.

**Icons:** the "why us" reasons and the hero eyebrow use icons from [lucide.dev](https://lucide.dev/icons). Find an icon, convert its name to PascalCase (`pencil-ruler` → `PencilRuler`), and import it:

```ts
import { PencilRuler, Truck } from '@lucide/vue'
```

> **Write only true content.** Don't invent reviews, customer counts or years in business. Leave reviews empty until you have real ones. The section hides itself while it's empty.

### 3.8 `index.ts` — put the site together

```ts
import type { SiteConfig } from '@/platform/site/types'
import meta from './site'
import { contact } from './contact'
import { navigation } from './navigation'
import { asset } from './assets'
import { hero } from './content/hero'
import { about } from './content/about'
// … other content imports

const site: SiteConfig = {
  ...meta,
  brand: {
    logo: { light: asset('logo-light.png'), dark: asset('logo-dark.png') },   // optional
    tagline: 'Short sentence shown under the logo in the footer.'
  },
  contact,
  navigation,
  pages: [
    {
      path: '/',                           // the home page (required)
      sections: [
        { type: 'hero', content: hero },
        { type: 'about', content: about },
        { type: 'products', content: products },
        { type: 'gallery', content: gallery },
        { type: 'faq', content: faq },
        { type: 'contact', content: contactSection }
      ]
    }
  ]
}

export default site
```

**This is where each site gets its own layout:**

- **Order:** sections appear in exactly the order you list them.
- **Choosing sections:** leave out any section you don't need. A site can be just `hero` + `contact`.
- **Repeats:** the same type can appear twice. Give the second one a different `id`, e.g. `{ type: 'gallery', id: 'projects', content: … }`.
- **Variants:**
  - `{ type: 'hero', variant: 'centered', … }` puts the text centred above a wide image. The default is `'split'`, with text beside the image.
  - `{ type: 'hero', decor: 'blobs', … }` adds soft animated colour blobs behind the hero.

#### Adding more pages

The home page can link to extra pages. Add them to `pages`:

```ts
pages: [
  { path: '/', sections: [ … ] },
  {
    path: '/pricing',
    title: 'Pricing',                                // tab title becomes "Pricing — Brand B Interiors"
    description: 'Packages and prices for …',        // optional, for Google
    sections: [
      { type: 'products', content: pricingPackages },
      { type: 'faq', content: pricingFaq }
    ]
  }
]
```

Then link to it with `{ label: 'Pricing', to: '/pricing' }`.

> ⚠️ **Don't reuse a home-page section's name as a page path.** For example, don't make a `/faq` page if the home page has a `faq` section, because `/faq` already scrolls to that section.

---

## Part 4 — Section reference

| `type` | Default anchor (URL) | Content type | Options | Hides itself when |
|---|---|---|---|---|
| `hero` | `home` (`/`) | `HeroContent` | `variant: 'split' \| 'centered'`, `decor: 'none' \| 'blobs'` | — |
| `about` | `about` | `AboutContent` | | — |
| `products` | `products` | `ProductsContent` | | — |
| `stats` | *(none, not linkable)* | `StatsContent` | | — |
| `whyUs` | `why-us` | `WhyUsContent` | | — |
| `gallery` | `gallery` | `GalleryContent` | | never; shows `placeholderCount` placeholder tiles (default 6) while empty |
| `reviews` | `reviews` | `ReviewsContent` | | `items` is empty |
| `faq` | `faq` | `FaqContent` | | `items` is empty |
| `contact` | `contact` | `ContactContent` | | — |
| `custom` | *(only if you set `id`)* | your own props | `component`, `props` | — |

Any section accepts `id: 'something'` to change its anchor.

### Content fields

`Heading` means `{ before: 'Text before ', highlight: 'highlighted words', after: ' optional text after' }`.

| Content type | Fields |
|---|---|
| `HeroContent` | `eyebrow`, `eyebrowIcon?`, `headlineWords[]`, `headlineAccentFrom`, `description`, `image {src?, alt}`, `primaryCta {label, link}`, `secondaryCta {label, link}`, `quickStats[{label, value}]`, `callBadges[{title, subtitle}]`, `availabilityBadge` |
| `AboutContent` | `eyebrow`, `heading: Heading`, `paragraphs[]`, `points[]`, `image {src?, alt}`, `badge {value, label}` |
| `ProductsContent` | `eyebrow`, `heading: Heading`, `ctaLabel`, `items[{title, description, image?}]` |
| `StatsContent` | `items[{target: number, prefix?, suffix?, label}]`, e.g. `{ target: 500, suffix: '+', label: 'Projects' }` counts up to "500+" |
| `WhyUsContent` | `eyebrow`, `heading: Heading`, `description`, `image {src?, alt}`, `reasons[{icon, title, description}]` |
| `GalleryContent` | `eyebrow`, `heading: Heading`, `items[{src?, alt}]`, `placeholderCount?` |
| `ReviewsContent` | `eyebrow`, `heading: Heading`, `items[{rating 1–5, headline, quote, name, date}]` |
| `FaqContent` | `eyebrow`, `heading` *(plain text)*, `description`, `items[{question, answer}]` |
| `ContactContent` | `eyebrow`, `heading: Heading`, `description`, `ctaLabel` (the address, phones and map come from `contact.ts`) |

**`alt` text matters.** It describes the image for blind users and Google, and it's also the label shown on the placeholder. Write what's in the photo, e.g. "Walnut wardrobe with sliding doors", not "image1".

The full definitions, with comments, are in `src/platform/site/types.ts`.

---

## Part 5 — Preview and check your site

### Run it

```bash
npm run dev
```

Open **http://localhost:3000/your-site-id/**. Every site is available at its own path, and `/` shows the default site. To make your new site the one at `/`:

```bash
npm run dev -- your-site-id
```

The page updates as you save files.

**Check by hand:**
- [ ] Every header and footer link scrolls or goes to the right place.
- [ ] Toggle dark mode (moon icon). Is everything readable?
- [ ] Narrow the browser to phone width, or use DevTools → device toolbar. Is anything cut off?
- [ ] Do the call buttons dial the right number?
- [ ] Press **Tab** through the page. Can you see where the keyboard focus is?
- [ ] Do the browser tab title and icon look right?

### Validate it

```bash
npm test
```

The tests automatically include your new site. They check that:
- the id matches the folder name
- all colours are valid hex
- there's a home page and at least one phone number
- every section type exists and every custom component is registered
- every nav link points at a section or page that exists

If something's wrong, you get a readable message, for example:

```
brand-b-interiors: pages[0] (/).sections[3]: "galery" is not a registered section type (hero, about, …)
brand-b-interiors: navigation.header[2]: section "projects" is not on the home page
```

In `npm run dev`, the same problems are shown on the page instead of the site.

### Full check before you commit

```bash
npm run check      # type check + lint + tests + build every site
```

---

## Part 6 — Build and deploy

### Build

```bash
npm run build -- your-site-id     # just this site  → dist/your-site-id/
npm run build                     # every site       → dist/<each-site-id>/
npm run preview -- your-site-id   # serve the built site locally to double-check
```

Each `dist/<site-id>/` folder is a complete, standalone website. It contains **only that site's** code, text and images, and its `index.html` already includes the right title, description, favicon and share tags.

### Choose where to host

Every site is hosted **separately**. Each one can go to a different provider, account and domain, and deploying one never touches the others. Because a site is just static files, any static host works:

| Host | Good for | Free tier | Extra file needed in `public/` |
|---|---|---|---|
| **Firebase Hosting** | Google account, fast CDN, already set up in this repo | Yes | None (handled by `firebase.json`) |
| **Netlify** | Drag-and-drop uploads, very simple | Yes | `_redirects` |
| **Cloudflare Pages** | Fast worldwide, free unlimited bandwidth | Yes | None |
| **Vercel** | Simple CLI deploys | Yes (non-commercial) | `vercel.json` |
| **cPanel shared hosting** (Hostinger, GoDaddy, Bluehost …) | The business already pays for hosting with a domain | Paid | `.htaccess` |
| GitHub Pages | ❌ Not recommended (see below) | | |

### The one rule for every host

The site uses clean addresses like `/contact` and `/about`, which aren't real files. **The host must serve `index.html` for any address it doesn't find.** This is called an "SPA fallback". Without it, the home page works, but opening or refreshing `/contact` shows the host's 404 page.

Each host has its own way to switch this on, covered in the options below. When a host needs a config file, put it in **that site's** `src/sites/<site-id>/public/` folder. It's copied into `dist/<site-id>/` on every build, so you set it up once, and other sites aren't affected. Files for other hosts can sit there harmlessly; for example, Firebase ignores `.htaccess`.

---

### Option A — Firebase Hosting

There are two ways to organise Firebase:

- **A1. One Firebase project per website (recommended).** Each business gets its own project, access, billing and analytics.
- **A2. Several websites in one Firebase project.** Easier when you manage them all yourself. In the Firebase console, open **Hosting → Add another site** for each website; each gets its own `<name>.web.app` address. Then follow the steps below, using the same project for every site.

#### Deploy to Firebase (first time)

1. **Create the project.** At [console.firebase.google.com](https://console.firebase.google.com), create a project (e.g. `brand-b-interiors`). The project id gives you a free address: `brand-b-interiors.web.app`.

2. **Add a hosting target.** In `firebase.json` at the project root, add an entry for your site to the `hosting` list:

   ```json
   {
     "target": "your-site-id",
     "public": "dist/your-site-id",
     "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
     "rewrites": [{ "source": "**", "destination": "/index.html" }]
   }
   ```

   The `rewrites` line is required. It makes addresses like `/contact` work when opened directly.

3. **Link the target to your Firebase project** (once per computer). Install the Firebase CLI first with `npm install -g firebase-tools`, then sign in with `firebase login`.

   ```bash
   firebase use --add                    # choose the project; name the alias after the site, e.g. brand-b-interiors
   firebase target:apply hosting your-site-id <firebase-site-name>   # the site name is usually the project id
   ```

   With option A1, run these two commands once for each website, picking that website's project each time. Firebase remembers which target belongs to which project in `.firebaserc`.

4. **Build and deploy only this site:**

   ```bash
   npm run build -- your-site-id
   firebase use your-site-alias          # switch to this website's project (option A1)
   firebase deploy --only hosting:your-site-id
   ```

   > ⚠️ **Always use `--only hosting:<site-id>`.** A plain `firebase deploy` deploys every target linked to the current project. Run `firebase use` with no arguments to see which project is active before deploying.

5. **Tell the site its address.** After the first deploy, set `url` in `site.ts`, e.g. `'https://brand-b-interiors.web.app'`, and add the hostname to `domains`. Then build and deploy again. This turns on the canonical link and the share image.

**Custom domain on Firebase:** in the console, open **Hosting → Add custom domain** and add the DNS records it shows at your domain registrar. Then follow [Connect your domain](#connect-your-domain-any-host).

---

### Option B — Netlify

1. **Add the fallback file.** Create `src/sites/<site-id>/public/_redirects` containing this one line:

   ```
   /*  /index.html  200
   ```

2. **Build:** `npm run build -- <site-id>`.

3. **Deploy.** Either:
   - **Drag and drop:** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drop the `dist/<site-id>` folder. It creates a new Netlify site.
   - **Command line:**
     ```bash
     npx netlify-cli login
     npx netlify-cli deploy --dir=dist/<site-id> --prod
     ```
     The first time, choose **Create & configure a new site**. Netlify then remembers the link for that folder.

4. **Domain:** in the site's dashboard, open **Domain management → Add a domain**.

To update the site later, rebuild and deploy the same `dist/<site-id>` folder to the same Netlify site, either by dragging it onto the site's **Deploys** page or by running the same CLI command.

---

### Option C — Cloudflare Pages

No extra file is needed. Cloudflare Pages serves `index.html` for unknown addresses automatically when the site has no `404.html`.

1. **Build:** `npm run build -- <site-id>`.
2. **Deploy.** Either:
   - **Dashboard:** go to **Workers & Pages → Create → Pages → Upload assets**, name the project, and upload the `dist/<site-id>` folder.
   - **Command line:**
     ```bash
     npx wrangler login
     npx wrangler pages deploy dist/<site-id> --project-name=<site-id>
     ```
     The first time, it offers to create the project.
3. **Domain:** in the project, open **Custom domains → Set up a custom domain**. This is easiest when the domain's DNS is already on Cloudflare.

---

### Option D — Vercel

1. **Add the fallback file.** Create `src/sites/<site-id>/public/vercel.json`:

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

2. **Build:** `npm run build -- <site-id>`.

3. **Deploy:**
   ```bash
   npx vercel login
   npx vercel deploy dist/<site-id> --prod
   ```
   The first time, accept the prompt to create a new project, and give it the site's name.

4. **Domain:** in the project, open **Settings → Domains**.

---

### Option E — cPanel / shared hosting (Hostinger, GoDaddy, Bluehost …)

1. **Add the fallback file.** Create `src/sites/<site-id>/public/.htaccess`:

   ```apache
   FallbackResource /index.html
   ```

   If the host shows a "500 Internal Server Error" with that line, replace it with this more widely supported version:

   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

2. **Build:** `npm run build -- <site-id>`.

3. **Upload.** Upload the **contents** of `dist/<site-id>/` (`index.html`, `assets/`, `favicon.svg`, `.htaccess` …), not the folder itself, into the domain's web root. That's usually `public_html/`, or the folder cPanel created for an addon domain or subdomain. Use cPanel **File Manager** (upload a zip, then **Extract**) or an FTP client like FileZilla.

   > `.htaccess` starts with a dot, so it's hidden by default. In File Manager, open **Settings → Show Hidden Files** to check it was uploaded.

4. **Domain:** if the domain was bought with the hosting, it already points there. Otherwise set the domain's nameservers or A record to the ones your host gives you.

5. **To update:** delete the old `assets/` folder on the server, then upload the new build. Old files are harmless but take up space.

The site must sit at the **root** of its domain or subdomain (e.g. `brandb.in` or `shop.brandb.in`), not in a sub-folder like `brandb.in/site/`.

---

### GitHub Pages — not recommended

GitHub Pages can't serve `index.html` for unknown addresses, so links like `/contact` would show a 404 when opened directly or refreshed. Use one of the hosts above instead.

---

### Connect your domain (any host)

1. **Add the domain in your host's dashboard.** It will show you DNS records to create, usually an `A` record for `brandb.in` and a `CNAME` for `www`.
2. **Create those records** where you bought the domain (GoDaddy, Namecheap, Hostinger, Cloudflare …). DNS changes can take from a few minutes to 48 hours.
3. **Wait for HTTPS.** All the hosts above issue a free HTTPS certificate automatically once DNS is working.
4. **Update `site.ts`:**
   ```ts
   domains: ['brandb.in', 'www.brandb.in'],
   url: 'https://brandb.in',
   ```
5. **Rebuild and redeploy.** The canonical link and the WhatsApp/Facebook share image use this address.

---

### Updating a site later

Edit the files in `src/sites/<site-id>/`, then:

```bash
npm test
npm run build -- <site-id>
```

Then deploy `dist/<site-id>` the same way you did the first time, e.g. `firebase deploy --only hosting:<site-id>`, or upload to Netlify, Cloudflare, Vercel or cPanel. Other sites aren't affected.

---

## Part 7 — Adding something the platform doesn't have yet

### Something only this site needs → a custom component

1. **Create the component.** Make a Vue file in your site's `components/` folder, e.g. `src/sites/your-site-id/components/OfferBanner.vue`:

   ```vue
   <script setup lang="ts">
   import { useSite } from '@/platform/site/useSite'
   import BaseButton from '@/platform/components/ui/BaseButton.vue'

   defineProps<{ heading: string; text: string }>()
   const { contact } = useSite().config      // the site's config is available everywhere
   </script>

   <template>
     <section class="py-12">
       <div class="container-site">
         <div class="card-surface p-8 text-center">
           <h2 class="heading-lg">{{ heading }}</h2>
           <p class="mt-3 text-muted">{{ text }}</p>
           <BaseButton :href="contact.phones[0].href" class="mt-6">Call now</BaseButton>
         </div>
       </div>
     </section>
   </template>
   ```

2. **Register it and place it on a page** in `index.ts`:

   ```ts
   import OfferBanner from './components/OfferBanner.vue'

   const site: SiteConfig = {
     …,
     components: { OfferBanner },
     pages: [{
       path: '/',
       sections: [
         { type: 'hero', content: hero },
         { type: 'custom', component: 'OfferBanner', props: { heading: 'Diwali offer', text: '…' } },
         …
       ]
     }]
   }
   ```

   Add `id: 'offers'` to the section if you want to link to it.

3. **A whole custom page:** register the component, then use `{ path: '/offers', title: 'Offers', component: 'OffersPage' }`.

**Styling custom components:**
- **Use the shared classes:** `container-site`, `section-padding`, `heading-lg`, `heading-xl`, `text-muted`, `eyebrow`, `card-surface`, `gradient-text`.
- **Use themed colours:** `primary-*`, `accent-*`, `slate-*`, `steel-*`, `bg-surface`, `bg-raised`, `border-line`, `text-heading`. The component then follows the site's theme and dark mode automatically.
- **Avoid fixed hex colours** in components.

### Something several sites could use → add it to the platform

Only do this when the feature is genuinely reusable.

1. Create the section component in `src/platform/components/sections/`. Take `content` (and `variant` if needed) as props.
2. Add its content type and a new line in the `SectionConfig` union in `src/platform/site/types.ts`.
3. Register it in `src/platform/sections.ts` with its default anchor and an optional `isEmpty` rule.
4. Add a test in `tests/` and run `npm run check`. **Every site is rebuilt and tested**, so you'll see if you broke one.

> **Don't** add checks like `if (site.id === 'brand-b')` to shared components. Add an option to the content or a variant instead, or use a custom component.

---

## Part 8 — Troubleshooting

| Problem | Cause and fix |
|---|---|
| `Invalid site configuration: <folder>: id "…" must match its folder name` | `id` in `site.ts` differs from the folder name. Make them identical. |
| `… must be lowercase-kebab-case` | Rename the folder and the id: `brand-b`, not `Brand_B`. |
| `… must be a hex colour` | A palette colour isn't hex, or a scale is missing a step. All 11 steps, 50–950, are needed. |
| Build fails with an error mentioning `@/platform` from `site.ts` or `theme.ts` | These files are read at build time. Change `import { X } from '@/…'` to `import type { X } from '@/…'`, and keep real imports relative (`./theme`). |
| `http://localhost:3000/my-site/` shows another site, or "No site found" | The folder needs a `site.ts`. Restart `npm run dev` after creating a new site folder, because sites are discovered at startup. |
| A placeholder shows instead of my photo | The file name passed to `asset('…')` doesn't match a file in `assets/` exactly. It's case-sensitive and the extension counts. In dev, the browser console prints `[site assets] "…" not found`. |
| Logo doesn't show | Check `brand.logo` in `index.ts` and the file names in `assets/`. Without a logo, the favicon mark and name are shown on purpose. |
| A nav link is missing | It points at a section that's hidden because it's empty (e.g. `reviews` with no items), or isn't on the home page. Run `npm test` to see link errors. |
| Opening `/reviews` (or another section path) shows "Page not found" | That section is hidden or doesn't exist on the home page. |
| A direct link like `/contact` returns 404 on the live site | The host isn't serving `index.html` for unknown addresses. Firebase: check `rewrites` in `firebase.json`. Netlify: `_redirects`. Vercel: `vercel.json`. cPanel: `.htaccess` (and check it was uploaded). See [the one rule for every host](#the-one-rule-for-every-host). |
| cPanel site shows "500 Internal Server Error" | The host doesn't allow `FallbackResource`. Use the longer `RewriteRule` version of `.htaccess` from [Option E](#option-e--cpanel--shared-hosting-hostinger-godaddy-bluehost-). |
| Highlighted heading words are invisible | `highlight` in the theme must be a gradient: `linear-gradient(#hex, #hex)`, not a plain colour. |
| WhatsApp/Facebook preview shows no image | Set `url` in `site.ts`, put `og-image.png` in `public/`, rebuild and redeploy. Facebook caches previews, so re-scrape with their Sharing Debugger. |
| Dark mode looks wrong | Check every key in `theme.dark`. To turn dark mode off, set `features.darkMode: false`. |
| Fonts look like Times New Roman | The `fonts.stylesheet` URL is wrong, or the font names in `sans`/`display` don't match the fonts it loads. |

---

## Part 9 — Checklist

Copy this into your notes for each new site.

**Setup**
- [ ] Folder `src/sites/<site-id>/` created (copied from an existing site)
- [ ] `site.ts`: `id` matches folder, `name`, `seo.title`, `seo.description`, `themeColor`, `features`
- [ ] `theme.ts`: palette (all 11 steps), light and dark colours, fonts, effects
- [ ] `public/favicon.svg` replaced
- [ ] Old site's images removed from `assets/`; own logos and photos added
- [ ] `contact.ts`: phones (`tel:` links), email (`mailto:` or `null`), address, hours, map
- [ ] `navigation.ts`: header links, call button label, footer columns
- [ ] `content/`: all text replaced. **No leftover text from the copied site**: search the folder for the old site's name.
- [ ] `index.ts`: brand logo and tagline, sections in the order you want

**Check**
- [ ] `npm test` passes
- [ ] Checked in `npm run dev` at `/<site-id>/`: links, dark mode, phone width, keyboard focus
- [ ] `npm run check` passes

**Go live**
- [ ] Host chosen (Firebase, Netlify, Cloudflare Pages, Vercel or cPanel)
- [ ] SPA fallback set up for that host (`firebase.json` target / `_redirects` / `vercel.json` / `.htaccess` in the site's `public/`)
- [ ] `npm run build -- <site-id>` and `dist/<site-id>` deployed
- [ ] Opening `https://<domain>/contact` directly works (no 404)
- [ ] Domain connected and HTTPS working
- [ ] `url` and `domains` set in `site.ts`, rebuilt and redeployed
- [ ] Shared link tested on WhatsApp
- [ ] Changes committed to git
