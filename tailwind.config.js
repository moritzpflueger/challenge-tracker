/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      backgroundImage: {
        noise: "url('@/assets/noise.png')"
      },      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}