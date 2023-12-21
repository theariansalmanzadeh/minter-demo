/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00c9bd",
        primaryLight: "#93fcec",
        primaryDark: "#008d84",
        secondary: "#2c2443",
      },
    },
  },
  plugins: [],
};
