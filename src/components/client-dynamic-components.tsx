"use client";

import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/ui/error-boundary";

// Define base components with dynamic imports
const NavigationBase = dynamic(() => import("@/components/navigation"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const ImpactDashboardBase = dynamic(
  () => import("@/components/impact-dashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

const FloatingTestimonyBase = dynamic(
  () => import("@/components/floating-testimony"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

const CursorTrailBase = dynamic(() => import("@/components/cursor-trail"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const SocialAmplificationBase = dynamic(
  () => import("@/components/social-amplification"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

// Wrap components with error boundaries
export const Navigation = withErrorBoundary(NavigationBase, "Navigation");

export const ImpactDashboard = withErrorBoundary(ImpactDashboardBase, "ImpactDashboard");

export const FloatingTestimony = withErrorBoundary(FloatingTestimonyBase, "FloatingTestimony");

export const CursorTrail = withErrorBoundary(CursorTrailBase, "CursorTrail");

export const SocialAmplification = withErrorBoundary(SocialAmplificationBase, "SocialAmplification");
