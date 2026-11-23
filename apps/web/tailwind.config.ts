import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand & Module tokens from Section 4.1
        brand: {
          deep: "hsl(var(--brand-deep))",
          indigo: "hsl(var(--brand-indigo))",
          teal: "hsl(var(--brand-teal))",
        },
        module: {
          saferoute: "hsl(var(--module-saferoute))",
          automate: "hsl(var(--module-automate))",
          journeyguard: "hsl(var(--module-journeyguard))",
          safealert: "hsl(var(--module-safealert))",
        },
        status: {
          success: "hsl(var(--status-success))",
          warning: "hsl(var(--status-warning))",
          danger: "hsl(var(--status-danger))",
          info: "hsl(var(--status-info))",
        },
        emergency: {
          DEFAULT: "hsl(var(--emergency))",
          glow: "hsl(var(--emergency-glow))",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 4px 16px -4px rgba(15, 23, 42, 0.08)",
        card: "0 4px 20px -4px rgba(15, 23, 42, 0.07), 0 1px 3px 0 rgba(15, 23, 42, 0.04)",
        elevated: "0 12px 32px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)",
        "glow-teal": "0 0 20px -4px rgba(20, 184, 166, 0.35)",
        "glow-emergency": "0 0 24px -2px rgba(220, 38, 38, 0.45)",
      },
      keyframes: {
        pulseEmergency: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(220, 38, 38, 0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "emergency-pulse": "pulseEmergency 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
