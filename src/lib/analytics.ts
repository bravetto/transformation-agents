"use client";

/**
 * Google Analytics and Web Vitals Reporting
 * Updated for proper GA4 integration - JAHmere Webb Freedom Portal
 */
import type { Metric } from "web-vitals";
import { logger } from "@/lib/logger";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Send metrics to Google Analytics
 */
export function sendMetric(metric: Metric) {
  // Check if Google Analytics is loaded
  if (typeof window === 'undefined' || !window.gtag) {
    // In development, log metrics to console
    logger.analytics("web_vital", metric);
    return;
  }

  // Send to Google Analytics
  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
    custom_map: {
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      mission: 'july_28_freedom'
    }
  });
}

/**
 * Send page view to Google Analytics
 */
export function sendPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) {
    logger.analytics("page_view", { url });
    return;
  }

  // Send page view to Google Analytics
  window.gtag('event', 'page_view', {
    page_location: url,
    custom_map: {
      mission: 'july_28_freedom',
      platform: 'jahmere_bridge',
      environment: process.env.NODE_ENV || 'production'
    }
  });
}

/**
 * Report user error to analytics
 */
export function reportError(error: Error, context?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error, context);
    }
    return;
  }

  // Send error to Google Analytics
  window.gtag('event', 'exception', {
    description: error.message,
    fatal: false,
    custom_map: {
      error_name: error.name,
      error_stack: error.stack?.substring(0, 500), // Limit stack trace
      mission: 'july_28_freedom',
      context: JSON.stringify(context).substring(0, 500)
    }
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

  if (typeof window === 'undefined' || !window.gtag) {
    return Promise.resolve();
  }

  // Send to Google Analytics
  window.gtag('event', eventName, {
    event_category: 'JAHmere Mission',
    event_label: properties?.label || eventName,
    value: properties?.value || 1,
    custom_map: {
      mission_date: '2025-07-28',
      user_type: properties?.userType || 'visitor',
      mission: 'july_28_freedom',
      ...properties
    }
  });

  return Promise.resolve();
}

/**
 * Track prayer submissions - Mission Critical
 */
export function trackPrayerSubmission(prayerData: any) {
  trackEvent('prayer_submitted', {
    label: 'Prayer for JAHmere',
    category: 'Spiritual Support',
    intention: prayerData.intention,
    location: prayerData.location,
    mission_critical: true
  });
}

/**
 * Track character witness interactions - Legal Support
 */
export function trackCharacterWitness(action: string, witnessId?: string) {
  trackEvent('character_witness_interaction', {
    label: action,
    category: 'Legal Support',
    witness_id: witnessId,
    mission_critical: true
  });
}
