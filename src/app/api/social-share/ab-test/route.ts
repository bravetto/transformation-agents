import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  ABTestConfig,
  ABTestVariant,
  SocialPlatform,
  ShareContentType,
} from "@/types/social-sharing";
import { getCurrentUserType } from "@/lib/analytics/user-journey";

// In-memory storage for A/B tests (use database in production)
let abTests: ABTestConfig[] = [];
let abTestResults: Record<
  string,
  {
    variant: string;
    events: Array<{
      type: "view" | "click" | "share" | "convert";
      timestamp: string;
      userType?: string;
      platform?: SocialPlatform;
      metadata?: any;
    }>;
  }
> = {};

// Pre-configured A/B tests for social sharing optimization
const defaultABTests: ABTestConfig[] = [
  {
    testId: "share-button-style-2024",
    testName: "Share Button Style Optimization",
    isActive: true,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    variants: [
      {
        id: "control",
        name: "Standard Icon Buttons",
        weight: 30,
        buttonStyle: "icon",
        buttonPosition: "inline",
        buttonText: "Share",
      },
      {
        id: "text-emphasis",
        name: "Text + Icon with CTA",
        weight: 25,
        buttonStyle: "icon-text",
        buttonPosition: "inline",
        buttonText: "Spread the Word",
        urgencyLevel: "urgent",
      },
      {
        id: "floating-divine",
        name: "Floating Divine Style",
        weight: 25,
        buttonStyle: "icon-text",
        buttonPosition: "floating",
        buttonText: "Amplify Freedom",
        urgencyLevel: "divine",
        showPulse: true,
        showParticles: true,
        highlightColor: "#F59E0B",
      },
      {
        id: "prayer-warrior",
        name: "Prayer Warrior Call",
        weight: 20,
        buttonStyle: "text",
        buttonPosition: "header",
        buttonText: "🙏 Be a Prayer Warrior - Share JAHmere's Story",
        urgencyLevel: "critical",
        showShareReward: true,
        rewardMessage: "Your share activates divine intervention",
      },
    ],
    targetUserTypes: ["divine-warrior", "activist", "visitor"],
    targetPlatforms: ["twitter", "facebook", "instagram", "email"],
    targetContentTypes: [
      "person-profile",
      "prayer-request",
      "freedom-countdown",
    ],
    primaryMetric: "share-rate",
    secondaryMetrics: ["viral-coefficient", "click-through-rate"],
    minimumSampleSize: 100,
    confidenceLevel: 95,
  },
  {
    testId: "share-message-urgency-2024",
    testName: "Share Message Urgency Testing",
    isActive: true,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days
    variants: [
      {
        id: "factual",
        name: "Factual Information",
        weight: 25,
        shareMessage:
          "Learn about JAHmere Webb's transformation story and the justice reform movement.",
        urgencyLevel: "normal",
      },
      {
        id: "emotional",
        name: "Emotional Appeal",
        weight: 25,
        shareMessage:
          "One young man's story could change everything. Help us share JAHmere's powerful journey of transformation.",
        urgencyLevel: "urgent",
      },
      {
        id: "countdown",
        name: "Time-Sensitive Countdown",
        weight: 25,
        shareMessage:
          "URGENT: JAHmere's freedom date is July 28th. Your share could help change his life forever.",
        urgencyLevel: "critical",
      },
      {
        id: "divine-intervention",
        name: "Divine Intervention Call",
        weight: 25,
        shareMessage:
          "🙏 Join the divine intervention for JAHmere's freedom. Every share is a prayer warrior activated.",
        urgencyLevel: "divine",
        showShareReward: true,
        rewardMessage: "Divine multiplier activated: 7x spiritual impact",
      },
    ],
    targetUserTypes: ["divine-warrior", "activist"],
    targetContentTypes: ["person-profile", "freedom-countdown"],
    primaryMetric: "viral-coefficient",
    secondaryMetrics: ["share-rate", "engagement-time"],
    minimumSampleSize: 150,
    confidenceLevel: 90,
  },
];

