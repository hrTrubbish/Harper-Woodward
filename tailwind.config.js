module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/client/styles/img/campfire.jpg')",
      },
      cursor: {
        fancy: 'url(hand.cur), pointer',
      },
    },
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: '#e3342f',
    }),
  },
  variants: {},
  plugins: [],
};
