"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, Shield, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [timeToHearing, setTimeToHearing] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  // Calculate time remaining until July 28, 2025 court hearing
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date("2025-07-28T09:00:00-05:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );

        setTimeToHearing({ days, hours, minutes });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={cn("relative py-20 md:py-32 overflow-hidden", className)}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Badge className="bg-red-100 text-red-800 px-4 py-2 text-sm font-medium border border-red-200">
              <Clock className="w-4 h-4 mr-2" />
              Court Hearing: July 28, 2025 • {timeToHearing.days} days remaining
            </Badge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight tracking-tight"
          >
            The Bridge Project
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 leading-relaxed font-medium max-w-4xl mx-auto"
          >
            Building community support for JAHmere Webb's freedom through
            character witnesses, evidence, and transformational justice.
          </motion.p>

          {/* Impact stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                13
              </div>
              <div className="text-sm text-gray-600">Character Letters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                5,247
              </div>
              <div className="text-sm text-gray-600">Community Supporters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600">Advocate for Freedom</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {timeToHearing.days}
              </div>
              <div className="text-sm text-gray-600">Days Until Hearing</div>
            </div>
          </motion.div>

          {/* Social proof elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm font-medium"
          >
            <Badge
              variant="outline"
              className="px-4 py-2 bg-blue-50 text-blue-800 border-blue-200"
            >
              <Trophy className="w-4 h-4 mr-2" />
              NFL Hall of Famer Endorsed
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 bg-green-50 text-green-800 border-green-200"
            >
              <Shield className="w-4 h-4 mr-2" />
              Community Verified
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 bg-purple-50 text-purple-800 border-purple-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Court-Ready Documentation
            </Badge>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="lg"
              className="bg-gradient-divine text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold"
            >
              Choose Your Path
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 border-gray-300 hover:border-gray-400"
            >
              Read Character Letters
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-4">
              Trusted by community leaders, endorsed by character witnesses
            </p>

            {/* Countdown display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Time Until Freedom
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {timeToHearing.days}
                  </div>
                  <div className="text-xs text-gray-600">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {timeToHearing.hours}
                  </div>
                  <div className="text-xs text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {timeToHearing.minutes}
                  </div>
                  <div className="text-xs text-gray-600">Minutes</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Every moment counts toward JAHmere's transformation story
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
