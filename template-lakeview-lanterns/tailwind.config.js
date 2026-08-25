/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dusk: {
          deep: "#071f24",
          purple: "#103b3d",
          magenta: "#a66f70",
          rose: "#c8958e",
        },
        glow: {
          gold: "#D8BC83",
          warm: "#E9C6A4",
          flame: "#F0AE65",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        lantern: "0 0 28px rgba(255, 179, 71, 0.45)",
      },
    },
  },
  plugins: [],
};
