"use client";

import React, { Suspense, useCallback } from "react";
import { Analytics } from "./analytics";
import {
  trackModalInteraction,
  getCurrentUserType,
  type UserType,
} from "@/lib/analytics/user-journey";

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

export function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </>
  );
}

// Hook for tracking modal interactions
export function useModalAnalytics() {
  // 🛡️ CRITICAL FIX: Memoized tracking functions to prevent re-renders
  const trackModalView = useCallback(() => {
    trackModalInteraction({
      eventType: "modal_viewed",
      metadata: {
        deviceType: getDeviceType(),
      },
    });
  }, []);

  const trackCardHover = useCallback((userType: UserType) => {
    trackModalInteraction({
      eventType: "card_hovered",
      userType,
      metadata: {
        deviceType: getDeviceType(),
      },
    });
  }, []);

  const trackPathSelection = useCallback((userType: UserType) => {
    trackModalInteraction({
      eventType: "path_selected",
      userType,
      metadata: {
        deviceType: getDeviceType(),
      },
    });
  }, []);

  const trackModalDismiss = useCallback(() => {
    trackModalInteraction({
      eventType: "modal_dismissed",
      metadata: {
        deviceType: getDeviceType(),
      },
    });
  }, []);

  return {
    trackModalView,
    trackCardHover,
    trackPathSelection,
    trackModalDismiss,
  };
}

// Utility function to detect device type
function getDeviceType(): "desktop" | "mobile" | "tablet" {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
