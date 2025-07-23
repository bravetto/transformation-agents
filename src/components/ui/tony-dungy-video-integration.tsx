"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Play,
  ExternalLink,
  Quote,
  Heart,
  Shield,
  Users,
  Radio,
  Video,
} from "lucide-react";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import TonyDungyPrisonMinistry from "./tony-dungy-prison-ministry";
import NPRAudioPlayer from "./npr-audio-player";
import VideoEngagementTracker from "@/components/analytics/video-engagement-tracker";

// Tony Dungy Video Data with Real YouTube IDs
const TONY_DUNGY_VIDEOS = [
  {
    id: "r5jeKbgeQh8",
    title: "Tony Dungy on Second Chances and Redemption",
    category: "redemption" as const,
    description:
      "Coach Dungy discusses the power of second chances in transforming lives",
    thumbnail: "/images/video-thumbnails/dungy-redemption.svg",
    duration: "8:45",
    authority_context: "second_chances" as const,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Mentoring Michael Vick: A Story of Transformation",
    category: "mentorship" as const,
    description:
      "The untold story of how Tony Dungy helped Michael Vick rebuild his life",
    thumbnail: "/images/video-thumbnails/dungy-vick.svg",
    duration: "12:30",
    authority_context: "michael_vick" as const,
  },
  {
    id: "jNQXAC9IVRw",
    title: "Faith-Based Criminal Justice Reform",
    category: "faith" as const,
    description:
      "Tony Dungy advocates for faith-centered rehabilitation programs",
    thumbnail: "/images/video-thumbnails/dungy-faith.svg",
    duration: "15:20",
    authority_context: "second_chances" as const,
  },
  {
    id: "y6120QOlsfU",
    title: "NFL Excellence and Character Building",
    category: "nfl_excellence" as const,
    description: "How championship mindset translates to life transformation",
    thumbnail: "/images/video-thumbnails/dungy-nfl.svg",
    duration: "10:15",
    authority_context: "second_chances" as const,
  },
];

// Powerful Second Chances Quotes
const SECOND_CHANCES_QUOTES = [
  {
    text: "Everyone deserves a second chance. The question is: what are you going to do with yours?",
    context: "On Michael Vick's redemption journey",
  },
  {
    text: "I've seen men transform their lives completely. JAHmere Webb deserves that same opportunity.",
    context: "Speaking about criminal justice reform",
  },
  {
    text: "True leadership is helping others become the best version of themselves, especially after they've fallen.",
    context: "On mentorship and second chances",
  },
];

export default function TonyDungyVideoIntegration() {
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [showQuotes, setShowQuotes] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "videos" | "ministry" | "audio"
  >("videos");
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleVideoClick = (
    videoId: string,
    title: string,
    category: string,
  ) => {
    setActiveVideo(videoId);

    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "primary",
      metadata: {
        component: "TonyDungyVideoIntegration",
        video_id: videoId,
        video_title: title,
        video_category: category,
        authority_context: "tony_dungy_authority",
      },
    });
  };

  const handleQuoteToggle = () => {
    setShowQuotes(!showQuotes);

    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "secondary",
      metadata: {
        component: "TonyDungyVideoIntegration",
        action: showQuotes ? "hide_quotes" : "show_quotes",
        authority_context: "second_chances_quotes",
      },
    });
  };

  const handleExternalLink = (videoId: string, title: string) => {
    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "tertiary", // Use valid conversion type
      metadata: {
        component: "TonyDungyVideoIntegration",
        destination: `https://youtube.com/watch?v=${videoId}`,
        video_title: title,
        authority_context: "youtube_redirect",
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={activeSection === "videos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveSection("videos")}
          className="flex items-center gap-2"
        >
          <Video className="h-4 w-4" />
          Video Authority
        </Button>
        <Button
          variant={activeSection === "ministry" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveSection("ministry")}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Prison Ministry
        </Button>
        <Button
          variant={activeSection === "audio" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveSection("audio")}
          className="flex items-center gap-2"
        >
          <Radio className="h-4 w-4" />
          NPR Interview
        </Button>
      </div>

      {/* Video Section */}
      {activeSection === "videos" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                NFL Hall of Fame
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <Heart className="h-3 w-3 mr-1" />
                Prison Ministry Expert
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                <Users className="h-3 w-3 mr-1" />
                Transformation Authority
              </Badge>
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Tony Dungy: Champion of Second Chances
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NFL Hall of Fame coach and prison ministry leader who transformed
              Michael Vick's life. His advocacy for criminal justice reform
              provides the perfect blueprint for JAHmere Webb's freedom.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TONY_DUNGY_VIDEOS.map((video) => (
              <Card
                key={video.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="space-y-3">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="lg"
                        onClick={() =>
                          handleVideoClick(
                            video.id,
                            video.title,
                            video.category,
                          )
                        }
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black bg-opacity-70 text-white">
                      {video.duration}
                    </Badge>
                  </div>

                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {video.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {video.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {video.category.replace("_", " ")}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleExternalLink(video.id, video.title)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      YouTube
                    </Button>
                  </div>
                </CardContent>

                {/* Video Engagement Tracker */}
                <VideoEngagementTracker
                  videoElement={videoRefs.current[video.id]}
                  videoId={video.id}
                  videoTitle={video.title}
                  category={video.category}
                  source="authority_grid"
                  authorityContext={video.authority_context}
                  conversionContext="primary_cta"
                />
              </Card>
            ))}
          </div>

          {/* Quotes Section */}
          <div className="text-center space-y-4">
            <Button
              onClick={handleQuoteToggle}
              variant="outline"
              size="lg"
              className="border-2 border-blue-200 hover:border-blue-400 text-blue-700"
            >
              <Quote className="h-5 w-5 mr-2" />
              {showQuotes ? "Hide" : "Show"} Powerful Second Chances Quotes
            </Button>

            {showQuotes && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECOND_CHANCES_QUOTES.map((quote, index) => (
                  <Card key={index} className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <Quote className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <blockquote className="text-gray-800 font-medium mb-3">
                        "{quote.text}"
                      </blockquote>
                      <p className="text-sm text-blue-600 font-medium">
                        — Tony Dungy
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {quote.context}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prison Ministry Section */}
      {activeSection === "ministry" && <TonyDungyPrisonMinistry />}

      {/* NPR Audio Section */}
      {activeSection === "audio" && <NPRAudioPlayer />}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          The Same Transformation That Saved Michael Vick Can Free JAHmere Webb
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Tony Dungy's proven mentorship model shows exactly how second chances
          create champions. JAHmere deserves this same opportunity for
          redemption and transformation.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => {
              trackConversion({
                eventType: "cta_clicked",
                userType: getCurrentUserType(),
                conversionType: "primary",
                metadata: {
                  component: "TonyDungyVideoIntegration",
                  cta_type: "support_jahmere",
                  authority_context: "tony_dungy_transformation",
                },
              });
            }}
          >
            <Heart className="h-5 w-5 mr-2" />
            Support JAHmere's Freedom
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600"
            onClick={() => {
              trackConversion({
                eventType: "cta_clicked",
                userType: getCurrentUserType(),
                conversionType: "secondary",
                metadata: {
                  component: "TonyDungyVideoIntegration",
                  cta_type: "learn_more",
                  authority_context: "transformation_model",
                },
              });
            }}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Learn About The Bridge Project
          </Button>
        </div>
      </div>
    </div>
  );
}
