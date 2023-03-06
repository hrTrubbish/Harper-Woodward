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
  },
  variants: {},
  plugins: [],
};
