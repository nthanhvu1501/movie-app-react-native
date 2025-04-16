/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: "#030014",
        secondary: "#151312",
        accent: "#AB8BFF",
      }
    },
  },
  plugins: [],
}

