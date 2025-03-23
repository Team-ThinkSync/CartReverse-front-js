/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Libre Baskerville"', "serif"],
      },
      colors: {
        header: "#708090",
        beige: "#f5f5dc",
        kakao: "#fee500",
        footer: "#DEE2E6",
      },
    },
  },
  plugins: [],
};
