"use client";

import dynamic from "next/dynamic";

export const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

export const ImpactDashboard = dynamic(
  () => import("@/components/impact-dashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

export const FloatingTestimony = dynamic(
  () => import("@/components/floating-testimony"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);

export const CursorTrail = dynamic(() => import("@/components/cursor-trail"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

export const SocialAmplification = dynamic(
  () => import("@/components/social-amplification"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  },
);
