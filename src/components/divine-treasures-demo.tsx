"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  EasterEgg,
  SynchronicityEgg,
  useEasterEggs,
} from "@/components/divine-easter-eggs";
import {
  Search,
  MapPin,
  Trophy,
  Clock,
  Mouse,
  Keyboard,
  Eye,
  Star,
  Crown,
} from "lucide-react";

/**
 * 🥚 DIVINE TREASURES DEMO
 *
 * This component provides a comprehensive showcase of all the hidden
 * "God is Risen" easter eggs throughout the Bridge Project.
 *
 * Features:
 * - Interactive treasure map
 * - Discovery progress tracking
 * - Live testing of easter eggs
 * - Biblical references and rewards
 */

interface TreasureMapItem {
  id: string;
  name: string;
  location: string;
  difficulty: "easy" | "medium" | "hard" | "divine";
  trigger: string;
  hint: string;
  biblicalRef: string;
  icon: React.ReactNode;
}

const TREASURE_MAP: TreasureMapItem[] = [
  {
    id: "risen-logo-hover",
    name: "Divine Logo Blessing",
    location: "Navigation Header",
    difficulty: "easy",
    trigger: "Hover over the Bridge Project logo",
    hint: "The light shines brightest at the beginning of the journey",
    biblicalRef: "Matthew 28:6",
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "footer-cross-click",
    name: "Victory Cross",
    location: "Footer",
    difficulty: "easy",
    trigger: "Click the cross symbol",
    hint: "Look for the symbol of ultimate victory at the foundation",
    biblicalRef: "1 Corinthians 15:57",
    icon: <Mouse className="w-4 h-4" />,
  },
  {
    id: "hero-title-sequence",
    name: "Dawn of Hope",
    location: "Hero Section",
    difficulty: "easy",
    trigger: "Scroll through the hero section",
    hint: "New mercies appear with each new dawn",
    biblicalRef: "Lamentations 3:22-23",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    id: "jahmere-photo-triple-click",
    name: "Chains Broken",
    location: "JAHmere's Profile",
    difficulty: "medium",
    trigger: "Triple-click JAHmere's photo",
    hint: "The captive shall be set free through persistent faith",
    biblicalRef: "Isaiah 61:1",
    icon: <Mouse className="w-4 h-4" />,
  },
  {
    id: "july-28-countdown-hover",
    name: "Divine Timing",
    location: "Countdown Timer",
    difficulty: "medium",
    trigger: "Hover over the countdown",
    hint: "There is a time for everything under heaven",
    biblicalRef: "Ecclesiastes 3:1",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: "bridge-metaphor-scroll",
    name: "Bridge to Freedom",
    location: "Bridge Section",
    difficulty: "medium",
    trigger: "Scroll through bridge content",
    hint: "The way, the truth, and the life revealed in the crossing",
    biblicalRef: "John 14:6",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: "konami-code-resurrection",
    name: "Ultimate Victory Code",
    location: "Anywhere on site",
    difficulty: "hard",
    trigger: "↑↑↓↓←→←→BA",
    hint: "Ancient gaming wisdom unlocks divine victory",
    biblicalRef: "Romans 8:37",
    icon: <Keyboard className="w-4 h-4" />,
  },
  {
    id: "trinity-click-pattern",
    name: "Trinity Power",
    location: "Trinity Elements",
    difficulty: "hard",
    trigger: "Click trinity symbols in sequence",
    hint: "Three-in-one pattern reveals divine unity",
    biblicalRef: "Matthew 28:19",
    icon: <Mouse className="w-4 h-4" />,
  },
  {
    id: "hidden-scripture-cipher",
    name: "Hidden Word",
    location: "Analytics Dashboard",
    difficulty: "hard",
    trigger: "Time-based revelation",
    hint: "The Word is hidden in plain sight, sharper than any sword",
    biblicalRef: "Hebrews 4:12",
    icon: <Search className="w-4 h-4" />,
  },
  {
    id: "resurrection-timestamp",
    name: "Perfect Hour",
    location: "System Clock",
    difficulty: "divine",
    trigger: "Visit at 6:00 AM or 3:00 PM",
    hint: "Very early on the first day, at the appointed hour",
    biblicalRef: "Mark 16:2",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: "prayer-activation-sequence",
    name: "Prayers Answered",
    location: "Prayer Elements",
    difficulty: "divine",
    trigger: "Complete prayer interaction",
    hint: "Call upon Me and I will answer you",
    biblicalRef: "Jeremiah 33:3",
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "july-28-synchronicity",
    name: "Active Worker Victory",
    location: "Console Errors / Service Worker",
    difficulty: "divine",
    trigger: "Click on divine synchronicity indicators",
    hint: "Only the active worker can claim clients - InvalidStateError becomes divine declaration",
    biblicalRef: "Romans 8:28",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: "divine-synchronicity-complete",
    name: "All Things Work Together",
    location: "Synchronicity Analyzer",
    difficulty: "divine",
    trigger: "Complete synchronicity analysis",
    hint: "All things work together for good to those who love God",
    biblicalRef: "Romans 8:28",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: "divine-host-restoration",
    name: "Divine Host Restoration",
    location: "Console Errors",
    difficulty: "divine",
    trigger:
      "Console error monitoring detects EADDRINUSE or localhost patterns",
    hint: "When EADDRINUSE reveals divine prophecy...",
    biblicalRef: "Matthew 19:26",
    icon: <Mouse className="w-4 h-4" />,
  },
  {
    id: "christ-victory-33",
    name: "Christ's Victory Pattern - 33 Errors",
    location: "Console Error Count",
    difficulty: "divine",
    trigger: "Exactly 33 console errors detected - Christ's victory age",
    hint: "When the error count reaches the age of ultimate victory...",
    biblicalRef: "Luke 3:23",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: "index-1-cornerstone",
    name: "INDEX 1 - The Cornerstone",
    location: "Webpack Error",
    difficulty: "divine",
    trigger: "Undefined call error",
    hint: "Triggered by webpack \"Cannot read properties of undefined (reading 'call')\" errors",
    biblicalRef: "Psalm 118:22",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: "divine-host-transfer",
    name: "Divine Host Transfer",
    location: "LocalHost:1437",
    difficulty: "divine",
    trigger: "6 warnings at localhost:1437",
    hint: "Watch for exactly 6 warnings related to localhost:1437 - Heaven's final notice!",
    biblicalRef: "Psalm 23:6",
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: "divine-host-restoration-blueprint",
    name: "Divine Host Restoration Blueprint",
    location: "Complete System",
    difficulty: "divine",
    trigger: "Complete console statistics pattern",
    hint: "The ultimate revelation - complete numerical prophecy restoring God's glory!",
    biblicalRef: "Luke 23:35",
    icon: <Crown className="w-4 h-4" />,
  },
];

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-orange-100 text-orange-800 border-orange-200",
  divine: "bg-purple-100 text-purple-800 border-purple-200",
};

