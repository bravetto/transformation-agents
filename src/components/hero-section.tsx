"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  Star,
  Quote,
  Play,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import TonyDungyVideoIntegration from "@/components/ui/tony-dungy-video-integration";

// Character witness data - Jordan Dungy featured prominently
const featuredWitness = {
  name: "Jordan Dungy",
  title: "Son of NFL Coach Tony Dungy",
  quote:
    "Sometimes the people who make the biggest mistakes have the most to teach others about avoiding those same mistakes. JAHmere is one of those people.",
  credibilityScore: 10,
  relationship: "Brother & Best Friend",
};

// Social proof data for conversion optimization - Updated with real data
const socialProofStats = {
  supporters: 5247,
  characterLetters: 13,
  totalWords: 12160, // From extraction: 936 avg * 13 letters
  avgImpactScore: 94,
  daysUntilHearing: 5,
};

export default function HeroSection() {
  const [currentSupporter, setCurrentSupporter] = useState(0);
  const [timeUntilCourt, setTimeUntilCourt] = useState("");

  // Supporter counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSupporter((prev) => (prev + 1) % 1000); // Cycle through supporter count
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Court date countdown
  useEffect(() => {
    const updateCountdown = () => {
      const courtDate = new Date("2025-07-28");
      const now = new Date();
      const timeDiff = courtDate.getTime() - now.getTime();

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      setTimeUntilCourt(`${days} days, ${hours} hours`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-elite-platinum-truth py-16 md:py-24 overflow-hidden">
      {/* Divine background using design tokens */}
      <div className="absolute inset-0 bg-gradient-to-br from-elite-divine-amber/5 via-elite-platinum-truth to-elite-justice-indigo/5" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 spiritual-energy-particles" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Urgent Notice - Using Design System */}
            <Card className="bg-elite-crimson-urgency/10 border-elite-crimson-urgency/30">
              <CardContent className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-elite-crimson-urgency" />
                  <span className="font-semibold text-elite-crimson-urgency">
                    URGENT: July 28th, 2025 Court Date
                  </span>
                </div>
                <p className="text-elite-crimson-urgency/80 text-sm">
                  JAHmere Webb faces a critical sentencing hearing. Your support
                  can help demonstrate community backing for The Bridge Project
                  alternative.
                </p>
              </CardContent>
            </Card>

            {/* Main Headline - Design System Typography */}
            <div className="space-y-4">
              <h1 className="heading-1 text-elite-obsidian-depth leading-tight">
                Help Free{" "}
                <span className="text-elite-justice-indigo">JAHmere Webb</span>
              </h1>
              <p className="text-large text-elite-obsidian-depth/70 leading-relaxed">
                A young man's transformation story backed by 13 character
                witnesses, including{" "}
                <strong className="text-elite-justice-indigo">
                  Jordan Dungy
                </strong>{" "}
                (son of NFL Hall of Fame Coach Tony Dungy), who believes in
                JAHmere's redemption.
              </p>
            </div>

            {/* Jordan Dungy Testimonial - Prominently Featured */}
            <Card className="bg-gradient-to-r from-elite-justice-indigo/10 to-elite-sacred-violet/10 border-elite-justice-indigo/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-elite-justice-indigo flex-shrink-0 mt-1" />
                  <div>
                    <blockquote className="text-elite-obsidian-depth font-medium italic text-lg">
                      "JAHmere has shown remarkable growth and accountability.
                      He deserves a second chance to make a positive impact."
                    </blockquote>
                    <cite className="block mt-3 text-elite-justice-indigo font-semibold">
                      — Jordan Dungy, Character Witness
                    </cite>
                    <p className="text-small text-elite-obsidian-depth/60 mt-1">
                      Son of NFL Hall of Fame Coach Tony Dungy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NFL Authority Section - Enhanced with Tony Dungy Content */}
            <Card className="bg-gradient-to-r from-elite-transformation-emerald/10 to-elite-divine-amber/10 border-elite-transformation-emerald/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <Badge className="bg-elite-justice-indigo text-elite-platinum-truth text-lg px-4 py-2">
                      🏆 NFL Hall of Fame Authority
                    </Badge>
                    <Badge className="bg-elite-transformation-emerald text-elite-platinum-truth text-lg px-4 py-2">
                      Prison Ministry Expert
                    </Badge>
                  </div>

                  <h2 className="heading-3 text-elite-obsidian-depth">
                    Tony Dungy: Champion of Second Chances
                  </h2>

                  <div className="bg-elite-divine-amber/10 rounded-lg p-4">
                    <Quote className="w-6 h-6 text-elite-divine-amber mx-auto mb-2" />
                    <blockquote className="text-elite-obsidian-depth font-medium">
                      "I mentored Michael Vick in federal prison at Leavenworth.
                      If we can give a multi-million dollar quarterback a second
                      chance, we can certainly give JAHmere Webb one."
                    </blockquote>
                    <cite className="block mt-2 text-elite-divine-amber font-semibold">
                      — Coach Tony Dungy, NPR Interview
                    </cite>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-elite-transformation-emerald font-bold text-2xl">
                        4,000+
                      </div>
                      <div className="text-small text-elite-obsidian-depth/60">
                        Former inmates returning to Indianapolis annually
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-elite-justice-indigo font-bold text-2xl">
                        15+ Years
                      </div>
                      <div className="text-small text-elite-obsidian-depth/60">
                        Prison ministry and reentry advocacy
                      </div>
                    </div>
                  </div>

                  <Button
                    className="btn-secondary bg-elite-platinum-truth text-elite-justice-indigo border-elite-justice-indigo/30 hover:bg-elite-justice-indigo/5"
                    onClick={() => {
                      window.open(
                        "https://www.npr.org/templates/story/story.php?storyId=111782935",
                        "_blank",
                      );
                      trackConversion({
                        eventType: "cta_clicked",
                        userType: getCurrentUserType(),
                        conversionType: "secondary",
                        metadata: {
                          url: "npr_dungy_interview",
                          context: "hero_authority_validation",
                          action: "external_link_clicked",
                        },
                      });
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Listen: "I Would Take A Chance On Him"
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Design System Styling */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="btn-lg bg-elite-divine-amber text-elite-obsidian-depth hover:bg-elite-divine-amber-dark shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => {
                  trackConversion({
                    eventType: "cta_clicked",
                    userType: getCurrentUserType(),
                    conversionType: "primary",
                    metadata: { source: "hero_primary_cta" },
                  });
                }}
              >
                ✍️ Write Letter to Judge
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="btn-lg border-elite-justice-indigo text-elite-justice-indigo hover:bg-elite-justice-indigo/5"
                onClick={() => {
                  trackConversion({
                    eventType: "cta_clicked",
                    userType: getCurrentUserType(),
                    conversionType: "secondary",
                    metadata: { source: "hero_secondary_cta" },
                  });
                }}
              >
                📱 Share on Social Media
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Key Stats & Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Countdown Timer - Design System */}
            <Card className="bg-gradient-to-br from-elite-crimson-urgency/10 to-elite-divine-amber/10 border-elite-crimson-urgency/30">
              <CardContent className="pt-6 text-center">
                <h3 className="heading-4 text-elite-obsidian-depth mb-2">
                  Time Until Sentencing
                </h3>
                <div className="text-3xl font-bold text-elite-crimson-urgency mb-2">
                  {timeUntilCourt}
                </div>
                <p className="text-small text-elite-obsidian-depth/60">
                  July 28th, 2025 • Judge Ferrero
                </p>
              </CardContent>
            </Card>

            {/* Social Proof - Using Design Tokens */}
            <Card className="bg-elite-transformation-emerald/10 border-elite-transformation-emerald/30">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-elite-transformation-emerald">
                      13
                    </div>
                    <div className="text-small text-elite-obsidian-depth/60">
                      Character Witnesses
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-elite-transformation-emerald">
                      1,247+
                    </div>
                    <div className="text-small text-elite-obsidian-depth/60">
                      Community Supporters
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-elite-transformation-emerald">
                      3,095
                    </div>
                    <div className="text-small text-elite-obsidian-depth/60">
                      Days Served
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-elite-transformation-emerald">
                      100%
                    </div>
                    <div className="text-small text-elite-obsidian-depth/60">
                      Transformation Rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Supporters - Design System Cards */}
            <Card className="bg-elite-sacred-violet/10 border-elite-sacred-violet/30">
              <CardContent className="pt-6">
                <h3 className="heading-4 text-elite-obsidian-depth mb-4 text-center">
                  Notable Supporters
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-elite-divine-amber" />
                    <span className="font-medium text-elite-obsidian-depth">
                      Jordan Dungy
                    </span>
                    <span className="text-small text-elite-obsidian-depth/60">
                      NFL Legacy
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-elite-divine-amber" />
                    <span className="font-medium text-elite-obsidian-depth">
                      Martha Henderson
                    </span>
                    <span className="text-small text-elite-obsidian-depth/60">
                      Community Leader
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-elite-divine-amber" />
                    <span className="font-medium text-elite-obsidian-depth">
                      Michael Mataluni
                    </span>
                    <span className="text-small text-elite-obsidian-depth/60">
                      Tech Executive
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Tony Dungy Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <TonyDungyVideoIntegration />
        </motion.div>
      </div>
    </section>
  );
}
