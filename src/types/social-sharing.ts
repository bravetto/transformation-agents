import { PersonData, PersonRole } from "./person";
import { ConversionEvent, UserType } from "@/lib/analytics/user-journey";

/**
 * 🚀 ADVANCED SOCIAL SHARING SYSTEM TYPES
 * Built upon championship analytics foundation for maximum viral potential
 */

export type SocialPlatform =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "email"
  | "whatsapp"
  | "telegram"
  | "reddit"
  | "copy-link";

export type ShareContentType =
  | "person-profile"
  | "timeline-event"
  | "testimony"
  | "impact-stat"
  | "quote-card"
  | "profile"
  | "letter"
  | "prayer"
  | "freedom-countdown"
  | "prayer-request"
  | "general-page";

export interface SocialShareEvent extends ConversionEvent {
  eventType: "social_shared";
  conversionType: "secondary";
  metadata: {
    platform: SocialPlatform;
    contentType: ShareContentType;
    contentId: string;
    shareMethod: "button-click" | "keyboard-shortcut" | "context-menu";
    abTestVariant?: string;
    sharePosition?: "header" | "inline" | "footer" | "floating";
    userAgent?: string;
    referrer?: string;
    customMessage?: string;
  };
}

export interface SocialShareAnalytics {
  shareId: string;
  sessionId: string;
  timestamp: string;
  platform: SocialPlatform;
  contentType: ShareContentType;
  contentId: string;
  userType: UserType;

  // Performance tracking
  clickThroughRate?: number;
  engagementTime?: number;
  conversionResult?: "completed" | "abandoned" | "error";

  // A/B testing
  abTestGroup?: string;
  abTestVariant?: string;

  // Viral tracking
  originalShareId?: string; // For tracking re-shares
  viralLevel: number; // How many degrees of separation from original
  viralCoefficient?: number; // Estimated viral spread
}

export interface ShareableContent {
  id: string;
  type: ShareContentType;
  title: string;
  description: string;
  url: string;

  // Open Graph data
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: "article" | "profile" | "website";

  // Platform-specific content
  twitterText: string;
  linkedinText: string;
  facebookText: string;
  emailSubject: string;
  emailBody: string;

  // Quote card data (for Instagram/visual sharing)
  quoteText?: string;
  quoteAuthor?: string;
  quoteImage?: string;

  // Hashtags and mentions
  hashtags: string[];
  mentions: string[];

  // Call-to-action
  ctaText: string;
  ctaUrl: string;

  // Divine/spiritual context
  spiritualImpact?: "low" | "medium" | "high" | "miraculous";
  prayerWarriorCall?: boolean;
  freedomMissionFocus?: boolean;
}

export interface OpenGraphImageConfig {
  width: number;
  height: number;
  format: "png" | "jpeg" | "webp";
  quality: number;

  // Template selection
  template:
    | "person-profile"
    | "quote-card"
    | "impact-stat"
    | "timeline-event"
    | "prayer-card";

  // Content data
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  quoteText?: string;
  authorName?: string;
  authorRole?: string;
  role?: PersonRole;

  // Branding
  logo?: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };

  // Divine elements
  particles?: boolean;
  divineGlow?: boolean;
  spiritualSymbols?: boolean;
}

export interface SocialShareButtonProps {
  platform: SocialPlatform;
  content: ShareableContent;

  // Visual configuration
  variant?: "icon" | "text" | "icon-text" | "floating";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark" | "auto" | "divine";

  // Behavior
  trackAnalytics?: boolean;
  abTestVariant?: string;
  position?: "header" | "inline" | "footer" | "floating";

  // Divine features
  prayerCall?: boolean;
  urgencyLevel?: "normal" | "urgent" | "critical" | "divine";

  // Callbacks
  onShare?: (analytics: SocialShareAnalytics) => void;
  onError?: (error: Error, platform: SocialPlatform) => void;
  onSuccess?: (platform: SocialPlatform, shareId: string) => void;

  // Accessibility
  ariaLabel?: string;
  customTooltip?: string;

  className?: string;
}

export interface SocialShareSuiteProps {
  content: ShareableContent;

