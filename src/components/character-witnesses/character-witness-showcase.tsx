"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Star, Quote, ArrowRight, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import CharacterWitnessCard from "./character-witness-card";
import {
  getFeaturedLetters,
  getLetterAnalyticsSummary,
  characterWitnessLetters,
} from "@/data/character-witnesses/character-letters-data";
import { cn } from "@/lib/utils";

interface CharacterWitnessShowcaseProps {
  className?: string;
  variant?: "hero" | "compact" | "detailed" | "default";
  maxFeatured?: number;
  showStats?: boolean;
  enableAnalytics?: boolean;
  enableAbTesting?: boolean;
  onLetterView?: (letterId: string) => void;
  onLetterShare?: (letterId: string, platform: string) => void;
  onViewAllClick?: () => void;
}

function CharacterWitnessShowcase({
  className,
  variant = "default",
  maxFeatured = 3,
  showStats = true,
  enableAnalytics = true,
  enableAbTesting = false,
  onLetterView,
  onLetterShare,
  onViewAllClick,
}: CharacterWitnessShowcaseProps) {
  const [featuredLetters, setFeaturedLetters] = useState(getFeaturedLetters());
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [analyticsData, setAnalyticsData] = useState(
    getLetterAnalyticsSummary(),
  );

  // Auto-rotate featured quotes every 5 seconds
  useEffect(() => {
    if (featuredLetters.length > 1) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % featuredLetters.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredLetters.length]);

  // Track letter view
  const handleLetterView = (letterId: string) => {
    onLetterView?.(letterId);

    if (enableAnalytics) {
      // Track divine event
      // trackDivineEvent('character_letter_viewed', {
      //   letterId,
      //   source: 'home_page_showcase'
      // });
    }
  };

  // Track letter share
  const handleLetterShare = (letterId: string, platform: string) => {
    onLetterShare?.(letterId, platform);

    if (enableAnalytics) {
      // Track divine event
      // trackDivineEvent('character_letter_shared', {
      //   letterId,
      //   platform,
      //   source: 'home_page_showcase'
      // });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const quoteVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Variant-specific configurations
  const getVariantConfig = () => {
    switch (variant) {
      case "hero":
        return {
          showHeader: false,
          cardVariant: "quote" as const,
          layout: "horizontal",
          maxItems: Math.min(maxFeatured, 3),
          showCTA: false,
        };
      case "compact":
        return {
          showHeader: false,
          cardVariant: "quote" as const,
          layout: "horizontal",
          maxItems: Math.min(maxFeatured, 5),
          showCTA: false,
        };
      case "detailed":
        return {
          showHeader: true,
          cardVariant: "card" as const,
          layout: "grid",
          maxItems: maxFeatured,
          showCTA: true,
        };
      default:
        return {
          showHeader: true,
          cardVariant: "card" as const,
          layout: "grid",
          maxItems: maxFeatured,
          showCTA: true,
        };
    }
  };

  const config = getVariantConfig();

  return (
    <section
      className={cn(
        variant === "hero" || variant === "compact" ? "py-4" : "py-16 md:py-24",
        "bg-white",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section Header - Conditional based on variant */}
        {config.showHeader && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Users className="w-6 h-6 text-hope-gold" />
              <span className="text-sm font-medium text-hope-gold uppercase tracking-wide">
                Character Witnesses
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gentle-charcoal mb-4"
            >
              People Who Know JAHmere's{" "}
              <span className="text-hope-gold">True Character</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-soft-shadow max-w-3xl mx-auto"
            >
              Real letters from real people who have witnessed JAHmere's
              transformation, character, and positive impact on their
              communities.
            </motion.p>

            {/* Statistics */}
            {showStats && (
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-8 mt-8 text-sm text-soft-shadow"
              >
                <div className="flex items-center gap-2">
                  <Quote className="w-4 h-4 text-hope-gold" />
                  <span className="font-medium">
                    {analyticsData.totalLetters} Letters
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-hope-gold" />
                  <span className="font-medium">
                    {analyticsData.featuredCount} Featured
                  </span>
                </div>

                {analyticsData.totalViews > 0 && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-hope-gold" />
                    <span className="font-medium">
                      {analyticsData.totalViews.toLocaleString()} Views
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Featured Quote Carousel */}
        {featuredLetters.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="text-center p-8 bg-gradient-to-r from-hope-gold/5 to-courage-blue/5 rounded-xl border border-hope-gold/20">
                    <Quote className="w-12 h-12 text-hope-gold mx-auto mb-6 opacity-50" />

                    <blockquote className="text-xl md:text-2xl font-medium text-gentle-charcoal mb-6 italic">
                      "
                      {featuredLetters[currentQuoteIndex]?.display
                        .featuredQuote ||
                        "A powerful testament to character and transformation."}
                      "
                    </blockquote>

                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-hope-gold"></div>
                      <cite className="font-bold text-gentle-charcoal not-italic">
                        {featuredLetters[currentQuoteIndex]?.author.name}
                      </cite>
                      {featuredLetters[currentQuoteIndex]?.author.title && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-soft-shadow"></div>
                          <span className="text-soft-shadow">
                            {featuredLetters[currentQuoteIndex]?.author.title}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quote navigation dots */}
              {featuredLetters.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {featuredLetters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuoteIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentQuoteIndex
                          ? "bg-hope-gold w-8"
                          : "bg-hope-gold/30 hover:bg-hope-gold/50",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Letter Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featuredLetters.slice(0, maxFeatured).map((letter, index) => (
            <motion.div key={letter.id} variants={itemVariants}>
              <CharacterWitnessCard
                letter={letter}
                variant="card"
                onView={handleLetterView}
                onShare={handleLetterShare}
                showAnalytics={enableAnalytics}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        {config.showCTA && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                onClick={onViewAllClick}
                className="bg-hope-gold hover:bg-hope-gold/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Read All {analyticsData.totalLetters} Character Letters
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2 text-sm text-soft-shadow">
                <TrendingUp className="w-4 h-4 text-courage-blue" />
                <span>
                  See why {analyticsData.totalLetters} people believe in
                  JAHmere's transformation
                </span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-soft-shadow mb-4">
                These letters represent real relationships and genuine character
                assessments
              </p>

              <div className="flex items-center justify-center gap-6 text-xs text-soft-shadow">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Verified Relationships</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Real People</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Authentic Stories</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default withDivineErrorBoundary(CharacterWitnessShowcase, {
  componentName: "CharacterWitnessShowcase",
  role: "messenger",
  fallback: (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <Users className="w-12 h-12 text-hope-gold mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-gentle-charcoal mb-2">
          Character Witnesses
        </h2>
        <p className="text-soft-shadow">
          Loading testimonials from JAHmere's community...
        </p>
      </div>
    </section>
  ),
});
