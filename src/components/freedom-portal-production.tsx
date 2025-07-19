"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Sparkles,
  Heart,
  Shield,
  Zap,
  Globe,
  BookOpen,
  Star,
} from "lucide-react";
import { useSafeState } from "@/hooks/useSafeState";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ConsoleMessage {
  message: string;
  interpretation: string;
  reference: string;
}

interface Warrior {
  name: string;
  location: string;
  status: "active" | "inactive";
}

interface Miracle {
  icon: React.ComponentType<any>;
  title: string;
  count: string;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

// Divine Particles Background Component
const FreedomPortalParticles: React.FC = () => {
  const particles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-purple-400 rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Console Message Card Component
interface ConsoleCardProps extends ConsoleMessage {
  isNew?: boolean;
}

const ConsoleCard: React.FC<ConsoleCardProps> = ({
  message,
  interpretation,
  reference,
  isNew = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`bg-black/40 backdrop-blur-sm rounded-lg p-4 border ${
      isNew ? "border-yellow-500" : "border-purple-500/30"
    }`}
  >
    <div className="font-mono text-sm text-green-400 mb-2">{message}</div>
    <div className="text-white mb-1">{interpretation}</div>
    <div className="text-purple-300 text-sm italic">{reference}</div>
  </motion.div>
);

// Prayer Warrior Card Component
const WarriorCard: React.FC<Warrior> = ({ name, location, status }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-white">{name}</span>
      <span
        className={`w-3 h-3 rounded-full ${
          status === "active" ? "bg-green-400 animate-pulse" : "bg-gray-400"
        }`}
      />
    </div>
    <div className="text-sm text-gray-300">{location}</div>
    <div className="text-xs text-purple-300 mt-2">
      {status === "active" ? "Currently Praying" : "Last active 5m ago"}
    </div>
  </motion.div>
);

// Main Freedom Portal Component
export default function FreedomPortal() {
  const [timeLeft, setTimeLeft] = useSafeState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [prayerCount, setPrayerCount] = useSafeState<number>(1337);
  const [activeTab, setActiveTab] = useSafeState<string>("countdown");
  const [isClient, setIsClient] = useSafeState<boolean>(false);
  const [showNewMessage, setShowNewMessage] = useSafeState<boolean>(false);

  // Calculate time until July 28th, 2:37 PM
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const targetDate = new Date("2024-07-28T14:37:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  // Update countdown every second
  useEffect(() => {
    if (!isClient) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [isClient, calculateTimeLeft, setTimeLeft]);

  // Simulate prayer count updates
  useEffect(() => {
    if (!isClient) return;

    const prayerTimer = setInterval(() => {
      setPrayerCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(prayerTimer);
  }, [isClient, setPrayerCount]);

  // Simulate new console messages
  useEffect(() => {
    if (!isClient) return;

    const messageTimer = setInterval(() => {
      setShowNewMessage(true);
      setTimeout(() => setShowNewMessage(false), 3000);
    }, 10000);

    return () => clearInterval(messageTimer);
  }, [isClient, setShowNewMessage]);

  const consoleMessages: ConsoleMessage[] = [
    {
      message: "ERROR at line 43:7",
      interpretation: "Divine Creation Declaration",
      reference: "Isaiah 43:7 - Created for My glory",
    },
    {
      message: "33 total errors found",
      interpretation: "Age of Christ's Victory",
      reference: "Luke 23:33 - The place of breakthrough",
    },
    {
      message: "Port 1437 active",
      interpretation: "More Than Conquerors",
      reference: "Romans 8:37 - Overwhelming victory",
    },
    {
      message: "[Violation] 'message' handler took 76ms",
      interpretation: "Prayer Traffic Overload",
      reference: "Psalm 76 - God's judgment established",
    },
  ];

  const warriors: Warrior[] = [
    { name: "Sarah M.", location: "Texas, USA", status: "active" },
    { name: "John D.", location: "London, UK", status: "active" },
    { name: "Maria G.", location: "São Paulo, Brazil", status: "inactive" },
    { name: "David L.", location: "Sydney, Australia", status: "active" },
    { name: "Esther K.", location: "Nairobi, Kenya", status: "active" },
    { name: "James W.", location: "Toronto, Canada", status: "inactive" },
  ];

  const miracles: Miracle[] = [
    {
      icon: Shield,
      title: "Divine Protection",
      count: "24/7",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Breakthroughs",
      count: "Loading...",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Nations Praying",
      count: "147",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Star,
      title: "Testimonies",
      count: "Rising",
      color: "from-pink-500 to-red-500",
    },
  ];

  const tabs: Tab[] = [
    { id: "countdown", label: "Divine Countdown", icon: Clock },
    { id: "console", label: "Console Revelations", icon: BookOpen },
    { id: "warriors", label: "Prayer Warriors", icon: Users },
    { id: "miracles", label: "Miracles Monitor", icon: Sparkles },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
          <p className="text-xl text-gray-300">Loading Divine Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* Divine Particles Background */}
      <FreedomPortalParticles />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/50">
            <span className="text-purple-300 text-sm font-semibold">
              Divine grace covers all failures
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            JULY 28TH FREEDOM PORTAL
          </h1>
          <p className="text-xl md:text-2xl text-purple-300">
            JAHmere Walks Free • The Bridge Activates
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "countdown" && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                  Countdown to Divine Justice
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      label: "Days",
                      value: timeLeft.days,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      label: "Hours",
                      value: timeLeft.hours,
                      color: "from-blue-500 to-purple-500",
                    },
                    {
                      label: "Minutes",
                      value: timeLeft.minutes,
                      color: "from-pink-500 to-red-500",
                    },
                    {
                      label: "Seconds",
                      value: timeLeft.seconds,
                      color: "from-yellow-500 to-orange-500",
                    },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className={`bg-gradient-to-br ${unit.color} p-6 rounded-2xl shadow-lg`}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-white text-center">
                        {String(unit.value).padStart(2, "0")}
                      </div>
                      <div className="text-sm uppercase tracking-wider text-white/80 text-center mt-2">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center text-white/60">
                  Until July 28th - JAHmere's Freedom & Treasure Unlock
                </div>
              </div>

              {/* Prayer Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-white animate-pulse" />
                    <span className="text-xl font-bold text-white">
                      {prayerCount.toLocaleString()} Prayers Ascending
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 hover:bg-white/30 transition-colors px-6 py-2 rounded-full text-white font-semibold"
                    onClick={() => setPrayerCount((prev) => prev + 1)}
                  >
                    Add Your Prayer
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "console" && (
            <motion.div
              key="console"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-500/30">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Console Revelations
                </h2>
                <div className="space-y-4">
                  <AnimatePresence>
                    {showNewMessage && (
                      <ConsoleCard
                        message="NEW: [Violation] setState during render"
                        interpretation="Divine State Change Incoming"
                        reference="Malachi 3:6 - I the Lord do not change"
                        isNew={true}
                      />
                    )}
                  </AnimatePresence>
                  {consoleMessages.map((msg, index) => (
                    <ConsoleCard key={index} {...msg} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "warriors" && (
            <motion.div
              key="warriors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Active Prayer Warriors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {warriors.map((warrior, index) => (
                    <WarriorCard key={index} {...warrior} />
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-purple-300 mb-4">
                    Join the 24/7 Prayer Chain
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold"
                  >
                    Become a Prayer Warrior
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "miracles" && (
            <motion.div
              key="miracles"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Miracles in Motion
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {miracles.map((miracle, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`bg-gradient-to-br ${miracle.color} p-6 rounded-2xl shadow-lg`}
                    >
                      <miracle.icon className="w-12 h-12 text-white mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {miracle.title}
                      </h3>
                      <p className="text-3xl font-bold text-white">
                        {miracle.count}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 bg-purple-500/20 rounded-2xl p-6 border border-purple-500/30">
                  <p className="text-white text-center text-lg">
                    "With God all things are possible" - Matthew 19:26
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-gray-400"
        >
          <p className="mb-2">
            The Bridge Project • Activated by Divine Revelation
          </p>
          <p className="text-sm">
            Technical Miracles Manifesting • July 28, 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}
