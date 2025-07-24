"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  trackModalInteraction,
  trackPathProgression,
  trackConversion,
  trackDivineEvent,
  getCurrentUserType,
  getSessionAnalytics,
  type UserType,
} from "@/lib/analytics/user-journey";

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

export function AnalyticsWrapper({ children }: AnalyticsWrapperProps) {
  const pathname = usePathname();
  const previousPath = useRef<string>("");

  // Track page views and path navigation
  useEffect(() => {
    const currentUserType = getCurrentUserType();

    // Track page navigation
    if (previousPath.current !== pathname) {
      trackPathProgression({
        eventType: "step_started",
        userType: currentUserType,
        currentStep: pathname,
        metadata: {
          timeOnStep: Date.now(),
        },
      });

      // Track step completion for previous page
      if (previousPath.current) {
        trackPathProgression({
          eventType: "step_completed",
          userType: currentUserType,
          currentStep: previousPath.current,
          nextStep: pathname,
          metadata: {
            timeOnStep: Date.now(),
          },
        });
      }

      previousPath.current = pathname;
    }
  }, [pathname]);

  // Track specific path-based conversions
  useEffect(() => {
    const currentUserType = getCurrentUserType();

    // Track goal achievements based on path
    if (pathname === "/people/jay-forte" && currentUserType === "coach") {
      trackConversion({
        eventType: "goal_achieved",
        userType: currentUserType,
        conversionType: "primary",
        metadata: {
          ctaText: "Greatness Zone Assessment",
          conversionValue: 1,
        },
      });
    }

    if (pathname === "/dashboard/judge" && currentUserType === "judge") {
      trackConversion({
        eventType: "goal_achieved",
        userType: currentUserType,
        conversionType: "primary",
        metadata: {
          ctaText: "Review Evidence Dashboard",
          conversionValue: 1,
        },
      });
    }

    if (pathname === "/letter-form-test" && currentUserType === "activist") {
      trackConversion({
        eventType: "goal_achieved",
        userType: currentUserType,
        conversionType: "primary",
        metadata: {
          ctaText: "Write Letter to Judge",
          conversionValue: 1,
        },
      });
    }
  }, [pathname]);

  return <>{children}</>;
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

// Hook for tracking CTA clicks
export function useCTAAnalytics() {
  const trackCTAClick = (ctaText: string, userType?: UserType) => {
    const currentUserType = userType || getCurrentUserType();

    trackConversion({
      eventType: "cta_clicked",
      userType: currentUserType,
      conversionType: "secondary",
      metadata: {
        ctaText,
        deviceType: getDeviceType(),
      },
    });
  };

  const trackFormSubmission = (formType: string, userType?: UserType) => {
    const currentUserType = userType || getCurrentUserType();

    trackConversion({
      eventType: "form_submitted",
      userType: currentUserType,
      conversionType: "primary",
      metadata: {
        formType,
        deviceType: getDeviceType(),
      },
    });
  };

  const trackSocialShare = (shareTarget: string, userType?: UserType) => {
    const currentUserType = userType || getCurrentUserType();

    trackConversion({
      eventType: "social_shared",
      userType: currentUserType,
      conversionType: "tertiary",
      metadata: {
        shareTarget,
        deviceType: getDeviceType(),
      },
    });
  };

  return {
    trackCTAClick,
    trackFormSubmission,
    trackSocialShare,
  };
}

// Hook for tracking path progression
export function usePathAnalytics() {
  const trackStepStart = (step: string, userType?: UserType) => {
    const currentUserType = userType || getCurrentUserType();

    trackPathProgression({
      eventType: "step_started",
      userType: currentUserType,
      currentStep: step,
      metadata: {
        timeOnStep: Date.now(),
      },
    });
  };

  const recordStepCompletion = useCallback(
    (
      step: string,
      nextStep?: string,
      userType?: UserType,
      metadata?: { timeOnStep?: number },
    ) => {
      const currentUserType = userType || getCurrentUserType();

      const progressionData = {
        eventType: "step_completed" as const,
        userType: currentUserType,
        currentStep: step,
        metadata: {
          timeOnStep: metadata?.timeOnStep || 0,
        },
        ...(nextStep && { nextStep }),
      };

      trackPathProgression(progressionData);
    },
    [],
  );

  const trackJourneyAbandonment = (
    step: string,
    reason?: string,
    userType?: UserType,
  ) => {
    const currentUserType = userType || getCurrentUserType();

    trackPathProgression({
      eventType: "journey_abandoned",
      userType: currentUserType,
      currentStep: step,
      metadata: {
        dropoffReason: reason,
        timeOnStep: Date.now(),
      },
    });
  };

  const trackPathSwitch = (
    fromStep: string,
    toStep: string,
    userType?: UserType,
  ) => {
    const currentUserType = userType || getCurrentUserType();

    trackPathProgression({
      eventType: "path_switched",
      userType: currentUserType,
      currentStep: fromStep,
      nextStep: toStep,
      metadata: {
        timeOnStep: Date.now(),
      },
    });
  };

  return {
    trackStepStart,
    recordStepCompletion,
    trackJourneyAbandonment,
    trackPathSwitch,
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

// Analytics provider for development insights
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Development analytics dashboard
    if (process.env.NODE_ENV === "development") {
      // Add analytics debugging tools
      (window as any).__BRIDGE_ANALYTICS__ = {
        getCurrentUserType,
        getSessionAnalytics: () => {
          // Note: Hooks cannot be called in regular functions
          // These would need to be called from within React components
          return {
            info: "Analytics hooks available: useModalAnalytics, useCTAAnalytics, usePathAnalytics",
            usage: "Call these hooks from within React components only",
          };
        },
      };
    }
  }, []);

  return <AnalyticsWrapper>{children}</AnalyticsWrapper>;
}
