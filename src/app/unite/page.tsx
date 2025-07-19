"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUserJourney } from "@/lib/state/user-journey";
import { PropheticCountdown } from "@/components/ui/particle-field";
import { Sparkles, Trophy, Scale, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { logger } from "@/lib/logger";

export default function UnitePage() {
  const { selectedPath, calculateImpact } = useUserJourney();
  const [unifiedMetrics, setUnifiedMetrics] = useState({
    totalWarriors: 12847,
    lettersSubmitted: 8743,
    youthTransformed: 342,
    championsActive: 127,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUnifiedMetrics((prev) => ({
        totalWarriors: prev.totalWarriors + Math.floor(Math.random() * 5),
        lettersSubmitted: prev.lettersSubmitted + Math.floor(Math.random() * 3),
        youthTransformed: prev.youthTransformed + (Math.random() > 0.8 ? 1 : 0),
        championsActive: prev.championsActive + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const pathConfig = {
    champion: { icon: Trophy, color: "amber", label: "Champion" },
    evidence: { icon: Scale, color: "blue", label: "Evidence" },
    youth: { icon: Heart, color: "green", label: "Youth" },
  };

  const handleUnityMilestone = (milestone: string) => {
    logger.divine("Unity milestone", { milestone });
    // Handle unity milestone logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-blue-950">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/entry"
                className="flex items-center gap-2 text-white hover:text-purple-100"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Paths</span>
              </Link>

              <div className="h-6 w-px bg-white/30" />

              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Unity Portal</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Convergence Header */}
      <div className="relative flex items-center justify-center py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/patterns/unity-grid.svg')] opacity-20" />
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20"
          />
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-8"
          >
            United We Rise
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/60 mb-12"
          >
            {unifiedMetrics.totalWarriors.toLocaleString()} warriors fighting
            for JAHmere's freedom
          </motion.p>

          {/* Your Path Badge */}
          {selectedPath && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-6 py-3 mb-8"
            >
              {(() => {
                const config = pathConfig[selectedPath];
                const Icon = config.icon;
                return (
                  <>
                    <Icon className="w-6 h-6 text-white" />
                    <span className="text-white font-semibold">
                      You chose the {config.label} Path
                    </span>
                  </>
                );
              })()}
            </motion.div>
          )}

          <PropheticCountdown
            target="July 28, 2025 14:37:00"
            onMilestone={handleUnityMilestone}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>

      {/* Unified Metrics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Combined Impact Force
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard
              label="Letters to Freedom"
              value={unifiedMetrics.lettersSubmitted}
              goal={10000}
              color="gold"
            />
            <MetricCard
              label="Youth Warriors"
              value={unifiedMetrics.youthTransformed}
              goal={1000}
              color="green"
            />
            <MetricCard
              label="Champion Leaders"
              value={unifiedMetrics.championsActive}
              goal={500}
              color="amber"
            />
            <MetricCard
              label="Evidence Points"
              value={847}
              goal={1000}
              color="blue"
            />
          </div>
        </motion.div>
      </div>

      {/* Action Center */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Every Action Brings JAHmere Closer to Freedom
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Choose your next move. The countdown continues.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <UnifiedActionButton
              label="Write Your Letter"
              href="/contact"
              impact="+50 Freedom Points"
            />
            <UnifiedActionButton
              label="Share the Story"
              href="/share"
              impact="+25 Amplification"
            />
            <UnifiedActionButton
              label="Join a Mission"
              href={`/${selectedPath || "youth"}/missions`}
              impact="+100 XP"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
const MetricCard: React.FC<{
  label: string;
  value: number;
  goal: number;
  color: "gold" | "green" | "amber" | "blue";
}> = ({ label, value, goal, color }) => {
  const percentage = Math.min((value / goal) * 100, 100);

  const colorClasses = {
    gold: "from-amber-500 to-yellow-500",
    green: "from-green-500 to-emerald-500",
    amber: "from-orange-500 to-amber-500",
    blue: "from-blue-500 to-indigo-500",
  };

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white/60 text-sm">{label}</h3>
          <div className="text-3xl font-bold text-white">
            {value.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/40 text-xs">Goal</div>
          <div className="text-white/60">{goal.toLocaleString()}</div>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      <div className="text-right text-xs text-white/40 mt-2">
        {percentage.toFixed(0)}% complete
      </div>
    </div>
  );
};

// Unified Action Button
const UnifiedActionButton: React.FC<{
  label: string;
  href: string;
  impact: string;
}> = ({ label, href, impact }) => {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white/20 backdrop-blur rounded-lg text-white 
                 hover:bg-white/30 transition-all font-semibold group"
      >
        <div>{label}</div>
        <div className="text-sm text-white/60 group-hover:text-white/80">
          {impact}
        </div>
      </motion.button>
    </Link>
  );
};
