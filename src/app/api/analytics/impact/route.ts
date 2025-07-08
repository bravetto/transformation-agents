import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Constants
const CLICKUP_API_URL = "https://api.clickup.com/api/v2";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Cache for analytics data
let analyticsCache: {
  data: any;
  timestamp: number;
} | null = null;

// Validation schema for analytics request
const analyticsRequestSchema = z.object({
  timeframe: z
    .enum(["day", "week", "month", "quarter", "year", "all"])
    .default("month"),
  filters: z
    .object({
      region: z.string().optional(),
      demographic: z.string().optional(),
      source: z.string().optional(),
      campaign: z.string().optional(),
    })
    .optional(),
  metrics: z
    .array(
      z.enum([
        "letters_submitted",
        "volunteer_signups",
        "mentor_connections",
        "program_completions",
        "community_events",
        "website_visits",
        "social_shares",
        "donation_amount",
      ]),
    )
    .optional(),
  aggregation: z.enum(["sum", "average", "min", "max", "count"]).default("sum"),
  compareWithPrevious: z.boolean().default(true),
});

// Type definitions
type AnalyticsRequest = z.infer<typeof analyticsRequestSchema>;

/**
 * Helper function to make authenticated requests to ClickUp API
 */
async function clickupRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${CLICKUP_API_URL}${endpoint}`;

  const headers = {
    Authorization: `${process.env.CLICKUP_API_KEY}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ClickUp API error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ClickUp request to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Convert timeframe to date range
 */
function getDateRangeFromTimeframe(timeframe: string): {
  startDate: Date;
  endDate: Date;
} {
  const endDate = new Date();
  let startDate = new Date();

  switch (timeframe) {
    case "day":
      startDate.setDate(endDate.getDate() - 1);
      break;
    case "week":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "month":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "quarter":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "year":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "all":
      startDate = new Date(2020, 0, 1); // Assuming The Bridge Project started in 2020
      break;
    default:
      startDate.setMonth(endDate.getMonth() - 1); // Default to one month
  }

  return { startDate, endDate };
}

/**
 * Get letter submissions analytics from ClickUp
 */
async function getLetterSubmissionsAnalytics(
  request: AnalyticsRequest,
): Promise<any> {
  const { startDate, endDate } = getDateRangeFromTimeframe(request.timeframe);

  // Convert dates to unix timestamps (milliseconds)
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  // Get tasks (letter submissions) from ClickUp
  const queryParams = new URLSearchParams({
    date_created_start: startTimestamp.toString(),
    date_created_end: endTimestamp.toString(),
    include_closed: "true",
    subtasks: "true",
    order_by: "created",
    statuses: ["High Quality", "Review Required"].join(","),
  });

  // Add filters if provided
  if (request.filters?.region) {
    queryParams.append(
      "custom_fields",
      JSON.stringify({
        [process.env.CLICKUP_REGION_FIELD_ID || "region_field"]:
          request.filters.region,
      }),
    );
  }

  const response = await clickupRequest(
    `/list/${process.env.CLICKUP_LIST_ID}/task?${queryParams}`,
  );

  // Extract and analyze letter submissions
  const submissions = response.tasks.filter((task: any) =>
    task.name.startsWith("Support Letter:"),
  );

  // Calculate previous period
  let previousStartDate, previousEndDate;
  const periodDuration = endDate.getTime() - startDate.getTime();

  previousEndDate = new Date(startDate.getTime());
  previousStartDate = new Date(previousEndDate.getTime() - periodDuration);

  // Get previous period data if requested
  let previousSubmissions = [];
  if (request.compareWithPrevious) {
    const previousQueryParams = new URLSearchParams({
      date_created_start: previousStartDate.getTime().toString(),
      date_created_end: previousEndDate.getTime().toString(),
      include_closed: "true",
      subtasks: "true",
      order_by: "created",
    });

    const previousResponse = await clickupRequest(
      `/list/${process.env.CLICKUP_LIST_ID}/task?${previousQueryParams}`,
    );
    previousSubmissions = previousResponse.tasks.filter((task: any) =>
      task.name.startsWith("Support Letter:"),
    );
  }

  // Analyze the quality scores
  const impactScores = submissions.map((submission: any) => {
    const impactScoreField = submission.custom_fields.find(
      (field: any) =>
        field.id === process.env.CLICKUP_IMPACT_SCORE_FIELD_ID ||
        field.name === "Impact Score",
    );
    return impactScoreField?.value || 0;
  });

  // Calculate average impact score
  const avgImpactScore =
    impactScores.length > 0
      ? impactScores.reduce((sum: number, score: number) => sum + score, 0) /
        impactScores.length
      : 0;

  // Calculate metrics by day for trend analysis
  const submissionsByDay: Record<string, number> = {};
  const msPerDay = 24 * 60 * 60 * 1000;

  // Initialize all days in the range
  for (
    let timestamp = startDate.getTime();
    timestamp <= endDate.getTime();
    timestamp += msPerDay
  ) {
    const dateStr = new Date(timestamp).toISOString().split("T")[0];
    submissionsByDay[dateStr] = 0;
  }

  // Count submissions by day
  submissions.forEach((submission: any) => {
    const dateCreated = new Date(submission.date_created);
    const dateStr = dateCreated.toISOString().split("T")[0];
    submissionsByDay[dateStr] = (submissionsByDay[dateStr] || 0) + 1;
  });

  // Calculate percentage change from previous period
  const currentCount = submissions.length;
  const previousCount = previousSubmissions.length;
  const percentageChange =
    previousCount > 0
      ? ((currentCount - previousCount) / previousCount) * 100
      : 0;

  return {
    total: submissions.length,
    previousPeriodTotal: previousSubmissions.length,
    percentageChange,
    averageImpactScore: avgImpactScore,
    highQualityCount: submissions.filter(
      (s: any) => s.status.status === "High Quality",
    ).length,
    byDay: submissionsByDay,
    willTestifyCount: submissions.filter((s: any) =>
      s.tags.some((tag: any) => tag.name === "willing-to-testify"),
    ).length,
    volunteerInterestCount: submissions.filter((s: any) =>
      s.tags.some((tag: any) => tag.name === "volunteer-interest"),
    ).length,
  };
}

