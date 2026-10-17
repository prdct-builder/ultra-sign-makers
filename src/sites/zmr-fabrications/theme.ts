import type { Theme } from '@/platform/theme/types'

// Workshop orange with amber/red gradients over cool steel greys.
export const theme: Theme = {
  palette: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407'
    },
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    neutral: {
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
    },
    steel: {
      50: '#f6f7f8',
      100: '#eceef1',
      200: '#d5dae0',
      300: '#b0bac5',
      400: '#8494a3',
      500: '#647587',
      600: '#505f70',
      700: '#424e5c',
      800: '#39424d',
      900: '#333a43',
      950: '#1a1e24'
    },
    ink: '#0f172a'
  },
  light: {
    page: '#ffffff',
    fg: '#0f172a',
    heading: '#0f172a',
    muted: '#475569',
    line: 'rgb(226 232 240 / 0.7)',
    surface: '#ffffff',
    surfaceLine: 'rgb(226 232 240 / 0.7)',
    raised: '#ffffff',
    glass: 'rgb(255 255 255 / 0.7)',
    eyebrowFg: '#c2410c',
    eyebrowBg: '#fff7ed',
    eyebrowLine: 'rgb(254 215 170 / 0.6)',
    highlight: 'linear-gradient(to right, #ea580c, #f59e0b, #dc2626)',
    status: '#047857',
    focusRing: '#f97316',
    selection: 'rgb(249 115 22 / 0.3)',
    scrollbar: '#cbd5e1'
  },
  dark: {
    page: '#020617',
    fg: '#f1f5f9',
    heading: '#f1f5f9',
    muted: '#94a3b8',
    line: 'rgb(255 255 255 / 0.1)',
    surface: 'rgb(255 255 255 / 0.03)',
    surfaceLine: 'rgb(255 255 255 / 0.1)',
    raised: '#0f172a',
    glass: 'rgb(2 6 23 / 0.6)',
    eyebrowFg: '#fdba74',
    eyebrowBg: 'rgb(251 146 60 / 0.1)',
    eyebrowLine: 'rgb(251 146 60 / 0.2)',
    highlight: 'linear-gradient(to right, #fb923c, #fbbf24, #f87171)',
    status: '#34d399',
    focusRing: '#f97316',
    selection: 'rgb(249 115 22 / 0.3)',
    scrollbar: '#334155'
  },
  fonts: {
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
    display: "'Poppins', ui-sans-serif, system-ui, sans-serif",
    stylesheet:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=optional'
  },
  effects: {
    progressBar: 'linear-gradient(to right, #f97316, #f59e0b, #ef4444)',
    cardHover: 'linear-gradient(to bottom right, rgb(249 115 22 / 0.06), transparent)',
    badgeIcon: 'linear-gradient(to bottom right, #39424d, #ea580c)',
    heroGlow: 'radial-gradient(60% 60% at 50% 0%, rgba(249, 115, 22, 0.16) 0%, rgba(249, 115, 22, 0) 70%)'
  },
  containerWidth: '80rem'
}
