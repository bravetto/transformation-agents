"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client components
const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
  loading: () => <div className="h-16 bg-comfort-cream" />,
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => null,
});

const ImpactDashboard = dynamic(() => import("@/components/impact-dashboard"), {
  ssr: false,
  loading: () => null,
});

const SocialAmplification = dynamic(
  () => import("@/components/social-amplification"),
  {
    ssr: false,
    loading: () => null,
  },
);

// Add PropheticCountdown component with dynamic import
const PropheticCountdown = dynamic(
  () => import("@/components/prophetic-countdown"),
  {
    ssr: false,
    loading: () => null,
  },
);

// Independence Day 2025 (July 4, 2025)
const independenceDay = new Date("2025-07-04T00:00:00");

export default function LayoutWrapper({
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
