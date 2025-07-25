// 🌉 THE BRIDGE PROJECT - MVP STATIC CLEAN VERSION
// Zero hydration issues, progressive enhancement, production-ready

import { Suspense } from "react";
import { ExperimentOrchestrator } from "@/components/character-witnesses/experiment-orchestrator";
import { ThreePathsSection } from "@/components/three-paths-section";
import HeroSection from "@/components/hero-section";
import { ParticleBackground } from "@/components/ui/particle-background";
import { StickyBottomCTA } from "@/components/ui/sticky-bottom-cta";
import { MobileFloatingCTA } from "@/components/character-witnesses/mobile-optimized-components";
import { characterWitnessLetters } from "@/data/character-witnesses/character-letters-data";
import { cn } from "@/lib/utils";

// Loading component for experiment orchestrator
function ExperimentLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

// Main home page component (Server Component)
export default async function HomePage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Hero Section with Optimized Images and Conversion Focus */}
      <HeroSection />

      {/* Character Witness Experiment Orchestrator */}
      <Suspense
        fallback={
          <div className="py-20">Loading character witness interface...</div>
        }
      >
        <ExperimentOrchestrator
          letters={characterWitnessLetters}
          distinctID="anonymous-visitor"
          trafficAllocation={100}
        />
      </Suspense>

      {/* Three Paths Section */}
      <ThreePathsSection />

      {/* Mobile Floating CTA */}
      <MobileFloatingCTA
        ctaText="Support JAHmere's Freedom"
        urgency="critical"
      />

      {/* Sticky Bottom CTA */}
      <StickyBottomCTA />
    </div>
  );
}
