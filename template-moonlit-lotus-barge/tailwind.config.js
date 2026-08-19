/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#061126",
        night: "#10254A",
        lotus: "#A74767",
        "lotus-light": "#E8AFC2",
        moon: "#D8E2F0",
        pearl: "#F4EFE8",
        dusk: {
          deep: "#061126",
          purple: "#10254A",
          magenta: "#A74767",
          rose: "#E8AFC2",
        },
        glow: {
          gold: "#D8E2F0",
          warm: "#E8AFC2",
          flame: "#D2A35D",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        lantern: "0 0 28px rgba(232, 175, 194, 0.38)",
      },
    },
  },
  plugins: [],
};
