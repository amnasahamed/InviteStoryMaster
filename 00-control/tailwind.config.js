/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f5f7",
        panel: "#ffffff",
        ink: "#111827",
        muted: "#6b7280",
        line: "#e5e7eb",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          soft: "#eff6ff",
        },
        success: {
          DEFAULT: "#059669",
          soft: "#ecfdf5",
        },
        danger: {
          DEFAULT: "#dc2626",
          soft: "#fef2f2",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [],
};
