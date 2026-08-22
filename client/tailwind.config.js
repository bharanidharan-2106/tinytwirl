/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#7B2D8E',
          dark: '#5E2270',
          light: '#9B4DAD',
        },
        turquoise: {
          DEFAULT: '#00BCD4',
          dark: '#0097A7',
          light: '#4DD0E1',
        },
        yellow: {
          DEFAULT: '#FFD54F',
          dark: '#FFC107',
        },
        charcoal: '#1E293B',
        cream: '#FFFBF5',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(123, 45, 142, 0.08)',
        card: '0 8px 32px rgba(30, 41, 59, 0.08)',
      },
    },
  },
  plugins: [],
};
