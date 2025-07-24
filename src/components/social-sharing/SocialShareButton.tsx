"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Users,
  Copy,
  Heart,
  Sparkles,
  Zap,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SocialShareButtonProps,
  PLATFORM_CONFIGS,
} from "@/types/social-sharing";
import { useSocialSharing } from "@/lib/hooks/useSocialSharing";

/**
 * 🚀 SOCIAL SHARE BUTTON
 * Platform-specific sharing with divine enhancement and A/B testing
 */
const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  platform,
  content,
  variant = "icon",
  size = "md",
  theme = "auto",
  trackAnalytics = true,
  abTestVariant,
  position = "inline",
  prayerCall = false,
  urgencyLevel = "normal",
  onShare,
  onError,
  onSuccess,
  ariaLabel,
  customTooltip,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justShared, setJustShared] = useState(false);

  const { shareTooltip, isSharing, shareError, shareSuccess } =
    useSocialSharing(content);

  // Get platform configuration
  const platformConfig = PLATFORM_CONFIGS[platform];

  // Get icon component
  const IconComponent = getIconComponent(platform);

  // Handle share click
  const handleShare = useCallback(async () => {
    try {
      setJustShared(true);
      await shareTooltip(platform);

      if (onShare && trackAnalytics) {
        onShare({
          shareId: `share_${Date.now()}`,
          sessionId: `session_${Date.now()}`,
          timestamp: new Date().toISOString(),
          platform,
          contentType: content.type,
          contentId: content.id,
          userType: "visitor", // This would come from actual user context
          viralLevel: 0,
        });
      }

      if (onSuccess) {
        onSuccess(platform, `share_${Date.now()}`);
      }

      // Reset shared state after animation
      setTimeout(() => setJustShared(false), 3000);
    } catch (error) {
      if (onError) {
        onError(error as Error, platform);
      }
    }
  }, [
    platform,
    shareTooltip,
    content,
    onShare,
    onSuccess,
    onError,
    trackAnalytics,
  ]);

  // Get button text based on variant and A/B test
  const getButtonText = useCallback(() => {
    // Note: abTestVariant handling simplified for type safety

    switch (platform) {
      case "twitter":
        return prayerCall ? "🙏 Tweet Prayer" : "Tweet";
      case "linkedin":
        return "Share Professionally";
      case "facebook":
        return "Share Story";
      case "instagram":
        return "Share Visual";
      case "email":
        return "Email Friends";
      case "whatsapp":
        return "WhatsApp";
      case "telegram":
        return "Telegram";
      case "reddit":
        return "Post to Reddit";
      case "copy-link":
        return "Copy Link";
      default:
        return "Share";
    }
  }, [platform, prayerCall]);

  // Get button style based on urgency and divine features
  const getButtonStyle = useCallback(() => {
    const baseClasses = [
      "relative overflow-hidden transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
    ];

    // Size classes
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
      xl: "h-14 px-8 text-xl",
    };

    // Platform color scheme
    const platformColor = platformConfig.color;

    // Urgency-based styling
    const urgencyStyles = {
      normal: `bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`,
      urgent: `bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-300 shadow-lg`,
      critical: `bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 shadow-xl animate-pulse`,
      divine: `bg-gradient-to-r from-yellow-200 via-purple-200 to-blue-200 hover:from-yellow-300 hover:via-purple-300 hover:to-blue-300 text-purple-800 border border-purple-300 shadow-2xl`,
    };

    // Special divine effects
    const divineClasses =
      urgencyLevel === "divine"
        ? [
            "relative",
            urgencyLevel === "divine" ? "animate-pulse" : "",
            urgencyLevel === "divine" ? "divine-particles" : "",
          ]
        : [];

    return cn(
      baseClasses,
      sizeClasses[size],
      urgencyStyles[urgencyLevel],
      divineClasses,
      isHovered && "scale-105 shadow-lg",
      justShared && "scale-95",
      isSharing && "opacity-50 cursor-not-allowed",
      className,
    );
  }, [
    size,
    urgencyLevel,
    platformConfig,
    isHovered,
    justShared,
    isSharing,
    className,
  ]);

  // Render button content based on variant
  const renderButtonContent = () => {
    const text = getButtonText();
    const showIcon = variant === "icon" || variant === "icon-text";
    const showText = variant === "text" || variant === "icon-text";

    return (
      <div className="flex items-center justify-center gap-2">
        {showIcon && (
          <IconComponent
            size={
              size === "sm" ? 16 : size === "lg" ? 24 : size === "xl" ? 28 : 20
            }
            className={cn(
              "transition-transform duration-200",
              isHovered && "scale-110",
              justShared && "text-green-600",
            )}
          />
        )}

        {showText && (
          <span
            className={cn(
              "font-medium transition-all duration-200",
              size === "sm"
                ? "text-xs"
                : size === "lg"
                  ? "text-base"
                  : size === "xl"
                    ? "text-lg"
                    : "text-sm",
            )}
          >
            {text}
          </span>
        )}

        {/* Divine sparkles effect */}
        {urgencyLevel === "divine" && isHovered && (
          <Sparkles
            size={16}
            className="animate-spin text-yellow-500 absolute top-1 right-1"
          />
        )}

        {/* Success indicator */}
        <AnimatePresence>
          {justShared && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md"
            >
              <Heart size={20} className="text-white fill-current" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        {isSharing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    );
  };

  // Divine particles background effect
  const renderDivineParticles = () => {
    if (urgencyLevel !== "divine") return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
              scale: 0,
            }}
            animate={{
              y: "-20%",
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Button
        onClick={handleShare}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isSharing}
        className={getButtonStyle()}
        aria-label={ariaLabel || `Share on ${platformConfig.name}`}
        title={customTooltip || `Share this content on ${platformConfig.name}`}
      >
        {renderButtonContent()}
        {renderDivineParticles()}
      </Button>

      {/* Prayer warrior badge */}
      {prayerCall && (
        <Badge
          className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-1 py-0 min-w-0 h-5"
          variant="secondary"
        >
          🙏
        </Badge>
      )}

      {/* A/B test reward message */}
      <AnimatePresence>
        {urgencyLevel === "divine" && justShared && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-purple-600 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10"
          >
            Divine share activated! ✨
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-600 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {shareError && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10">
          {shareError}
        </div>
      )}
    </motion.div>
  );
};

/**
 * Get appropriate icon component for platform
 */
function getIconComponent(platform: string) {
  const icons = {
    twitter: Twitter,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    email: Mail,
    whatsapp: MessageCircle,
    telegram: Send,
    reddit: Users,
    "copy-link": Copy,
  };

  return icons[platform as keyof typeof icons] || Share2;
}

export default SocialShareButton;
