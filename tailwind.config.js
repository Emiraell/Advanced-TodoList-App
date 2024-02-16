/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        rochester: ["Rochester"],
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        poppins: ["Poppins"],
      },
      transitionDuration: {
        0.5: "0.5s",
        1: "1s",
        2: "2s",
        3: "3s",
        5: "5s",
        7: "7s",
        10: "10s",
      },
    },
  },
  plugins: [],
};
