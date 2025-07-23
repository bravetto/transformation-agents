"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  SocialPlatform,
  ShareableContent,
  SocialShareAnalytics,
  SocialShareHookReturn,
  ABTestVariant,
  OpenGraphImageConfig,
  PLATFORM_CONFIGS,
  DIVINE_HASHTAGS,
  ShareContentType,
} from "@/types/social-sharing";
import { PersonRole } from "@/types/person";
import {
  UserType,
  getCurrentUserType,
  trackConversion,
} from "@/lib/analytics/user-journey";
import { logger } from "@/lib/logger";

// Local types
interface ShareResult {
  success: boolean;
  platform: SocialPlatform;
  url: string;
  timestamp: number;
}

/**
 * 🚀 SOCIAL SHARING HOOK
 * Complete social sharing functionality with analytics and A/B testing
 */
export function useSocialSharing(content: ShareableContent) {
  // State management
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [viralCoefficient, setViralCoefficient] = useState(1);
  const [engagementRate, setEngagementRate] = useState(0);
  const [abTestVariants, setAbTestVariants] = useState<
    Record<string, ABTestVariant>
  >({});

  // Get current user context
  const userType = getCurrentUserType();
  const sessionId = useMemo(
    () => `session_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    [],
  );

  /**
   * Initialize A/B test variants
   */
  useEffect(() => {
    const initializeAbTests = async () => {
      try {
        // Get A/B test variants for this user and content
        const tests = ["share-button-style-2024", "share-message-urgency-2024"];
        const variants: Record<string, ABTestVariant> = {};

        for (const testId of tests) {
          const response = await fetch(
            `/api/social-share/ab-test?action=getVariant&testId=${testId}&userType=${userType}&contentType=${content.type}`,
          );

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.variant) {
              variants[testId] = data.variant;
            }
          }
        }

        setAbTestVariants(variants);
      } catch (error) {
        logger.error("Failed to initialize A/B tests", { error });
      }
    };

    initializeAbTests();
  }, [content.type, userType]);

  /**
   * Track share event with comprehensive analytics
   */
  const trackShare = useCallback(
    async (analytics: Partial<SocialShareAnalytics>) => {
      try {
        const trackingData = {
          platform: analytics.platform,
          contentType: content.type,
          contentId: content.id,
          userType,
          sessionId,
          shareMethod: "button-click",
          abTestGroup: Object.keys(abTestVariants)[0],
          abTestVariant: Object.values(abTestVariants)[0]?.id,
          prayerWarriorCall: content.prayerWarriorCall,
          spiritualImpact: content.spiritualImpact,
          ...analytics,
        };

        // Track in social share API
        const response = await fetch("/api/social-share/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trackingData),
        });

        if (response.ok) {
          const result = await response.json();

          // Update metrics
          setShareCount((prev) => prev + 1);
          setViralCoefficient(result.analytics?.viralCoefficient || 1);

          // Track A/B test event
          if (trackingData.abTestGroup && trackingData.abTestVariant) {
            trackAbTestEvent(
              trackingData.abTestGroup,
              trackingData.abTestVariant,
              "share",
            );
          }

          logger.analytics("📤 SHARE TRACKED", {
            platform: analytics.platform,
            contentType: content.type,
            shareId: result.shareId,
          });

          return result.shareId;
        }
      } catch (error) {
        logger.error("Failed to track share", { error });
      }

      return null;
    },
    [content, userType, sessionId, abTestVariants],
  );

  /**
   * Share content on social platform with tracking
   */
  const shareContent = useCallback(
    async (
      platform: SocialPlatform,
      customMessage?: string,
    ): Promise<ShareResult | null> => {
      try {
        const shareUrl = generateShareUrl(platform, customMessage);
        setShareCount((prev) => prev + 1);
        setShareSuccess(true);

        // Track the share with enhanced analytics
        trackConversion({
          eventType: "social_shared",
          userType,
          conversionType: "primary",
          metadata: {
            platform,
            url: shareUrl,
            hasCustomMessage: !!customMessage,
            abTestVariant: abTestVariants["share-message-urgency-2024"]?.id,
            sessionId,
            component: "SocialSharing",
          },
        });

        // Open share URL
        if (typeof window !== "undefined") {
          window.open(shareUrl, "_blank", "width=600,height=400");
        }

        return {
          success: true,
          platform,
          url: shareUrl,
          timestamp: Date.now(),
        };
      } catch (error) {
        logger.error("Failed to share content", { error });
      }

      return null;
    },
    [content, userType, sessionId, abTestVariants],
  );

  /**
   * Get default message for platform
   */
  const getDefaultMessage = useCallback(
    (platform: SocialPlatform): string => {
      const platformConfig = PLATFORM_CONFIGS[platform];
      const style = platformConfig.messageStyle;

      const messages = {
        casual: `Check out ${content.title} - ${content.description}`,
        professional: `I wanted to share this important story: ${content.title}. ${content.description}`,
        emotional: `This powerful story touched my heart: ${content.title}. ${content.description} Please share to help spread awareness.`,
        urgent: `🚨 URGENT: ${content.title} - Your share could make a real difference. ${content.description}`,
      };

      return messages[style] || messages.casual;
    },
    [content],
  );

  /**
   * Generate platform-specific share URL
   */
  const generateShareUrl = useCallback(
    (platform: SocialPlatform, customMessage?: string): string => {
      const platformConfig = PLATFORM_CONFIGS[platform];
      const baseUrl = platformConfig.baseUrl;

      // Get effective message (custom, A/B test, or default)
      const abTestVariant = abTestVariants["share-message-urgency-2024"];
      const message =
        customMessage ||
        abTestVariant?.shareMessage ||
        getDefaultMessage(platform);

      const encodedUrl = encodeURIComponent(content.url);
      const encodedMessage = encodeURIComponent(message);

      switch (platform) {
        case "twitter":
          const hashtags = content.hashtags.slice(0, 3).join(",");
          return `${baseUrl}?text=${encodedMessage}&url=${encodedUrl}&hashtags=${hashtags}`;

        case "linkedin":
          return `${baseUrl}?url=${encodedUrl}&title=${encodeURIComponent(content.title)}&summary=${encodedMessage}`;

        case "facebook":
          return `${baseUrl}?u=${encodedUrl}&quote=${encodedMessage}`;

        case "email":
          const subject = encodeURIComponent(content.emailSubject);
          const body = encodeURIComponent(
            `${content.emailBody}\n\n${content.url}`,
          );
          return `${baseUrl}?subject=${subject}&body=${body}`;

        case "whatsapp":
          return `${baseUrl}?text=${encodedMessage} ${encodedUrl}`;

        case "telegram":
          return `${baseUrl}?url=${encodedUrl}&text=${encodedMessage}`;

        case "reddit":
          return `${baseUrl}?url=${encodedUrl}&title=${encodeURIComponent(content.title)}`;

        default:
          return content.url;
      }
    },
    [content, abTestVariants, getDefaultMessage],
  );

  /**
   * Share to specific platform
   */
  const shareTooltip = useCallback(
    async (platform: SocialPlatform, customMessage?: string) => {
      setIsSharing(true);
      setShareError(null);
      setShareSuccess(false);

      try {
        // Track share attempt
        await trackShare({ platform });

        const shareUrl = generateShareUrl(platform, customMessage);

        // Handle different sharing methods
        if (platform === "copy-link") {
          await navigator.clipboard.writeText(content.url);
          setShareSuccess(true);

          // Show success message
          if (window.dispatchEvent) {
            window.dispatchEvent(
              new CustomEvent("toast", {
                detail: {
                  type: "success",
                  message: "🔗 Link copied to clipboard!",
                  duration: 3000,
                },
              }),
            );
          }
        } else if (platform === "instagram") {
          // For Instagram, copy text and open Instagram
          const instagramText = `${content.title}\n\n${content.description}\n\n${content.hashtags.join(" ")}\n\n${content.url}`;
          await navigator.clipboard.writeText(instagramText);

          // Try to open Instagram app or web
          const isMobile = /iPhone|iPad|iPod|Android/i.test(
            navigator.userAgent,
          );
          if (isMobile) {
            window.location.href = "instagram://";
            setTimeout(() => {
              window.open("https://instagram.com", "_blank");
            }, 500);
          } else {
            window.open("https://instagram.com", "_blank");
          }

          setShareSuccess(true);

          if (window.dispatchEvent) {
            window.dispatchEvent(
              new CustomEvent("toast", {
                detail: {
                  type: "success",
                  message: "📸 Text copied! Open Instagram to paste and share.",
                  duration: 5000,
                },
              }),
            );
          }
        } else {
          // Standard web sharing
          if (navigator.share && platform !== "email") {
            // Use native share API if available
            await navigator.share({
              title: content.title,
              text: customMessage || content.description,
              url: content.url,
            });
          } else {
            // Open share URL in new window
            const popup = window.open(
              shareUrl,
              "share",
              "width=600,height=400,scrollbars=yes,resizable=yes",
            );

            // Focus the popup
            if (popup) {
              popup.focus();
            }
          }

          setShareSuccess(true);
        }

        // Special divine tracking for prayer warrior calls
        if (content.prayerWarriorCall) {
          logger.divine("🙏 PRAYER WARRIOR SHARE ACTIVATED!", {
            platform,
            contentId: content.id,
            userType,
            spiritualImpact: content.spiritualImpact || "high",
          });
        }
      } catch (error) {
        setShareError(`Failed to share to ${PLATFORM_CONFIGS[platform].name}`);
        logger.error("Share failed", { platform, error });
      } finally {
        setIsSharing(false);

        // Reset success state after delay
        setTimeout(() => setShareSuccess(false), 3000);
      }
    },
    [content, trackShare, generateShareUrl],
  );

  /**
   * Share via API (for platforms requiring server-side processing)
   */
  const shareViaAPI = useCallback(
    async (
      platform: SocialPlatform,
      customMessage?: string,
    ): Promise<string> => {
      // This would integrate with platform APIs for automated posting
      // For now, fallback to URL-based sharing
      await shareTooltip(platform, customMessage);
      return "api-share-placeholder";
    },
    [shareTooltip],
  );

  /**
   * Copy share link to clipboard
   */
  const copyShareLink = useCallback(async () => {
    await shareTooltip("copy-link");
  }, [shareTooltip]);

  /**
   * Generate Open Graph image for sharing
   */
  const generateOGImage = useCallback(
    async (config: OpenGraphImageConfig): Promise<string> => {
      try {
        const params = new URLSearchParams({
          template: config.template,
          width: config.width.toString(),
          height: config.height.toString(),
          format: config.format,
          title: config.title,
          subtitle: config.subtitle || "",
          description: config.description || "",
          authorName: config.authorName || "",
          authorRole: config.authorRole || "",
          role: config.role || "lightworker",
          primaryColor: config.brandColors.primary,
          secondaryColor: config.brandColors.secondary,
          particles: config.particles ? "true" : "false",
          divineGlow: config.divineGlow ? "true" : "false",
        });

        const imageUrl = `/api/social-share/og-image?${params.toString()}`;
        return imageUrl;
      } catch (error) {
        logger.error("Failed to generate OG image", { error });
        return "/images/fallbacks/og-default.jpg";
      }
    },
    [],
  );

  /**
   * Get share metrics
   */
  const getShareMetrics = useCallback(async (): Promise<
    SocialShareAnalytics[]
  > => {
    try {
      const response = await fetch(
        `/api/social-share/track?contentId=${content.id}&contentType=${content.type}&timeframe=7d`,
      );

      if (response.ok) {
        const data = await response.json();
        return data.data?.recentShares || [];
      }
    } catch (error) {
      logger.error("Failed to get share metrics", { error });
    }

    return [];
  }, [content]);

  /**
   * Get A/B test variant for specific test
   */
  const getAbTestVariant = useCallback(
    (testId: string): ABTestVariant | null => {
      return abTestVariants[testId] || null;
    },
    [abTestVariants],
  );

  /**
   * Track A/B test event
   */
  const trackAbTestEvent = useCallback(
    async (testId: string, variant: string, event: string) => {
      try {
        await fetch("/api/social-share/ab-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "trackEvent",
            testId,
            variant,
            event,
            metadata: { userType, contentType: content.type, platform: "web" },
          }),
        });
      } catch (error) {
        logger.error("Failed to track A/B test event", { error });
      }
    },
    [content.type, userType],
  );

  /**
   * Get optimal share time (simplified algorithm)
   */
  const getOptimalShareTime = useCallback((): Date => {
    const now = new Date();
    const hour = now.getHours();

    // Peak social media times: 8-10am, 12-2pm, 5-7pm
    const peakHours = [8, 9, 12, 13, 17, 18];

    if (peakHours.includes(hour)) {
      return now; // Current time is optimal
    }

    // Find next peak hour
    const nextPeak = peakHours.find((h) => h > hour) || peakHours[0];
    const nextOptimal = new Date(now);

    if (nextPeak < hour) {
      nextOptimal.setDate(nextOptimal.getDate() + 1);
    }

    nextOptimal.setHours(nextPeak, 0, 0, 0);
    return nextOptimal;
  }, []);

  /**
   * Get platform recommendations based on user type
   */
  const getPlatformRecommendations = useCallback(
    (userType: UserType): SocialPlatform[] => {
      const recommendations: Record<UserType, SocialPlatform[]> = {
        "divine-warrior": [
          "instagram",
          "facebook",
          "whatsapp",
          "email",
          "copy-link",
        ],
        activist: ["twitter", "instagram", "telegram", "reddit", "facebook"],
        judge: ["linkedin", "email", "copy-link", "twitter"],
        coach: ["linkedin", "facebook", "email", "instagram", "copy-link"],
        visitor: ["facebook", "instagram", "whatsapp", "copy-link", "email"],
      };

      return recommendations[userType] || recommendations.visitor;
    },
    [],
  );

  /**
   * Generate hashtags for content
   */
  const generateHashtags = useCallback(
    (contentType: ShareContentType, personRole?: PersonRole): string[] => {
      const baseHashtags = ["#BridgeProject", "#Transformation"];

      // Content-specific hashtags
      switch (contentType) {
        case "person-profile":
          baseHashtags.push(...DIVINE_HASHTAGS.transformation);
          break;
        case "prayer-request":
          baseHashtags.push(...DIVINE_HASHTAGS.prayer);
          break;
        case "freedom-countdown":
          baseHashtags.push(...DIVINE_HASHTAGS.freedom);
          break;
        case "testimony":
          baseHashtags.push(...DIVINE_HASHTAGS.community);
          break;
        default:
          baseHashtags.push(...DIVINE_HASHTAGS.justice);
      }

      // Role-specific hashtags
      if (personRole) {
        switch (personRole) {
          case "lightworker":
            baseHashtags.push("#LightWorker", "#Hope");
            break;
          case "messenger":
            baseHashtags.push("#Messenger", "#Truth");
            break;
          case "witness":
            baseHashtags.push("#Witness", "#Testimony");
            break;
          case "guardian":
            baseHashtags.push("#Guardian", "#Protection");
            break;
        }
      }

      // Add JAHmere-specific hashtags
      baseHashtags.push(...DIVINE_HASHTAGS.freedom.slice(0, 2));

      // Return unique hashtags (max 10)
      return [...new Set(baseHashtags)].slice(0, 10);
    },
    [],
  );

  return {
    // Core functionality
    shareTooltip,
    shareViaAPI,
    copyShareLink,
    generateOGImage,

    // Analytics
    trackShare,
    getShareMetrics,

    // A/B testing
    getAbTestVariant,
    trackAbTestEvent,

    // State
    isSharing,
    shareError,
    shareSuccess,
    abTestVariants,

    // Metrics
    shareCount,
    viralCoefficient,
    engagementRate,

    // Utils
    getOptimalShareTime,
    getPlatformRecommendations,
    generateHashtags,
  };
}
