"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import {
  Bell,
  Users,
  MessageSquare,
  Phone,
  Mail,
  Share2,
  AlertTriangle,
  Zap,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CoalitionAlertProps {
  variant?: "emergency" | "urgent" | "standard";
  className?: string;
}

interface Supporter {
  id: string;
  name: string;
  status: "active" | "notified" | "responding";
  lastSeen: Date;
}

function CoalitionAlertCore({
  variant = "emergency",
  className,
}: CoalitionAlertProps) {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [notificationsSent, setNotificationsSent] = useState(0);
  const [isActivating, setIsActivating] = useState(false);

  // Simulate real-time supporter updates
  useEffect(() => {
    const initialSupporters: Supporter[] = [
      { id: "1", name: "Coach Dungy", status: "active", lastSeen: new Date() },
      {
        id: "2",
        name: "Michael Mataluni",
        status: "active",
        lastSeen: new Date(),
      },
      { id: "3", name: "Jay Forte", status: "active", lastSeen: new Date() },
      { id: "4", name: "Phil Ghuneim", status: "active", lastSeen: new Date() },
      { id: "5", name: "Brooks Lopez", status: "active", lastSeen: new Date() },
    ];
    setSupporters(initialSupporters);

    // Simulate supporters coming online
    const interval = setInterval(() => {
      setSupporters((prev) => {
        const newSupporter: Supporter = {
          id: `${prev.length + 1}`,
          name: `Supporter ${prev.length + 1}`,
          status: "active",
          lastSeen: new Date(),
        };
        return [...prev, newSupporter];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activateCoalition = async () => {
    setIsActivating(true);

    // Simulate sending notifications
    for (let i = 0; i < supporters.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setNotificationsSent(i + 1);
      setSupporters((prev) =>
        prev.map((s, idx) =>
          idx <= i ? { ...s, status: "notified" as const } : s,
        ),
      );
    }

    // Simulate responses
    setTimeout(() => {
      setSupporters((prev) =>
        prev.map((s) => ({ ...s, status: "responding" as const })),
      );
    }, 2000);

    setIsActivating(false);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "emergency":
        return "bg-red-900/95 border-red-600";
      case "urgent":
        return "bg-orange-900/95 border-orange-600";
      case "standard":
        return "bg-blue-900/95 border-blue-600";
      default:
        return "bg-gray-900/95 border-gray-600";
    }
  };

  const getStatusIcon = (status: Supporter["status"]) => {
    switch (status) {
      case "active":
        return (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        );
      case "notified":
        return <Bell className="w-4 h-4 text-yellow-500 animate-bounce" />;
      case "responding":
        return <Heart className="w-4 h-4 text-red-500 animate-pulse" />;
    }
  };

  return (
    <Card className={cn("p-6 border-2", getVariantStyles(), className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
            <div>
              <h3 className="text-2xl font-bold text-white">
                Coalition Alert System
              </h3>
              <p className="text-white/80">
                {supporters.length} supporters ready | {notificationsSent}{" "}
                notified
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={activateCoalition}
            disabled={isActivating}
            className="bg-white text-red-900 hover:bg-red-100"
          >
            {isActivating ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <Users className="w-5 h-5 mr-2" />
                Activate All
              </>
            )}
          </Button>
        </div>

        {/* Alert Methods */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 rounded-lg p-4 text-center cursor-pointer"
          >
            <Phone className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Phone Tree</p>
            <p className="text-white/60 text-xs">187 ready</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 rounded-lg p-4 text-center cursor-pointer"
          >
            <Mail className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Email Blast</p>
            <p className="text-white/60 text-xs">432 contacts</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 rounded-lg p-4 text-center cursor-pointer"
          >
            <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm">SMS Alert</p>
            <p className="text-white/60 text-xs">309 numbers</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 rounded-lg p-4 text-center cursor-pointer"
          >
            <Share2 className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm">Social Media</p>
            <p className="text-white/60 text-xs">∞ reach</p>
          </motion.div>
        </div>

        {/* Live Supporter Feed */}
        <div className="bg-black/30 rounded-lg p-4">
          <h4 className="text-white font-bold mb-3">Live Supporter Status</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {supporters
                .slice(-10)
                .reverse()
                .map((supporter) => (
                  <motion.div
                    key={supporter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between bg-white/5 rounded p-2"
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(supporter.status)}
                      <span className="text-white text-sm">
                        {supporter.name}
                      </span>
                    </div>
                    <span className="text-white/60 text-xs">
                      {supporter.status === "responding" && "Ready to act"}
                      {supporter.status === "notified" && "Notified"}
                      {supporter.status === "active" && "Online"}
                    </span>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Emergency Message */}
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white font-bold mb-2">Emergency Message:</p>
          <p className="text-white/90">
            "JAHmere needs us NOW. Attorney absent. 8.5 year threat. July 9
            hearing. Every voice matters. Share everywhere. #JusticeForJAHmere
            #TheMotherHasSpoken"
          </p>
        </div>
      </div>
    </Card>
  );
}

export const CoalitionAlert = withErrorBoundary(CoalitionAlertCore, "CoalitionAlert", <div>Coalition standing by...</div>);
