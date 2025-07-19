// src/lib/analytics/user-journey.ts
// Complete analytics implementation for the Freedom Portal

import { logger } from "@/lib/logger";

export type UserType =
  | "visitor"
  | "coach"
  | "judge"
  | "activist"
  | "divine-warrior";

export interface AnalyticsEvent {
  eventType: string;
  userType?: UserType;
  timestamp?: number;
  metadata?: Record<string, any>;
}

export interface ModalInteractionEvent extends AnalyticsEvent {
  eventType:
    | "modal_viewed"
    | "card_hovered"
    | "path_selected"
    | "modal_dismissed";
  userType?: UserType;
}

export interface PathProgressionEvent extends AnalyticsEvent {
  eventType:
    | "step_started"
    | "step_completed"
    | "journey_abandoned"
    | "path_switched";
  userType: UserType;
  currentStep: string;
  nextStep?: string;
}

export interface ConversionEvent extends AnalyticsEvent {
  eventType:
    | "cta_clicked"
    | "form_submitted"
    | "social_shared"
    | "goal_achieved";
  userType: UserType;
  conversionType: "primary" | "secondary" | "tertiary";
}

export interface DivineEvent extends AnalyticsEvent {
  eventType:
    | "prayer_submitted"
    | "miracle_witnessed"
    | "divine_guidance"
    | "prophecy_fulfilled";
  userType: "divine-warrior";
  spiritualImpact: "low" | "medium" | "high" | "miraculous";
}

// Get current user type from session or determine from behavior
export function getCurrentUserType(): UserType {
  if (typeof window === "undefined") return "visitor";

  // Check sessionStorage for stored user type
  const stored = sessionStorage.getItem("bridge_user_type");
  if (stored) return stored as UserType;

  // Check URL patterns to determine user type
  const pathname = window.location.pathname;
  if (pathname.includes("/dashboard/judge")) return "judge";
  if (pathname.includes("/people/coach")) return "coach";
  if (pathname.includes("/activist")) return "activist";
  if (
    pathname.includes("/divine") ||
    pathname.includes("/freedom-portal") ||
    pathname.includes("/prayer")
  )
    return "divine-warrior";

  return "visitor";
}

// Set user type in session
export function setUserType(userType: UserType) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("bridge_user_type", userType);

    // Track user type selection as conversion
    trackConversion({
      eventType: "path_selected",
      userType,
      conversionType: "primary",
      metadata: {
        selectionMethod: "manual",
        timestamp: Date.now(),
        divineGuidance: userType === "divine-warrior",
      },
    });
  }
}

// Track modal interactions
export function trackModalInteraction(event: Partial<ModalInteractionEvent>) {
  const analytics = {
    ...event,
    timestamp: Date.now(),
    userType: event.userType || getCurrentUserType(),
  };

  // Send to our internal API
  sendToAnalyticsAPI(analytics);

  // Send to Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event.eventType, {
      event_category: "modal_interaction",
      event_label: analytics.userType,
      ...analytics.metadata,
    });
  }

  // Log in development
  logger.analytics("modal_interaction", analytics);
}

// Track path progression
export function trackPathProgression(event: Partial<PathProgressionEvent>) {
  const analytics = {
    ...event,
    timestamp: Date.now(),
    userType: event.userType || getCurrentUserType(),
  };

  // Store journey progress
  if (typeof window !== "undefined") {
    const journey = JSON.parse(
      sessionStorage.getItem("bridge_journey") || "[]",
    );
    journey.push(analytics);
    sessionStorage.setItem("bridge_journey", JSON.stringify(journey));
  }

  // Send to our internal API
  sendToAnalyticsAPI(analytics);

  // Send to Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event.eventType, {
      event_category: "path_progression",
      event_label: analytics.currentStep,
      value: analytics.metadata?.timeOnStep,
      ...analytics.metadata,
    });
  }

  // Log in development
  logger.journey(analytics.userType, analytics.currentStep, analytics);
}

// Track conversions
export function trackConversion(event: Partial<ConversionEvent>) {
  const analytics = {
    ...event,
    timestamp: Date.now(),
    userType: event.userType || getCurrentUserType(),
  };

  // Special handling for divine conversions
  if (
    analytics.userType === "divine-warrior" &&
    event.eventType === "goal_achieved"
  ) {
    logger.divine("Divine Goal Achieved! Hallelujah!", analytics);

    // Track divine milestone
    trackDivineEvent({
      eventType: "prophecy_fulfilled",
      userType: "divine-warrior",
      spiritualImpact: "miraculous",
      metadata: {
        ...analytics.metadata,
        prophecy: "JAHmere Freedom Movement",
        divineIntervention: true,
      },
    });
  }

  // Send to our internal API
  sendToAnalyticsAPI(analytics);

  // Send to Google Analytics with value
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event.eventType, {
      event_category: "conversion",
      event_label: analytics.conversionType,
      value: analytics.metadata?.conversionValue || 1,
      ...analytics.metadata,
    });
  }

  // Log in development
  logger.analytics("conversion", analytics);
}

