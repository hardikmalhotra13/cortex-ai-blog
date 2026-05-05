import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0D0F14",
          soft: "#1A1D26",
          muted: "#2C3040",
        },
        paper: {
          DEFAULT: "#F7F5F0",
          warm: "#EDE8DF",
          bright: "#FAFAF8",
        },
        accent: {
          DEFAULT: "#C8A96E",
          light: "#E2C99A",
          dark: "#A0813A",
        },
        coral: "#E8634A",
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.15) 0%, transparent 60%)",
      },
      boxShadow: {
        "card": "0 2px 16px rgba(13,15,20,0.08), 0 0 0 1px rgba(13,15,20,0.04)",
        "card-hover": "0 8px 40px rgba(13,15,20,0.14), 0 0 0 1px rgba(13,15,20,0.06)",
        "glass": "0 4px 24px rgba(255,255,255,0.06) inset, 0 2px 12px rgba(13,15,20,0.3)",
        "glow": "0 0 40px rgba(200,169,110,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;