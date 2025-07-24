"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Share2,
  Target,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Calendar,
  Zap,
  Activity,
  Signal,
} from "lucide-react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface ImpactMetrics {
  totalSupporters: number;
  lettersWritten: number;
  socialShares: number;
  goalProgress: number;
  prayersSubmitted: number;
  recentActivity: ActivityItem[];
  dailyGrowth: {
    supporters: number;
    letters: number;
    shares: number;
  };
  timeUntilCourt: {
    days: number;
    hours: number;
    minutes: number;
  };
}

interface ActivityItem {
  id: string;
  type: "letter" | "prayer" | "share" | "supporter";
  user: string;
  location: string;
  timestamp: string;
  message: string;
}

interface RealTimeImpactProps {
  className?: string;
  updateInterval?: number;
}

function RealTimeImpactCore({
  className,
  updateInterval = 5000,
}: RealTimeImpactProps) {
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    totalSupporters: 5247,
    lettersWritten: 342,
    socialShares: 1856,
    goalProgress: 34.2,
    prayersSubmitted: 2891,
    recentActivity: [],
    dailyGrowth: {
      supporters: 47,
      letters: 23,
      shares: 89,
    },
    timeUntilCourt: {
      days: 0,
      hours: 0,
      minutes: 0,
    },
  });

  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");

  // Calculate time until court date
  const calculateTimeUntilCourt = useCallback(() => {
    const courtDate = new Date("2025-07-28T14:37:00"); // July 28, 2025, 2:37 PM
    const now = new Date();
    const timeDiff = courtDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  }, []);

  // WebSocket connection with fallback
  useEffect(() => {
    let ws: WebSocket | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      try {
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setConnectionStatus("connected");
          setIsConnected(true);
          console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setMetrics((prev) => ({
              ...prev,
              ...data,
              timeUntilCourt: calculateTimeUntilCourt(),
            }));
            setLastUpdate(new Date());
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onclose = () => {
          setConnectionStatus("disconnected");
          setIsConnected(false);
          console.log("WebSocket disconnected");

          // Attempt to reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setConnectionStatus("disconnected");
          setIsConnected(false);
        };
      } catch (error) {
        console.error("Failed to connect WebSocket:", error);
        setConnectionStatus("disconnected");
        setIsConnected(false);
      }
    };

    // Fallback polling mechanism
    const startPolling = () => {
      pollInterval = setInterval(async () => {
        try {
          const response = await fetch("/api/impact/metrics");
          if (response.ok) {
            const data = await response.json();
            setMetrics((prev) => ({
              ...prev,
              ...data,
              timeUntilCourt: calculateTimeUntilCourt(),
            }));
            setLastUpdate(new Date());
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, updateInterval);
    };

    // Try WebSocket first, fall back to polling
    connectWebSocket();

    // Start polling as backup
    const pollTimeout = setTimeout(() => {
      if (!isConnected) {
        startPolling();
      }
    }, 3000);

    // Update court countdown every minute
    const countdownInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        timeUntilCourt: calculateTimeUntilCourt(),
      }));
    }, 60000);

    return () => {
      if (ws) {
        ws.close();
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      clearTimeout(pollTimeout);
      clearInterval(countdownInterval);
    };
  }, [updateInterval, isConnected, calculateTimeUntilCourt]);

  // Track component interaction
  const handleMetricClick = useCallback((metricType: string, value: number) => {
    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "secondary",
      metadata: {
        component: "RealTimeImpact",
        metric: metricType,
        value: value,
      },
    });
  }, []);

  const impactCards = [
    {
      icon: Users,
      label: "Total Supporters",
      value: metrics.totalSupporters.toLocaleString(),
      growth: `+${metrics.dailyGrowth.supporters} today`,
      color: "text-elite-justice-indigo",
      bgColor: "bg-elite-justice-indigo/10",
      onClick: () => handleMetricClick("supporters", metrics.totalSupporters),
    },
    {
      icon: FileText,
      label: "Letters Written",
      value: metrics.lettersWritten.toLocaleString(),
      growth: `+${metrics.dailyGrowth.letters} today`,
      color: "text-elite-divine-amber",
      bgColor: "bg-elite-divine-amber/10",
      onClick: () => handleMetricClick("letters", metrics.lettersWritten),
    },
    {
      icon: Share2,
      label: "Social Shares",
      value: metrics.socialShares.toLocaleString(),
      growth: `+${metrics.dailyGrowth.shares} today`,
      color: "text-elite-emerald",
      bgColor: "bg-elite-emerald/10",
      onClick: () => handleMetricClick("shares", metrics.socialShares),
    },
    {
      icon: Heart,
      label: "Prayers Submitted",
      value: metrics.prayersSubmitted.toLocaleString(),
      growth: "Divine support",
      color: "text-elite-sacred-violet",
      bgColor: "bg-elite-sacred-violet/10",
      onClick: () => handleMetricClick("prayers", metrics.prayersSubmitted),
    },
  ];

  return (
    <div className={className}>
      {/* Connection Status */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Live Impact Dashboard</h2>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-500"
                : connectionStatus === "connecting"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          />
          <span className="text-sm text-muted-foreground capitalize">
            {connectionStatus}
          </span>
          <Badge variant="outline" className="text-xs">
            {isConnected ? "Live" : "Cached"}
          </Badge>
        </div>
      </div>

      {/* Court Date Countdown */}
      <Card className="mb-6 bg-gradient-to-r from-elite-crimson-urgency/10 to-elite-divine-amber/10 border-elite-crimson-urgency/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-elite-crimson-urgency" />
              <div>
                <h3 className="text-lg font-semibold">Time Until Court Date</h3>
                <p className="text-sm text-muted-foreground">
                  July 28, 2025 at 2:37 PM
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-elite-crimson-urgency">
                {metrics.timeUntilCourt.days}d {metrics.timeUntilCourt.hours}h{" "}
                {metrics.timeUntilCourt.minutes}m
              </div>
              <p className="text-sm text-muted-foreground">
                Every moment counts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {impactCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden"
              onClick={card.onClick}
            >
              <div className={`absolute inset-0 ${card.bgColor} opacity-50`} />
              <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <card.icon className={`w-8 h-8 ${card.color} mb-2`} />
                    <p className="text-3xl font-bold">{card.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.label}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {card.growth}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Goal Progress */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-elite-crimson-urgency" />
              <CardTitle>Campaign Goal Progress</CardTitle>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">
                {metrics.goalProgress.toFixed(1)}%
              </span>
              <p className="text-sm text-muted-foreground">
                of 10,000 supporters
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={metrics.goalProgress} className="h-4 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{metrics.totalSupporters.toLocaleString()} supporters</span>
            <span>
              {(10000 - metrics.totalSupporters).toLocaleString()} needed
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Live Activity Feed
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Updated {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="popLayout">
            {metrics.recentActivity.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {metrics.recentActivity.slice(0, 10).map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`p-1 rounded-full ${
                        activity.type === "letter"
                          ? "bg-elite-divine-amber/20"
                          : activity.type === "prayer"
                            ? "bg-elite-sacred-violet/20"
                            : activity.type === "share"
                              ? "bg-elite-emerald/20"
                              : "bg-elite-justice-indigo/20"
                      }`}
                    >
                      {activity.type === "letter" && (
                        <FileText className="w-4 h-4 text-elite-divine-amber" />
                      )}
                      {activity.type === "prayer" && (
                        <Heart className="w-4 h-4 text-elite-sacred-violet" />
                      )}
                      {activity.type === "share" && (
                        <Share2 className="w-4 h-4 text-elite-emerald" />
                      )}
                      {activity.type === "supporter" && (
                        <Users className="w-4 h-4 text-elite-justice-indigo" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{activity.location}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity to display</p>
                <p className="text-sm">
                  Activity will appear here as supporters engage
                </p>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

export const RealTimeImpact = withDivineErrorBoundary(RealTimeImpactCore, {
  componentName: "RealTimeImpact",
  role: "messenger",
  fallback: (
    <Card className="p-6">
      <div className="text-center">
        <Signal className="w-8 h-8 text-amber-500 mx-auto mb-4" />
        <h3 className="font-semibold mb-2">
          Impact Dashboard Temporarily Unavailable
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          We're experiencing connectivity issues. Please refresh the page to try
          again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-elite-justice-indigo text-white rounded-lg hover:bg-elite-justice-indigo/90 transition-colors"
        >
          Refresh Dashboard
        </button>
      </div>
    </Card>
  ),
});
