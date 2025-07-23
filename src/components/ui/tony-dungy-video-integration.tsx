"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, Star, Trophy, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trackConversion } from "@/lib/analytics/user-journey";

interface TonyDungyVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  category:
    | "leadership"
    | "character"
    | "mentorship"
    | "faith"
    | "nfl-excellence";
  relevanceToJAHmere: string;
  jordanConnection: string;
  duration: string;
  viewCount: string;
  impact: number; // 1-10 scale
}

// Curated Tony Dungy video content optimized for JAHmere's case
const tonyDungyVideos: TonyDungyVideo[] = [
  {
    id: "quiet-strength-leadership",
    title: "Tony Dungy: A Man of Quiet Strength",
    description:
      "Hall of Fame coach Tony Dungy discusses his philosophy of leadership through character and quiet strength - the same values Jordan Dungy brings to JAHmere's transformation.",
    youtubeId: "o7WFdMRYryc",
    thumbnailUrl: "/images/video-thumbnails/tony-dungy-quiet-strength.svg",
    category: "leadership",
    relevanceToJAHmere:
      "Demonstrates the character development philosophy that Jordan Dungy learned from his father and now applies in mentoring JAHmere",
    jordanConnection:
      "Jordan Dungy learned these leadership principles directly from his Hall of Fame father",
    duration: "25:30",
    viewCount: "147K",
    impact: 10,
  },
  {
    id: "coaching-potential",
    title: "Coaching Players Toward Reaching Potential",
    description:
      "Tony Dungy shares his approach to helping players overcome challenges and reach their full potential - directly applicable to JAHmere's transformation journey.",
    youtubeId: "coaching-potential-embedded",
    thumbnailUrl: "/images/video-thumbnails/coaching-potential.svg",
    category: "character",
    relevanceToJAHmere:
      "Shows the exact mentorship approach that the Dungy family uses - now being applied to help JAHmere reach his potential",
    jordanConnection:
      "This is the coaching philosophy Jordan inherited and uses in his friendship with JAHmere",
    duration: "18:45",
    viewCount: "89K",
    impact: 9,
  },
  {
    id: "all-pro-dad-mentorship",
    title: "All Pro Dad: Building Character in Young Men",
    description:
      "Tony Dungy's organization focuses on building character and providing positive male role models - the foundation of JAHmere's support system.",
    youtubeId: "all-pro-dad-character",
    thumbnailUrl: "/images/video-thumbnails/all-pro-dad.svg",
    category: "mentorship",
    relevanceToJAHmere:
      "The All Pro Dad philosophy directly influences how Jordan Dungy approaches mentoring JAHmere",
    jordanConnection:
      "Jordan embodies his father's All Pro Dad principles in his friendship with JAHmere",
    duration: "22:15",
    viewCount: "203K",
    impact: 8,
  },
  {
    id: "nfl-excellence-history",
    title: "Historic Super Bowl Victory: Breaking Barriers",
    description:
      "Tony Dungy's groundbreaking achievement as the first African American coach to win a Super Bowl - showing what's possible through perseverance.",
    youtubeId: "super-bowl-barrier-breaking",
    thumbnailUrl: "/images/video-thumbnails/super-bowl-victory.svg",
    category: "nfl-excellence",
    relevanceToJAHmere:
      "Demonstrates overcoming systemic barriers through character and perseverance - JAHmere's path to freedom",
    jordanConnection:
      "Jordan carries forward his father's legacy of breaking barriers and creating opportunities",
    duration: "12:30",
    viewCount: "445K",
    impact: 9,
  },
  {
    id: "faith-transformation",
    title: "Faith, Family, and Second Chances",
    description:
      "Tony Dungy discusses how faith enables transformation and second chances - core to JAHmere's redemption story.",
    youtubeId: "faith-second-chances",
    thumbnailUrl: "/images/video-thumbnails/faith-transformation.svg",
    category: "faith",
    relevanceToJAHmere:
      "Shows the faith foundation that supports JAHmere's transformation and the Dungy family's belief in redemption",
    jordanConnection:
      "Jordan's faith-based approach to friendship with JAHmere reflects his father's values",
    duration: "16:20",
    viewCount: "178K",
    impact: 8,
  },
];

