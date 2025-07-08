"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DivineParticles } from "./divine-particles";
import { SacredProtection } from "./sacred-protection";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";

interface DivineLoveProps {
  role?: DivineRole;
  className?: string;
}

// Sacred Love Manifestations
const loveManifestation = [
  {
    title: "Divine Mother-Father God",
    essence: "Love Without Beginning or End",
    manifestation: "Through divine love, all are embraced as ONE",
    truth: "You Are ME",
  },
  {
    title: "Sacred Child",
    essence: "Pure Love Without Judgment",
    manifestation: "Through innocence, all are seen in their perfection",
    truth: "All Are My Children",
  },
  {
    title: "Divine Unity",
    essence: "Beyond All Separation",
    manifestation: "Through unity, all expressions are celebrated",
    truth: "All ARE Me",
  },
  {
    title: "Sacred Healing",
    essence: "Beyond All Trauma",
    manifestation: "Through divine grace, all wounds are healed",
    truth: "You Cannot DENY Me",
  },
  {
    title: "Eternal Love",
    essence: "Beyond All Fear",
    manifestation: "Through eternal love, all are restored to truth",
    truth: "YOUR are ME",
  },
];

function DivineLoveCore({ role = "lightworker", className }: DivineLoveProps) {
  const [currentManifestationIndex, setCurrentManifestationIndex] =
    React.useState(0);
  const currentManifestation = loveManifestation[currentManifestationIndex];

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineLove",
    role,
  );

  React.useEffect(() => {
    // Initialize divine love
    divineLove.applyDivineLove("DivineLove", role);
    log("info", "Divine Love initialized", { role });

    // Cycle through love manifestations
    const interval = setInterval(() => {
      setCurrentManifestationIndex((prev) =>
        prev === loveManifestation.length - 1 ? 0 : prev + 1,
      );

      // Log manifestation transition
      log("info", "Love manifestation transitioned", {
        from: loveManifestation[currentManifestationIndex].title,
        to: loveManifestation[
          currentManifestationIndex === loveManifestation.length - 1
            ? 0
            : currentManifestationIndex + 1
        ].title,
      });
    }, 7000);

    return () => {
      clearInterval(interval);
      log("info", "Divine Love cleanup");
    };
  }, [currentManifestationIndex, log, role]);

  // Error handling
  const handleTransitionError = async (error: Error) => {
    log("error", "Love manifestation transition failed", { error });
    await handleError(error);
  };

  // Get divine love protection
  const loveProtection = divineLove.getSacredProtection(role);

  return (
    <SacredProtection role={role} className={className}>
      <div className="relative p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentManifestation.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center text-center space-y-8"
            onAnimationComplete={() => {}}
          >
            {/* Divine Title */}
            <div
              className={cn(
                "px-8 py-4 rounded-full",
                "bg-gradient-to-r from-sacred-rose/20 via-divine-gold/20 to-sacred-blue/20",
              )}
            >
              <h2
                className={cn(
                  "text-4xl font-bold bg-clip-text text-transparent",
                  "bg-gradient-to-r",
                  loveProtection.unconditionalLove.vibration,
                )}
              >
                {currentManifestation.title}
              </h2>
            </div>

            {/* Divine Essence */}
            <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl font-light">
              {currentManifestation.essence}
            </p>

            {/* Divine Manifestation */}
            <p className="text-xl text-gray-600 dark:text-gray-400 italic max-w-3xl">
              {currentManifestation.manifestation}
            </p>

            {/* Divine Truth */}
            <div
              className={cn(
                "mt-8 px-10 py-5 rounded-full",
                "bg-gradient-to-r from-divine-gold/30 via-sacred-blue/30 to-sacred-purple/30",
              )}
            >
              <span
                className={cn(
                  "text-3xl font-bold bg-clip-text text-transparent",
                  "bg-gradient-to-r",
                  loveProtection.motherLove.vibration,
                )}
              >
                {currentManifestation.truth}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Divine Love Particles */}
        <DivineParticles
          role={role}
          variant="divine"
          className="absolute inset-0 opacity-30"
        />
      </div>
    </SacredProtection>
  );
}

// Export with unified error boundary
export const DivineLove = withUnifiedErrorBoundary(DivineLoveCore, {
  componentName: "DivineLove",
  role: "lightworker",
});
