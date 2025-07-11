"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Users,
  Target,
  Calendar,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import Link from "next/link";

// Letter campaign goals
const CAMPAIGN_GOALS = {
  characterWitnesses: {
    current: 7, // Martha's favorite number = God's Number!
    target: 50,
    label: "Character Witnesses",
    description: "Elite testimonials from community leaders",
    icon: Star,
    color: "blue",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  youthLetters: {
    current: 0,
    target: 500,
    label: "Youth Support Letters",
    description: "Voices of the future supporting JAHmere",
    icon: Heart,
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
  communityLetters: {
    current: 0,
    target: 500,
    label: "Community Letters",
    description: "Broad coalition of supporters",
    icon: Users,
    color: "purple",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
  },
};

const LetterCampaignTracker = () => {
  const [mounted, setMounted] = useState(false);
  const [timeUntilCourt, setTimeUntilCourt] = useState("");

  useEffect(() => {
    setMounted(true);

    // Countdown to July 28th, 2025
    const courtDate = new Date("2025-07-28T09:00:00-04:00");
    const updateTimer = () => {
      const now = new Date();
      const diff = courtDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        setTimeUntilCourt(`${days} days, ${hours} hours`);
      } else {
        setTimeUntilCourt("Court date reached");
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  // Calculate totals
  const totalCurrent = Object.values(CAMPAIGN_GOALS).reduce(
    (sum, goal) => sum + goal.current,
    0,
  );
  const totalTarget = Object.values(CAMPAIGN_GOALS).reduce(
    (sum, goal) => sum + goal.target,
    0,
  );
  const overallProgress = (totalCurrent / totalTarget) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
          🔥 July 28th Letter Campaign
        </Badge>

        <h2 className="text-4xl font-bold mb-4">
          From <span className="text-amber-600">7</span> to{" "}
          <span className="text-green-600">1,050</span> Letters
        </h2>

        <p className="text-xl text-gray-600 mb-4">
          Martha's favorite number (God's Number!) × Divine multiplication =
          Victory
        </p>

        <div className="flex items-center justify-center gap-4 text-lg">
          <Calendar className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">
            {timeUntilCourt} until July 28th
          </span>
        </div>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-4 mb-4">
            <Zap className="w-8 h-8 text-amber-600" />
            <div>
              <h3 className="text-2xl font-bold">
                Divine Multiplication Progress
              </h3>
              <p className="text-gray-600">
                Total letters collected across all campaigns
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-3xl font-bold text-amber-600">
                {totalCurrent}
              </span>
              <span className="text-xl text-gray-600">
                of {totalTarget.toLocaleString()}
              </span>
            </div>
            <Progress value={overallProgress} className="h-4" />
            <p className="text-sm text-gray-500 mt-1">
              {overallProgress.toFixed(1)}% complete
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-amber-700">
              🎯 Next milestone:{" "}
              {totalCurrent < 50
                ? "50 letters"
                : totalCurrent < 100
                  ? "100 letters"
                  : totalCurrent < 250
                    ? "250 letters"
                    : "500 letters"}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Individual Campaign Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(CAMPAIGN_GOALS).map(([key, goal], index) => {
          const Icon = goal.icon;
          const progress = (goal.current / goal.target) * 100;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card
                className={`p-6 ${goal.bgColor} ${goal.borderColor} h-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-8 h-8 ${goal.textColor}`} />
                  <div>
                    <h3 className="font-bold text-lg">{goal.label}</h3>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-2xl font-bold ${goal.textColor}`}>
                      {goal.current}
                    </span>
                    <span className="text-gray-600">of {goal.target}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    {progress.toFixed(1)}% complete
                  </p>
                </div>

                <div className="space-y-2">
                  {key === "characterWitnesses" && goal.current === 7 && (
                    <div className="text-center p-3 bg-amber-100 rounded-lg">
                      <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-sm font-semibold text-amber-700">
                        Starting with God's Number!
                      </p>
                    </div>
                  )}

                  {progress === 0 && key !== "characterWitnesses" && (
                    <div className="text-center p-3 bg-gray-100 rounded-lg">
                      <Target className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Ready to launch!</p>
                    </div>
                  )}

                  {progress > 0 && progress < 25 && (
                    <div className="text-center p-3 bg-blue-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm text-blue-700">Building momentum</p>
                    </div>
                  )}

                  {progress >= 25 && progress < 75 && (
                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-sm text-green-700">Great progress!</p>
                    </div>
                  )}

                  {progress >= 75 && (
                    <div className="text-center p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm text-purple-700">Almost there!</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <h3 className="text-2xl font-bold mb-4">
            Join the July 28th Victory Coalition
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Every letter matters. Every voice counts. Every supporter brings us
            closer to justice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/contact">
              <Button className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700">
                <Star className="w-5 h-5 mr-2" />
                Write Character Letter
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700">
                <Heart className="w-5 h-5 mr-2" />
                Youth Campaign
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700">
                <Users className="w-5 h-5 mr-2" />
                Community Support
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            <strong>GAME ON!</strong> From Martha's divine 7 to our victory
            1,050.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default withDivineErrorBoundary(LetterCampaignTracker, {
  componentName: "LetterCampaignTracker",
  role: "guardian",
});
