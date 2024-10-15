import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700",
        border: "#111113",
        skeleton: colors.gray,
        bg: "#FFF7D2",
      },
      letterSpacing: {
        wider: "0.04rem",
      },
      fontFamily: {
        sans: ["ClashDisplay", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
export default config;
