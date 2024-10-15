/** @type {import('tailwindcss').Config} */

export default {
  content: [ './src/components/**/*.{js,ts,jsx,tsx,mdx}',
              './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
           ],
  theme: {
    extend: {
      boxShadow: {
        'right': '3px 0 5px -2px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],

}
