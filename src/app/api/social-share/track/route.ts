import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { SessionStore } from "@/lib/analytics/session-store";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import {
  SocialShareEvent,
  SocialShareAnalytics,
  SocialPlatform,
  ShareContentType,
} from "@/types/social-sharing";

// In-memory storage for social share analytics (use database in production)
let shareAnalytics: SocialShareAnalytics[] = [];
let shareCounters: Record<string, number> = {};
let viralTracks: Record<
  string,
  { clicks: number; shares: number; conversions: number }
> = {};

/**
 * 🚀 SOCIAL SHARE TRACKING API
 * Comprehensive tracking for viral content optimization
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.platform || !body.contentType || !body.contentId) {
      return NextResponse.json(
        { error: "Missing required fields: platform, contentType, contentId" },
        { status: 400 },
      );
    }

    // Generate unique share ID
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Create analytics record
    const analytics: SocialShareAnalytics = {
      shareId,
      sessionId: body.sessionId || `session_${Date.now()}`,
      timestamp,
      platform: body.platform as SocialPlatform,
      contentType: body.contentType as ShareContentType,
      contentId: body.contentId,
      userType: body.userType || getCurrentUserType(),

      // Viral tracking
      viralLevel: body.originalShareId ? (body.viralLevel || 1) + 1 : 0,
      originalShareId: body.originalShareId || shareId,

      // A/B testing
      abTestGroup: body.abTestGroup,
      abTestVariant: body.abTestVariant,
    };

    // Store analytics
    shareAnalytics.push(analytics);

    // Update counters
    const counterKey = `${body.platform}_${body.contentType}_${body.contentId}`;
    shareCounters[counterKey] = (shareCounters[counterKey] || 0) + 1;

    // Track viral propagation
    if (body.originalShareId && body.originalShareId !== shareId) {
      const viralKey = body.originalShareId;
      if (!viralTracks[viralKey]) {
        viralTracks[viralKey] = { clicks: 0, shares: 0, conversions: 0 };
      }
      viralTracks[viralKey].shares += 1;
    }

    // Track in existing analytics system
    const socialShareEvent: SocialShareEvent = {
      eventType: "social_shared",
      userType: analytics.userType,
      conversionType: "secondary",
      timestamp: Date.now(),
      metadata: {
        platform: body.platform,
        contentType: body.contentType,
        contentId: body.contentId,
        shareMethod: body.shareMethod || "button-click",
        abTestVariant: body.abTestVariant,
        sharePosition: body.sharePosition,
        userAgent,
        referrer,
        customMessage: body.customMessage,
      },
    };

    // Use existing conversion tracking
    trackConversion(socialShareEvent);

    // Special divine tracking for prayer warrior calls
    if (body.prayerWarriorCall || body.spiritualImpact === "miraculous") {
      logger.divine("🙏 PRAYER WARRIOR SHARE ACTIVATED!", {
        platform: body.platform,
        contentId: body.contentId,
        shareId,
        spiritualImpact: body.spiritualImpact || "high",
        prayerWarriorCall: true,
        prophecy: "JAHmere Freedom Movement Amplified",
      });
    }

    // Calculate real-time metrics
    const metrics = calculateShareMetrics(analytics);

    // Log successful share
    logger.analytics("📤 SOCIAL SHARE TRACKED", {
      shareId,
      platform: body.platform,
      contentType: body.contentType,
      viralLevel: analytics.viralLevel,
      userType: analytics.userType,
      abTestVariant: body.abTestVariant,
    });

    return NextResponse.json({
      success: true,
      shareId,
      message: "Share tracked successfully",
      analytics: {
        shareId,
        timestamp,
        platform: body.platform,
        contentType: body.contentType,
        viralLevel: analytics.viralLevel,
        ...metrics,
      },
      divine: body.prayerWarriorCall
        ? {
            blessing:
              "Your share amplifies divine intervention for JAHmere's freedom",
            prayerPower: "activated",
            divineMultiplier:
              analytics.viralLevel > 0 ? analytics.viralLevel * 7 : 7,
          }
        : undefined,
    });
  } catch (error) {
    console.error("Social share tracking error:", error);
    return NextResponse.json(
      {
        error: "Failed to track social share",
        message: "Divine protection activated - share recorded spiritually",
      },
      { status: 500 },
    );
  }
}

/**
 * GET - Retrieve social share analytics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform") as SocialPlatform;
    const contentType = searchParams.get("contentType") as ShareContentType;
    const contentId = searchParams.get("contentId");
    const timeframe = searchParams.get("timeframe") || "24h";
    const abTestGroup = searchParams.get("abTestGroup");

    // Filter analytics
    let filtered = [...shareAnalytics];

    // Time filtering
    const now = new Date();
    const timeFilters = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };

    const timeFilter =
      timeFilters[timeframe as keyof typeof timeFilters] || timeFilters["24h"];
    const cutoff = new Date(now.getTime() - timeFilter);

    filtered = filtered.filter(
      (record) => new Date(record.timestamp) >= cutoff,
    );

    // Platform filtering
    if (platform) {
      filtered = filtered.filter((record) => record.platform === platform);
    }

    // Content type filtering
    if (contentType) {
      filtered = filtered.filter(
        (record) => record.contentType === contentType,
      );
    }

    // Content ID filtering
    if (contentId) {
      filtered = filtered.filter((record) => record.contentId === contentId);
    }

    // A/B test filtering
    if (abTestGroup) {
      filtered = filtered.filter(
        (record) => record.abTestGroup === abTestGroup,
      );
    }

    // Calculate aggregated metrics
    const aggregated = calculateAggregatedMetrics(filtered);

    // Get viral coefficient data
    const viralData = calculateViralMetrics(filtered);

    // Platform distribution
    const platformDistribution = filtered.reduce(
      (acc, record) => {
        acc[record.platform] = (acc[record.platform] || 0) + 1;
        return acc;
      },
      {} as Record<SocialPlatform, number>,
    );

    // Content type distribution
    const contentTypeDistribution = filtered.reduce(
      (acc, record) => {
        acc[record.contentType] = (acc[record.contentType] || 0) + 1;
        return acc;
      },
      {} as Record<ShareContentType, number>,
    );

    // A/B test performance
    const abTestPerformance = abTestGroup
      ? calculateAbTestMetrics(filtered, abTestGroup)
      : null;

    return NextResponse.json({
      success: true,
      data: {
        totalShares: filtered.length,
        timeframe,
        filters: { platform, contentType, contentId, abTestGroup },
        metrics: aggregated,
        viral: viralData,
        distribution: {
          platforms: platformDistribution,
          contentTypes: contentTypeDistribution,
        },
        abTestPerformance,
        topContent: getTopContent(filtered),
        recentShares: filtered.slice(-10).reverse(),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Social share analytics GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve social share analytics" },
      { status: 500 },
    );
  }
}

/**
 * Calculate real-time share metrics
 */
