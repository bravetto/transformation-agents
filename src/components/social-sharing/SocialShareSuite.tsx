"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  BarChart3,
  Target,
  Users,
  Zap,
  Heart,
  Timer,
  TrendingUp,
  Eye,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SocialShareButton from "./SocialShareButton";
import {
  SocialShareSuiteProps,
  SocialPlatform,
  PLATFORM_CONFIGS,
} from "@/types/social-sharing";
import { useSocialSharing } from "@/lib/hooks/useSocialSharing";
import { getCurrentUserType } from "@/lib/analytics/user-journey";

/**
 * 🌟 SOCIAL SHARE SUITE
 * Complete social sharing solution with viral optimization
 */
const SocialShareSuite: React.FC<SocialShareSuiteProps> = ({
  content,
  platforms,
  excludePlatforms = [],
  layout = "horizontal",
  showLabels = true,
  showCounts = false,
  compactMode = false,
  abTestGroup,
  enableAbTesting = true,
  showPrayerCall = false,
  showUrgency = false,
  highlightFreedomMission = false,
  trackViralCoefficient = true,
  trackEngagement = true,
  customStyles,
  customMessages,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(!compactMode);
  const [shareMetrics, setShareMetrics] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const {
    shareCount,
    viralCoefficient,
    engagementRate,
    getAbTestVariant,
    getPlatformRecommendations,
    getOptimalShareTime,
    isSharing,
  } = useSocialSharing(content);

  const userType = getCurrentUserType();

  // Determine which platforms to show
  const activePlatforms: SocialPlatform[] = useMemo(() => {
    let platformList: SocialPlatform[] =
      platforms || getPlatformRecommendations(userType);

    // Remove excluded platforms
    platformList = platformList.filter((p) => !excludePlatforms.includes(p));

    // Ensure copy-link is always included
    if (!platformList.includes("copy-link")) {
      platformList.push("copy-link");
    }

    // Limit platforms in compact mode
    if (compactMode && platformList.length > 4) {
      platformList = platformList.slice(0, 3).concat(["copy-link"]);
    }

    return platformList;
  }, [
    platforms,
    excludePlatforms,
    getPlatformRecommendations,
    userType,
    compactMode,
  ]);

  // Get A/B test variants
  const buttonStyleVariant = enableAbTesting
    ? getAbTestVariant("share-button-style-2024")
    : null;
  const messageVariant = enableAbTesting
    ? getAbTestVariant("share-message-urgency-2024")
    : null;

  // Load share metrics
  useEffect(() => {
    const loadMetrics = async () => {
      if (trackViralCoefficient || trackEngagement) {
        // This would fetch real metrics from the API
        setShareMetrics({
          totalShares: shareCount,
          viralCoefficient,
          engagementRate,
          topPlatforms: activePlatforms.slice(0, 3),
        });
      }
    };

    loadMetrics();
  }, [
    shareCount,
    viralCoefficient,
    engagementRate,
    activePlatforms,
    trackViralCoefficient,
    trackEngagement,
  ]);

  // Get urgency level based on content and A/B test
  const getUrgencyLevel = () => {
    if (messageVariant?.urgencyLevel) {
      return messageVariant.urgencyLevel;
    }

    if (showUrgency) {
      if (content.freedomMissionFocus) return "critical";
      if (content.prayerWarriorCall) return "divine";
      return "urgent";
    }

    return "normal";
  };

  // Render share analytics
  const renderAnalytics = () => {
    if (!showAnalytics || !shareMetrics) return null;

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-4 p-4 bg-gray-50 rounded-lg border"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {shareMetrics.totalShares}
            </div>
            <div className="text-sm text-gray-600">Shares</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {shareMetrics.viralCoefficient.toFixed(1)}x
            </div>
            <div className="text-sm text-gray-600">Viral Reach</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {(shareMetrics.engagementRate * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Engagement</div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render prayer warrior call
  const renderPrayerCall = () => {
    if (!showPrayerCall && !content.prayerWarriorCall) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200"
      >
        <div className="flex items-center gap-2 text-purple-800">
          <Sparkles size={16} className="animate-pulse" />
          <span className="font-semibold text-sm">
            🙏 Be a Prayer Warrior - Your Share Activates Divine Intervention
          </span>
        </div>
      </motion.div>
    );
  };

  // Render urgency indicator
  const renderUrgencyIndicator = () => {
    const urgencyLevel = getUrgencyLevel();
    if (urgencyLevel === "normal") return null;

    const urgencyConfig = {
      urgent: { color: "orange", icon: Timer, text: "Urgent: Time-Sensitive" },
      critical: {
        color: "red",
        icon: Zap,
        text: "CRITICAL: July 28th Approaching!",
      },
      divine: {
        color: "purple",
        icon: Sparkles,
        text: "Divine Intervention Needed",
      },
    };

    const config = urgencyConfig[urgencyLevel as keyof typeof urgencyConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "mb-3 p-2 rounded-md flex items-center gap-2 text-sm font-medium",
          urgencyLevel === "urgent" &&
            "bg-orange-100 text-orange-800 border border-orange-200",
          urgencyLevel === "critical" &&
            "bg-red-100 text-red-800 border border-red-200 animate-pulse",
          urgencyLevel === "divine" &&
            "bg-gradient-to-r from-purple-100 to-yellow-100 text-purple-800 border border-purple-200",
        )}
      >
        <IconComponent
          size={16}
          className={urgencyLevel === "divine" ? "animate-pulse" : ""}
        />
        <span>{config.text}</span>
      </motion.div>
    );
  };

  // Render optimal timing suggestion
  const renderOptimalTiming = () => {
    const optimalTime = getOptimalShareTime();
    const isOptimalNow =
      Math.abs(optimalTime.getTime() - Date.now()) < 60 * 60 * 1000; // Within 1 hour

    if (isOptimalNow) return null;

    return (
      <div className="mb-3 p-2 bg-blue-50 rounded-md border border-blue-200">
        <div className="flex items-center gap-2 text-blue-800 text-sm">
          <TrendingUp size={14} />
          <span>
            Optimal share time:{" "}
            {optimalTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  };

  // Render platform buttons
  const renderPlatformButtons = () => {
    const buttonVariant = buttonStyleVariant?.buttonStyle || "icon-text";
    const buttonSize = compactMode ? "sm" : "md";
    const urgencyLevel = getUrgencyLevel();

    return (
      <div
        className={cn(
          "flex gap-3",
          layout === "vertical" && "flex-col",
          layout === "grid" && "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          layout === "horizontal" && "flex-wrap justify-center",
          layout === "floating" &&
            "fixed bottom-6 right-6 z-50 flex-col bg-white rounded-lg shadow-lg p-3 border",
        )}
      >
        {activePlatforms.map((platform, index) => (
          <motion.div
            key={platform}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <SocialShareButton
              platform={platform}
              content={content}
              variant={buttonVariant}
              size={buttonSize}
              urgencyLevel={urgencyLevel}
              prayerCall={showPrayerCall || content.prayerWarriorCall}
              abTestVariant={buttonStyleVariant?.id || undefined}
              trackAnalytics={true}
              className={cn(
                highlightFreedomMission &&
                  content.freedomMissionFocus &&
                  "ring-2 ring-yellow-400 ring-offset-2",
                customStyles?.[platform],
              )}
            />

            {/* Platform label */}
            {showLabels && !compactMode && (
              <div className="text-xs text-gray-600 text-center mt-1">
                {PLATFORM_CONFIGS[platform].name}
              </div>
            )}

            {/* Share count */}
            {showCounts && (
              <div className="text-xs text-blue-600 text-center">
                {Math.floor(Math.random() * 50) + 1} shares
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Render header with expand/collapse
  const renderHeader = () => {
    if (layout === "floating") return null;

    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Share2 size={20} className="text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            {highlightFreedomMission
              ? "🕊️ Spread JAHmere's Story"
              : "Share This Story"}
          </h3>

          {/* Live metrics badges */}
          {shareCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              <Users size={12} className="mr-1" />
              {shareCount} shares
            </Badge>
          )}

          {viralCoefficient > 1.5 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp size={12} className="mr-1" />
              Going Viral!
            </Badge>
          )}
        </div>

        {/* Analytics toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="text-gray-600 hover:text-gray-900"
          >
            <BarChart3 size={16} />
          </Button>

          {compactMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "social-share-suite",
        layout === "floating" && "fixed bottom-6 right-6 z-50",
        className,
      )}
    >
      {layout !== "floating" && (
        <Card className="p-4">
          {renderHeader()}
          {renderPrayerCall()}
          {renderUrgencyIndicator()}
          {renderOptimalTiming()}

          <AnimatePresence>
            {(isExpanded || !compactMode) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {renderPlatformButtons()}
              </motion.div>
            )}
          </AnimatePresence>

          {renderAnalytics()}
        </Card>
      )}

      {layout === "floating" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-lg shadow-lg border p-3"
        >
          <div className="text-sm font-medium text-gray-900 mb-2 text-center">
            Share Story
          </div>
          {renderPlatformButtons()}
        </motion.div>
      )}

      {/* Global loading overlay */}
      <AnimatePresence>
        {isSharing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
              <span className="font-medium">Sharing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShareSuite;
