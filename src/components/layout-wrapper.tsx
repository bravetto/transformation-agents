"use client";

import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { DivineFAB } from "@/components/ui/floating-cta";
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

const SocialAmplification = dynamic(
  () => import("@/components/social-amplification"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

// Independence Day 2025 (July 4, 2025) - Static display only
const independenceDay = new Date("2025-07-04T00:00:00");

function LayoutWrapperExported({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-16">{children}</main>

      {/* Static Impact Summary - Hydration Safe */}
      <div className="fixed bottom-4 right-4 z-40 max-w-xs">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 shadow-xl">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Community Impact
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">842</div>
              <div className="text-gray-500">Prayers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">156</div>
              <div className="text-gray-500">Letters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cascade Prevention Monitor */}
      <CascadeMonitor minimized={true} />

      {/* Floating Social Share */}
      <SocialAmplification />

      {/* Divine FAB for Mobile Letter Writing */}
      <DivineFAB />

      {/* Static July 4th Awareness - Hydration Safe */}
      <div className="fixed bottom-4 left-4 z-40 max-w-xs bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
        <div className="text-purple-100 text-xs text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span>🗓️ July 28th - Freedom Day</span>
          </div>
          <div className="text-purple-400 text-xs">
            "In His time" - Ecclesiastes 3:1
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Export with error boundary
export default withErrorBoundary(LayoutWrapperExported, "layout-wrapper");
