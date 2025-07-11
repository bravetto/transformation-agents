"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import {
  Calendar,
  Heart,
  Users,
  Sunrise,
  Moon,
  Gift,
  Home,
  Baby,
  GraduationCap,
  Cake,
  Phone,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MissedMoment {
  icon: React.ReactNode;
  count: number;
  label: string;
  description: string;
  color: string;
}

interface EightYearsCounterProps {
  className?: string;
}

function EightYearsCounterCore({ className }: EightYearsCounterProps) {
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Calculate what 8.5 years means
  const yearsInDays = 8.5 * 365;
  const yearsInHours = yearsInDays * 24;
  const yearsInMinutes = yearsInHours * 60;
  const yearsInSeconds = yearsInMinutes * 60;

  const missedMoments: MissedMoment[] = [
    {
      icon: <Sunrise className="w-8 h-8" />,
      count: Math.floor(yearsInDays),
      label: "Sunrises",
      description: "Morning prayers with his mother",
      color: "text-orange-500",
    },
    {
      icon: <Moon className="w-8 h-8" />,
      count: Math.floor(yearsInDays),
      label: "Goodnights",
      description: "Tucking in his children",
      color: "text-blue-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      count: Math.floor(yearsInDays * 3),
      label: "I Love You's",
      description: "Said to family and friends",
      color: "text-red-500",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      count: 17,
      label: "Birthdays",
      description: "His own and his children's",
      color: "text-purple-500",
    },
    {
      icon: <Home className="w-8 h-8" />,
      count: 8,
      label: "Christmases",
      description: "Family gatherings missed",
      color: "text-green-500",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      count: Math.floor(yearsInDays * 2),
      label: "Phone Calls",
      description: "Checking on his mother",
      color: "text-indigo-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      count: 500,
      label: "Youth",
      description: "Who won't be mentored",
      color: "text-pink-500",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      count: 3,
      label: "Graduations",
      description: "His children's milestones",
      color: "text-yellow-500",
    },
  ];

  // Cycle through moments
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMomentIndex((prev) => (prev + 1) % missedMoments.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [missedMoments.length]);

  // Count up seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev >= yearsInSeconds) return 0;
        return prev + 1000;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [yearsInSeconds]);

  const currentMoment = missedMoments[currentMomentIndex];

  return (
    <Card
      className={cn(
        "p-8 bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 relative overflow-hidden",
        className,
      )}
    >
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, red 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, orange 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, red 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">
            8.5 Years = {yearsInDays.toLocaleString()} Days
          </h2>
          <p className="text-red-400 text-xl">
            This is what the State wants to steal from JAHmere
          </p>
        </div>

        {/* Main Counter */}
        <div className="bg-black/50 rounded-lg p-6">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Time Lost Forever
            </p>
            <p className="text-6xl font-mono font-bold text-white">
              {totalSeconds.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">seconds and counting...</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">{yearsInDays}</p>
              <p className="text-xs text-gray-400">Days</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">
                {yearsInHours.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">
                {yearsInMinutes.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">
                {yearsInSeconds.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Seconds</p>
            </div>
          </div>
        </div>

        {/* Rotating Missed Moments */}
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            What Gets Stolen
          </h3>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMomentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className={cn("mx-auto mb-4", currentMoment.color)}>
                {currentMoment.icon}
              </div>
              <p className="text-5xl font-bold text-white mb-2">
                {currentMoment.count.toLocaleString()}
              </p>
              <p className="text-2xl text-white mb-1">{currentMoment.label}</p>
              <p className="text-gray-400">{currentMoment.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Impact Statement */}
        <div className="text-center space-y-4">
          <p className="text-white text-lg">
            Every second in prison is a second stolen from:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {missedMoments.slice(0, 4).map((moment, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className={cn("w-5 h-5", moment.color)}>
                  {React.cloneElement(moment.icon as React.ReactElement, {
                    className: "w-5 h-5",
                  })}
                </div>
                <span className="text-white text-sm">{moment.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mother's Pain */}
        <div className="bg-black/50 rounded-lg p-6 text-center">
          <p className="text-xl text-white mb-2">
            "Every day he's gone is a day I can't get back with my son."
          </p>
          <p className="text-red-400">- Martha Henderson</p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500 animate-pulse">
            This is NOT justice. This is CRUELTY.
          </p>
          <p className="text-white mt-2">
            JAHmere has already served 3,095 days. Enough is enough.
          </p>
        </div>
      </div>
    </Card>
  );
}

export const EightYearsCounter = withDivineErrorBoundary(
  EightYearsCounterCore,
  {
    componentName: "EightYearsCounter",
    fallback: <div>Loading the cost of injustice...</div>,
  },
);
