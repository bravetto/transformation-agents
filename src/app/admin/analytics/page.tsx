"use client";

import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Activity,
  BarChart3,
} from "lucide-react";

function AnalyticsDashboardPage() {
  const stats = [
    { label: "Total Visitors", value: "12,543", icon: Users, change: "+12%" },
    { label: "Page Views", value: "45,291", icon: Eye, change: "+8%" },
    { label: "Avg. Session", value: "3:42", icon: Clock, change: "+15%" },
    {
      label: "Conversion Rate",
      value: "4.2%",
      icon: TrendingUp,
      change: "+2.1%",
    },
  ];

  const topPages = [
    { page: "/", views: 8234, avgTime: "2:15" },
    { page: "/people", views: 5123, avgTime: "4:32" },
    { page: "/contact", views: 3421, avgTime: "1:45" },
    { page: "/story-amplifier-demo", views: 2156, avgTime: "5:18" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Analytics Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Traffic Overview
            </h2>
          </div>
          <div className="h-64 bg-gray-700/30 rounded flex items-center justify-center">
            <p className="text-gray-500">
              Chart placeholder - Integrate with analytics API
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">
              Conversion Funnel
            </h2>
          </div>
          <div className="h-64 bg-gray-700/30 rounded flex items-center justify-center">
            <p className="text-gray-500">Funnel visualization placeholder</p>
          </div>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Top Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Page</th>
                <th className="text-right py-3 px-4 text-gray-400">Views</th>
                <th className="text-right py-3 px-4 text-gray-400">
                  Avg. Time
                </th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page) => (
                <tr key={page.page} className="border-b border-gray-700/50">
                  <td className="py-3 px-4 text-white">{page.page}</td>
                  <td className="py-3 px-4 text-right text-gray-300">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-300">
                    {page.avgTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default withErrorBoundary(AnalyticsDashboardPage, {
  componentName: "AnalyticsDashboardPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading analytics dashboard
    </div>
  ),
});
