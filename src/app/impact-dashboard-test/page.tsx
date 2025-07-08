"use client";

import React, { useState } from "react";
import { DivineImpactDashboard } from "@/components/divine-impact-dashboard";
import TestimonialFeed from "@/components/testimonial-feed";
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
            THE BRIDGE PROJECT
          </span>
        </Heading>
        <Text className="max-w-3xl mx-auto">
          Where Tony & Lauren Dungy Lead a Nation Back to Justice, Powered by
          Bravëtto
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
        className="mb-8"
      />

      {/* Testimonial feed */}
      <TestimonialFeed refreshInterval={7000} className="max-w-2xl mx-auto" />

      {/* Footer with attribution */}
      <div className="mt-8 text-center text-sm text-gray-500">
        Powered by Bravëtto | Methodology by The Greatness Zone®
      </div>
    </Container>
  );
}
