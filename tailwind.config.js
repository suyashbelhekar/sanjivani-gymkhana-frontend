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
        'fade-in':      'fadeIn 0.4s ease-in-out',
        'fade-in-slow': 'fadeIn 0.8s ease-in-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-up-slow':'slideUp 0.7s ease-out',
        'slide-in-left':'slideInLeft 0.5s ease-out',
        'slide-in-right':'slideInRight 0.5s ease-out',
        'scale-in':     'scaleIn 0.35s ease-out',
        'bounce-in':    'bounceIn 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'float':        'float 3s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
        'shimmer':      'shimmer 1.8s linear infinite',
        'spin-slow':    'spin 6s linear infinite',
        'wiggle':       'wiggle 0.4s ease-in-out',
        'count-up':     'countUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' },                                       '100%': { opacity: '1' } },
        slideUp:      { '0%': { transform: 'translateY(16px)', opacity: '0' },        '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideInLeft:  { '0%': { transform: 'translateX(-30px)', opacity: '0' },       '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideInRight: { '0%': { transform: 'translateX(30px)',  opacity: '0' },       '100%': { transform: 'translateX(0)', opacity: '1' } },
        scaleIn:      { '0%': { transform: 'scale(0.92)', opacity: '0' },             '100%': { transform: 'scale(1)',      opacity: '1' } },
        bounceIn:     { '0%': { transform: 'scale(0.85)', opacity: '0' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        float:        { '0%,100%': { transform: 'translateY(0px)' },                  '50%':  { transform: 'translateY(-8px)' } },
        pulseGlow:    { '0%,100%': { boxShadow: '0 0 0 0 rgba(26,79,138,0.15)' },    '50%':  { boxShadow: '0 0 20px 4px rgba(26,79,138,0.25)' } },
        shimmer:      { '0%': { backgroundPosition: '-200% 0' },                      '100%': { backgroundPosition: '200% 0' } },
        wiggle:       { '0%,100%': { transform: 'rotate(0deg)' }, '25%': { transform: 'rotate(-8deg)' }, '75%': { transform: 'rotate(8deg)' } },
        countUp:      { '0%': { transform: 'translateY(10px)', opacity: '0' },        '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
