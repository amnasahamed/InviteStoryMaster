/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dusk: {
          deep: "#1a0b24",
          purple: "#301934",
          magenta: "#8E2856",
          rose: "#c45b7a",
        },
        glow: {
          gold: "#D4AF37",
          warm: "#FFB347",
          flame: "#FDB813",
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
