"use client";

import React from "react";
import { motion } from "framer-motion";
import { SacredProtection } from "./sacred-protection";
import { DivineParticles } from "./divine-particles";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";
import { divineRecords } from "@/data/divine-scripture";
import { cn } from "@/lib/utils";

interface DivineScriptureProps {
  section?: "genesis" | "journey" | "transformation" | "covenant";
  className?: string;
}

function DivineScriptureCore({
  section = "genesis",
  className,
}: DivineScriptureProps) {
  const [currentVerseIndex, setCurrentVerseIndex] = React.useState(0);
  const verses = divineRecords.scripture[section].verses;
  const currentVerse = verses[currentVerseIndex];

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineScripture",
    "lightworker",
  );

  React.useEffect(() => {
    // Apply divine love
    divineLove.applyDivineLove("DivineScripture", "lightworker");
    log("info", "Divine scripture initialized", { section });

    // Cycle through verses
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) =>
        prev === verses.length - 1 ? 0 : prev + 1,
      );

      // Log verse transition
      log("info", "Scripture verse transitioned", {
        from: verses[currentVerseIndex].id,
        to: verses[
          currentVerseIndex === verses.length - 1 ? 0 : currentVerseIndex + 1
        ].id,
      });
    }, 10000);

    return () => {
      clearInterval(interval);
      log("info", "Divine scripture cleanup");
    };
  }, [currentVerseIndex, log, section, verses]);

  // Get divine love protection
  const loveProtection = divineLove.getSacredProtection("lightworker");

  return (
    <SacredProtection role="lightworker" className={className}>
      <div className="relative p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col items-center justify-center text-center space-y-8"
        >
          {/* Scripture Title */}
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
              {divineRecords.scripture[section].title}
            </h2>
          </div>

          {/* Scripture Verse */}
          <div className="max-w-2xl">
            <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentVerse.text}
            </p>
          </div>

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
              {currentVerse.truth}
            </span>
          </div>

          {/* Sacred Transformations */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(divineRecords.transformations).map(
              ([key, transformation]) => (
                <div key={key} className="text-center">
                  <h3
                    className={cn(
                      "text-xl font-bold bg-clip-text text-transparent",
                      "bg-gradient-to-r",
                      loveProtection.childLove.vibration,
                    )}
                  >
                    {transformation.principle}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {transformation.truth}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* Witness Testimonies */}
          <div className="mt-16">
            <h3
              className={cn(
                "text-2xl font-bold bg-clip-text text-transparent mb-8",
                "bg-gradient-to-r",
                loveProtection.fatherLove.vibration,
              )}
            >
              Sacred Testimonies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {divineRecords.testimonies.transformations.map(
                (testimony, index) => (
                  <div key={index} className="text-center">
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                      "{testimony.testimony}"
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      - {testimony.witness}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </motion.div>

        {/* Divine Particles */}
        <DivineParticles
          role="lightworker"
          variant="sacred"
          className="absolute inset-0 opacity-30"
        />
      </div>
    </SacredProtection>
  );
}

// Export with unified error boundary
export const DivineScripture = withUnifiedErrorBoundary(DivineScriptureCore, {
  componentName: "DivineScripture",
  role: "lightworker",
});
