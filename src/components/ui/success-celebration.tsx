"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Share2, Twitter, Facebook, Copy } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { withSafeUI } from "./with-safe-ui";

interface SuccessCelebrationProps {
  show: boolean;
  onClose?: () => void;
  supporterNumber?: number;
  message?: string;
  shareUrl?: string;
  shareText?: string;
  className?: string;
}

function SuccessCelebration({
  show,
  onClose,
  supporterNumber = 1248,
  message = "Thank you for supporting JAHmere!",
  shareUrl = typeof window !== "undefined" ? window.location.href : "",
  shareText = "I just wrote to Judge Ferrero supporting rehabilitation over incarceration for JAHmere Webb. Join me!",
  className = "",
}: SuccessCelebrationProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (show && typeof window !== "undefined") {
      // Trigger confetti animation
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Shoot confetti from different angles
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#F59E0B", "#2563EB", "#10B981", "#8B5CF6"], // Hope gold, courage blue, growth green, purple
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#F59E0B", "#2563EB", "#10B981", "#8B5CF6"],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [show]);

  const handleShare = (platform: string) => {
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "width=600,height=400",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
          "_blank",
          "width=600,height=400",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4",
            className,
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {message}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You're supporter{" "}
                <span className="font-bold text-hope-gold">
                  #{supporterNumber}
                </span>
                !
              </p>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-4 mb-6 text-left"
            >
              <h3 className="font-semibold mb-2 text-gray-900">
                What happens next:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Your letter has been added to our collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>
                    We'll deliver all letters to Judge Ferrero before July 9th
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>You'll receive updates on the case outcome</span>
                </li>
              </ul>
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-sm text-gray-600">
                Help us reach more supporters:
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Tweet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("copy")}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </motion.div>

            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Button variant="primary" onClick={onClose} className="w-full">
                Continue to Impact Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default withSafeUI(SuccessCelebration, {
  componentName: "SuccessCelebration",
});
