// eslint-disable-next-line no-undef
module.exports = {
  theme: {
    purge: [
      './pages/**/*.js',
      './components/**/*.js',
    ],
    extend: {
      colors: {
        'cr-purple-dark': '#19042d',
        'cr-purple-light': '#481754',
        'cr-yellow': '#faff00',
        'cr-blue': '#110069',
      },
    },
  },
  variants: {
    cursor: ['hover'],
  },
  plugins: [],
};
