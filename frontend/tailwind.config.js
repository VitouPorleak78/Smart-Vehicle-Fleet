/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom corporate fleet slate definitions matching your styles
        navy: {
          900: '#0B192E',
          950: '#020617',
        }
      }
    },
  },
  plugins: [],
}