/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',
          secondary: '#F7F8FA',
          subtle: '#F1F3F6',
        },
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#17243A',
          950: '#0B1320',
        },
        accent: {
          DEFAULT: '#C58B45',
          light: '#DCA766',
          dark: '#A66E2E',
          muted: '#EAD7BE',
          bg: '#FAF5EE',
        },
        border: {
          DEFAULT: '#E7EAF0',
          dark: '#D0D6E2',
        },
        txt: {
          primary: '#17243A',
          secondary: '#667085',
          muted: '#98A2B3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(16, 24, 40, 0.05), 0 1px 2px rgba(16, 24, 40, 0.03)',
        'card': '0 4px 16px -2px rgba(23, 36, 58, 0.04), 0 2px 6px -1px rgba(23, 36, 58, 0.02)',
        'elevated': '0 12px 32px -4px rgba(23, 36, 58, 0.08), 0 4px 12px -2px rgba(23, 36, 58, 0.03)',
      }
    },
  },
  plugins: [],
}

