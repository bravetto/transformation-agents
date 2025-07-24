import { NextRequest, NextResponse } from "next/server";
import type { LetterAnalyticsEvent } from "@/types/character-witness";

export async function POST(request: NextRequest) {
  try {
    const analyticsEvent: LetterAnalyticsEvent = await request.json();

    // Validate the analytics event
    if (
      !analyticsEvent.eventType ||
      !analyticsEvent.letterId ||
      !analyticsEvent.authorName
    ) {
      return NextResponse.json(
        { error: "Missing required analytics fields" },
        { status: 400 },
      );
    }

    // Log the event for debugging
    console.log("📝 Character Letter Analytics Event:", {
      type: analyticsEvent.eventType,
      letterId: analyticsEvent.letterId,
      author: analyticsEvent.authorName,
      timestamp: analyticsEvent.timestamp,
    });

    // Integration with divine analytics system
    const divineEventData = {
      eventType: "character_letter_interaction",
      userType: "advocate", // Assuming users viewing letters are advocates
      conversionType: getDivineConversionType(analyticsEvent.eventType),
      metadata: {
        letterAnalyticsEvent: analyticsEvent,
        source: "character_witness_letters",
        letterId: analyticsEvent.letterId,
        authorName: analyticsEvent.authorName,
        letterType: analyticsEvent.letterType,
        sourcePage: analyticsEvent.metadata.sourcePage,
        deviceType: analyticsEvent.metadata.deviceType,
        eventDetails: analyticsEvent.metadata,
      },
    };

    // Send to divine analytics (if available)
    try {
      // Note: This would integrate with existing divine analytics
      // For now, we'll log it as a divine event
      console.log(
        "✨ DIVINE EVENT: Character Letter Analytics",
        divineEventData,
      );

      // Could send to existing analytics endpoint:
      // await fetch('/api/analytics/user-journey', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(divineEventData)
      // });
    } catch (divineError) {
      console.warn("Failed to send to divine analytics:", divineError);
      // Continue processing even if divine analytics fails
    }

    // Store analytics data (in production, this would go to a database)
    await storeAnalyticsEvent(analyticsEvent);

    // Track specific high-value events
    await trackHighValueEvents(analyticsEvent);

    return NextResponse.json({
      success: true,
      eventType: analyticsEvent.eventType,
      letterId: analyticsEvent.letterId,
      timestamp: analyticsEvent.timestamp,
    });
  } catch (error) {
    console.error("Error processing character letter analytics:", error);

    return NextResponse.json(
      { error: "Failed to process analytics event" },
      { status: 500 },
    );
  }
}

// Helper function to map letter events to divine conversion types
function getDivineConversionType(eventType: string): string {
  switch (eventType) {
    case "letter_viewed":
      return "engagement";
    case "letter_shared":
      return "viral_amplification";
    case "quote_highlighted":
      return "content_interaction";
    case "letter_completed":
      return "deep_engagement";
    case "conversion_action":
      return "primary_conversion";
    default:
      return "interaction";
  }
}

// Store analytics event (placeholder for database integration)
async function storeAnalyticsEvent(event: LetterAnalyticsEvent): Promise<void> {
  try {
    // In production, this would save to a database
    // For now, we'll use console logging with structured data

    const analyticsRecord = {
      id: `letter_analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventType: event.eventType,
      letterId: event.letterId,
      authorName: event.authorName,
      letterType: event.letterType,
      timestamp: event.timestamp,
      metadata: event.metadata,
      processed: new Date().toISOString(),
    };

    console.log("💾 Storing Character Letter Analytics:", analyticsRecord);

    // Future: Database integration
    // await db.characterLetterAnalytics.create({
    //   data: analyticsRecord
    // });
  } catch (error) {
    console.error("Failed to store analytics event:", error);
    throw error;
  }
}

// Track high-value events for special processing
async function trackHighValueEvents(
  event: LetterAnalyticsEvent,
): Promise<void> {
  try {
    // Track events that indicate high engagement or conversion potential
    const highValueEvents = [
      "letter_shared",
      "conversion_action",
      "letter_completed",
    ];

    if (highValueEvents.includes(event.eventType)) {
      console.log("🔥 HIGH VALUE EVENT DETECTED:", {
        type: event.eventType,
        letterId: event.letterId,
        author: event.authorName,
        impact: getEventImpactScore(event.eventType),
      });

      // Could trigger special actions:
      // - Send notifications to admin
      // - Update letter priority/featured status
      // - Trigger email campaigns
      // - Update social sharing campaigns

      // Example: If Jordan Dungy letter gets shared, that's HUGE
      if (
        event.letterId === "jordan-dungy" &&
        event.eventType === "letter_shared"
      ) {
        console.log("🚨 JORDAN DUNGY LETTER SHARED - MAXIMUM IMPACT!");
        // Could trigger special notifications or campaigns
      }

      // Track conversion attribution
      if (event.eventType === "conversion_action") {
        await trackConversionAttribution(event);
      }
    }
  } catch (error) {
    console.error("Failed to process high value event:", error);
    // Don't throw - this is supplementary processing
  }
}

// Get impact score for different event types
function getEventImpactScore(eventType: string): number {
  switch (eventType) {
    case "letter_viewed":
      return 1;
    case "quote_highlighted":
      return 2;
    case "letter_completed":
      return 3;
    case "letter_shared":
      return 5;
    case "conversion_action":
      return 10;
    default:
      return 1;
  }
}

// Track which letters lead to conversions
async function trackConversionAttribution(
  event: LetterAnalyticsEvent,
): Promise<void> {
  try {
    const conversionData = {
      letterId: event.letterId,
      authorName: event.authorName,
      letterType: event.letterType,
      conversionType: event.metadata.conversionType,
      timestamp: event.timestamp,
      deviceType: event.metadata.deviceType,
      sourcePage: event.metadata.sourcePage,
    };

    console.log("🎯 CONVERSION ATTRIBUTION:", conversionData);

    // This data helps us understand:
    // - Which letters drive the most conversions
    // - Which authors have the most persuasive letters
    // - Which letter types work best
    // - Device/page performance for conversions

    // Future: Store in conversion attribution table
    // await db.conversionAttribution.create({
    //   data: conversionData
    // });
  } catch (error) {
    console.error("Failed to track conversion attribution:", error);
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "active",
    endpoint: "character-letters-analytics",
    timestamp: new Date().toISOString(),
    capabilities: [
      "event_tracking",
      "divine_analytics_integration",
      "high_value_event_detection",
      "conversion_attribution",
    ],
  });
}
