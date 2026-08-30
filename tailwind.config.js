/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#eef3f0',
          100: '#d3e0d8',
          200: '#a7c1b1',
          300: '#7aa28a',
          400: '#4e8363',
          500: '#2f6849',
          600: '#1E3A2E', // primary
          700: '#182f25',
          800: '#12241c',
          900: '#0c1913',
        },
        clay: {
          50: '#fbf1ea',
          100: '#f4dbc8',
          200: '#e9b691',
          300: '#dd925a',
          400: '#d17936',
          500: '#C1622D', // accent
          600: '#a04f24',
          700: '#7c3d1c',
          800: '#582b14',
          900: '#34190b',
        },
        parchment: '#F7F3EC',
        ink: '#242220',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
        lg: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(36, 34, 32, 0.06)',
        elevated: '0 12px 32px rgba(30, 58, 46, 0.14)',
      },
    },
  },
  corePlugins: {
    preflight: false, // avoid clobbering react-bootstrap's base styles
  },
  plugins: [],
};
