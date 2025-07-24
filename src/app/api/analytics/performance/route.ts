import { NextRequest, NextResponse } from "next/server";

interface PerformanceData {
  // Core Web Vitals
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;

  // Custom metrics
  bundleSize: number;
  componentLoadTimes: Record<string, number>;
  memoryUsage: number;
  connectionType: string;
  deviceType: "mobile" | "tablet" | "desktop";

  // User experience metrics
  timeToInteractive: number | null;
  totalBlockingTime: number | null;
  speedIndex: number | null;

  // API performance
  apiResponseTimes: Record<string, number>;
  apiErrorRates: Record<string, number>;

  // Engagement metrics
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;

  // Request metadata
  url: string;
  userAgent: string;
  timestamp: number;

  // Custom metrics
  [key: string]: any;
}

// In-memory storage for demo (use database in production)
let performanceMetrics: PerformanceData[] = [];

export const POST = createSecureAPIHandler({
  method: "POST",
  schema: API_SCHEMAS.performance,
  rateLimitType: "ANALYTICS",
  handler: async (data) => {
    // Add server-side timestamp
    const serverData = {
      ...data,
      receivedAt: Date.now(),
      serverProcessingTime: 0, // Will be calculated at the end
    };

    const processingStart = performance.now();

    // Store the metrics
    performanceMetrics.push(serverData);

    // Keep only last 1000 entries to prevent memory issues
    if (performanceMetrics.length > 1000) {
      performanceMetrics = performanceMetrics.slice(-1000);
    }

    // Calculate processing time
    const processingEnd = performance.now();
    serverData.serverProcessingTime = processingEnd - processingStart;

    // Analyze performance and provide feedback
    const analysis = analyzePerformance(data);

    // Log important metrics in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Performance Metrics Received:", {
        url: data.url,
        deviceType: data.deviceType,
        lcp: data.lcp,
        fcp: data.fcp,
        cls: data.cls,
        memoryUsage: data.memoryUsage,
        performanceScore: analysis.score,
      });
    }

    return {
      success: true,
      message: "Performance metrics recorded",
      analysis,
      serverProcessingTime: serverData.serverProcessingTime,
      timestamp: Date.now(),
    };
  },
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "1h";
    const deviceType = searchParams.get("deviceType");
    const url = searchParams.get("url");

    // Calculate time filter
    const now = Date.now();
    const timeFilters = {
      "1h": now - 60 * 60 * 1000,
      "24h": now - 24 * 60 * 60 * 1000,
      "7d": now - 7 * 24 * 60 * 60 * 1000,
      "30d": now - 30 * 24 * 60 * 60 * 1000,
    };

    const since =
      timeFilters[timeframe as keyof typeof timeFilters] || timeFilters["1h"];

    // Filter metrics
    let filteredMetrics = performanceMetrics.filter(
      (metric) => metric.timestamp >= since,
    );

    if (deviceType) {
      filteredMetrics = filteredMetrics.filter(
        (metric) => metric.deviceType === deviceType,
      );
    }

    if (url) {
      filteredMetrics = filteredMetrics.filter((metric) =>
        metric.url.includes(url),
      );
    }

    // Calculate aggregated metrics
    const aggregated = calculateAggregatedMetrics(filteredMetrics);

    return NextResponse.json({
      success: true,
      data: {
        metrics: aggregated,
        totalEntries: filteredMetrics.length,
        timeframe,
        filters: { deviceType, url },
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Performance metrics GET error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve performance metrics",
        timestamp: Date.now(),
      },
      { status: 500 },
    );
  }
}

