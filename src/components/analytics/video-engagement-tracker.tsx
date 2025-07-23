"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

// Video Engagement Events (2024 Standards)
interface VideoEngagementEvent {
  eventType:
    | "video_start"
    | "video_progress"
    | "video_complete"
    | "video_pause"
    | "video_resume"
    | "video_seek"
    | "video_quality_change"
    | "video_error";
  videoId: string;
  videoTitle: string;
  currentTime: number;
  duration: number;
  progressPercentage: number;
  playbackRate: number;
  quality?: string;
  userType: "visitor" | "coach" | "judge" | "activist" | "divine-warrior";
  sessionId: string;
  timestamp: number;
  metadata?: {
    source?:
      | "hero_section"
      | "ministry_section"
      | "case_study"
      | "authority_grid";
    category?:
      | "redemption"
      | "mentorship"
      | "faith"
      | "nfl_excellence"
      | "prison_ministry";
    authority_context?: "michael_vick" | "jahmere_webb" | "second_chances";
    conversion_context?: "primary_cta" | "secondary_cta" | "social_share";
    milestone?: number;
    seek_from?: number;
    seek_to?: number;
    seek_distance?: number;
    error_type?: string;
    error_message?: string;
    session_end?: boolean;
    final_engagement_data?: any;
    total_watch_time?: number;
    max_progress_reached?: number;
    pause_count?: number;
    seek_count?: number;
  };
}

// Engagement Milestones (Industry Standard 2024)
const ENGAGEMENT_MILESTONES = [10, 25, 50, 75, 90, 100]; // Percentage thresholds

// Advanced Video Analytics Configuration
interface VideoAnalyticsConfig {
  trackingEnabled: boolean;
  milestoneTracking: boolean;
  heatmapTracking: boolean;
  qualityTracking: boolean;
  errorTracking: boolean;
  sessionTracking: boolean;
  conversionTracking: boolean;
}

interface VideoEngagementTrackerProps {
  videoElement: HTMLVideoElement | null;
  videoId: string;
  videoTitle: string;
  category:
    | "redemption"
    | "mentorship"
    | "faith"
    | "nfl_excellence"
    | "prison_ministry";
  source: "hero_section" | "ministry_section" | "case_study" | "authority_grid";
  authorityContext?: "michael_vick" | "jahmere_webb" | "second_chances";
  conversionContext?: "primary_cta" | "secondary_cta" | "social_share";
  config?: Partial<VideoAnalyticsConfig>;
  onEngagementEvent?: (event: VideoEngagementEvent) => void;
}

