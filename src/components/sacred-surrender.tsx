"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SacredProtection } from "./sacred-protection";
import { DivineParticles } from "./divine-particles";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";
import { cn } from "@/lib/utils";

// Sacred Surrender States
const surrenderStates = [
  {
    title: "Divine Will",
    essence: "Not MY WILL But Thine Bë Done",
    manifestation: "Through surrender, divine perfection flows",
    vibration: "from-sacred-gold via-divine-blue to-sacred-purple",
  },
  {
    title: "Sacred Heart",
    essence: "With Sacred Heart",
    manifestation: "Through love, all is transformed",
    vibration: "from-sacred-rose via-divine-gold to-sacred-blue",
  },
  {
    title: "Divine Joy",
    essence: "andD=iviNE SMILE",
    manifestation: "Through joy, all is celebrated",
    vibration: "from-sacred-yellow via-rainbow to-sacred-light",
  },
  {
    title: "Divine Unity",
    essence: "I AM HE",
    manifestation: "Through unity, all is ONE",
    vibration: "from-sacred-white via-divine-gold to-sacred-blue",
  },
];

// Sacred Animation Variants
const sacredAnimations = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  essence: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface SacredSurrenderProps {
  role?: string;
  className?: string;
}

function SacredSurrenderCore({
  role = "lightworker",
  className,
}: SacredSurrenderProps) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const currentState = surrenderStates[currentStateIndex];

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "SacredSurrender",
    role,
  );

  useEffect(() => {
    // Apply divine love
    divineLove.applyDivineLove("SacredSurrender", role);
    log("info", "Sacred surrender initialized", { role });

    // Cycle through surrender states
    const interval = setInterval(() => {
      setCurrentStateIndex((prev) =>
        prev === surrenderStates.length - 1 ? 0 : prev + 1,
      );

      // Log state transition
      log("info", "Surrender state transitioned", {
        from: surrenderStates[currentStateIndex].title,
        to: surrenderStates[
          currentStateIndex === surrenderStates.length - 1
            ? 0
            : currentStateIndex + 1
        ].title,
      });
    }, 7000);

    return () => {
      clearInterval(interval);
      log("info", "Sacred surrender cleanup");
    };
  }, [currentStateIndex, log, role]);

  // Get divine love protection
  const loveProtection = divineLove.getSacredProtection("lightworker");

  return (
    <SacredProtection
      role="lightworker"
      className="relative overflow-hidden rounded-xl"
    >
      <div className="relative p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState.title}
            {...sacredAnimations.container}
            className="flex flex-col items-center justify-center text-center space-y-12"
          >
            {/* Sacred Title */}
            <motion.div
              {...sacredAnimations.title}
              className={cn(
                "px-10 py-6 rounded-full",
                "bg-gradient-to-r from-sacred-gold/20 via-divine-blue/20 to-sacred-purple/20",
              )}
            >
              <h2
                className={cn(
                  "text-5xl font-bold bg-clip-text text-transparent",
                  "bg-gradient-to-r",
                  currentState.vibration,
                )}
              >
                {currentState.title}
              </h2>
            </motion.div>

            {/* Sacred Essence */}
            <motion.div {...sacredAnimations.essence} className="max-w-2xl">
              <p className="text-3xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                {currentState.essence}
              </p>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 italic">
                {currentState.manifestation}
              </p>
            </motion.div>

            {/* Sacred Symbol */}
            <motion.div
              {...sacredAnimations.essence}
              className={cn(
                "w-24 h-24 rounded-full",
                "flex items-center justify-center",
                "bg-gradient-to-br",
                currentState.vibration,
                "opacity-90",
              )}
            >
              <span
                className={cn(
                  "text-4xl font-bold text-white",
                  "transform rotate-45",
                )}
              >
                ❦
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Divine Particles */}
        <DivineParticles
          role="lightworker"
          variant="divine"
          className="absolute inset-0 opacity-30"
        />
      </div>
    </SacredProtection>
  );
}

// Export with unified error boundary
export const SacredSurrender = withUnifiedErrorBoundary(SacredSurrenderCore, {
  componentName: "SacredSurrender",
  role: "lightworker",
});
