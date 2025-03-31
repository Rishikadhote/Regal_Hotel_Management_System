/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#FFD700",
          500: "#FFC107",
          600: "#FFA000",
        },
        dark: {
          900: "#121212",
          800: "#1E1E1E",
        },
        gray: {
          850: "#2D2D2D",
        },
      },
      boxShadow: {
        "gold-glow": "0 0 12px rgba(255, 215, 0, 0.5)",
      },
      transitionTimingFunction: {
        "ease-in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    function ({ addComponents }) {
      addComponents({
        "input[type='date']::-webkit-calendar-picker-indicator": {
          filter: "invert(1)",
        },
      });
    },
  ],
};

export default tailwindConfig;
