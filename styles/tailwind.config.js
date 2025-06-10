// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1d4ed8',     // Primary Blue (Apple-style, not too bright)
          red: '#b91c1c',      // Muted Deep Red
          black: '#1c1c1e',    // Apple-style matte black
        },
        neutral: {
          light: '#f9fafb',    // Soft background
          dark: '#111827',     // Deep neutral for text
        },
      },
    },
  },
  plugins: [],
}
