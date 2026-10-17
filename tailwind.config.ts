import type { Config } from 'tailwindcss'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/** A colour scale whose steps read `--c-<name>-<step>` channels, keeping Tailwind's /opacity modifiers working. */
function scale(name: string) {
  return Object.fromEntries(STEPS.map((step) => [step, `rgb(var(--c-${name}-${step}) / <alpha-value>)`]))
}

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      // Every brand value comes from CSS variables set per site (src/platform/theme/themeToCss.ts),
      // so one build of these classes serves any theme.
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)']
      },
      colors: {
        primary: scale('primary'),
        accent: scale('accent'),
        steel: scale('steel'),
        slate: scale('neutral'),
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        page: 'var(--color-page)',
        heading: 'var(--color-heading)',
        line: 'var(--color-line)',
        surface: 'var(--color-surface)',
        raised: 'var(--color-raised)',
        status: 'var(--color-status)'
      },
      maxWidth: {
        site: 'var(--container-width)'
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(0,0,0,0.08)',
        'soft-lg': '0 20px 50px -12px rgba(0,0,0,0.15)',
        glow: '0 0 0 1px rgb(var(--c-glow) / 0.18), 0 8px 30px -8px rgb(var(--c-glow) / 0.45)',
        'glow-lg': '0 0 0 1px rgb(var(--c-glow) / 0.25), 0 12px 36px -8px rgb(var(--c-glow) / 0.55)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-down': 'fadeInDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        blob: 'blob 10s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-28px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' }
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(20px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-15px,15px) scale(0.95)' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
