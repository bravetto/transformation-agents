"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  Heart,
  Send,
  Flame,
  Crown,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhilsGoFundMeCompact } from "@/components/phils-miracle-gofundme";

interface PrayerStats {
  totalPrayers: number;
  currentPraying: number;
  countries: number;
  nextUnifiedTime: string;
}

interface PrayerTestimony {
  id: string;
  name: string;
  location: string;
  prayer: string;
  timestamp: Date;
}

export default function PrayerRoom() {
  const [stats, setStats] = useState<PrayerStats>({
    totalPrayers: 3247,
    currentPraying: 89,
    countries: 42,
    nextUnifiedTime: "2:37 PM",
  });

  const [testimonies, setTestimonies] = useState<PrayerTestimony[]>([
    {
      id: "1",
      name: "Sarah M.",
      location: "Atlanta, GA",
      prayer: "Lord, let Your justice shine for JAHmere. Break every chain!",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: "2",
      name: "Pastor James",
      location: "Houston, TX",
      prayer: "Father, we decree FREEDOM over JAHmere in Jesus' name!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "3",
      name: "Maria L.",
      location: "Phoenix, AZ",
      prayer: "God of justice, manifest Your power on July 28th!",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
    },
  ]);

  const [newPrayer, setNewPrayer] = useState({
    name: "",
    location: "",
    prayer: "",
  });
  const [timeToNext, setTimeToNext] = useState("");
  const [mounted, setMounted] = useState(false);

  const prayerPoints = [
    {
      icon: Crown,
      title: "Judge's Heart Softened",
      prayer: "Lord, touch the judge's heart with Your wisdom and mercy",
      verse: "Proverbs 21:1 - The king's heart is in the hand of the LORD",
    },
    {
      icon: Shield,
      title: "Prosecution Confused",
      prayer: "Let their arguments fall apart and truth prevail",
      verse: "Isaiah 54:17 - No weapon formed against you shall prosper",
    },
    {
      icon: Zap,
      title: "Angels Dispatched",
      prayer: "Send Your mighty angels to fight for JAHmere",
      verse: "Psalm 91:11 - He shall give His angels charge over you",
    },
    {
      icon: Flame,
      title: "Verdict: NOT GUILTY",
      prayer: "Let the verdict be clear - INNOCENT and FREE",
      verse: "Romans 8:1 - There is no condemnation for those in Christ",
    },
  ];

  useEffect(() => {
    setMounted(true);

    // Update stats every 10 seconds
    const statsTimer = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalPrayers: prev.totalPrayers + Math.floor(Math.random() * 5) + 1,
        currentPraying: 75 + Math.floor(Math.random() * 30),
        countries: Math.min(
          prev.countries + Math.floor(Math.random() * 2),
          195,
        ),
      }));
    }, 10000);

    // Calculate time to next unified prayer (every hour at :37 minutes)
    const updateTimeToNext = () => {
      const now = new Date();
      const next = new Date(now);
      next.setMinutes(37, 0, 0);
      if (now.getMinutes() >= 37) {
        next.setHours(next.getHours() + 1);
      }

      const diff = next.getTime() - now.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeToNext(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };

    updateTimeToNext();
    const timeTimer = setInterval(updateTimeToNext, 1000);

    return () => {
      clearInterval(statsTimer);
      clearInterval(timeTimer);
    };
  }, []);

  const submitPrayer = () => {
    if (newPrayer.name && newPrayer.prayer) {
      const prayer: PrayerTestimony = {
        id: Date.now().toString(),
        name: newPrayer.name,
        location: newPrayer.location || "Unknown",
        prayer: newPrayer.prayer,
        timestamp: new Date(),
      };

      setTestimonies((prev) => [prayer, ...prev.slice(0, 9)]); // Keep last 10
      setNewPrayer({ name: "", location: "", prayer: "" });

      // Update prayer count
      setStats((prev) => ({ ...prev, totalPrayers: prev.totalPrayers + 1 }));
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Prayer Room...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gold-400 to-purple-400 bg-clip-text text-transparent"
          >
            PRAYER WAR ROOM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8"
          >
            United in Prayer for JAHmere's Freedom - July 28th at 2:37 PM
          </motion.p>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gold-400">
                  {stats.totalPrayers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Total Prayers</div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border-green-400/30">
              <CardContent className="p-4 text-center">
                <Flame className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {stats.currentPraying}
                </div>
                <div className="text-sm text-gray-300">Praying Now</div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border-blue-400/30">
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {stats.countries}
                </div>
                <div className="text-sm text-gray-300">Countries</div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border-purple-400/30">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {timeToNext}
                </div>
                <div className="text-sm text-gray-300">Next Unity Prayer</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Prayer Points */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gold-400"
          >
            Strategic Prayer Points
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prayerPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-3">
                    <point.icon className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                    <CardTitle className="text-lg text-white">
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {point.prayer}
                    </p>
                    <div className="text-xs text-gold-400 font-semibold border-t border-gold-400/20 pt-3">
                      {point.verse}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Submission */}
      <section className="py-12 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-8 text-gold-400"
          >
            Add Your Prayer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Your Name
                    </label>
                    <Input
                      value={newPrayer.name}
                      onChange={(e) =>
                        setNewPrayer((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your name"
                      className="bg-black/20 border-gold-400/30 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gold-400 mb-2">
                      Location (Optional)
                    </label>
                    <Input
                      value={newPrayer.location}
                      onChange={(e) =>
                        setNewPrayer((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="City, State/Country"
                      className="bg-black/20 border-gold-400/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gold-400 mb-2">
                    Your Prayer for JAHmere
                  </label>
                  <Textarea
                    value={newPrayer.prayer}
                    onChange={(e) =>
                      setNewPrayer((prev) => ({
                        ...prev,
                        prayer: e.target.value,
                      }))
                    }
                    placeholder="Lord, I pray for JAHmere's freedom..."
                    rows={4}
                    className="bg-black/20 border-gold-400/30 text-white placeholder-gray-400"
                  />
                </div>

                <Button
                  onClick={submitPrayer}
                  disabled={!newPrayer.name || !newPrayer.prayer}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-black font-bold py-3 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Prayer to Heaven
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Live Prayer Feed */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center mb-8 text-gold-400"
          >
            Live Prayer Feed
          </motion.h2>

          <div className="space-y-4">
            <AnimatePresence>
              {testimonies.map((testimony, index) => (
                <motion.div
                  key={testimony.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black/30 backdrop-blur-sm border-purple-400/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gold-400">
                              {testimony.name}
                            </span>
                            <span className="text-gray-400 text-sm">
                              from {testimony.location}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {Math.floor(
                                (Date.now() - testimony.timestamp.getTime()) /
                                  60000,
                              )}
                              m ago
                            </span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            {testimony.prayer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Unified Prayer Times */}
      <section className="py-12 px-4 bg-gradient-to-r from-gold-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl font-bold mb-8 text-gold-400"
          >
            Unified Prayer Schedule
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {[
              {
                time: "6:00 AM",
                title: "Morning Watch",
                description: "Start the day with intercession",
              },
              {
                time: "2:37 PM",
                title: "Divine Hour",
                description: "The prophetic breakthrough time",
              },
              {
                time: "9:00 PM",
                title: "Night Guard",
                description: "End the day in prayer warfare",
              },
            ].map((schedule, index) => (
              <Card
                key={schedule.time}
                className="bg-black/30 backdrop-blur-sm border-gold-400/30"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-gold-400 mb-2">
                    {schedule.time}
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">
                    {schedule.title}
                  </div>
                  <div className="text-sm text-gray-300">
                    {schedule.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Phil's Connected Prayer Request */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                🙏 Connected Prayer Request
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                As we pray for JAHmere's freedom, let's also lift up Phil's
                healing journey from PTSD. Same spiritual warfare, same divine
                victory needed.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <PhilsGoFundMeCompact />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/july-28-portal">
              <Button
                size="lg"
                className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-8 py-4"
              >
                Back to Portal
              </Button>
            </Link>

            <Link href="/countdown">
              <Button
                size="lg"
                variant="outline"
                className="border-gold-400 text-gold-400 hover:bg-gold-400/10 px-8 py-4"
              >
                View Countdown
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
