"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, ChevronLeft, ChevronRight } from "lucide-react";

const testimonies = [
  {
    text: "When things happen to us that aren't exactly what we had hoped for, there's only one response that will help us move on. Get over it, get up, and try it again.",
    author: "Tony Dungy",
    emoji: "🙏",
  },
  {
    text: "We have so many young men growing up without their dads. We have to fill that void. We have to do a better job helping them see what it means to be a man.",
    author: "Tony Dungy",
    emoji: "💪",
  },
  {
    text: "If you want to make a difference in the lives of people, you must walk alongside them, lift and encourage them, spend time with them, not shout down from on high.",
    author: "Tony Dungy",
    emoji: "🤝",
  },
  {
    text: "Sometimes I think God wants there to be a circus so we can show there's another way to respond.",
    author: "Tony Dungy",
    emoji: "✨",
  },
  {
    text: "Part of our purpose in life is to build a legacy – a consistent pattern of building into the lives of others.",
    author: "Tony Dungy",
    emoji: "🌟",
  },
  {
    text: "We need somebody to give us a chance.",
    author: "Tony Dungy",
    emoji: "🔑",
  },
  {
    text: "You can't always control circumstances. However, you can always control your attitude, approach, and response.",
    author: "Tony Dungy",
    emoji: "💡",
  },
  {
    text: "I don't have the strength or wisdom to get through a single day without guidance and grace from God.",
    author: "Tony Dungy",
    emoji: "🕊️",
  },
  {
    text: "I'm reading Coach's book in my cell right now. 'Quiet Strength' is teaching me how to lead from behind bars.",
    author: "JAHmere Webb",
    emoji: "📖",
  },
  {
    text: "The Lord has a plan. We always think the plans are A, B, C and D, and everything is going to be perfect for us and it may not be that way, but it's still his plan.",
    author: "Tony Dungy",
    emoji: "🎯",
  },
];

export default function FloatingTestimony() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has previously closed it
    const wasMinimized = localStorage.getItem("testimony-minimized");
    if (wasMinimized === "true") {
      setIsMinimized(true);
    }

    // Show after 3 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 3000);

    // Rotate testimonies
    const interval = setInterval(() => {
      if (!isMinimized) {
        setCurrentIndex((prev) => (prev + 1) % (testimonies?.length || 1));
      }
    }, 8000); // Slightly longer for these meaningful quotes

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [isMinimized]);

  const handleMinimize = () => {
    setIsMinimized(true);
    setHasInteracted(true);
    localStorage.setItem("testimony-minimized", "true");
  };

  const handleRestore = () => {
    setIsMinimized(false);
    localStorage.removeItem("testimony-minimized");
  };

  if (!isVisible) return null;

  // Ensure testimonies array exists and has elements
  const safeTestimonies = Array.isArray(testimonies) ? testimonies : [];
  // Ensure current index is within bounds
  const safeIndex =
    safeTestimonies.length > 0
      ? Math.min(Math.max(0, currentIndex), safeTestimonies.length - 1)
      : 0;
  // Get current testimony or use fallback
  const current = safeTestimonies[safeIndex] || {
    text: "No testimony available",
    author: "Unknown",
    emoji: "📝",
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-40 bg-hope-gold text-gentle-charcoal rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Quote className="h-6 w-6" />
          <motion.div
            className="absolute -bottom-1 -right-1 bg-growth-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {safeTestimonies.length}
          </motion.div>
        </motion.button>
      )}

      {/* Testimony Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-hope-gold/10 blur-2xl" />

              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-hope-gold/20">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-2 -right-2 bg-courage-blue text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-courage-blue/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Testimony Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={safeIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {/* Emoji */}
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl mb-4"
                    >
                      {current?.emoji || "💬"}
                    </motion.div>

                    {/* Quote */}
                    <p className="text-base md:text-lg text-gentle-charcoal font-medium mb-3">
                      "{current?.text || "No testimony available"}"
                    </p>
                    <footer className="text-sm text-courage-blue font-bold">
                      — {current?.author || "Unknown"}
                    </footer>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {/* Progress Dots */}
                  {safeTestimonies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all duration-300 h-1.5 rounded-full ${
                        index === safeIndex
                          ? "w-8 bg-hope-gold"
                          : "w-1.5 bg-soft-cloud hover:bg-moon-glow"
                      }`}
                    />
                  ))}
                </div>

                {/* Auto-advance indicator */}
                <p className="text-xs text-center mt-3 text-soft-shadow">
                  Auto-advancing every 8 seconds
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts Background Effect */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * (window?.innerWidth || 1000),
                y: (window?.innerHeight || 800) + 50,
                opacity: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            >
              {["❤️", "🙏", "✨", "💫", "🌟"][i]}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
