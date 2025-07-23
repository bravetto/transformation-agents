export interface CharacterWitnessLetter {
  id: string;
  slug: string; // URL-friendly version of author name

  // Author information
  author: {
    name: string;
    title?: string; // "Pastor", "Coach", "Former Employer"
    relationship: string; // How they know JAHmere
    organization?: string;
    credibilityScore?: number; // 1-10 based on title/relationship
  };

  // Letter content
  content: {
    fullText: string;
    keyQuotes: string[]; // Most impactful excerpts
    themes: CharacterTheme[]; // Categories of endorsement
    emotionalTone: EmotionalTone;
    callsToAction: string[]; // Specific requests or appeals
  };

  // Metadata
  metadata: {
    dateWritten: string;
    letterType: LetterType;
    impactScore: number; // 1-100 based on content analysis
    featured: boolean; // Show on home page?
    wordCount: number;
    readingTimeMinutes: number;
    conversionPotential: ConversionPotential;
  };

  // Analytics tracking
  analytics: {
    viewCount: number;
    uniqueViews: number;
    averageReadTime: number;
    completionRate: number; // % who read to end
    shareCount: number;
    quotesHighlighted: number;
    conversionEvents: number; // Led to email signup, etc.
    lastViewed?: string;
  };

  // Display preferences
  display: {
    priority: number; // 1-10 for homepage ordering
    showFullLetter: boolean;
    featuredQuote?: string; // Main quote for cards
    thumbnail?: string; // Author photo if available
    backgroundColor?: string; // Theme color
  };
}

export type CharacterTheme =
  | "transformation"
  | "character"
  | "community_impact"
  | "work_ethic"
  | "family_values"
  | "spiritual_growth"
  | "leadership"
  | "redemption"
  | "potential"
  | "responsibility";

export type EmotionalTone =
  | "passionate"
  | "heartfelt"
  | "professional"
  | "urgent"
  | "hopeful"
  | "determined"
  | "compassionate";

export type LetterType =
  | "character"
  | "professional"
  | "personal"
  | "spiritual"
  | "community"
  | "family";

export type ConversionPotential =
  | "high" // Highly persuasive, specific examples
  | "medium" // Good content, some specifics
  | "low"; // General endorsement

// Interface for letter display components
export interface CharacterWitnessCardProps {
  letter: CharacterWitnessLetter;
  variant?: "card" | "quote" | "full";
  onView?: (letterId: string) => void;
  onShare?: (letterId: string, platform: string) => void;
  onQuoteHighlight?: (letterId: string, quote: string) => void;
  showAnalytics?: boolean;
}

// Interface for letter analytics events
export interface LetterAnalyticsEvent {
  eventType:
    | "letter_viewed"
    | "letter_shared"
    | "quote_highlighted"
    | "letter_completed"
    | "conversion_action";
  letterId: string;
  authorName: string;
  letterType: LetterType;
  timestamp: string;
  metadata: {
    sourcePage?: string;
    readDuration?: number;
    completionPercentage?: number;
    sharePlatform?: string;
    highlightedQuote?: string;
    conversionType?: string;
    deviceType?: string;
    userAgent?: string;
  };
}

// Analytics aggregation interface
export interface LetterAnalyticsSummary {
  totalLetters: number;
  totalViews: number;
  averageReadTime: number;
  topPerformingLetters: string[]; // Letter IDs
  mostSharedQuotes: Array<{
    quote: string;
    letterId: string;
    shareCount: number;
  }>;
  conversionRate: number;
  engagementScore: number; // Overall engagement metric
}
