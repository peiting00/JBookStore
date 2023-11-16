/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f3c614',
        'secondary': '#353535',
      },
      fontFamily: {
        primary: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

