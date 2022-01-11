module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "360px",
      xs: "520px",
      sm: "640px",
      md: "768px",
      mdlg: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      width: {
        game: "14.85rem",
      },
      height: {
        game: "24.75rem",
      },
      colors: {
        background: {
          100: "#3e3e3e",
          900: "#323232",
          950: "#2E2E2E",
          1000: "#282828",
          1100: "#242424",
          1200: "#202020",
        },
        buttonbg: {
          900: "#6969DE",
        },
      },
    },
  },
  plugins: [],
};
