import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        medium_gray_100: "#E1E8ED",
        medium_gray_200: "#292B31",
        medium_gray_300: "#989CAA",
        medium_black_100: "#2A2B2F",
        medium_black_200: "#222327",
        medium_black_300: "#24262C",
      },
    },
  },
  plugins: [],
} satisfies Config;