const difficultyIcons = {
  easy: "🌱",
  medium: "⭐",
  hard: "🔥",
  divine: "👑",
};

export function DivineTreasuresDemo() {
  const { eggs, foundEggs, totalEggs, discoveryProgress, resetProgress } =
    useEasterEggs();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [showHints, setShowHints] = useState(false);

  const filteredTreasures = TREASURE_MAP.filter(
    (treasure) =>
      selectedDifficulty === "all" ||
      treasure.difficulty === selectedDifficulty,
  );

  const difficultyStats = {
    easy: TREASURE_MAP.filter((t) => t.difficulty === "easy").length,
    medium: TREASURE_MAP.filter((t) => t.difficulty === "medium").length,
    hard: TREASURE_MAP.filter((t) => t.difficulty === "hard").length,
    divine: TREASURE_MAP.filter((t) => t.difficulty === "divine").length,
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            🥚 Divine Treasures Map 🥚
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Hidden "God is Risen" Easter Eggs Throughout The Bridge Project
          </p>
          <p className="text-gray-600 italic">
            "Every egg is a found opportunity. A divine remembrance."
          </p>
        </motion.div>

        {/* Progress Overview */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-yellow-900">
                Discovery Progress
              </h2>
              <p className="text-yellow-700">
                {foundEggs.length} of {totalEggs} Divine Treasures Found
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-800">
                {Math.round(discoveryProgress)}%
              </div>
              <Button
                onClick={resetProgress}
                variant="outline"
                size="sm"
                className="mt-2 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
              >
                Reset Progress
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-yellow-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${discoveryProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
            />
          </div>

          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(difficultyStats).map(([difficulty, count]) => {
              const found = foundEggs.filter((id) => {
                const treasure = TREASURE_MAP.find((t) => t.id === id);
                return treasure?.difficulty === difficulty;
              }).length;

              return (
                <div key={difficulty} className="text-center">
                  <div className="text-2xl mb-1">
                    {
                      difficultyIcons[
                        difficulty as keyof typeof difficultyIcons
                      ]
                    }
                  </div>
                  <div className="text-sm font-semibold capitalize text-gray-700">
                    {difficulty}
                  </div>
                  <div className="text-xs text-gray-600">
                    {found} / {count}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => setSelectedDifficulty("all")}
            variant={selectedDifficulty === "all" ? "default" : "outline"}
            className="flex items-center space-x-2"
          >
            <span>All Treasures</span>
            <Badge variant="secondary">{TREASURE_MAP.length}</Badge>
          </Button>

          {Object.entries(difficultyStats).map(([difficulty, count]) => (
            <Button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              variant={
                selectedDifficulty === difficulty ? "default" : "outline"
              }
              className="flex items-center space-x-2 capitalize"
            >
              <span>
                {difficultyIcons[difficulty as keyof typeof difficultyIcons]}
              </span>
              <span>{difficulty}</span>
              <Badge variant="secondary">{count}</Badge>
            </Button>
          ))}
        </div>

        {/* Hint Toggle */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowHints(!showHints)}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            {showHints ? "Hide Hints" : "Show Hints"} 🔍
          </Button>
        </div>
      </div>

      {/* Treasure Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTreasures.map((treasure, index) => {
              const isFound = foundEggs.includes(treasure.id);

              return (
                <motion.div
                  key={treasure.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <EasterEgg eggId={treasure.id}>
                    <Card
                      className={`p-6 h-full transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        isFound
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-white hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {treasure.icon}
                          <h3 className="font-bold text-lg">{treasure.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={difficultyColors[treasure.difficulty]}
                          >
                            {difficultyIcons[treasure.difficulty]}{" "}
                            {treasure.difficulty}
                          </Badge>
                          {isFound && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              ✅ Found
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-600 mb-1">
                            Location:
                          </div>
                          <div className="text-gray-800">
                            {treasure.location}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-gray-600 mb-1">
                            How to Discover:
                          </div>
                          <div className="text-gray-800 font-mono text-sm bg-gray-100 p-2 rounded">
                            {treasure.trigger}
                          </div>
                        </div>

                        {showHints && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <div className="text-sm font-semibold text-blue-600 mb-1">
                              Divine Hint:
                            </div>
                            <div className="text-blue-800 italic text-sm">
                              {treasure.hint}
                            </div>
                          </motion.div>
                        )}

                        <div>
                          <div className="text-sm font-semibold text-purple-600 mb-1">
                            Biblical Reference:
                          </div>
                          <div className="text-purple-800 italic text-sm">
                            {treasure.biblicalRef}
                          </div>
                        </div>

                        {treasure.id === "divine-host-restoration" && (
                          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                            <h4 className="font-bold text-red-400 mb-2">
                              🔥 Divine Console Revelation
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              This easter egg reveals the spiritual meaning
                              behind technical errors. It activates when console
                              errors contain divine patterns.
                            </p>
                            <div className="space-y-2 text-xs">
                              <p>
                                <strong className="text-red-600">
                                  EADDRINUSE:
                                </strong>{" "}
                                Divine Host Transfer Initiated
                              </p>
                              <p>
                                <strong className="text-orange-600">
                                  MODULE_NOT_FOUND:
                                </strong>{" "}
                                Divine components being prepared
                              </p>
                              <p>
                                <strong className="text-yellow-600">
                                  localhost:
                                </strong>{" "}
                                Earthly host limitation revealed
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-black/10 rounded text-xs">
                              <p className="text-blue-700">
                                <strong>Prophecy:</strong> The console numbers
                                (1,081 messages, 578 user, 126 errors, 744 info)
                                reveal God's plan to transfer from localhost to
                                LORDHOST on July 28th for JAHmere's freedom.
                              </p>
                            </div>
                            <p className="text-xs text-amber-600 mt-2">
                              💡 <strong>Tip:</strong> Use the console trigger
                              buttons (bottom-right) to simulate divine
                              patterns!
                            </p>
                          </div>
                        )}

                        {treasure.id === "christ-victory-33" && (
                          <div className="mt-4 p-4 bg-gold-900/20 border border-gold-500/30 rounded-lg">
                            <h4 className="font-bold text-gold-400 mb-2">
                              ✝️ Christ's Victory Pattern Revelation
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              This divine easter egg activates when the console
                              reaches exactly 33 errors - matching Christ's age
                              at resurrection. Each error becomes a victory
                              declaration!
                            </p>
                            <div className="space-y-2 text-xs">
                              <p>
                                <strong className="text-gold-600">
                                  33 Errors:
                                </strong>{" "}
                                Christ's victory age (Luke 3:23)
                              </p>
                              <p>
                                <strong className="text-red-600">
                                  404 NOT FOUND:
                                </strong>{" "}
                                Guilt NOT FOUND in JAHmere!
                              </p>
                              <p>
                                <strong className="text-blue-600">
                                  500 Server Error:
                                </strong>{" "}
                                God working internally for good
                              </p>
                              <p>
                                <strong className="text-green-600">
                                  GET failures:
                                </strong>{" "}
                                Prosecution cannot GET conviction
                              </p>
                            </div>
                            <div className="mt-2 p-2 bg-gold-100/50 rounded text-xs">
                              <p className="text-gold-800">
                                <strong>Courtroom Declaration:</strong> "Your
                                Honor, these 33 errors are not system failures -
                                they are 33 declarations of victory! The 404
                                errors say 'NOT FOUND' - and neither will guilt
                                be found in JAHmere!"
                              </p>
                            </div>
                            <p className="text-xs text-gold-600 mt-2">
                              🎯 <strong>Trigger:</strong> This easter egg
                              activates automatically when the console reaches
                              exactly 33 errors!
                            </p>
                          </div>
                        )}

                        {treasure.id === "index-1-cornerstone" && (
                          <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                            <h4 className="font-bold text-purple-400 mb-2">
                              🔥 INDEX 1 - The Ultimate Cornerstone Revelation
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              The most powerful easter egg! Triggered by
                              webpack's "Cannot read properties of undefined
                              (reading 'call')" - revealing JAHmere as INDEX 1,
                              the cornerstone that unlocks the entire Bridge
                              Project!
                            </p>
                            <div className="space-y-2 text-xs">
                              <p>
                                <strong className="text-purple-600">
                                  INDEX 1:
                                </strong>{" "}
                                JAHmere is #1 priority in God's justice system
                              </p>
                              <p>
                                <strong className="text-red-600">
                                  UNDEFINED:
                                </strong>{" "}
                                The charges are undefined (invalid)
                              </p>
                              <p>
                                <strong className="text-blue-600">
                                  READING 'CALL':
                                </strong>{" "}
                                God reading JAHmere's divine calling
                              </p>
                              <p>
                                <strong className="text-green-600">
                                  WEBPACK RUNTIME:
                                </strong>{" "}
                                God's runtime system activating
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-black/10 rounded text-xs">
                              <p className="text-purple-700">
                                <strong>The Cornerstone Truth:</strong> "The
                                stone the builders rejected has become the
                                cornerstone" (Psalm 118:22). JAHmere is the
                                INDEX 1 cornerstone - fix this ONE thing (set
                                him free) and the entire Bridge Project system
                                initializes!
                              </p>
                            </div>
                            <div className="mt-2 p-2 bg-purple-100/50 rounded text-xs">
                              <p className="text-purple-800">
                                <strong>Courtroom Declaration:</strong> "Your
                                Honor, the webpack runtime declares the charges
                                are UNDEFINED! The system cannot read properties
                                of undefined because JAHmere's freedom is
                                DIVINELY DEFINED! INDEX 1 must be resolved - he
                                must be FREE so the entire system can serve
                                those who need it most!"
                              </p>
                            </div>
                            <p className="text-xs text-purple-600 mt-2">
                              💡 <strong>Tip:</strong> Use the purple INDEX 1
                              Error button (bottom-right) to trigger this
                              ultimate revelation!
                            </p>
                          </div>
                        )}

                        {treasure.id === "divine-host-transfer" && (
                          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <h4 className="font-bold text-blue-400 mb-2">
                              🏠 DIVINE HOST TRANSFER - From LocalHost to
                              LORD-HOST! 🏠
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              This easter egg reveals the divine prophecy of a
                              host transfer from LocalHost to LORD-HOST. Watch
                              for exactly 6 warnings related to localhost:1437 -
                              Heaven's final notice!
                            </p>
                            <div className="space-y-2 text-xs">
                              <p>
                                <strong className="text-blue-600">
                                  localhost:1437:
                                </strong>{" "}
                                Divine host transfer initiated
                              </p>
                              <p>
                                <strong className="text-purple-600">
                                  LORD-HOST:
                                </strong>{" "}
                                Heaven's final notice of transfer
                              </p>
                            </div>
                            <div className="mt-2 p-2 bg-blue-100/50 rounded text-xs">
                              <p className="text-blue-800">
                                <strong>Prophecy:</strong> "The heavens declare
                                the glory of God, and the firmament shows His
                                handiwork. Day unto day utters speech, and night
                                unto night reveals knowledge." (Psalm 19:1-4)
                              </p>
                            </div>
                            <p className="text-xs text-blue-600 mt-2">
                              💡 <strong>Tip:</strong> Monitor the console for
                              the exact 6 warnings!
                            </p>
                          </div>
                        )}

                        {treasure.id ===
                          "divine-host-restoration-blueprint" && (
                          <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                            <h4 className="font-bold text-purple-400 mb-2">
                              👑 DIVINE HOST RESTORATION BLUEPRINT - The
                              Ultimate Revelation! 👑
                            </h4>
                            <p className="text-sm text-gray-700 mb-3">
                              This easter egg reveals the complete numerical
                              prophecy that restores God's glory to The Bridge
                              Project. It activates when the console displays
                              the divine statistical pattern.
                            </p>
                            <div className="space-y-2 text-xs">
                              <p>
                                <strong className="text-purple-600">
                                  Console Pattern:
                                </strong>{" "}
                                1,081 messages + 578 user + 126 errors + 6
                                warnings + 744 info + 205 verbose = 2,740
                              </p>
                              <p>
                                <strong className="text-gold-600">
                                  2,740 = 27:40:
                                </strong>{" "}
                                "He saved others; let him save himself if he is
                                the Christ of God"
                              </p>
                              <p>
                                <strong className="text-green-600">
                                  Hidden Numbers:
                                </strong>{" "}
                                1,025 = 10:25 "Jesus said, I am the resurrection
                                and the life"
                              </p>
                            </div>
                            <div className="mt-3 p-2 bg-purple-100/50 rounded text-xs">
                              <p className="text-purple-800">
                                <strong>The Ultimate Declaration:</strong> "But
                                JAHmere doesn't need to save himself - THE LORD
                                OF HOSTS HAS ALREADY SAVED HIM! From localhost
                                to LORDHOST, from errors to glory, from warnings
                                to worship - THIS SITE IS RESTORED TO GOD'S
                                GLORY!"
                              </p>
                            </div>
                            <p className="text-xs text-purple-600 mt-2">
                              💡 <strong>Tip:</strong> Use the "👑 Complete
                              Blueprint" button to trigger the full revelation!
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </EasterEgg>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions */}
      <Card className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          🎯 How to Hunt for Divine Treasures
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">🥚 Easy Treasures (Green)</h4>
            <p>
              Simple interactions like hovering or clicking visible elements.
              Perfect for first-time treasure hunters!
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">⭐ Medium Treasures (Yellow)</h4>
            <p>
              Require specific actions or scrolling patterns. Look for
              interactive elements throughout the site.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🔥 Hard Treasures (Orange)</h4>
            <p>
              Complex sequences or hidden patterns. May require keyboard
              combinations or multiple steps.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">👑 Divine Treasures (Purple)</h4>
            <p>
              Miraculous discoveries that appear at specific times or require
              divine synchronicity!
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
          <p className="text-yellow-800 text-center font-semibold">
            🌟 Complete the treasure hunt to unlock the ultimate "GOD IS RISEN"
            celebration! 🌟
          </p>
        </div>
      </Card>

      {/* Special July 28th Synchronicity Demo */}
      <Card className="max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-r from-yellow-900 via-yellow-800 to-orange-900 border-yellow-400">
        <h3 className="text-xl font-bold text-yellow-100 mb-4 flex items-center">
          🔥 DIVINE SYNCHRONICITY DEMO - July 28th Prophecy
        </h3>
        <p className="text-yellow-200 mb-4">
          Experience the miraculous revelation: "Only the Active Worker Can
          Claim Clients"
        </p>

        <div className="bg-black/30 p-4 rounded-lg border border-yellow-400/50">
          <SynchronicityEgg trigger="console">
            <div className="text-center p-6 bg-gradient-to-r from-red-900/50 to-yellow-900/50 rounded-lg border border-yellow-400/50 cursor-pointer hover:border-yellow-300 transition-colors">
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="text-yellow-100 font-bold mb-2">
                Console Error Revelation
              </h4>
              <code className="text-red-200 bg-red-900/50 px-3 py-1 rounded text-sm">
                InvalidStateError: Only the active worker can claim clients.
              </code>
              <p className="text-yellow-300 text-sm mt-2">
                Click to reveal the divine prophecy hidden in this error
                message!
              </p>
            </div>
          </SynchronicityEgg>
        </div>

        <div className="mt-4 text-center text-yellow-200 text-sm">
          This special easter egg reveals how technology speaks prophecy for
          JAHmere's July 28th victory!
        </div>
      </Card>
    </div>
  );
}

export default DivineTreasuresDemo;
