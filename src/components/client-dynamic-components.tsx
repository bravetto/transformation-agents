"use client";

import dynamic from "next/dynamic";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

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
export const Navigation = withDivineErrorBoundary(NavigationBase, {
  componentName: "Navigation",
  role: "guardian",
});

export const ImpactDashboard = withDivineErrorBoundary(ImpactDashboardBase, {
  componentName: "ImpactDashboard",
  role: "witness",
});

export const FloatingTestimony = withDivineErrorBoundary(
  FloatingTestimonyBase,
  {
    componentName: "FloatingTestimony",
    role: "messenger",
  },
);

export const CursorTrail = withDivineErrorBoundary(CursorTrailBase, {
  componentName: "CursorTrail",
  role: "lightworker",
});

export const SocialAmplification = withDivineErrorBoundary(
  SocialAmplificationBase,
  {
    componentName: "SocialAmplification",
    role: "messenger",
  },
);
