/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          soft: "#F7F0E4",
          paper: "#F3E8D4",
          warm: "#EAD9BE",
        },
        temple: {
          deep: "#3A2618",
          bronze: "#6B4423",
          ink: "#2C1A10",
        },
        gold: {
          antique: "#B8893B",
          bright: "#D4AF37",
          soft: "#E8C978",
          pale: "#F4E4B8",
        },
        vermilion: {
          mute: "#C45B3A",
          soft: "#E07A55",
        },
        leaf: {
          deep: "#2F5D3A",
          bright: "#4F8A4A",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        gilded: "0 0 32px rgba(212, 175, 55, 0.35)",
        soft: "0 18px 50px rgba(44, 26, 16, 0.12)",
      },
    },
  },
  plugins: [],
};
