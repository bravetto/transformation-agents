"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Copy,
  ExternalLink,
  CheckCircle,
  Eye,
  Users,
  TrendingUp,
  Smartphone,
  Monitor,
} from "lucide-react";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

// Social Platform Configurations (2024 Standards)
interface SocialPlatformConfig {
  name: string;
  icon: React.ComponentType<any>;
  shareUrl: string;
  color: string;
  bgColor: string;
  hoverColor: string;
  optimalImageSize: { width: number; height: number };
  maxTitleLength: number;
  maxDescriptionLength: number;
  supportsVideo: boolean;
  supportsOpenGraph: boolean;
}

// Open Graph Meta Data Interface
interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: "website" | "article" | "video" | "profile";
  siteName: string;
  locale: string;
  authorityContext?:
    | "tony_dungy"
    | "michael_vick"
    | "jahmere_webb"
    | "second_chances";
  videoUrl?: string;
  audioUrl?: string;
  tags?: string[];
}

// Social Sharing Analytics
interface SharingAnalytics {
  platform: string;
  contentType: string;
  authorityContext?: string;
  userType: string;
  timestamp: number;
  deviceType: "mobile" | "desktop";
  shareMethod: "native" | "custom" | "copy_link";
}

const SOCIAL_PLATFORMS: Record<string, SocialPlatformConfig> = {
  facebook: {
    name: "Facebook",
    icon: Facebook,
    shareUrl: "https://www.facebook.com/sharer/sharer.php?u=",
    color: "text-blue-600",
    bgColor: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    optimalImageSize: { width: 1200, height: 630 },
    maxTitleLength: 100,
    maxDescriptionLength: 300,
    supportsVideo: true,
    supportsOpenGraph: true,
  },
  twitter: {
    name: "X (Twitter)",
    icon: Twitter,
    shareUrl: "https://twitter.com/intent/tweet?url=",
    color: "text-gray-900",
    bgColor: "bg-gray-900",
    hoverColor: "hover:bg-gray-800",
    optimalImageSize: { width: 1200, height: 675 },
    maxTitleLength: 280,
    maxDescriptionLength: 280,
    supportsVideo: true,
    supportsOpenGraph: true,
  },
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    shareUrl: "https://www.linkedin.com/sharing/share-offsite/?url=",
    color: "text-blue-700",
    bgColor: "bg-blue-700",
    hoverColor: "hover:bg-blue-800",
    optimalImageSize: { width: 1200, height: 627 },
    maxTitleLength: 150,
    maxDescriptionLength: 300,
    supportsVideo: true,
    supportsOpenGraph: true,
  },
  whatsapp: {
    name: "WhatsApp",
    icon: MessageCircle,
    shareUrl: "https://wa.me/?text=",
    color: "text-green-600",
    bgColor: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    optimalImageSize: { width: 1200, height: 630 },
    maxTitleLength: 65,
    maxDescriptionLength: 150,
    supportsVideo: false,
    supportsOpenGraph: true,
  },
};

interface EnhancedSocialSharingProps {
  openGraphData: OpenGraphData;
  enableAnalytics?: boolean;
  enableNativeSharing?: boolean;
  customPlatforms?: string[];
  showPreview?: boolean;
  compactMode?: boolean;
  authorityBoost?: boolean;
  onShareComplete?: (analytics: SharingAnalytics) => void;
}

