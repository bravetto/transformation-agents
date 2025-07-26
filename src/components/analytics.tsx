"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { onCLS, onFCP, onLCP, onTTFB, Metric } from "web-vitals";
import { sendMetric, sendPageView } from "@/lib/analytics";
import { withErrorBoundary } from "@/components/ui/error-boundary";

/**
 * Analytics component that should be placed in the app layout
 * Handles reporting of web vitals and page views
 */
function AnalyticsBase() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    // Report page view on route change
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Send page view
    sendPageView(url);
  }, [pathname, searchParams]);

  // Set up web vitals reporting
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendMetric);
    onFCP(sendMetric);
    onLCP(sendMetric);
    onTTFB(sendMetric);

    // Note: FID is not included in the main exports of web-vitals in this version
    // We would need to update to the latest version to use onFID directly
    // For now, we're using the core metrics that are available
  }, []);

  // No actual UI is rendered
  return null;
}

// Export with error boundary for production safety
export const Analytics = withErrorBoundary(AnalyticsBase, "Analytics");
