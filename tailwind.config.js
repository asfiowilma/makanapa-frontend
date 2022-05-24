module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fdfaed',
          '100': '#faf0cb',
          '200': '#f4e093',
          '300': '#eecc5b',
          '400': '#eab835',
          '500': '#e29a1e',
          '600': '#c87717',
          '700': '#a65617',
          '800': '#874319',
          '900': '#6f3718',
        },
        'secondary': {
          '50': '#fdf4f3',
          '100': '#fce8e7',
          '200': '#f9d2d2',
          '300': '#f3b0ae',
          '400': '#ec8081',
          '500': '#e05357',
          '600': '#cb333f',
          '700': '#ab2533',
          '800': '#8f2231',
          '900': '#7b202f',
        },
        'accent': {
          '50': '#ebfffe',
          '100': '#cefffe',
          '200': '#a2feff',
          '300': '#63fafd',
          '400': '#1cedf4',
          '500': '#00d4de',
          '600': '#03a6b7',
          '700': '#0a8494',
          '800': '#126978',
          '900': '#145765',
        },
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
}