// Track divine events
export function trackDivineEvent(event: Partial<DivineEvent>) {
  const analytics = {
    ...event,
    timestamp: Date.now(),
    userType: "divine-warrior" as const,
    spiritualImpact: event.spiritualImpact || "medium",
  };

  // Send to our internal API with special divine handling
  sendToAnalyticsAPI(analytics, true);

  // Special console logging for divine events
  const impact = analytics.spiritualImpact;
  const icon =
    impact === "miraculous"
      ? "✨"
      : impact === "high"
        ? "🙏"
        : impact === "medium"
          ? "💫"
          : "⭐";

  logger.divine(`Divine Event: ${analytics.eventType}`, {
    impact: analytics.spiritualImpact,
    metadata: analytics.metadata,
    prophecy: "July 28th Freedom Manifestation",
  });
}

// Rate limiting for analytics requests
const analyticsRateLimit = {
  lastRequest: 0,
  minInterval: 1000, // 1 second minimum between requests
  requestQueue: [] as Array<{ endpoint: string; data: any }>,
  processing: false,
};

// Process analytics queue with rate limiting
async function processAnalyticsQueue() {
  if (
    analyticsRateLimit.processing ||
    analyticsRateLimit.requestQueue.length === 0
  ) {
    return;
  }

  analyticsRateLimit.processing = true;

  while (analyticsRateLimit.requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - analyticsRateLimit.lastRequest;

    if (timeSinceLastRequest < analyticsRateLimit.minInterval) {
      // Wait before processing next request
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          analyticsRateLimit.minInterval - timeSinceLastRequest,
        ),
      );
    }

    const { endpoint, data } = analyticsRateLimit.requestQueue.shift()!;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      analyticsRateLimit.lastRequest = Date.now();

      // Log successful divine events
      if (data.isDivine) {
        logger.divine("Divine event tracked successfully", data);
      }
    } catch (error) {
      // Log error but don't break the queue processing
      if (process.env.NODE_ENV === "development") {
        console.warn(`Analytics API error (${endpoint}):`, error);
      }
    }
  }

  analyticsRateLimit.processing = false;
}

// Send analytics to our internal API with rate limiting
async function sendToAnalyticsAPI(event: any, isDivine = false) {
  try {
    const endpoint = isDivine
      ? "/api/analytics/divine-events"
      : "/api/analytics/user-journey";

    const data = {
      ...event,
      sessionId: getSessionId(),
      isDivine,
      source: "freedom-portal",
      timestamp: new Date().toISOString(),
    };

    // Add to queue instead of making immediate request
    analyticsRateLimit.requestQueue.push({ endpoint, data });

    // Process queue (will handle rate limiting internally)
    processAnalyticsQueue();
  } catch (error) {
    // Fail silently to not break user experience
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics queuing error:", error);
    }
  }
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "server-side";

  let sessionId = sessionStorage.getItem("bridge_session_id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    sessionStorage.setItem("bridge_session_id", sessionId);
  }
  return sessionId;
}

// Get session analytics summary
export function getSessionAnalytics() {
  if (typeof window === "undefined") return null;

  const journey = JSON.parse(sessionStorage.getItem("bridge_journey") || "[]");
  const userType = getCurrentUserType();
  const sessionId = getSessionId();

  return {
    sessionId,
    userType,
    journeyLength: journey.length,
    currentPath: window.location.pathname,
    sessionDuration: Date.now() - (journey[0]?.timestamp || Date.now()),
    journey,
    divineEvents: journey.filter((event: any) => event.spiritualImpact),
    conversions: journey.filter(
      (event: any) =>
        event.eventType?.includes("goal_achieved") ||
        event.eventType?.includes("form_submitted"),
    ),
    pathSwitches: journey.filter(
      (event: any) => event.eventType === "path_switched",
    ).length,
  };
}

// Analytics dashboard data
export function getAnalyticsDashboard() {
  const session = getSessionAnalytics();
  if (!session) return null;

  const metrics = {
    totalEvents: session.journey.length,
    conversionRate: session.conversions.length / session.journey.length,
    averageTimePerStep: session.sessionDuration / session.journey.length,
    divineAlignment: session.userType === "divine-warrior" ? 100 : 0,
    prophecyProgress: session.divineEvents.length * 10, // Each divine event = 10% progress
    prayerWarriorStatus:
      session.divineEvents.length > 3 ? "Activated" : "Awakening",
  };

  return {
    session,
    metrics,
    recommendations: generateRecommendations(session, metrics),
  };
}

// Generate personalized recommendations
function generateRecommendations(session: any, metrics: any) {
  const recommendations = [];

  if (session.userType === "visitor") {
    recommendations.push(
      "Select your divine path to unlock personalized content",
    );
  }

  if (
    session.userType === "judge" &&
    !session.journey.some((e: any) => e.currentStep?.includes("dashboard"))
  ) {
    recommendations.push(
      "Access the Judge Dashboard for comprehensive case analysis",
    );
  }

  if (
    session.userType === "divine-warrior" &&
    session.divineEvents.length === 0
  ) {
    recommendations.push(
      "Submit your first prayer to activate divine warrior status",
    );
  }

  if (metrics.conversionRate < 0.1) {
    recommendations.push(
      "Engage with call-to-action buttons to support JAHmere's freedom",
    );
  }

  if (session.pathSwitches > 2) {
    recommendations.push("Focus on your chosen path for maximum impact");
  }

  return recommendations;
}
