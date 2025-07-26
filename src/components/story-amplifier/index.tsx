"use client";

import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/ui/error-boundary";
// DivineParticles removed for MVP hydration stability
import { StoryAmplifierProps } from "./types";
import { StoryProvider, useStory } from "./context";

// Import components
import ReadingProgressBar from "./components/reading-progress-bar";
import SocialSharingBar from "./components/social-sharing-bar";
import TableOfContents from "./components/table-of-contents";
import EngagementPanel from "./components/engagement-panel";
import StoryHeader from "./components/story-header";
import StoryContent from "./components/story-content";
import CallToAction from "./components/call-to-action";
import RelatedStories from "./components/related-stories";
import ShareFooter from "./components/share-footer";
import QuoteShareModal from "./components/quote-share-modal";

/**
 * StoryAmplifierContent Component
 *
 * Inner component that uses the StoryContext
 */
const StoryAmplifierContent = ({ className }: { className?: string }) => {
  const {
    story,
    metrics,
    readingProgress,
    activeSection,
    activeQuote,
    setActiveQuote,
    handleQuoteShare,
    handleCallToAction,
    handleShare,
    formatReadingTime,
    copiedToClipboard,
    setCopiedToClipboard,
  } = useStory();

  // Ref for content
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate sections for table of contents
  const sections = [
    { title: "Introduction", percent: 0 },
    { title: "Background", percent: 20 },
    { title: "Challenges", percent: 40 },
    { title: "Impact", percent: 60 },
    { title: "Conclusion", percent: 80 },
  ];

  return (
    <>
      {/* Divine Particles Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        {/* DivineParticles removed for MVP hydration stability */}
      </div>

      {/* Reading progress bar - fixed at top */}
      <ReadingProgressBar progress={readingProgress} />

      {/* Fixed social sharing sidebar */}
      <SocialSharingBar />

      {/* Table of contents - fixed at right */}
      <TableOfContents
        sections={sections}
        activeSection={activeSection}
        contentRef={contentRef}
      />

      {/* Engagement metrics floating panel */}
      <EngagementPanel metrics={metrics} />

      {/* Main content container */}
      <div className={cn("max-w-4xl mx-auto px-4 py-12", className)}>
        {/* Header section */}
        <StoryHeader story={story} formatReadingTime={formatReadingTime} />

        {/* Main content */}
        <StoryContent
          story={story}
          onQuoteShare={handleQuoteShare}
          contentRef={contentRef}
        />

        {/* Call to action section */}
        <CallToAction onAction={handleCallToAction} onShare={handleShare} />

        {/* Related stories section */}
        <RelatedStories />

        {/* Footer with sharing options */}
        <ShareFooter />
      </div>

      {/* Active quote sharing modal */}
      <AnimatePresence>
        {activeQuote && (
          <QuoteShareModal
            quote={activeQuote}
            storyTitle={story.title}
            onClose={() => setActiveQuote(null)}
            copiedToClipboard={copiedToClipboard}
            setCopiedToClipboard={setCopiedToClipboard}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * StoryAmplifier Component
 *
 * A comprehensive component that enhances story pages with engagement features,
 * social sharing optimization, and viral amplification capabilities.
 */
const StoryAmplifier = (props: StoryAmplifierProps) => {
  return (
    <StoryProvider {...props}>
      <StoryAmplifierContent className={props.className} />
    </StoryProvider>
  );
};

export default withErrorBoundary(StoryAmplifier, "StoryAmplifier");
