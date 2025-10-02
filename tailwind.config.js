/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lora', 'Georgia', 'serif'],
      },
      fontWeight: {
        thin: '300',
      },
    },
  },
  plugins: [],
}