/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      'mobile-landscape': { 'raw': '(max-width: 767px) and (orientation: landscape)' },
      'tablet-landscape': { 'raw': '(min-width:768px) and (orientation: landscape)' },
      'desktop-landscape': { 'raw': '(min-width:1024px) and (orientation: landscape)' },
      'desktop-portrait': { 'raw': '(min-width: 1024px) and (orientation: portrait)' },
      'tablet-portrait': { 'raw': '(min-width: 768px) and (max-width: 1023px) and (orientation: portrait)' },
      'mobile-portrait': { 'raw': '(max-width: 767px) and (orientation: portrait)' },
    },
    extend: {
      colors: {
        green: '#28DC89',
        red: '#FD6A6B',
        black: '#1A1C23',
        cardBlack: '#181A20',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
