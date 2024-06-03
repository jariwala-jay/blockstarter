/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"

  ],
  theme: {
    extend: {
      fontFamily: {
        'sofia': ['Sofia Sans', 'sans-serif'],
        'nanum': ['Nanum Gothic Coding', 'monospace'],
      },
    },
  },

  plugins: [],
};
