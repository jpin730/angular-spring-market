/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'gray-dark': '#4b5563',
        indigo: '#4338ca',
        red: '#991b1b',
      },
    },
  },
  plugins: [],
}
