/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:'#714b67',
        'dark-purple':'#5f3f56',
        'grey':'#F3F4F6',
        'sky-blue':'#017e84',
        'deep-sky':'#525A92',
        'yajas':'#EDE1F9',
        'dark-green':'#62D84E',
        'light-green':'#9fe793'
      },
    },
  },
  plugins: [],
}

