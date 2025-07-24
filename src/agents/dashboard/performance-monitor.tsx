"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";

interface PerformanceMetrics {
  renderCount: number;
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface RenderLoopDetection {
  component: string;
  renderCount: number;
  timeWindow: number;
  status: "normal" | "warning" | "critical";
}

interface SystemMetrics {
  apiResponseTime: number;
  memoryUsage: number;
  activeComponents: number;
  errorCount: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics[]>([]);
  const [renderLoops, setRenderLoops] = useState<RenderLoopDetection[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    apiResponseTime: 7,
    memoryUsage: 0,
    activeComponents: 0,
    errorCount: 0,
  });
  const [isMonitoring, setIsMonitoring] = useState(true);

  const detectRenderLoops = useCallback((metric: PerformanceMetrics) => {
    setRenderLoops((prev) => {
      const existing = prev.find((r) => r.component === metric.componentName);

      if (existing) {
        const updatedCount = existing.renderCount + 1;
        const status =
          updatedCount > 50
            ? "critical"
            : updatedCount > 20
              ? "warning"
              : "normal";

        return prev.map((r) =>
          r.component === metric.componentName
            ? { ...r, renderCount: updatedCount, status }
            : r,
        );
      }

      return [
        ...prev,
        {
          component: metric.componentName,
          renderCount: 1,
          timeWindow: 1000,
          status: "normal",
        },
      ];
    });
  }, []);

