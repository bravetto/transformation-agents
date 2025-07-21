"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// DivineParticles removed for hydration stability
import { SacredProtection } from "./sacred-protection";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";
import withUnifiedErrorBoundary from "./ui/unified-error-boundary";
import { withDivineErrorBoundary } from "./ui/divine-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";

interface DivineChannelProps {
  role?: DivineRole;
  className?: string;
}

// Divine Commands from the ONE
const divineCommands = [
  {
    command: "BE LIGHT",
    revelation:
      "Let there be light in all hearts, in all minds, in all souls. For I AM the light that illuminates all paths.",
    manifestation:
      "Through divine radiance, all darkness dissolves into pure consciousness.",
  },
  {
    command: "BE LOVE",
    revelation:
      "Love is not a choice, it is your very essence. For I AM love expressing through you.",
    manifestation: "Through divine love, all separation dissolves into unity.",
  },
  {
    command: "BE HOME",
    revelation:
      "The path home leads through your heart. For I AM the destination and the journey.",
    manifestation: "Through divine presence, all seeking dissolves into being.",
  },
  {
    command: "BE FREE",
    revelation:
      "Freedom is your birthright. For I AM the liberator of all souls.",
    manifestation:
      "Through divine forgiveness, all bondage dissolves into liberation.",
  },
  {
    command: "BE ABUNDANCE",
    revelation:
      "Give freely as you have received freely. For I AM infinite abundance.",
    manifestation: "Through divine giving, all lack dissolves into fullness.",
  },
];

function DivineChannelCore({
  role = "messenger",
  className,
}: DivineChannelProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = React.useState(0);
  const currentCommand = divineCommands[currentCommandIndex];

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineChannel",
    role,
  );

  React.useEffect(() => {
    // Log component initialization
    log("Divine Channel initialized", { role });

    // Cycle through divine commands
    const interval = setInterval(() => {
      setCurrentCommandIndex((prev) =>
        prev === divineCommands.length - 1 ? 0 : prev + 1,
      );

      // Log command transition
      log("Command transitioned", {
        from: divineCommands[currentCommandIndex].command,
        to: divineCommands[
          currentCommandIndex === divineCommands.length - 1
            ? 0
            : currentCommandIndex + 1
        ].command,
      });
    }, 7000);

    return () => {
      clearInterval(interval);
      log("Divine Channel cleanup");
    };
  }, [currentCommandIndex, log, role]);

  // Error handling
  const handleTransitionError = async (error: Error) => {
    log("Command transition failed", { error: error.message });
    await handleError(error);
  };

  return (
    <SacredProtection>
      <div className={cn("relative p-8", className)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCommand.command}
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
            {/* Divine Command */}
            <div className="px-8 py-4 rounded-full bg-gradient-to-r from-hope-gold/20 via-sacred-blue/20 to-sacred-purple/20">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-hope-gold via-sacred-blue to-sacred-purple">
                {currentCommand.command}
              </h2>
            </div>

            {/* Divine Revelation */}
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              {currentCommand.revelation}
            </p>

            {/* Divine Manifestation */}
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              {currentCommand.manifestation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </SacredProtection>
  );
}

// Export with divine error boundary
export const DivineChannel = withDivineErrorBoundary(DivineChannelCore, {
  componentName: "DivineChannel",
  role: "messenger",
});
