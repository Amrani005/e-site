/** @type {import('tailwindcss').Config} */
module.exports = {
  // THIS IS THE MOST IMPORTANT LINE
  darkMode: 'class',
  
  // Add your content paths here
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}