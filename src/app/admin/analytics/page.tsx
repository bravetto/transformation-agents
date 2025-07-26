"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withErrorBoundary } from "@/components/ui/error-boundary";

function AnalyticsDashboardPage() {
  const divineLove = useDivineLove("AnalyticsDashboard");

  useEffect(() => {
    divineLove.manifest();
  }, [divineLove]);

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}

export default withErrorBoundary(
  AnalyticsDashboardPage,
  "AnalyticsDashboard",
  <div className="min-h-screen p-8 bg-gray-900 text-white">
    <h1 className="text-2xl font-bold mb-4">Analytics Dashboard Error</h1>
    <p>
      There was an error loading the analytics dashboard. Please try again
      later.
    </p>
  </div>
);
