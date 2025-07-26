/**
 * Divine Gradient Utilities
 * Consistent gradient patterns for The Bridge Project
 */

export const divineGradients = {
  // Primary divine gradients
  divine: "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #f59e0b 100%)",
  divineHover: "linear-gradient(135deg, #1d4ed8 0%, #8b5cf6 50%, #f97316 100%)",
  divineLight:
    "linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(245, 158, 11, 0.1) 100%)",

  // Transformation gradients
  transformation:
    "linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
  hope: "linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%)",
  courage: "linear-gradient(45deg, #2563eb 0%, #3b82f6 100%)",
  growth: "linear-gradient(45deg, #10b981 0%, #059669 100%)",

  // Justice system gradients
  justice: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
  truth: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  freedom: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",

  // Character witness gradients
  witness: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
  testimonial: "linear-gradient(45deg, #ec4899 0%, #be185d 100%)",
  community: "linear-gradient(135deg, #059669 0%, #047857 100%)",

  // Urgency and time-sensitive gradients
  urgent: "linear-gradient(45deg, #dc2626 0%, #ef4444 100%)",
  countdown: "linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #dc2626 100%)",

  // Background gradients
  heroBackground:
    "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)",
  sectionBackground: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",

  // Interactive states
  hoverGlow:
    "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
  activeState: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
} as const;

export const divineColors = {
  // Core brand colors
  primary: "#1e40af", // Courage Blue
  secondary: "#7c3aed", // Wisdom Purple
  accent: "#f59e0b", // Hope Gold

  // Semantic colors
  success: "#10b981", // Growth Green
  warning: "#f59e0b", // Hope Gold
  error: "#dc2626", // Alert Red
  info: "#3b82f6", // Information Blue

  // Grayscale
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Divine palette
  divine: {
    blue: "#1e40af",
    purple: "#7c3aed",
    gold: "#f59e0b",
    green: "#10b981",
    red: "#dc2626",
  },
} as const;

// CSS custom properties for use in stylesheets
export const divineCSSVariables = {
  "--gradient-divine": divineGradients.divine,
  "--gradient-divine-hover": divineGradients.divineHover,
  "--gradient-divine-light": divineGradients.divineLight,
  "--gradient-transformation": divineGradients.transformation,
  "--gradient-hope": divineGradients.hope,
  "--gradient-courage": divineGradients.courage,
  "--gradient-growth": divineGradients.growth,
  "--gradient-justice": divineGradients.justice,
  "--gradient-truth": divineGradients.truth,
  "--gradient-freedom": divineGradients.freedom,
  "--gradient-witness": divineGradients.witness,
  "--gradient-testimonial": divineGradients.testimonial,
  "--gradient-community": divineGradients.community,
  "--gradient-urgent": divineGradients.urgent,
  "--gradient-countdown": divineGradients.countdown,
  "--gradient-hero-bg": divineGradients.heroBackground,
  "--gradient-section-bg": divineGradients.sectionBackground,
  "--gradient-hover-glow": divineGradients.hoverGlow,
  "--gradient-active": divineGradients.activeState,
} as const;

// Utility functions for dynamic gradient application
export const getGradientStyle = (
  gradientName: keyof typeof divineGradients,
) => ({
  backgroundImage: divineGradients[gradientName],
});

export const getGradientClass = (
  gradientName: keyof typeof divineGradients,
) => {
  const gradientMap = {
    divine: "bg-gradient-divine",
    divineHover: "bg-gradient-divine-hover",
    divineLight: "bg-gradient-divine-light",
    transformation: "bg-gradient-transformation",
    hope: "bg-gradient-hope",
    courage: "bg-gradient-courage",
    growth: "bg-gradient-growth",
    justice: "bg-gradient-justice",
    truth: "bg-gradient-truth",
    freedom: "bg-gradient-freedom",
    witness: "bg-gradient-witness",
    testimonial: "bg-gradient-testimonial",
    community: "bg-gradient-community",
    urgent: "bg-gradient-urgent",
    countdown: "bg-gradient-countdown",
    heroBackground: "bg-gradient-hero-bg",
    sectionBackground: "bg-gradient-section-bg",
    hoverGlow: "bg-gradient-hover-glow",
    activeState: "bg-gradient-active",
  } as const;

  return gradientMap[gradientName] || "bg-gradient-divine";
};

// Animation utilities for gradients
export const animatedGradients = {
  pulse: {
    backgroundSize: "200% 200%",
    animation: "gradient-pulse 3s ease-in-out infinite",
  },
  shift: {
    backgroundSize: "200% 200%",
    animation: "gradient-shift 8s ease-in-out infinite",
  },
  flow: {
    backgroundSize: "300% 300%",
    animation: "gradient-flow 12s linear infinite",
  },
} as const;

// Text gradient utilities
export const textGradients = {
  divine:
    "bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent",
  transformation:
    "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent",
  hope: "bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent",
  courage:
    "bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent",
  growth:
    "bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent",
} as const;