export default function EnhancedSocialSharing({
  openGraphData,
  enableAnalytics = true,
  enableNativeSharing = true,
  customPlatforms,
  showPreview = true,
  compactMode = false,
  authorityBoost = false,
  onShareComplete,
}: EnhancedSocialSharingProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop");
  const [nativeShareSupported, setNativeShareSupported] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    customPlatforms || ["facebook", "twitter", "linkedin", "whatsapp"],
  );

  // Detect device type and native share support
  useEffect(() => {
    const checkDeviceAndSupport = () => {
      const isMobile =
        window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setDeviceType(isMobile ? "mobile" : "desktop");
      setNativeShareSupported("share" in navigator && enableNativeSharing);
    };

    checkDeviceAndSupport();
    window.addEventListener("resize", checkDeviceAndSupport);

    return () => window.removeEventListener("resize", checkDeviceAndSupport);
  }, [enableNativeSharing]);

  // Generate optimized share content
  const generateShareContent = useCallback(
    (platform: string): string => {
      const config = SOCIAL_PLATFORMS[platform];
      if (!config) return "";

      let content = "";
      const { title, description, url } = openGraphData;

      // Optimize content for each platform
      switch (platform) {
        case "twitter":
          // Twitter-specific optimization with hashtags and mentions
          const twitterTitle =
            title.length > 200 ? title.substring(0, 197) + "..." : title;
          const hashtags = authorityBoost
            ? " #SecondChances #TonyDungy #CriminalJusticeReform #JAHmereWebb"
            : "";
          content = `${twitterTitle}${hashtags}`;
          break;

        case "facebook":
          // Facebook uses Open Graph data automatically
          content = url;
          break;

        case "linkedin":
          // LinkedIn professional context
          const linkedinTitle = authorityBoost
            ? `${title} - Transformational Leadership in Criminal Justice Reform`
            : title;
          content = `${linkedinTitle}\n\n${description}`;
          break;

        case "whatsapp":
          // WhatsApp personal sharing
          const whatsappTitle =
            title.length > 50 ? title.substring(0, 47) + "..." : title;
          content = `${whatsappTitle}\n\n${url}`;
          break;

        default:
          content = `${title}\n\n${description}\n\n${url}`;
      }

      return encodeURIComponent(content);
    },
    [openGraphData, authorityBoost],
  );

  // Track sharing analytics
  const trackShare = useCallback(
    (platform: string, method: "native" | "custom" | "copy_link") => {
      if (!enableAnalytics) return;

      const analytics: SharingAnalytics = {
        platform,
        contentType: openGraphData.type,
        authorityContext: openGraphData.authorityContext,
        userType: getCurrentUserType(),
        timestamp: Date.now(),
        deviceType,
        shareMethod: method,
      };

      // Track with existing analytics system
      trackConversion({
        eventType: "social_shared",
        userType: getCurrentUserType(),
        conversionType: "secondary",
        metadata: {
          platform,
          content_type: openGraphData.type,
          authority_context: openGraphData.authorityContext,
          share_method: method,
          device_type: deviceType,
          title: openGraphData.title,
        },
      });

      // Increment share count
      setShareCount((prev) => prev + 1);

      // Call custom callback
      if (onShareComplete) {
        onShareComplete(analytics);
      }

      console.log("Social Share Analytics:", analytics);
    },
    [enableAnalytics, openGraphData, deviceType, onShareComplete],
  );

  // Handle platform sharing
  const handlePlatformShare = useCallback(
    (platform: string) => {
      const config = SOCIAL_PLATFORMS[platform];
      if (!config) return;

      const content = generateShareContent(platform);
      const shareUrl = `${config.shareUrl}${content}`;

      // Open share window
      const shareWindow = window.open(
        shareUrl,
        "share",
        "width=600,height=400,scrollbars=yes,resizable=yes",
      );

      if (shareWindow) {
        trackShare(platform, "custom");
      }
    },
    [generateShareContent, trackShare],
  );

  // Handle native sharing
  const handleNativeShare = useCallback(async () => {
    if (!nativeShareSupported) return;

    try {
      await navigator.share({
        title: openGraphData.title,
        text: openGraphData.description,
        url: openGraphData.url,
      });

      trackShare("native", "native");
    } catch (error) {
      console.log("Native sharing cancelled or failed:", error);
    }
  }, [nativeShareSupported, openGraphData, trackShare]);

  // Handle copy link
  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(openGraphData.url);
      setCopiedLink(true);
      trackShare("copy_link", "copy_link");

      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }, [openGraphData.url, trackShare]);

  // Generate Open Graph meta tags for preview
  const generateOpenGraphTags = (): string => {
    const { title, description, image, url, type, siteName, locale } =
      openGraphData;

    return `
<!-- Open Graph Meta Tags (2024 Optimized) -->
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${type}" />
<meta property="og:site_name" content="${siteName}" />
<meta property="og:locale" content="${locale}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />

<!-- Additional Authority Context -->
${openGraphData.authorityContext ? `<meta property="article:tag" content="${openGraphData.authorityContext}" />` : ""}
${openGraphData.videoUrl ? `<meta property="og:video" content="${openGraphData.videoUrl}" />` : ""}
${openGraphData.audioUrl ? `<meta property="og:audio" content="${openGraphData.audioUrl}" />` : ""}
    `.trim();
  };

  return (
    <div className="space-y-6">
      {/* Social Sharing Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Share2 className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Share This Content
            </h3>
            <p className="text-sm text-gray-600">
              {authorityBoost
                ? "Amplify Tony Dungy's message of transformation"
                : "Share with your network"}
            </p>
          </div>
        </div>

        {shareCount > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{shareCount} shares</span>
          </div>
        )}
      </div>

      {/* Authority Boost Badge */}
      {authorityBoost && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Authority Content
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Tony Dungy
            </Badge>
          </div>
          <p className="text-sm text-gray-700">
            This content features NFL Hall of Fame coach Tony Dungy's expertise
            in criminal justice reform and second chances.
          </p>
        </div>
      )}

      {/* Native Share Button (Mobile) */}
      {nativeShareSupported && deviceType === "mobile" && (
        <Button
          onClick={handleNativeShare}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Share via {deviceType === "mobile" ? "Mobile Apps" : "System"}
        </Button>
      )}

      {/* Platform Sharing Buttons */}
      <div
        className={`grid ${compactMode ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"} gap-3`}
      >
        {selectedPlatforms.map((platformKey) => {
          const platform = SOCIAL_PLATFORMS[platformKey];
          if (!platform) return null;

          const Icon = platform.icon;

          return (
            <Button
              key={platformKey}
              onClick={() => handlePlatformShare(platformKey)}
              variant="outline"
              className={`flex items-center space-x-2 ${platform.color} border-gray-200 hover:border-gray-300 ${compactMode ? "p-2" : "p-3"}`}
            >
              <Icon className={`${compactMode ? "h-4 w-4" : "h-5 w-5"}`} />
              {!compactMode && <span>{platform.name}</span>}
            </Button>
          );
        })}
      </div>

      {/* Copy Link Button */}
      <Button
        onClick={handleCopyLink}
        variant="outline"
        className="w-full border-gray-200 hover:border-gray-300"
      >
        {copiedLink ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            Link Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>

      {/* Social Preview */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Social Media Preview</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Preview Card */}
              <div className="border border-gray-200 rounded-lg overflow-hidden max-w-md">
                <img
                  src={openGraphData.image}
                  alt={openGraphData.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    {openGraphData.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {openGraphData.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <ExternalLink className="h-3 w-3" />
                    <span>{new URL(openGraphData.url).hostname}</span>
                  </div>
                </div>
              </div>

              {/* Device Indicators */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile Optimized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4" />
                  <span>Desktop Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>All Platforms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Open Graph Code Preview (Development) */}
      {process.env.NODE_ENV === "development" && (
        <Card>
          <CardHeader>
            <CardTitle>Open Graph Meta Tags</CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
              <code>{generateOpenGraphTags()}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
