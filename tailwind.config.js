module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7A4BFF",
        'dark-primary': '#5132AA',
        secondary: "#06A82A",
        'dark-secondary': '#04701C',
        dark: "#2D282D",
        light: "#F1F1F1",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
