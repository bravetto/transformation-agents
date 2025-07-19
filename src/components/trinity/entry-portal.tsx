"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Scale, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserJourney } from "@/lib/state/user-journey";
import {
  ParticleField,
  PropheticCountdown,
} from "@/components/ui/particle-field";
import { useState, useCallback } from "react";
import { logger } from "@/lib/logger";

interface PathDoorProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: "gold" | "blue" | "green";
  stats: string;
  features: string[];
  path: "champion" | "evidence" | "youth";
  onClick: () => void;
}

const PathDoor: React.FC<PathDoorProps> = ({
  icon,
  title,
  subtitle,
  color,
  stats,
  features,
  path,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    gold: {
      gradient: "from-amber-600 to-yellow-500",
      hoverGradient: "from-amber-500 to-yellow-400",
      border: "border-amber-400",
      glow: "shadow-amber-500/50",
    },
    blue: {
      gradient: "from-blue-600 to-indigo-500",
      hoverGradient: "from-blue-500 to-indigo-400",
      border: "border-blue-400",
      glow: "shadow-blue-500/50",
    },
    green: {
      gradient: "from-green-600 to-emerald-500",
      hoverGradient: "from-green-500 to-emerald-400",
      border: "border-green-400",
      glow: "shadow-green-500/50",
    },
  };

  const config = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      <div
        className={`
        h-96 rounded-2xl bg-gradient-to-br ${isHovered ? config.hoverGradient : config.gradient}
        p-8 text-white shadow-2xl backdrop-blur-sm
        border-2 ${config.border} overflow-hidden
        transform transition-all duration-300
        ${isHovered ? `shadow-2xl ${config.glow}` : ""}
      `}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: isHovered
                ? ["0% 0%", "100% 100%"]
                : ["0% 0%", "50% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <motion.div
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-white/80 mb-4">{subtitle}</p>

            {/* Features List */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-white/90"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            <div className="text-sm text-white/60">{stats}</div>
            <motion.div
              className="flex items-center gap-2 text-white font-semibold"
              animate={{
                x: isHovered ? 5 : 0,
              }}
            >
              <span>Choose This Path</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const EntryPortal: React.FC = () => {
  const router = useRouter();
  const { selectPath, selectedPath } = useUserJourney();
  const [showDetails, setShowDetails] = useState(false);

  const handlePathSelection = (path: "champion" | "evidence" | "youth") => {
    selectPath(path);

    // Add a brief delay for visual feedback
    setTimeout(() => {
      router.push(`/${path}`);
    }, 500);
  };

  const handleCountdownMilestone = useCallback((milestone: string) => {
    logger.divine("Countdown milestone", { milestone });
    // Could trigger additional divine events here
  }, []);

  const pathsData = [
    {
      path: "champion" as const,
      icon: <Trophy className="w-10 h-10" />,
      title: "I Have Influence",
      subtitle: "Use your platform for transformation",
      color: "gold" as const,
      stats: "Join 127+ Champions",
      features: [
        "Write influential letters to Judge Ferrero",
        "Activate your network for maximum impact",
        "Mentor youth through Greatness Zone",
        "Access Tony Dungy spiritual covering",
        "Join exclusive champion community",
      ],
    },
    {
      path: "evidence" as const,
      icon: <Scale className="w-10 h-10" />,
      title: "I Seek Truth",
      subtitle: "Evidence that transforms justice",
      color: "blue" as const,
      stats: "12% vs 70% Recidivism",
      features: [
        "Explore revolutionary recidivism data",
        "Witness the Greatness Zone miracle",
        "Access exclusive research findings",
        "Share evidence with your network",
        "Join the evidence revolution",
      ],
    },
    {
      path: "youth" as const,
      icon: <Heart className="w-10 h-10" />,
      title: "I Serve Youth",
      subtitle: "Transform the next generation",
      color: "green" as const,
      stats: "1 Youth = 10 Futures",
      features: [
        "Create your Youth Warrior identity",
        "Accept transformative missions",
        "Earn badges and level up",
        "Join the Good Deed Revolution",
        "Become a bridge builder",
      ],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Particle Background */}
      <ParticleField connections={true} density={75} color="#ffffff" />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
        <div className="text-center space-y-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Where does your heart lead you?
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8">
              Choose your path to help JAHmere come home and transform American
              justice forever
            </p>

            {/* Mission Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-8 bg-white/10 backdrop-blur rounded-full px-8 py-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">8,743</div>
                <div className="text-xs text-white/60">Letters Sent</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">342</div>
                <div className="text-xs text-white/60">Youth Saved</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">127</div>
                <div className="text-xs text-white/60">Champions</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Path Selection */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, staggerChildren: 0.2 }}
          >
            {pathsData.map((pathData, index) => (
              <motion.div
                key={pathData.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                <PathDoor
                  {...pathData}
                  onClick={() => handlePathSelection(pathData.path)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Prophetic Countdown */}
          <motion.div
            className="mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Until JAHmere Comes Home
              </h2>
              <p className="text-white/60">
                Every second counts. Every action matters.
              </p>
            </div>

            <PropheticCountdown
              target="July 28, 2025 14:37:00"
              onMilestone={handleCountdownMilestone}
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <p className="text-white/80 text-lg mb-6">
              Your choice creates ripples of transformation across generations
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-8 py-3 bg-white/10 backdrop-blur rounded-full text-white
                       hover:bg-white/20 transition-all border border-white/20
                       hover:border-white/40"
            >
              {showDetails ? "Hide Details" : "Learn More About Each Path"}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => router.push("/unite")}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500
                   rounded-full flex items-center justify-center text-white
                   hover:scale-110 transition-all shadow-lg hover:shadow-xl"
        >
          <Sparkles className="w-8 h-8" />
        </button>
      </motion.div>
    </div>
  );
};