  useEffect(() => {
    if (!isMonitoring) return;

    // Set up performance observer
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "measure" && entry.name.includes("render")) {
            const newMetric: PerformanceMetrics = {
              componentName: entry.name.replace("-render", ""),
              renderTime: entry.duration,
              renderCount: 1,
              timestamp: Date.now(),
            };

            setMetrics((prev) => [...prev.slice(-50), newMetric]);
            detectRenderLoops(newMetric);
          }
        }
      });

      observer.observe({ entryTypes: ["measure"] });

      return () => observer.disconnect();
    }

    return undefined;
  }, [isMonitoring, detectRenderLoops]);

  useEffect(() => {
    // Monitor API response times
    const checkApiHealth = async () => {
      const start = performance.now();
      try {
        const response = await fetch("/api/health");
        const duration = performance.now() - start;

        setSystemMetrics((prev) => ({
          ...prev,
          apiResponseTime: Math.round(duration),
          errorCount: response.ok ? prev.errorCount : prev.errorCount + 1,
        }));
      } catch (error) {
        setSystemMetrics((prev) => ({
          ...prev,
          errorCount: prev.errorCount + 1,
        }));
      }
    };

    const interval = setInterval(checkApiHealth, 5000); // Check every 5 seconds
    checkApiHealth(); // Initial check

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Monitor memory usage
    const updateMemoryUsage = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        const usagePercent = Math.round(
          (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
        );
        setSystemMetrics((prev) => ({
          ...prev,
          memoryUsage: usagePercent,
          activeComponents: renderLoops.length,
        }));
      }
    };

    const interval = setInterval(updateMemoryUsage, 2000);
    updateMemoryUsage();

    return () => clearInterval(interval);
  }, [renderLoops.length]);

  const getCriticalComponents = () => {
    return renderLoops.filter((r) => r.status === "critical");
  };

  const getAverageRenderTime = () => {
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, m) => acc + m.renderTime, 0);
    return Math.round(sum / metrics.length);
  };

  const getStatusColor = (
    value: number,
    thresholds: { good: number; warning: number },
  ) => {
    if (value <= thresholds.good) return "text-green-500";
    if (value <= thresholds.warning) return "text-yellow-500";
    return "text-red-500";
  };

  const resetMetrics = () => {
    setMetrics([]);
    setRenderLoops([]);
    setSystemMetrics((prev) => ({ ...prev, errorCount: 0 }));
  };

  return (
    <div className="performance-monitor p-4 space-y-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🚨 Runtime Performance Monitor</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded font-medium ${
              isMonitoring
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </button>
          <button
            onClick={resetMetrics}
            className="px-4 py-2 rounded font-medium bg-gray-500 text-white hover:bg-gray-600"
          >
            Reset Metrics
          </button>
        </div>
      </div>

      {/* Critical Alerts */}
      {getCriticalComponents().length > 0 && (
        <Card className="p-4 border-red-500 bg-red-50">
          <h3 className="text-lg font-bold text-red-700">
            ⚠️ RENDER LOOP DETECTED
          </h3>
          {getCriticalComponents().map((component) => (
            <div key={component.component} className="mt-2">
              <p className="text-red-600">
                <span className="font-semibold">{component.component}</span>:
                {component.renderCount} renders in {component.timeWindow}ms
              </p>
              <p className="text-sm text-red-500">
                💡 Fix: Check for setState in useEffect without dependencies
              </p>
            </div>
          ))}
        </Card>
      )}

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">API Response Time</p>
          <p
            className={`text-2xl font-bold ${getStatusColor(systemMetrics.apiResponseTime, { good: 50, warning: 100 })}`}
          >
            {systemMetrics.apiResponseTime}ms
          </p>
          <p className="text-xs text-gray-400">Target: &lt;50ms</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Avg Render Time</p>
          <p
            className={`text-2xl font-bold ${getStatusColor(getAverageRenderTime(), { good: 16, warning: 33 })}`}
          >
            {getAverageRenderTime()}ms
          </p>
          <p className="text-xs text-gray-400">Target: &lt;16ms (60fps)</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Memory Usage</p>
          <p
            className={`text-2xl font-bold ${getStatusColor(systemMetrics.memoryUsage, { good: 50, warning: 80 })}`}
          >
            {systemMetrics.memoryUsage}%
          </p>
          <p className="text-xs text-gray-400">JS Heap Usage</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-gray-500">Error Count</p>
          <p
            className={`text-2xl font-bold ${systemMetrics.errorCount === 0 ? "text-green-500" : "text-red-500"}`}
          >
            {systemMetrics.errorCount}
          </p>
          <p className="text-xs text-gray-400">Since last reset</p>
        </Card>
      </div>

      {/* Component Health */}
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">🏥 Component Health Status</h3>
        {renderLoops.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {isMonitoring
              ? "No components detected yet..."
              : "Monitoring stopped"}
          </p>
        ) : (
          <div className="space-y-2">
            {renderLoops.map((loop) => (
              <div
                key={loop.component}
                className="flex justify-between items-center p-2 rounded bg-gray-50"
              >
                <span className="font-medium">{loop.component}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {loop.renderCount} renders
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      loop.status === "critical"
                        ? "bg-red-500 text-white"
                        : loop.status === "warning"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    {loop.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Performance Metrics */}
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">
          📊 Recent Performance Metrics
        </h3>
        {metrics.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No metrics recorded yet...
          </p>
        ) : (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {metrics
              .slice(-10)
              .reverse()
              .map((metric, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{metric.componentName}</span>
                  <span
                    className={getStatusColor(metric.renderTime, {
                      good: 16,
                      warning: 33,
                    })}
                  >
                    {metric.renderTime.toFixed(2)}ms
                  </span>
                </div>
              ))}
          </div>
        )}
      </Card>

      {/* Championship Status */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-bold mb-2">🏆 Championship Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Performance Grade</p>
            <p
              className={`text-xl font-bold ${
                systemMetrics.apiResponseTime <= 50 &&
                getAverageRenderTime() <= 16
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {systemMetrics.apiResponseTime <= 50 &&
              getAverageRenderTime() <= 16
                ? "A+"
                : "B"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">System Status</p>
            <p
              className={`text-xl font-bold ${
                getCriticalComponents().length === 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {getCriticalComponents().length === 0 ? "STABLE" : "AT RISK"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
