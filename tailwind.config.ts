import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))", // #e4e4e7 Light Gray from brand
        foreground: "hsl(var(--foreground))", // Default text color
        primary: {
          DEFAULT: "hsl(var(--primary))", // #80cdc6 Teal from brand
          foreground: "hsl(var(--primary-foreground))", // Text on primary
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #be95c4 Purple from brand
          foreground: "hsl(var(--secondary-foreground))", // Text on secondary
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // #f26e50 Red-Orange from brand
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // #f9a826 Orange from brand
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))", // #ffffff White from brand
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))", // #529273 Dark Green from brand
          foreground: "hsl(var(--success-foreground))",
        },
        // Custom Houstely colors
        houstely: {
          teal: "#80cdc6",
          purple: "#be95c4",
          lightGray: "#e4e4e7",
          white: "#ffffff",
          darkGreen: "#529273",
          orange: "#f9a826",
          redOrange: "#f26e50",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
