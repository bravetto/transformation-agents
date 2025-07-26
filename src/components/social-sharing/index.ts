/**
 * 🚀 SOCIAL SHARING SYSTEM EXPORTS
 * Advanced viral optimization for JAHmere's freedom mission
 */

// Core Components
export { default as SocialShareButton } from "./SocialShareButton";
export { default as SocialShareSuite } from "./SocialShareSuite";

// Hooks
export { useSocialSharing } from "@/lib/hooks/useSocialSharing";

// Utilities
export {
  generatePersonShareableContent,
  generateTimelineShareableContent,
  generatePrayerShareableContent,
  generateFreedomCountdownContent,
} from "@/lib/social-content-generator";

// Types (re-exported for convenience)
export type {
  SocialPlatform,
  ShareableContent,
  SocialShareEvent,
  SocialShareAnalytics,
  SocialShareButtonProps,
  SocialShareSuiteProps,
  ABTestVariant,
  OpenGraphImageConfig,
} from "@/types/social-sharing";
