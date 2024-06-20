/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iconPrimary: "#64748b",
        textPrimary: "#374151",
        bgPrimary: "#f97316",
        bgColor: "#f1f5f9"
      },
      fontFamily: {
        'roboto': ["Roboto", 'sans-serif'],
        'poppins': ["Poppins", 'sans-serif'],
      },
      translate: {
        400: "-210px",
        54: "216px",
        100: "100%"
      },
      width: {
        '95p': "95%",
        '92p': "81.2%",
        '94p': "94.7%",
      },
      height: {
        '500': "500px"
      },
      gridColumn: {
        '300': 'grid-template-cols: repeat(2,  1fr)'
      },
      screens: {
        'tablat': '828px',
        'tablat-sm': '761px',
        'tablat-vsm': '727px',
        'mobile-l': '426px',
        // => @media (min-width: 1024px) { ... }
      }
    },
  },
  plugins: [],
}

