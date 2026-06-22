module.exports = {
  content: [
    './*.html',
    './blog/**/*.html',
    './assets/js/**/*.js',
    './translations*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2590b3',
          dark: '#1e7a9a',
          deep: '#165b73',
          light: '#e8f4f8'
        },
        secondary: {
          DEFAULT: '#f5a623',
          dark: '#d97706',
          light: '#fef3c7'
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#334155',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif']
      }
    }
  },
  safelist: [
    'hidden',
    'block',
    'active',
    'nav-scrolled',
    'lang-active',
    'aos-animate'
  ]
};
