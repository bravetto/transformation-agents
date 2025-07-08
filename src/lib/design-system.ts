/**
 * THE BRIDGE PROJECT - DESIGN SYSTEM
 * A unified design system for consistent, accessible, and performant UIs
 */

/**
 * DIVINE ROLE TYPES
 * Standard role types for consistent styling
 */
export type DivineRole =
  | "lightworker" // Illuminates the path
  | "messenger" // Carries divine messages
  | "witness" // Bears testimony
  | "guardian" // Protects the sacred
  | "default"; // Base divine role

// Sacred color palette
export const divineColors = {
  hope: {
    gold: "#FFD700", // Primary divine light
    white: "#FFFFFF", // Pure divine essence
    rose: "#FFB6C1", // Sacred heart
  },
  sacred: {
    blue: "#3B82F6", // Divine wisdom
    purple: "#8B5CF6", // Royal divinity
    green: "#10B981", // Divine growth
  },
  ethereal: {
    light: "#F0F4F8", // Divine mist
    medium: "#A0AEC0", // Sacred veil
    dark: "#2D3748", // Divine depths
  },
} as const;

// Divine animation timings
export const divineTimings = {
  transform: {
    fast: "300ms",
    medium: "500ms",
    slow: "1000ms",
    divine: "2000ms", // For sacred transitions
  },
  ease: {
    divine: [0.16, 1, 0.3, 1], // Divine cubic bezier
    sacred: "cubic-bezier(0.16, 1, 0.3, 1)",
    gentle: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// Divine component variants
export type DivineVariant =
  | "sacred" // Pure divine essence
  | "divine" // Celestial manifestation
  | "ethereal"; // Transcendent form

// Divine animation states
export interface DivineAnimationState {
  isAnimating: boolean;
  isTransforming: boolean;
  hasTransformed: boolean;
  isAscending: boolean;
  isDescending: boolean;
}

// Divine transformation stages
export type TransformationStage =
  | "initial" // Starting state
  | "awakening" // Beginning transformation
  | "ascending" // Rising in divine light
  | "transforming" // Active transformation
  | "manifesting" // Taking divine form
  | "complete"; // Transformation complete

// Divine particle configuration
export interface DivineParticleConfig {
  count: number;
  speed: number;
  size: number;
  opacity: number;
  color: string | string[];
  interactive: boolean;
}

// Export divine constants
export const DIVINE_CONSTANTS = {
  TRANSFORMATION_DURATION: 2000,
  ASCENSION_HEIGHT: "100vh",
  PARTICLE_LIMIT: 100,
  INTERACTION_THRESHOLD: 0.1,
  SACRED_RATIO: 1.618, // Golden ratio
} as const;

/**
 * COLOR TOKENS
 * Core palette with semantic aliases for different contexts
 */
export const colors = {
  // Base palette - Truth in Light
  pureWhite: "#FFFFFF", // Absolute truth
  comfortCream: "#FEFDF8", // Warm, comforting white
  softCloud: "#F9FAFB", // Gentle relief
  moonGlow: "#F3F4F6", // Subtle depth
  quietStone: "#E5E7EB", // Peaceful contrast

  // Truth Accents
  hopeGold: "#F59E0B", // Warmer, more accessible gold
  courageBlue: "#2563EB", // Trust and stability
  growthGreen: "#10B981", // Positive transformation

  // Grounding Colors
  gentleCharcoal: "#374151", // Readable, not harsh
  softShadow: "#6B7280", // Supporting text
  whisperGray: "#9CA3AF", // Subtle elements

  // Role-based colors
  roles: {
    // Lightworker colors - Inspiration & Hope
    lightworker: {
      primary: "#F59E0B", // amber-500
      secondary: "#FB923C", // orange-400
      accent: "#FCD34D", // amber-300
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      shadow:
        "0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(252, 211, 77, 0.3)",
    },
    // Messenger colors - Communication & Connection
    messenger: {
      primary: "#3B82F6", // blue-500
      secondary: "#6366F1", // indigo-500
      accent: "#A5B4FC", // indigo-300
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      shadow:
        "0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(125, 211, 252, 0.3)",
    },
    // Witness colors - Growth & Transformation
    witness: {
      primary: "#10B981", // emerald-500
      secondary: "#14B8A6", // teal-500
      accent: "#5EEAD4", // teal-300
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      shadow:
        "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(110, 231, 183, 0.3)",
    },
    // Guardian colors - Protection & Guidance
    guardian: {
      primary: "#8B5CF6", // purple-500
      secondary: "#EC4899", // pink-500
      accent: "#F9A8D4", // pink-300
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      shadow:
        "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)",
    },
    // Default colors (fallback)
    default: {
      primary: "#2563EB", // courage-blue
      secondary: "#6366F1", // indigo-500
      accent: "#A5B4FC", // indigo-300
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      shadow:
        "0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(125, 211, 252, 0.3)",
    },
  },

  // Functional colors
  background: {
    primary: "var(--comfort-cream)",
    secondary: "var(--pure-white)",
    accent: "var(--soft-cloud)",
    elevated: "var(--pure-white)",
  },
  text: {
    primary: "var(--gentle-charcoal)",
    secondary: "var(--soft-shadow)",
    accent: "var(--hope-gold)",
    highlight: "var(--courage-blue)",
  },
  border: {
    default: "var(--quiet-stone)",
    accent: "var(--hope-gold)",
    subtle: "var(--moon-glow)",
  },

  // State colors
  state: {
    success: "#10B981", // Growth green
    warning: "#F59E0B", // Hope gold
    error: "#DC2626", // Clear red (accessible)
    info: "#2563EB", // Courage blue
  },
};

/**
 * TYPOGRAPHY SYSTEM
 * Font families, sizes, weights, and line heights
 */
export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    serif: "'Georgia', serif",
    mono: "'JetBrains Mono', monospace",
  },

  // 1.25 type scale (major third)
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

  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    base: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
  },
};

