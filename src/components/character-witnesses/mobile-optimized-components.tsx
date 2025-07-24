"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  Star,
  Share2,
  Heart,
  ChevronRight,
  Play,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CharacterWitnessLetter } from "@/types/character-witness";

interface MobileOptimizedProps {
  letters: CharacterWitnessLetter[];
  onEngagement: (action: string, letterId?: string) => void;
  className?: string;
}

// Mobile-First Floating Action Button
export const MobileFloatingCTA: React.FC<{
  ctaText: string;
  urgency?: "low" | "normal" | "high" | "critical";
  icon?: React.ReactNode;
  className?: string;
}> = ({ ctaText, urgency = "normal", icon, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Track CTA click and redirect to action page
    if (typeof window !== "undefined") {
      window.open("/letter-portal", "_self");
    }
  };

  const urgencyStyles = {
    low: "bg-gray-600 hover:bg-gray-700",
    normal: "bg-blue-600 hover:bg-blue-700",
    high: "bg-orange-600 hover:bg-orange-700",
    critical: "bg-red-600 hover:bg-red-700 animate-pulse",
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full text-white font-semibold shadow-xl",
        "flex items-center gap-2 min-w-[200px] justify-center",
        urgencyStyles[urgency],
        className,
      )}
    >
      {icon}
      <span className="text-sm">{ctaText}</span>
      <ChevronRight className="w-4 h-4" />
    </motion.button>
  );
};

// Thumb-Friendly Card Components
export const ThumbFriendlyLetterCard: React.FC<{
  letter: CharacterWitnessLetter;
  onEngagement: (action: string, letterId?: string) => void;
  className?: string;
}> = ({ letter, onEngagement, className }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onEngagement("card_liked", letter.id);
  };

  const handleShare = () => {
    onEngagement("card_shared", letter.id);
    // Implement share functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-lg border border-gray-100",
        "min-h-[280px] flex flex-col justify-between",
        className,
      )}
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {letter.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {letter.author.name}
            </h3>
            <p className="text-sm text-gray-600">
              {letter.author.title || letter.author.relationship}
            </p>
          </div>
        </div>

        <blockquote className="text-gray-700 text-base leading-relaxed mb-4">
          "{letter.content.keyQuotes[0]}"
        </blockquote>
      </div>

      {/* Thumb-friendly action buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
            "min-h-[44px] min-w-[44px]", // 44px is the minimum touch target
            isLiked ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600",
          )}
        >
          <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
          <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-600 min-h-[44px]"
        >
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={() => onEngagement("card_read_more", letter.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-600 min-h-[44px]"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Read</span>
        </button>
      </div>
    </motion.div>
  );
};

// Swipeable Carousel for Mobile
export const SwipeableLetterCarousel: React.FC<MobileOptimizedProps> = ({
  letters,
  onEngagement,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const progress = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      // Swipe right - previous
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        onEngagement("carousel_swipe_previous");
      }
    } else if (offset < -100 || velocity < -500) {
      // Swipe left - next
      if (currentIndex < letters.length - 1) {
        setCurrentIndex(currentIndex + 1);
        onEngagement("carousel_swipe_next");
      }
    }
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      ref={constraintsRef}
    >
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {letters.map((letter, index) => (
          <motion.div
            key={letter.id}
            className="w-full flex-shrink-0 px-4"
            animate={{
              scale: index === currentIndex ? 1 : 0.9,
              opacity: index === currentIndex ? 1 : 0.6,
            }}
          >
            <ThumbFriendlyLetterCard
              letter={letter}
              onEngagement={onEngagement}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {letters.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              onEngagement("carousel_dot_clicked", `index_${index}`);
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
              index === currentIndex ? "bg-blue-600" : "bg-gray-300",
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                index === currentIndex ? "bg-white" : "bg-gray-400",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Sticky Bottom Sheet for Letter Details
export const StickyBottomSheet: React.FC<{
  letter: CharacterWitnessLetter | null;
  isOpen: boolean;
  onClose: () => void;
  onEngagement: (action: string, letterId?: string) => void;
}> = ({ letter, isOpen, onClose, onEngagement }) => {
  if (!letter) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto"
    >
      <div className="p-6">
        {/* Handle bar */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {letter.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {letter.author.name}
              </h2>
              <p className="text-gray-600">
                {letter.author.title || letter.author.relationship}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Key Message</h3>
            <blockquote className="text-gray-700 text-lg leading-relaxed italic">
              "{letter.content.keyQuotes[0]}"
            </blockquote>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Additional Quotes
            </h3>
            <div className="space-y-3">
              {letter.content.keyQuotes.slice(1, 3).map((quote, index) => (
                <p key={index} className="text-gray-600 italic">
                  "{quote}"
                </p>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                onEngagement("bottom_sheet_share", letter.id);
                // Implement share
              }}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold"
            >
              Share This Letter
            </button>
            <button
              onClick={() => {
                onEngagement("bottom_sheet_write_letter", letter.id);
                // Navigate to letter writing
              }}
              className="flex-1 border border-blue-600 text-blue-600 py-4 rounded-xl font-semibold"
            >
              Write Letter
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Voice Quote Reader Component
export const VoiceQuoteReader: React.FC<{
  quote: string;
  authorName: string;
  onEngagement: (action: string) => void;
  className?: string;
}> = ({ quote, authorName, onEngagement, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        onEngagement("voice_stopped");
      } else {
        const utterance = new SpeechSynthesisUtterance(
          `${quote}. By ${authorName}`,
        );
        utterance.onend = () => {
          setIsPlaying(false);
          onEngagement("voice_completed");
        };
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        onEngagement("voice_started");
      }
    }
  };

  return (
    <button
      onClick={handlePlayPause}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-green-50 text-green-700 hover:bg-green-100",
        "transition-colors min-h-[44px]",
        className,
      )}
      aria-label={isPlaying ? "Stop reading quote" : "Read quote aloud"}
    >
      <Play className={cn("w-5 h-5", isPlaying && "animate-pulse")} />
      <span className="text-sm font-medium">
        {isPlaying ? "Playing..." : "Listen"}
      </span>
    </button>
  );
};
