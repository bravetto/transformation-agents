"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RealtimeSupporterCounter } from "@/components/ui/realtime-supporter-counter";
import { TonyDungyVideoIntegration } from "@/components/ui/tony-dungy-video-integration";

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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-07-28T09:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-6 py-12 lg:py-20">
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
              <span>
                {socialProofStats.totalWords.toLocaleString()} Words of Support
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Urgent Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">
                  URGENT: July 28th, 2025 Court Date
                </span>
              </div>
              <p className="text-red-700 text-sm">
                JAHmere Webb faces a critical sentencing hearing. Your support
                can help demonstrate community backing for The Bridge Project
                alternative.
              </p>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Help Free <span className="text-blue-600">JAHmere Webb</span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                A young man's transformation story backed by 13 character
                witnesses, including <strong>Jordan Dungy</strong> (son of NFL
                Hall of Fame Coach Tony Dungy), who believes in JAHmere's
                redemption.
              </p>
            </div>

            {/* Jordan Dungy Testimonial - Prominently Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <blockquote className="text-lg font-medium text-gray-900 italic">
                    "{featuredWitness.quote}"
                  </blockquote>
                  <div className="mt-3">
                    <p className="font-semibold text-blue-800">
                      {featuredWitness.name}
                    </p>
                    <p className="text-sm text-blue-600">
                      {featuredWitness.title}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-yellow-100 text-yellow-800"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      NFL Legacy Character Witness
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/character-witnesses">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Read All 13 Character Letters
                </Button>
              </Link>
              <Link href="/bridge-project">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Learn About The Bridge Project
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Countdown Timer & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Countdown Timer */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Time Until Court Hearing
              </h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs text-red-500 uppercase">Days</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs text-red-500 uppercase">Hours</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs text-red-500 uppercase">Minutes</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs text-red-500 uppercase">Seconds</div>
                </div>
              </div>
            </div>

            {/* Support Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Community Support
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Character Letters</span>
                  <span className="font-bold text-blue-600">
                    {socialProofStats.characterLetters}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Supporters</span>
                  <span className="font-bold text-green-600">
                    {socialProofStats.supporters.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Impact Score</span>
                  <span className="font-bold text-yellow-600">
                    {socialProofStats.avgImpactScore}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Activity Feed */}
            <RealtimeSupporterCounter
              initialCount={socialProofStats.supporters}
              className="bg-white rounded-xl shadow-lg"
            />
          </motion.div>
        </div>

        {/* Tony Dungy Video Integration - Maximum Authority Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <TonyDungyVideoIntegration
            selectedCategory="leadership"
            showJordanConnection={true}
            maxVideos={1}
            layout="featured"
            className="max-w-4xl mx-auto"
          />
        </motion.div>

        {/* Additional Tony Dungy Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <TonyDungyVideoIntegration
            showJordanConnection={true}
            maxVideos={3}
            layout="grid"
            className="max-w-6xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
