import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        brand:   ['var(--font-brand)',   'serif'],
        heading: ['var(--font-heading)', 'serif'],
        arabic:  ['var(--font-arabic)',  'serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      colors: {
        gold:       '#C9922A',
        'gold-l':   '#E8B84B',
        teal:       '#6B9E8F',
        'ae-green': '#4A7A6A',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
      maxWidth: {
        content: '1400px',
      },
      animation: {
        spin:        'spin 30s linear infinite',
        float:       'float 4s ease-in-out infinite',
        letterFade:  'letterFade 2.2s ease',
        fadeInUp:    'fadeInUp 0.45s cubic-bezier(0.16,1,0.3,1)',
        scrollLine:  'scrollLine 1.5s ease-in-out infinite',
        goldPulse:   'goldPulse 1.4s ease-in-out infinite',
        drawArc:     'drawArc 1.8s cubic-bezier(0.4,0,0.2,1) forwards',
        checkmark:   'checkmark 0.6s ease forwards',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        letterFade: { from: { opacity: '0', transform: 'scale(0.85)' }, to: { opacity: '1', transform: 'scale(1)' } },
        fadeInUp:   { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scrollLine: { '0%,100%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'top' }, '50%': { opacity: '1', transform: 'scaleY(1)' } },
        goldPulse:  { '0%,100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.08)' } },
        drawArc:    { from: { strokeDashoffset: '352' }, to: { strokeDashoffset: '0' } },
        checkmark:  { from: { strokeDashoffset: '100' }, to: { strokeDashoffset: '0' } },
      },
    },
  },
  plugins: [],
}

export default config
