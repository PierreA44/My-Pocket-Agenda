/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      cross: "url('./assets/cross-test.png')",
    },
    extend: {
      colors: {
        beige: "#F9EFDB",
        sand: "#EBD9B4",
        green: "#9DBC98",
        dkGreen: "#638889",
      },
    },
    fontFamily: {
      commi: ["Commissioner"],
      lexend: ["Lexend Deca"],
    },
  },
  plugins: [],
};
