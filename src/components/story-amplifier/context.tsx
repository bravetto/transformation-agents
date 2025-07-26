"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  StoryContent,
  Quote,
  RelatedStory,
  EngagementMetrics,
  StoryContextType,
  StoryAmplifierProps,
} from "./types";

// Create the context
const StoryContext = createContext<StoryContextType | undefined>(undefined);

/**
 * StoryProvider component
 * Provides state management and functionality for the StoryAmplifier component
 */
export const StoryProvider: React.FC<
  React.PropsWithChildren<StoryAmplifierProps>
> = ({
  story,
  metrics: initialMetrics,
  onShare: externalOnShare,
  onQuoteShare: externalOnQuoteShare,
  onRelatedStoryClick: externalOnRelatedStoryClick,
  onCallToAction: externalOnCallToAction,
  children,
}) => {
  // State for tracking reading progress
  const [readingProgress, setReadingProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  // State for social sharing
  const [shareVisible, setShareVisible] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // State for related stories
  const [showRelatedStories, setShowRelatedStories] = useState(false);

  // State for engagement metrics
  const [metrics, setMetrics] = useState<EngagementMetrics>(
    initialMetrics || {
      views: 0,
      shares: 0,
      readingTime: 0,
      completionRate: 0,
      callToActionClicks: 0,
    },
  );

  // State for active quotes
  const [activeQuote, setActiveQuote] = useState<Quote | null>(null);

  // Refs for scroll tracking
  const storyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll animation with framer-motion
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  // Track reading progress based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setReadingProgress(Math.min(Math.max(latest * 100, 0), 100));
      setIsAtTop(latest < 0.02);

      // Determine active section based on scroll position
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const scrollPosition = latest * contentHeight;

        // Find the active quote based on scroll position
        const activeQuoteIndex = story.quotes.findIndex((quote) => {
          const quotePosition = (quote.position / 100) * contentHeight;
          return Math.abs(scrollPosition - quotePosition) < 200; // within 200px threshold
        });

        if (activeQuoteIndex !== -1) {
          setActiveQuote(story.quotes[activeQuoteIndex]);
        } else {
          setActiveQuote(null);
        }

        // Set active section for table of contents
        const sectionCount = 5; // Assuming 5 sections for simplicity
        const sectionHeight = contentHeight / sectionCount;
        const currentSection = Math.min(
          Math.floor(scrollPosition / sectionHeight),
          sectionCount - 1,
        );
        setActiveSection(currentSection);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, story.quotes]);

  // Track reading time
  useEffect(() => {
    let startTime = Date.now();
    let timeSpent = 0;
    let isReading = true;
    let timer: NodeJS.Timeout;

    // Function to update reading time
    const updateReadingTime = () => {
      if (isReading) {
        const now = Date.now();
        timeSpent += (now - startTime) / 1000; // in seconds
        startTime = now;
        timer = setTimeout(updateReadingTime, 1000);
      }
    };

    // Start tracking
    updateReadingTime();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isReading = false;
        clearTimeout(timer);
      } else {
        isReading = true;
        startTime = Date.now();
        updateReadingTime();
      }
    };

    // Handle scroll events to ensure user is still engaged
    const handleScroll = () => {
      startTime = Date.now(); // Reset start time on scroll
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll);

    // Clean up on unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);

      // Update metrics with final reading time
      setMetrics((prev) => ({
        ...prev,
        readingTime: prev.readingTime + timeSpent,
        completionRate: readingProgress,
      }));
    };
  }, [readingProgress]);

  // Share the story on social media
  const handleShare = useCallback(
    (platform: string) => {
      let shareUrl = "";
      const url = typeof window !== "undefined" ? window.location.href : "";

      switch (platform) {
        case "twitter":
          const twitterText =
            story.socialSharing.platforms.twitter?.text ||
            story.socialSharing.title;
          const twitterHashtags =
            story.socialSharing.platforms.twitter?.hashtags?.join(",") ||
            story.socialSharing.hashtags.join(",");
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(twitterText)}&hashtags=${encodeURIComponent(twitterHashtags)}`;
          break;

        case "facebook":
          const fbQuote =
            story.socialSharing.platforms.facebook?.quote ||
            story.socialSharing.description;
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(fbQuote)}`;
          break;

        case "linkedin":
          const liTitle =
            story.socialSharing.platforms.linkedin?.title ||
            story.socialSharing.title;
          const liSummary =
            story.socialSharing.platforms.linkedin?.summary ||
            story.socialSharing.description;
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(liTitle)}&summary=${encodeURIComponent(liSummary)}`;
          break;

        case "email":
          const subject =
            story.socialSharing.platforms.email?.subject ||
            story.socialSharing.title;
          const body =
            story.socialSharing.platforms.email?.body ||
            `${story.socialSharing.description}\n\nRead more: ${url}`;
          shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          break;

        case "copy":
          navigator.clipboard.writeText(url).then(() => {
            setCopiedToClipboard(true);
            setTimeout(() => setCopiedToClipboard(false), 2000);
          });
          break;
      }

      // Open share dialog for platforms other than copy
      if (shareUrl && platform !== "copy") {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }

      // Update metrics and call onShare callback
      setMetrics((prev) => ({
        ...prev,
        shares: prev.shares + 1,
      }));

      if (externalOnShare) {
        externalOnShare(platform);
      }
    },
    [story.socialSharing, externalOnShare],
  );

  // Share a specific quote
  const handleQuoteShare = useCallback(
    (quote: Quote) => {
      setActiveQuote(quote);

      if (externalOnQuoteShare) {
        externalOnQuoteShare(quote);
      }
    },
    [externalOnQuoteShare],
  );

  // Handle click on a related story
  const handleRelatedStoryClick = useCallback(
    (story: RelatedStory) => {
      if (externalOnRelatedStoryClick) {
        externalOnRelatedStoryClick(story);
      }
    },
    [externalOnRelatedStoryClick],
  );

  // Handle call to action click
  const handleCallToAction = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      callToActionClicks: prev.callToActionClicks + 1,
    }));

    if (externalOnCallToAction) {
      externalOnCallToAction();
    }
  }, [externalOnCallToAction]);

  // Format reading time
  const formatReadingTime = useCallback((minutes: number) => {
    return minutes < 1
      ? "Less than a minute"
      : `${Math.ceil(minutes)} minute${Math.ceil(minutes) !== 1 ? "s" : ""}`;
  }, []);

  // Generate sections from content for table of contents
  const generateSections = useCallback(() => {
    const sections = [
      { title: "Introduction", percent: 0 },
      { title: "Background", percent: 20 },
      { title: "Challenges", percent: 40 },
      { title: "Impact", percent: 60 },
      { title: "Conclusion", percent: 80 },
    ];

    return sections;
  }, []);

  // Context value
  const contextValue: StoryContextType = {
    story,
    metrics,
    readingProgress,
    isAtTop,
    activeSection,
    shareVisible,
    setShareVisible,
    copiedToClipboard,
    setCopiedToClipboard,
    showRelatedStories,
    setShowRelatedStories,
    activeQuote,
    setActiveQuote,
    handleShare,
    handleQuoteShare,
    handleRelatedStoryClick,
    handleCallToAction,
    formatReadingTime,
  };

  return (
    <StoryContext.Provider value={contextValue}>
      <div ref={storyRef} className="relative min-h-screen">
        {children}
      </div>
    </StoryContext.Provider>
  );
};

/**
 * useStory hook
 * Custom hook to access the StoryContext
 */
export const useStory = (): StoryContextType => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};

// Export refs for use in components
export const useStoryRefs = () => {
  return {
    storyRef: useRef<HTMLDivElement>(null),
    contentRef: useRef<HTMLDivElement>(null),
  };
};
