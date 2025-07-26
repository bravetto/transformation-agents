/**
 * 🎯 ANALYTICS TYPE DEFINITIONS
 * Championship-level type safety for The Bridge Project analytics system
 */

export type ConversionEventType =
  | "cta_clicked"
  | "form_submitted"
  | "social_shared"
  | "goal_achieved";

export type UserType =
  | "visitor"
  | "coach"
  | "judge"
  | "activist"
  | "divine-warrior";

export type ConversionType = "primary" | "secondary" | "tertiary" | "divine";

export interface ConversionEvent {
  eventType: ConversionEventType;
  userType: UserType;
  conversionType: ConversionType;
  metadata?: Record<string, any>;
  timestamp?: number;
}

export interface DivineEventData {
  eventType: string;
  component: string;
  userType?: UserType;
  metadata?: Record<string, any>;
  urgency?: "normal" | "urgent" | "critical" | "divine";
}

export interface AnalyticsHook {
  trackDivineEvent: (data: DivineEventData) => void;
  trackModalInteraction: (modalType: string, action: string) => void;
  trackPrayerWarrior: (action: string, metadata?: Record<string, any>) => void;
}

// Divine event tracking constants
export const divineEvents = {
  FREEDOM_COUNTDOWN_VIEW: "freedom_countdown_viewed",
  PRAYER_OFFERED: "prayer_offered",
  TESTIMONY_READ: "testimony_read_complete",
  SHARE_INITIATED: "divine_share_initiated",
  SUPPORT_CLICKED: "support_jahmere_clicked",
  PRAYER_WARRIOR_JOINED: "prayer_warrior_joined",
} as const;

export type DivineEventType = (typeof divineEvents)[keyof typeof divineEvents];
