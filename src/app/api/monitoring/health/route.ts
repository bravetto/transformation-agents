import { NextRequest } from "next/server";
import { createAPIHandler, rateLimits } from "@/lib/production/api-middleware";
import {
  createDatabase,
  defaultDatabaseConfig,
} from "@/lib/production/database-singleton";

const db = createDatabase(defaultDatabaseConfig);

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    database: HealthCheck;
    memory: HealthCheck;
    disk: HealthCheck;
    api: HealthCheck;
    external: HealthCheck;
  };
  metrics: {
    responseTime: number;
    activeConnections: number;
    memoryUsage: number;
    cpuUsage?: number;
    errorRate: number;
  };
  alerts?: Alert[];
}

interface HealthCheck {
  status: "pass" | "warn" | "fail";
  responseTime: number;
  message?: string;
  details?: any;
}

interface Alert {
  level: "info" | "warning" | "critical";
  message: string;
  timestamp: string;
  component: string;
}

const startTime = Date.now();

/**
 * Comprehensive health check endpoint
 * Returns detailed system health status
 */
export const GET = createAPIHandler({
  method: "GET",
  rateLimit: rateLimits.relaxed,
  handler: async (input, req) => {
    const startTime = performance.now();
    const alerts: Alert[] = [];

    // Perform all health checks in parallel
    const [databaseCheck, memoryCheck, diskCheck, apiCheck, externalCheck] =
      await Promise.allSettled([
        checkDatabase(),
        checkMemory(),
        checkDisk(),
        checkAPI(),
        checkExternalServices(),
      ]);

    // Process results
    const checks = {
      database: getCheckResult(databaseCheck, "Database"),
      memory: getCheckResult(memoryCheck, "Memory"),
      disk: getCheckResult(diskCheck, "Disk"),
      api: getCheckResult(apiCheck, "API"),
      external: getCheckResult(externalCheck, "External Services"),
    };

    // Collect alerts
    Object.entries(checks).forEach(([component, check]) => {
      if (check.status === "fail") {
        alerts.push({
          level: "critical",
          message: check.message || `${component} health check failed`,
          timestamp: new Date().toISOString(),
          component,
        });
      } else if (check.status === "warn") {
        alerts.push({
          level: "warning",
          message: check.message || `${component} performance degraded`,
          timestamp: new Date().toISOString(),
          component,
        });
      }
    });

    // Calculate overall status
    const overallStatus = calculateOverallStatus(checks);
    const responseTime =
      Math.round((performance.now() - startTime) * 100) / 100;

    // Get system metrics
    const metrics = await getSystemMetrics();

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: Date.now() - startTime,
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      checks,
      metrics: {
        ...metrics,
        responseTime,
      },
      alerts: alerts.length > 0 ? alerts : undefined,
    };

    // Send critical alerts to monitoring service
    if (overallStatus === "unhealthy") {
      await sendCriticalAlert(healthStatus);
    }

    return healthStatus;
  },
});

