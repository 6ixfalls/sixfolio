const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./content/**/*.{md,json}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./modules/**/*.{js,ts}",
    "./assets/css/**/*.css",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        star1: {
          '0%, 100%': { 'opacity': 0.6 },
          '50%': { 'opacity': 0 },
        },
        moon: {
          '0%, 100%': { 'opacity': 0.6, 'transform': 'rotate(5deg);' },
          '50%': { 'opacity': 0.5, 'transform': 'rotate(-5deg);' },
        },
        scrollwheel: {
          '0%': { 'opacity': 0, 'top': '15%' },
          '10%': { 'opacity': 1 },
          '100%': { 'opacity': 0, 'top': '50%' },
        },
      },
      animation: {
        star1: 'star1 var(--star-flicker-start) ease-in-out infinite',
        star2: 'star1 var(--star-flicker-start) ease-in-out infinite',
        moon: 'moon 5s ease-in-out infinite',
        scrollwheel: 'scrollwheel 1s ease-in-out infinite',
      },
      screens: {
        'desktop': '2048px',
      },
      aspectRatio: {
        'og': '40 / 21'
      }
    },
    fontFamily: {
      text: ['Karla', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        'translate-z': (value) => ({
          '--tw-translate-z': value,
          transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
        }),
      },
        { values: theme('translate') });
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        'rotate-y': (value) => ({
          '--tw-rotate-y': value,
          transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
        }),
      },
        { values: theme('rotate') });
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        'perspective': (value) => ({
          '-webkit-perspective': value,
          '-moz-perspective': value,
          '-ms-perspective': value,
          '-o-perspective': value,
          perspective: value,
        }),
      },
        { values: theme('width') });
    }),
  ],
}