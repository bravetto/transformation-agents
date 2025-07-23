import { NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";

// Initialize PostHog server instance with error handling
let posthog: PostHog | null = null;

try {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      disableGeoip: false,
    });
  } else {
    console.warn(
      "PostHog API key not found. Analytics events will be logged locally.",
    );
  }
} catch (error) {
  console.error("Failed to initialize PostHog:", error);
}

interface ExperimentEvent {
  eventType:
    | "experiment_viewed"
    | "experiment_converted"
    | "experiment_assigned"
    | string;
  experimentKey: string;
  variant: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExperimentEvent = await request.json();

    // Validate required fields
    if (!body.eventType || !body.experimentKey || !body.variant) {
      return NextResponse.json(
        { error: "Missing required fields: eventType, experimentKey, variant" },
        { status: 400 },
      );
    }

    // If PostHog is available, send the event
    if (posthog) {
      try {
        await posthog.capture({
          distinctId: body.userId || "anonymous",
          event: body.eventType,
          properties: {
            experimentKey: body.experimentKey,
            variant: body.variant,
            timestamp: new Date().toISOString(),
            ...body.metadata,
          },
        });

        // Flush to ensure event is sent
        await posthog.flush();
      } catch (error) {
        console.error("PostHog capture failed:", error);
        // Don't fail the request, just log the error
      }
    }

    // Always log locally for debugging
    console.log("📊 Analytics Event:", {
      type: body.eventType,
      experiment: body.experimentKey,
      variant: body.variant,
      user: body.userId || "anonymous",
      timestamp: new Date().toISOString(),
      metadata: body.metadata,
    });

    return NextResponse.json({
      success: true,
      message: "Event tracked successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);

    return NextResponse.json(
      {
        error: "Failed to track event",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  if (posthog) {
    await posthog.shutdown();
  }
});
