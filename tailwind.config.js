/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        md: "1rem",
        sm: "0.5rem",
      },
      margin: {
        md: "1rem",
        sm: "0.5rem",
      },
      gap: {
        md: "1rem",
        sm: "0.5rem",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "retro", "cyberpunk"],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
