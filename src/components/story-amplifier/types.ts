import type { DivineRole } from "@/lib/design-system";

/**
 * Main interface for the story content
 */
export interface StoryContent {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  author: {
    name: string;
    role?: string;
    image?: string;
  };
  publishedDate: string;
  readingTime: number; // in minutes
  slug: string;
  tags: string[];
  imageUrl?: string;
  imageAlt?: string;
  quotes: Quote[];
  relatedStories: RelatedStory[];
  seoMetadata: SEOMetadata;
  socialSharing: SocialSharingConfig;
  role?: DivineRole;
}

/**
 * Interface for shareable quotes within the story
 */
export interface Quote {
  id: string;
  text: string;
  attribution?: string;
  position: number; // position in the content (percentage 0-100)
}

/**
 * Interface for related stories
 */
export interface RelatedStory {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  excerpt?: string;
}

/**
 * Interface for SEO metadata
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

/**
 * Interface for social sharing configuration
 */
export interface SocialSharingConfig {
  title: string;
  description: string;
  hashtags: string[];
  platforms: {
    twitter?: {
      text?: string;
      hashtags?: string[];
    };
    facebook?: {
      quote?: string;
    };
    linkedin?: {
      title?: string;
      summary?: string;
    };
    email?: {
      subject?: string;
      body?: string;
    };
  };
}

/**
 * Interface for engagement metrics
 */
export interface EngagementMetrics {
  views: number;
  shares: number;
  readingTime: number; // average in seconds
  completionRate: number; // percentage
  callToActionClicks: number;
}

/**
 * Interface for the StoryAmplifier component props
 */
export interface StoryAmplifierProps {
  story: StoryContent;
  metrics?: EngagementMetrics;
  onShare?: (platform: string) => void;
  onQuoteShare?: (quote: Quote) => void;
  onRelatedStoryClick?: (story: RelatedStory) => void;
  onCallToAction?: () => void;
  className?: string;
}

/**
 * Interface for the StoryContext
 */
export interface StoryContextType {
  story: StoryContent;
  metrics: EngagementMetrics;
  readingProgress: number;
  isAtTop: boolean;
  activeSection: number;
  shareVisible: boolean;
  setShareVisible: (visible: boolean) => void;
  copiedToClipboard: boolean;
  setCopiedToClipboard: (copied: boolean) => void;
  showRelatedStories: boolean;
  setShowRelatedStories: (show: boolean) => void;
  activeQuote: Quote | null;
  setActiveQuote: (quote: Quote | null) => void;
  handleShare: (platform: string) => void;
  handleQuoteShare: (quote: Quote) => void;
  handleRelatedStoryClick: (story: RelatedStory) => void;
  handleCallToAction: () => void;
  formatReadingTime: (minutes: number) => string;
}

/**
 * Interface for the TableOfContents component props
 */
export interface TableOfContentsProps {
  sections: Array<{
    title: string;
    percent: number;
  }>;
  activeSection: number;
  contentRef: React.RefObject<HTMLDivElement>;
}

/**
 * Interface for the ShareButton component props
 */
export interface ShareButtonProps {
  platform: "twitter" | "facebook" | "linkedin" | "email" | "copy";
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button" | "icon-label";
  label?: string;
  className?: string;
}

/**
 * Interface for the QuoteCard component props
 */
export interface QuoteCardProps {
  quote: Quote;
  onShare?: (quote: Quote) => void;
  className?: string;
}

/**
 * Interface for the RelatedStoryCard component props
 */
export interface RelatedStoryCardProps {
  story: RelatedStory;
  onClick?: (story: RelatedStory) => void;
  className?: string;
}

/**
 * Interface for the ReadingProgressBar component props
 */
export interface ReadingProgressBarProps {
  progress: number;
  className?: string;
}

/**
 * Interface for the StoryHeader component props
 */
export interface StoryHeaderProps {
  story: StoryContent;
  formatReadingTime: (minutes: number) => string;
  className?: string;
}

/**
 * Interface for the StoryContent component props
 */
export interface StoryContentProps {
  story: StoryContent;
  onQuoteShare: (quote: Quote) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

/**
 * Interface for the EngagementPanel component props
 */
export interface EngagementPanelProps {
  metrics: EngagementMetrics;
  className?: string;
}

/**
 * Interface for the CallToAction component props
 */
export interface CallToActionProps {
  onAction: () => void;
  onShare: (platform: string) => void;
  className?: string;
}

/**
 * Interface for the QuoteShareModal component props
 */
export interface QuoteShareModalProps {
  quote: Quote | null;
  storyTitle: string;
  onClose: () => void;
  copiedToClipboard: boolean;
  setCopiedToClipboard: (copied: boolean) => void;
} 