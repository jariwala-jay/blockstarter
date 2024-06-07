const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"

  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'sofia': ['Sofia Sans', 'sans-serif'],
        'nanum': ['Nanum Gothic Coding', 'monospace'],
        'tomorrow': ['Tomorrow', 'sans-serif'],
        "teko": ['Teko', 'sans-serif'],
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
          slidein : "slidein 1s ease 700ms",
          slideup : "slideup 1s ease 700ms",
          slideleft : "slideleft 1s ease 700ms"
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-15px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideleft: {
          from: {
            opacity: "0",
            transform: "translateX(15px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideup: {
          from: {
            opacity: "0",
            transform: "translateY(15px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },

  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}