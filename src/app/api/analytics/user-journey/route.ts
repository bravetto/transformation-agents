import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  SessionStore,
  type UserJourneyEvent,
} from "@/lib/analytics/session-store";

export async function POST(request: Request) {
  try {
    const event: UserJourneyEvent = await request.json();

    // Validate required fields
    if (!event.eventType || !event.userType || !event.sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: eventType, userType, sessionId" },
        { status: 400 },
      );
    }

    // Add timestamp if not provided
    if (!event.timestamp) {
      event.timestamp = new Date().toISOString();
    }

    // Store event using shared session store
    SessionStore.addEvent(event);

    // Log the divine event
    logger.divine("✨ DIVINE EVENT RECEIVED", {
      eventType: event.eventType.toUpperCase(),
      timestamp: event.timestamp,
      userId: event.userId,
      sessionId: event.sessionId,
      path: event.path,
      userAgent: event.userAgent,
      metadata: event.metadata,
    });

    return NextResponse.json({
      success: true,
      eventId: `${event.sessionId}-${Date.now()}`,
      message: "Event tracked successfully",
    });
  } catch (error) {
    console.error("User journey tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // Get metrics from shared session store
    const sessionMetrics = SessionStore.getSessionMetrics();

    return NextResponse.json(sessionMetrics);
  } catch (error) {
    console.error("User journey GET error:", error);
    return NextResponse.json(
      { error: "Failed to get journey data" },
      { status: 500 },
    );
  }
}
