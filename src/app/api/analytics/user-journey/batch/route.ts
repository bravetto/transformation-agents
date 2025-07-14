import { NextRequest, NextResponse } from "next/server";
import type {
  AnalyticsEvent,
  UserJourneyMetrics,
} from "@/lib/analytics/user-journey";

interface BatchAnalyticsData {
  sessionId: string;
  events: AnalyticsEvent[];
  metrics: UserJourneyMetrics;
}

export async function POST(request: NextRequest) {
  try {
    const batchData: BatchAnalyticsData = await request.json();

    // Validate the batch data structure
    if (!batchData.sessionId || !Array.isArray(batchData.events)) {
      return NextResponse.json(
        { error: "Invalid batch data structure" },
        { status: 400 },
      );
    }

    // Process each event in the batch
    const processedEvents = batchData.events
      .map((event) => {
        // Validate each event
        if (!event.eventType || !event.timestamp || !event.sessionId) {
          console.warn("Invalid event in batch:", event);
          return null;
        }
        return event;
      })
      .filter(Boolean) as AnalyticsEvent[];

    // Log batch processing in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Batch Received:", {
        sessionId: batchData.sessionId,
        eventCount: processedEvents.length,
        metrics: {
          modalSelectionRate: batchData.metrics.modalSelectionRate,
          pathCompletionRates: batchData.metrics.pathCompletionRates,
          averageSessionDuration: batchData.metrics.averageSessionDuration,
        },
        timeRange:
          processedEvents.length > 0
            ? {
                start: new Date(
                  Math.min(...processedEvents.map((e) => e.timestamp)),
                ).toISOString(),
                end: new Date(
                  Math.max(...processedEvents.map((e) => e.timestamp)),
                ).toISOString(),
              }
            : null,
      });

      // Log individual events for debugging
      processedEvents.forEach((event) => {
        console.log(`  📈 ${event.eventType}:`, {
          userType: "userType" in event ? event.userType : "unknown",
          timestamp: new Date(event.timestamp).toISOString(),
          metadata: event.metadata,
        });
      });
    }

    // In production, you would:
    // 1. Store batch in database with transaction
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Queue for real-time processing
    // 4. Update aggregated metrics
    // 5. Trigger alerts for significant events

    // Example production processing:
    /*
    await db.transaction(async (tx) => {
      // Store events
      await tx.analyticsEvents.createMany({
        data: processedEvents.map(event => ({
          ...event,
          createdAt: new Date(event.timestamp),
        }))
      });

      // Update session metrics
      await tx.sessionMetrics.upsert({
        where: { sessionId: batchData.sessionId },
        create: {
          sessionId: batchData.sessionId,
          ...batchData.metrics,
          updatedAt: new Date(),
        },
        update: {
          ...batchData.metrics,
          updatedAt: new Date(),
        },
      });
    });
    */

    // Send to external analytics services
    if (process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID) {
      // Send to Google Analytics 4
      processedEvents.forEach((event) => {
        // This would use the Measurement Protocol for GA4
        // fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}&api_secret=${process.env.GA4_API_SECRET}`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     client_id: batchData.sessionId,
        //     events: [{
        //       name: event.eventType,
        //       params: {
        //         user_type: "userType" in event ? event.userType : "unknown",
        //         ...event.metadata,
        //       }
        //     }]
        //   })
        // });
      });
    }

    return NextResponse.json({
      success: true,
      processed: processedEvents.length,
      sessionId: batchData.sessionId,
    });
  } catch (error) {
    console.error("Error processing analytics batch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
