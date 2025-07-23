/**
 * OpenTelemetry Instrumentation for Production Performance Monitoring
 * Next.js 15.4.3 + Vercel Integration
 */

import { registerOTel } from "@vercel/otel";

export function register() {
  // Register OpenTelemetry for Vercel
  registerOTel({
    serviceName: "jahmere-webb-freedom-portal",
  });

  // Additional custom telemetry setup
  if (process.env.NODE_ENV === "production") {
    setupCustomMetrics();
  }
}

function setupCustomMetrics() {
  // Custom performance metrics
  const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Track Core Web Vitals
      if (entry.entryType === "measure") {
        console.log(`Performance metric: ${entry.name} - ${entry.duration}ms`);
      }
    }
  });

  // Observe performance entries
  try {
    performanceObserver.observe({
      entryTypes: ["measure", "navigation", "resource"],
    });
  } catch (e) {
    // Graceful fallback for environments without PerformanceObserver
    console.warn("PerformanceObserver not available");
  }
}

// Export for custom telemetry usage
export const telemetryConfig = {
  serviceName: "jahmere-webb-freedom-portal",
  environment: process.env.NODE_ENV || "development",
};
