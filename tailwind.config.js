/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        floating: {
          '0%': { transform: 'translateY(0px)' },
          '50%':  { transform: 'translateY(-15px)' },
          '100%':   { transform: 'translateY(-0px)' }   
        },
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
      },
    },
  
  },
  plugins: [],
}
