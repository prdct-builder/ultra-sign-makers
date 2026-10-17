import type { Theme } from '@/platform/theme/types'

// Signal Orange (CTAs) + Electric Cyan (highlights) on Midnight Navy.
const slate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617'
}

export const theme: Theme = {
  palette: {
    primary: {
      50: '#fff4ef',
      100: '#ffe6db',
      200: '#ffcbb6',
      300: '#ffa985',
      400: '#ff8556',
      500: '#ff6b35',
      600: '#f04d16',
      700: '#c73b10',
      800: '#9f3214',
      900: '#812d14',
      950: '#461407'
    },
    accent: {
      50: '#e6fbff',
      100: '#c0f5ff',
      200: '#8aeeff',
      300: '#4de3ff',
      400: '#1adaff',
      500: '#00d4ff',
      600: '#00aed1',
      700: '#007a99',
      800: '#006280',
      900: '#0a5069',
      950: '#04334a'
    },
    neutral: slate,
    steel: slate,
    ink: '#172033'
  },
  light: {
    page: '#ffffff',
    fg: '#172033',
    heading: '#0b1220',
    muted: 'rgb(23 32 51 / 0.75)',
    line: 'rgb(23 32 51 / 0.1)',
    surface: '#ffffff',
    surfaceLine: 'rgb(23 32 51 / 0.1)',
    raised: '#ffffff',
    glass: 'rgb(255 255 255 / 0.7)',
    eyebrowFg: '#007a99',
    eyebrowBg: 'rgb(0 212 255 / 0.1)',
    eyebrowLine: 'rgb(0 212 255 / 0.3)',
    highlight: 'linear-gradient(#007a99, #007a99)',
    status: '#007a99',
    focusRing: '#007a99',
    selection: 'rgb(0 212 255 / 0.3)',
    scrollbar: '#94a3b8'
  },
  dark: {
    page: '#0b1220',
    fg: '#f1f5f9',
    heading: '#ffffff',
    muted: '#94a3b8',
    line: 'rgb(255 255 255 / 0.1)',
    surface: '#151f30',
    surfaceLine: 'rgb(255 255 255 / 0.1)',
    raised: '#151f30',
    glass: 'rgb(11 18 32 / 0.7)',
    eyebrowFg: '#00d4ff',
    eyebrowBg: 'rgb(0 212 255 / 0.1)',
    eyebrowLine: 'rgb(0 212 255 / 0.25)',
    highlight: 'linear-gradient(#00d4ff, #00d4ff)',
    status: '#00d4ff',
    focusRing: '#00d4ff',
    selection: 'rgb(0 212 255 / 0.3)',
    scrollbar: 'rgb(148 163 184 / 0.4)'
  },
  fonts: {
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
    display: "'Poppins', ui-sans-serif, system-ui, sans-serif",
    stylesheet:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=optional'
  },
  effects: {
    // Progress bar and card hover overlay are switched off for this brand.
    progressBar: 'none',
    cardHover: 'none',
    badgeIcon: '#ff6b35',
    heroGlow: 'none'
  },
  containerWidth: '80rem'
}
