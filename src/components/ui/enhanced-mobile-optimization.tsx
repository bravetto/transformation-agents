"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  Battery,
  Signal,
  TouchpadIcon as Touch,
  Eye,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

// Mobile Optimization Standards (2024)
interface MobileOptimizationConfig {
  viewport: {
    width: "device-width";
    initialScale: 1;
    maximumScale: 5;
    userScalable: boolean;
  };
  performance: {
    targetLCP: number; // ms
    targetFID: number; // ms
    targetCLS: number; // score
    targetINP: number; // ms (new 2024 metric)
  };
  touchTargets: {
    minimumSize: number; // px
    spacing: number; // px
    thumbZone: string; // CSS area
  };
  typography: {
    minimumFontSize: number; // px
    lineHeight: number;
    contrast: number; // ratio
  };
  images: {
    formats: string[];
    sizes: string[];
    lazyLoading: boolean;
    webP: boolean;
  };
}

// Device Breakpoints (2024 Standards)
const DEVICE_BREAKPOINTS = {
  mobile: { min: 320, max: 767, label: "Mobile" },
  tablet: { min: 768, max: 1023, label: "Tablet" },
  desktop: { min: 1024, max: Infinity, label: "Desktop" },
};

// Mobile Performance Metrics
interface PerformanceMetrics {
  deviceType: "mobile" | "tablet" | "desktop";
  connectionType: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "wifi";
  screenSize: { width: number; height: number };
  pixelRatio: number;
  touchSupport: boolean;
  orientation: "portrait" | "landscape";
  batteryLevel?: number;
  memoryInfo?: any;
}

interface MobileOptimizationProps {
  enableRealTimeOptimization?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableAccessibilityChecks?: boolean;
  customBreakpoints?: typeof DEVICE_BREAKPOINTS;
  onOptimizationUpdate?: (metrics: PerformanceMetrics) => void;
}

