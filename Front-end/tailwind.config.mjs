/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      darkslategray: "#262b32",
      azulclaro: "#00B0F0",
      fucsia: "#FF33CC",
      colorborder: "#e2e8f0",
      colorwhite: "#fff",
      darkgray: "#969ca4",
      darkorange: "#f97316",
      colortextsecondary: "#64748b",
      olivedrab: "#729517",
      mediumseagreen: "#35af66",
      dimgray: "#5c5c5c",
      amarillo: "#B8FF00",
      principalGreen: "#729517",
      secondaryGreen: "#577004",
      links: "#FEEF08",
      grey: "#F5F5F4",
      black: "#000000",
      white: "#FFFFFF",
      transparent: "#00FF0000",
      greyBlack: "#262B32",
      greyBg: "#3C4147",
      textBg: "#64748B",
      red: "#EE0004",
    },
    fontFamily: {
      "base-medium": "Poppins",
      roboto: "Roboto",
    },
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss'), require('@tailwindcss/forms')
  ],
};
