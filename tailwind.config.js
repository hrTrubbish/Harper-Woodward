const generateRandomColor = () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return color;
};

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
        randomColor: generateRandomColor(),
      },
      cursor: {
        fancy: 'url(hand.cur), pointer',
      },
    },
  },
  variants: {},
  plugins: [],
};
