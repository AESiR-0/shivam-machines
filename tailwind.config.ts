import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Shivam Enterprise Brand Colors (Full Palette)
        brand: {
          lightGray: "#f5f5f5",    // Light Gray - Backgrounds
          darkBlue: "#0a192f",     // Dark Blue Gray - Headers & Primary
          orange: "#f9a826",       // Orange - Highlights & CTAs
          gray: "#464646",         // Gray - Body text & Secondary
          steel: "#475569",        // Steel Blue - Industrial elements
          accent: "#1e40af",       // Deep Blue - Accent elements
          navy: "#1e293b",         // Navy - Dark sections
          slate: "#64748b",        // Slate - Muted text
          zinc: "#71717a",         // Zinc - Borders & dividers
        },
        // Extended palette for UI components
        primary: {
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d1d1d1",
          300: "#b4b4b4",
          400: "#9a9a9a",
          500: "#464646",
          600: "#3a3a3a",
          700: "#2e2e2e",
          800: "#222222",
          900: "#0a192f",
          950: "#050a15",
        },
        accent: {
          50: "#fef7e6",
          100: "#fdeccd",
          200: "#fbd69b",
          300: "#f9c069",
          400: "#f7aa37",
          500: "#f9a826",
          600: "#e09722",
          700: "#c7851e",
          800: "#ae731a",
          900: "#956116",
          950: "#7c4f12",
        },
        // Legacy colors for compatibility
        industrial: {
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d1d1d1",
          300: "#b4b4b4",
          400: "#9a9a9a",
          500: "#464646",
          600: "#3a3a3a",
          700: "#2e2e2e",
          800: "#222222",
          900: "#0a192f",
          950: "#050a15",
        },
        steel: {
          50: "#f5f5f5",
          100: "#e8e8e8",
          200: "#d1d1d1",
          300: "#b4b4b4",
          400: "#9a9a9a",
          500: "#464646",
          600: "#3a3a3a",
          700: "#2e2e2e",
          800: "#222222",
          900: "#0a192f",
          950: "#050a15",
        },
      },
      fontFamily: {
        // Brand typography
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"], // Body text
        mono: ["JetBrains Mono", "monospace"],
        // Modern header fonts
        "inter": ["var(--font-inter)", "system-ui", "sans-serif"], // Clean headers
        "poppins": ["var(--font-poppins)", "system-ui", "sans-serif"], // Modern headers
        "montserrat": ["var(--font-montserrat)", "system-ui", "sans-serif"], // Industrial headers
        "nunito": ["var(--font-nunito)", "system-ui", "sans-serif"], // Body text
        // Legacy classes for compatibility
        "dream-avenue": ["var(--font-poppins)", "system-ui", "sans-serif"], // Headers
        "itc-bauhaus": ["var(--font-inter)", "system-ui", "sans-serif"], // Subheaders  
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-inset": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        "industrial": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "industrial-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "industrial-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;

