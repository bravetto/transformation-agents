"use client";

import { useState, useEffect } from "react";
import {
  performHealthCheck,
  cascadeDetector,
  type SystemHealth,
  type CascadeError,
} from "@/lib/monitoring/cascade-detector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Activity,
} from "lucide-react";

interface HealthMonitorProps {
  showDebugInfo?: boolean;
}

export function HealthMonitor({ showDebugInfo = false }: HealthMonitorProps) {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [errors, setErrors] = useState<CascadeError[]>([]);
  const [patterns, setPatterns] = useState<
    { pattern: string; count: number; severity: string }[]
  >([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Manual health check function
  const runHealthCheck = async () => {
    setIsChecking(true);
    try {
      const healthData = await performHealthCheck();
      setHealth(healthData);
      setErrors(cascadeDetector.getRecentErrors(20));
      setPatterns(cascadeDetector.detectErrorPatterns());
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setIsChecking(false);
    }
  };

  // Initial health check on mount
  useEffect(() => {
    runHealthCheck();
  }, []);

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!showDebugInfo && process.env.NODE_ENV === "production") {
    return null; // Hide in production unless explicitly shown
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              System Health
            </CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={runHealthCheck}
              disabled={isChecking}
              className="h-8 px-2"
            >
              {isChecking ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
            </Button>
          </div>
          {lastUpdate && (
            <p className="text-xs text-gray-500">Last check: {lastUpdate}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {health && (
            <>
              {/* Webpack Health */}
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-700">Webpack</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.webpack.vendorChunks)}
                    <span>Chunks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.webpack.cacheIntegrity)}
                    <span>Cache</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.webpack.hotReload)}
                    <span>HMR</span>
                  </div>
                </div>
              </div>

              {/* Routes Health */}
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-700">Routes</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.routes.homepage)}
                    <span>Home</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.routes.peoplePages)}
                    <span>People</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.routes.analytics)}
                    <span>API</span>
                  </div>
                </div>
              </div>

              {/* Dependencies Health */}
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-gray-700">
                  Dependencies
                </h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.dependencies.framerMotion)}
                    <span>Framer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.dependencies.nextJs)}
                    <span>Next</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(health.dependencies.react)}
                    <span>React</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Error Patterns */}
          {patterns.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Error Patterns
              </h4>
              <div className="space-y-1">
                {patterns.slice(0, 3).map((pattern, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="truncate flex-1">{pattern.pattern}</span>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {pattern.count}
                      </Badge>
                      <div
                        className={`w-2 h-2 rounded-full ${getSeverityColor(pattern.severity)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Errors */}
          {showDebugInfo && errors.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-gray-700">
                Recent Errors
              </h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {errors.slice(0, 5).map((error, index) => (
                  <div
                    key={index}
                    className="text-xs p-2 bg-gray-50 rounded border"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {error.type}
                      </Badge>
                      <div
                        className={`w-2 h-2 rounded-full ${getSeverityColor(error.severity)}`}
                      />
                    </div>
                    <p className="mt-1 text-gray-600 truncate">
                      {error.message}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(error.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clear Errors Button */}
          {errors.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                cascadeDetector.clearErrors();
                setErrors([]);
                setPatterns([]);
              }}
              className="w-full h-8 text-xs"
            >
              Clear Error Log
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
