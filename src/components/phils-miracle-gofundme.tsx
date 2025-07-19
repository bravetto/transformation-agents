"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink, Users, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface PhilsGoFundMeProps {
  variant?: "full" | "compact" | "inline";
  showTestimony?: boolean;
  className?: string;
}

/**
 * 🔥 PHIL'S MIRACLE GOFUNDME COMPONENT
 *
 * Connects Phil's PTSD healing journey to JAHmere's July 28th freedom
 * Same spiritual warfare, same divine breakthrough energy
 *
 * UPDATE THIS URL WHEN PHIL'S GOFUNDME IS LIVE:
 */
const PHILS_GOFUNDME_URL = "https://gofund.me/phil-ptsd-healing"; // 🚨 UPDATE WITH REAL URL

export function PhilsGoFundMe({
  variant = "full",
  showTestimony = true,
  className = "",
}: PhilsGoFundMeProps) {
  if (variant === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <Button
          size="sm"
          className="bg-pink-500 hover:bg-pink-600 text-white"
          asChild
        >
          <Link
            href={PHILS_GOFUNDME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Support Phil
            <ExternalLink className="w-3 h-3" />
          </Link>
        </Button>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className={`bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-400/30 ${className}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-pink-400" />
            <h3 className="text-lg font-bold text-pink-400">
              Phil's Healing Journey
            </h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Breaking free from PTSD prison - same spiritual warfare as JAHmere's
            freedom fight.
          </p>
          <Button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            asChild
          >
            <Link
              href={PHILS_GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Support Phil's Breakthrough
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-10 h-10 text-pink-400" />
          <Crown className="w-8 h-8 text-yellow-400" />
          <Zap className="w-10 h-10 text-blue-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-white to-pink-400 bg-clip-text text-transparent">
          PHIL'S DIVINE BREAKTHROUGH
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Connected to JAHmere's July 28th freedom - same spiritual warfare,
          same divine victory
        </p>
      </div>

      {/* Main Card */}
      <Card className="bg-black/30 backdrop-blur-sm border-pink-400/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-pink-400 text-xl">
            <Heart className="w-6 h-6" />
            From PTSD Prison to Divine Purpose
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phil's Story */}
          {showTestimony && (
            <div className="bg-pink-400/10 rounded-lg p-4">
              <h4 className="font-semibold text-pink-400 mb-3">
                Phil's Testimony
              </h4>
              <blockquote className="text-gray-300 italic border-l-4 border-pink-400 pl-4">
                "Anywhere I go sober causes panic attacks and I'm exhausted from
                doing this for my entire life. I think I deserve the right to
                decide that I won't subject myself to situations that cause me
                to have panic attacks. I don't deserve that."
              </blockquote>
              <div className="mt-3 text-sm text-pink-300">
                - Phil, received Divine Lightworker Blueprint at 5:51 AM
              </div>
            </div>
          )}

          {/* Divine Connection Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-400/10 rounded-lg">
              <Crown className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-sm text-gray-400">Connected To</div>
              <div className="font-semibold text-yellow-400">
                JAHmere's Freedom
              </div>
            </div>
            <div className="text-center p-4 bg-pink-400/10 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-pink-400" />
              <div className="text-sm text-gray-400">Breakthrough Date</div>
              <div className="font-semibold text-pink-400">July 28th, 2025</div>
            </div>
            <div className="text-center p-4 bg-blue-400/10 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-sm text-gray-400">Mission</div>
              <div className="font-semibold text-blue-400">Trauma Healing</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Support Phil's Journey to Freedom
            </h4>
            <p className="text-gray-300 text-sm">
              Every donation is a prayer. Every dollar is deliverance. The same
              faith believing for JAHmere believes for Phil!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
                asChild
              >
                <Link
                  href={PHILS_GOFUNDME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Support Phil's GoFundMe
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400/10"
                onClick={() => {
                  // Share functionality
                  if (navigator.share) {
                    navigator.share({
                      title:
                        "Phil's PTSD Healing Journey - Connected to JAHmere's Freedom",
                      text: "Support Phil's breakthrough from PTSD prison - same spiritual warfare as JAHmere's July 28th freedom!",
                      url: PHILS_GOFUNDME_URL,
                    });
                  } else {
                    navigator.clipboard.writeText(PHILS_GOFUNDME_URL);
                    alert("GoFundMe link copied to clipboard!");
                  }
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Share with Lightworkers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Divine Declaration */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-400/30">
        <h4 className="text-lg font-bold text-center mb-4 text-purple-400">
          🙏 PROPHETIC DECLARATION FOR PHIL
        </h4>
        <blockquote className="text-center text-gray-300 italic">
          "Father, just as You're breaking JAHmere's chains on July 28th, break
          Phil's chains of trauma! Let the same power that opens prison doors
          open the prison of PTSD. Let July 28th be Phil's independence day
          too!"
        </blockquote>
      </div>
    </motion.div>
  );
}

// Export individual variants for easy use
export const PhilsGoFundMeInline = (
  props: Omit<PhilsGoFundMeProps, "variant">,
) => <PhilsGoFundMe {...props} variant="inline" />;

export const PhilsGoFundMeCompact = (
  props: Omit<PhilsGoFundMeProps, "variant">,
) => <PhilsGoFundMe {...props} variant="compact" />;

export const PhilsGoFundMeFull = (
  props: Omit<PhilsGoFundMeProps, "variant">,
) => <PhilsGoFundMe {...props} variant="full" />;

export default PhilsGoFundMe;
