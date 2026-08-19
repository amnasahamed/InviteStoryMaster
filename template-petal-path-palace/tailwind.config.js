/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        petal: {
          ink: "#2a1830",
          rose: "#c45a7a",
          blush: "#f2c4d0",
          cream: "#faf3eb",
          gold: "#c9a86a",
          stone: "#e8dcc8",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Outfit"', "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
