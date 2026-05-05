/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", //theme toggle
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        text: "var(--text)"
        },
    },
  },
  plugins: [],
};



