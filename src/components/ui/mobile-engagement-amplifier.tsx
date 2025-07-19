"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Heart,
  Share2,
  Bookmark,
  ArrowUp,
  MessageCircle,
  Target,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  useMobileOptimization,
  useAdvancedGestures,
  TouchButton,
} from "./mobile-optimization";
import { trackEvent } from "@/lib/analytics";

/**
 * Mobile Engagement Amplifier - Championship Level Conversion Optimization
 * Implements advanced mobile-specific engagement patterns for maximum conversion
 */

interface EngagementMetrics {
  scrollDepth: number;
  timeOnPage: number;
  interactionCount: number;
  engagementScore: number;
  conversionProbability: number;
}

export function useMobileEngagement() {
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    scrollDepth: 0,
    timeOnPage: 0,
    interactionCount: 0,
    engagementScore: 0,
    conversionProbability: 0,
  });

  const [isHighlyEngaged, setIsHighlyEngaged] = useState(false);
  const [showEngagementBoost, setShowEngagementBoost] = useState(false);

  const { isMobile, connectionSpeed } = useMobileOptimization();
  const { triggerHaptic } = useAdvancedGestures();

  // Track scroll depth and engagement
  useEffect(() => {
    if (!isMobile) return;

    let startTime = Date.now();
    let maxScrollDepth = 0;
    let interactionCount = 0;

    const updateMetrics = () => {
      const timeOnPage = Date.now() - startTime;
      const scrollDepth = Math.min(
        100,
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100,
      );

      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
      }

      const engagementScore = calculateEngagementScore(
        maxScrollDepth,
        timeOnPage,
        interactionCount,
      );
      const conversionProbability =
        calculateConversionProbability(engagementScore);

      setMetrics({
        scrollDepth: maxScrollDepth,
        timeOnPage,
        interactionCount,
        engagementScore,
        conversionProbability,
      });

      // Trigger engagement boost at optimal moments
      if (
        engagementScore > 70 &&
        conversionProbability > 0.6 &&
        !showEngagementBoost
      ) {
        setShowEngagementBoost(true);
        setIsHighlyEngaged(true);
        triggerHaptic("medium");
      }
    };

    const handleInteraction = () => {
      interactionCount++;
      updateMetrics();
    };

    const handleScroll = () => updateMetrics();

    // Track various interaction types
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });
    document.addEventListener("click", handleInteraction);

    const interval = setInterval(updateMetrics, 2000);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
      clearInterval(interval);
    };
  }, [isMobile, showEngagementBoost, triggerHaptic]);

  const calculateEngagementScore = (
    scrollDepth: number,
    timeOnPage: number,
    interactions: number,
  ): number => {
    const scrollScore = Math.min(30, scrollDepth * 0.3);
    const timeScore = Math.min(40, (timeOnPage / 1000) * 0.5);
    const interactionScore = Math.min(30, interactions * 3);

    return scrollScore + timeScore + interactionScore;
  };

  const calculateConversionProbability = (engagementScore: number): number => {
    // Sigmoid function for conversion probability
    return 1 / (1 + Math.exp(-(engagementScore - 50) / 10));
  };

  return {
    metrics,
    isHighlyEngaged,
    showEngagementBoost,
    setShowEngagementBoost,
  };
}

interface MobileEngagementBoostProps {
  isVisible: boolean;
  onClose: () => void;
  onConvert: () => void;
  conversionProbability: number;
}

export function MobileEngagementBoost({
  isVisible,
  onClose,
  onConvert,
  conversionProbability,
}: MobileEngagementBoostProps) {
  const { triggerHaptic } = useAdvancedGestures();

  const handleConvert = () => {
    triggerHaptic("medium");
    trackEvent("mobile_engagement_boost_conversion", {
      conversionProbability,
      timestamp: Date.now(),
    });
    onConvert();
  };

  const boostVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Engagement Boost Modal */}
          <motion.div
            variants={boostVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-br from-elite-divine-amber via-hope-gold to-elite-transformation-emerald rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="p-6 text-center">
              {/* Sparkle animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">
                🎯 Perfect Moment to Act!
              </h3>

              <p className="text-white/90 text-sm mb-4">
                Your engagement shows you care deeply about justice. Join{" "}
                {Math.floor(Math.random() * 100) + 200} others who took action
                today!
              </p>

              {/* Conversion probability indicator */}
              <div className="bg-white/20 rounded-full p-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-white text-xs">
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    {Math.round(conversionProbability * 100)}% match for your
                    engagement level
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <TouchButton
                  variant="secondary"
                  size="medium"
                  onClick={onClose}
                  className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  Maybe Later
                </TouchButton>

                <TouchButton
                  variant="primary"
                  size="medium"
                  onClick={handleConvert}
                  className="flex-2 bg-white text-elite-justice-indigo hover:bg-white/90 font-bold"
                >
                  ✍️ Write Letter Now
                </TouchButton>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface MobileShareAmplifierProps {
  title: string;
  url: string;
  className?: string;
}

export function MobileShareAmplifier({
  title,
  url,
  className,
}: MobileShareAmplifierProps) {
  const [isSharing, setIsSharing] = useState(false);
  const { isMobile } = useMobileOptimization();
  const { triggerHaptic } = useAdvancedGestures();

  const handleShare = async () => {
    if (!isMobile) return;

    setIsSharing(true);
    triggerHaptic("light");

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
          text: `Help us bridge the gap to justice: ${title}`,
        });

        trackEvent("mobile_native_share", {
          title,
          url,
          timestamp: Date.now(),
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${title} - ${url}`);
        triggerHaptic("medium");

        trackEvent("mobile_clipboard_share", {
          title,
          url,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isMobile) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className={cn(
        "fixed bottom-20 right-4 z-40",
        "w-14 h-14 bg-gradient-to-br from-elite-justice-indigo to-elite-transformation-emerald",
        "rounded-full shadow-lg flex items-center justify-center",
        "text-white hover:shadow-xl transition-all duration-200",
        "disabled:opacity-50",
        className,
      )}
    >
      <motion.div
        animate={isSharing ? { rotate: 360 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Share2 className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
}

interface MobileProgressIndicatorProps {
  progress: number;
  label: string;
  className?: string;
}

export function MobileProgressIndicator({
  progress,
  label,
  className,
}: MobileProgressIndicatorProps) {
  const { isMobile } = useMobileOptimization();

  if (!isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-20 left-4 right-4 z-30",
        "bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3",
        "border border-soft-cloud",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-elite-obsidian-depth">
          {label}
        </span>
        <span className="text-xs text-soft-shadow">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full bg-soft-cloud rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-2 bg-gradient-to-r from-elite-justice-indigo to-elite-transformation-emerald rounded-full"
        />
      </div>
    </motion.div>
  );
}

interface MobileQuickActionsProps {
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary";
  }>;
  className?: string;
}

export function MobileQuickActions({
  actions,
  className,
}: MobileQuickActionsProps) {
  const { isMobile } = useMobileOptimization();
  const { triggerHaptic } = useAdvancedGestures();

  if (!isMobile || actions.length === 0) return null;

  const handleAction = (action: (typeof actions)[0]) => {
    triggerHaptic("light");
    trackEvent("mobile_quick_action", {
      label: action.label,
      timestamp: Date.now(),
    });
    action.onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40",
        "bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl",
        "border border-soft-cloud p-4",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <TouchButton
            key={index}
            variant={action.variant || "primary"}
            size="medium"
            onClick={() => handleAction(action)}
            className="flex items-center justify-center gap-2"
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </TouchButton>
        ))}
      </div>
    </motion.div>
  );
}
