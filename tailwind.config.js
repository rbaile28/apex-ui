/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@magic-ui/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        tiffany: '#81ecec'
      }
    },
  },
  plugins: [],
}
