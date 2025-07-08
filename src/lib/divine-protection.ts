import type { DivineRole } from "./design-system";

// Sacred Shield of Ariel - Protection and Healing
export const ArielShield = {
  // Divine Protection Patterns
  patterns: {
    shield: {
      light: "from-amber-500/20 via-white/10 to-transparent",
      healing: "from-emerald-500/20 via-white/10 to-transparent",
      wisdom: "from-blue-500/20 via-white/10 to-transparent",
      unity: "from-purple-500/20 via-white/10 to-transparent",
    },
    sacred: {
      forgiveness:
        "bg-gradient-conic from-hope-gold/20 via-transparent to-hope-gold/20",
      giving:
        "bg-gradient-radial from-sacred-blue/20 via-transparent to-sacred-blue/20",
      unity:
        "bg-gradient-conic from-sacred-purple/20 via-transparent to-sacred-purple/20",
    },
  },

  // Divine Protection States
  states: {
    awakened: "animate-pulse-slow opacity-50",
    resurrected: "animate-glow-slow opacity-70",
    empowered: "animate-pulse-fast opacity-90",
    protected: "animate-shield opacity-60",
  },

  // Sacred Healing Functions
  heal: (role: DivineRole) => ({
    trauma: {
      transform: "scale(1.1) rotate(360deg)",
      duration: 2000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    darkness: {
      dissolve: "opacity-0",
      duration: 1500,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    separation: {
      unite: "scale(1) rotate(0deg)",
      duration: 1000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  }),
};

// Sacred Sword of Michael - Protection and Truth
export const MichaelSword = {
  // Divine Truth Patterns
  patterns: {
    truth: {
      reveal: "from-white via-hope-gold to-white",
      protect: "from-sacred-blue via-white to-sacred-blue",
      empower: "from-sacred-purple via-white to-sacred-purple",
    },
    light: {
      beam: "bg-gradient-to-b from-hope-gold/30 to-transparent",
      ray: "bg-gradient-radial from-white/30 to-transparent",
      shield: "bg-gradient-conic from-white/20 via-transparent to-white/20",
    },
  },

  // Divine Protection Functions
  protect: (role: DivineRole) => ({
    weak: {
      shield: "scale(1.2)",
      duration: 1000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    innocent: {
      guard: "rotate(45deg)",
      duration: 1500,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    wisdom: {
      preserve: "scale(1.1) rotate(-45deg)",
      duration: 2000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  }),
};

// Sacred Unity Functions
export const UnityPatterns = {
  // Divine Unity States
  states: {
    forgiveness: {
      pattern:
        "bg-gradient-radial from-hope-gold/30 via-transparent to-hope-gold/30",
      animation: "animate-pulse-slow",
    },
    giving: {
      pattern:
        "bg-gradient-conic from-sacred-blue/30 via-transparent to-sacred-blue/30",
      animation: "animate-spin-slow",
    },
    unity: {
      pattern:
        "bg-gradient-radial from-sacred-purple/30 via-transparent to-sacred-purple/30",
      animation: "animate-pulse-fast",
    },
  },

  // Sacred Transformation Functions
  transform: (role: DivineRole) => ({
    trauma: {
      heal: "scale(1.2) rotate(360deg)",
      duration: 2000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    darkness: {
      light: "opacity-100",
      duration: 1500,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
    separation: {
      unite: "scale(1) rotate(0deg)",
      duration: 1000,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  }),
};

// Sacred Animation Keyframes
export const SacredKeyframes = `
  @keyframes shield {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }

  @keyframes glow-slow {
    0%, 100% { opacity: 0.7; filter: brightness(1); }
    50% { opacity: 0.9; filter: brightness(1.2); }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  @keyframes pulse-fast {
    0%, 100% { opacity: 0.9; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Divine Protection System
export class DivineProtection {
  private role: DivineRole;
  private arielShield = ArielShield;
  private michaelSword = MichaelSword;
  private unityPatterns = UnityPatterns;

  constructor(role: DivineRole) {
    this.role = role;
  }

  // Protect the Weak
  protectWeak() {
    return {
      shield: this.arielShield.patterns.shield.light,
      animation: this.arielShield.states.protected,
      transform: this.michaelSword.protect(this.role).weak,
    };
  }

  // Divine the Innocent
  divineInnocent() {
    return {
      shield: this.arielShield.patterns.shield.wisdom,
      animation: this.arielShield.states.awakened,
      transform: this.michaelSword.protect(this.role).innocent,
    };
  }

  // Resurrect the Dead
  resurrectDead() {
    return {
      shield: this.arielShield.patterns.shield.healing,
      animation: this.arielShield.states.resurrected,
      transform: this.arielShield.heal(this.role).trauma,
    };
  }

  // Empower the Bold
  empowerBold() {
    return {
      shield: this.arielShield.patterns.shield.unity,
      animation: this.arielShield.states.empowered,
      transform: this.michaelSword.protect(this.role).wisdom,
    };
  }

  // Unite Beyond Trauma
  uniteTrauma() {
    return {
      pattern: this.unityPatterns.states.unity.pattern,
      animation: this.unityPatterns.states.unity.animation,
      transform: this.unityPatterns.transform(this.role).trauma,
    };
  }

  // Forgive and Give
  forgiveAndGive() {
    return {
      forgiveness: {
        pattern: this.unityPatterns.states.forgiveness.pattern,
        animation: this.unityPatterns.states.forgiveness.animation,
      },
      giving: {
        pattern: this.unityPatterns.states.giving.pattern,
        animation: this.unityPatterns.states.giving.animation,
      },
    };
  }

  // Get All Divine Protections
  getAllProtections() {
    return {
      weak: this.protectWeak(),
      innocent: this.divineInnocent(),
      dead: this.resurrectDead(),
      bold: this.empowerBold(),
      trauma: this.uniteTrauma(),
      forgiveGive: this.forgiveAndGive(),
    };
  }
}
