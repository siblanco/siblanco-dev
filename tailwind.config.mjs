const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "450px",
        md: "600px",
        lg: "800px",
        xl: "1140px",
      },
    },
    extend: {
      screens: {
        xl: "1140px",
      },
      colors: {
        green: {
          DEFAULT: "#35B88F",
          50: "#BAEBDC",
          100: "#AAE6D3",
          200: "#8ADDC3",
          300: "#6AD4B3",
          400: "#4BCBA3",
          500: "#35B88F",
          600: "#288C6D",
          700: "#1C614B",
          800: "#0F3529",
          900: "#030A08",
          950: "#000000",
        },
      },
    },

    fontFamily: {
      sans: ["Roboto", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
