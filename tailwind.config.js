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
          1: '#f5f5f5',
          2: '#eeeeee',
          3: '#e0e0e0',
        },
        accent: {
          DEFAULT: '#00d4ff',
          dim: '#00a8cc',
          glow: 'rgba(0, 212, 255, 0.15)',
        },
        warm: {
          DEFAULT: '#ff6b35',
          dim: '#cc5529',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
          muted: '#999999',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delayed': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',

        'preloader-bar': 'preloaderBar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'preloader-exit': 'preloaderExit 0.6s cubic-bezier(0.7, 0, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        preloaderBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        preloaderExit: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },

    },
  },
  plugins: [],
}
