"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { AlertCircle, Heart, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface MothersVoiceProps {
  variant?: "full" | "banner" | "alert" | "floating";
  className?: string;
  autoHide?: boolean;
  hideDelay?: number;
}

const messages = [
  {
    text: "ABSOLUTELY FUCKING NOT!",
    emotion: "rage",
    emphasis: "extreme",
  },
  {
    text: "That. Is. Despicable.",
    emotion: "disgust",
    emphasis: "high",
  },
  {
    text: "I AM About to Unleash the Mother FUCKING Kraken.",
    emotion: "determination",
    emphasis: "extreme",
  },
  {
    text: "I'm NOT accepting this",
    emotion: "defiance",
    emphasis: "high",
  },
  {
    text: "8.5 years? For my baby? NO.",
    emotion: "pain",
    emphasis: "high",
  },
];

function MothersVoiceCore({
  variant = "banner",
  className,
  autoHide = false,
  hideDelay = 10000,
}: MothersVoiceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const message = messages[currentMessage];

  const getEmotionStyles = (emotion: string) => {
    switch (emotion) {
      case "rage":
        return "bg-red-900/95 border-red-600 text-red-100";
      case "disgust":
        return "bg-orange-900/95 border-orange-600 text-orange-100";
      case "determination":
        return "bg-purple-900/95 border-purple-600 text-purple-100";
      case "defiance":
        return "bg-pink-900/95 border-pink-600 text-pink-100";
      case "pain":
        return "bg-gray-900/95 border-gray-600 text-gray-100";
      default:
        return "bg-black/95 border-white text-white";
    }
  };

  const renderContent = () => {
    const baseContent = (
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
            <span className="text-lg font-bold text-white">MH</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm opacity-80 mb-1">Martha Henderson speaks:</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "font-bold",
                message.emphasis === "extreme" ? "text-2xl" : "text-lg",
              )}
            >
              {message.text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          <Shield className="w-6 h-6 animate-pulse" />
          <Heart className="w-6 h-6 animate-pulse" />
          <Zap className="w-6 h-6 animate-pulse" />
        </div>
      </div>
    );

    switch (variant) {
      case "full":
        return (
          <Card
            className={cn(
              "p-8 border-2",
              getEmotionStyles(message.emotion),
              className,
            )}
          >
            <div className="max-w-4xl mx-auto">
              {baseContent}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-80">
                  #thatpart ‼️ ‼️ 💪 💯 | July 9 approaches. We stand united.
                </p>
              </div>
            </div>
          </Card>
        );

      case "banner":
        return (
          <div
            className={cn(
              "fixed top-20 left-0 right-0 z-40 p-4 border-b-2",
              getEmotionStyles(message.emotion),
              className,
            )}
          >
            <div className="container mx-auto">{baseContent}</div>
          </div>
        );

      case "alert":
        return (
          <Card
            className={cn(
              "p-4 border-2",
              getEmotionStyles(message.emotion),
              className,
            )}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-bold">{message.text}</p>
              </div>
            </div>
          </Card>
        );

      case "floating":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className={cn(
              "fixed bottom-8 left-8 z-50 p-6 rounded-lg shadow-2xl max-w-md",
              getEmotionStyles(message.emotion),
              className,
            )}
          >
            {baseContent}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return <AnimatePresence>{isVisible && renderContent()}</AnimatePresence>;
}

export const MothersVoice = withDivineErrorBoundary(MothersVoiceCore, {
  componentName: "MothersVoice",
  fallback: <div>The Mother's voice echoes...</div>,
});
