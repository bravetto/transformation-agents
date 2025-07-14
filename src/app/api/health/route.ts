import { NextResponse } from "next/server";

/**
 * Health Check API - Bridge Project System Monitoring
 * GET /api/health
 *
 * Monitors critical system components to prevent cascade failures
 */
export async function GET() {
  const startTime = Date.now();

  try {
    // Check critical imports
    const importChecks = await checkCriticalImports();

    // Check analytics system
    const analyticsHealth = await checkAnalyticsHealth();

    // Check cache system
    const cacheHealth = checkCacheHealth();

    // System metrics
    const systemMetrics = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      nodeVersion: process.version,
      platform: process.platform,
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
    };

    // Overall health status
    const allChecksHealthy =
      importChecks.healthy && analyticsHealth.healthy && cacheHealth.healthy;

    const healthStatus = {
      status: allChecksHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      checks: {
        imports: importChecks,
        analytics: analyticsHealth,
        cache: cacheHealth,
      },
      system: systemMetrics,
      version: "v1.0-clean-state",
      port: process.env.PORT || "1437",
    };

    return NextResponse.json(healthStatus, {
      status: allChecksHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime: `${Date.now() - startTime}ms`,
      },
      { status: 500 },
    );
  }
}

async function checkCriticalImports() {
  const criticalComponents = [
    "trust-bar",
    "urgency-banner",
    "quick-nav",
    "explore-nav",
  ];

  const importResults = [];

  for (const component of criticalComponents) {
    try {
      // Dynamic import check
      await import(`@/components/ui/${component}`);
      importResults.push({ component, status: "ok" });
    } catch (error) {
      importResults.push({
        component,
        status: "error",
        error: error instanceof Error ? error.message : "Import failed",
      });
    }
  }

  const failedImports = importResults.filter((r) => r.status === "error");

  return {
    healthy: failedImports.length === 0,
    results: importResults,
    failedCount: failedImports.length,
    totalChecked: criticalComponents.length,
  };
}

async function checkAnalyticsHealth() {
  try {
    // Check if analytics API is responding
    const analyticsResponse = await fetch(
      "http://localhost:" +
        (process.env.PORT || "1437") +
        "/api/analytics/user-journey",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "health_check",
          userType: "system",
          sessionId: "health-check-" + Date.now(),
          timestamp: Date.now(),
        }),
      },
    ).catch(() => null);

    return {
      healthy: analyticsResponse?.ok || false,
      status: analyticsResponse?.status || "unreachable",
      endpoint: "/api/analytics/user-journey",
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Analytics check failed",
    };
  }
}

function checkCacheHealth() {
  try {
    const fs = require("fs");
    const path = require("path");

    // Check if .next directory exists and is accessible
    const nextDir = path.join(process.cwd(), ".next");
    const nextExists = fs.existsSync(nextDir);

    // Check cache directory
    const cacheDir = path.join(process.cwd(), ".next", "cache");
    const cacheExists = fs.existsSync(cacheDir);

    return {
      healthy: nextExists,
      nextDirectory: nextExists ? "exists" : "missing",
      cacheDirectory: cacheExists ? "exists" : "missing",
    };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Cache check failed",
    };
  }
}
