"use client";

import React, { useState } from "react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import DivineImpactDashboard from "@/components/divine-impact-dashboard";
import DivineParticles from "@/components/divine-particles";
import { type DivineRole } from "@/lib/design-system";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";

export default function ImpactDashboardTest() {
  const [role, setRole] = useState<DivineRole>("messenger");
  const [refreshInterval, setRefreshInterval] = useState(30000);

  return (
    <Container className="py-10">
      <div className="mb-8 text-center">
        <Heading size="h1" className="mb-4">
          Divine Impact Dashboard
        </Heading>
        <Text className="max-w-3xl mx-auto">
          Real-time visualization of The Bridge Project's community impact and
          growth metrics. This dashboard showcases the project's reach,
          engagement, and momentum in supporting JAHmere.
        </Text>
      </div>

      <div className="mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Default Role:
          </label>
          <div className="flex flex-wrap gap-2">
            {(["lightworker", "messenger", "witness", "guardian"] as const).map(
              (roleOption) => (
                <button
                  key={roleOption}
                  onClick={() => setRole(roleOption)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    role === roleOption
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Refresh Interval:
          </label>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="w-full max-w-xs px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            <option value={5000}>5 seconds (fast demo)</option>
            <option value={15000}>15 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
          </select>
        </div>
      </div>

      {/* The dashboard component */}
      <DivineImpactDashboard
        defaultRole={role}
        refreshInterval={refreshInterval}
        autoRefresh={true}
      />

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <Heading size="h3" className="mb-4">
          About This Dashboard
        </Heading>
        <Text className="mb-3">
          This dashboard visualizes real-time metrics showing the growing
          influence and community support for The Bridge Project. It displays
          key indicators of engagement, reach, and impact.
        </Text>
        <Text className="mb-3">
          <strong>Features:</strong>
        </Text>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Real-time data updates with smooth animations</li>
          <li>
            Role-based filtering (Lightworker, Messenger, Witness, Guardian)
          </li>
          <li>Progress tracking with goals visualization</li>
          <li>Trend indicators showing growth direction</li>
          <li>Divine particles background effects matched to metric roles</li>
        </ul>
        <Text>
          <em>
            Note: For demonstration purposes, the "Refresh" button and
            auto-refresh intervals generate random data changes to simulate
            real-time updates.
          </em>
        </Text>
      </div>
    </Container>
  );
}
