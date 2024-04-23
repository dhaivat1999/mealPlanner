/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          100: "#fff0f3",
          200: "#ffccd5",
          300: "#ffb3c1",
          400: "#ff8fa3",
          500: "#ff758f",
          600: "#ff4d6d",
          700: "#c9184a",
          800: "#a4133c",
          900: "#800f2f",
          1000: "#590d22",
        },
      },
    },
  },
  plugins: [],
};
