module.exports = {
  purge: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/**/*.html",
  ],
  theme: {
    fill: theme => ({
      'gray': theme('colors.gray.700'),
      'white': theme('colors.white'),
    }),
    extend: {
      height: {
        threequarter: "75vh",
        half: "50vh",
        quarter: "25vh",
        "1/2": "50%",
        entire: "calc(100vh - 8rem)",
        chat: "calc(100vh - 16rem)",
      },
      maxHeight: {
        "1/2": "50%",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      colors: {
        primary: "rgb(118, 198, 188)",
        "primary-light": "rgba(187, 227, 222, 0.8)",
        secondary: "#FED771",
        "secondary-light": "#FEE6A6",
      },
    },
  },
  variants: {},
  plugins: [],
};
