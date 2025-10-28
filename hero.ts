import { heroui } from "@heroui/react";

const COLOR_BLUE = "#01327C";
const COLOR_LILAC = "#A0B5FF";
const COLOR_LIGHT_BLUE = "#EFF3FD";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          50: "#E6EBF7",
          100: "#C2CDEF",
          200: "#9DAEE7",
          300: "#789FDF",
          400: "#538FE7",
          DEFAULT: COLOR_BLUE,
          600: "#012C70",
          700: "#01225C",
          800: "#001947",
          900: "#001033",
          foreground: "#FFFFFF",
        },
        secondary: {
          50: "#F2F5FF",
          100: "#E0E6FF",
          200: "#C6D2FF",
          300: "#A0B5FF",
          400: "#7A97FF",
          DEFAULT: COLOR_LILAC,
          600: "#5E7BE6",
          700: "#4E67C2",
          800: "#3E529E",
          900: "#2E3D7A",
          foreground: "#FFFFFF",
        },
        background: COLOR_LIGHT_BLUE,
        foreground: "#000000",
        focus: COLOR_LILAC,
        default: {
          100: COLOR_LIGHT_BLUE,
          200: "#DCE4F7",
          300: "#C7D4F0",
          400: "#B2C4E9",
          500: "#9DB4E2",
          600: "#7B96CC",
          700: "#5978B6",
          800: "#375AA0",
          900: "#01327C",
        },
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: COLOR_BLUE,
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: COLOR_LILAC,
          foreground: "#FFFFFF",
        },
        background: "#0A1A33",
        foreground: "#FFFFFF",
        focus: COLOR_LILAC,
        default: {
          100: "#1A2A45",
          200: "#22365A",
          300: "#2A4270",
          400: "#324E85",
          500: "#3A5A9A",
          600: "#4266AF",
          700: "#4A72C4",
          800: "#527EDA",
          900: "#5A8AEF",
        },
      },
    },
  },
});
