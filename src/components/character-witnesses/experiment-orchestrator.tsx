"use client";

import React, { useState, useEffect } from "react";
import { CharacterWitnessLetter } from "@/types/character-witness";
import {
  createPostHogClient,
  type BootstrapData,
  type ExperimentEvent,
} from "@/lib/ab-testing/posthog-client";
import {
  HeroBannerVariant,
  SidebarCardsVariant,
  CarouselFormatVariant,
  TestimonialGridVariant,
} from "./ab-test-variants";
import { trackConversion } from "@/lib/analytics/user-journey";

interface Props {
  letters: CharacterWitnessLetter[];
  distinctID: string;
  trafficAllocation?: number;
  className?: string;
}

type ExperimentVariant =
  | "control"
  | "hero_banner"
  | "sidebar_cards"
  | "carousel_format"
  | "testimonial_grid";

const EXPERIMENT_KEY = "character_letter_presentation_v1";

export function ExperimentOrchestrator({
  letters,
  distinctID,
  trafficAllocation = 0.8,
  className,
}: Props) {
  const [variant, setVariant] = useState<ExperimentVariant>("control");
  const [isLoading, setIsLoading] = useState(true);
  const [posthogClient, setPosthogClient] = useState<ReturnType<
    typeof createPostHogClient
  > | null>(null);

  // Initialize PostHog client and determine variant
  useEffect(() => {
    try {
      const client = createPostHogClient();
      setPosthogClient(client);

      // Determine if user should be in experiment
      const userId = distinctID || "anonymous";
      const isInExperiment = Math.random() < trafficAllocation;

      if (isInExperiment) {
        // Get variant from PostHog client (which includes fallback logic)
        const assignedVariant = client.getFeatureFlag(
          EXPERIMENT_KEY,
        ) as ExperimentVariant;
        const finalVariant = assignedVariant || "hero_banner";
        setVariant(finalVariant);

        // Track experiment assignment with error handling
        client
          .trackExperimentEvent({
            eventType: "experiment_assigned",
            experimentKey: EXPERIMENT_KEY,
            variant: finalVariant,
            userId: userId,
            metadata: {
              trafficAllocation,
              lettersCount: letters.length,
            },
          })
          .catch((error) => {
            console.warn("Failed to track experiment assignment:", error);
          });
      } else {
        setVariant("control");
      }

      setIsLoading(false);
    } catch (error) {
      console.warn("Failed to initialize PostHog client:", error);
      setVariant("control"); // Fallback to control variant
      setIsLoading(false);
    }
  }, [distinctID, trafficAllocation, letters.length]);

  // Track experiment view
  useEffect(() => {
    if (!isLoading && posthogClient) {
      try {
        posthogClient
          .trackExperimentEvent({
            eventType: "experiment_viewed",
            experimentKey: EXPERIMENT_KEY,
            variant: variant,
            userId: distinctID,
            metadata: {
              lettersCount: letters.length,
            },
          })
          .catch((error) => {
            console.warn("Failed to track experiment view:", error);
          });
      } catch (error) {
        console.warn("Failed to track experiment view:", error);
      }
    }
  }, [isLoading, variant, distinctID, letters.length, posthogClient]);

  // Handle letter engagement tracking
  const handleLetterEngagement = (action: string, letterId?: string) => {
    if (posthogClient) {
      try {
        posthogClient
          .trackExperimentEvent({
            eventType: "experiment_converted",
            experimentKey: EXPERIMENT_KEY,
            variant: variant,
            userId: distinctID,
            metadata: {
              action,
              letterId,
              lettersCount: letters.length,
            },
          })
          .catch((error) => {
            console.warn("Failed to track letter engagement:", error);
          });
      } catch (error) {
        console.warn("Failed to track letter engagement:", error);
      }
    }

    // Also track with existing analytics system
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: action as any,
      metadata: {
        component: "ExperimentOrchestrator",
        variant: variant,
        letterId,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  // Render appropriate variant
  switch (variant) {
    case "hero_banner":
      return (
        <HeroBannerVariant
          letters={letters}
          onEngagement={handleLetterEngagement}
          className={className}
        />
      );
    case "sidebar_cards":
      return (
        <SidebarCardsVariant
          letters={letters}
          onEngagement={handleLetterEngagement}
          className={className}
        />
      );
    case "carousel_format":
      return (
        <CarouselFormatVariant
          letters={letters}
          onEngagement={handleLetterEngagement}
          className={className}
        />
      );
    case "testimonial_grid":
      return (
        <TestimonialGridVariant
          letters={letters}
          onEngagement={handleLetterEngagement}
          className={className}
        />
      );
    default:
      // Control variant - simple character witness display
      return (
        <div className={`character-witnesses-control ${className || ""}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Character Witnesses for JAHmere
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from community leaders, mentors, and friends who know
              JAHmere's true character and transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {letters.slice(0, 6).map((letter) => (
              <div
                key={letter.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {letter.author.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">
                      {letter.author.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {letter.author.title || letter.author.relationship}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{letter.content.keyQuotes[0]}"
                </blockquote>
                <button
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLetterEngagement("read_more_click", letter.id);
                  }}
                >
                  Read Full Letter →
                </button>
              </div>
            ))}
          </div>
        </div>
      );
  }
}
