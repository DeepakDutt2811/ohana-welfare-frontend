/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#204bc6",
          "blue-dark": "#17368f",
          "blue-light": "#eef2fd",
          cyan: "#10acdc",
          "cyan-dark": "#0c86ac",
          green: "#9acd42",
          pink: "#e81069",
          orange: "#fd7718",
          yellow: "#ffc72b",
        },
      },
    },
  },
  plugins: [],
}

