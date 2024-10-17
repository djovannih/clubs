import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#121212", // Dark background
      primary: "#00FF87", // Vibrant green for active nodes
      "primary-dark": "#00CC6A", // Darker green for hover states
      text: "#FFFFFF", // Main text color
      "text-muted": "#A0A0A0", // Muted text
      "node-locked": "#2A2A2A", // Locked nodes
      "inactive-node": "#4A4A4A", // Inactive node color
      highlight: "#3498db", // Blue accent
      "highlight-dark": "#2980b9", // Darker blue for hover states
      error: "#e74c3c", // Red for error messages
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};
export default config;
