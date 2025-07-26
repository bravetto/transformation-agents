"use client";

import { YouTubeEmbed } from "@next/third-parties/google";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "./button";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface OptimizedYouTubeEmbedProps {
  videoId: string;
  title: string;
  width?: number;
  height?: number;
  className?: string;
  trackAnalytics?: boolean;
  category?: string;
  authorityContext?: string;
  params?: string;
}

export default function OptimizedYouTubeEmbed({
  videoId,
  title,
  width = 560,
  height = 315,
  className = "",
  trackAnalytics = true,
  category = "video",
  authorityContext = "youtube_embed",
  params = "",
}: OptimizedYouTubeEmbedProps) {
  const [hasError, setHasError] = useState(false);

  const handleExternalLink = () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, "_blank");

    if (trackAnalytics) {
      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "tertiary",
        metadata: {
          component: "OptimizedYouTubeEmbed",
          video_id: videoId,
          video_title: title,
          destination: youtubeUrl,
          authority_context: authorityContext,
          action: "external_youtube_link",
        },
      });
    }
  };

  const handleVideoInteraction = () => {
    if (trackAnalytics) {
      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "primary",
        metadata: {
          component: "OptimizedYouTubeEmbed",
          video_id: videoId,
          video_title: title,
          video_category: category,
          authority_context: authorityContext,
          action: "video_interaction",
        },
      });
    }
  };

  if (hasError) {
    return (
      <div
        className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}
      >
        <div className="aspect-video flex items-center justify-center bg-gray-200">
          <div className="text-center p-6">
            <div className="text-gray-500 mb-4">
              <Play className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {title}
            </h3>
            <p className="text-gray-500 mb-4">Video temporarily unavailable</p>
            <Button
              onClick={handleExternalLink}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{ aspectRatio: "16/9" }}
      onClick={handleVideoInteraction}
    >
      <YouTubeEmbed
        videoid={videoId}
        height={height}
        width={width}
        params={params}
        playlabel={`Play ${title}`}
      />

      {/* External link button */}
      <div className="absolute top-2 right-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleExternalLink();
          }}
          variant="ghost"
          size="sm"
          className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
