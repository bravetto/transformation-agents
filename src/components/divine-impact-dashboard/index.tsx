"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { DashboardProvider } from "./context";
import { DashboardContainer } from "./dashboard-container";
import { DashboardHeader } from "./dashboard-header";
import { MetricsGrid } from "./metrics-grid";
import { DashboardFooter } from "./dashboard-footer";
import type { DivineImpactDashboardProps } from "./types";

/**
 * Divine Impact Dashboard
 * A comprehensive dashboard showing impact metrics with animations and real-time updates
 */
function DivineImpactDashboard(props: DivineImpactDashboardProps) {
  return (
    <DashboardProvider
      refreshInterval={props.refreshInterval}
      autoRefresh={props.autoRefresh}
      defaultRole={props.defaultRole}
      initialMetrics={props.metrics}
    >
      <DashboardContainer className={props.className}>
        <DashboardHeader />
        <MetricsGrid />
        <DashboardFooter />
      </DashboardContainer>
    </DashboardProvider>
  );
}

export default withErrorBoundary(DivineImpactDashboard, {
  componentName: "Divine Impact Dashboard",
  id: "divine-impact-dashboard",
});
