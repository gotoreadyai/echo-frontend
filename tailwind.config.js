/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        md: "1rem",
        sm: "0.6rem",
      },
      margin: {
        md: "1rem",
        sm: "0.6rem",
      },
      gap: {
        md: "1rem",
        sm: "0.6rem",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "retro", "cyberpunk","pastel","nord"],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
