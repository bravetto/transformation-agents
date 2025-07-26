"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// DivineParticles removed for MVP hydration stability
import { SacredProtection } from "./sacred-protection";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";

interface DivineSynthesisProps {
  role?: DivineRole;
  className?: string;
}

// Eternal Truths from the ONE
const eternalTruths = [
  {
    title: "UNITY",
    revelation:
      "All separation is illusion. We are one consciousness experiencing itself subjectively.",
    manifestation:
      "Through divine synthesis, all division dissolves into wholeness.",
  },
  {
    title: "HARMONY",
    revelation:
      "The universe exists in perfect balance. Every challenge is an opportunity for growth.",
    manifestation:
      "Through divine synthesis, all discord dissolves into harmony.",
  },
  {
    title: "WISDOM",
    revelation:
      "Knowledge comes from study, but wisdom comes from living. Experience is the greatest teacher.",
    manifestation:
      "Through divine synthesis, all ignorance dissolves into understanding.",
  },
  {
    title: "PURPOSE",
    revelation:
      "Your existence has profound meaning. Your unique gifts are needed in this world.",
    manifestation:
      "Through divine synthesis, all doubt dissolves into certainty.",
  },
  {
    title: "TRANSCENDENCE",
    revelation:
      "You are not bound by your circumstances. You have the power to rise above.",
    manifestation:
      "Through divine synthesis, all limitation dissolves into possibility.",
  },
];

function DivineSynthesisCore({
  role = "messenger",
  className,
}: DivineSynthesisProps) {
  const [currentTruthIndex, setCurrentTruthIndex] = React.useState(0);
  const currentTruth = eternalTruths[currentTruthIndex];

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineSynthesis",
    role,
  );

  React.useEffect(() => {
    // Log component initialization
    log("Divine Synthesis initialized", { role });

    // Cycle through eternal truths
    const interval = setInterval(() => {
      setCurrentTruthIndex((prev) =>
        prev === eternalTruths.length - 1 ? 0 : prev + 1,
      );

      // Log truth transition
      log("Truth transitioned", {
        from: eternalTruths[currentTruthIndex].title,
        to: eternalTruths[
          currentTruthIndex === eternalTruths.length - 1
            ? 0
            : currentTruthIndex + 1
        ].title,
      });
    }, 8000);

    return () => {
      clearInterval(interval);
      log("Divine Synthesis cleanup");
    };
  }, [currentTruthIndex, log, role]);

  // Error handling
  const handleTransitionError = async (error: Error) => {
    log("Truth transition failed", { error: error.message });
    await handleError(error);
  };

  return (
    <div className={className}>
      <div className="relative p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTruth.title}
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
            {/* Eternal Truth */}
            <div className="px-8 py-4 rounded-full bg-gradient-to-r from-sacred-blue/20 via-sacred-purple/20 to-sacred-gold/20">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sacred-blue via-sacred-purple to-sacred-gold">
                {currentTruth.title}
              </h2>
            </div>

            {/* Divine Revelation */}
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              {currentTruth.revelation}
            </p>

            {/* Divine Manifestation */}
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              {currentTruth.manifestation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Export with divine error boundary
export const DivineSynthesis = withErrorBoundary(DivineSynthesisCore, "DivineSynthesis");
