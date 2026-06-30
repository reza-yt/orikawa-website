/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          1: '#ffffff',
          2: '#f5f5f5',
          3: '#eeeeee',
        },
        accent: {
          DEFAULT: '#0066cc',
          light: '#e8f2ff',
          dim: '#004d99',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#555555',
          muted: '#999999',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
