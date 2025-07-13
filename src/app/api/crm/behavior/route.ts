import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getContactById, updateContact } from "@/lib/crm/contact-service";

// Validation schema for behavior tracking request
const behaviorTrackingSchema = z.object({
  contactId: z.string().min(1, "Contact ID is required"),
  eventType: z.enum([
    "page_view",
    "story_read",
    "letter_submitted",
    "volunteer_signup",
    "testimony_willingness",
    "video_watched",
    "resource_downloaded",
    "custom",
  ]),
  eventData: z
    .object({
      // For page_view events
      pageUrl: z.string().optional(),
      pageTitle: z.string().optional(),
      timeSpent: z.number().optional(),

      // For story_read events
      storyId: z.string().optional(),
      storyTitle: z.string().optional(),

      // For custom events
      customType: z.string().optional(),
      customValue: z.any().optional(),
    })
    .optional(),
  timestamp: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});

type BehaviorTrackingRequest = z.infer<typeof behaviorTrackingSchema>;

/**
 * Calculate lead score from behavior data
 */
function calculateLeadScore(
  contact: any,
  event: BehaviorTrackingRequest,
): number {
  let currentScore = contact.leadScore || 0;

  // Adjust score based on event type
  switch (event.eventType) {
    case "page_view":
      currentScore += 1;
      break;
    case "story_read":
      currentScore += 5;
      break;
    case "letter_submitted":
      currentScore += 50;
      break;
    case "volunteer_signup":
      currentScore += 75;
      break;
    case "testimony_willingness":
      currentScore += 100;
      break;
    case "video_watched":
      currentScore += 10;
      break;
    case "resource_downloaded":
      currentScore += 15;
      break;
    case "custom":
      // Custom scoring could be implemented here
      currentScore += 2;
      break;
  }

  return currentScore;
}

/**
 * Update contact data based on behavioral event
 */
async function processBehaviorEvent(
  event: BehaviorTrackingRequest,
): Promise<any> {
  try {
    // Get current contact data
    const contact = await getContactById(event.contactId);

    // Create update object based on event type
    const update: any = {
      id: contact.id,
      lastEngagement: event.timestamp,
      leadScore: calculateLeadScore(contact, event),
    };

    // Update page visit data
    if (event.eventType === "page_view" && event.eventData?.pageUrl) {
      const pagesVisited = [...(contact.pagesVisited || [])];
      if (!pagesVisited.includes(event.eventData.pageUrl)) {
        pagesVisited.push(event.eventData.pageUrl);
      }

      update.pagesVisited = pagesVisited;
      update.timeOnSite =
        (contact.timeOnSite || 0) + (event.eventData.timeSpent || 0);
    }

    // Update story read data
    if (event.eventType === "story_read" && event.eventData?.storyId) {
      const storiesRead = [...contact.storiesRead];
      if (!storiesRead.includes(event.eventData.storyId)) {
        storiesRead.push(event.eventData.storyId);
      }

      update.storiesRead = storiesRead;
    }

    // Update conversion data
    if (event.eventType === "letter_submitted") {
      update.letterSubmitted = true;
    }

    if (event.eventType === "volunteer_signup") {
      update.volunteerSignup = true;
    }

    if (event.eventType === "testimony_willingness") {
      update.willingToTestify = true;
    }

    // Update contact with new data
    const { id, ...updates } = update;
    await updateContact(id, updates);

    return {
      contactId: contact.id,
      eventProcessed: true,
      newLeadScore: update.leadScore,
    };
  } catch (error) {
    console.error(
      `Error processing behavior event for contact ${event.contactId}:`,
      error,
    );
    throw error;
  }
}

/**
 * POST handler for behavior tracking
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validationResult = behaviorTrackingSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const event = validationResult.data;
    const result = await processBehaviorEvent(event);

    return NextResponse.json({
      success: true,
      message: "Behavior event processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error processing behavior event:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error processing behavior event",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * GET handler for behavior summary
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get("contactId");

    if (!contactId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameter: contactId",
        },
        { status: 400 },
      );
    }

    // Get contact data
    const contact = await getContactById(contactId);

    // Construct behavior summary
    const behaviorSummary = {
      contactId: contact.id,
      name: `${contact.firstName} ${contact.lastName}`,
      email: contact.email,
      pagesVisited: contact.pagesVisited,
      timeOnSite: contact.timeOnSite,
      storiesRead: contact.storiesRead,
      conversions: {
        letterSubmitted: contact.letterSubmitted,
        volunteerSignup: contact.volunteerSignup,
        willingToTestify: contact.willingToTestify,
      },
      leadScore: contact.leadScore,
      lastEngagement: contact.lastEngagement,
      engagementLevel: contact.engagementLevel,
    };

    return NextResponse.json({
      success: true,
      data: behaviorSummary,
    });
  } catch (error) {
    console.error("Error retrieving behavior summary:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error retrieving behavior summary",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
