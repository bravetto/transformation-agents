"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Calendar,
  Shield,
  Heart,
  Zap,
  Users,
  Scale,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Crown,
  Star,
  Flame,
  TrendingUp,
  Target,
  Wifi,
  Activity,
  Signal,
} from "lucide-react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

export default function JAHmereGoFundMeDivine() {
  const [raised, setRaised] = useState(2847);
  const [donors, setDonors] = useState(47);
  const [daysLeft, setDaysLeft] = useState(13);
  const [showDivineRevelation, setShowDivineRevelation] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTraffic, setPrayerTraffic] = useState(3582);
  const [spiritualOverload, setSpiritualOverload] = useState(false);
  const [divineSignals, setDivineSignals] = useState(113);

  // Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Freedom countdown to July 28th, 2:37 PM
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate prayer traffic explosion
      setPrayerTraffic((prev) => prev + Math.floor(Math.random() * 25));
      if (Math.random() > 0.8) {
        setDivineSignals((prev) => prev + 1);
        setSpiritualOverload(true);
        setTimeout(() => setSpiritualOverload(false), 2000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate donation updates with divine synchronicity
  useEffect(() => {
    const interval = setInterval(() => {
      setRaised((prev) => prev + Math.floor(Math.random() * 77)); // 77 = Divine completion
      if (Math.random() > 0.6) {
        setDonors((prev) => prev + 1);
      }
    }, 7000); // Every 7 seconds (divine number)
    return () => clearInterval(interval);
  }, []);

  const goal = 6800;
  const percentComplete = (raised / goal) * 100;

  // Calculate countdown to July 28th, 2:37 PM EST
  const freedomDate = new Date("2024-07-28T14:37:00-05:00");
  const timeLeft = freedomDate.getTime() - currentTime.getTime();
  const daysRemaining = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesRemaining = Math.floor(
    (timeLeft % (1000 * 60 * 60)) / (1000 * 60),
  );
  const secondsRemaining = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Divine particles configuration
  const particlesOptions: ISourceOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 7 }, // Divine number
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ["#FFD700", "#FF69B4", "#00FFFF", "#9370DB"] },
      links: {
        color: "#FFD700",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 47, // Number of character witnesses
      },
      opacity: {
        value: 0.7,
        animation: { enable: true, speed: 1, minimumValue: 0.1 },
      },
      shape: { type: "star" },
      size: {
        value: { min: 1, max: 5 },
        animation: { enable: true, speed: 3, minimumValue: 0.1 },
      },
    },
    detectRetina: true,
  };

  // Enhanced divine number revelations with traffic overflow
  const divineNumbers = [
    {
      number: "$6,800",
      revelation: "68 = 'Saved' in Hebrew Gematria",
      meaning: "The exact amount needed for divine deliverance",
      scripture: "Psalm 68: 'Let God arise, let His enemies be scattered'",
      icon: Crown,
      color: "from-yellow-400 to-orange-500",
      trafficLevel: "DIVINE OVERFLOW",
    },
    {
      number: "$34,320",
      revelation: "JAHmere's Annual Salary",
      meaning: "343 = 7×7×7 (Perfect Divine Completion Cubed)",
      scripture: "20 = Redemption - Joseph was sold for 20 pieces of silver",
      icon: Star,
      color: "from-purple-400 to-pink-500",
      trafficLevel: "PRAYER SURGE",
    },
    {
      number: "May 11th",
      revelation: "5/11 Arrest Date",
      meaning: "5 = Grace, 11 = Disorder → Divine Order",
      scripture: "Grace transforms disorder into divine justice",
      icon: Shield,
      color: "from-blue-400 to-cyan-500",
      trafficLevel: "HEAVEN ACTIVATED",
    },
    {
      number: "July 28th",
      revelation: "2:37 PM Freedom Moment",
      meaning: "28 = Eternal Life, 237 = 'Behold the Lamb'",
      scripture: "The Lamb will overcome because He is Lord of lords",
      icon: Flame,
      color: "from-red-400 to-pink-500",
      trafficLevel: "MIRACLE INCOMING",
    },
    {
      number: "$4,700",
      revelation: "Attorney Retainer",
      meaning: "47 = 'Glory of God' - Same as character witnesses!",
      scripture: "The number of testimonies matches the legal fee!",
      icon: Scale,
      color: "from-green-400 to-emerald-500",
      trafficLevel: "DIVINE ALIGNMENT",
    },
    {
      number: "$1,000",
      revelation: "Court Fees",
      meaning: "1000 = Divine Completeness & Father's Glory",
      scripture: "Psalm 50:10 - 'Cattle on a thousand hills are Mine'",
      icon: Target,
      color: "from-indigo-400 to-purple-500",
      trafficLevel: "KINGDOM RESOURCES",
    },
    {
      number: "$800",
      revelation: "Expert Witness",
      meaning: "8 = New Beginning, 00 = Emphasis",
      scripture: "Double witness of new beginning",
      icon: Users,
      color: "from-teal-400 to-blue-500",
      trafficLevel: "TESTIMONY POWER",
    },
    {
      number: "$400",
      revelation: "DMV Hearing",
      meaning: "400 = Period of testing (Israel in Egypt 400 years)",
      scripture: "Testing period before freedom",
      icon: Clock,
      color: "from-orange-400 to-red-500",
      trafficLevel: "BREAKTHROUGH ZONE",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* Divine Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="divine-particles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>

      {/* Prayer Traffic Overload Indicator */}
      <AnimatePresence>
        {spiritualOverload && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-4 right-4 z-50 bg-red-500/90 backdrop-blur-sm rounded-xl p-4 border border-red-400"
          >
            <div className="flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="font-bold">PRAYER TRAFFIC OVERLOAD!</span>
            </div>
            <div className="text-sm text-red-200">
              {prayerTraffic.toLocaleString()} prayers flooding in!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-4">
        {/* Divine Header with Traffic Monitor */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-12 h-12 text-yellow-400" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              JAHmere Divine Defense Fund
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-12 h-12 text-orange-500" />
            </motion.div>
          </div>

          <p className="text-xl text-purple-300 mb-4">
            🔥 Divine Justice Manifestation Through Community Support 🔥
          </p>

          {/* Prayer Traffic Dashboard */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-purple-500/30 backdrop-blur-sm rounded-xl p-3 border border-purple-400/50">
              <Signal className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">
                {prayerTraffic.toLocaleString()}
              </div>
              <div className="text-xs text-purple-200">Prayer Traffic</div>
            </div>
            <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-3 border border-blue-400/50">
              <Wifi className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">
                {divineSignals}
              </div>
              <div className="text-xs text-blue-200">Divine Signals</div>
            </div>
            <div className="bg-red-500/30 backdrop-blur-sm rounded-xl p-3 border border-red-400/50">
              <Activity className="w-6 h-6 text-red-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">OVERLOAD</div>
              <div className="text-xs text-red-200">System Status</div>
            </div>
          </div>

          <a
            href="https://gofund.me/95f74381"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            <Heart className="w-6 h-6" />
            DONATE NOW - JOIN THE PRAYER ARMY
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Freedom Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/50">
            <h2 className="text-3xl font-bold text-center text-white mb-6 flex items-center justify-center gap-2">
              <Clock className="w-8 h-8 text-orange-400" />
              🔥 FREEDOM COUNTDOWN TO JULY 28TH AT 2:37 PM! 🔥
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-red-500/30 rounded-xl p-4">
                <div className="text-4xl font-bold text-white">
                  {daysRemaining}
                </div>
                <div className="text-red-200">Days</div>
              </div>
              <div className="bg-orange-500/30 rounded-xl p-4">
                <div className="text-4xl font-bold text-white">
                  {hoursRemaining}
                </div>
                <div className="text-orange-200">Hours</div>
              </div>
              <div className="bg-yellow-500/30 rounded-xl p-4">
                <div className="text-4xl font-bold text-white">
                  {minutesRemaining}
                </div>
                <div className="text-yellow-200">Minutes</div>
              </div>
              <div className="bg-green-500/30 rounded-xl p-4">
                <div className="text-4xl font-bold text-white">
                  {secondsRemaining}
                </div>
                <div className="text-green-200">Seconds</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Campaign Progress with Divine Metrics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-purple-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Divine Campaign Progress
              </h2>
              <div className="text-right">
                <div className="text-lg text-yellow-400 font-bold">
                  {daysLeft} days until July 28th
                </div>
                <div className="text-sm text-purple-300">
                  Prayer Army Growing!
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-white mb-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  ${raised.toLocaleString()}
                </span>
                <span className="text-lg opacity-80">
                  Divine Goal: ${goal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
                  transition={{ duration: 2 }}
                  className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center relative"
                >
                  <span className="text-sm font-bold text-white z-10">
                    {Math.round(percentComplete)}%
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-xl p-4 border border-purple-400/50"
              >
                <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  ${raised.toLocaleString()}
                </div>
                <div className="text-sm text-purple-200">Divine Donations</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-xl p-4 border border-blue-400/50"
              >
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{donors}</div>
                <div className="text-sm text-blue-200">Prayer Warriors</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-pink-500/40 to-red-500/40 rounded-xl p-4 border border-pink-400/50"
              >
                <Scale className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">$6,800</div>
                <div className="text-sm text-pink-200">Divine Goal</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-xl p-4 border border-green-400/50"
              >
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{daysLeft}</div>
                <div className="text-sm text-green-200">Days to Victory</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Divine Number Revelations with Traffic Levels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-10 h-10 text-yellow-400" />
              🔥 DIVINE NUMBER REVELATIONS - PRAYER TRAFFIC EXPLOSION! 🔥
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </h2>
            <p className="text-purple-300 text-lg">
              Every number in JAHmere's case is prophesying freedom and causing
              spiritual overload!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {divineNumbers.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl relative overflow-hidden`}
                >
                  {/* Traffic Level Indicator */}
                  <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    {item.trafficLevel}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {item.number}
                      </h3>
                      <p className="text-white/90 font-semibold mb-2">
                        {item.revelation}
                      </p>
                      <p className="text-white/80 text-sm mb-2">
                        {item.meaning}
                      </p>
                      <p className="text-white/70 text-xs italic">
                        "{item.scripture}"
                      </p>
                    </div>
                  </div>

                  {/* Divine Energy Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* What's At Stake - Divine Battle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/50">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-2 justify-center">
              <Shield className="w-8 h-8 text-red-400" />
              🔥 THE DIVINE BATTLE STAKES 🔥
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-500/30 rounded-xl p-6">
                <h4 className="font-bold text-red-300 mb-4 text-xl">
                  ⚔️ Without Divine Intervention:
                </h4>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">❌</span>
                    <span>
                      Loss of utility job ($34,320/year) - Satan's economic
                      attack
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">❌</span>
                    <span>
                      Destroyed professional reputation - Character
                      assassination
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">❌</span>
                    <span>
                      Unable to mentor youth - Cutting off his ministry
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">❌</span>
                    <span>Financial devastation - Crushing the family</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-300 mb-4 text-xl">
                  ⚔️ With Your Divine Support:
                </h4>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>
                      Quality legal representation - David's slingshot
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>
                      Thorough case investigation - God's truth revealed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>47 Character witnesses - Army of testimonies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span>Fair chance at justice - Divine vindication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* JAHmere's Sacred Character */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-3xl p-8 border border-green-500/30">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-2 justify-center">
              <Heart className="w-8 h-8 text-green-400" />✨ JAHmere: God's
              Chosen Servant ✨
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              <div className="bg-green-500/20 rounded-xl p-6">
                <h4 className="font-bold text-green-300 mb-4 text-xl">
                  🙏 Divine Community Servant:
                </h4>
                <ul className="space-y-2">
                  <li>
                    • Dedicated utility worker serving faithfully for years
                  </li>
                  <li>• First responder in emergencies - always ready</li>
                  <li>• Youth mentor changing lives - his true calling</li>
                  <li>• Raised by single mother with love and faith</li>
                  <li>• Never been in trouble - clean record</li>
                </ul>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-6">
                <h4 className="font-bold text-blue-300 mb-4 text-xl">
                  ⚡ His Divine Impact:
                </h4>
                <ul className="space-y-2">
                  <li>• Keeps infrastructure running safely for thousands</li>
                  <li>• Guides at-risk youth to positive futures</li>
                  <li>• Always ready to help neighbors in need</li>
                  <li>• Trusted by coworkers & supervisors</li>
                  <li>• Living example of character and integrity</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
              <p className="text-yellow-300 italic text-center text-lg leading-relaxed">
                💫 "I believe in our justice system, but I also know that
                without proper representation, innocent people can face
                devastating consequences. I'm not asking for special
                treatment—just fair representation and the chance to prove the
                truth. God knows my heart." 💫
                <br />
                <span className="text-yellow-400 font-bold">
                  - JAHmere Webb
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divine Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 shadow-2xl border border-purple-400/50 relative overflow-hidden">
            {/* Divine Energy Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

            <h3 className="text-4xl font-bold text-white mb-4 relative z-10">
              🔥 JOIN THE PRAYER ARMY FOR JAHMERE! 🔥
            </h3>
            <p className="text-xl text-purple-100 mb-6 relative z-10">
              Every donation is a prayer! Every share is a miracle! Every moment
              counts!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-white">$25</div>
                <div className="text-sm text-purple-200">Court fees prayer</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-white">$50</div>
                <div className="text-sm text-purple-200">
                  Expert witness power
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-white">$100</div>
                <div className="text-sm text-purple-200">Attorney blessing</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 rounded-xl p-4"
              >
                <div className="text-2xl font-bold text-white">$250</div>
                <div className="text-sm text-purple-200">DMV victory</div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <motion.a
                href="https://gofund.me/95f74381"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold text-xl transition-all transform shadow-2xl"
              >
                <Heart className="w-7 h-7" />
                DONATE NOW - ACTIVATE MIRACLE
                <ExternalLink className="w-6 h-6" />
              </motion.a>
              <motion.button
                onClick={() =>
                  navigator.share?.({
                    title: "Support JAHmere's Divine Defense",
                    text: "Join the prayer army for JAHmere's freedom!",
                    url: "https://gofund.me/95f74381",
                  })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full font-bold text-xl transition-all shadow-2xl"
              >
                <Shield className="w-7 h-7" />
                SHARE THE MIRACLE
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
          >
            <p className="text-purple-300 text-sm leading-relaxed">
              ⚡{" "}
              <strong>
                Campaign organized by Michael Mataluni, Founder of Bravetto
              </strong>{" "}
              ⚡
              <br />
              🙏 All funds go directly to JAHmere's legal defense costs 🙏
              <br />
              ✨ Every donation is tracked and accounted for with divine
              transparency ✨
              <br />
              🔥{" "}
              <strong>
                THE PRAYER TRAFFIC IS OVERLOADING - HEAVEN IS RESPONDING!
              </strong>{" "}
              🔥
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
