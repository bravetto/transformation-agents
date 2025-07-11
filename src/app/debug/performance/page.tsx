"use client";

import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Gauge,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,

function PerformanceMonitorPage() {
  const [metrics, setMetrics] = useState({
    memory: { used: 0, total: 0 },
    cpu: 0,
    network: { latency: 0 },
    fps: 0,
  });

  useEffect(() => {
    // Simulate performance metrics
    const interval = setInterval(() => {
      setMetrics({
        memory: {
          used: Math.round(Math.random() * 2048),
          total: 4096,
        },
        cpu: Math.round(Math.random() * 100),
        network: {
          latency: Math.round(Math.random() * 100 + 20),
        },
        fps: Math.round(Math.random() * 20 + 40),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const webVitals = [
    {
      name: "First Contentful Paint",
      value: "1.2s",
      status: "good",
      target: "< 1.8s",
    },
    {
      name: "Largest Contentful Paint",
      value: "2.1s",
      status: "good",
      target: "< 2.5s",
    },
    {
      name: "First Input Delay",
      value: "45ms",
      status: "needs-improvement",
      target: "< 100ms",
    },
    {
      name: "Cumulative Layout Shift",
      value: "0.08",
      status: "good",
      target: "< 0.1",
    },
    {
      name: "Time to Interactive",
      value: "3.5s",
      status: "needs-improvement",
      target: "< 3.8s",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400";
      case "needs-improvement":
        return "text-yellow-400";
      case "poor":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Performance Monitor
      </h1>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Memory</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {metrics.memory.used} MB
          </p>
          <p className="text-sm text-gray-400">of {metrics.memory.total} MB</p>
          <div className="mt-2 bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all"
              style={{
                width: `${(metrics.memory.used / metrics.memory.total) * 100}%`,
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">CPU Usage</h3>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.cpu}%</p>
          <p className="text-sm text-gray-400">Current load</p>
          <div className="mt-2 bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                metrics.cpu > 80
                  ? "bg-red-400"
                  : metrics.cpu > 50
                    ? "bg-yellow-400"
                    : "bg-green-400"
              }`}
              style={{ width: `${metrics.cpu}%` }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Network</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {metrics.network.latency}ms
          </p>
          <p className="text-sm text-gray-400">Latency</p>
        </Card>

        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Frame Rate</h3>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.fps} FPS</p>
          <p className="text-sm text-gray-400">Current render</p>
        </Card>
      </div>

      {/* Web Vitals */}
      <Card className="p-6 bg-gray-800 border-gray-700 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Core Web Vitals
        </h2>
        <div className="space-y-4">
          {webVitals.map((vital) => (
            <div
              key={vital.name}
              className="flex items-center justify-between py-3 border-b border-gray-700"
            >
              <div className="flex items-center gap-3">
                {vital.status === "good" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <p className="text-white font-medium">{vital.name}</p>
                  <p className="text-sm text-gray-400">
                    Target: {vital.target}
                  </p>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${getStatusColor(vital.status)}`}
              >
                {vital.value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Tips */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">
          Performance Recommendations
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Enable lazy loading for images below the fold</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Implement code splitting for route-based chunks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Use Next.js Image component for automatic optimization</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>
              Consider implementing a service worker for offline support
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

export default withDivineErrorBoundary(PerformanceMonitorPage, {
  componentName: "PerformanceMonitorPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading performance monitor
    </div>
  ),
});
