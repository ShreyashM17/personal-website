/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../templates/**/*.html',
    '../../core/templates/**/*.html',
    '../../projects/templates/**/*.html',
    '../../blog/templates/**/*.html',
  ],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
        '-15': '-15',
        '-20': '-20',
      }
    },
  },
  plugins: [
  require('@tailwindcss/typography'),
  ],
}