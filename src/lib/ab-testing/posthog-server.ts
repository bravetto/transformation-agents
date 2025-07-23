import { PostHog } from "posthog-node";
import { cookies } from "next/headers";

interface BootstrapData {
  distinctID: string;
  featureFlags: Record<string, boolean | string>;
}

export class PostHogServerClient {
  private static instance: PostHog | null = null;

  static getInstance(): PostHog | null {
    // Check if we have the required API key
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      console.warn("PostHog API key not found. Analytics will be disabled.");
      return null;
    }

    if (!this.instance) {
      this.instance = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        disableGeoip: false,
      });
    }
    return this.instance;
  }

  static async getBootstrapData(): Promise<BootstrapData> {
    const posthog = this.getInstance();

    if (!posthog) {
      // Return fallback data when PostHog is not available
      return {
        distinctID: "anonymous_" + Math.random().toString(36).substring(2, 15),
        featureFlags: {
          character_letter_presentation_v1: "control",
        },
      };
    }

    try {
      // Get or create user ID from cookies
      const cookieStore = await cookies();
      let distinctID = cookieStore.get("posthog_distinct_id")?.value;

      if (!distinctID) {
        distinctID = "user_" + Math.random().toString(36).substring(2, 15);
        // Note: We can't set cookies here in a server component
        // The client will need to handle cookie setting
      }

      // Get feature flags for this user
      const featureFlags = await posthog.getAllFlags(distinctID);

      return {
        distinctID,
        featureFlags: featureFlags || {
          character_letter_presentation_v1: "control",
        },
      };
    } catch (error) {
      console.warn("Failed to get PostHog bootstrap data:", error);

      // Return fallback data
      return {
        distinctID: "fallback_" + Math.random().toString(36).substring(2, 15),
        featureFlags: {
          character_letter_presentation_v1: "control",
        },
      };
    }
  }

  static async shutdown(): Promise<void> {
    if (this.instance) {
      await this.instance.shutdown();
      this.instance = null;
    }
  }
}

export type { BootstrapData };
