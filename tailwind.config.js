/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", //Just-in-Time Modeを有効にする

  content: [
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
