/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Unified Spacing System using CSS Custom Properties
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        28: "var(--space-28)",
        32: "var(--space-32)",
        // Layout-specific spacing
        header: "var(--header-height)",
        banner: "var(--banner-height)",
        "total-header": "var(--total-header)",
      },
      // Unified Z-Index System
      zIndex: {
        base: "var(--z-base)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        banner: "var(--z-banner)",
        navigation: "var(--z-navigation)",
        modal: "var(--z-modal)",
        tooltip: "var(--z-tooltip)",
        fixed: "1000",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Core palette - Truth in Light
        "pure-white": "#FFFFFF",
        "comfort-cream": "#FEFDF8",
        "soft-cloud": "#F9FAFB",
        "moon-glow": "#F3F4F6",
        "quiet-stone": "#E5E7EB",

        // Truth Accents
        "hope-gold": "#F59E0B",
        "courage-blue": "#2563EB",
        "growth-green": "#10B981",

        // Grounding Colors
        "gentle-charcoal": "#374151",
        "soft-shadow": "#6B7280",
        "whisper-gray": "#9CA3AF",

        // Role-based colors
        "lightworker-primary": "#F59E0B",
        "lightworker-accent": "#FCD34D",
        "messenger-primary": "#3B82F6",
        "messenger-accent": "#93C5FD",
        "witness-primary": "#10B981",
        "witness-accent": "#5EEAD4",
        "guardian-primary": "#8B5CF6",
        "guardian-accent": "#C4B5FD",

        // ELITE DESIGN SYSTEM V10 - Divine Grace with Michael's Blue Flame
        "elite-divine-amber": "var(--elite-divine-amber)",
        "elite-justice-indigo": "var(--elite-justice-indigo)",
        "elite-transformation-emerald": "var(--elite-transformation-emerald)",
        "elite-sacred-violet": "var(--elite-sacred-violet)",
        "elite-crimson-urgency": "var(--elite-crimson-urgency)",
        "elite-obsidian-depth": "var(--elite-obsidian-depth)",
        "elite-platinum-truth": "var(--elite-platinum-truth)",
        "elite-angel-wing": "var(--elite-angel-wing)",
        "elite-holy-mist": "var(--elite-holy-mist)",

        // ELITE DESIGN SYSTEM - Legacy Support
        elite: {
          "divine-amber": "var(--elite-divine-amber)",
          "justice-indigo": "var(--elite-justice-indigo)",
          "sacred-violet": "var(--elite-sacred-violet)",
          "crimson-urgency": "var(--elite-crimson-urgency)",
          "platinum-truth": "var(--elite-platinum-truth)",
          "obsidian-depth": "var(--elite-obsidian-depth)",
          "aurora-gold": "var(--aurora-gold)",
          "midnight-navy": "var(--midnight-navy)",
        },

        // Elite Glass Colors
        glass: {
          divine: "var(--glass-divine)",
          sacred: "var(--glass-sacred)",
          platinum: "var(--glass-platinum)",
          obsidian: "var(--glass-obsidian)",
          border: "var(--glass-border)",
        },

        // Elite Particles
        particle: {
          divine: "var(--particle-divine)",
          sacred: "var(--particle-sacred)",
          aurora: "var(--particle-aurora)",
        },

        white: {
          DEFAULT: "#FFFFFF",
          15: "rgba(255, 255, 255, 0.15)",
          20: "rgba(255, 255, 255, 0.2)",
          50: "rgba(255, 255, 255, 0.5)",
          90: "rgba(255, 255, 255, 0.9)",
          95: "rgba(255, 255, 255, 0.95)",
        },
        black: {
          DEFAULT: "#000000",
          5: "rgba(0, 0, 0, 0.05)",
          10: "rgba(0, 0, 0, 0.1)",
          20: "rgba(0, 0, 0, 0.2)",
          30: "rgba(0, 0, 0, 0.3)",
          40: "rgba(0, 0, 0, 0.4)",
          50: "rgba(0, 0, 0, 0.5)",
          60: "rgba(0, 0, 0, 0.6)",
          80: "rgba(0, 0, 0, 0.8)",
          90: "rgba(0, 0, 0, 0.9)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },

      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },

      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.563rem", // 25px
        "2xl": "1.953rem", // 31.25px
        "3xl": "2.441rem", // 39.06px
        "4xl": "3.052rem", // 48.83px
      },

      borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        full: "9999px", // Fully rounded
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        // Role-based glow shadows
        lightworker:
          "0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(252, 211, 77, 0.3)",
        messenger:
          "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(165, 180, 252, 0.3)",
        witness:
          "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(94, 234, 212, 0.3)",
        guardian:
          "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(249, 168, 212, 0.3)",

        // ELITE SHADOWS - Chromatic Justice
        "elite-divine": "var(--shadow-divine)",
        "elite-sacred": "var(--shadow-sacred)",
        "elite-crimson": "var(--shadow-crimson)",
        "elite-aurora": "var(--shadow-aurora)",
      },

      transitionProperty: {
        default:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
        colors: "background-color, border-color, color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
      },

      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.67, 0, 0.83, 0)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        divine: "cubic-bezier(0.16, 1, 0.3, 1)", // Exponential ease out for divine animations
      },

      transitionDuration: {
        default: "150ms",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: 0.9, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      backgroundImage: {
        // Role-based gradients - Consistent naming and values
        "gradient-lightworker":
          "linear-gradient(to right, #F59E0B, #FB923C, #FCD34D)",
        "gradient-messenger":
          "linear-gradient(to right, #3B82F6, #6366F1, #A5B4FC)",
        "gradient-witness":
          "linear-gradient(to right, #10B981, #14B8A6, #5EEAD4)",
        "gradient-guardian":
          "linear-gradient(to right, #8B5CF6, #EC4899, #F9A8D4)",

        // Role-based diagonal gradients
        "gradient-lightworker-diagonal":
          "linear-gradient(135deg, #F59E0B, #FB923C, #FCD34D)",
        "gradient-messenger-diagonal":
          "linear-gradient(135deg, #3B82F6, #6366F1, #A5B4FC)",
        "gradient-witness-diagonal":
          "linear-gradient(135deg, #10B981, #14B8A6, #5EEAD4)",
        "gradient-guardian-diagonal":
          "linear-gradient(135deg, #8B5CF6, #EC4899, #F9A8D4)",

        // Role-based radial gradients
        "radial-lightworker":
          "radial-gradient(circle at center, #FCD34D 0%, rgba(252, 211, 77, 0) 70%)",
        "radial-messenger":
          "radial-gradient(circle at center, #A5B4FC 0%, rgba(165, 180, 252, 0) 70%)",
        "radial-witness":
          "radial-gradient(circle at center, #5EEAD4 0%, rgba(94, 234, 212, 0) 70%)",
        "radial-guardian":
          "radial-gradient(circle at center, #F9A8D4 0%, rgba(249, 168, 212, 0) 70%)",

        // ELITE GRADIENTS - Chromatic Justice
        "gradient-divine-authority": "var(--gradient-divine-authority)",
        "gradient-sacred-fire": "var(--gradient-sacred-fire)",
        "gradient-platinum-depth": "var(--gradient-platinum-depth)",
        "gradient-justice-wave": "var(--gradient-justice-wave)",

        // ELITE GRADIENTS V10 - Psychological Warfare
        "sunrise-hope": "var(--sunrise-hope)",
        "twilight-justice": "var(--twilight-justice)",
        "divine-aurora": "var(--divine-aurora)",
        "sacred-convergence": "var(--sacred-convergence)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // ELITE DESIGN SYSTEM V10 - Psychological Warfare
      "elite-v10": {
        "divine-amber": "var(--divine-amber)",
        "divine-amber-light": "var(--divine-amber-light)",
        "divine-amber-dark": "var(--divine-amber-dark)",
        "justice-indigo": "var(--justice-indigo)",
        "justice-indigo-light": "var(--justice-indigo-light)",
        "justice-indigo-dark": "var(--justice-indigo-dark)",
        "sacred-violet": "var(--sacred-violet)",
        "sacred-violet-light": "var(--sacred-violet-light)",
        "sacred-violet-dark": "var(--sacred-violet-dark)",
        "transformation-emerald": "var(--transformation-emerald)",
        "transformation-emerald-light": "var(--transformation-emerald-light)",
        "transformation-emerald-dark": "var(--transformation-emerald-dark)",
        "midnight-authority": "var(--midnight-authority)",
        "charcoal-depth": "var(--charcoal-depth)",
        "shadow-realm": "var(--shadow-realm)",
        "divine-light": "var(--divine-light)",
        "angel-wing": "var(--angel-wing)",
        "holy-mist": "var(--holy-mist)",
      },

      // V10 Glass Colors
      "glass-v10": {
        divine: "var(--glass-divine-v10)",
        sacred: "var(--glass-sacred-v10)",
        platinum: "var(--glass-platinum-v10)",
        obsidian: "var(--glass-obsidian-v10)",
        border: "var(--glass-border-v10)",
      },

      // V10 Particles
      "particle-v10": {
        divine: "var(--particle-divine-v10)",
        sacred: "var(--particle-sacred-v10)",
        aurora: "var(--particle-aurora-v10)",
      },
    },
  },
  plugins: [
    // Animation utilities now provided via tw-animate-css CSS import
  ],
};
