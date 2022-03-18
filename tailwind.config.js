/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Spoqa Han Sans Neo", "sans-serif"],
      },
      colors: {
        primary: {
          default: "#728892",
          700: "#3F5866",
          500: "#98A9B0",
          300: "#C0CACF",
        },
        secondary: {
          default: "#FD8F00",
          700: "#FFAA2A",
          500: "#FFC16F",
          300: "#FFD9AA",
        },
        back: {
          100: "#FFFFFF",
          200: "#FAFAFA",
          300: "#F4F4F4",
          400: "#EEEEEE",
        },
        text: {
          100: "#4C4C4C",
          200: "#636363",
          300: "#999999",
        },
        line: {
          100: "#E6E6E6",
          200: "#D3D3D3",
          300: "#C8C8C8",
        },
      },
      borderRadius: {
        sm: "3px",
        default: "5px",
        lg: "10px",
        xl: "25px",
      },
      inset: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        "1/2": "50%",
        full: "100%",
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  variants: ["responsive", "hover"],
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        svg: {
          display: "inline",
        },
        img: {
          display: "inline",
        },
      });
    }),
  ],
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.tsx",
      "components/**/*.jsx",
      "pages/**/*.tsx",
      "pages/**/*.jsx",
    ],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
