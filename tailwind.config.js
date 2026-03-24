/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['1rem', { lineHeight: '1.25rem' }],
      sm: ['1.125rem', { lineHeight: '1.5rem' }],
      base: ['1.25rem', { lineHeight: '1.75rem' }],
      lg: ['1.375rem', { lineHeight: '1.875rem' }],
      xl: ['1.5rem', { lineHeight: '2rem' }],
      '2xl': ['1.75rem', { lineHeight: '2.25rem' }],
      '3xl': ['2.125rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
      '5xl': ['3.25rem', { lineHeight: '1' }],
      '6xl': ['4rem', { lineHeight: '1' }],
      '7xl': ['4.75rem', { lineHeight: '1' }],
      '8xl': ['6.25rem', { lineHeight: '1' }],
      '9xl': ['8.25rem', { lineHeight: '1' }],
    },
    extend: {
      colors: {
        onyx: '#121418',
        gold: '#C5A059',
        cream: '#F8F5F2',
        platinum: '#E5E5E5'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'super-tight': '-0.05em',
        'super-wide': '0.5em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
