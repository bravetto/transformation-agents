"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Twitter,
  Facebook,
  MessageCircle,
  Copy,
  CheckCircle,
  Sparkles,
  Heart,
  Users,
  Target,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

interface ViralSharingEngineProps {
  isVisible: boolean;
  onClose: () => void;
  userImpact: {
    letterScore: number;
    contributionLevel:
      | "character_witness"
      | "youth_voice"
      | "community_support";
    personalMessage?: string;
  };
  campaignStats: {
    totalLetters: number;
    goal: number;
    timeRemaining: string;
  };
}

interface SharingOption {
  platform: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  action: () => void;
  message: string;
}

function ViralSharingEngine({
  isVisible,
  onClose,
  userImpact,
  campaignStats,
}: ViralSharingEngineProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState(0);

  // Generate personalized sharing messages based on user impact
  const generateSharingMessages = () => {
    const baseMessages = {
      character_witness: [
        `I just wrote a character witness letter for JAHmere Webb's rehabilitation. ${campaignStats.totalLetters}/${campaignStats.goal} letters submitted! Join the movement for transformation over incarceration. #BridgeNotBars #JusticeReform`,

        `As a community leader, I believe in second chances. Just submitted my letter supporting JAHmere Webb's community-based rehabilitation. ${campaignStats.timeRemaining} until court date - every voice matters! #TransformationOverIncarceration`,

        `Professional endorsement submitted ✅ JAHmere Webb deserves a chance at redemption through The Bridge Project. ${campaignStats.totalLetters} supporters and counting! Will you add your voice? #SecondChances #CriminalJusticeReform`,
      ],

      youth_voice: [
        `Young voices matter! Just wrote to Judge Ferrero supporting JAHmere Webb's rehabilitation. He protected Jordan Dungy when no one else would - now we protect him. ${campaignStats.totalLetters}/${campaignStats.goal} letters! #YouthForJustice #BridgeNotBars`,

        `Kids supporting kids! ✊ JAHmere Webb deserves a chance to keep mentoring youth like us. Just submitted my letter - ${campaignStats.timeRemaining} left to reach our goal! #YouthVoices #MentorshipMatters`,

        `From one young person to another: JAHmere Webb shows us what standing up for others looks like. Just added my voice to ${campaignStats.totalLetters} supporters! Join us! #StandTogether #TransformationStory`,
      ],

      community_support: [
        `Community over cages! 🏠 Just wrote my letter supporting JAHmere Webb's rehabilitation through The Bridge Project. ${campaignStats.totalLetters}/${campaignStats.goal} letters submitted - join the movement! #CommunityOverCages #Restorative Justice`,

        `Transformation works better than incarceration. Just supported JAHmere Webb's community-based rehabilitation - ${campaignStats.timeRemaining} until court! Every letter counts! #TransformationOverIncarceration #CommunitySupport`,

        `Real change happens in community, not cages. Just submitted letter #${campaignStats.totalLetters} for JAHmere Webb. Help us reach ${campaignStats.goal} before July 28th! #BridgeNotBars #CommunityHealing`,
      ],
    };

    return (
      baseMessages[userImpact.contributionLevel] ||
      baseMessages.community_support
    );
  };

  const sharingMessages = generateSharingMessages();

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Platform-specific sharing functions
  const shareToTwitter = (message: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent("https://thebridgeproject.org")}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToFacebook = (message: string) => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://thebridgeproject.org")}&quote=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToWhatsApp = (message: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(message + " https://thebridgeproject.org")}`;
    window.open(url, "_blank");
  };

  // Sharing options configuration
  const sharingOptions: SharingOption[] = [
    {
      platform: "Twitter",
      icon: Twitter,
      color: "text-blue-400",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      action: () => shareToTwitter(sharingMessages[selectedMessage]),
      message: "Share on Twitter",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      action: () => shareToFacebook(sharingMessages[selectedMessage]),
      message: "Share on Facebook",
    },
    {
      platform: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-500",
      bgColor: "bg-green-50 hover:bg-green-100",
      action: () => shareToWhatsApp(sharingMessages[selectedMessage]),
      message: "Share on WhatsApp",
    },
    {
      platform: "Copy",
      icon: copiedText ? CheckCircle : Copy,
      color: copiedText ? "text-green-500" : "text-gray-600",
      bgColor: copiedText ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100",
      action: () => copyToClipboard(sharingMessages[selectedMessage]),
      message: copiedText ? "Copied!" : "Copy Text",
    },
  ];

  // Impact level display
  const getImpactDisplay = () => {
    if (userImpact.letterScore >= 80) {
      return {
        label: "Exceptional Impact",
        color: "text-green-600",
        bg: "bg-green-50",
        icon: Target,
      };
    } else if (userImpact.letterScore >= 60) {
      return {
        label: "Strong Impact",
        color: "text-blue-600",
        bg: "bg-blue-50",
        icon: Heart,
      };
    } else {
      return {
        label: "Good Impact",
        color: "text-amber-600",
        bg: "bg-amber-50",
        icon: Users,
      };
    }
  };

  const impactDisplay = getImpactDisplay();
  const ImpactIcon = impactDisplay.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <Card className="p-8 bg-gradient-to-br from-white via-amber-50/50 to-white border-2 border-amber-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-amber-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Letter Submitted! 🎉
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Impact Celebration */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`${impactDisplay.bg} rounded-xl p-6 mb-6 border-2 border-amber-200`}
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <ImpactIcon className={`w-12 h-12 ${impactDisplay.color}`} />
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${impactDisplay.color}`}
                    >
                      {userImpact.letterScore}%
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {impactDisplay.label}
                    </Badge>
                  </div>
                </div>

                <p className="text-center text-gray-700 font-medium">
                  Your letter will help Judge Ferrero understand JAHmere's
                  character and potential for transformation!
                </p>
              </motion.div>

              {/* Campaign Progress */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                <h3 className="font-bold text-lg mb-4 text-center">
                  Campaign Progress
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-amber-600">
                      {campaignStats.totalLetters}
                    </div>
                    <div className="text-sm text-gray-600">
                      Letters Submitted
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {campaignStats.goal}
                    </div>
                    <div className="text-sm text-gray-600">Goal</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">
                      {campaignStats.timeRemaining}
                    </div>
                    <div className="text-sm text-gray-600">Time Left</div>
                  </div>
                </div>
              </div>

              {/* Viral Sharing Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-center flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Amplify Your Impact
                </h3>

                <p className="text-center text-gray-600">
                  Share your support and inspire others to join the movement for
                  transformation over incarceration.
                </p>

                {/* Message Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Choose your message:
                  </label>
                  <div className="space-y-2">
                    {sharingMessages.map((message, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                          "p-3 rounded-lg border-2 cursor-pointer transition-all",
                          selectedMessage === index
                            ? "border-amber-300 bg-amber-50"
                            : "border-gray-200 bg-gray-50 hover:border-amber-200",
                        )}
                        onClick={() => setSelectedMessage(index)}
                      >
                        <p className="text-sm text-gray-700">{message}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sharing Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {sharingOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.platform}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={option.action}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl transition-all",
                          option.bgColor,
                          "border-2 border-transparent hover:border-amber-200",
                        )}
                      >
                        <Icon className={cn("w-6 h-6 mb-2", option.color)} />
                        <span className="text-xs font-medium text-gray-700">
                          {option.message}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Call to Action */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Every share multiplies your impact and brings us closer to
                    our goal of 1,050 letters!
                  </p>

                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-3"
                  >
                    Continue Your Impact Journey
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default withDivineErrorBoundary(ViralSharingEngine, {
  componentName: "ViralSharingEngine",
  role: "messenger",
});