/**
 * Get volunteer signup analytics
 */
async function getVolunteerSignupAnalytics(
  request: AnalyticsRequest,
): Promise<any> {
  const { startDate, endDate } = getDateRangeFromTimeframe(request.timeframe);

  // In a real implementation, this would fetch volunteer signup data from the database
  // For now, we'll return mock data

  return {
    total: 125,
    previousPeriodTotal: 95,
    percentageChange: 31.58,
    byRegion: {
      Northeast: 42,
      South: 38,
      Midwest: 21,
      West: 24,
    },
    byRole: {
      Mentor: 45,
      "Event Volunteer": 32,
      Administrative: 18,
      "Technical Support": 15,
      "Community Outreach": 15,
    },
    retentionRate: 87.5,
  };
}

/**
 * Get website analytics
 */
async function getWebsiteAnalytics(request: AnalyticsRequest): Promise<any> {
  // In a real implementation, this would fetch data from Google Analytics or similar
  // For now, we'll return mock data

  return {
    totalVisits: 8750,
    previousPeriodVisits: 7200,
    percentageChange: 21.53,
    uniqueVisitors: 5430,
    averageSessionDuration: 180, // seconds
    bounceRate: 32.5,
    topPages: [
      { path: "/", visits: 2450 },
      { path: "/stories", visits: 1850 },
      { path: "/get-involved", visits: 1320 },
      { path: "/about", visits: 980 },
      { path: "/contact", visits: 720 },
    ],
    trafficSources: {
      "Organic Search": 42,
      Direct: 25,
      "Social Media": 18,
      Referral: 10,
      Email: 5,
    },
  };
}

/**
 * Get all analytics data
 */
async function getAllAnalytics(request: AnalyticsRequest): Promise<any> {
  // Check cache first
  if (
    analyticsCache &&
    Date.now() - analyticsCache.timestamp < CACHE_DURATION
  ) {
    return analyticsCache.data;
  }

  // Get data from each source
  const letterAnalytics = await getLetterSubmissionsAnalytics(request);
  const volunteerAnalytics = await getVolunteerSignupAnalytics(request);
  const websiteAnalytics = await getWebsiteAnalytics(request);

  // Combine data
  const allAnalytics = {
    letterSubmissions: letterAnalytics,
    volunteerSignups: volunteerAnalytics,
    websiteAnalytics: websiteAnalytics,
    overallImpact: {
      livesImpacted: letterAnalytics.total * 4 + volunteerAnalytics.total * 10, // Estimation
      communitiesReached: 35,
      totalHoursContributed: volunteerAnalytics.total * 15, // Estimated hours per volunteer
      programCompletionRate: 78.5,
      recidivismReduction: 62.3, // Percentage
    },
    asOf: new Date().toISOString(),
  };

  // Update cache
  analyticsCache = {
    data: allAnalytics,
    timestamp: Date.now(),
  };

  return allAnalytics;
}

/**
 * Handle GET request to retrieve analytics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);

    // Extract and validate request parameters
    const analyticsRequest: AnalyticsRequest = {
      timeframe: (searchParams.get("timeframe") as any) || "month",
      filters: {
        region: searchParams.get("region") || undefined,
        demographic: searchParams.get("demographic") || undefined,
        source: searchParams.get("source") || undefined,
        campaign: searchParams.get("campaign") || undefined,
      },
      metrics: (searchParams.get("metrics")?.split(",") as any[]) || undefined,
      aggregation: (searchParams.get("aggregation") as any) || "sum",
      compareWithPrevious: searchParams.get("compareWithPrevious") !== "false",
    };

    // Validate request
    const validationResult = analyticsRequestSchema.safeParse(analyticsRequest);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid analytics request",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const validatedRequest = validationResult.data;

    // Get analytics data
    const analyticsData = await getAllAnalytics(validatedRequest);

    // If specific metrics were requested, filter the response
    if (validatedRequest.metrics && validatedRequest.metrics.length > 0) {
      const filteredData: any = {};

      for (const metric of validatedRequest.metrics) {
        switch (metric) {
          case "letters_submitted":
            filteredData.letterSubmissions = analyticsData.letterSubmissions;
            break;
          case "volunteer_signups":
            filteredData.volunteerSignups = analyticsData.volunteerSignups;
            break;
          case "website_visits":
            filteredData.websiteAnalytics = analyticsData.websiteAnalytics;
            break;
          // Add other metrics as needed
        }
      }

      return NextResponse.json({
        success: true,
        data: filteredData,
        timeframe: validatedRequest.timeframe,
        filters: validatedRequest.filters,
        asOf: analyticsData.asOf,
      });
    }

    // Return all analytics data
    return NextResponse.json({
      success: true,
      data: analyticsData,
      timeframe: validatedRequest.timeframe,
      filters: validatedRequest.filters,
    });
  } catch (error) {
    console.error("Error retrieving analytics:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error retrieving analytics",
      },
      { status: 500 },
    );
  }
}

/**
 * Handle POST request to invalidate analytics cache
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Reset cache
  analyticsCache = null;

  return NextResponse.json({
    success: true,
    message: "Analytics cache invalidated",
  });
}
