"use client";

interface BootstrapData {
  distinctID: string;
  featureFlags: Record<string, boolean | string>;
}

interface PostHogClientConfig {
  bootstrapData?: BootstrapData;
}

interface ExperimentEvent {
  eventType:
    | "experiment_viewed"
    | "experiment_converted"
    | "experiment_assigned";
  experimentKey: string;
  variant: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// Client-side PostHog wrapper that proxies events through API
class PostHogClient {
  private bootstrapData: BootstrapData | null = null;
  private userId: string;

  constructor(config?: PostHogClientConfig) {
    this.bootstrapData = config?.bootstrapData || null;
    this.userId = this.getOrCreateUserId();
  }

  private getOrCreateUserId(): string {
    if (typeof window === "undefined") return "anonymous";

    let userId = localStorage.getItem("posthog_user_id");
    if (!userId) {
      userId = "user_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("posthog_user_id", userId);
    }
    return userId;
  }

  getDistinctID(): string {
    return this.bootstrapData?.distinctID || this.userId;
  }

  getFeatureFlag(key: string): boolean | string | undefined {
    return this.bootstrapData?.featureFlags?.[key];
  }

  async capture(
    eventName: string,
    properties?: Record<string, any>,
  ): Promise<void> {
    try {
      const response = await fetch("/api/analytics/experiment-tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType: eventName,
          experimentKey: properties?.experimentKey || "unknown",
          variant: properties?.variant || "unknown",
          userId: this.getDistinctID(),
          metadata: properties,
        } as ExperimentEvent),
      });

      if (!response.ok) {
        console.warn("Failed to track event:", eventName);
      }
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  }

  async trackExperiment(
    experimentKey: string,
    variant: string,
    eventType: ExperimentEvent["eventType"] = "experiment_viewed",
  ): Promise<void> {
    await this.capture(eventType, {
      experimentKey,
      variant,
      userId: this.getDistinctID(),
    });
  }

  // Add the method that ExperimentOrchestrator expects
  async trackExperimentEvent(event: ExperimentEvent): Promise<void> {
    await this.capture(event.eventType, {
      experimentKey: event.experimentKey,
      variant: event.variant,
      userId: event.userId || this.getDistinctID(),
      metadata: event.metadata,
    });
  }

  // Utility method for generating user IDs
  static generateId(): string {
    return "user_" + Math.random().toString(36).substring(2, 15);
  }
}

// Factory function to create PostHog client
export function createPostHogClient(
  config?: PostHogClientConfig,
): PostHogClient {
  return new PostHogClient(config);
}

// Export types
export type { BootstrapData, ExperimentEvent, PostHogClientConfig };
export { PostHogClient };
