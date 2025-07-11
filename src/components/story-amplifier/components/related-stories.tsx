"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { useStory } from "../context";
import RelatedStoryCard from "./related-story-card";

/**
 * RelatedStories Component
 * 
 * Displays a grid of related stories with show more/less functionality
 */
const RelatedStories = ({ className }: { className?: string }) => {
  const { 
    story, 
    showRelatedStories, 
    setShowRelatedStories, 
    handleRelatedStoryClick 
  } = useStory();

  return (
    <div className={cn("my-16", className)}>
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
            <RelatedStoryCard
              key={relatedStory.id}
              story={relatedStory}
              onClick={handleRelatedStoryClick}
            />
          ))}
      </div>
    </div>
  );
};

export default withSafeUI(RelatedStories, {
  componentName: "RelatedStories",
}); 