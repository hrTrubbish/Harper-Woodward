module.exports = {
  // important: true,
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        garthbeige: 'hsl(52, 37%, 74%)',
        garthbrown: 'hsl(0, 16%, 13%)',
      },
      cursor: {
        fancy: 'url(hand.cur), pointer',
      },
    },
  },
  variants: {},
  plugins: [],
};
