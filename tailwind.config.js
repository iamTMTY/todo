/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3F5BF6",
        secondary: "#EAEDFE",
        gray: {
          900: "#101828",
          700: "#344054",
          600: "#475467",
          200: "#EAECF0",
          50: "#F9FAFB"
        }
      },
      boxShadow: {
        card: "0px 20px 24px -4px #10182814",
        card_dark: "0px 20px 24px -4px #EAECF014"
      },
      keyframes: {
        opacity: {
          from: {opacity: 0},
          to: {opacity: 1}
        },
        modal_height: {
          from: {height: "0px"},
          to: {height: "80vh"}
        }
      },
      animation: {
        opacity: 'opacity 200ms ease-in-out',
        modal_height: 'modal_height 200ms ease-in-out',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}

