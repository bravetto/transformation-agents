"use client";

import { useEffect } from "react";
// 🔥 CRITICAL FIX: Replace usePathname with useStableNavigation for production stability
import { useStableNavigation } from "@/hooks/useStableNavigation";
import { useSearchParams } from "next/navigation";
import { onCLS, onFCP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";
import { sendMetric, sendPageView } from "@/lib/analytics";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

/**
 * Analytics component that should be placed in the app layout
 * Handles reporting of web vitals and page views
 */
function AnalyticsBase() {
  // 🔥 CRITICAL FIX: Use stable navigation hook to prevent re-render loops
  const { pathname } = useStableNavigation();
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

// Export with divine error boundary for production safety
export const Analytics = withDivineErrorBoundary(AnalyticsBase, {
  componentName: "Analytics",
  role: "guardian", // Analytics is critical for monitoring, so guardian role is appropriate
});
