/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        // Signal Orange — primary enquiry buttons and CTAs (500 = #FF6B35)
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
        // Electric Cyan — LED accents, links, active states (500 = #00D4FF, 700 = darker shade for text on light)
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
        // Midnight Navy / Deep Slate — dark backgrounds, cards, footer
        navy: {
          DEFAULT: '#0B1220',
          deep: '#151F30'
        },
        // Dark Text — body text on light backgrounds
        ink: '#172033',
        // Ice Gray (100 = #F1F5F9) to Steel Gray (400 = #94A3B8) neutral scale
        steel: {
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Orange hero glow removed. To use a cyan glow instead:
        // 'radial-gradient(60% 60% at 50% 0%, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0) 70%)'
        'hero-glow': 'none'
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(0,0,0,0.08)',
        'soft-lg': '0 20px 50px -12px rgba(0,0,0,0.15)',
        glow: '0 0 0 1px rgba(255,107,53,0.18), 0 8px 30px -8px rgba(255,107,53,0.45)'
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
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(28px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInDown: {
          from: { opacity: 0, transform: 'translateY(-28px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.92)' },
          to: { opacity: 1, transform: 'scale(1)' }
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
}