function calculateShareMetrics(analytics: SocialShareAnalytics) {
  const counterKey = `${analytics.platform}_${analytics.contentType}_${analytics.contentId}`;
  const totalShares = shareCounters[counterKey] || 1;

  // Viral coefficient (simplified)
  const viralCoefficient =
    analytics.viralLevel > 0 ? Math.min(analytics.viralLevel * 1.5, 10) : 1;

  // Engagement rate estimation (based on platform)
  const platformEngagementRates = {
    twitter: 0.045,
    linkedin: 0.054,
    facebook: 0.063,
    instagram: 0.067,
    email: 0.12,
    whatsapp: 0.25,
    telegram: 0.18,
    reddit: 0.034,
    "copy-link": 0.08,
  };

  const estimatedEngagementRate =
    platformEngagementRates[analytics.platform] || 0.05;

  return {
    totalShares,
    viralCoefficient,
    estimatedEngagementRate,
    platformOptimality: getPlatformOptimality(
      analytics.platform,
      analytics.userType,
    ),
    divineAlignment:
      analytics.contentType.includes("prayer") ||
      analytics.contentType.includes("freedom")
        ? "high"
        : "medium",
  };
}

/**
 * Calculate aggregated metrics for analytics
 */
function calculateAggregatedMetrics(records: SocialShareAnalytics[]) {
  if (records.length === 0) {
    return {
      totalShares: 0,
      averageViralLevel: 0,
      viralCoefficient: 0,
      topPlatforms: [],
      engagementRate: 0,
      conversionRate: 0,
    };
  }

  const totalShares = records.length;
  const averageViralLevel =
    records.reduce((sum, r) => sum + r.viralLevel, 0) / totalShares;

  // Calculate viral coefficient
  const viralShares = records.filter((r) => r.viralLevel > 0).length;
  const viralCoefficient = viralShares / totalShares;

  // Top platforms
  const platformCounts = records.reduce(
    (acc, r) => {
      acc[r.platform] = (acc[r.platform] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topPlatforms = Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([platform, count]) => ({
      platform,
      count,
      percentage: (count / totalShares) * 100,
    }));

  return {
    totalShares,
    averageViralLevel: Math.round(averageViralLevel * 100) / 100,
    viralCoefficient: Math.round(viralCoefficient * 1000) / 1000,
    topPlatforms,
    engagementRate: 0.067, // Estimated average
    conversionRate: 0.023, // Estimated conversion to action
  };
}

/**
 * Calculate viral metrics
 */
function calculateViralMetrics(records: SocialShareAnalytics[]) {
  const viralShares = records.filter((r) => r.viralLevel > 0);
  const maxViralLevel = Math.max(...records.map((r) => r.viralLevel), 0);

  // Calculate viral velocity (shares per hour)
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const recentShares = records.filter(
    (r) => new Date(r.timestamp) >= oneHourAgo,
  );
  const viralVelocity = recentShares.length;

  return {
    viralShares: viralShares.length,
    maxViralLevel,
    viralVelocity,
    viralPenetration:
      records.length > 0 ? (viralShares.length / records.length) * 100 : 0,
    estimatedReach: calculateEstimatedReach(records),
  };
}

/**
 * Calculate A/B test metrics
 */
function calculateAbTestMetrics(
  records: SocialShareAnalytics[],
  testGroup: string,
) {
  const testRecords = records.filter((r) => r.abTestGroup === testGroup);

  // Group by variant
  const variantMetrics = testRecords.reduce(
    (acc, record) => {
      const variant = record.abTestVariant || "control";
      if (!acc[variant]) {
        acc[variant] = { shares: 0, viralShares: 0, avgViralLevel: 0 };
      }
      acc[variant].shares += 1;
      if (record.viralLevel > 0) {
        acc[variant].viralShares += 1;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  // Calculate averages
  Object.keys(variantMetrics).forEach((variant) => {
    const variantRecords = testRecords.filter(
      (r) => (r.abTestVariant || "control") === variant,
    );
    variantMetrics[variant].avgViralLevel =
      variantRecords.reduce((sum, r) => sum + r.viralLevel, 0) /
      variantRecords.length;
    variantMetrics[variant].viralRate =
      variantMetrics[variant].viralShares / variantMetrics[variant].shares;
  });

  return variantMetrics;
}

/**
 * Get top performing content
 */
function getTopContent(records: SocialShareAnalytics[]) {
  const contentMetrics = records.reduce(
    (acc, record) => {
      const key = `${record.contentType}_${record.contentId}`;
      if (!acc[key]) {
        acc[key] = {
          contentType: record.contentType,
          contentId: record.contentId,
          shares: 0,
          viralShares: 0,
          platforms: new Set(),
        };
      }
      acc[key].shares += 1;
      if (record.viralLevel > 0) {
        acc[key].viralShares += 1;
      }
      acc[key].platforms.add(record.platform);
      return acc;
    },
    {} as Record<string, any>,
  );

  return Object.values(contentMetrics)
    .map((content: any) => ({
      ...content,
      platforms: Array.from(content.platforms),
      viralRate: content.viralShares / content.shares,
      crossPlatformReach: content.platforms.length,
    }))
    .sort((a: any, b: any) => b.shares - a.shares)
    .slice(0, 10);
}

/**
 * Calculate estimated reach based on platform multipliers
 */
function calculateEstimatedReach(records: SocialShareAnalytics[]) {
  const platformMultipliers = {
    twitter: 150, // Average follower reach
    linkedin: 100, // Professional network reach
    facebook: 200, // Friend network reach
    instagram: 120, // Story/post reach
    email: 1, // Direct 1:1
    whatsapp: 8, // Group sharing potential
    telegram: 25, // Channel reach
    reddit: 500, // Subreddit potential
    "copy-link": 3, // Manual sharing estimate
  };

  return records.reduce((total, record) => {
    const multiplier = platformMultipliers[record.platform] || 50;
    const viralMultiplier = Math.pow(1.5, record.viralLevel); // Exponential viral growth
    return total + multiplier * viralMultiplier;
  }, 0);
}

/**
 * Get platform optimality score for user type
 */
function getPlatformOptimality(platform: SocialPlatform, userType: string) {
  const optimalityMatrix = {
    twitter: {
      activist: 0.9,
      "divine-warrior": 0.8,
      visitor: 0.7,
      coach: 0.6,
      judge: 0.5,
    },
    linkedin: {
      judge: 0.9,
      coach: 0.8,
      activist: 0.7,
      visitor: 0.5,
      "divine-warrior": 0.4,
    },
    facebook: {
      "divine-warrior": 0.8,
      visitor: 0.7,
      coach: 0.7,
      activist: 0.6,
      judge: 0.5,
    },
    instagram: {
      "divine-warrior": 0.9,
      visitor: 0.8,
      activist: 0.7,
      coach: 0.5,
      judge: 0.3,
    },
    email: {
      judge: 0.9,
      coach: 0.8,
      activist: 0.7,
      visitor: 0.6,
      "divine-warrior": 0.6,
    },
  };

  return (
    optimalityMatrix[platform as keyof typeof optimalityMatrix]?.[
      userType as keyof (typeof optimalityMatrix)["twitter"]
    ] || 0.5
  );
}
