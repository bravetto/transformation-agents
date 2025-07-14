import { NextRequest, NextResponse } from "next/server";
import type { AnalyticsEvent } from "@/lib/analytics/user-journey";

// Store analytics events in memory for development
// In production, this would be stored in a database
const analyticsStore: AnalyticsEvent[] = [];
const sessionStore: Map<string, AnalyticsEvent[]> = new Map();

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();

    // Validate the event structure
    if (!event.eventType || !event.timestamp || !event.sessionId) {
      return NextResponse.json(
        { error: "Invalid event structure" },
        { status: 400 },
      );
    }

    // Store the event
    analyticsStore.push(event);

    // Store by session
    const sessionEvents = sessionStore.get(event.sessionId) || [];
    sessionEvents.push(event);
    sessionStore.set(event.sessionId, sessionEvents);

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Event Received:", {
        eventType: event.eventType,
        userType: "userType" in event ? event.userType : "unknown",
        sessionId: event.sessionId,
        timestamp: new Date(event.timestamp).toISOString(),
      });
    }

    // In production, you would:
    // 1. Store in database (PostgreSQL, MongoDB, etc.)
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Queue for batch processing
    // 4. Apply data validation and sanitization

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing analytics event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const eventType = searchParams.get("eventType");
    const userType = searchParams.get("userType");
    const limit = parseInt(searchParams.get("limit") || "100");

    let filteredEvents = [...analyticsStore];

    // Apply filters
    if (sessionId) {
      filteredEvents = sessionStore.get(sessionId) || [];
    }

    if (eventType) {
      filteredEvents = filteredEvents.filter((e) => e.eventType === eventType);
    }

    if (userType) {
      filteredEvents = filteredEvents.filter(
        (e) => "userType" in e && e.userType === userType,
      );
    }

    // Apply limit
    filteredEvents = filteredEvents.slice(-limit);

    // Calculate basic metrics
    const metrics = {
      totalEvents: filteredEvents.length,
      eventTypes: [...new Set(filteredEvents.map((e) => e.eventType))],
      userTypes: [
        ...new Set(
          filteredEvents
            .filter((e) => "userType" in e)
            .map((e) => ("userType" in e ? e.userType : "unknown")),
        ),
      ],
      sessions: [...new Set(filteredEvents.map((e) => e.sessionId))].length,
      timeRange:
        filteredEvents.length > 0
          ? {
              start: Math.min(...filteredEvents.map((e) => e.timestamp)),
              end: Math.max(...filteredEvents.map((e) => e.timestamp)),
            }
          : null,
    };

    return NextResponse.json({
      events: filteredEvents,
      metrics,
      total: analyticsStore.length,
    });
  } catch (error) {
    console.error("Error retrieving analytics data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
