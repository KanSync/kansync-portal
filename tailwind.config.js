/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "tic-tac-toe": "url(./src/assets/tic-tac-toe.svg)",
      },
    },
    colors: {
      text: "#180202",
      background: "#FAFAFA",
      accent: "#D12600",
      primary: "#FF6D4D",
      secondary: "#E6E6E5",
      transparent: "transparent",
    },
  },
  plugins: [],
};
