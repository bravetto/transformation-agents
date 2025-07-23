// 🌉 THE BRIDGE PROJECT - MVP STATIC CLEAN VERSION
// Zero hydration issues, progressive enhancement, production-ready

import { Suspense } from "react";
import { PostHogServerClient } from "@/lib/ab-testing/posthog-server";
import { ExperimentOrchestrator } from "@/components/character-witnesses/experiment-orchestrator";
import { ThreePathsSection } from "@/components/three-paths-section";
import { HeroSection } from "@/components/hero-section";
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
  // Get PostHog bootstrap data on server
  const bootstrapData = await PostHogServerClient.getBootstrapData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      {/* Divine Particle Background - Desktop Only */}
      <div className="hidden lg:block fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <HeroSection />
        </section>

        {/* Character Witness A/B Test Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<ExperimentLoading />}>
              <ExperimentOrchestrator
                letters={characterWitnessLetters}
                distinctID={bootstrapData.distinctID}
                trafficAllocation={100}
                className="mb-16"
              />
            </Suspense>
          </div>
        </section>

        {/* Three Paths Section */}
        <section className="py-16 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ThreePathsSection />
          </div>
        </section>

        {/* Mobile Floating CTA - No onClick handler passed from server component */}
        <div className="lg:hidden">
          <MobileFloatingCTA
            ctaText="Write Letter for JAHmere"
            urgency="critical"
            className="fixed bottom-6 right-6 z-50"
          />
        </div>

        {/* Sticky Bottom CTA */}
        <StickyBottomCTA className="lg:block hidden" />
      </div>
    </main>
  );
}