export default function VideoEngagementTracker({
  videoElement,
  videoId,
  videoTitle,
  category,
  source,
  authorityContext,
  conversionContext,
  config = {},
  onEngagementEvent,
}: VideoEngagementTrackerProps) {
  const [sessionId] = useState(
    () =>
      `video_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  );
  const [trackedMilestones, setTrackedMilestones] = useState<Set<number>>(
    new Set(),
  );
  const [lastPosition, setLastPosition] = useState(0);
  const [engagementData, setEngagementData] = useState({
    totalWatchTime: 0,
    maxProgressReached: 0,
    pauseCount: 0,
    seekCount: 0,
    qualityChanges: 0,
    playbackRateChanges: 0,
  });

  const startTimeRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  // Default configuration with 2024 best practices
  const defaultConfig: VideoAnalyticsConfig = {
    trackingEnabled: true,
    milestoneTracking: true,
    heatmapTracking: true,
    qualityTracking: true,
    errorTracking: true,
    sessionTracking: true,
    conversionTracking: true,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Create engagement event
  const createEngagementEvent = useCallback(
    (
      eventType: VideoEngagementEvent["eventType"],
      additionalData?: Partial<VideoEngagementEvent>,
    ): VideoEngagementEvent => {
      if (!videoElement) {
        return {} as VideoEngagementEvent;
      }

      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration || 0;
      const progressPercentage =
        duration > 0 ? (currentTime / duration) * 100 : 0;

      return {
        eventType,
        videoId,
        videoTitle,
        currentTime,
        duration,
        progressPercentage,
        playbackRate: videoElement.playbackRate || 1,
        userType: getCurrentUserType(),
        sessionId,
        timestamp: Date.now(),
        metadata: {
          source,
          category,
          authority_context: authorityContext,
          conversion_context: conversionContext,
        },
        ...additionalData,
      };
    },
    [
      videoElement,
      videoId,
      videoTitle,
      category,
      source,
      authorityContext,
      conversionContext,
      sessionId,
    ],
  );

  // Track engagement event
  const trackEngagementEvent = useCallback(
    (event: VideoEngagementEvent) => {
      if (!finalConfig.trackingEnabled) return;

      // Track with PostHog/analytics using valid event types
      trackConversion({
        eventType: "cta_clicked", // Use valid event type
        userType: event.userType,
        conversionType: "secondary", // Use valid conversion type
        metadata: {
          video_event_type: event.eventType,
          video_id: event.videoId,
          video_title: event.videoTitle,
          progress_percentage: event.progressPercentage,
          current_time: event.currentTime,
          duration: event.duration,
          session_id: event.sessionId,
          source: event.metadata?.source,
          category: event.metadata?.category,
          authority_context: event.metadata?.authority_context,
          conversion_context: event.metadata?.conversion_context,
        },
      });

      // Call custom handler if provided
      if (onEngagementEvent) {
        onEngagementEvent(event);
      }

      console.log("Video Engagement Event:", event);
    },
    [finalConfig.trackingEnabled, onEngagementEvent],
  );

  // Handle video start
  const handleVideoStart = useCallback(() => {
    startTimeRef.current = Date.now();
    lastUpdateRef.current = Date.now();

    const event = createEngagementEvent("video_start");
    trackEngagementEvent(event);
  }, [createEngagementEvent, trackEngagementEvent]);

  // Handle video progress tracking
  const handleVideoProgress = useCallback(() => {
    if (!videoElement || !finalConfig.milestoneTracking) return;

    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration || 0;
    const progressPercentage =
      duration > 0 ? (currentTime / duration) * 100 : 0;

    // Update engagement data
    const now = Date.now();
    const timeDiff = (now - lastUpdateRef.current) / 1000; // Convert to seconds

    setEngagementData((prev) => ({
      ...prev,
      totalWatchTime: prev.totalWatchTime + timeDiff,
      maxProgressReached: Math.max(prev.maxProgressReached, progressPercentage),
    }));

    lastUpdateRef.current = now;

    // Track milestone events
    ENGAGEMENT_MILESTONES.forEach((milestone) => {
      if (
        progressPercentage >= milestone &&
        !trackedMilestones.has(milestone)
      ) {
        setTrackedMilestones((prev) => new Set([...prev, milestone]));

        const event = createEngagementEvent("video_progress", {
          metadata: {
            source,
            category,
            authority_context: authorityContext,
            conversion_context: conversionContext,
            milestone: milestone,
          },
        });
        trackEngagementEvent(event);
      }
    });

    // Track seeking behavior
    const timeDifference = Math.abs(currentTime - lastPosition);
    if (timeDifference > 2) {
      // Threshold for seek detection
      setEngagementData((prev) => ({ ...prev, seekCount: prev.seekCount + 1 }));

      const event = createEngagementEvent("video_seek", {
        metadata: {
          source,
          category,
          authority_context: authorityContext,
          conversion_context: conversionContext,
          seek_from: lastPosition,
          seek_to: currentTime,
          seek_distance: timeDifference,
        },
      });
      trackEngagementEvent(event);
    }

    setLastPosition(currentTime);
  }, [
    videoElement,
    finalConfig.milestoneTracking,
    trackedMilestones,
    lastPosition,
    createEngagementEvent,
    trackEngagementEvent,
    source,
    category,
    authorityContext,
    conversionContext,
  ]);

  // Handle video completion
  const handleVideoComplete = useCallback(() => {
    const event = createEngagementEvent("video_complete", {
      metadata: {
        source,
        category,
        authority_context: authorityContext,
        conversion_context: conversionContext,
        total_watch_time: engagementData.totalWatchTime,
        max_progress_reached: engagementData.maxProgressReached,
        pause_count: engagementData.pauseCount,
        seek_count: engagementData.seekCount,
      },
    });
    trackEngagementEvent(event);

    // Track conversion if video completion indicates high engagement
    if (
      finalConfig.conversionTracking &&
      engagementData.maxProgressReached > 75
    ) {
      trackConversion({
        eventType: "goal_achieved", // Use valid event type for completion
        userType: getCurrentUserType(),
        conversionType: "primary", // Use valid conversion type for high engagement
        metadata: {
          video_id: videoId,
          completion_rate: engagementData.maxProgressReached,
          authority_context: authorityContext,
        },
      });
    }
  }, [
    createEngagementEvent,
    trackEngagementEvent,
    engagementData,
    finalConfig.conversionTracking,
    videoId,
    authorityContext,
    source,
    category,
    conversionContext,
  ]);

  // Handle video pause
  const handleVideoPause = useCallback(() => {
    setEngagementData((prev) => ({ ...prev, pauseCount: prev.pauseCount + 1 }));

    const event = createEngagementEvent("video_pause");
    trackEngagementEvent(event);
  }, [createEngagementEvent, trackEngagementEvent]);

  // Handle video resume
  const handleVideoResume = useCallback(() => {
    const event = createEngagementEvent("video_resume");
    trackEngagementEvent(event);
  }, [createEngagementEvent, trackEngagementEvent]);

  // Handle video errors
  const handleVideoError = useCallback(
    (error: Event) => {
      if (!finalConfig.errorTracking) return;

      const event = createEngagementEvent("video_error", {
        metadata: {
          source,
          category,
          authority_context: authorityContext,
          conversion_context: conversionContext,
          error_type:
            (error.target as HTMLVideoElement)?.error?.code?.toString() ||
            "unknown",
          error_message:
            (error.target as HTMLVideoElement)?.error?.message ||
            "Unknown error",
        },
      });
      trackEngagementEvent(event);
    },
    [
      finalConfig.errorTracking,
      createEngagementEvent,
      trackEngagementEvent,
      source,
      category,
      authorityContext,
      conversionContext,
    ],
  );

  // Attach event listeners
  useEffect(() => {
    if (!videoElement || !finalConfig.trackingEnabled) return;

    const handlePlay = handleVideoStart;
    const handleTimeUpdate = handleVideoProgress;
    const handleEnded = handleVideoComplete;
    const handlePause = handleVideoPause;
    const handlePlaying = handleVideoResume;
    const handleError = handleVideoError;

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("playing", handlePlaying);
    videoElement.addEventListener("error", handleError);

    // Quality change tracking (if supported)
    if (finalConfig.qualityTracking && "onqualitychange" in videoElement) {
      const handleQualityChange = () => {
        setEngagementData((prev) => ({
          ...prev,
          qualityChanges: prev.qualityChanges + 1,
        }));
        const event = createEngagementEvent("video_quality_change");
        trackEngagementEvent(event);
      };

      videoElement.addEventListener("qualitychange", handleQualityChange);

      return () => {
        videoElement.removeEventListener("qualitychange", handleQualityChange);
      };
    }

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("playing", handlePlaying);
      videoElement.removeEventListener("error", handleError);
    };
  }, [
    videoElement,
    finalConfig.trackingEnabled,
    finalConfig.qualityTracking,
    handleVideoStart,
    handleVideoProgress,
    handleVideoComplete,
    handleVideoPause,
    handleVideoResume,
    handleVideoError,
    createEngagementEvent,
    trackEngagementEvent,
  ]);

  // Session tracking cleanup
  useEffect(() => {
    if (!finalConfig.sessionTracking) return;

    const handleBeforeUnload = () => {
      // Send final engagement data before page unload
      const event = createEngagementEvent("video_progress", {
        metadata: {
          source,
          category,
          authority_context: authorityContext,
          conversion_context: conversionContext,
          session_end: true,
          final_engagement_data: engagementData,
        },
      });

      // Use sendBeacon for reliable delivery
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/video-engagement",
          JSON.stringify(event),
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    finalConfig.sessionTracking,
    createEngagementEvent,
    engagementData,
    source,
    category,
    authorityContext,
    conversionContext,
  ]);

  // Return null as this is a tracking-only component
  return null;
}
