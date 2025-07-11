"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { QuoteCardProps } from "../types";

/**
 * QuoteCard Component
 * 
 * Displays a shareable quote from the story
 */
const QuoteCard = ({ quote, onShare, className }: QuoteCardProps) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "my-8 pl-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg relative",
        className
      )}
    >
      <div className="absolute -left-5 top-3 bg-white dark:bg-gray-900 p-1 rounded-full">
        <Quote size={24} className="text-blue-500" />
      </div>

      <p className="text-xl font-serif italic mb-2">
        "{quote.text}"
      </p>

      {quote.attribution && (
        <footer className="text-sm text-gray-600 dark:text-gray-400">
          — {quote.attribution}
        </footer>
      )}

      <div className="mt-3 flex items-center justify-end">
        <button
          onClick={() => onShare && onShare(quote)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Share2 size={14} className="mr-1" />
          Share this quote
        </button>
      </div>
    </motion.blockquote>
  );
};

export default withSafeUI(QuoteCard, {
  componentName: "QuoteCard",
}); 