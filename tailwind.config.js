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
        section: '0 1px 0 #DDE4EC',
      },
      backgroundImage: {
        'hero-grid': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(47,128,237,0.07)' stroke-width='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