/**
 * 🧪 A/B TESTING MANAGEMENT API
 * Optimize social sharing for maximum viral impact
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");
    const action = searchParams.get("action");
    const userType = searchParams.get("userType") || undefined;
    const platform = searchParams.get("platform") as SocialPlatform;
    const contentType = searchParams.get("contentType") as ShareContentType;

    // Initialize default tests if none exist
    if (abTests.length === 0) {
      abTests = [...defaultABTests];
      logger.analytics("🧪 INITIALIZED DEFAULT A/B TESTS", {
        count: abTests.length,
      });
    }

    // Get variant assignment for user
    if (action === "getVariant" && testId) {
      const variant = getVariantForUser(testId, {
        userType,
        platform,
        contentType,
      });

      if (variant) {
        // Track test view
        trackABTestEvent(testId, variant.id, "view", {
          userType,
          platform,
          contentType,
        });

        logger.analytics("🎯 A/B TEST VARIANT ASSIGNED", {
          testId,
          variant: variant.id,
          userType,
          platform,
          contentType,
        });

        return NextResponse.json({
          success: true,
          variant,
          testId,
          tracking: {
            shouldTrack: true,
            sessionId: generateSessionId(),
            timestamp: new Date().toISOString(),
          },
        });
      }
    }

    // Get test results and analytics
    if (action === "results" && testId) {
      const test = abTests.find((t) => t.testId === testId);
      if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }

      const results = calculateTestResults(testId);

      return NextResponse.json({
        success: true,
        test,
        results,
        recommendations: generateTestRecommendations(test, results),
      });
    }

    // List all active tests
    const activeTests = abTests.filter((test) => test.isActive);
    const testOverview = activeTests.map((test) => {
      const results = calculateTestResults(test.testId);
      return {
        testId: test.testId,
        testName: test.testName,
        isActive: test.isActive,
        startDate: test.startDate,
        endDate: test.endDate,
        variants: test.variants.length,
        sampleSize: results?.totalSamples || 0,
        primaryMetric: test.primaryMetric,
        significance: results?.significance || 0,
        winningVariant: results?.winningVariant?.variant || null,
        confidence: results?.confidence || 0,
      };
    });

    return NextResponse.json({
      success: true,
      activeTests: testOverview,
      totalTests: abTests.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("A/B Testing API error:", error);
    return NextResponse.json(
      { error: "Failed to process A/B test request" },
      { status: 500 },
    );
  }
}

/**
 * POST - Track A/B test events and create new tests
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, testId, variant, event, metadata } = body;

    if (action === "trackEvent") {
      // Track A/B test event
      const success = trackABTestEvent(testId, variant, event, metadata);

      if (success) {
        logger.analytics("📊 A/B TEST EVENT TRACKED", {
          testId,
          variant,
          event,
          metadata,
        });

        return NextResponse.json({
          success: true,
          message: "Event tracked successfully",
          timestamp: new Date().toISOString(),
        });
      } else {
        return NextResponse.json(
          { error: "Invalid test or variant" },
          { status: 400 },
        );
      }
    }

    if (action === "createTest") {
      // Create new A/B test
      const newTest: ABTestConfig = {
        testId: body.testId || `test-${Date.now()}`,
        testName: body.testName,
        isActive: body.isActive ?? true,
        startDate: body.startDate || new Date().toISOString(),
        endDate: body.endDate,
        variants: body.variants,
        targetUserTypes: body.targetUserTypes,
        targetPlatforms: body.targetPlatforms,
        targetContentTypes: body.targetContentTypes,
        primaryMetric: body.primaryMetric,
        secondaryMetrics: body.secondaryMetrics || [],
        minimumSampleSize: body.minimumSampleSize || 100,
        confidenceLevel: body.confidenceLevel || 95,
      };

      // Validate test configuration
      const validation = validateTestConfig(newTest);
      if (!validation.isValid) {
        return NextResponse.json({ error: validation.errors }, { status: 400 });
      }

      abTests.push(newTest);

      logger.analytics("🧪 NEW A/B TEST CREATED", {
        testId: newTest.testId,
        testName: newTest.testName,
        variants: newTest.variants.length,
      });

      return NextResponse.json({
        success: true,
        test: newTest,
        message: "A/B test created successfully",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("A/B Testing POST error:", error);
    return NextResponse.json(
      { error: "Failed to process A/B test action" },
      { status: 500 },
    );
  }
}

/**
 * Get the appropriate variant for a user based on targeting and weights
 */
function getVariantForUser(
  testId: string,
  context: {
    userType?: string;
    platform?: SocialPlatform;
    contentType?: ShareContentType;
  },
): ABTestVariant | null {
  const test = abTests.find((t) => t.testId === testId && t.isActive);
  if (!test) return null;

  // Check if user meets targeting criteria
  if (
    test.targetUserTypes &&
    context.userType &&
    !test.targetUserTypes.includes(context.userType as any)
  ) {
    return null;
  }

  if (
    test.targetPlatforms &&
    context.platform &&
    !test.targetPlatforms.includes(context.platform)
  ) {
    return null;
  }

  if (
    test.targetContentTypes &&
    context.contentType &&
    !test.targetContentTypes.includes(context.contentType)
  ) {
    return null;
  }

  // Select variant based on weights
  const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of test.variants) {
    random -= variant.weight;
    if (random <= 0) {
      return variant;
    }
  }

  // Fallback to first variant
  return test.variants[0] || null;
}

/**
 * Track A/B test events
 */
function trackABTestEvent(
  testId: string,
  variant: string,
  event: "view" | "click" | "share" | "convert",
  metadata: any = {},
): boolean {
  const test = abTests.find((t) => t.testId === testId);
  if (!test) return false;

  const variantExists = test.variants.some((v) => v.id === variant);
  if (!variantExists) return false;

  const key = `${testId}_${variant}`;
  if (!abTestResults[key]) {
    abTestResults[key] = { variant, events: [] };
  }

  abTestResults[key].events.push({
    type: event,
    timestamp: new Date().toISOString(),
    userType: metadata.userType,
    platform: metadata.platform,
    metadata,
  });

  return true;
}

