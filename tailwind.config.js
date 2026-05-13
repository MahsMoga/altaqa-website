/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          dark: '#071529',
          mid: '#112847',
          light: '#1a3a5c',
          lighter: '#243d5e',
        },
        accent: {
          DEFAULT: '#2F80ED',
          light: '#5ba3f5',
          soft: '#E8F1FC',
        },
        slate: {
          corporate: '#F4F7FA',
          border: '#DDE4EC',
          text: '#8898A8',
        },
      },
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(11, 31, 58, 0.08)',
        'card-hover': '0 8px 32px rgba(11, 31, 58, 0.14)',
        'card-xl': '0 20px 60px rgba(11, 31, 58, 0.18)',
        section: '0 1px 0 #DDE4EC',
        glow: '0 0 20px rgba(47, 128, 237, 0.35)',
        'glow-lg': '0 0 40px rgba(47, 128, 237, 0.25)',
        'btn': '0 1px 3px rgba(47, 128, 237, 0.25), 0 4px 12px rgba(47, 128, 237, 0.12)',
        'btn-hover': '0 2px 8px rgba(47, 128, 237, 0.4), 0 8px 24px rgba(47, 128, 237, 0.22)',
      },
      backgroundImage: {
        'hero-grid': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(47,128,237,0.07)' stroke-width='1'/%3E%3C/svg%3E\")",
        'dot-pattern': "radial-gradient(rgba(47, 128, 237, 0.12) 1px, transparent 1px)",
      },
      animation: {
        'float': 'orbFloat 7s ease-in-out infinite',
        'float-slow': 'orbFloatSlow 9s ease-in-out infinite',
        'float-delayed': 'orbFloat 7s ease-in-out 3.5s infinite',
        'fade-in-up': 'fadeInUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        orbFloatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-28px) rotate(3deg)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
