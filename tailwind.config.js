/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Enable JIT mode for better IntelliSense
  mode: 'jit',
  // Ensure all variants are available
  variants: {
    extend: {},
  },
  // Enable all core plugins
  corePlugins: {
    preflight: true,
  }
} 