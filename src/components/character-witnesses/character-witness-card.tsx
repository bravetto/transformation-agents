"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Share2, Eye, Clock, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";
import type { CharacterWitnessCardProps } from "@/types/character-witness";

function CharacterWitnessCard({
  letter,
  variant = "card",
  onView,
  onShare,
  onQuoteHighlight,
  showAnalytics = false,
}: CharacterWitnessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle card click
  const handleCardClick = () => {
    if (variant === "card") {
      setIsExpanded(!isExpanded);
      onView?.(letter.id);
    }
  };

  // Handle share action
  const handleShare = (platform: string) => {
    onShare?.(letter.id, platform);
  };

  // Handle quote highlight
  const handleQuoteHighlight = (quote: string) => {
    onQuoteHighlight?.(letter.id, quote);
  };

  // Render different variants
  const renderCardVariant = () => (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer",
        "hover:shadow-lg hover:scale-[1.02]",
        isHovered && "shadow-xl",
        letter.display.backgroundColor &&
          `bg-[${letter.display.backgroundColor}]`,
      )}
      style={{ backgroundColor: letter.display.backgroundColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Priority indicator for featured letters */}
      {letter.metadata.featured && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-hope-gold text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gentle-charcoal">
              {letter.author.name}
            </h3>
            {letter.author.title && (
              <p className="text-sm text-soft-shadow font-medium">
                {letter.author.title}
              </p>
            )}
            {letter.author.relationship && (
              <p className="text-xs text-soft-shadow/80">
                {letter.author.relationship}
              </p>
            )}
          </div>

          {/* Credibility score */}
          <div className="flex items-center gap-1 text-xs text-hope-gold">
            <Star className="w-3 h-3 fill-current" />
            <span>{letter.author.credibilityScore}/10</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Featured quote or preview */}
        {letter.display.featuredQuote ? (
          <blockquote className="border-l-4 border-hope-gold pl-4 italic text-gentle-charcoal">
            "{letter.display.featuredQuote}"
          </blockquote>
        ) : (
          <p className="text-soft-shadow text-sm">
            Character witness letter from {letter.author.name}
            {letter.author.relationship && ` (${letter.author.relationship})`}
          </p>
        )}

        {/* Letter metadata */}
        <div className="flex items-center justify-between text-xs text-soft-shadow">
          <div className="flex items-center gap-3">
            {letter.metadata.readingTimeMinutes > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{letter.metadata.readingTimeMinutes} min read</span>
              </div>
            )}

            {showAnalytics && letter.analytics.viewCount > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{letter.analytics.viewCount} views</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleShare("copy");
              }}
              className="h-6 w-6 p-0"
            >
              <Share2 className="w-3 h-3" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-courage-blue"
            >
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && letter.content.fullText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="pt-4 border-t"
          >
            <div className="prose prose-sm max-w-none">
              <p className="text-gentle-charcoal whitespace-pre-line">
                {letter.content.fullText.substring(0, 300)}...
              </p>
            </div>

            <Button
              variant="link"
              size="sm"
              className="mt-2 p-0 text-courage-blue"
            >
              Read full letter →
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );

  const renderQuoteVariant = () => (
    <motion.div
      className={cn(
        "relative p-6 rounded-lg border-l-4 border-hope-gold",
        "bg-gradient-to-r from-hope-gold/5 to-transparent",
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Quote className="absolute top-2 right-2 w-6 h-6 text-hope-gold/30" />

      <blockquote className="text-lg font-medium text-gentle-charcoal mb-4">
        "
        {letter.display.featuredQuote ||
          "A powerful endorsement of character and transformation."}
        "
      </blockquote>

      <div className="flex items-center justify-between">
        <div>
          <cite className="font-bold text-gentle-charcoal not-italic">
            — {letter.author.name}
          </cite>
          {letter.author.title && (
            <p className="text-sm text-soft-shadow">{letter.author.title}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            handleQuoteHighlight(letter.display.featuredQuote || "")
          }
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );

  const renderFullVariant = () => (
    <article className="prose prose-lg max-w-none">
      <header className="not-prose mb-8">
        <h1 className="text-3xl font-bold text-gentle-charcoal mb-2">
          Character Letter from {letter.author.name}
        </h1>

        <div className="flex items-center gap-4 text-soft-shadow">
          {letter.author.title && <span>{letter.author.title}</span>}
          {letter.author.organization && (
            <span>• {letter.author.organization}</span>
          )}
          {letter.metadata.dateWritten && (
            <span>• {letter.metadata.dateWritten}</span>
          )}
        </div>
      </header>

      <div className="whitespace-pre-line text-gentle-charcoal leading-relaxed">
        {letter.content.fullText || "Letter content will be available soon."}
      </div>

      {letter.content.keyQuotes.length > 0 && (
        <aside className="not-prose mt-8 p-6 bg-hope-gold/5 rounded-lg border-l-4 border-hope-gold">
          <h3 className="font-bold text-gentle-charcoal mb-4">Key Quotes</h3>
          <div className="space-y-3">
            {letter.content.keyQuotes.map((quote, index) => (
              <blockquote
                key={index}
                className="italic text-gentle-charcoal cursor-pointer hover:text-courage-blue transition-colors"
                onClick={() => handleQuoteHighlight(quote)}
              >
                "{quote}"
              </blockquote>
            ))}
          </div>
        </aside>
      )}
    </article>
  );

  // Render based on variant
  switch (variant) {
    case "quote":
      return renderQuoteVariant();
    case "full":
      return renderFullVariant();
    default:
      return renderCardVariant();
  }
}

export default withDivineErrorBoundary(CharacterWitnessCard, {
  componentName: "CharacterWitnessCard",
  role: "messenger",
  fallback: (
    <Card className="p-6">
      <div className="text-center text-soft-shadow">
        <Quote className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Character witness letter temporarily unavailable</p>
      </div>
    </Card>
  ),
});
