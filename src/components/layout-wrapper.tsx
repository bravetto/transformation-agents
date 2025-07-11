"use client";

import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/with-error-boundary";

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

function LayoutWrapperExported({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-16">{children}</main>

      {/* Floating Impact Dashboard */}
      <ImpactDashboard />

      {/* Floating Social Share */}
      <SocialAmplification />

      {/* PropheticCountdown for Independence Day */}
      <div className="fixed bottom-4 left-4 z-40 max-w-xs">
        <PropheticCountdown
          targetDate={independenceDay}
          milestone="Independence Day"
          role="guardian"
          showProgress={true}
        />
      </div>

      <Footer />
    </>
  );
}

// Export with error boundary
export default withErrorBoundary(LayoutWrapperExported, {
  componentName: "layout-wrapper",
  id: "layout-wrapper",
});
