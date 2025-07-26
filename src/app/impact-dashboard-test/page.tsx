"use client";

import React, { useState } from "react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
// DivineImpactDashboard removed for hydration stability
// DivineParticles removed for hydration stability
// DivineRole type removed with divine-impact-dashboard
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";

export default function ImpactDashboardTest() {
  const [role, setRole] = useState<
    "lightworker" | "messenger" | "witness" | "guardian"
  >("messenger");
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

      {/* Static Dashboard Preview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Static Impact Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-sm text-gray-600">Community Supporters</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">842</div>
            <div className="text-sm text-gray-600">Prayers Submitted</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Character Letters</div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          Static preview - hydration safe implementation
        </div>
      </div>

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
