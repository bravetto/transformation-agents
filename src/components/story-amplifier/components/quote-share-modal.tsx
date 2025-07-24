"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Twitter, Copy, Check, X } from "lucide-react";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { QuoteShareModalProps } from "../types";

/**
 * QuoteShareModal Component
 *
 * Displays a modal for sharing a specific quote from the story
 */
const QuoteShareModal = ({
  quote,
  storyTitle,
  onClose,
  copiedToClipboard,
  setCopiedToClipboard,
}: QuoteShareModalProps) => {
  if (!quote) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <Quote size={30} className="text-blue-500 mx-auto mb-4" />
            <p className="text-xl font-serif italic mb-4">"{quote.text}"</p>

            {quote.attribution && (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                — {quote.attribution}
              </p>
            )}

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  const quoteText = `"${quote.text}" ${quote.attribution ? `- ${quote.attribution}` : ""}`;
                  const url =
                    typeof window !== "undefined" ? window.location.href : "";
                  const shareText = `${quoteText}\n\nFrom: ${storyTitle}\n${url}`;

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
                  const quoteText = `"${quote.text}" ${quote.attribution ? `- ${quote.attribution}` : ""}`;
                  const url =
                    typeof window !== "undefined" ? window.location.href : "";

                  navigator.clipboard.writeText(
                    `${quoteText}\n\nFrom: ${storyTitle}\n${url}`,
                  );
                  setCopiedToClipboard(true);
                  setTimeout(() => setCopiedToClipboard(false), 2000);
                }}
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-600 hover:text-white transition-colors"
              >
                {copiedToClipboard ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default withSafeUI(QuoteShareModal, {
  componentName: "QuoteShareModal",
});
