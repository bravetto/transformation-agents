"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealtimeSupporterCounter } from "@/components/ui/realtime-supporter-counter";

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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate days until July 28, 2025
  const targetDate = new Date("2025-07-28T09:00:00");
  const timeUntil = targetDate.getTime() - currentTime.getTime();
  const daysLeft = Math.ceil(timeUntil / (1000 * 60 * 60 * 24));

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Optimized Background Image for LCP */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/optimized/hero-background.webp"
          alt="Justice and transformation background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Qg="
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Social Proof Slider - Positioned Above Fold per HubSpot Research */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-6 text-sm font-medium text-gray-700">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>
                {socialProofStats.supporters.toLocaleString()} Supporters
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{socialProofStats.avgImpactScore}/100 Impact Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span>{daysLeft} Days Until Hearing</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
              URGENT: Court Date July 28, 2025
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              JAHmere Webb
              <span className="block text-blue-600">Freedom Portal</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join the movement to support JAHmere's transformation journey.
              With 13 powerful character witness letters and divine
              intervention, we're fighting for justice, redemption, and a second
              chance.
            </p>

            {/* Jordan Dungy Testimonial Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500"
            >
              <div className="flex items-start space-x-4">
                <Quote className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 italic mb-3 text-lg leading-relaxed">
                    "{featuredWitness.quote}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {featuredWitness.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        {featuredWitness.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                asChild
              >
                <Link href="/people/jahmere-webb">View Character Letters</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                asChild
              >
                <Link href="/july-28-strategy">July 28th Strategy</Link>
              </Button>
            </div>

            {/* Real-time Supporter Activity */}
            <RealtimeSupporterCounter
              initialCount={socialProofStats.supporters}
            />
          </motion.div>

          {/* Hero Image - Optimized for conversion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/optimized/jahmere-hero-portrait.webp"
                alt="JAHmere Webb - Transformation and Hope"
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Qg="
              />

              {/* Floating stats overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {socialProofStats.characterLetters}
                  </div>
                  <div className="text-xs text-gray-600">Character Letters</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {socialProofStats.totalWords.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Words of Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
