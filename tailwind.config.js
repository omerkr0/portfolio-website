/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        midlarge: { min: '870px' }
      },
    },
  },
  plugins: [],
}
