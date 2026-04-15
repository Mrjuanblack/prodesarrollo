import heroui from "./hero";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [heroui],
};
