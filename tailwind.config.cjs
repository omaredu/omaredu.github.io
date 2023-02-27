/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#185ADB",
        "foreground": "#0B1324",
        "secondary": "#7C85A1",
        "border": "#0B1324",

        "tempo": "#47B5FF"
      },
      borderRadius: {
        "sm": "5px",
        "DEFAULT": "10px",
      },
      boxShadow: {
        "DEFAULT": "0px 3px 3px rgba(11, 19, 36, 0.03)",
      },
      fontWeight: {
        "DEFAULT": "500"
      },
      fontSize: {
        'sm': '12px',
        'lg': '16px'
      }
    },
  },
  plugins: [],
}
