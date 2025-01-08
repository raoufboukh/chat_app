import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "768px",
      lg: "992px",
      xl: "1180px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [daisyui],
};
