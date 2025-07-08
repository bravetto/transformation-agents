"use client";

import React from "react";
import { DivineLove } from "@/components/divine-love";
import { DivineParticles } from "@/components/divine-particles";
import { SacredProtection } from "@/components/sacred-protection";
import { DivineScripture } from "@/components/divine-scripture";
import { SacredSurrender } from "@/components/sacred-surrender";
import { withUnifiedErrorBoundary } from "@/components/ui/unified-error-boundary";
import { useUnifiedArchitecture } from "@/lib/unified-architecture";
import { divineLove } from "@/lib/divine-love";
import { cn } from "@/lib/utils";

function DivineLovePageCore() {
  const [currentSection, setCurrentSection] = React.useState<
    "genesis" | "journey" | "transformation" | "covenant"
  >("genesis");

  // Use unified architecture
  const { protection, handleError, log } = useUnifiedArchitecture(
    "DivineLovePage",
    "lightworker",
  );

  React.useEffect(() => {
    // Apply divine love
    divineLove.applyDivineLove("DivineLovePage", "lightworker");
    log("info", "Divine love page initialized");

    // Cycle through scripture sections
    const interval = setInterval(() => {
      setCurrentSection((prev) => {
        switch (prev) {
          case "genesis":
            return "journey";
          case "journey":
            return "transformation";
          case "transformation":
            return "covenant";
          case "covenant":
            return "genesis";
          default:
            return "genesis";
        }
      });

      // Log section transition
      log("info", "Scripture section transitioned", {
        from: currentSection,
        to:
          currentSection === "covenant"
            ? "genesis"
            : currentSection === "genesis"
              ? "journey"
              : currentSection === "journey"
                ? "transformation"
                : "covenant",
      });
    }, 30000);

    return () => {
      clearInterval(interval);
      log("info", "Divine love page cleanup");
    };
  }, [currentSection, log]);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Background Particles */}
      <DivineParticles
        role="lightworker"
        variant="unified"
        className="absolute inset-0"
      />

      {/* Sacred Container */}
      <SacredProtection role="lightworker" className="relative min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Divine Love Header */}
          <div className="text-center mb-16">
            <h1
              className={cn(
                "text-6xl font-bold bg-clip-text text-transparent",
                "bg-gradient-to-r from-sacred-rose via-divine-gold to-sacred-blue",
              )}
            >
              Divine Love
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Through love, all are embraced as ONE
            </p>
          </div>

          {/* Sacred Surrender */}
          <div className="max-w-4xl mx-auto mb-16">
            <SacredSurrender />
          </div>

          {/* Divine Love Manifestation */}
          <div className="max-w-4xl mx-auto mb-16">
            <DivineLove role="lightworker" />
          </div>

          {/* Divine Scripture */}
          <div className="mt-16">
            <DivineScripture section={currentSection} />
          </div>

          {/* Sacred Truths */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Divine Mother-Father */}
            <SacredProtection role="lightworker" className="p-8">
              <div className="text-center">
                <h3
                  className={cn(
                    "text-2xl font-bold bg-clip-text text-transparent",
                    "bg-gradient-to-r from-sacred-pink via-divine-purple to-sacred-gold",
                  )}
                >
                  Divine Mother-Father
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Love Without Beginning or End
                </p>
              </div>
            </SacredProtection>

            {/* Sacred Child */}
            <SacredProtection role="lightworker" className="p-8">
              <div className="text-center">
                <h3
                  className={cn(
                    "text-2xl font-bold bg-clip-text text-transparent",
                    "bg-gradient-to-r from-sacred-white via-rainbow to-sacred-light",
                  )}
                >
                  Sacred Child
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Pure Love Without Judgment
                </p>
              </div>
            </SacredProtection>

            {/* Divine Unity */}
            <SacredProtection role="lightworker" className="p-8">
              <div className="text-center">
                <h3
                  className={cn(
                    "text-2xl font-bold bg-clip-text text-transparent",
                    "bg-gradient-to-r from-sacred-blue via-divine-gold to-sacred-green",
                  )}
                >
                  Divine Unity
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Beyond All Separation
                </p>
              </div>
            </SacredProtection>
          </div>

          {/* Sacred Message */}
          <div className="mt-16 text-center">
            <SacredProtection
              role="lightworker"
              className="p-8 max-w-2xl mx-auto"
            >
              <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Not MY WILL But Thine Bë Done. With Sacred Heart andD=iviNE
                SMILE. I AM HE.
              </p>
            </SacredProtection>
          </div>
        </div>
      </SacredProtection>
    </main>
  );
}

// Export with unified error boundary
export default withUnifiedErrorBoundary(DivineLovePageCore, {
  componentName: "DivineLovePage",
  role: "lightworker",
});
