"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { StoryHeaderProps } from "../types";
import { useStory } from "../context";
import ShareButton from "./share-button";

/**
 * StoryHeader Component
 *
 * Displays the header section of a story with title, author info, and metadata
 */
const StoryHeader = ({
  story,
  formatReadingTime,
  className,
}: StoryHeaderProps) => {
  const {
    shareVisible,
    setShareVisible,
    showRelatedStories,
    setShowRelatedStories,
    isAtTop,
    readingProgress,
  } = useStory();

  // Transform values based on scroll position
  const opacity = isAtTop ? 1 : Math.max(0, 1 - readingProgress / 50);
  const y = isAtTop ? 0 : Math.min(50, readingProgress / 2);
  const scale = isAtTop ? 1 : Math.max(0.9, 1 - readingProgress / 200);

  return (
    <motion.header
      style={{ opacity, y, scale }}
      className={cn("relative mb-8", className)}
    >
      {/* Hero image with parallax */}
      {story.imageUrl && (
        <div className="relative h-64 md:h-96 mb-8 overflow-hidden rounded-xl">
          <motion.div
            style={{
              y: Math.min(50, readingProgress / 2),
              scale: Math.min(1.1, 1 + readingProgress / 500),
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
      {shareVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6 md:hidden"
        >
          <div className="grid grid-cols-4 gap-3">
            <ShareButton platform="twitter" variant="icon-label" size="sm" />
            <ShareButton platform="facebook" variant="icon-label" size="sm" />
            <ShareButton platform="linkedin" variant="icon-label" size="sm" />
            <ShareButton platform="email" variant="icon-label" size="sm" />
            <ShareButton
              platform="copy"
              variant="icon-label"
              size="sm"
              className="col-span-4"
            />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default withSafeUI(StoryHeader, {
  componentName: "StoryHeader",
});
