/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: {
            main: "#FE634E",
            light: "#FFF8F2",
          },
          success: {
            main: "#16B681",
            light: "#EBFFF3",
          },
          error: {
            main: "#BF453A",
          },
          secondary: {
            white: "#fff",
            black: "#232323",            
          },
        },
        font: {
          primary: {
            main: "#FE634E",
          },
          secondary: {
            white: "#fff",
            black: "#232323",
            gray: "#A9A9A9"
          },
        },
        border: {
          main: "#D3D3D3",
          black: "#232323",
          secondary: "#DBE0E5",
        },
        gray: {
          main: "#EAEDF0",
        },
      },
    },
  },
  plugins: [],
};