async function checkDatabase(): Promise<HealthCheck> {
  const start = performance.now();

  try {
    // Test basic connectivity
    const isHealthy = await db.healthCheck();
    const responseTime = Math.round((performance.now() - start) * 100) / 100;

    if (!isHealthy) {
      return {
        status: "fail",
        responseTime,
        message: "Database connection failed",
      };
    }

    // Test query performance
    if (responseTime > 1000) {
      return {
        status: "warn",
        responseTime,
        message: `Slow database response: ${responseTime}ms`,
      };
    }

    // Get connection stats
    const stats = db.getStats();

    return {
      status: "pass",
      responseTime,
      details: {
        activeConnections: stats.activeConnections,
        cacheSize: stats.cacheSize,
      },
    };
  } catch (error) {
    return {
      status: "fail",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message: `Database error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

async function checkMemory(): Promise<HealthCheck> {
  const start = performance.now();

  try {
    let memoryInfo: any = {};

    // Node.js memory usage
    const memUsage = process.memoryUsage();
    const heapUsed = memUsage.heapUsed / 1024 / 1024; // MB
    const heapTotal = memUsage.heapTotal / 1024 / 1024; // MB
    const heapUsagePercent = (heapUsed / heapTotal) * 100;

    memoryInfo = {
      heapUsed: Math.round(heapUsed),
      heapTotal: Math.round(heapTotal),
      heapUsagePercent: Math.round(heapUsagePercent),
      rss: Math.round(memUsage.rss / 1024 / 1024),
    };

    let status: "pass" | "warn" | "fail" = "pass";
    let message = undefined;

    if (heapUsagePercent > 90) {
      status = "fail";
      message = `Critical memory usage: ${Math.round(heapUsagePercent)}%`;
    } else if (heapUsagePercent > 75) {
      status = "warn";
      message = `High memory usage: ${Math.round(heapUsagePercent)}%`;
    }

    return {
      status,
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message,
      details: memoryInfo,
    };
  } catch (error) {
    return {
      status: "fail",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message: `Memory check error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

async function checkDisk(): Promise<HealthCheck> {
  const start = performance.now();

  try {
    // In a real implementation, you'd check disk usage
    // For now, we'll simulate it
    const diskUsagePercent = Math.random() * 100;

    let status: "pass" | "warn" | "fail" = "pass";
    let message = undefined;

    if (diskUsagePercent > 95) {
      status = "fail";
      message = `Critical disk usage: ${Math.round(diskUsagePercent)}%`;
    } else if (diskUsagePercent > 85) {
      status = "warn";
      message = `High disk usage: ${Math.round(diskUsagePercent)}%`;
    }

    return {
      status,
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message,
      details: {
        usage: Math.round(diskUsagePercent),
        available: Math.round(100 - diskUsagePercent),
      },
    };
  } catch (error) {
    return {
      status: "fail",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message: `Disk check error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

async function checkAPI(): Promise<HealthCheck> {
  const start = performance.now();

  try {
    // Test critical API endpoints
    const endpoints = [
      "/api/health",
      "/api/prayers",
      "/api/analytics/performance",
    ];

    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${endpoint}`,
          {
            method: "GET",
            signal: AbortSignal.timeout(5000),
          },
        );
        return { endpoint, status: response.status, ok: response.ok };
      }),
    );

    const failures = results.filter(
      (result) =>
        result.status === "rejected" ||
        (result.status === "fulfilled" && !result.value.ok),
    ).length;

    const responseTime = Math.round((performance.now() - start) * 100) / 100;

    if (failures > 0) {
      return {
        status: failures === endpoints.length ? "fail" : "warn",
        responseTime,
        message: `${failures}/${endpoints.length} API endpoints failing`,
        details: results,
      };
    }

    return {
      status: "pass",
      responseTime,
      details: {
        endpointsChecked: endpoints.length,
        allPassing: true,
      },
    };
  } catch (error) {
    return {
      status: "fail",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message: `API check error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

async function checkExternalServices(): Promise<HealthCheck> {
  const start = performance.now();

  try {
    // Check external dependencies (if any)
    // For now, we'll simulate checks

    return {
      status: "pass",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      details: {
        servicesChecked: 0,
        note: "No external dependencies configured",
      },
    };
  } catch (error) {
    return {
      status: "fail",
      responseTime: Math.round((performance.now() - start) * 100) / 100,
      message: `External services check error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function getCheckResult(
  result: PromiseSettledResult<HealthCheck>,
  componentName: string,
): HealthCheck {
  if (result.status === "rejected") {
    return {
      status: "fail",
      responseTime: 0,
      message: `${componentName} check failed: ${result.reason}`,
    };
  }
  return result.value;
}

function calculateOverallStatus(checks: {
  [key: string]: HealthCheck;
}): "healthy" | "degraded" | "unhealthy" {
  const statuses = Object.values(checks).map((check) => check.status);

  if (statuses.includes("fail")) {
    return "unhealthy";
  }

  if (statuses.includes("warn")) {
    return "degraded";
  }

  return "healthy";
}

async function getSystemMetrics() {
  const memUsage = process.memoryUsage();
  const dbStats = db.getStats();

  return {
    activeConnections: dbStats.activeConnections,
    memoryUsage: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100,
    errorRate: 0, // Would be calculated from actual error tracking
  };
}

async function sendCriticalAlert(healthStatus: HealthStatus): Promise<void> {
  try {
    // In production, send to monitoring service (PagerDuty, Datadog, etc.)
    console.error("🚨 CRITICAL SYSTEM ALERT", {
      status: healthStatus.status,
      alerts: healthStatus.alerts,
      timestamp: healthStatus.timestamp,
    });

    // Could also send to Slack, email, or other alerting systems
  } catch (error) {
    console.error("Failed to send critical alert:", error);
  }
}