  // Platform selection
  platforms?: SocialPlatform[];
  excludePlatforms?: SocialPlatform[];

  // Layout options
  layout?: "horizontal" | "vertical" | "grid" | "floating";
  showLabels?: boolean;
  showCounts?: boolean;
  compactMode?: boolean;

  // A/B testing
  abTestGroup?: string;
  enableAbTesting?: boolean;

  // Divine features
  showPrayerCall?: boolean;
  showUrgency?: boolean;
  highlightFreedomMission?: boolean;

  // Analytics
  trackViralCoefficient?: boolean;
  trackEngagement?: boolean;

  // Customization
  customStyles?: Record<string, string>;
  customMessages?: Partial<Record<SocialPlatform, string>>;

  className?: string;
}

export interface ShareUrlGenerator {
  platform: SocialPlatform;
  generateUrl: (content: ShareableContent, customMessage?: string) => string;
  supportsCustomMessage: boolean;
  characterLimit?: number;
  requiresNativeShare?: boolean; // For mobile platforms
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100, total should equal 100

  // What to test
  buttonText?: string;
  buttonPosition?: "header" | "inline" | "footer" | "floating";
  buttonStyle?: "icon" | "text" | "icon-text";
  shareMessage?: string;
  urgencyLevel?: "normal" | "urgent" | "critical" | "divine";

  // Incentives
  showShareReward?: boolean;
  rewardMessage?: string;

  // Visual elements
  highlightColor?: string;
  showPulse?: boolean;
  showParticles?: boolean;
}

export interface ABTestConfig {
  testId: string;
  testName: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;

  variants: ABTestVariant[];

  // Targeting
  targetUserTypes?: UserType[];
  targetPlatforms?: SocialPlatform[];
  targetContentTypes?: ShareContentType[];

  // Success metrics
  primaryMetric:
    | "share-rate"
    | "click-through-rate"
    | "viral-coefficient"
    | "conversion-rate";
  secondaryMetrics?: string[];
  minimumSampleSize: number;
  confidenceLevel: number;
}

export interface SocialShareHookReturn {
  // Core sharing functionality
  shareTooltip: (platform: SocialPlatform) => Promise<void>;
  shareViaAPI: (
    platform: SocialPlatform,
    customMessage?: string,
  ) => Promise<string>;
  copyShareLink: () => Promise<void>;
  generateOGImage: (config: OpenGraphImageConfig) => Promise<string>;

  // Analytics
  trackShare: (analytics: Partial<SocialShareAnalytics>) => void;
  getShareMetrics: () => Promise<SocialShareAnalytics[]>;

  // A/B testing
  getAbTestVariant: (testId: string) => ABTestVariant | null;
  trackAbTestEvent: (testId: string, variant: string, event: string) => void;

  // State
  isSharing: boolean;
  shareError: string | null;
  shareSuccess: boolean;
  abTestVariants: Record<string, ABTestVariant>;

  // Real-time metrics
  shareCount: number;
  viralCoefficient: number;
  engagementRate: number;

  // Utils
  getOptimalShareTime: () => Date;
  getPlatformRecommendations: (userType: UserType) => SocialPlatform[];
  generateHashtags: (
    contentType: ShareContentType,
    personRole?: PersonRole,
  ) => string[];
}

export interface ViralTrackingData {
  originalShareId: string;
  currentShareId: string;
  viralLevel: number;
  propagationPath: string[];
  totalReaches: number;
  uniqueUsers: number;
  platformDistribution: Record<SocialPlatform, number>;
  timeToViral: number; // milliseconds from original share
  peakViralMoment: string; // timestamp
  geographicSpread: string[]; // countries/regions
}

/**
 * Platform-specific configurations for optimal sharing
 */
export const PLATFORM_CONFIGS: Record<
  SocialPlatform,
  {
    name: string;
    baseUrl: string;
    color: string;
    icon: string;
    characterLimit?: number;
    supportsHashtags: boolean;
    supportsImages: boolean;
    optimalImageSize: { width: number; height: number };
    primaryAudience: UserType[];
    messageStyle: "casual" | "professional" | "emotional" | "urgent";
  }
