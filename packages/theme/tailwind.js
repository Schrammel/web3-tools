const { colors } = require('./colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      textColor: colors.text,
      colors: colors,
      backgroundColor: colors.background,
      fontFamily: {
        sans: `var(--font-sans)`,
        mono: `var(--font-mono)`,
      },
      boxShadow: {
        lg: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
