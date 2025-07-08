"use client";
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Twitter,
  Instagram,
  MessageCircle,
  Copy,
  Users,
  TrendingUp,
  Heart,
} from "lucide-react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface ShareStats {
  twitter: number;
  instagram: number;
  whatsapp: number;
  total: number;
}

interface Share {
  message: string;
  platform: string;
  timestamp: number;
}

function SocialAmplification() {
  const [showPanel, setShowPanel] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [recentShares, setRecentShares] = useState<Share[]>([]);
  const [shareStats, setShareStats] = useState<ShareStats>({
    twitter: 147,
    instagram: 89,
    whatsapp: 234,
    total: 470,
  });

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://thebridgeproject.org";

  const shareMessages = {
    twitter: `JAHmere Webb spent 10 years in the system. Now he wants to prevent others from entering it. 

Jordan Dungy (who can't feel physical pain) vouches for "the man who felt too much."

This isn't about escaping consequences. It's about transforming them.

Read the story that could change criminal justice: ${shareUrl}

#BridgeOverPrison #TransformJustice`,

    instagram: `🌉 THE BRIDGE PROJECT 🌉

"I can't feel physical pain, but I see JAHmere's pain - and it's the kind that the system is creating, not healing."
- Jordan Dungy

A Super Bowl champion's son with a rare condition speaks up for transformation over incarceration.

JAHmere Webb isn't asking to escape consequences.
He's asking to transform them.

💛 Every heart = A vote for healing
📝 Every letter = A voice for change
🌟 Every share = A life potentially saved

Link in bio to read the full story and join the movement.

#BridgeOverPrison #TransformativeJustice #SecondChances #TonyDungy #SystemChange #HealingOverHarm`,

    whatsapp: `*The Bridge Project - JAHmere's Story* 🌉

I just read something that changed my perspective on criminal justice.

JAHmere Webb has been in the system for 10 years. Instead of more prison time, he's proposing to mentor at-risk youth - preventing them from making his mistakes.

What makes this different:
✅ Tony Dungy (NFL Legend) is his mentor
✅ Jordan Dungy (who can't feel physical pain) wrote a powerful testimony
✅ Complete transparency through technology
✅ Zero cost to taxpayers
✅ Youth already waiting for mentorship

The math: $35,000/year to imprison vs $0 to transform lives

Read the full story and consider adding your support: ${shareUrl}

*"We need somebody to give us a chance." - Tony Dungy*`,
  };

  const handleShare = (platform: keyof typeof shareMessages) => {
    // Update stats
    setShareStats((prev) => ({
      ...prev,
      [platform]: prev[platform] + 1,
      total: prev.total + 1,
    }));

    // Platform-specific sharing
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.twitter)}`,
          "_blank",
          "width=600,height=400",
        );
        break;
      case "instagram":
        // Copy to clipboard for Instagram
        navigator.clipboard.writeText(shareMessages.instagram);
        setCopied(true);
        setToastMessage("Instagram caption copied!");
        setShowToast(true);
        setTimeout(() => setCopied(false), 3000);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareMessages.whatsapp)}`,
          "_blank",
        );
        break;
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setToastMessage("Link copied to clipboard!");
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 3000);
  };

  // Function to copy a message to clipboard
  const handleCopyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    setToastMessage("Message copied to clipboard!");
    setShowToast(true);

    // Add to recent shares
    const newShare: Share = {
      message: message.substring(0, 30) + "...",
      platform: "clipboard",
      timestamp: Date.now(),
    };

    setRecentShares((prev) => [newShare, ...prev].slice(0, 5));

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Share Button */}
      {!showPanel && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setShowPanel(true)}
          className="fixed bottom-24 right-4 z-40 bg-hope-gold text-gentle-charcoal rounded-full p-4 shadow-lg"
        >
          <Share2 className="h-6 w-6" />
          {shareStats.total > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-growth-green text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              {shareStats.total}
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Share Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-20 bottom-0 w-full max-w-md bg-white shadow-2xl z-40 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gentle-charcoal">
                  Amplify JAHmere's Story
                </h3>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-soft-shadow hover:text-gentle-charcoal"
                  aria-label="Close sharing panel"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    role="img"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Impact Counter */}
              <div className="bg-moon-glow rounded-lg p-4 mb-4">
                <p className="text-sm text-soft-shadow mb-2">
                  <span className="text-sm font-semibold text-gentle-charcoal">
                    Your share could be the one that changes everything
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-courage-blue" />
                  <span className="text-2xl font-bold text-courage-blue">
                    {shareStats.total}
                  </span>
                  <span className="text-sm text-soft-shadow">
                    people have shared
                  </span>
                </div>
              </div>

              {/* Platform Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-full flex items-center gap-3 bg-[#1DA1F2] text-white rounded-lg p-3 hover:bg-[#1a8cd8] transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="flex-1 text-left">Share on Twitter/X</span>
                  <span className="text-xs text-white">
                    {shareStats.twitter} shares
                  </span>
                </button>

                <button
                  onClick={() => handleShare("instagram")}
                  className="w-full flex items-center gap-3 bg-[#E4405F] text-white rounded-lg p-3 hover:bg-[#d62d4a] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="flex-1 text-left">
                    Share Story to Instagram
                  </span>
                  <span className="text-xs text-white">
                    {shareStats.instagram} shares
                  </span>
                </button>

                <button
                  onClick={() => handleShare("whatsapp")}
                  className="w-full flex items-center gap-3 bg-[#25D366] text-white rounded-lg p-3 hover:bg-[#22c55e] transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="flex-1 text-left">Send via WhatsApp</span>
                  <span className="text-xs text-white">
                    {shareStats.whatsapp} shares
                  </span>
                </button>

                <button
                  onClick={copyLink}
                  className="w-full flex items-center gap-3 bg-moon-glow text-gentle-charcoal rounded-lg p-3 hover:bg-soft-cloud transition-colors"
                >
                  <Copy className="h-5 w-5" />
                  <span className="flex-1 text-left">Copy Link</span>
                </button>
              </div>

              {/* Pre-written Messages */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gentle-charcoal mb-2">
                  Tap to copy powerful messages:
                </p>
                <div className="space-y-2">
                  {Object.values(shareMessages).map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleCopyMessage(msg)}
                      className="bg-soft-cloud text-gentle-charcoal text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-moon-glow w-full text-left"
                    >
                      "{msg}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Shares */}
              {recentShares.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-soft-shadow mb-2">
                    Recent shares:
                  </p>
                  <div className="space-y-2">
                    {recentShares.map((share, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-sm text-soft-shadow"
                      >
                        <Heart className="h-4 w-4 text-growth-green" />
                        <span>{share.message}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-growth-green text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <p className="font-semibold text-white">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(SocialAmplification, "messenger");
