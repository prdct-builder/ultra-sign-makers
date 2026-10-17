import type { ColorScale, Theme, ThemeMode } from './types'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isHex(value: string): boolean {
  return HEX.test(value)
}

/** `#ff6b35` → `255 107 53`, the channel format Tailwind's `<alpha-value>` needs. */
export function hexToChannels(hex: string): string {
  if (!isHex(hex)) throw new Error(`Invalid hex colour: ${hex}`)
  let h = hex.slice(1)
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

const MODE_VARS: Record<keyof ThemeMode, string> = {
  page: '--color-page',
  fg: '--color-fg',
  heading: '--color-heading',
  muted: '--color-muted',
  line: '--color-line',
  surface: '--color-surface',
  surfaceLine: '--color-surface-line',
  raised: '--color-raised',
  glass: '--color-glass',
  eyebrowFg: '--eyebrow-fg',
  eyebrowBg: '--eyebrow-bg',
  eyebrowLine: '--eyebrow-line',
  highlight: '--highlight',
  status: '--color-status',
  focusRing: '--focus-ring',
  selection: '--selection',
  scrollbar: '--scrollbar'
}

function scaleVars(name: string, scale: ColorScale): string[] {
  return Object.entries(scale).map(([step, hex]) => `--c-${name}-${step}: ${hexToChannels(hex)};`)
}

function modeVars(mode: ThemeMode): string[] {
  return (Object.keys(MODE_VARS) as (keyof ThemeMode)[]).map((key) => `${MODE_VARS[key]}: ${mode[key]};`)
}

/**
 * Turns a theme into CSS custom properties scoped to `[data-site="<id>"]`, so one
 * site's tokens can never apply to another. Dark-mode tokens apply under `.dark`.
 */
export function themeToCss(siteId: string, theme: Theme): string {
  const scope = `:root[data-site="${siteId}"]`
  const { palette, fonts, effects } = theme
  const glow = hexToChannels(effects.glowColor ?? palette.primary[500])

  const base = [
    ...scaleVars('primary', palette.primary),
    ...scaleVars('accent', palette.accent),
    ...scaleVars('neutral', palette.neutral),
    ...scaleVars('steel', palette.steel),
    `--c-ink: ${hexToChannels(palette.ink)};`,
    `--c-glow: ${glow};`,
    `--font-sans: ${fonts.sans};`,
    `--font-display: ${fonts.display};`,
    `--container-width: ${theme.containerWidth};`,
    `--progress-bar: ${effects.progressBar};`,
    `--card-hover: ${effects.cardHover};`,
    `--badge-icon: ${effects.badgeIcon};`,
    `--hero-glow: ${effects.heroGlow};`,
    ...modeVars(theme.light)
  ]

  const indent = (lines: string[]) => lines.map((l) => `  ${l}`).join('\n')
  return `${scope} {\n${indent(base)}\n}\n${scope}.dark {\n${indent(modeVars(theme.dark))}\n}\n`
}
