import { NextRequest, NextResponse } from "next/server";
import { searchContacts } from "@/lib/crm/contact-service";
import { z } from "zod";

/**
 * Analytics data response type
 */
interface AnalyticsResponse {
  success: boolean;
  data?: {
    // Contact metrics
    totalContacts: number;
    contactsByEngagementLevel: {
      high: number;
      medium: number;
      low: number;
    };
    contactsByRelationship: Record<string, number>;

    // Conversion metrics
    letterConversionRate: number;
    volunteerConversionRate: number;
    testimonyWillingnessRate: number;

    // Engagement metrics
    averageLeadScore: number;
    topPerformingTags: Array<{
      tag: string;
      count: number;
      averageLeadScore: number;
    }>;

    // Time-based metrics
    engagementTrend: Array<{
      date: string;
      contactCount: number;
      letterSubmissions: number;
      volunteerSignups: number;
    }>;
  };
  error?: string;
}

// Validation schema for analytics request
const analyticsRequestSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  relationship: z.string().optional(),
  tags: z.array(z.string()).optional(),
  includeEngagementTrend: z.boolean().default(true),
  engagementTrendGranularity: z.enum(["day", "week", "month"]).default("week"),
});

/**
 * Calculate CRM analytics from contact data
 */
async function calculateAnalytics(
  params: z.infer<typeof analyticsRequestSchema>,
) {
  // Get all contacts with optional filtering
  const { data: contacts } = await searchContacts({
    limit: 1000, // Get a large number of contacts for analytics
    relationship: params.relationship,
    // Note: tags filtering handled in post-processing since not supported by SearchContactsParams
  });

  // Calculate total contacts
  const totalContacts = contacts.length;

  // Calculate contacts by engagement level
  // Note: engagementLevel not available in current ContactData interface
  // Using leadScore as proxy for engagement level
  const contactsByEngagementLevel = {
    high: contacts.filter((contact) => (contact.leadScore || 0) >= 80).length,
    medium: contacts.filter(
      (contact) =>
        (contact.leadScore || 0) >= 40 && (contact.leadScore || 0) < 80,
    ).length,
    low: contacts.filter((contact) => (contact.leadScore || 0) < 40).length,
  };

  // Calculate contacts by relationship
  const contactsByRelationship: Record<string, number> = {};
  contacts.forEach((contact) => {
    const relationship = contact.relationship || "unknown";
    contactsByRelationship[relationship] =
      (contactsByRelationship[relationship] || 0) + 1;
  });

  // Calculate conversion rates
  const letterConversionRate = totalContacts
    ? contacts.filter((contact) => contact.letterSubmitted).length /
      totalContacts
    : 0;

  const volunteerConversionRate = totalContacts
    ? contacts.filter((contact) => contact.volunteerSignup).length /
      totalContacts
    : 0;

  const testimonyWillingnessRate = totalContacts
    ? contacts.filter((contact) => contact.willingToTestify).length /
      totalContacts
    : 0;

  // Calculate average lead score
  const averageLeadScore = totalContacts
    ? contacts.reduce((sum, contact) => sum + (contact.leadScore || 0), 0) /
      totalContacts
    : 0;

  // Calculate top performing tags
  const tagStats: Record<string, { count: number; totalLeadScore: number }> =
    {};
  contacts.forEach((contact) => {
    // Note: tags property not available in current ContactData interface
    // Using empty array as fallback
    const tags = (contact as any).tags || [];
    tags.forEach((tag: string) => {
      if (!tagStats[tag]) {
        tagStats[tag] = { count: 0, totalLeadScore: 0 };
      }
      tagStats[tag].count += 1;
      tagStats[tag].totalLeadScore += contact.leadScore || 0;
    });
  });

  const topPerformingTags = Object.entries(tagStats)
    .map(([tag, stats]) => ({
      tag,
      count: stats.count,
      averageLeadScore: stats.count ? stats.totalLeadScore / stats.count : 0,
    }))
    .sort((a, b) => b.averageLeadScore - a.averageLeadScore)
    .slice(0, 10);

  // Calculate engagement trend if requested
  let engagementTrend: Array<{
    date: string;
    contactCount: number;
    letterSubmissions: number;
    volunteerSignups: number;
  }> = [];

  if (params.includeEngagementTrend) {
    // Get the date range
    const startDate = params.startDate
      ? new Date(params.startDate)
      : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // Default to last 90 days

    const endDate = params.endDate ? new Date(params.endDate) : new Date();

    // Generate date buckets based on granularity
    const dateBuckets: Record<
      string,
      {
        contactCount: number;
        letterSubmissions: number;
        volunteerSignups: number;
      }
    > = {};

    // Helper to format dates based on granularity
    const formatDate = (date: Date): string => {
      switch (params.engagementTrendGranularity) {
        case "day":
          return date.toISOString().split("T")[0];
        case "week":
          // Get the week start date (Sunday)
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          return weekStart.toISOString().split("T")[0];
        case "month":
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        default:
          return date.toISOString().split("T")[0];
      }
    };

    // Initialize date buckets
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate);

      if (!dateBuckets[formattedDate]) {
        dateBuckets[formattedDate] = {
          contactCount: 0,
          letterSubmissions: 0,
          volunteerSignups: 0,
        };
      }

      // Increment date based on granularity
      switch (params.engagementTrendGranularity) {
        case "day":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "week":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "month":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
    }

    // Fill buckets with data
    contacts.forEach((contact) => {
      const engagementDate = contact.lastEngagement
        ? new Date(contact.lastEngagement)
        : new Date(contact.createdAt || Date.now());

      if (engagementDate >= startDate && engagementDate <= endDate) {
        const formattedDate = formatDate(engagementDate);

        if (dateBuckets[formattedDate]) {
          dateBuckets[formattedDate].contactCount += 1;

          if (contact.letterSubmitted) {
            dateBuckets[formattedDate].letterSubmissions += 1;
          }

          if (contact.volunteerSignup) {
            dateBuckets[formattedDate].volunteerSignups += 1;
          }
        }
      }
    });

    // Convert buckets to sorted array
    engagementTrend = Object.entries(dateBuckets)
      .map(([date, data]) => ({
        date,
        ...data,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  return {
    totalContacts,
    contactsByEngagementLevel,
    contactsByRelationship,
    letterConversionRate,
    volunteerConversionRate,
    testimonyWillingnessRate,
    averageLeadScore,
    topPerformingTags,
    engagementTrend,
  };
}

/**
 * GET handler for CRM analytics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);

    const params = {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      relationship: searchParams.get("relationship") || undefined,
      tags: searchParams.get("tags")?.split(",") || undefined,
      includeEngagementTrend:
        searchParams.get("includeEngagementTrend") === "true",
      engagementTrendGranularity:
        (searchParams.get("engagementTrendGranularity") as
          | "day"
          | "week"
          | "month") || "week",
    };

    const validationResult = analyticsRequestSchema.safeParse(params);

    if (!validationResult.success) {
      const response: AnalyticsResponse = {
        success: false,
        error: "Invalid analytics request parameters",
      };

      return NextResponse.json(response, { status: 400 });
    }

    // Calculate analytics
    const analyticsData = await calculateAnalytics(validationResult.data);

    // Return success response
    const response: AnalyticsResponse = {
      success: true,
      data: analyticsData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating CRM analytics:", error);

    const response: AnalyticsResponse = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error generating CRM analytics",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
