module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      xl2: '1360px',
    },
    extend: {
      fontFamily: {
        poor: ['PoorStory', 'sans-serif'],
        noto: ['Noto Sans KR', 'sans-serif'],
        doHyeon: ['DoHyeon', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['light', 'emerald', 'dark', 'forest', 'synthwave'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
