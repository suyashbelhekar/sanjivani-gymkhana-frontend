/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f8',
          100: '#d5dff0',
          200: '#abbfdf',
          300: '#7a9acb',
          400: '#4e78b8',
          500: '#1a4f8a',   // primary navy
          600: '#163f6e',
          700: '#112f52',
          800: '#0b2038',
          900: '#071527',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',   // accent gold/orange
          600: '#d97706',
        },
        saffron: '#FF6B35',  // action/CTA orange
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 12px 0 rgba(26,79,138,0.08)',
        hover: '0 6px 24px 0 rgba(26,79,138,0.15)',
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer':  'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },                           '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' },          '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