function analyzePerformance(data: PerformanceData): {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  issues: string[];
  recommendations: string[];
  strengths: string[];
} {
  let score = 100;
  const issues: string[] = [];
  const recommendations: string[] = [];
  const strengths: string[] = [];

  // Analyze LCP (Largest Contentful Paint)
  if (data.lcp !== null) {
    if (data.lcp <= 2500) {
      strengths.push("Excellent Largest Contentful Paint");
    } else if (data.lcp <= 4000) {
      score -= 15;
      issues.push(`LCP is ${data.lcp}ms (should be ≤2500ms)`);
      recommendations.push("Optimize image loading and server response time");
    } else {
      score -= 30;
      issues.push(`Poor LCP: ${data.lcp}ms (should be ≤2500ms)`);
      recommendations.push(
        "Critical: Optimize images, use CDN, improve server response",
      );
    }
  }

  // Analyze FID (First Input Delay)
  if (data.fid !== null) {
    if (data.fid <= 100) {
      strengths.push("Excellent First Input Delay");
    } else if (data.fid <= 300) {
      score -= 10;
      issues.push(`FID is ${data.fid}ms (should be ≤100ms)`);
      recommendations.push("Reduce JavaScript execution time");
    } else {
      score -= 25;
      issues.push(`Poor FID: ${data.fid}ms (should be ≤100ms)`);
      recommendations.push("Critical: Minimize main thread blocking");
    }
  }

  // Analyze CLS (Cumulative Layout Shift)
  if (data.cls !== null) {
    if (data.cls <= 0.1) {
      strengths.push("Excellent layout stability");
    } else if (data.cls <= 0.25) {
      score -= 10;
      issues.push(`CLS is ${data.cls} (should be ≤0.1)`);
      recommendations.push("Set explicit dimensions for images and videos");
    } else {
      score -= 25;
      issues.push(`Poor CLS: ${data.cls} (should be ≤0.1)`);
      recommendations.push(
        "Critical: Fix layout shifts, set element dimensions",
      );
    }
  }

  // Analyze FCP (First Contentful Paint)
  if (data.fcp !== null) {
    if (data.fcp <= 1800) {
      strengths.push("Fast First Contentful Paint");
    } else if (data.fcp <= 3000) {
      score -= 5;
      recommendations.push("Optimize critical rendering path");
    } else {
      score -= 15;
      issues.push(`Slow FCP: ${data.fcp}ms (should be ≤1800ms)`);
      recommendations.push("Optimize above-the-fold content");
    }
  }

  // Analyze memory usage
  if (data.memoryUsage > 100) {
    score -= 10;
    issues.push(`High memory usage: ${data.memoryUsage.toFixed(1)}MB`);
    recommendations.push("Optimize component loading and memory management");
  } else if (data.memoryUsage > 50) {
    recommendations.push("Monitor memory usage - consider optimizations");
  } else {
    strengths.push("Efficient memory usage");
  }

  // Analyze component load times
  const slowComponents = data.componentLoadTimes
    ? Object.entries(data.componentLoadTimes)
        .filter(([_, time]) => time > 1000)
        .map(([name]) => name)
    : [];

  if (slowComponents.length > 0) {
    score -= 10;
    issues.push(`Slow components: ${slowComponents.join(", ")}`);
    recommendations.push("Optimize component loading with code splitting");
  }

  // Analyze API performance
  const slowApis = data.apiResponseTimes
    ? Object.entries(data.apiResponseTimes)
        .filter(([_, time]) => time > 500)
        .map(([endpoint]) => endpoint)
    : [];

  if (slowApis.length > 0) {
    score -= 10;
    issues.push(`Slow API endpoints: ${slowApis.join(", ")}`);
    recommendations.push("Optimize API response times and caching");
  }

  // Calculate grade
  let grade: "A" | "B" | "C" | "D" | "F";
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";

  return {
    score: Math.max(0, score),
    grade,
    issues,
    recommendations,
    strengths,
  };
}

