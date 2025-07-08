import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Constants
const API_ENDPOINTS = [
  "/api/letters/support",
  "/api/crm/contacts",
  "/api/ai/doppelganger",
  "/api/analytics/impact",
];

const CLICKUP_API_URL = "https://api.clickup.com/api/v2";
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

const HEALTH_CHECK_TIMEOUT = 5000; // 5 seconds timeout for health checks

// Type for service health status
type ServiceHealth = {
  service: string;
  status: "healthy" | "degraded" | "down";
  latency?: number;
  lastChecked: string;
  message?: string;
  details?: any;
};

// Cache for health check results to avoid too frequent checks
let healthCache: {
  data: {
    overall: "healthy" | "degraded" | "down";
    services: ServiceHealth[];
    timestamp: string;
  };
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 1000; // 1 minute cache

/**
 * Check if the service is available by making a lightweight request
 */
async function checkServiceHealth(
  service: string,
  url: string,
  options: RequestInit = {},
): Promise<ServiceHealth> {
  const startTime = Date.now();

  try {
    // Create an AbortController with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      HEALTH_CHECK_TIMEOUT,
    );

    // Make the request
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    // Calculate latency
    const latency = Date.now() - startTime;

    // If response is not ok, consider service degraded
    if (!response.ok) {
      return {
        service,
        status: "degraded",
        latency,
        lastChecked: new Date().toISOString(),
        message: `Service returned status ${response.status}`,
        details: { statusCode: response.status },
      };
    }

    // Service is healthy
    return {
      service,
      status: "healthy",
      latency,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    // Calculate latency even for errors
    const latency = Date.now() - startTime;

    // Check if it's a timeout
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        service,
        status: "degraded",
        latency,
        lastChecked: new Date().toISOString(),
        message: "Service timeout",
        details: { error: "timeout" },
      };
    }

    // Any other error means the service is down
    return {
      service,
      status: "down",
      latency,
      lastChecked: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Unknown error",
      details: {
        error: error instanceof Error ? error.toString() : "Unknown error",
      },
    };
  }
}

/**
 * Check ClickUp API health
 */
