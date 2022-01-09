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
          1000: "#313131",
        },
        buttonbg: {
          900: "#6969DE",
        },
      },
    },
  },
  plugins: [],
};