function calculateAggregatedMetrics(metrics: PerformanceData[]) {
  if (metrics.length === 0) {
    return {
      averages: {
        lcp: 0,
        fcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        memoryUsage: 0,
        sessionDuration: 0,
      },
      percentiles: {
        lcp: { p50: 0, p75: 0, p90: 0, p95: 0 },
        fcp: { p50: 0, p75: 0, p90: 0, p95: 0 },
        fid: { p50: 0, p75: 0, p90: 0, p95: 0 },
      },
      deviceTypes: {},
      connectionTypes: {},
      counts: { total: 0, desktop: 0, mobile: 0, tablet: 0 },
      trends: { improving: [], degrading: [] },
    };
  }

  // Calculate averages
  const averages = {
    lcp: calculateAverage(metrics.map((m) => m.lcp).filter((v) => v !== null)),
    fcp: calculateAverage(metrics.map((m) => m.fcp).filter((v) => v !== null)),
    fid: calculateAverage(metrics.map((m) => m.fid).filter((v) => v !== null)),
    cls: calculateAverage(metrics.map((m) => m.cls).filter((v) => v !== null)),
    ttfb: calculateAverage(
      metrics.map((m) => m.ttfb).filter((v) => v !== null),
    ),
    memoryUsage: calculateAverage(metrics.map((m) => m.memoryUsage)),
    sessionDuration: calculateAverage(metrics.map((m) => m.sessionDuration)),
  };

  // Calculate percentiles for key metrics
  const percentiles = {
    lcp: calculatePercentiles(
      metrics.map((m) => m.lcp).filter((v) => v !== null),
    ),
    fcp: calculatePercentiles(
      metrics.map((m) => m.fcp).filter((v) => v !== null),
    ),
    fid: calculatePercentiles(
      metrics.map((m) => m.fid).filter((v) => v !== null),
    ),
  };

  // Device type breakdown
  const deviceTypes = metrics.reduce(
    (acc, metric) => {
      acc[metric.deviceType] = (acc[metric.deviceType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Connection type breakdown
  const connectionTypes = metrics.reduce(
    (acc, metric) => {
      acc[metric.connectionType] = (acc[metric.connectionType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    averages,
    percentiles,
    deviceTypes,
    connectionTypes,
    counts: {
      total: metrics.length,
      desktop: deviceTypes.desktop || 0,
      mobile: deviceTypes.mobile || 0,
      tablet: deviceTypes.tablet || 0,
    },
    trends: calculateTrends(metrics),
  };
}

function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function calculatePercentiles(values: number[]) {
  if (values.length === 0) return { p50: 0, p75: 0, p90: 0, p95: 0 };

  const sorted = [...values].sort((a, b) => a - b);
  const getPercentile = (p: number) => {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  };

  return {
    p50: getPercentile(50),
    p75: getPercentile(75),
    p90: getPercentile(90),
    p95: getPercentile(95),
  };
}

function calculateTrends(metrics: PerformanceData[]) {
  // Sort by timestamp
  const sorted = [...metrics].sort((a, b) => a.timestamp - b.timestamp);

  // Split into two halves to calculate trends
  const mid = Math.floor(sorted.length / 2);
  const firstHalf = sorted.slice(0, mid);
  const secondHalf = sorted.slice(mid);

  if (firstHalf.length === 0 || secondHalf.length === 0) {
    return { improving: [], degrading: [] };
  }

  const firstAvg = calculateAggregatedMetrics(firstHalf).averages;
  const secondAvg = calculateAggregatedMetrics(secondHalf).averages;

  const improving: string[] = [];
  const degrading: string[] = [];

  // Compare metrics (lower is better for most)
  if (secondAvg.lcp < firstAvg.lcp) improving.push("LCP");
  else if (secondAvg.lcp > firstAvg.lcp) degrading.push("LCP");

  if (secondAvg.fcp < firstAvg.fcp) improving.push("FCP");
  else if (secondAvg.fcp > firstAvg.fcp) degrading.push("FCP");

  if (secondAvg.fid < firstAvg.fid) improving.push("FID");
  else if (secondAvg.fid > firstAvg.fid) degrading.push("FID");

  if (secondAvg.cls < firstAvg.cls) improving.push("CLS");
  else if (secondAvg.cls > firstAvg.cls) degrading.push("CLS");

  return { improving, degrading };
}