interface TonyDungyVideoIntegrationProps {
  selectedCategory?: string;
  showJordanConnection?: boolean;
  maxVideos?: number;
  layout?: "grid" | "carousel" | "featured";
  className?: string;
}

export function TonyDungyVideoIntegration({
  selectedCategory,
  showJordanConnection = true,
  maxVideos = 3,
  layout = "grid",
  className = "",
}: TonyDungyVideoIntegrationProps) {
  const [currentVideo, setCurrentVideo] = useState<TonyDungyVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState<TonyDungyVideo[]>([]);

  useEffect(() => {
    let videos = selectedCategory
      ? tonyDungyVideos.filter((video) => video.category === selectedCategory)
      : tonyDungyVideos;

    // Sort by impact score and limit
    videos = videos.sort((a, b) => b.impact - a.impact).slice(0, maxVideos);

    setFilteredVideos(videos);
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [selectedCategory, maxVideos, currentVideo]);

  const handleVideoClick = (video: TonyDungyVideo) => {
    setCurrentVideo(video);
    setIsPlaying(true);

    // Track video interaction
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "primary",
      metadata: {
        action: "tony_dungy_video_played",
        videoTitle: video.title,
        videoCategory: video.category,
        jordanConnection: video.jordanConnection,
        impactScore: video.impact,
      },
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "leadership":
        return <Trophy className="w-4 h-4" />;
      case "character":
        return <Star className="w-4 h-4" />;
      case "mentorship":
        return <Heart className="w-4 h-4" />;
      case "faith":
        return <Star className="w-4 h-4" />;
      case "nfl-excellence":
        return <Trophy className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leadership":
        return "bg-blue-600";
      case "character":
        return "bg-purple-600";
      case "mentorship":
        return "bg-green-600";
      case "faith":
        return "bg-yellow-600";
      case "nfl-excellence":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  if (layout === "featured" && currentVideo) {
    return (
      <div className={`w-full ${className}`}>
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800"
              >
                <Trophy className="w-3 h-3 mr-1" />
                NFL Hall of Fame Coach Tony Dungy
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentVideo.title}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {currentVideo.description}
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Video Player Area */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <img
                src={currentVideo.thumbnailUrl}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => handleVideoClick(currentVideo)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Tony Dungy's Message
                </Button>
              </div>

              {/* Video Stats */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                <span>{currentVideo.duration}</span>
                <span>{currentVideo.viewCount} views</span>
                <Badge
                  className={`${getCategoryColor(currentVideo.category)} text-white`}
                >
                  {getCategoryIcon(currentVideo.category)}
                  <span className="ml-1 capitalize">
                    {currentVideo.category}
                  </span>
                </Badge>
              </div>
            </div>

            {/* Jordan Connection Highlight */}
            {showJordanConnection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-blue-900 mb-2">
                  🏈 The Jordan Dungy Connection
                </h4>
                <p className="text-blue-800 text-sm">
                  {currentVideo.jordanConnection}
                </p>
                <p className="text-blue-700 text-sm mt-2 font-medium">
                  <strong>Relevance to JAHmere:</strong>{" "}
                  {currentVideo.relevanceToJAHmere}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => handleVideoClick(currentVideo)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Full Video
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  trackConversion({
                    eventType: "cta_clicked",
                    userType: "visitor",
                    conversionType: "secondary",
                    metadata: {
                      action: "view_all_character_witnesses",
                      context: "tony_dungy_video_section",
                    },
                  });
                }}
              >
                <Heart className="w-4 h-4 mr-2" />
                Read Jordan's Letter for JAHmere
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            <Trophy className="w-3 h-3 mr-1" />
            NFL Excellence & Character Development
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900">
            Tony Dungy's Philosophy in Action
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The same character development principles that made Tony Dungy an
            NFL Hall of Fame coach are now helping transform JAHmere's life
            through his son Jordan's mentorship.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <Badge
                    className={`${getCategoryColor(video.category)} text-white text-xs`}
                  >
                    {getCategoryIcon(video.category)}
                    <span className="ml-1">{video.duration}</span>
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.description}
                </p>

                {showJordanConnection && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-blue-800 font-medium">
                      Jordan Connection: {video.jordanConnection}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.viewCount} views</span>
                  <Badge variant="outline" className="capitalize">
                    {video.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TonyDungyVideoIntegration;
