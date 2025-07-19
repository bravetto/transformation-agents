"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import MetricCard from "./metric-card";
import useDashboard from "./context";
import { withErrorBoundary } from "@/components/with-error-boundary";

/**
 * Metrics Grid Component
 * Displays a responsive grid of metric cards
 */
function MetricsGrid() {
  const { metrics, loading } = useDashboard();

  if (loading && metrics.length === 0) {
    return <MetricsGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <AnimatePresence>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            animate={true}
            className="h-full"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Metrics Grid Skeleton
 * Displays a loading state when metrics are being fetched
 */
function MetricsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse rounded-xl h-64"
        />
      ))}
    </div>
  );
}

export default withErrorBoundary(MetricsGrid, {
  componentName: "MetricsGrid",
  id: "metricsgrid",
});
