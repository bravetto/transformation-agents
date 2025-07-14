import { NextRequest, NextResponse } from "next/server";

// In-memory analytics storage (replace with database in production)
interface AnalyticsEvent {
  eventType: string;
  userType: string;
  sessionId: string;
  timestamp: string;
  metadata?: any;
}

// Global storage for analytics events
const analyticsEvents: AnalyticsEvent[] = [];

// Dashboard metrics calculation
function calculateDashboardMetrics() {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Filter events from last 24 hours
  const recentEvents = analyticsEvents.filter(
    (event) => new Date(event.timestamp) >= last24Hours,
  );

  // Calculate unique sessions
  const uniqueSessions = new Set(recentEvents.map((e) => e.sessionId)).size;

  // Calculate modal view rate
  const modalViews = recentEvents.filter(
    (e) => e.eventType === "modal_viewed",
  ).length;
  const modalViewRate = uniqueSessions > 0 ? modalViews / uniqueSessions : 0;

  // Calculate path selection rate
  const pathSelections = recentEvents.filter(
    (e) => e.eventType === "path_selected",
  ).length;
  const pathSelectionRate = modalViews > 0 ? pathSelections / modalViews : 0;

  // Calculate average session duration
  const sessionDurations = new Map<string, number>();
  recentEvents.forEach((event) => {
    if (event.metadata?.sessionDuration) {
      sessionDurations.set(event.sessionId, event.metadata.sessionDuration);
    }
  });

  const avgSessionDuration =
    sessionDurations.size > 0
      ? Array.from(sessionDurations.values()).reduce((a, b) => a + b, 0) /
        sessionDurations.size
      : 0;

  // Calculate path distribution
  const pathCounts = { coach: 0, judge: 0, activist: 0 };
  const pathEvents = recentEvents.filter(
    (e) => e.eventType === "path_selected",
  );

  pathEvents.forEach((event) => {
    if (event.userType in pathCounts) {
      pathCounts[event.userType as keyof typeof pathCounts]++;
    }
  });

  const totalPaths = Object.values(pathCounts).reduce((a, b) => a + b, 0);
  const pathDistribution = {
    coach: totalPaths > 0 ? pathCounts.coach / totalPaths : 0,
    judge: totalPaths > 0 ? pathCounts.judge / totalPaths : 0,
    activist: totalPaths > 0 ? pathCounts.activist / totalPaths : 0,
  };

  // Calculate conversion funnel
  const conversionFunnel = {
    modalViewed: 100,
    cardHovered:
      modalViews > 0
        ? (recentEvents.filter((e) => e.eventType === "card_hovered").length /
            modalViews) *
          100
        : 0,
    pathSelected: modalViews > 0 ? (pathSelections / modalViews) * 100 : 0,
    journeyCompleted:
      pathSelections > 0
        ? (recentEvents.filter((e) => e.eventType === "journey_completed")
            .length /
            pathSelections) *
          100
        : 0,
  };

  // Calculate device breakdown
  const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
  recentEvents.forEach((event) => {
    const deviceType = event.metadata?.deviceType || "desktop";
    if (deviceType in deviceCounts) {
      deviceCounts[deviceType as keyof typeof deviceCounts]++;
    }
  });

  const totalDevices = Object.values(deviceCounts).reduce((a, b) => a + b, 0);
  const deviceBreakdown = {
    desktop: totalDevices > 0 ? deviceCounts.desktop / totalDevices : 0,
    mobile: totalDevices > 0 ? deviceCounts.mobile / totalDevices : 0,
    tablet: totalDevices > 0 ? deviceCounts.tablet / totalDevices : 0,
  };

  // Calculate engagement metrics
  const hoverEvents = recentEvents.filter(
    (e) => e.eventType === "card_hovered",
  );
  const avgHoverTime =
    hoverEvents.length > 0
      ? hoverEvents.reduce((sum, e) => sum + (e.metadata?.hoverTime || 0), 0) /
        hoverEvents.length
      : 0;

  const selectionEvents = recentEvents.filter(
    (e) => e.eventType === "path_selected",
  );
  const avgSelectionSpeed =
    selectionEvents.length > 0
      ? selectionEvents.reduce(
          (sum, e) => sum + (e.metadata?.selectionTime || 0),
          0,
        ) / selectionEvents.length
      : 0;

  // Get recent events for real-time display
  const realtimeEvents = recentEvents
    .slice(-20)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .map((event) => ({
      timestamp: event.timestamp,
      eventType: event.eventType,
      userType: event.userType,
      metadata: event.metadata,
    }));

  return {
    totalSessions: uniqueSessions,
    modalViewRate,
    pathSelectionRate,
    averageSessionDuration: avgSessionDuration,
    pathDistribution,
    conversionFunnel,
    deviceBreakdown,
    engagementMetrics: {
      averageHoverTime: avgHoverTime,
      selectionSpeed: avgSelectionSpeed,
      returnVisitors: 0.25, // Mock value - would need session tracking
    },
    realtimeEvents,
  };
}

export async function GET(request: NextRequest) {
  try {
    // Load events from existing analytics endpoint storage if available
    // This is a simplified approach - in production, use a proper database

    const metrics = calculateDashboardMetrics();

    return NextResponse.json(metrics, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch dashboard metrics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Helper function to add events (called from main analytics endpoint)
export function addAnalyticsEvent(event: AnalyticsEvent) {
  analyticsEvents.push(event);

  // Keep only last 10,000 events to prevent memory issues
  if (analyticsEvents.length > 10000) {
    analyticsEvents.splice(0, analyticsEvents.length - 10000);
  }
}
