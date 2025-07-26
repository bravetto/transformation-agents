"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import {
  Heart,
  Send,
  Users,
  MessageSquare,
  Star,
  Shield,
  Zap,
  Mic,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimony {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
  type: "text" | "voice" | "video";
  hearts: number;
}

interface LiveTestimonyCollectorProps {
  className?: string;
}

function LiveTestimonyCollectorCore({
  className,
}: LiveTestimonyCollectorProps) {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalHearts, setTotalHearts] = useState(432);

  // Initial testimonies
  useEffect(() => {
    const initial: Testimony[] = [
      {
        id: "1",
        name: "Coach Dungy",
        message:
          "JAHmere represents hope for every child who's been written off. We stand with him.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: "text",
        hearts: 187,
      },
      {
        id: "2",
        name: "Michael Mataluni",
        message:
          "The system wants to steal 8.5 years? We give INFINITE support. The Mother has spoken!",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        type: "text",
        hearts: 144,
      },
      {
        id: "3",
        name: "Jay Forte",
        message:
          "Every moment matters. Every voice counts. JAHmere's greatness will NOT be caged.",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        type: "text",
        hearts: 108,
      },
    ];
    setTestimonies(initial);
  }, []);

  // Simulate live testimonies coming in
  useEffect(() => {
    const messages = [
      "We believe in JAHmere's transformation!",
      "8.5 years is NOT justice. We demand better!",
      "The Mother's voice echoes through us all.",
      "JAHmere deserves redemption, not condemnation.",
      "Standing with Martha and JAHmere. Always.",
      "This injustice ends NOW. We rise together.",
    ];

    const interval = setInterval(() => {
      const newTestimony: Testimony = {
        id: Date.now().toString(),
        name: `Supporter ${Math.floor(Math.random() * 1000)}`,
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        type: "text",
        hearts: Math.floor(Math.random() * 50) + 10,
      };

      setTestimonies((prev) => [newTestimony, ...prev].slice(0, 50));
      setTotalHearts((prev) => prev + newTestimony.hearts);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const submitTestimony = async () => {
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newTestimony: Testimony = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
      type: "text",
      hearts: 1,
    };

    setTestimonies((prev) => [newTestimony, ...prev]);
    setName("");
    setMessage("");
    setIsSubmitting(false);
  };

  const addHeart = (id: string) => {
    setTestimonies((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hearts: t.hearts + 1 } : t)),
    );
    setTotalHearts((prev) => prev + 1);
  };

  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-purple-600 border-2",
        className,
      )}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Live Testimony Stream
          </h2>
          <p className="text-purple-200">
            Your voice matters. Your story counts. Stand with JAHmere.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <span className="text-2xl font-bold text-white">
                {totalHearts}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">
                {testimonies.length}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Form */}
        <div className="bg-black/30 rounded-lg p-4 space-y-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Textarea
            placeholder="Share your support for JAHmere..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <div className="flex gap-2">
            <Button
              onClick={submitTestimony}
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="flex-1 bg-white text-purple-900 hover:bg-purple-100"
            >
              {isSubmitting ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Testimony
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Live Feed */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {testimonies.map((testimony) => (
              <motion.div
                key={testimony.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {testimony.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {testimony.name}
                      </p>
                      <p className="text-white/60 text-xs">
                        {new Date(testimony.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addHeart(testimony.id)}
                    className="text-white hover:text-red-400"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    {testimony.hearts}
                  </Button>
                </div>
                <p className="text-white/90">{testimony.message}</p>
                {testimony.type !== "text" && (
                  <div className="mt-2 flex items-center gap-2 text-white/60 text-sm">
                    {testimony.type === "voice" && <Mic className="w-4 h-4" />}
                    {testimony.type === "video" && (
                      <Video className="w-4 h-4" />
                    )}
                    <span>{testimony.type} testimony</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            Every testimony is being collected and will be presented to show the
            overwhelming support for JAHmere.
          </p>
          <p className="text-yellow-400 font-bold mt-2">
            #JusticeForJAHmere #TheMotherHasSpoken #8YearsIsNotJustice
          </p>
        </div>
      </div>
    </Card>
  );
}

export const LiveTestimonyCollector = withErrorBoundary(
  LiveTestimonyCollectorCore,
  "LiveTestimonyCollector"
);
