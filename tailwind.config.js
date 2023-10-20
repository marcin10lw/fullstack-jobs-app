/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        lg: '992px',
        xl: '1120px',
      },
    },
  },
  plugins: [],
};