/**
 * Calculate test results and statistical significance
 */
function calculateTestResults(testId: string) {
  const test = abTests.find((t) => t.testId === testId);
  if (!test) return null;

  const variantResults = test.variants.map((variant) => {
    const key = `${testId}_${variant.id}`;
    const data = abTestResults[key] || { variant: variant.id, events: [] };

    const views = data.events.filter((e) => e.type === "view").length;
    const clicks = data.events.filter((e) => e.type === "click").length;
    const shares = data.events.filter((e) => e.type === "share").length;
    const converts = data.events.filter((e) => e.type === "convert").length;

    // Calculate metrics based on primary metric
    let primaryValue = 0;
    let primaryTotal = views || 1;

    switch (test.primaryMetric) {
      case "share-rate":
        primaryValue = shares;
        primaryTotal = views || 1;
        break;
      case "click-through-rate":
        primaryValue = clicks;
        primaryTotal = views || 1;
        break;
      case "conversion-rate":
        primaryValue = converts;
        primaryTotal = clicks || 1;
        break;
      case "viral-coefficient":
        // Simplified viral coefficient calculation
        primaryValue = shares * 1.5; // Assume 1.5 avg reach per share
        primaryTotal = views || 1;
        break;
    }

    const rate = primaryValue / primaryTotal;

    return {
      variant: variant.id,
      name: variant.name,
      weight: variant.weight,
      samples: {
        views,
        clicks,
        shares,
        converts,
        total: views,
      },
      metrics: {
        primaryRate: rate,
        clickRate: clicks / (views || 1),
        shareRate: shares / (views || 1),
        conversionRate: converts / (clicks || 1),
      },
      primaryValue,
      primaryTotal,
    };
  });

  // Calculate statistical significance (simplified)
  const totalSamples = variantResults.reduce(
    (sum, v) => sum + v.samples.total,
    0,
  );
  const hasMinimumSample = totalSamples >= test.minimumSampleSize;

  // Find winning variant (highest primary rate)
  const winningVariant = variantResults.reduce((best, current) =>
    current.metrics.primaryRate > best.metrics.primaryRate ? current : best,
  );

  // Calculate confidence (simplified z-test approximation)
  const confidence = hasMinimumSample
    ? Math.min(95, 60 + (totalSamples / test.minimumSampleSize) * 30)
    : 0;

  const significance =
    confidence >= test.confidenceLevel ? "significant" : "not-significant";

  return {
    testId,
    totalSamples,
    hasMinimumSample,
    variants: variantResults,
    winningVariant,
    confidence: Math.round(confidence),
    significance,
    startDate: test.startDate,
    endDate: test.endDate,
    primaryMetric: test.primaryMetric,
    isComplete: hasMinimumSample && significance === "significant",
  };
}

/**
 * Generate test recommendations
 */
function generateTestRecommendations(test: ABTestConfig, results: any) {
  const recommendations = [];

  if (!results.hasMinimumSample) {
    recommendations.push({
      type: "sample-size",
      message: `Need ${test.minimumSampleSize - results.totalSamples} more samples for statistical significance`,
      priority: "high",
    });
  }

  if (results.isComplete) {
    recommendations.push({
      type: "winner",
      message: `Implement variant "${results.winningVariant.name}" for best results`,
      priority: "high",
      expectedImprovement: `${((results.winningVariant.metrics.primaryRate / (results.variants.find((v: any) => v.variant === "control")?.metrics.primaryRate || 1) - 1) * 100).toFixed(1)}% improvement`,
    });
  }

  // Analyze variant performance
  const lowPerformers = results.variants.filter(
    (v: any) =>
      v.metrics.primaryRate < results.winningVariant.metrics.primaryRate * 0.7,
  );

  if (lowPerformers.length > 0) {
    recommendations.push({
      type: "optimization",
      message: `Consider removing or optimizing variants: ${lowPerformers.map((v: any) => v.name).join(", ")}`,
      priority: "medium",
    });
  }

  return recommendations;
}

/**
 * Validate A/B test configuration
 */
function validateTestConfig(test: ABTestConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors = [];

  if (!test.testName || test.testName.length < 3) {
    errors.push("Test name must be at least 3 characters");
  }

  if (!test.variants || test.variants.length < 2) {
    errors.push("Test must have at least 2 variants");
  }

  if (test.variants) {
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    if (Math.abs(totalWeight - 100) > 1) {
      errors.push("Variant weights must sum to 100");
    }

    const duplicateIds = test.variants
      .map((v) => v.id)
      .filter((id, index, arr) => arr.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate variant IDs: ${duplicateIds.join(", ")}`);
    }
  }

  if (
    ![
      "share-rate",
      "click-through-rate",
      "viral-coefficient",
      "conversion-rate",
    ].includes(test.primaryMetric)
  ) {
    errors.push("Invalid primary metric");
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Generate session ID for tracking
 */
function generateSessionId(): string {
  return `abtest_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
