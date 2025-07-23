"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Target,
  MousePointer,
  RefreshCw,
  Activity,
  Zap,
  Heart,
} from "lucide-react";

interface AnalyticsMetrics {
  totalSessions: number;
  modalViewRate: number;
  pathSelectionRate: number;
  averageSessionDuration: number;
  pathDistribution: {
    coach: number;
    judge: number;
    activist: number;
  };
  conversionFunnel: {
    modalViewed: number;
    cardHovered: number;
    pathSelected: number;
    journeyCompleted: number;
  };
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  engagementMetrics: {
    averageHoverTime: number;
    selectionSpeed: number;
    returnVisitors: number;
  };
  realtimeEvents: Array<{
    timestamp: string;
    eventType: string;
    userType: string;
    metadata?: any;
  }>;
}

interface UserJourneyDashboardProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function UserJourneyDashboard({
  autoRefresh = true,
  refreshInterval = 30000,
}: UserJourneyDashboardProps) {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Generate mock metrics for development - moved above useCallback to fix dependency
  const generateMockMetrics = useCallback((): AnalyticsMetrics => {
    return {
      totalSessions: Math.floor(Math.random() * 1000) + 500,
      modalViewRate: 0.85 + Math.random() * 0.15,
      pathSelectionRate: 0.65 + Math.random() * 0.25,
      averageSessionDuration: 2500 + Math.random() * 2000,
      pathDistribution: {
        coach: 0.35 + Math.random() * 0.15,
        judge: 0.25 + Math.random() * 0.15,
        activist: 0.3 + Math.random() * 0.15,
      },
      conversionFunnel: {
        modalViewed: 100,
        cardHovered: 85 + Math.random() * 10,
        pathSelected: 65 + Math.random() * 15,
        journeyCompleted: 45 + Math.random() * 15,
      },
      deviceBreakdown: {
        desktop: 0.6 + Math.random() * 0.2,
        mobile: 0.3 + Math.random() * 0.2,
        tablet: 0.1 + Math.random() * 0.1,
      },
      engagementMetrics: {
        averageHoverTime: 1500 + Math.random() * 1000,
        selectionSpeed: 3000 + Math.random() * 2000,
        returnVisitors: Math.floor(Math.random() * 200) + 50,
      },
      realtimeEvents: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        eventType: ["view", "hover", "click", "selection"][
          Math.floor(Math.random() * 4)
        ],
        userType: ["coach", "judge", "activist"][Math.floor(Math.random() * 3)],
      })),
    };
  }, []);

  // 🛡️ CRITICAL FIX: Wrap fetchAnalytics in useCallback to prevent re-creation
  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analytics/user-journey/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Analytics fetch failed: ${response.status}`);
      }

      const data = await response.json();
      setMetrics(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch analytics",
      );

      // Fallback to mock data for development
      setMetrics(generateMockMetrics());
      setLastUpdate(new Date().toLocaleTimeString() + " (mock)");
    } finally {
      setIsLoading(false);
    }
  }, [generateMockMetrics]); // ✅ FIXED: Include generateMockMetrics in dependencies

  const generateMockEvents = (count: number) => {
    const eventTypes = ["modal_viewed", "card_hovered", "path_selected"];
    const userTypes = ["coach", "judge", "activist", "unknown"];
    const events = [];

    for (let i = 0; i < count; i++) {
      events.push({
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        metadata: {
          deviceType: Math.random() > 0.7 ? "mobile" : "desktop",
          sessionDuration: Math.floor(Math.random() * 5000),
        },
      });
    }

    return events.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchAnalytics();

    if (autoRefresh) {
      const interval = setInterval(fetchAnalytics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchAnalytics]);

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  const getPathColor = (path: string) => {
    switch (path) {
      case "coach":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "judge":
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case "activist":
        return "bg-gradient-to-r from-green-500 to-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "modal_viewed":
        return <Activity className="w-3 h-3" />;
      case "card_hovered":
        return <MousePointer className="w-3 h-3" />;
      case "path_selected":
        return <Target className="w-3 h-3" />;
      default:
        return <Zap className="w-3 h-3" />;
    }
  };

  if (!metrics) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading analytics dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Journey Analytics
          </h1>
          <p className="text-gray-600">
            Three-Path Modal Performance Dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdate}
            </span>
          )}
          <Button
            onClick={fetchAnalytics}
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">⚠️ {error}</p>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">
                  {metrics.totalSessions.toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Modal View Rate</p>
                <p className="text-2xl font-bold">
                  {formatPercentage(metrics.modalViewRate)}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Path Selection</p>
                <p className="text-2xl font-bold">
                  {formatPercentage(metrics.pathSelectionRate)}
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-2xl font-bold">
                  {formatDuration(metrics.averageSessionDuration)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Path Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Path Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(metrics.pathDistribution).map(
              ([path, percentage]) => (
                <div key={path} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="capitalize font-medium">{path}</span>
                    <span className="text-sm text-gray-600">
                      {formatPercentage(percentage)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getPathColor(path)}`}
                      style={{ width: `${percentage * 100}%` }}
                    />
                  </div>
                </div>
              ),
            )}
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(metrics.conversionFunnel).map(
              ([stage, percentage]) => (
                <div key={stage} className="flex items-center justify-between">
                  <span className="capitalize text-sm">
                    {stage.replace(/([A-Z])/g, " $1")}
                  </span>
                  <Badge variant="secondary">{Math.round(percentage)}%</Badge>
                </div>
              ),
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {metrics.realtimeEvents.slice(0, 10).map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  {getEventIcon(event.eventType)}
                  <span className="text-sm font-medium">
                    {event.eventType.replace("_", " ")}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {event.userType}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
