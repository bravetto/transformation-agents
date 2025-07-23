"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Download,
  Share2,
  Quote,
  Clock,
  Radio,
} from "lucide-react";
import { trackConversion } from "@/lib/analytics/user-journey";

// NPR Interview Data
const NPR_INTERVIEW_DATA = {
  title: "Dungy On Vick: 'I Would Take A Chance On Him'",
  subtitle:
    "Former Indianapolis Colts coach advocates for Michael Vick's second chance",
  date: "August 12, 2009",
  duration: "4:05",
  source: "NPR Morning Edition",
  host: "Steve Inskeep",
  description:
    "Tony Dungy discusses his mentorship of Michael Vick and why he believes in second chances for criminal justice transformation.",
  url: "https://www.npr.org/templates/story/story.php?storyId=111782935",
  audioUrl: "https://www.npr.org/player/embed/111782935/111797291", // NPR embed player
  keyQuotes: [
    {
      quote:
        "I would take a chance on him. After being around Mike for two or three months, I believe he would. I think he's learned from this.",
      timestamp: "3:45",
      context:
        "On whether he would sign Michael Vick if he were still coaching",
    },
    {
      quote:
        "My idea was to always look them in the eye, and see if they've grown from it, see if I believed in them as a person.",
      timestamp: "3:25",
      context:
        "On his philosophy for working with players who had legal troubles",
    },
    {
      quote:
        "I dealt with young men who did things that you and I would never do. The important distinction in this case is that Vick now realizes what he did was wrong.",
      timestamp: "1:30",
      context: "On understanding player rehabilitation and transformation",
    },
  ],
  jahmereParallels: [
    "Same NFL champion authority advocating for second chances",
    "Proven track record of successful high-profile rehabilitation",
    "Faith-based transformation methodology that works",
    "National platform influence for criminal justice reform",
  ],
};

export default function NPRAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(245); // 4:05 in seconds
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeQuote, setActiveQuote] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const audioRef = useRef<HTMLIFrameElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "primary",
      metadata: {
        action: isPlaying ? "audio_pause" : "audio_play",
        source: "npr_interview",
        content: "tony_dungy_vick_advocacy",
        authority_impact: "high",
      },
    });
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: isMuted ? "audio_unmute" : "audio_mute",
        source: "npr_player_controls",
      },
    });
  };

  const handleExternalLink = () => {
    window.open(NPR_INTERVIEW_DATA.url, "_blank");
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "primary",
      metadata: {
        action: "external_link_clicked",
        url: "npr_full_interview",
        source: "authority_validation",
        impact: "high_authority",
      },
    });
  };

  const handleShare = () => {
    const shareData = {
      title: NPR_INTERVIEW_DATA.title,
      text: `Tony Dungy advocates for second chances in criminal justice: "${NPR_INTERVIEW_DATA.keyQuotes[0].quote}"`,
      url: NPR_INTERVIEW_DATA.url,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.title} - ${shareData.url}`);
    }

    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: "audio_shared",
        platform: "native_share",
        content: "npr_authority_interview",
      },
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Badge className="bg-red-600 text-white text-lg px-6 py-3">
            <Radio className="w-5 h-5 mr-2" />
            NPR Authority
          </Badge>
          <Badge className="bg-elite-emerald text-white text-lg px-6 py-3">
            <Quote className="w-5 h-5 mr-2" />
            Second Chances Advocate
          </Badge>
        </div>

        <h2 className="text-3xl font-bold text-elite-obsidian mb-2">
          {NPR_INTERVIEW_DATA.title}
        </h2>

        <p className="text-lg text-elite-obsidian/80 max-w-3xl mx-auto">
          {NPR_INTERVIEW_DATA.description}
        </p>

        <div className="flex justify-center items-center gap-4 text-sm text-elite-obsidian/60">
          <span>{NPR_INTERVIEW_DATA.source}</span>
          <span>•</span>
          <span>{NPR_INTERVIEW_DATA.date}</span>
          <span>•</span>
          <span>{NPR_INTERVIEW_DATA.duration}</span>
        </div>
      </div>

      {/* Audio Player */}
      <Card className="border-2 border-elite-obsidian/10">
        <CardContent className="p-6">
          {/* NPR Embed Player */}
          <div className="mb-6">
            <iframe
              ref={audioRef}
              src={NPR_INTERVIEW_DATA.audioUrl}
              width="100%"
              height="290"
              frameBorder="0"
              scrolling="no"
              title="NPR embedded audio player"
              className="rounded-lg"
            />
          </div>

          {/* Player Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={handlePlayPause}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 mr-2" />
                ) : (
                  <Play className="w-5 h-5 mr-2" />
                )}
                {isPlaying ? "Pause" : "Play"} Interview
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleVolumeToggle}
                className="border-elite-obsidian text-elite-obsidian"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-elite-obsidian text-elite-obsidian"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExternalLink}
                className="border-elite-obsidian text-elite-obsidian"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Article
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Quotes Section */}
      <Card className="border-2 border-elite-emerald/20">
        <CardHeader>
          <CardTitle className="text-elite-obsidian flex items-center gap-2">
            <Quote className="w-5 h-5 text-elite-emerald" />
            Key Quotes from Tony Dungy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {NPR_INTERVIEW_DATA.keyQuotes.map((quote, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 transition-colors cursor-pointer ${
                activeQuote === index
                  ? "border-elite-emerald bg-elite-emerald/5"
                  : "border-elite-obsidian/20 bg-gray-50 hover:bg-elite-emerald/5"
              }`}
              onClick={() => setActiveQuote(index)}
            >
              <blockquote className="text-lg text-elite-obsidian italic mb-3">
                "{quote.quote}"
              </blockquote>
              <div className="flex justify-between items-center text-sm">
                <span className="text-elite-obsidian/70">{quote.context}</span>
                <Badge
                  variant="outline"
                  className="text-elite-emerald border-elite-emerald"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {quote.timestamp}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* JAHmere Parallels */}
      <Card className="bg-gradient-to-br from-elite-emerald/10 to-blue-50">
        <CardHeader>
          <CardTitle className="text-elite-obsidian">
            Direct Parallels to JAHmere Webb's Case
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {NPR_INTERVIEW_DATA.jahmereParallels.map((parallel, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elite-emerald rounded-full mt-2 flex-shrink-0" />
                <p className="text-elite-obsidian/80">{parallel}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-elite-emerald/20">
            <h4 className="font-semibold text-elite-obsidian mb-2">
              Authority Impact for JAHmere:
            </h4>
            <p className="text-elite-obsidian/80">
              This NPR interview demonstrates Tony Dungy's documented commitment
              to criminal justice reform and second chances. His public advocacy
              for Michael Vick's transformation provides the same credible
              authority that can be leveraged for JAHmere Webb's justice case on
              July 28, 2025.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 to-elite-emerald text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Same Voice, Same Mission: JAHmere's Freedom
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Tony Dungy's national platform advocacy for Michael Vick
            demonstrates his commitment to criminal justice transformation. This
            same authority supports JAHmere Webb's case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.open("/michael-vick-case-study", "_blank")}
              className="bg-white text-elite-obsidian hover:bg-gray-100"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Full Case Study
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/people/tony-dungy", "_blank")}
              className="border-white text-white hover:bg-white/10"
            >
              <Quote className="w-5 h-5 mr-2" />
              Tony Dungy Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
