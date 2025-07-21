"use client";

import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { DivineFAB } from "@/components/ui/floating-cta";
import { ImpactDashboard as StaticImpactDashboard } from "@/components/client-dynamic-components";
import CascadeMonitor from "@/components/debug/cascade-monitor";

// Dynamic imports for client components
const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const ImpactDashboard = dynamic(() => import("@/components/impact-dashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const SocialAmplification = dynamic(
  () => import("@/components/social-amplification"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

// Add PropheticCountdown component with dynamic import
const PropheticCountdown = dynamic(
  () => import("@/components/prophetic-countdown"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

// Independence Day 2025 (July 4, 2025)
const independenceDay = new Date("2025-07-04T00:00:00");

function LayoutWrapperExported({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-16">{children}</main>

      {/* Floating Impact Dashboard */}
      <ImpactDashboard />

      {/* Cascade Prevention Monitor */}
      <CascadeMonitor minimized={true} />

      {/* Floating Social Share */}
      <SocialAmplification />

      {/* Divine FAB for Mobile Letter Writing */}
      <DivineFAB />

      {/* PropheticCountdown for Independence Day - NUCLEAR PROTECTION */}
      {process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-4 left-4 z-40 max-w-xs">
          <PropheticCountdown
            targetDate={independenceDay}
            milestone="Independence Day"
            role="guardian"
            showProgress={true}
          />
        </div>
      )}

      {/* Production Safe Mode Message */}
      {process.env.NODE_ENV === "production" && (
        <div className="fixed bottom-4 left-4 z-40 max-w-xs bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
          <div className="text-purple-100 text-xs text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span>🗓️ Calendar Protected</span>
            </div>
            <div className="text-purple-400 text-xs">
              "In His time" - Ecclesiastes 3:1
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// Export with error boundary
export default withErrorBoundary(LayoutWrapperExported, {
  componentName: "layout-wrapper",
  id: "layout-wrapper",
});
