/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "selector",
  mode: "jit", // Włącza Just-In-Time mode
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
      keyframes: {
        wave: {
          "0%": { opacity: "0" },
          "25%": { opacity: ".75" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "init-pulse": "wave 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  },
  daisyui: {
    base: false,
    // utils: false,
    //styled: false,
    logs: false,
    rtl: false, 
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
