const { zinc } = require('tailwindcss/colors')

const colors = /** @type {const} */ ({
  primary: '#0C79FE',
  grey: zinc,
  text: {
    high: '#000',
    low: '#818181',
  },
  background: {
    low: '#F7F7F6',
    medium: '#E9E9E9',
  },
})

module.exports.colors = colors
