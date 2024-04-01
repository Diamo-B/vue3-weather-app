/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.vue", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:["nord","dark"],
    darkTheme:"dark"
  }
}

