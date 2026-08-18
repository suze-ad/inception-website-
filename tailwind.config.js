/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        surface: '#0f1524',
        'surface-container': '#141c2e',
        'surface-container-high': '#1a2438',
        'surface-container-highest': '#202c42',
        'surface-variant': '#1a2438',
        primary: {
          DEFAULT: '#7dd3fc',
          container: '#0e4d6e',
          fixed: '#c8eaff',
          hover: '#93ddfd',
          dark: '#0369a1'
        },
        secondary: {
          DEFAULT: '#88b4cc',
          container: '#1a3a4e',
          fixed: '#c0d8e8'
        },
        tertiary: {
          DEFAULT: '#c8a0f0',
          container: '#3d2060',
          fixed: '#e8d0ff'
        },
        'on-surface': '#e0e8f0',
        'on-surface-variant': '#a0b4c4',
        outline: '#4a6070',
        'outline-variant': '#2a3a48',
        accent: {
          cyan: '#38bdf8',
          purple: '#a855f7',
          emerald: '#34d399',
          amber: '#fbbf24',
          rose: '#fb7185'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(125, 211, 252, 0.15)',
        'glow': '0 0 25px rgba(125, 211, 252, 0.25)',
        'glow-lg': '0 0 40px rgba(125, 211, 252, 0.35)',
        'glass': '0 20px 50px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
