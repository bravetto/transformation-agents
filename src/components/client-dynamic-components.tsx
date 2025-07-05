'use client';

import dynamic from 'next/dynamic';

export const Navigation = dynamic(() => import("@/components/navigation"), {
  ssr: false,
});

export const ImpactDashboard = dynamic(() => import("@/components/impact-dashboard"), {
  ssr: false,
});

export const FloatingTestimony = dynamic(() => import("@/components/floating-testimony"), {
  ssr: false,
});

export const CursorTrail = dynamic(() => import("@/components/cursor-trail"), {
  ssr: false,
});

export const SocialAmplification = dynamic(() => import("@/components/social-amplification"), {
  ssr: false,
}); 