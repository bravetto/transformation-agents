/**
 * User Journey Analytics for The Bridge Project
 * Tracks three-path modal system and user behavior
 */

export type UserType = "coach" | "judge" | "activist" | "unknown";

export interface ModalInteractionEvent {
  eventType:
    | "modal_viewed"
    | "card_hovered"
    | "path_selected"
    | "modal_dismissed";
  userType?: UserType;
  timestamp: number;
  sessionId: string;
  metadata?: {
    hoverTime?: number;
    selectionTime?: number;
    cardOrder?: number;
    deviceType?: "desktop" | "mobile" | "tablet";
  };
}

export interface PathProgressionEvent {
  eventType:
    | "step_completed"
    | "step_started"
    | "journey_abandoned"
    | "path_switched";
  userType: UserType;
  currentStep: string;
  nextStep?: string;
  timestamp: number;
  sessionId: string;
  metadata?: {
    timeOnStep?: number;
    completionRate?: number;
    dropoffReason?: string;
  };
}

export interface ConversionEvent {
  eventType:
    | "goal_achieved"
    | "cta_clicked"
    | "form_submitted"
    | "social_shared";
  userType: UserType;
  conversionType: "primary" | "secondary" | "tertiary";
  timestamp: number;
  sessionId: string;
  metadata?: {
    ctaText?: string;
    formType?: string;
    shareTarget?: string;
    conversionValue?: number;
  };
}

export type AnalyticsEvent =
  | ModalInteractionEvent
  | PathProgressionEvent
  | ConversionEvent;

export interface UserJourneyMetrics {
  modalSelectionRate: number;
  pathCompletionRates: {
    coach: number;
    judge: number;
    activist: number;
    overall: number;
  };
  conversionFunnels: {
    coach: FunnelMetrics;
    judge: FunnelMetrics;
    activist: FunnelMetrics;
  };
  averageSessionDuration: number;
  crossPathMigration: number;
  dropoffPoints: Record<string, number>;
}

export interface FunnelMetrics {
  modalView: number;
  pathSelection: number;
  stepCompletion: number;
  goalAchievement: number;
  conversionRate: number;
}

class UserJourneyAnalytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private currentUserType: UserType = "unknown";

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking(): void {
    // Track page visibility changes
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          this.flushEvents();
        }
      });
    }

    // Track before page unload
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        this.flushEvents();
      });
    }
  }

  /**
   * Track modal interaction events
   */
  trackModalInteraction(
    event: Omit<ModalInteractionEvent, "timestamp" | "sessionId">,
  ): void {
    const analyticsEvent: ModalInteractionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);
    this.processEvent(analyticsEvent);

    // Update current user type if path selected
    if (event.eventType === "path_selected" && event.userType) {
      this.currentUserType = event.userType;
    }
  }

  /**
   * Track path progression events
   */
  trackPathProgression(
    event: Omit<PathProgressionEvent, "timestamp" | "sessionId">,
  ): void {
    const analyticsEvent: PathProgressionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);
    this.processEvent(analyticsEvent);
  }

  /**
   * Track conversion events
   */
  trackConversion(
    event: Omit<ConversionEvent, "timestamp" | "sessionId">,
  ): void {
    const analyticsEvent: ConversionEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.events.push(analyticsEvent);
    this.processEvent(analyticsEvent);
  }

  /**
   * Get current user type
   */
  getCurrentUserType(): UserType {
    return this.currentUserType;
  }

  /**
   * Get session analytics
   */
  getSessionAnalytics(): {
    sessionId: string;
    userType: UserType;
    eventCount: number;
    sessionDuration: number;
    events: AnalyticsEvent[];
  } {
    const sessionStart =
      this.events.length > 0 ? this.events[0].timestamp : Date.now();
    const sessionEnd =
      this.events.length > 0
        ? this.events[this.events.length - 1].timestamp
        : Date.now();

    return {
      sessionId: this.sessionId,
      userType: this.currentUserType,
      eventCount: this.events.length,
      sessionDuration: sessionEnd - sessionStart,
      events: [...this.events],
    };
  }

  /**
   * Calculate user journey metrics
   */
  calculateMetrics(): UserJourneyMetrics {
    const modalViews = this.events.filter(
      (e) => e.eventType === "modal_viewed",
    ).length;
    const pathSelections = this.events.filter(
      (e) => e.eventType === "path_selected",
    ).length;

    const coachEvents = this.events.filter(
      (e) => "userType" in e && e.userType === "coach",
    );
    const judgeEvents = this.events.filter(
      (e) => "userType" in e && e.userType === "judge",
    );
    const activistEvents = this.events.filter(
      (e) => "userType" in e && e.userType === "activist",
    );

    const modalSelectionRate = modalViews > 0 ? pathSelections / modalViews : 0;

    return {
      modalSelectionRate,
      pathCompletionRates: {
        coach: this.calculatePathCompletion(coachEvents),
        judge: this.calculatePathCompletion(judgeEvents),
        activist: this.calculatePathCompletion(activistEvents),
        overall: this.calculateOverallCompletion(),
      },
      conversionFunnels: {
        coach: this.calculateFunnelMetrics("coach"),
        judge: this.calculateFunnelMetrics("judge"),
        activist: this.calculateFunnelMetrics("activist"),
      },
      averageSessionDuration: this.calculateAverageSessionDuration(),
      crossPathMigration: this.calculateCrossPathMigration(),
      dropoffPoints: this.calculateDropoffPoints(),
    };
  }

  private calculatePathCompletion(events: AnalyticsEvent[]): number {
    const stepCompleted = events.filter(
      (e) => e.eventType === "step_completed",
    ).length;
    const stepStarted = events.filter(
      (e) => e.eventType === "step_started",
    ).length;
    return stepStarted > 0 ? stepCompleted / stepStarted : 0;
  }

  private calculateOverallCompletion(): number {
    const allCompletions = this.events.filter(
      (e) => e.eventType === "step_completed",
    ).length;
    const allStarts = this.events.filter(
      (e) => e.eventType === "step_started",
    ).length;
    return allStarts > 0 ? allCompletions / allStarts : 0;
  }

  private calculateFunnelMetrics(userType: UserType): FunnelMetrics {
    const userEvents = this.events.filter(
      (e) => "userType" in e && e.userType === userType,
    );

    const modalView = userEvents.filter(
      (e) => e.eventType === "modal_viewed",
    ).length;
    const pathSelection = userEvents.filter(
      (e) => e.eventType === "path_selected",
    ).length;
    const stepCompletion = userEvents.filter(
      (e) => e.eventType === "step_completed",
    ).length;
    const goalAchievement = userEvents.filter(
      (e) => e.eventType === "goal_achieved",
    ).length;

    return {
      modalView,
      pathSelection,
      stepCompletion,
      goalAchievement,
      conversionRate: modalView > 0 ? goalAchievement / modalView : 0,
    };
  }

  private calculateAverageSessionDuration(): number {
    if (this.events.length < 2) return 0;
    const sessionStart = this.events[0].timestamp;
    const sessionEnd = this.events[this.events.length - 1].timestamp;
    return sessionEnd - sessionStart;
  }

  private calculateCrossPathMigration(): number {
    const pathSwitches = this.events.filter(
      (e) => e.eventType === "path_switched",
    ).length;
    const pathSelections = this.events.filter(
      (e) => e.eventType === "path_selected",
    ).length;
    return pathSelections > 0 ? pathSwitches / pathSelections : 0;
  }

  private calculateDropoffPoints(): Record<string, number> {
    const dropoffs: Record<string, number> = {};
    const abandonedEvents = this.events.filter(
      (e) => e.eventType === "journey_abandoned",
    );

    abandonedEvents.forEach((event) => {
      if ("currentStep" in event) {
        dropoffs[event.currentStep] = (dropoffs[event.currentStep] || 0) + 1;
      }
    });

    return dropoffs;
  }

  private processEvent(event: AnalyticsEvent): void {
    // Send to external analytics service
    this.sendToAnalytics(event);

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 User Journey Event:", event);
    }

    // Auto-flush events periodically
    if (this.events.length >= 10) {
      this.flushEvents();
    }
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // Send to Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.eventType, {
        event_category: "user_journey",
        event_label: "userType" in event ? event.userType : "unknown",
        custom_parameters: event.metadata || {},
      });
    }

    // Send to custom analytics endpoint
    if (typeof fetch !== "undefined") {
      fetch("/api/analytics/user-journey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch((error) => {
        console.error("Failed to send analytics event:", error);
      });
    }
  }

  private flushEvents(): void {
    if (this.events.length === 0) return;

    // Send batch to analytics
    if (typeof fetch !== "undefined") {
      fetch("/api/analytics/user-journey/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events,
          metrics: this.calculateMetrics(),
        }),
        keepalive: true,
      }).catch((error) => {
        console.error("Failed to flush analytics events:", error);
      });
    }

    // Clear events after sending
    this.events = [];
  }
}

// Create singleton instance
export const userJourneyAnalytics = new UserJourneyAnalytics();

// Export convenience functions
export const trackModalInteraction = (
  event: Omit<ModalInteractionEvent, "timestamp" | "sessionId">,
) => {
  userJourneyAnalytics.trackModalInteraction(event);
};

export const trackPathProgression = (
  event: Omit<PathProgressionEvent, "timestamp" | "sessionId">,
) => {
  userJourneyAnalytics.trackPathProgression(event);
};

export const trackConversion = (
  event: Omit<ConversionEvent, "timestamp" | "sessionId">,
) => {
  userJourneyAnalytics.trackConversion(event);
};

export const getCurrentUserType = () => {
  return userJourneyAnalytics.getCurrentUserType();
};

export const getSessionAnalytics = () => {
  return userJourneyAnalytics.getSessionAnalytics();
};

export const getUserJourneyMetrics = () => {
  return userJourneyAnalytics.calculateMetrics();
};
