module.exports = {
  important: true,
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        garthbeige: 'hsl(52, 37%, 74%)',
        garthbrown: 'hsl(0, 16%, 13%)',
      },
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