> = {
  twitter: {
    name: "Twitter/X",
    baseUrl: "https://twitter.com/intent/tweet",
    color: "#1DA1F2",
    icon: "Twitter",
    characterLimit: 280,
    supportsHashtags: true,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 675 },
    primaryAudience: ["activist", "divine-warrior", "visitor"],
    messageStyle: "urgent",
  },
  linkedin: {
    name: "LinkedIn",
    baseUrl: "https://www.linkedin.com/sharing/share-offsite/",
    color: "#0077B5",
    icon: "Linkedin",
    characterLimit: 3000,
    supportsHashtags: true,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 627 },
    primaryAudience: ["judge", "coach", "activist"],
    messageStyle: "professional",
  },
  facebook: {
    name: "Facebook",
    baseUrl: "https://www.facebook.com/sharer/sharer.php",
    color: "#1877F2",
    icon: "Facebook",
    characterLimit: 63206,
    supportsHashtags: false,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 630 },
    primaryAudience: ["coach", "visitor", "divine-warrior"],
    messageStyle: "emotional",
  },
  instagram: {
    name: "Instagram",
    baseUrl: "", // Stories API or copy-text approach
    color: "#E4405F",
    icon: "Instagram",
    supportsHashtags: true,
    supportsImages: true,
    optimalImageSize: { width: 1080, height: 1080 },
    primaryAudience: ["divine-warrior", "visitor", "activist"],
    messageStyle: "emotional",
  },
  email: {
    name: "Email",
    baseUrl: "mailto:",
    color: "#34495E",
    icon: "Mail",
    supportsHashtags: false,
    supportsImages: true,
    optimalImageSize: { width: 600, height: 400 },
    primaryAudience: ["judge", "coach", "activist"],
    messageStyle: "professional",
  },
  whatsapp: {
    name: "WhatsApp",
    baseUrl: "https://wa.me/",
    color: "#25D366",
    icon: "MessageCircle",
    supportsHashtags: false,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 630 },
    primaryAudience: ["divine-warrior", "visitor", "activist"],
    messageStyle: "casual",
  },
  telegram: {
    name: "Telegram",
    baseUrl: "https://t.me/share/url",
    color: "#0088CC",
    icon: "Send",
    supportsHashtags: true,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 630 },
    primaryAudience: ["activist", "divine-warrior"],
    messageStyle: "urgent",
  },
  reddit: {
    name: "Reddit",
    baseUrl: "https://reddit.com/submit",
    color: "#FF4500",
    icon: "Users",
    characterLimit: 300,
    supportsHashtags: false,
    supportsImages: true,
    optimalImageSize: { width: 1200, height: 630 },
    primaryAudience: ["activist", "visitor"],
    messageStyle: "casual",
  },
  "copy-link": {
    name: "Copy Link",
    baseUrl: "",
    color: "#6B7280",
    icon: "Copy",
    supportsHashtags: false,
    supportsImages: false,
    optimalImageSize: { width: 0, height: 0 },
    primaryAudience: [
      "visitor",
      "coach",
      "judge",
      "activist",
      "divine-warrior",
    ],
    messageStyle: "casual",
  },
};

/**
 * Divine hashtag sets for different contexts
 */
export const DIVINE_HASHTAGS = {
  freedom: ["#JAHmereFreedom", "#July28th", "#FreedomDay", "#JusticeNow"],
  prayer: [
    "#PrayForJAHmere",
    "#DivineIntervention",
    "#FaithInAction",
    "#PrayerWarriors",
  ],
  transformation: [
    "#BridgeProject",
    "#Transformation",
    "#SecondChances",
    "#Hope",
  ],
  justice: [
    "#CriminalJusticeReform",
    "#SecondChances",
    "#Rehabilitation",
    "#Justice",
  ],
  divine: [
    "#DivineGuidance",
    "#SpiritualWarfare",
    "#MiracleInProgress",
    "#GodsWill",
  ],
  community: [
    "#CommunitySupport",
    "#TogetherWeCan",
    "#UnityInFaith",
    "#CollectiveAction",
  ],
} as const;
