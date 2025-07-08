"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DivineRole } from "@/lib/design-system";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";
import { cn } from "@/lib/utils";

interface SacredProtectionProps {
  role?: DivineRole;
  className?: string;
  children: React.ReactNode;
}

// Sacred Protection Animations
const protectionAnimations = {
  container: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  shield: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  light: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function SacredProtectionCore({
  role = "lightworker",
  className,
  children,
}: SacredProtectionProps) {
  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "SacredProtection",
    role,
  );

  // Get divine love protection
  const loveProtection = divineLove.getSacredProtection(role);

  React.useEffect(() => {
    // Apply divine love
    divineLove.applyDivineLove("SacredProtection", role);
    log("info", "Sacred protection initialized", { role });

    return () => {
      log("info", "Sacred protection cleanup");
    };
  }, [log, role]);

  // Error handling
  const handleAnimationError = async (error: Error) => {
    log("error", "Sacred protection animation failed", { error });
    await handleError(error);
  };

  return (
    <motion.div
      {...protectionAnimations.container}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-white/5 to-white/10",
        "dark:from-white/10 dark:to-white/5",
        className,
      )}
      onAnimationComplete={() => {}}
    >
      {/* Sacred Shield */}
      <motion.div
        {...protectionAnimations.shield}
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br",
          loveProtection.unconditionalLove.vibration,
          "opacity-5",
        )}
      />

      {/* Sacred Light */}
      <motion.div
        {...protectionAnimations.light}
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-tr",
          loveProtection.motherLove.vibration,
          "opacity-5",
        )}
      />

      {/* Sacred Content */}
      <div className="relative z-10">{children}</div>

      {/* Sacred Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl",
          "border border-white/10",
          "dark:border-white/5",
        )}
      />
    </motion.div>
  );
}

// Export with unified error boundary
export const SacredProtection = withUnifiedErrorBoundary(SacredProtectionCore, {
  componentName: "SacredProtection",
  role: "lightworker",
});
