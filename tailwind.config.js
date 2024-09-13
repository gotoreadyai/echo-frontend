/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        lg: "2rem",
        md: "1rem",
        sm: "0.6rem",
        xs: "0.3rem",
      },
      margin: {
        lg: "2rem",
        md: "1rem",
        sm: "0.6rem",
        xs: "0.3rem",
      },
      gap: {
        lg: "2rem",
        md: "1rem",
        sm: "0.6rem",
        xs: "0.3rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        bold: 700,
        extrabold: 900,
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "aqua",
      "retro",
      "cyberpunk",
      "pastel",
      "nord",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
