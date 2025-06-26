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
        'sacred-midnight': '#0A0E27',
        'royal-purple': '#5B21B6',
        'holy-gold': '#FCD34D',
        'divine-white': '#FEFCE8',
        'deep-shadow': '#1F2937',
        'light-whisper': '#F9FAFB',
        // Bridge-specific variants
        'bridge-blue': '#5B21B6',
        'bridge-purple': '#5B21B6',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(135deg, #5B21B6, #0A0E27)',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
} 