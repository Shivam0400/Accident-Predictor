/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00BFFF', /* Slightly deeper blue for light mode */
        'neon-purple': '#8A2BE2',
        'accent-pink': '#FF2E63',
        'cyber-dark': '#f4f7fb', /* Lightened background */
        'cyber-panel': '#ffffff', /* White panels */
      },
      boxShadow: {
        'glow-blue': '0 4px 20px rgba(0, 191, 255, 0.4)',
        'glow-pink': '0 4px 20px rgba(255, 46, 99, 0.4)',
        'glow-purple': '0 4px 20px rgba(138, 43, 226, 0.4)',
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(to right, rgba(0, 191, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 191, 255, 0.05) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
