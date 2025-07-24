"use client";

import { useCallback } from "react";
import { trackConversion } from "@/lib/analytics/user-journey";
import type { ConversionEventType, UserType } from "@/types/analytics";

interface DivineEventData {
  eventType: string;
  component: string;
  userType?: string;
  metadata?: Record<string, any>;
  urgency?: "normal" | "urgent" | "critical" | "divine";
}

interface AnalyticsHook {
  trackDivineEvent: (data: DivineEventData) => void;
  trackModalInteraction: (modalType: string, action: string) => void;
  trackPrayerWarrior: (action: string, metadata?: Record<string, any>) => void;
}

export function useAnalytics(): AnalyticsHook {
  const trackDivineEvent = useCallback((data: DivineEventData) => {
    try {
      // Track as conversion event with divine context
      const validEventTypes: ConversionEventType[] = [
        "cta_clicked",
        "form_submitted",
        "social_shared",
        "goal_achieved",
      ];
      const eventType = validEventTypes.includes(
        data.eventType as ConversionEventType,
      )
        ? (data.eventType as ConversionEventType)
        : "cta_clicked";

      const validConversionTypes = [
        "primary",
        "secondary",
        "tertiary",
      ] as const;
      const conversionType = data.urgency === "divine" ? "primary" : "primary";

      trackConversion({
        eventType,
        userType: (data.userType || "visitor") as UserType,
        conversionType,
        metadata: {
          component: data.component,
          urgency: data.urgency || "normal",
          originalEventType: data.eventType, // Keep original event type in metadata
          ...data.metadata,
        },
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  }, []);

  const trackModalInteraction = useCallback(
    (modalType: string, action: string) => {
      trackDivineEvent({
        eventType: "modal_interaction",
        component: modalType,
        metadata: { action },
      });
    },
    [trackDivineEvent],
  );

  const trackPrayerWarrior = useCallback(
    (action: string, metadata?: Record<string, any>) => {
      trackDivineEvent({
        eventType: "prayer_warrior_activation",
        component: "DivinePrayerActivation",
        urgency: "divine",
        metadata: { action, ...metadata },
      });
    },
    [trackDivineEvent],
  );

  return {
    trackDivineEvent,
    trackModalInteraction,
    trackPrayerWarrior,
  };
}

// Divine event tracking for JAHmere's freedom mission
export const divineEvents = {
  FREEDOM_COUNTDOWN_VIEW: "freedom_countdown_viewed",
  PRAYER_OFFERED: "prayer_offered",
  TESTIMONY_READ: "testimony_read_complete",
  SHARE_INITIATED: "divine_share_initiated",
  SUPPORT_CLICKED: "support_jahmere_clicked",
  PRAYER_WARRIOR_JOINED: "prayer_warrior_joined",
} as const;

export type DivineEventType = (typeof divineEvents)[keyof typeof divineEvents];
