"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Play, ExternalLink, Quote, Heart } from "lucide-react";
import { trackConversion } from "@/lib/analytics/user-journey";

// Real video data from research
const FEATURED_VIDEO = {
  id: "r5jeKbgeQh8",
  title: "Tony Dungy - Is Winning Enough?",
  description:
    "NFL Hall of Fame coach Tony Dungy discusses finding purpose beyond success and the importance of second chances.",
  thumbnail: "/images/video-thumbnails/tony-dungy-quiet-strength.svg",
  duration: "15:32",
  category: "Redemption & Purpose",
  jordanConnection:
    "Powerful message about finding meaning beyond achievements - perfect parallel to Jordan Dungy's story",
};

const VIDEO_GRID = [
  {
    id: "xvRs9L8dY6c",
    title: "Good Came Out of His Son's Death",
    description:
      "Tony Dungy shares how tragedy led to purpose and helping others find hope.",
    thumbnail: "/images/video-thumbnails/faith-transformation.svg",
    duration: "8:45",
    category: "Faith & Loss",
    jordanConnection:
      "Profound testimony of how Jordan's legacy continues to transform lives",
  },
  {
    id: "IEu4Z7UEzSQ",
    title: "Hall of Fame Speech",
    description:
      "Coach Dungy's inspiring Hall of Fame induction speech about character and leadership.",
    thumbnail: "/images/video-thumbnails/super-bowl-victory.svg",
    duration: "12:18",
    category: "Leadership",
    jordanConnection:
      "Honors his family and discusses the character lessons Jordan taught him",
  },
  {
    id: "uimoMcONAP4",
    title: "Dan Patrick Show - Full Interview",
    description:
      "Comprehensive interview covering mentorship, second chances, and prison ministry.",
    thumbnail: "/images/video-thumbnails/coaching-potential.svg",
    duration: "34:27",
    category: "Second Chances",
    jordanConnection:
      "Discusses his work with ex-offenders and belief in transformation",
  },
  {
    id: "bqB0NNf4ez8",
    title: "Dan Patrick Show Interview 2014",
    description:
      "Tony discusses his transition from coaching to mentoring and helping others.",
    thumbnail: "/images/video-thumbnails/all-pro-dad.svg",
    duration: "28:15",
    category: "Mentorship",
    jordanConnection:
      "Talks about how Jordan's influence shaped his mentoring approach",
  },
];

// Powerful quotes from research
const SECOND_CHANCES_QUOTES = [
  {
    quote:
      "You only get one shot at a second chance, and I'm conscious of that.",
    speaker: "Michael Vick (mentored by Tony Dungy)",
    context: "After release from prison",
  },
  {
    quote:
      "We have roughly 4,000 inmates who come back to Indianapolis and we wanted to structure things for those young men who made a mistake and be productive.",
    speaker: "Tony Dungy",
    context: "Indianapolis reentry program",
  },
  {
    quote:
      "I would take a chance on him... I believe he would. I think he's learned from this.",
    speaker: "Tony Dungy",
    context: "About giving Michael Vick a second chance",
  },
  {
    quote:
      "There is no unforgivable sin. All sin is repentable and is covered under Christian beliefs of salvation.",
    speaker: "Tony Dungy",
    context: "Prison ministry philosophy",
  },
];

const TonyDungyVideoIntegration: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showQuotes, setShowQuotes] = useState(false);

  const handleVideoClick = (videoId: string, title: string) => {
    setActiveVideo(videoId);
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        videoId,
        videoTitle: title,
        source: "tony_dungy_integration",
        category: "nfl_authority_content",
        action: "video_engagement",
      },
    });
  };

  const handleQuoteToggle = () => {
    setShowQuotes(!showQuotes);
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: showQuotes ? "hide_quotes" : "show_quotes",
        source: "second_chances_quotes",
        component: "tony_dungy_integration",
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Featured Video Hero */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-blue-600 text-white">
              🏆 NFL Hall of Fame Authority
            </Badge>
            <Badge
              variant="outline"
              className="border-green-600 text-green-700"
            >
              Prison Ministry Expert
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-900">
            Tony Dungy: Championship Coach, Criminal Justice Advocate
          </CardTitle>
          <p className="text-gray-700">
            Super Bowl-winning coach who mentored Michael Vick in prison and
            advocates for 4,000+ returning citizens in Indianapolis annually.
          </p>
        </CardHeader>

        <CardContent>
          {/* Featured Video */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div
              className="relative group cursor-pointer"
              onClick={() =>
                handleVideoClick(FEATURED_VIDEO.id, FEATURED_VIDEO.title)
              }
            >
              <img
                src={FEATURED_VIDEO.thumbnail}
                alt={FEATURED_VIDEO.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                <Play className="w-16 h-16 text-white" />
              </div>
              <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                {FEATURED_VIDEO.duration}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-900">
                {FEATURED_VIDEO.title}
              </h3>
              <p className="text-gray-700">{FEATURED_VIDEO.description}</p>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Jordan Connection
                  </span>
                </div>
                <p className="text-green-700 text-sm">
                  {FEATURED_VIDEO.jordanConnection}
                </p>
              </div>

              <Button
                onClick={() =>
                  handleVideoClick(FEATURED_VIDEO.id, FEATURED_VIDEO.title)
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Full Interview
              </Button>
            </div>
          </div>

          {/* Second Chances Quotes Section */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
                <Quote className="w-5 h-5" />
                Tony Dungy on Second Chances
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuoteToggle}
                className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
              >
                {showQuotes ? "Hide Quotes" : "Show Powerful Quotes"}
              </Button>
            </div>

            {showQuotes && (
              <div className="grid md:grid-cols-2 gap-4">
                {SECOND_CHANCES_QUOTES.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-yellow-200"
                  >
                    <blockquote className="text-gray-800 italic mb-2">
                      "{item.quote}"
                    </blockquote>
                    <cite className="text-sm font-semibold text-blue-700">
                      — {item.speaker}
                    </cite>
                    <p className="text-xs text-gray-600 mt-1">{item.context}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">
            More Tony Dungy Content: Leadership, Faith & Transformation
          </CardTitle>
          <p className="text-gray-600">
            Discover how championship leadership translates to life
            transformation and criminal justice advocacy.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_GRID.map((video) => (
              <div key={video.id} className="group">
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleVideoClick(video.id, video.title)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                    {video.duration}
                  </Badge>
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                    {video.category}
                  </Badge>
                </div>

                <div className="mt-3 space-y-2">
                  <h4 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="bg-blue-50 p-2 rounded text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <Heart className="w-3 h-3 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Jordan Impact
                      </span>
                    </div>
                    <p className="text-blue-700">{video.jordanConnection}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-green-800">
              NFL Authority Meets Criminal Justice Reform
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Tony Dungy's work with Michael Vick and 4,000+ returning citizens
              proves that transformation is possible. His championship authority
              gives weight to JAHmere's case for redemption.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50"
                onClick={() =>
                  window.open(
                    "https://www.npr.org/templates/story/story.php?storyId=111782935",
                    "_blank",
                  )
                }
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                NPR: "I Would Take A Chance On Him"
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() =>
                  window.open(
                    "https://www.iamsecond.com/film/tony-dungy/",
                    "_blank",
                  )
                }
              >
                <Play className="w-4 h-4 mr-2" />I Am Second Interview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Tony Dungy Video</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveVideo(null)}
              >
                Close
              </Button>
            </div>
            <div className="p-4">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo}`}
                  title="Tony Dungy Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TonyDungyVideoIntegration;
