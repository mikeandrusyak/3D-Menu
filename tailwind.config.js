/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF9800',
        'brand-green': '#43D351',
        'brand-purple': '#E1D5FA',
        'orange-light': '#FFE0B2',
        'green-light': '#C8E6C9',
        'purple-light': '#F3E8FF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        oleo: ['Oleo Script Swash Caps', 'cursive'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}