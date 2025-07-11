"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Sparkles,
  Heart,
  Users,
  Target,
  Award,
  Zap,
  Crown,
  Gift,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

interface MilestoneCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  milestone: {
    level: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
    achieved: number;
    total: number;
    nextMilestone?: {
      level: number;
      title: string;
      target: number;
    };
  };
  campaignStats: {
    totalLetters: number;
    goal: number;
    timeRemaining: string;
  };
}

// Milestone definitions for the July 28th campaign
const MILESTONES = [
  {
    level: 1,
    title: "First Light",
    description: "The journey begins with divine number 7 - Martha's favorite!",
    icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    target: 7,
    celebration:
      "🌟 From Martha's divine 7, the multiplication miracle begins!",
  },
  {
    level: 2,
    title: "Building Momentum",
    description: "Community voices joining the movement",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    target: 25,
    celebration: "💖 Hearts united! The community is responding!",
  },
  {
    level: 3,
    title: "Character Witnesses",
    description: "Elite testimonials from community leaders",
    icon: Star,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    target: 50,
    celebration: "⭐ 50 Character Witnesses achieved! Elite support secured!",
  },
  {
    level: 4,
    title: "Youth Uprising",
    description: "Young voices demanding justice",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
    target: 150,
    celebration:
      "✊ Youth voices rising! The next generation stands with JAHmere!",
  },
  {
    level: 5,
    title: "Community Power",
    description: "Broad coalition of supporters",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    target: 500,
    celebration:
      "🏠 Community power activated! Transformation over incarceration!",
  },
  {
    level: 6,
    title: "Divine Victory",
    description: "The multiplication miracle complete",
    icon: Crown,
    color: "text-gold-500",
    bgColor: "bg-gold-50",
    target: 1050,
    celebration: "👑 DIVINE VICTORY! 1,050 letters - the miracle is complete!",
  },
];

function MilestoneCelebration({
  isVisible,
  onClose,
  milestone,
  campaignStats,
}: MilestoneCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Animation sequence
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
      const timer3 = setTimeout(() => setAnimationPhase(3), 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  // Get milestone configuration
  const getMilestoneConfig = () => {
    return (
      MILESTONES.find((m) => m.target === milestone.achieved) || MILESTONES[0]
    );
  };

  const milestoneConfig = getMilestoneConfig();
  const MilestoneIcon = milestoneConfig.icon;

  // Calculate progress to next milestone
  const getNextMilestoneProgress = () => {
    const nextMilestone = MILESTONES.find((m) => m.target > milestone.achieved);
    if (!nextMilestone) return { progress: 100, nextTarget: milestone.total };

    const previousTarget =
      MILESTONES.find((m) => m.target <= milestone.achieved)?.target || 0;
    const progressInRange = milestone.achieved - previousTarget;
    const rangeSize = nextMilestone.target - previousTarget;
    const progress = (progressInRange / rangeSize) * 100;

    return {
      progress,
      nextTarget: nextMilestone.target,
      nextTitle: nextMilestone.title,
    };
  };

  const nextProgress = getNextMilestoneProgress();

  // Confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    color: ["#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6"][
      Math.floor(Math.random() * 5)
    ],
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Confetti Background */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {confettiParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: particle.color,
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  initial={{ scale: 0, rotate: 0, y: -100 }}
                  animate={{
                    scale: [0, 1, 1, 0],
                    rotate: particle.rotation,
                    y: [0, 200, 400],
                    x: [0, Math.random() * 100 - 50],
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            <Card
              className={cn(
                "p-8 border-4 shadow-2xl relative overflow-hidden",
                milestoneConfig.bgColor,
                "border-amber-300",
              )}
            >
              {/* Divine glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 via-amber-200/30 to-white/20"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Header */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: animationPhase >= 1 ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center",
                      milestoneConfig.bgColor,
                      "border-4 border-amber-300 shadow-xl",
                    )}
                  >
                    <MilestoneIcon
                      className={cn("w-10 h-10", milestoneConfig.color)}
                    />
                  </motion.div>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: animationPhase >= 1 ? 1 : 0, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-gray-800 mb-2"
                >
                  🎉 Milestone Achieved! 🎉
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: animationPhase >= 1 ? 1 : 0, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge variant="secondary" className="text-lg px-6 py-2 mb-4">
                    Level {milestoneConfig.level}: {milestoneConfig.title}
                  </Badge>
                </motion.div>
              </motion.div>

              {/* Achievement Display */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center mb-8"
              >
                <div className="bg-white rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: animationPhase >= 2 ? 1 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          delay: 1,
                        }}
                        className={cn(
                          "text-6xl font-bold",
                          milestoneConfig.color,
                        )}
                      >
                        {milestone.achieved}
                      </motion.div>
                      <div className="text-sm text-gray-600 font-medium">
                        Letters Submitted
                      </div>
                    </div>

                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Trophy className="w-16 h-16 text-amber-500" />
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-xl font-semibold text-gray-700 mb-4"
                  >
                    {milestoneConfig.celebration}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
                    transition={{ delay: 1.4 }}
                    className="text-gray-600"
                  >
                    {milestoneConfig.description}
                  </motion.p>
                </div>
              </motion.div>

              {/* Progress to Next Milestone */}
              {nextProgress.nextTarget &&
                nextProgress.nextTarget < campaignStats.goal && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: animationPhase >= 3 ? 1 : 0, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="mb-8"
                  >
                    <Card className="p-6 bg-white/80 border-2 border-gray-200">
                      <h3 className="font-bold text-lg mb-4 text-center flex items-center justify-center gap-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        Next Milestone: {nextProgress.nextTitle}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            Progress to {nextProgress.nextTarget} letters
                          </span>
                          <span>
                            {milestone.achieved} / {nextProgress.nextTarget}
                          </span>
                        </div>

                        <Progress
                          value={
                            (milestone.achieved / nextProgress.nextTarget) * 100
                          }
                          className="h-4"
                        />

                        <div className="text-center">
                          <span className="text-sm font-medium text-purple-600">
                            {nextProgress.nextTarget - milestone.achieved}{" "}
                            letters to next milestone!
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

              {/* Campaign Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: animationPhase >= 3 ? 1 : 0, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mb-8"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {campaignStats.totalLetters}
                    </div>
                    <div className="text-sm text-gray-600">Total Letters</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {campaignStats.goal}
                    </div>
                    <div className="text-sm text-gray-600">Final Goal</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="text-lg font-bold text-red-600">
                      {campaignStats.timeRemaining}
                    </div>
                    <div className="text-sm text-gray-600">Time Left</div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: animationPhase >= 3 ? 1 : 0, y: 0 }}
                transition={{ delay: 2 }}
                className="text-center space-y-4"
              >
                <p className="text-gray-600 font-medium">
                  Keep the momentum going! Every letter brings us closer to
                  transformation over incarceration.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-3"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Continue the Journey
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      // Trigger sharing
                      const shareText = `🎉 Milestone achieved! ${milestone.achieved} letters submitted for JAHmere Webb's transformation over incarceration. Join the movement! #BridgeNotBars #MilestoneAchieved`;
                      if (navigator.share) {
                        navigator.share({
                          title: "Milestone Achieved!",
                          text: shareText,
                          url: "https://thebridgeproject.org",
                        });
                      } else {
                        navigator.clipboard.writeText(
                          shareText + " https://thebridgeproject.org",
                        );
                      }
                    }}
                    className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Share the Victory
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default withDivineErrorBoundary(MilestoneCelebration, {
  componentName: "MilestoneCelebration",
  role: "messenger",
});
