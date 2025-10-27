import { heroui } from "@heroui/react";

const COLOR_TEAL_CYAN = "#37B9A7";
const COLOR_NAVY_BLUE = "#1E5788";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          50: "#E6F5F3",
          100: "#C1E8E2",
          200: "#9DDCD1",
          300: "#78D1C0",
          400: "#53C5AF",
          DEFAULT: COLOR_TEAL_CYAN,
          600: "#30A195",
          700: "#27877E",
          800: "#1D6D65",
          900: "#14534D",
          foreground: "#FFFFFF",
        },
        secondary: {
          50: "#E6EDF5",
          100: "#C2D3E8",
          200: "#9DBCD8",
          300: "#79A1C8",
          400: "#5486B8",
          DEFAULT: COLOR_NAVY_BLUE,
          600: "#1A497A",
          700: "#163C62",
          800: "#112E4A",
          900: "#0C1F32",
          foreground: "#FFFFFF",
        },
        focus: COLOR_TEAL_CYAN,
      },
    },
    dark: {
      colors: {
        primary: {
          50: "#E6F5F3",
          100: "#C1E8E2",
          200: "#9DDCD1",
          300: "#78D1C0",
          400: "#53C5AF",
          DEFAULT: COLOR_TEAL_CYAN,
          600: "#30A195",
          700: "#27877E",
          800: "#1D6D65",
          900: "#14534D",
          foreground: "#FFFFFF",
        },
        secondary: {
          50: "#E6EDF5",
          100: "#C2D3E8",
          200: "#9DBCD8",
          300: "#79A1C8",
          400: "#5486B8",
          DEFAULT: COLOR_NAVY_BLUE,
          600: "#1A497A",
          700: "#163C62",
          800: "#112E4A",
          900: "#0C1F32",
          foreground: "#FFFFFF",
        },
        focus: COLOR_TEAL_CYAN,
      },
    },
  },
});
