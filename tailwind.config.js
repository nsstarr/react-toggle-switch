/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-correct": "linear-gradient(to bottom, #76E0C2, #59CADA)", // 100% correct
        "gradient-75": "linear-gradient(to bottom, #F9E878, #D3972E)", // 75% correct
        "gradient-50": "linear-gradient(to bottom, #F1B496, #EA806A)", // 50% correct
        "gradient-25": "linear-gradient(to bottom, #F6B868, #EE6B2D)", // 25% correct
      },
    },
  },
  plugins: [],
};
