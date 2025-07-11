"use client";
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import {
  Share2,
  MessageCircle,
  Heart,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Clock,
  Award,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Link,
  Quote,
  ArrowRight,
  Users,
  Bookmark,
  Calendar,
  X,
} from "lucide-react";
import { withDivineErrorBoundary } from "./ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DivineParticles from "./divine-particles";
import type { DivineRole } from "./ui/divine-error-boundary";

// Main interface for the story content
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

// Interface for shareable quotes within the story
export interface Quote {
  id: string;
  text: string;
  attribution?: string;
  position: number; // position in the content (percentage 0-100)
}

// Interface for related stories
export interface RelatedStory {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  excerpt?: string;
}

// Interface for SEO metadata
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Interface for social sharing configuration
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

// Interface for engagement metrics
export interface EngagementMetrics {
  views: number;
  shares: number;
  readingTime: number; // average in seconds
  completionRate: number; // percentage
  callToActionClicks: number;
}

// Interface for the StoryAmplifier component props
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
 * StoryAmplifier Component
 *
 * A comprehensive component that enhances story pages with engagement features,
 * social sharing optimization, and viral amplification capabilities.
 */
const StoryAmplifier = ({
  story,
  metrics,
  onShare,
  onQuoteShare,
  onRelatedStoryClick,
  onCallToAction,
  className,
}: StoryAmplifierProps) => {
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
  const [localMetrics, setLocalMetrics] = useState<EngagementMetrics>(
    metrics || {
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

  // Transform scroll progress for various effects
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.8, 0.8, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.95, 0.95, 0.9],
  );
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 50, 50, 100]);

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
      setLocalMetrics((prev) => ({
        ...prev,
        readingTime: prev.readingTime + timeSpent,
        completionRate: readingProgress,
      }));
    };
  }, [readingProgress]);

  // Share the story on social media
  const handleShare = (platform: string) => {
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
    setLocalMetrics((prev) => ({
      ...prev,
      shares: prev.shares + 1,
    }));

    if (onShare) {
      onShare(platform);
    }
  };

  // Share a specific quote
  const handleQuoteShare = (quote: Quote) => {
    setActiveQuote(quote);

    if (onQuoteShare) {
      onQuoteShare(quote);
    }
  };

  // Handle click on a related story
  const handleRelatedStoryClick = (story: RelatedStory) => {
    if (onRelatedStoryClick) {
      onRelatedStoryClick(story);
    }
  };

  // Handle call to action click
  const handleCallToAction = () => {
    setLocalMetrics((prev) => ({
      ...prev,
      callToActionClicks: prev.callToActionClicks + 1,
    }));

    if (onCallToAction) {
      onCallToAction();
    }
  };

  // Format reading time
  const formatReadingTime = (minutes: number) => {
    return minutes < 1
      ? "Less than a minute"
      : `${Math.ceil(minutes)} minute${Math.ceil(minutes) !== 1 ? "s" : ""}`;
  };

  // Generate sections from content for table of contents
  const generateSections = () => {
    const sections = [
      { title: "Introduction", percent: 0 },
      { title: "Background", percent: 20 },
      { title: "Challenges", percent: 40 },
      { title: "Impact", percent: 60 },
      { title: "Conclusion", percent: 80 },
    ];

    return sections;
  };

  // Get sections for table of contents
  const sections = generateSections();

  // Parallax transforms for hero image
  const yParallax = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 50, 50, 100],
  );
  const scaleParallax = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1.1, 1.1, 1],
  );

  return (
    <div ref={storyRef} className={cn("relative min-h-screen", className)}>
      {/* Divine Particles Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <DivineParticles
          variant="minimal"
          intensity="low"
          interactive={false}
        />
      </div>

      {/* Reading progress bar - fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-blue-600"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Fixed social sharing sidebar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col space-y-3 bg-white/10 backdrop-blur-sm p-2 rounded-full">
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 rounded-full bg-white/20 hover:bg-blue-500 hover:text-white transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter size={18} />
          </button>

          <button
            onClick={() => handleShare("facebook")}
            className="p-2 rounded-full bg-white/20 hover:bg-blue-700 hover:text-white transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook size={18} />
          </button>

          <button
            onClick={() => handleShare("linkedin")}
            className="p-2 rounded-full bg-white/20 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </button>

          <button
            onClick={() => handleShare("email")}
            className="p-2 rounded-full bg-white/20 hover:bg-green-600 hover:text-white transition-colors"
            aria-label="Share via Email"
          >
            <Mail size={18} />
          </button>

          <button
            onClick={() => handleShare("copy")}
            className="p-2 rounded-full bg-white/20 hover:bg-purple-600 hover:text-white transition-colors"
            aria-label="Copy Link"
          >
            {copiedToClipboard ? <Check size={18} /> : <Link size={18} />}
          </button>
        </div>
      </div>

      {/* Table of contents - fixed at right */}
      <div className="fixed right-4 top-1/3 transform -translate-y-1/3 z-40 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            In This Story
          </h3>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => {
                  if (contentRef.current) {
                    const targetScroll =
                      contentRef.current.scrollHeight * (section.percent / 100);
                    window.scrollTo({
                      top: targetScroll + contentRef.current.offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
                className={cn(
                  "text-xs block w-full text-left px-2 py-1 rounded transition-colors",
                  activeSection === index
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/30",
                )}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement metrics floating panel */}
      <div className="fixed bottom-4 left-4 z-40 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
          <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{localMetrics.views.toLocaleString()} views</span>
            </div>

            <div className="flex items-center">
              <Share2 size={14} className="mr-1" />
              <span>{localMetrics.shares.toLocaleString()} shares</span>
            </div>

            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>
                {Math.floor(localMetrics.readingTime / 60)} min avg. read
              </span>
            </div>

            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>12 reading now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header section with parallax effect */}
        <motion.header style={{ opacity, y }} className="relative mb-8">
          {/* Hero image with parallax */}
          {story.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8 overflow-hidden rounded-xl">
              <motion.div
                style={{
                  y: yParallax,
                  scale: scaleParallax,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={story.imageUrl}
                  alt={story.imageAlt || story.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-2">
                  {story.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-600/80 text-white px-2 py-1 rounded-full mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Title and metadata */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
              {story.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              {story.author.image && (
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={story.author.image}
                    alt={story.author.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
              )}

              <div>
                <div className="font-medium">{story.author.name}</div>
                {story.author.role && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {story.author.role}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="mr-4">{story.publishedDate}</span>

              <Clock className="w-4 h-4 mr-1" />
              <span>{formatReadingTime(story.readingTime)}</span>
            </div>
          </div>

          {/* Mobile sharing buttons */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <button
              onClick={() => setShareVisible(!shareVisible)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Share2 size={16} className="mr-2" />
              Share This Story
            </button>

            <button
              onClick={() => setShowRelatedStories(!showRelatedStories)}
              className="flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
            >
              <ArrowRight size={16} className="mr-2" />
              More Stories
            </button>
          </div>

          {/* Mobile share panel */}
          <AnimatePresence>
            {shareVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6 md:hidden"
              >
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex flex-col items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                  >
                    <Twitter size={20} className="text-blue-500 mb-1" />
                    <span className="text-xs">Twitter</span>
                  </button>

                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex flex-col items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                  >
                    <Facebook size={20} className="text-blue-700 mb-1" />
                    <span className="text-xs">Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex flex-col items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
                  >
                    <Linkedin size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs">LinkedIn</span>
                  </button>

                  <button
                    onClick={() => handleShare("email")}
                    className="flex flex-col items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg"
                  >
                    <Mail size={20} className="text-green-600 mb-1" />
                    <span className="text-xs">Email</span>
                  </button>

                  <button
                    onClick={() => handleShare("copy")}
                    className="flex flex-col items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg col-span-4"
                  >
                    {copiedToClipboard ? (
                      <Check size={20} className="text-green-600 mb-1" />
                    ) : (
                      <Copy size={20} className="text-purple-600 mb-1" />
                    )}
                    <span className="text-xs">
                      {copiedToClipboard ? "Copied!" : "Copy Link"}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Main content */}
        <div
          ref={contentRef}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {/* Render content with quotes */}
          {story.content.split("\n\n").map((paragraph, index) => {
            // Check if there's a quote that should appear after this paragraph
            const quoteAfterParagraph = story.quotes.find(
              (quote) => Math.floor(quote.position / 10) === index,
            );

            return (
              <div key={index}>
                <p>{paragraph}</p>

                {quoteAfterParagraph && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="my-8 pl-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg relative"
                  >
                    <div className="absolute -left-5 top-3 bg-white dark:bg-gray-900 p-1 rounded-full">
                      <Quote size={24} className="text-blue-500" />
                    </div>

                    <p className="text-xl font-serif italic mb-2">
                      "{quoteAfterParagraph.text}"
                    </p>

                    {quoteAfterParagraph.attribution && (
                      <footer className="text-sm text-gray-600 dark:text-gray-400">
                        — {quoteAfterParagraph.attribution}
                      </footer>
                    )}

                    <div className="mt-3 flex items-center justify-end">
                      <button
                        onClick={() => handleQuoteShare(quoteAfterParagraph)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Share2 size={14} className="mr-1" />
                        Share this quote
                      </button>
                    </div>
                  </motion.blockquote>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 mb-12 bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">
            Be Part of The Bridge Project
          </h2>
          <p className="mb-6">
            Share your own story, submit a letter, or volunteer to help others
            connect with their divine purpose.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleCallToAction}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Submit Your Letter
            </Button>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => handleShare("twitter")}
            >
              <Share2 size={16} className="mr-2" />
              Share This Story
            </Button>
          </div>
        </motion.div>

        {/* Related stories section */}
        <div className="my-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Related Stories</h2>

            <button
              onClick={() => setShowRelatedStories(!showRelatedStories)}
              className="flex items-center text-blue-600"
            >
              {showRelatedStories ? (
                <>
                  <ChevronUp size={18} className="mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={18} className="mr-1" />
                  Show More
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {story.relatedStories
              .slice(0, showRelatedStories ? undefined : 3)
              .map((relatedStory) => (
                <motion.div
                  key={relatedStory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {relatedStory.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedStory.imageUrl}
                        alt={relatedStory.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {relatedStory.title}
                    </h3>

                    {relatedStory.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {relatedStory.excerpt}
                      </p>
                    )}

                    <button
                      onClick={() => handleRelatedStoryClick(relatedStory)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      Read Story
                      <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Footer with sharing options */}
        <div className="border-t dark:border-gray-800 pt-8 pb-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Share This Story</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                Did you find this story valuable? Help others discover it by
                sharing!
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleShare("twitter")}
                className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-500 hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter size={20} />
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-700 hover:text-white transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={20} />
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={20} />
              </button>

              <button
                onClick={() => handleShare("email")}
                className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 hover:bg-green-600 hover:text-white transition-colors"
                aria-label="Share via Email"
              >
                <Mail size={20} />
              </button>

              <button
                onClick={() => handleShare("copy")}
                className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-600 hover:text-white transition-colors"
                aria-label="Copy Link"
              >
                {copiedToClipboard ? <Check size={20} /> : <Link size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active quote sharing modal */}
      <AnimatePresence>
        {activeQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setActiveQuote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveQuote(null)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <Quote size={30} className="text-blue-500 mx-auto mb-4" />
                <p className="text-xl font-serif italic mb-4">
                  "{activeQuote.text}"
                </p>

                {activeQuote.attribution && (
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    — {activeQuote.attribution}
                  </p>
                )}

                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      const quote = `"${activeQuote.text}" ${activeQuote.attribution ? `- ${activeQuote.attribution}` : ""}`;
                      const url =
                        typeof window !== "undefined"
                          ? window.location.href
                          : "";
                      const shareText = `${quote}\n\nFrom: ${story.title}\n${url}`;

                      // Share on Twitter
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
                        "_blank",
                        "width=600,height=400",
                      );
                    }}
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <Twitter size={18} />
                  </button>

                  <button
                    onClick={() => {
                      const quote = `"${activeQuote.text}" ${activeQuote.attribution ? `- ${activeQuote.attribution}` : ""}`;
                      const url =
                        typeof window !== "undefined"
                          ? window.location.href
                          : "";

                      navigator.clipboard.writeText(
                        `${quote}\n\nFrom: ${story.title}\n${url}`,
                      );
                      setCopiedToClipboard(true);
                      setTimeout(() => setCopiedToClipboard(false), 2000);
                    }}
                    className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    {copiedToClipboard ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default withDivineErrorBoundary(StoryAmplifier, {
  componentName: "StoryAmplifier",
  role: "default",
});