export default function EnhancedMobileOptimization({
  enableRealTimeOptimization = true,
  enablePerformanceMonitoring = true,
  enableAccessibilityChecks = true,
  customBreakpoints = DEVICE_BREAKPOINTS,
  onOptimizationUpdate,
}: MobileOptimizationProps) {
  const [deviceMetrics, setDeviceMetrics] = useState<PerformanceMetrics | null>(
    null,
  );
  const [optimizationStatus, setOptimizationStatus] = useState<
    "loading" | "optimized" | "needs-attention"
  >("loading");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Default Mobile Optimization Configuration
  const defaultConfig: MobileOptimizationConfig = {
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    performance: {
      targetLCP: 2500, // 2.5s for mobile
      targetFID: 100, // 100ms
      targetCLS: 0.1, // 0.1 score
      targetINP: 200, // 200ms (2024 standard)
    },
    touchTargets: {
      minimumSize: 44, // 44px minimum for accessibility
      spacing: 8, // 8px spacing between targets
      thumbZone: "bottom 25%", // Optimal thumb reach area
    },
    typography: {
      minimumFontSize: 16, // 16px minimum for readability
      lineHeight: 1.5, // 1.5 line height
      contrast: 4.5, // WCAG AA contrast ratio
    },
    images: {
      formats: ["webp", "avif", "jpg"],
      sizes: ["320w", "640w", "1024w", "1280w"],
      lazyLoading: true,
      webP: true,
    },
  };

  // Detect device capabilities and metrics
  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectDeviceMetrics = (): PerformanceMetrics => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Determine device type based on screen size
      let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
      if (width <= customBreakpoints.mobile.max) {
        deviceType = "mobile";
      } else if (width <= customBreakpoints.tablet.max) {
        deviceType = "tablet";
      }

      // Detect connection type
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      let connectionType: PerformanceMetrics["connectionType"] = "wifi";
      if (connection) {
        const effectiveType = connection.effectiveType;
        connectionType = effectiveType || "wifi";
      }

      // Detect orientation
      const orientation = height > width ? "portrait" : "landscape";

      // Detect touch support
      const touchSupport =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Get pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;

      // Battery API (if available)
      let batteryLevel: number | undefined;
      if ("getBattery" in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          batteryLevel = battery.level * 100;
        });
      }

      // Memory info (Chrome only)
      const memoryInfo = (performance as any).memory;

      return {
        deviceType,
        connectionType,
        screenSize: { width, height },
        pixelRatio,
        touchSupport,
        orientation,
        batteryLevel,
        memoryInfo,
      };
    };

    const metrics = detectDeviceMetrics();
    setDeviceMetrics(metrics);

    // Generate recommendations based on device metrics
    const generateRecommendations = (metrics: PerformanceMetrics): string[] => {
      const recs: string[] = [];

      if (metrics.deviceType === "mobile") {
        if (
          metrics.connectionType === "slow-2g" ||
          metrics.connectionType === "2g"
        ) {
          recs.push(
            "Optimize for slow connections: Enable aggressive image compression",
          );
          recs.push("Implement critical CSS inlining for faster rendering");
          recs.push("Use service worker for offline functionality");
        }

        if (metrics.pixelRatio > 2) {
          recs.push("High-DPI display detected: Serve @2x or @3x images");
        }

        if (!metrics.touchSupport) {
          recs.push(
            "Touch support not detected: Ensure hover states work properly",
          );
        }

        if (metrics.screenSize.width < 375) {
          recs.push("Small screen detected: Increase touch target sizes");
          recs.push("Simplify navigation for narrow screens");
        }
      }

      if (metrics.batteryLevel && metrics.batteryLevel < 20) {
        recs.push(
          "Low battery detected: Reduce animations and background processes",
        );
      }

      return recs;
    };

    const recs = generateRecommendations(metrics);
    setRecommendations(recs);

    // Determine optimization status
    if (recs.length === 0) {
      setOptimizationStatus("optimized");
    } else if (recs.length <= 2) {
      setOptimizationStatus("needs-attention");
    } else {
      setOptimizationStatus("needs-attention");
    }

    // Call callback if provided
    if (onOptimizationUpdate) {
      onOptimizationUpdate(metrics);
    }

    // Listen for resize and orientation changes
    const handleResize = () => {
      const newMetrics = detectDeviceMetrics();
      setDeviceMetrics(newMetrics);
      if (onOptimizationUpdate) {
        onOptimizationUpdate(newMetrics);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [customBreakpoints, onOptimizationUpdate]);

  // Apply real-time optimizations
  useEffect(() => {
    if (!enableRealTimeOptimization || !deviceMetrics) return;

    // Apply mobile-specific optimizations
    if (deviceMetrics.deviceType === "mobile") {
      // Disable hover effects on touch devices
      if (deviceMetrics.touchSupport) {
        document.documentElement.classList.add("touch-device");
      }

      // Optimize for slow connections
      if (
        deviceMetrics.connectionType === "slow-2g" ||
        deviceMetrics.connectionType === "2g"
      ) {
        document.documentElement.classList.add("slow-connection");
      }

      // Optimize for battery
      if (deviceMetrics.batteryLevel && deviceMetrics.batteryLevel < 20) {
        document.documentElement.classList.add("low-battery");
      }
    }

    return () => {
      document.documentElement.classList.remove(
        "touch-device",
        "slow-connection",
        "low-battery",
      );
    };
  }, [enableRealTimeOptimization, deviceMetrics]);

  if (!deviceMetrics) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Analyzing mobile optimization...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getDeviceIcon = () => {
    switch (deviceMetrics.deviceType) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getConnectionIcon = () => {
    const type = deviceMetrics.connectionType;
    if (type === "wifi") return <Wifi className="h-4 w-4" />;
    if (type === "5g" || type === "4g")
      return <Signal className="h-4 w-4 text-green-600" />;
    if (type === "3g") return <Signal className="h-4 w-4 text-yellow-600" />;
    return <Signal className="h-4 w-4 text-red-600" />;
  };

  const getStatusColor = () => {
    switch (optimizationStatus) {
      case "optimized":
        return "text-green-600 bg-green-50 border-green-200";
      case "needs-attention":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (optimizationStatus) {
      case "optimized":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "needs-attention":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              {getDeviceIcon()}
              <span>Mobile Optimization Status</span>
            </CardTitle>
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor()}`}
            >
              {getStatusIcon()}
              <span className="text-sm font-medium capitalize">
                {optimizationStatus.replace("-", " ")}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Device Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {getDeviceIcon()}
                <span>Device</span>
              </div>
              <div className="font-medium capitalize">
                {deviceMetrics.deviceType}
              </div>
              <div className="text-xs text-gray-500">
                {deviceMetrics.screenSize.width} ×{" "}
                {deviceMetrics.screenSize.height}
              </div>
            </div>

            {/* Connection */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {getConnectionIcon()}
                <span>Connection</span>
              </div>
              <div className="font-medium uppercase">
                {deviceMetrics.connectionType}
              </div>
              <div className="text-xs text-gray-500">Network type</div>
            </div>

            {/* Touch Support */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Touch className="h-4 w-4" />
                <span>Touch</span>
              </div>
              <div className="font-medium">
                {deviceMetrics.touchSupport ? "Supported" : "Not Supported"}
              </div>
              <div className="text-xs text-gray-500">Touch capability</div>
            </div>

            {/* Orientation */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye className="h-4 w-4" />
                <span>Orientation</span>
              </div>
              <div className="font-medium capitalize">
                {deviceMetrics.orientation}
              </div>
              <div className="text-xs text-gray-500">Screen orientation</div>
            </div>
          </div>

          {/* Battery Level (if available) */}
          {deviceMetrics.batteryLevel && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Battery className="h-4 w-4" />
                <span>Battery Level</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      deviceMetrics.batteryLevel > 50
                        ? "bg-green-500"
                        : deviceMetrics.batteryLevel > 20
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${deviceMetrics.batteryLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {Math.round(deviceMetrics.batteryLevel)}%
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Optimization Recommendations</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-yellow-800">
                    {recommendation}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile Optimization Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>2024 Mobile Optimization Standards</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Targets */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">
                Performance Targets
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Largest Contentful Paint (LCP)
                  </span>
                  <Badge variant="outline">&lt; 2.5s</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Interaction to Next Paint (INP)
                  </span>
                  <Badge variant="outline">&lt; 200ms</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Cumulative Layout Shift (CLS)
                  </span>
                  <Badge variant="outline">&lt; 0.1</Badge>
                </div>
              </div>
            </div>

            {/* Design Standards */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Design Standards</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Minimum Touch Target
                  </span>
                  <Badge variant="outline">44px</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Minimum Font Size
                  </span>
                  <Badge variant="outline">16px</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Contrast Ratio</span>
                  <Badge variant="outline">4.5:1</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://pagespeed.web.dev/", "_blank")
                }
              >
                Test Page Speed
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://search.google.com/test/mobile-friendly",
                    "_blank",
                  )
                }
              >
                Mobile-Friendly Test
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://wave.webaim.org/", "_blank")
                }
              >
                Accessibility Check
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
