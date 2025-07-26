"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { StoryContentProps } from "../types";
import QuoteCard from "./quote-card";

/**
 * StoryContent Component
 *
 * Displays the main content of the story with embedded quotes
 */
const StoryContent = ({
  story,
  onQuoteShare,
  contentRef,
  className,
}: StoryContentProps) => {
  return (
    <div
      ref={contentRef}
      className={cn("prose prose-lg dark:prose-invert max-w-none", className)}
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
              <QuoteCard quote={quoteAfterParagraph} onShare={onQuoteShare} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default withSafeUI(StoryContent, {
  componentName: "StoryContent",
});
