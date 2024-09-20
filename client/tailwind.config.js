const { nextui } = require("@nextui-org/react");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  important: !!1,
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      colors: {
        primary: {
          DEFAULT: "#0f5b37",
          100: "#03120b",
          200: "#062516",
          300: "#093722",
          400: "#0c4a2d",
          500: "#0f5b37",
          600: "#1aa162",
          700: "#2fdd8c",
          800: "#74e8b2",
          900: "#baf4d9",
        },
        primary_dark: {
          DEFAULT: "#163816",
          100: "#040b04",
          200: "#091609",
          300: "#0d210d",
          400: "#112c11",
          500: "#163816",
          600: "#2e762e",
          700: "#46b446",
          800: "#82ce82",
          900: "#c1e7c1",
        },
        secondary: {
          DEFAULT: "#8bc34a",
          100: "#1c290e",
          200: "#38511b",
          300: "#547a29",
          400: "#70a236",
          500: "#8bc34a",
          600: "#a2cf6f",
          700: "#b9db93",
          800: "#d1e7b7",
          900: "#e8f3db",
        },
        pear: {
          DEFAULT: "#cddc39",
          100: "#2b2f08",
          200: "#565e11",
          300: "#818c19",
          400: "#acbb21",
          500: "#cddc39",
          600: "#d6e35f",
          700: "#e0ea87",
          800: "#eaf1af",
          900: "#f5f8d7",
        },
        aureolin: {
          DEFAULT: "#ffeb3b",
          100: "#3f3900",
          200: "#7e7200",
          300: "#beab00",
          400: "#fde400",
          500: "#ffeb3b",
          600: "#ffef64",
          700: "#fff38b",
          800: "#fff7b1",
          900: "#fffbd8",
        },
        anti_white: {
          DEFAULT: "#eeeeee",
          100: "#2f2f2f",
          200: "#5f5f5f",
          300: "#8e8e8e",
          400: "#bebebe",
          500: "#eeeeee",
          600: "#f1f1f1",
          700: "#f4f4f4",
          800: "#f8f8f8",
          900: "#fbfbfb",
        },
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "circular-gradient": "radial-gradient(circle, #32CD32, #008000)",
      },
    },
    darkMode: "selector",
    plugins: [
      // eslint-disable-next-line global-require
      nextui(),
      // add custom variant for expanding sidebar
      plugin(({ addVariant, e }) => {
        addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
          modifySelectors(
            ({ className }) =>
              `.sidebar-expanded .${e(
                `sidebar-expanded${separator}${className}`
              )}`
          );
        });
      }),
    ],
  },
};
