"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Star,
  Zap,
  Crown,
  Flame,
  Users,
  Target,
  Send,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAnalytics } from "@/lib/hooks/use-analytics";

export function DivinePrayerActivation() {
  const [activeWarriors, setActiveWarriors] = useState(1337);
  const [prayersOffered, setPrayersOffered] = useState(7773);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [prayerText, setPrayerText] = useState("");
  const [warriorName, setWarriorName] = useState("");
  const [prayerIntention, setPrayerIntention] = useState("freedom");
  const { trackDivineEvent } = useAnalytics();

  // Divine power level animation
  const [powerLevel, setPowerLevel] = useState(73);

  useEffect(() => {
    // Simulate real-time prayer warrior activity
    const interval = setInterval(() => {
      setActiveWarriors((prev) => prev + Math.floor(Math.random() * 3));
      setPrayersOffered((prev) => prev + Math.floor(Math.random() * 5));
      setPowerLevel((prev) => Math.min(100, prev + (Math.random() * 2 - 1)));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrayerWarriorActivation = () => {
    trackDivineEvent({
      eventType: "prayer_warrior_activation",
      component: "DivinePrayerActivation",
      urgency: "divine",
      metadata: {
        source: "prayer_activation_component",
      },
    });
    setShowPrayerForm(true);
  };

  const handlePrayerSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track the prayer submission
    trackDivineEvent({
      eventType: "prayer_submitted",
      component: "DivinePrayerActivation",
      urgency: "divine",
      metadata: {
        personId: "jahmere-webb",
        intention: prayerIntention,
        hasName: !!warriorName,
        prayerLength: prayerText.length,
        source: "divine_prayer_activation",
      },
    });

    // Simulate prayer processing
    setPrayersOffered((prev) => prev + 1);
    setPrayerSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setPrayerSubmitted(false);
      setShowPrayerForm(false);
      setPrayerText("");
      setWarriorName("");
      setPrayerIntention("freedom");
    }, 3000);
  };

  const prayerIntentions = [
    {
      value: "freedom",
      label: "Freedom & Justice",
      icon: Crown,
      color: "text-amber-600",
    },
    {
      value: "protection",
      label: "Divine Protection",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      value: "transformation",
      label: "Transformation",
      icon: Star,
      color: "text-purple-600",
    },
    {
      value: "healing",
      label: "Healing & Peace",
      icon: Heart,
      color: "text-green-600",
    },
    {
      value: "guidance",
      label: "Divine Guidance",
      icon: Target,
      color: "text-red-600",
    },
  ];

  const divineMetrics = [
    {
      label: "Prayer Warriors Active",
      value: activeWarriors.toLocaleString(),
      icon: Users,
      color: "from-purple-500 to-purple-600",
      trend: "+47 today",
    },
    {
      label: "Prayers Offered",
      value: prayersOffered.toLocaleString(),
      icon: Heart,
      color: "from-red-500 to-red-600",
      trend: "+127 this hour",
    },
    {
      label: "Divine Power Level",
      value: `${powerLevel.toFixed(1)}%`,
      icon: Zap,
      color: "from-amber-500 to-amber-600",
      trend: "Ascending",
    },
    {
      label: "Global Reach",
      value: "144K+",
      icon: Globe,
      color: "from-blue-500 to-blue-600",
      trend: "87 countries",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Divine energy particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger divine orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/50 to-blue-400/50 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
              opacity: [0.3, 0.9, 0.5, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Crown className="w-20 h-20 text-amber-400" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Divine Prayer Activation
            </h2>

            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join the spiritual battle for JAHmere's freedom. Your prayers
              create divine intervention.
              <span className="text-amber-300 font-bold">
                {" "}
                Every prayer warrior matters.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-purple-200">
              <Badge
                variant="outline"
                className="border-purple-300 text-purple-100 bg-purple-800/50 px-4 py-2"
              >
                <Shield className="w-4 h-4 mr-2" />
                Spiritual Warfare Active
              </Badge>
              <Badge
                variant="outline"
                className="border-amber-300 text-amber-100 bg-amber-800/50 px-4 py-2"
              >
                <Flame className="w-4 h-4 mr-2" />
                Divine Power: {powerLevel.toFixed(0)}%
              </Badge>
            </div>
          </div>

          {/* Divine Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {divineMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card
                  className={`p-6 bg-gradient-to-br ${metric.color} shadow-2xl border-0 text-white relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  <div className="relative z-10 text-center">
                    <metric.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl md:text-4xl font-black mb-2"
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-sm font-bold opacity-90 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs opacity-70">{metric.trend}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Prayer Warrior Activation */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!showPrayerForm ? (
                <motion.div
                  key="activation-prompt"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <Card className="p-12 bg-gradient-to-r from-purple-800/80 to-blue-800/80 backdrop-blur-lg border-purple-400/30 shadow-2xl">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-8"
                    >
                      <Flame className="w-16 h-16 text-amber-400 mx-auto" />
                    </motion.div>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                      Become a Prayer Warrior
                    </h3>

                    <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                      JAHmere needs divine intervention for his July 28th court
                      date. Your prayers join a powerful spiritual army fighting
                      for justice and transformation.
                    </p>

                    <Button
                      onClick={handlePrayerWarriorActivation}
                      size="lg"
                      className="px-12 py-6 text-xl font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Heart className="w-8 h-8 mr-4 animate-pulse" />
                      Activate Prayer Warrior Mode
                    </Button>
                  </Card>
                </motion.div>
              ) : !prayerSubmitted ? (
                <motion.div
                  key="prayer-form"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-lg shadow-2xl border-2 border-purple-200">
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block mb-4"
                      >
                        <Star className="w-12 h-12 text-purple-600" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        Submit Your Prayer
                      </h3>
                      <p className="text-gray-600">
                        Your prayer joins thousands fighting spiritually for
                        JAHmere's freedom
                      </p>
                    </div>

                    <form
                      onSubmit={handlePrayerSubmission}
                      className="space-y-6"
                    >
                      {/* Prayer Intention Selection */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Prayer Intention
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {prayerIntentions.map((intention) => (
                            <motion.button
                              key={intention.value}
                              type="button"
                              onClick={() =>
                                setPrayerIntention(intention.value)
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                prayerIntention === intention.value
                                  ? "border-purple-500 bg-purple-50"
                                  : "border-gray-200 hover:border-purple-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <intention.icon
                                  className={`w-5 h-5 ${intention.color}`}
                                />
                                <span className="font-medium text-sm">
                                  {intention.label}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Optional Name */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Your Name (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="Prayer Warrior"
                          value={warriorName}
                          onChange={(e) => setWarriorName(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      {/* Prayer Text */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Your Prayer
                        </label>
                        <Textarea
                          placeholder="Heavenly Father, I pray for JAHmere's freedom and transformation..."
                          value={prayerText}
                          onChange={(e) => setPrayerText(e.target.value)}
                          rows={4}
                          className="w-full resize-none"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-xl"
                        >
                          <Send className="w-6 h-6 mr-3" />
                          Send Prayer to Heaven
                        </Button>
                      </motion.div>
                    </form>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="prayer-confirmation"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Card className="p-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center shadow-2xl">
                    <motion.div
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-20 h-20 mx-auto mb-6" />
                    </motion.div>

                    <h3 className="text-3xl font-black mb-4">
                      Prayer Received!
                    </h3>

                    <p className="text-xl mb-6 opacity-90">
                      Your prayer has been added to the divine army fighting for
                      JAHmere's freedom. Thank you, Prayer Warrior!
                    </p>

                    <div className="flex items-center justify-center gap-4 text-green-100">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        <span>Prayer #{prayersOffered.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{activeWarriors.toLocaleString()} Warriors</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
