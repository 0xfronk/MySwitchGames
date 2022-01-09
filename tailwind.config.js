module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      width: {
        game: "13.5rem",
      },
      height: {
        game: "22.5rem",
      },
      colors: {
        background: {
          100: "#3e3e3e",
          900: "#323232",
          950: "#2E2E2E",
          1000: "#282828",
        },
        buttonbg: {
          900: "#6969DE",
        },
      },
    },
  },
  plugins: [],
};
