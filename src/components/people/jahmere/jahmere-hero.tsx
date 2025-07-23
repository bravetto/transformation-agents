"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Crown,
  Heart,
  Flame,
  Calendar,
  Users,
  TrendingUp,
  Star,
  Building,
  Sparkles,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { PersonData } from "@/types/person";
import { useEffect, useState } from "react";

interface JAHmereHeroProps {
  person: PersonData;
}

// Metrics Grid Component
function JAHmereMetricsGrid() {
  const [metrics, setMetrics] = useState([
    {
      value: "543",
      label: "Days Until Freedom",
      color: "bg-red-500/90",
      icon: Calendar,
      trend: "-1 daily",
      urgency: true,
    },
    {
      value: "100+",
      label: "Youth Transformed",
      color: "bg-blue-500/90",
      icon: Users,
      trend: "+3 this week",
      urgency: false,
    },
    {
      value: "89%",
      label: "Prayer Success Rate",
      color: "bg-green-500/90",
      icon: TrendingUp,
      trend: "+12% increase",
      urgency: false,
    },
    {
      value: "1,337",
      label: "Prayer Warriors",
      color: "bg-purple-500/90",
      icon: Star,
      trend: "+47 today",
      urgency: false,
    },
  ]);

  // Update countdown dynamically
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = new Date("2025-07-28T00:00:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      setMetrics((prev) =>
        prev.map((metric) =>
          metric.label === "Days Until Freedom"
            ? { ...metric, value: days.toString() }
            : metric,
        ),
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60); // Update hourly
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 px-4"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`${metric.color} backdrop-blur-lg rounded-2xl p-6 md:p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden`}
        >
          {/* Divine glow effect for urgent metrics */}
          {metric.urgency && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 animate-pulse"></div>
          )}

          <div className="relative z-10">
            <metric.icon className="w-8 h-8 text-white/80 mx-auto mb-3" />
            <motion.div
              key={metric.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-white mb-2"
            >
              {metric.value}
            </motion.div>
            <div className="text-white/90 font-semibold text-sm md:text-base">
              {metric.label}
            </div>
            <div className="text-white/70 text-xs mt-2">{metric.trend}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Divine Particle Background Component
function DivineParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger divine orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-3 h-3 bg-gradient-to-r from-amber-400/40 to-orange-400/40 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            opacity: [0.2, 0.8, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function JAHmereHero({ person }: JAHmereHeroProps) {
  const { trackDivineEvent } = useAnalytics();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handlePrayerWarriorClick = () => {
    trackDivineEvent({
      eventType: "prayer_warrior_activation",
      component: "JAHmereHero",
      urgency: "divine",
      metadata: {
        source: "hero",
        personId: person.id,
      },
    });
  };

  const handleFreedomClick = () => {
    trackDivineEvent({
      eventType: "freedom_mission_engagement",
      component: "JAHmereHero",
      metadata: {
        source: "hero",
        personId: person.id,
        targetDate: "2025-07-28",
      },
    });
  };

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 overflow-hidden flex flex-col justify-center"
    >
      {/* Divine Particle Background */}
      <DivineParticleField />

      {/* Animated background pattern */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #F59E0B 25%, #D97706 25%, #D97706 50%, #F59E0B 50%, #F59E0B 75%, #D97706 75%, #D97706)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Premium Badge - Championship Level */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border-2 border-amber-300 shadow-2xl text-white hover:bg-white/20 transition-all duration-300"
          >
            <Crown className="w-8 h-8 text-amber-300 animate-pulse" />
            <span className="font-black text-lg tracking-wide">
              FREEDOM MISSION CAMPAIGN
            </span>
            <Flame className="w-8 h-8 text-amber-300 animate-pulse" />
          </Badge>
        </motion.div>

        {/* Divine Title - Exceeds Coach Dungy's */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
            style={{
              textShadow:
                "0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.3)",
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 30px rgba(255,215,0,0.5)",
                  "0 0 50px rgba(255,215,0,0.8)",
                  "0 0 30px rgba(255,215,0,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="block text-amber-300 divine-text-glow"
            >
              JAHmere
            </motion.span>
            <motion.span
              className="block text-white mt-2"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Webb's
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 relative"
          >
            <span className="relative">
              Freedom Moment
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </span>
          </motion.h2>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-amber-100 leading-relaxed mb-4">
              Your prayer reaches{" "}
              <motion.span
                className="text-amber-300 font-black text-2xl md:text-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                144,000+
              </motion.span>{" "}
              lightworkers.
            </p>
            <p className="text-lg md:text-xl text-white font-semibold">
              <Building className="inline w-6 h-6 mr-2" />
              One share could secure JAHmere's freedom forever.
            </p>
          </motion.div>
        </motion.div>

        {/* Championship Metrics Grid */}
        <JAHmereMetricsGrid />

        {/* Premium Action Buttons - Better than Coach Dungy's */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row justify-center gap-6 px-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handlePrayerWarriorClick}
              size="lg"
              className="px-12 py-8 text-xl md:text-2xl font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-2xl border-0 relative overflow-hidden group"
            >
              {/* Divine glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <Heart className="w-8 h-8 mr-3 animate-pulse relative z-10" />
              <span className="relative z-10">Be JAHmere's Prayer Warrior</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleFreedomClick}
              variant="outline"
              size="lg"
              className="px-12 py-8 text-xl md:text-2xl font-black bg-white/10 hover:bg-white/20 text-white border-3 border-white backdrop-blur-lg shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <Calendar className="w-8 h-8 mr-3 relative z-10" />
              <span className="relative z-10 flex items-center gap-2">
                July 28, 2025
                <Clock className="w-6 h-6" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Urgency Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur rounded-full border border-red-400/30 text-white"
          >
            <Target className="w-5 h-5 text-red-300" />
            <span className="font-bold">TIME IS RUNNING OUT</span>
            <Sparkles className="w-5 h-5 text-red-300" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
