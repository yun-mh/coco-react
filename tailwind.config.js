module.exports = {
  purge: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
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
