"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Quote,
  Star,
  Heart,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { trackConversion } from "@/lib/analytics/user-journey";

interface CharacterWitness {
  id: string;
  name: string;
  title: string;
  relationship: string;
  credibilityScore: number;
  emotionalTone:
    | "passionate"
    | "heartfelt"
    | "professional"
    | "urgent"
    | "hopeful"
    | "determined"
    | "compassionate";
  quote: string;
  fullText?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  impactScore: number;
  wordCount: number;
  priority: "high" | "medium" | "low";
}

interface AdvancedCharacterWitnessDisplayProps {
  witnesses: CharacterWitness[];
  className?: string;
  maxVisible?: number;
  enableVideo?: boolean;
  enableInteractionTracking?: boolean;
}

// Memoized Video Testimonial Component
const VideoTestimonial = memo(function VideoTestimonial({
  witness,
  onPlay,
  onPause,
}: {
  witness: CharacterWitness;
  onPlay: () => void;
  onPause: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlay();

    // Track video interaction
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: "video_testimonial_played",
        witnessName: witness.name,
        witnessId: witness.id,
        credibilityScore: witness.credibilityScore,
      },
    });
  }, [witness, onPlay]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    onPause();
  }, [onPause]);

  if (!witness.videoUrl || !witness.videoThumbnail) {
    return null;
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
      {!isPlaying ? (
        // Video Thumbnail with Play Button
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handlePlay}
        >
          <img
            src={witness.videoThumbnail}
            alt={`${witness.name} video testimonial`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
            Video Testimonial
          </div>
        </div>
      ) : (
        // Video Player
        <div className="relative w-full h-full">
          <video
            src={witness.videoUrl}
            controls
            autoPlay
            muted={isMuted}
            onPause={handlePause}
            className="w-full h-full object-cover"
          >
            Your browser does not support video playback.
          </video>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// Memoized Witness Card Component
const WitnessCard = memo(function WitnessCard({
  witness,
  index,
  enableVideo,
  enableInteractionTracking,
  onExpand,
}: {
  witness: CharacterWitness;
  index: number;
  enableVideo?: boolean;
  enableInteractionTracking?: boolean;
  onExpand: (witness: CharacterWitness) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleInteraction = useCallback(
    (action: string) => {
      if (!enableInteractionTracking) return;

      trackConversion({
        eventType: "cta_clicked",
        userType: "visitor",
        conversionType: "secondary",
        metadata: {
          action,
          witnessName: witness.name,
          witnessId: witness.id,
          credibilityScore: witness.credibilityScore,
          impactScore: witness.impactScore,
          position: index + 1,
        },
      });
    },
    [witness, index, enableInteractionTracking],
  );

  const handleShare = useCallback(() => {
    handleInteraction("share");

    if (navigator.share) {
      navigator.share({
        title: `Character Witness: ${witness.name}`,
        text: `"${witness.quote}" - ${witness.name}, ${witness.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `"${witness.quote}" - ${witness.name}, ${witness.title}`,
      );
    }
  }, [witness, handleInteraction]);

  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    handleInteraction(isLiked ? "unlike" : "like");
  }, [isLiked, handleInteraction]);

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  const toneColors = {
    passionate: "bg-orange-50 border-orange-200",
    heartfelt: "bg-pink-50 border-pink-200",
    professional: "bg-blue-50 border-blue-200",
    urgent: "bg-red-50 border-red-200",
    hopeful: "bg-green-50 border-green-200",
    determined: "bg-purple-50 border-purple-200",
    compassionate: "bg-indigo-50 border-indigo-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card
        className={`h-full transition-all duration-300 hover:shadow-xl ${toneColors[witness.emotionalTone]} ${isHovered ? "transform scale-105" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">
                {witness.name}
              </h3>
              <p className="text-sm text-gray-600">{witness.title}</p>
              <p className="text-xs text-gray-500">{witness.relationship}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={priorityColors[witness.priority]}>
                {witness.priority.toUpperCase()}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium">
                  {witness.credibilityScore}/10
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Video Testimonial */}
          {enableVideo && witness.videoUrl && (
            <VideoTestimonial
              witness={witness}
              onPlay={() => handleInteraction("video_play")}
              onPause={() => handleInteraction("video_pause")}
            />
          )}

          {/* Quote Section */}
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gray-300" />
            <blockquote className="text-gray-800 italic leading-relaxed pl-6 pr-2">
              "{witness.quote}"
            </blockquote>
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{witness.wordCount} words</span>
            <div className="flex items-center space-x-2">
              <span>Impact: {witness.impactScore}/100</span>
              <Badge variant="outline" className="text-xs">
                {witness.emotionalTone}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleInteraction("expand");
                onExpand(witness);
              }}
              className="text-xs"
            >
              Read Full Letter
            </Button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`p-1 rounded-full transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-1 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default function AdvancedCharacterWitnessDisplay({
  witnesses,
  className = "",
  maxVisible = 6,
  enableVideo = true,
  enableInteractionTracking = true,
}: AdvancedCharacterWitnessDisplayProps) {
  const [visibleCount, setVisibleCount] = useState(maxVisible);
  const [selectedWitness, setSelectedWitness] =
    useState<CharacterWitness | null>(null);

  // Sort witnesses by priority and impact score
  const sortedWitnesses = witnesses.sort((a, b) => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    const priorityDiff =
      priorityWeight[b.priority] - priorityWeight[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.impactScore - a.impactScore;
  });

  const visibleWitnesses = sortedWitnesses.slice(0, visibleCount);
  const hasMore = witnesses.length > visibleCount;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 3, witnesses.length));

    if (enableInteractionTracking) {
      trackConversion({
        eventType: "cta_clicked",
        userType: "visitor",
        conversionType: "secondary",
        metadata: {
          action: "character_witness_load_more",
          currentCount: visibleCount,
          totalCount: witnesses.length,
        },
      });
    }
  }, [visibleCount, witnesses.length, enableInteractionTracking]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Character Witness Letters
        </h2>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <span>{witnesses.length} Total Letters</span>
          <span>
            {witnesses
              .reduce((sum, w) => sum + w.wordCount, 0)
              .toLocaleString()}{" "}
            Words
          </span>
          <span>
            Avg Impact:{" "}
            {Math.round(
              witnesses.reduce((sum, w) => sum + w.impactScore, 0) /
                witnesses.length,
            )}
            /100
          </span>
        </div>
      </div>

      {/* Witness Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {visibleWitnesses.map((witness, index) => (
            <WitnessCard
              key={witness.id}
              witness={witness}
              index={index}
              enableVideo={enableVideo}
              enableInteractionTracking={enableInteractionTracking}
              onExpand={setSelectedWitness}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Load More Letters ({witnesses.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {/* Selected Witness Modal would go here */}
      {selectedWitness && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedWitness.name}</h3>
                  <p className="text-gray-600">{selectedWitness.title}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedWitness(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="prose prose-sm max-w-none">
                {selectedWitness.fullText || selectedWitness.quote}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
