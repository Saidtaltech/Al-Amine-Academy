/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "!./node_modules/**", "./assets/js/**/*.js", "./*.js"],
  darkMode: 'class',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1e7a9a', dark: '#165b73', light: '#e8f4f8', 50: '#f0f9fc' },
        secondary: { DEFAULT: '#f59e0b', dark: '#d97706', light: '#fef3c7' },
        accent: { DEFAULT: '#1e7a9a', dark: '#165b73', light: '#e8f4f8' },
        coral: { DEFAULT: '#f43f5e', dark: '#e11d48', light: '#ffe4e6' },
        teal: {
          50: '#f0f9fc', 100: '#d5eef5', 200: '#aadcea', 300: '#7ec9df',
          400: '#3ba5c9', 500: '#2590b3', 600: '#1e7a9a', 700: '#165b73',
          800: '#0f4457', 900: '#0a3040', 950: '#061e2a'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        arabic: ['Amiri', 'serif']
      }
    }
  },
  plugins: []
}