async function checkClickUpHealth(): Promise<ServiceHealth> {
  // Only check if API key is available
  if (!process.env.CLICKUP_API_KEY) {
    return {
      service: "ClickUp CRM",
      status: "down",
      lastChecked: new Date().toISOString(),
      message: "API key not configured",
    };
  }

  // Check a lightweight endpoint like user info
  return await checkServiceHealth("ClickUp CRM", `${CLICKUP_API_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `${process.env.CLICKUP_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

/**
 * Check Anthropic API health
 */
async function checkAnthropicHealth(): Promise<ServiceHealth> {
  // Only check if API key is available
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      service: "Anthropic AI",
      status: "down",
      lastChecked: new Date().toISOString(),
      message: "API key not configured",
    };
  }

  // Instead of making a real request which would cost tokens,
  // we'll just check if the API is reachable with an options request
  return await checkServiceHealth("Anthropic AI", ANTHROPIC_API_URL, {
    method: "OPTIONS",
    headers: {
      "x-api-key": `${process.env.ANTHROPIC_API_KEY}`,
      "anthropic-version": "2023-06-01",
    },
  });
}

/**
 * Check database health (mock for now)
 */
async function checkDatabaseHealth(): Promise<ServiceHealth> {
  // In a real implementation, this would check the database connection
  // For now, we'll return a mock healthy status

  return {
    service: "Database",
    status: "healthy",
    latency: 15,
    lastChecked: new Date().toISOString(),
  };
}

/**
 * Check internal API health
 */
async function checkInternalAPIs(): Promise<ServiceHealth[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Check each API endpoint
  const results = await Promise.all(
    API_ENDPOINTS.map((endpoint) =>
      checkServiceHealth(`API: ${endpoint}`, `${baseUrl}${endpoint}`, {
        method: "OPTIONS",
      }),
    ),
  );

  return results;
}

/**
 * Check overall system health
 */
async function checkSystemHealth(deep: boolean = false): Promise<any> {
  // Check for cached results first (unless deep check is requested)
  if (
    !deep &&
    healthCache &&
    Date.now() - healthCache.timestamp < CACHE_DURATION
  ) {
    return healthCache.data;
  }

  // Perform health checks
  const clickUpHealth = await checkClickUpHealth();
  const anthropicHealth = await checkAnthropicHealth();
  const databaseHealth = await checkDatabaseHealth();

  // Only check internal APIs in deep mode
  const internalApiHealth = deep ? await checkInternalAPIs() : [];

  // Combine all service checks
  const allServices = [
    clickUpHealth,
    anthropicHealth,
    databaseHealth,
    ...internalApiHealth,
  ];

  // Determine overall status
  let overallStatus: "healthy" | "degraded" | "down" = "healthy";

  // If any service is down, overall is degraded
  if (allServices.some((service) => service.status === "down")) {
    overallStatus = "degraded";
  }

  // If all critical services are down, overall is down
  const criticalServices = [clickUpHealth, databaseHealth];
  if (criticalServices.every((service) => service.status === "down")) {
    overallStatus = "down";
  }

  // Create result
  const result = {
    overall: overallStatus,
    services: allServices,
    timestamp: new Date().toISOString(),
  };

  // Update cache (even for deep checks)
  healthCache = {
    data: result,
    timestamp: Date.now(),
  };

  return result;
}

/**
 * Handle GET request for health check
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const deep = searchParams.get("deep") === "true";
    const format = searchParams.get("format") || "json";

    // Get health status
    const healthStatus = await checkSystemHealth(deep);

    // Return based on requested format
    if (format === "html") {
      // Return HTML status page
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Bridge Project - System Status</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { margin-top: 0; }
    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 14px;
    }
    .status-healthy { background: #d4edda; color: #155724; }
    .status-degraded { background: #fff3cd; color: #856404; }
    .status-down { background: #f8d7da; color: #721c24; }
    .service { margin-bottom: 15px; padding: 12px; border-radius: 4px; background: #f8f9fa; }
    .service-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .service-name { font-weight: bold; font-size: 18px; }
    .service-details { font-size: 14px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <h1>The Bridge Project - System Status</h1>
    <div class="service">
      <div class="service-header">
        <div class="service-name">Overall System Status</div>
        <div class="status-badge status-${healthStatus.overall}">
          ${healthStatus.overall}
        </div>
      </div>
      <div class="service-details">
        Last updated: ${healthStatus.timestamp}
      </div>
    </div>
    
    <h2>Service Details</h2>
    ${healthStatus.services
      .map(
        (service: ServiceHealth) => `
      <div class="service">
        <div class="service-header">
          <div class="service-name">${service.service}</div>
          <div class="status-badge status-${service.status}">
            ${service.status}
          </div>
        </div>
        <div class="service-details">
          ${service.latency ? `Response time: ${service.latency}ms<br>` : ""}
          Last checked: ${service.lastChecked}<br>
          ${service.message ? `Message: ${service.message}` : ""}
        </div>
      </div>
    `,
      )
      .join("")}
  </div>
</body>
</html>
      `;

      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    // Default JSON response
    return NextResponse.json({
      success: true,
      data: healthStatus,
    });
  } catch (error) {
    console.error("Error checking system health:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error checking system health",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * Handle POST request to force refresh health status
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Reset cache
    healthCache = null;

    // Get fresh health status
    const healthStatus = await checkSystemHealth(true);

    return NextResponse.json({
      success: true,
      message: "Health check refreshed",
      data: healthStatus,
    });
  } catch (error) {
    console.error("Error refreshing health status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error refreshing health status",
      },
      { status: 500 },
    );
  }
}
