import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    container: {
      padding: '1rem',
    },
    borderWidth: {
      '1': '1px',
    }
  },
  plugins: [],
} satisfies Config;
