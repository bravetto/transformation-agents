"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Shield,
  Cpu,
  Database,
  Network,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

interface SystemHealthMetrics {
  webpack: {
    status: "healthy" | "warning" | "error";
    vendorChunks: number;
    cacheStatus: "active" | "stale" | "failed";
    lastBuild: string;
  };
  routes: {
    status: "healthy" | "warning" | "error";
    activeRoutes: number;
    failedRoutes: string[];
    averageResponseTime: number;
  };
  dependencies: {
    status: "healthy" | "warning" | "error";
    framerMotion: "loaded" | "loading" | "failed";
    nextJs: "stable" | "unstable";
    typescript: "compiled" | "errors";
  };
  memory: {
    usage: number;
    limit: number;
    gcFrequency: number;
  };
  errors: Array<{
    id: string;
    timestamp: string;
    type: "cascade" | "webpack" | "runtime" | "network";
    severity: "low" | "medium" | "high" | "critical";
    message: string;
    component?: string;
    resolved: boolean;
  }>;
}

interface CascadeMonitorProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  minimized?: boolean;
}

function CascadeMonitor({
  className = "",
  autoRefresh = true,
  refreshInterval = 10000,
  minimized = false,
}: CascadeMonitorProps) {
  const [metrics, setMetrics] = useState<SystemHealthMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(!minimized);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Generate mock system health metrics
  const generateHealthMetrics = useCallback((): SystemHealthMetrics => {
    const now = new Date();
    const hasErrors = Math.random() < 0.1; // 10% chance of errors

    return {
      webpack: {
        status: hasErrors ? "warning" : "healthy",
        vendorChunks: 15 + Math.floor(Math.random() * 5),
        cacheStatus: hasErrors ? "stale" : "active",
        lastBuild: new Date(
          now.getTime() - Math.random() * 300000,
        ).toISOString(),
      },
      routes: {
        status: "healthy",
        activeRoutes: 45 + Math.floor(Math.random() * 10),
        failedRoutes: hasErrors ? ["/test-route", "/api/test"] : [],
        averageResponseTime: 120 + Math.random() * 100,
      },
      dependencies: {
        status: "healthy",
        framerMotion: "loaded",
        nextJs: "stable",
        typescript: hasErrors ? "errors" : "compiled",
      },
      memory: {
        usage: 45 + Math.random() * 30,
        limit: 100,
        gcFrequency: 2 + Math.random() * 3,
      },
      errors: hasErrors
        ? [
            {
              id: `error-${Date.now()}`,
              timestamp: now.toISOString(),
              type: "webpack",
              severity: "medium",
              message: "Vendor chunk generation warning detected",
              component: "framer-motion",
              resolved: false,
            },
          ]
        : [],
    };
  }, []);

  // Fetch system health
  const fetchSystemHealth = useCallback(async () => {
    setIsLoading(true);

    try {
      // In production, this would fetch from a real monitoring API
      // For now, simulate with enhanced mock data
      await new Promise((resolve) => setTimeout(resolve, 500));

      const healthData = generateHealthMetrics();
      setMetrics(healthData);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch system health:", error);
      // Fallback to basic metrics
      setMetrics(generateHealthMetrics());
      setLastUpdate(new Date().toLocaleTimeString() + " (fallback)");
    } finally {
      setIsLoading(false);
    }
  }, [generateHealthMetrics]);

  // Auto-refresh effect
  useEffect(() => {
    fetchSystemHealth();

    if (autoRefresh) {
      const interval = setInterval(fetchSystemHealth, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchSystemHealth, autoRefresh, refreshInterval]);

  // Get status color and icon
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "healthy":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bg: "bg-green-50",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          bg: "bg-yellow-50",
        };
      case "error":
        return { icon: XCircle, color: "text-red-500", bg: "bg-red-50" };
      default:
        return { icon: Activity, color: "text-gray-500", bg: "bg-gray-50" };
    }
  };

  const getOverallHealth = () => {
    if (!metrics) return "unknown";

    const statuses = [
      metrics.webpack.status,
      metrics.routes.status,
      metrics.dependencies.status,
    ];

    if (statuses.includes("error")) return "error";
    if (statuses.includes("warning")) return "warning";
    return "healthy";
  };

  if (!metrics) {
    return (
      <div className={cn("fixed bottom-4 left-4 z-50", className)}>
        <Card className="w-80 shadow-lg">
          <CardContent className="p-4 flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
            <span className="text-sm">Initializing cascade monitor...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  const overallHealth = getOverallHealth();
  const healthDisplay = getStatusDisplay(overallHealth);
  const HealthIcon = healthDisplay.icon;

  return (
    <div className={cn("fixed bottom-4 left-4 z-50", className)}>
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-96 shadow-xl border-2 border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Cascade Monitor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        overallHealth === "healthy" ? "default" : "error"
                      }
                      className={cn(
                        "flex items-center gap-1",
                        overallHealth === "healthy" &&
                          "bg-green-100 text-green-800",
                        overallHealth === "warning" &&
                          "bg-yellow-100 text-yellow-800",
                      )}
                    >
                      <HealthIcon className="w-3 h-3" />
                      {overallHealth.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsVisible(false)}
                    >
                      <EyeOff className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {lastUpdate && (
                  <p className="text-xs text-gray-500">
                    Last scan: {lastUpdate}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* System Components */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Webpack Status */}
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      getStatusDisplay(metrics.webpack.status).bg,
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu
                        className={cn(
                          "w-4 h-4",
                          getStatusDisplay(metrics.webpack.status).color,
                        )}
                      />
                      <span className="text-xs font-medium">Webpack</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>Chunks: {metrics.webpack.vendorChunks}</div>
                      <div>Cache: {metrics.webpack.cacheStatus}</div>
                    </div>
                  </div>

                  {/* Routes Status */}
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      getStatusDisplay(metrics.routes.status).bg,
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Network
                        className={cn(
                          "w-4 h-4",
                          getStatusDisplay(metrics.routes.status).color,
                        )}
                      />
                      <span className="text-xs font-medium">Routes</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>Active: {metrics.routes.activeRoutes}</div>
                      <div>
                        Avg: {Math.round(metrics.routes.averageResponseTime)}ms
                      </div>
                    </div>
                  </div>

                  {/* Dependencies Status */}
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      getStatusDisplay(metrics.dependencies.status).bg,
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Database
                        className={cn(
                          "w-4 h-4",
                          getStatusDisplay(metrics.dependencies.status).color,
                        )}
                      />
                      <span className="text-xs font-medium">Deps</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>Motion: {metrics.dependencies.framerMotion}</div>
                      <div>TS: {metrics.dependencies.typescript}</div>
                    </div>
                  </div>
                </div>

                {/* Memory Usage */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-600">
                      {Math.round(metrics.memory.usage)}% of{" "}
                      {metrics.memory.limit}MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metrics.memory.usage}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-2 rounded-full",
                        metrics.memory.usage > 80
                          ? "bg-red-500"
                          : metrics.memory.usage > 60
                            ? "bg-yellow-500"
                            : "bg-green-500",
                      )}
                    />
                  </div>
                </div>

                {/* Active Errors */}
                {metrics.errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-red-800">
                      Active Issues
                    </h4>
                    {metrics.errors.map((error) => (
                      <div
                        key={error.id}
                        className="p-2 bg-red-50 rounded text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="error" className="text-xs">
                            {error.type}
                          </Badge>
                          <span className="text-gray-500">
                            {new Date(error.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-red-800">{error.message}</p>
                        {error.component && (
                          <p className="text-red-600 mt-1">
                            Component: {error.component}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchSystemHealth}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                    ) : (
                      <RefreshCw className="w-3 h-3 mr-1" />
                    )}
                    Scan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      (window.location.href = "/analytics-dashboard")
                    }
                    className="flex-1"
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsVisible(true)}
            className={cn(
              "p-3 rounded-full shadow-lg border-2 transition-all hover:scale-110",
              healthDisplay.bg,
              healthDisplay.color,
              "hover:shadow-xl",
            )}
          >
            <HealthIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withDivineErrorBoundary(CascadeMonitor, {
  componentName: "CascadeMonitor",
  fallback: (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardContent className="p-4 flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm">Monitor temporarily unavailable</span>
        </CardContent>
      </Card>
    </div>
  ),
});
