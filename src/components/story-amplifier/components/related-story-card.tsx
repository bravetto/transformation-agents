"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { RelatedStoryCardProps } from "../types";

/**
 * RelatedStoryCard Component
 * 
 * Displays a card for a related story with image, title, and excerpt
 */
const RelatedStoryCard = ({ story, onClick, className }: RelatedStoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow",
        className
      )}
    >
      {story.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {story.title}
        </h3>

        {story.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {story.excerpt}
          </p>
        )}

        <button
          onClick={() => onClick && onClick(story)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          Read Story
          <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default withSafeUI(RelatedStoryCard, {
  componentName: "RelatedStoryCard",
}); 