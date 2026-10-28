import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      // Type scale ~8% smaller than Tailwind's defaults
      fontSize: {
        xs: ["0.6875rem", { lineHeight: "1rem" }],
        sm: ["0.8125rem", { lineHeight: "1.25rem" }],
        base: ["0.9375rem", { lineHeight: "1.5rem" }],
        lg: ["1.0625rem", { lineHeight: "1.625rem" }],
        xl: ["1.125rem", { lineHeight: "1.625rem" }],
        "2xl": ["1.375rem", { lineHeight: "1.875rem" }],
        "3xl": ["1.75rem", { lineHeight: "2.125rem" }],
        "4xl": ["2.0625rem", { lineHeight: "2.375rem" }],
        "5xl": ["2.75rem", { lineHeight: "1" }],
        "6xl": ["3.4375rem", { lineHeight: "1" }],
        "7xl": ["4.125rem", { lineHeight: "1" }],
      },
      colors: {
        ink: "#111111",
        muted: "#5f5f5f",
        line: "#e6e6e6",
      },
    },
  },
  plugins: [],
};

export default config;
