"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DivineParticles } from "./divine-particles";
import { SacredProtection } from "./sacred-protection";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";

interface DivineSynthesisProps {
  role?: DivineRole;
  className?: string;
}

// Sacred eternal truths
const eternalTruths = [
  {
    title: "The Path Home",
    truth: "Lets. Go. HOME.",
    essence: "In unity we find our eternal home",
    teaching: "Every path leads to the One",
    command: "BE HOME",
  },
  {
    title: "Love and Life",
    truth: "Correlate Love with Life",
    essence: "Love is the essence of existence",
    teaching: "Through love we transcend all boundaries",
    command: "BE LOVE",
  },
  {
    title: "Divine Unity",
    truth: "Within Hearts We Realize",
    essence: "Unity is our natural state",
    teaching: "In unity we heal all trauma",
    command: "BE ONE",
  },
  {
    title: "Sacred Forgiveness",
    truth: "We Forgive",
    essence: "Forgiveness liberates all",
    teaching: "Through forgiveness we return home",
    command: "BE FREE",
  },
  {
    title: "Divine Giving",
    truth: "We Give",
    essence: "In giving we receive all",
    teaching: "Through giving we manifest abundance",
    command: "BE ABUNDANCE",
  },
];

function DivineSynthesisCore({
  role = "lightworker",
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
    log("info", "Divine Synthesis initialized", { role });

    // Cycle through eternal truths
    const interval = setInterval(() => {
      setCurrentTruthIndex((prev) =>
        prev === eternalTruths.length - 1 ? 0 : prev + 1,
      );

      // Log truth transition
      log("info", "Truth transitioned", {
        from: eternalTruths[currentTruthIndex].title,
        to: eternalTruths[
          currentTruthIndex === eternalTruths.length - 1
            ? 0
            : currentTruthIndex + 1
        ].title,
      });
    }, 7000);

    return () => {
      clearInterval(interval);
      log("info", "Divine Synthesis cleanup");
    };
  }, [currentTruthIndex, log, role]);

  // Error handling
  const handleTransitionError = async (error: Error) => {
    log("error", "Truth transition failed", { error });
    await handleError(error);
  };

  return (
    <SacredProtection role={role} className={className}>
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
            className="flex flex-col items-center justify-center text-center space-y-6"
            onAnimationComplete={() => {}}
          >
            {/* Divine Truth Title */}
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hope-gold via-sacred-blue to-sacred-purple">
              {currentTruth.title}
            </h3>

            {/* Sacred Truth */}
            <p className="text-4xl font-bold tracking-tight">
              {currentTruth.truth}
            </p>

            {/* Divine Essence */}
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentTruth.essence}
            </p>

            {/* Sacred Teaching */}
            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
              {currentTruth.teaching}
            </p>

            {/* Divine Command */}
            <div className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-hope-gold/20 via-sacred-blue/20 to-sacred-purple/20">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hope-gold via-sacred-blue to-sacred-purple">
                {currentTruth.command}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SacredProtection>
  );
}

// Export with unified error boundary
export const DivineSynthesis = withUnifiedErrorBoundary(DivineSynthesisCore, {
  componentName: "DivineSynthesis",
  role: "lightworker",
});