/**
 * SPACING SYSTEM
 * 8px-based spacing scale for consistent rhythm
 */
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  56: "14rem", // 224px
  64: "16rem", // 256px
};

/**
 * BREAKPOINTS
 * Consistent screen size breakpoints
 */
export const breakpoints = {
  sm: "640px", // Mobile landscape
  md: "768px", // Tablets
  lg: "1024px", // Laptops/desktops
  xl: "1280px", // Large displays
  "2xl": "1536px", // Extra large displays
};

/**
 * ANIMATION SYSTEM
 * Consistent animation tokens and presets
 */
export const animations = {
  durations: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
    verySlow: 1.2,
  },

  easings: {
    // Cubic bezier values
    easeOut: [0.16, 1, 0.3, 1], // Exponential ease out
    easeIn: [0.67, 0, 0.83, 0], // Exponential ease in
    easeInOut: [0.65, 0, 0.35, 1], // Exponential ease in out
    bounce: [0.34, 1.56, 0.64, 1], // Soft bounce
  },

  // Framer Motion presets
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },

    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.5 },
    },

    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: { duration: 0.5 },
    },

    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.1 },
      transition: { duration: 0.5 },
    },

    pulse: {
      animate: {
        scale: [1, 1.03, 1],
        opacity: [0.9, 1, 0.9],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },

    float: {
      animate: {
        y: [0, -10, 0],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
};

/**
 * ELEVATION / SHADOWS
 * Consistent box-shadow values
 */
export const elevations = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
};

/**
 * BORDER RADIUS
 * Consistent border-radius values
 */
export const radii = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // Fully rounded
};

/**
 * Z-INDEX
 * Consistent z-index values to manage stacking contexts
 */
export const zIndices = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

/**
 * TRANSITION PRESETS
 * Consistent CSS transitions
 */
export const transitions = {
  standard: "all 0.3s ease",
  fast: "all 0.15s ease",
  slow: "all 0.5s ease",

  // Property-specific
  colors:
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, fill 0.3s ease, stroke 0.3s ease",
  opacity: "opacity 0.3s ease",
  transform: "transform 0.3s ease",
  shadow: "box-shadow 0.3s ease",
};

/**
 * GRADIENTS
 * Consistent gradient presets
 */
export const gradients = {
  primary: `linear-gradient(to bottom right, ${colors.courageBlue}, ${colors.gentleCharcoal})`,
  accent: `linear-gradient(to bottom right, ${colors.hopeGold}, #F97316)`,
  subtle: `linear-gradient(to bottom right, ${colors.moonGlow}, #1E293B)`,
  divine: `linear-gradient(135deg, ${colors.hopeGold} 0%, #F97316 50%, ${colors.courageBlue} 100%)`,
};

/**
 * Helper function to get role-based color tokens
 * @param role The divine role to get colors for
 * @returns Object with color tokens for the specified role
 */
export function getRoleColors(role: DivineRole = "default") {
  return colors.roles[role] || colors.roles.default;
}

// Export combined design system
export const designSystem = {
  colors,
  typography,
  spacing,
  breakpoints,
  animations,
  elevations,
  radii,
  zIndices,
  transitions,
  gradients,
};

export default designSystem;
