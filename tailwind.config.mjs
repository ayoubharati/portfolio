/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        card: 'var(--card-background)',
        border: 'var(--border-color)',
        textLight: 'var(--text-light)',
        textDark: 'var(--text-dark)',
        'accent-lime': 'var(--accent-lime)',
        'dark-green': 'var(--dark-green)',
        'medium-green': 'var(--medium-green)',
        'light-gray': 'var(--light-gray)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
        accent: ['var(--font-accent)'],
      },
    },
  },
  plugins: [],
};
export default config;