/** Hex colour steps for a palette, e.g. `{ 50: '#fff4ef', ..., 950: '#461407' }`. */
export type ColorScale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>

/**
 * Semantic colours that change between light and dark mode. Values are any CSS
 * colour (hex, rgb(), rgba()) except where noted as a CSS background.
 */
export interface ThemeMode {
  /** Page background. */
  page: string
  /** Body text. */
  fg: string
  /** h1–h4. */
  heading: string
  /** Secondary text (`.text-muted`). */
  muted: string
  /** Subtle dividers and image borders. */
  line: string
  /** Card background (`.card-surface`). */
  surface: string
  /** Card border. */
  surfaceLine: string
  /** Floating badges over images (e.g. hero call badges). */
  raised: string
  /** Translucent navbar background once scrolled. */
  glass: string
  eyebrowFg: string
  eyebrowBg: string
  eyebrowLine: string
  /** CSS background used for highlighted heading words (`.gradient-text`). Use a gradient for a gradient. */
  highlight: string
  /** Small status text, e.g. the hero availability badge. */
  status: string
  focusRing: string
  selection: string
  scrollbar: string
}

export interface Theme {
  palette: {
    /** Buttons, links, icons, CTAs. */
    primary: ColorScale
    /** Secondary brand colour. */
    accent: ColorScale
    /** Greys used for text, borders and backgrounds (`slate-*` classes). */
    neutral: ColorScale
    /** Brand-tinted greys (`steel-*` classes), e.g. the stats band. */
    steel: ColorScale
    /** Single dark brand colour (`ink` class) used for hairline borders. */
    ink: string
  }
  light: ThemeMode
  dark: ThemeMode
  fonts: {
    /** CSS font-family list for body text. */
    sans: string
    /** CSS font-family list for headings. */
    display: string
    /** Stylesheet URL that loads the fonts, e.g. a Google Fonts URL. */
    stylesheet?: string
  }
  /** Brand effects. CSS backgrounds; use `'none'` to switch one off. */
  effects: {
    /** Top-of-page scroll progress bar. */
    progressBar: string
    /** Overlay that fades in when hovering a card. */
    cardHover: string
    /** Icon tile on the hero call badges. */
    badgeIcon: string
    /** Radial glow behind the hero. */
    heroGlow: string
    /** Colour of the glow shadow on primary buttons (hex). Defaults to primary-500. */
    glowColor?: string
  }
  /** Max content width, e.g. `'80rem'`. */
  containerWidth: string
}
