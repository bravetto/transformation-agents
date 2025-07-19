"use client";

/**
 * Analytics and Web Vitals Reporting
 */
import type { Metric } from "web-vitals";
import { logger } from "@/lib/logger";

const ANALYTICS_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL || "";

/**
 * Send metrics to analytics endpoint
 */
export function sendMetric(metric: Metric) {
  // Check if analytics URL is configured
  if (!ANALYTICS_URL) {
    // In development, log metrics to console
    logger.analytics("web_vital", metric);
    return;
  }

  // Add project info to the metric
  const body = JSON.stringify({
    ...metric,
    project: "the-bridge",
    environment: process.env.NODE_ENV || "production",
    timestamp: Date.now(),
  });

  // Use `navigator.sendBeacon()` if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon(ANALYTICS_URL, body);
  } else {
    // Fall back to fetch API
    fetch(ANALYTICS_URL, {
      body,
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error("Error reporting web vital:", error);
    });
  }
}

/**
 * Send page view to analytics
 */
export function sendPageView(url: string) {
  if (!ANALYTICS_URL) {
    logger.analytics("page_view", { url });
    return;
  }

  const body = JSON.stringify({
    type: "pageview",
    url,
    project: "the-bridge",
    environment: process.env.NODE_ENV || "production",
    timestamp: Date.now(),
  });

  // Use fetch API for page views
  fetch(`${ANALYTICS_URL}/pageview`, {
    body,
    method: "POST",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error reporting page view:", error);
  });
}

/**
 * Report user error to analytics
 */
export function reportError(error: Error, context?: Record<string, unknown>) {
  if (!ANALYTICS_URL) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error, context);
    }
    return;
  }

  const body = JSON.stringify({
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    project: "the-bridge",
    environment: process.env.NODE_ENV || "production",
    timestamp: Date.now(),
  });

  // Use fetch API with keepalive for errors
  fetch(`${ANALYTICS_URL}/error`, {
    body,
    method: "POST",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((reportingError) => {
    console.error("Error reporting error:", reportingError);
  });
}

/**
 * Track custom events for user interactions
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
) {
  const eventData = {
    event: eventName,
    properties: {
      ...properties,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    },
  };

  // In development, log to console
  logger.analytics("event_tracked", eventData);

  if (process.env.NODE_ENV === "development") {
    return Promise.resolve();
  }

  // Send to analytics endpoint if configured
  if (ANALYTICS_URL) {
    return fetch(`${ANALYTICS_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).catch((error) => {
      console.error("Error tracking event:", error);
    });
  }

  return Promise.resolve();
}
