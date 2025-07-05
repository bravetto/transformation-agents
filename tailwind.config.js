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
        // Core palette - Truth in Light
        'pure-white': '#FFFFFF',
        'comfort-cream': '#FEFDF8',
        'soft-cloud': '#F9FAFB',
        'moon-glow': '#F3F4F6',
        'quiet-stone': '#E5E7EB',
        
        // Truth Accents
        'hope-gold': '#F59E0B',
        'courage-blue': '#2563EB',
        'growth-green': '#10B981',
        
        // Grounding Colors
        'gentle-charcoal': '#374151',
        'soft-shadow': '#6B7280',
        'whisper-gray': '#9CA3AF',
        
        // Legacy mappings (for gradual migration)
        'holy-gold': '#F59E0B',
        'sacred-midnight': '#374151',
        'royal-purple': '#2563EB',
        'divine-white': '#FEFDF8',
        'deep-shadow': '#6B7280',
        'light-whisper': '#F9FAFB',
        'bridge-blue': '#2563EB',
        
        // Semantic colors
        'midnight': '#374151',
        'purple': '#2563EB',
        'gold': '#F59E0B',
        'white': '#FFFFFF',
        'shadow': '#6B7280',
        
        // State colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#DC2626',
        'info': '#2563EB',
        
        // App background
        'background': '#FEFDF8',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.25rem',     // 20px
        xl: '1.563rem',    // 25px
        '2xl': '1.953rem', // 31.25px
        '3xl': '2.441rem', // 39.06px
        '4xl': '3.052rem', // 48.83px
      },
      
      spacing: {
        // We keep the default Tailwind spacing and extend
      },
      
      borderRadius: {
        none: '0',
        sm: '0.125rem',    // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem',    // 6px
        lg: '0.5rem',      // 8px
        xl: '0.75rem',     // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
        full: '9999px',    // Fully rounded
      },
      
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      
      transitionProperty: {
        'default': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
        'colors': 'background-color, border-color, color, fill, stroke',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
      },
      
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'linear': 'linear',
        'in': 'cubic-bezier(0.67, 0, 0.83, 0)',
        'out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        'default': '150ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, var(--tw-colors-purple), var(--tw-colors-midnight))',
        'gradient-accent': 'linear-gradient(to bottom right, var(--tw-colors-gold), #F97316)',
        'gradient-subtle': 'linear-gradient(to bottom right, var(--tw-colors-midnight), #1E293B)',
        'gradient-divine': 'linear-gradient(135deg, var(--tw-colors-gold) 0%, #F97316 50%, var(--tw-colors-purple) 100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Make sure this plugin is installed
  ],
} 