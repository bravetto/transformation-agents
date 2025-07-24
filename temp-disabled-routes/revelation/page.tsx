"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Crown,
  Zap,
  Calendar,
  Clock,
  Server,
  AlertTriangle,
  CheckCircle,
  Flame,
  Heart,
  Shield,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Synchronicity {
  id: string;
  title: string;
  technical: string;
  spiritual: string;
  biblical: string;
  significance: string;
  category: "errors" | "timing" | "numbers" | "patterns";
}

export default function RevelationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  const synchronicities: Synchronicity[] = [
    {
      id: "33-errors",
      title: "33 Console Errors - Christ's Victory Age",
      technical: "Exactly 33 console errors appearing in development",
      spiritual:
        "Jesus conquered death at age 33 - JAHmere conquers charges with 33 error messages",
      biblical: "Luke 3:23 - Jesus was about 33 when He began His ministry",
      significance:
        "Each 404 'Not Found' = Guilt NOT FOUND! Each error = One chain breaking",
      category: "errors",
    },
    {
      id: "line-386",
      title: "Line 386 Intercession Loop - 76 Divine Prayers",
      technical: "76 repeated errors at line 386 in divine-impact-dashboard",
      spiritual:
        "76 continuous prayers ascending for JAHmere from heaven's prayer warriors",
      biblical:
        "Psalm 76 - 'In Judah God is known; his name is great in Israel'",
      significance:
        "Line 386 = 3 (Trinity) + 8 (New Beginning) + 6 (Man/JAHmere)",
      category: "numbers",
    },
    {
      id: "localhost-1437",
      title: "localhost:1437 → LORDHOST:GLORY",
      technical: "Development server running on port 1437",
      spiritual: "Local cannot host him - only the LORD can host His glory",
      biblical: "Romans 14:37 energy - 'In all things MORE than conquerors'",
      significance:
        "1437 = 14 (double completion) + 37 (Psalm 37: Commit your way to the LORD)",
      category: "timing",
    },
    {
      id: "service-worker",
      title: "Service Worker Errors - Heaven's Servant",
      technical: "InvalidStateError: Only the active worker can claim clients",
      spiritual:
        "JAHmere is the ACTIVE WORKER who CAN CLAIM the souls he'll serve",
      biblical:
        "Matthew 20:28 - 'The Son of Man came not to be served but to serve'",
      significance: "Invalid State Error = The state's case is INVALID",
      category: "errors",
    },
    {
      id: "july-28-237",
      title: "July 28th at 2:37 PM - Divine Appointment",
      technical:
        "Prophetic timing revealed through error patterns and synchronicities",
      spiritual: "Heaven's appointed time for justice to manifest",
      biblical: "Ecclesiastes 3:1 - 'To everything there is a season'",
      significance:
        "2:37 = Psalm 23:7 energy - 'I will dwell in the house of the LORD forever'",
      category: "timing",
    },
    {
      id: "console-stats",
      title: "Console Statistics Prophecy",
      technical: "1,081 messages, 578 user, 126 errors, 744 info",
      spiritual: "Divine numerical pattern revealing God's restoration plan",
      biblical: "1081 = 'I will restore what was stolen' (Joel 2:25)",
      significance: "578 = Grace (5) completing (7) new beginning (8)",
      category: "numbers",
    },
    {
      id: "module-not-found",
      title: "Module Not Found - Divine Components Prepared",
      technical: "Cannot find module './4447.js' and './8548.js'",
      spiritual: "Divine components being prepared in heaven's repository",
      biblical: "John 14:2 - 'I go to prepare a place for you'",
      significance: "Missing modules = God preparing what earth cannot provide",
      category: "errors",
    },
    {
      id: "webpack-chunks",
      title: "Webpack Chunk Failures - Infrastructure Rebuild",
      technical: "Webpack runtime errors and chunk loading failures",
      spiritual: "Old infrastructure collapsing, divine rebuild required",
      biblical: "Isaiah 43:19 - 'Behold, I am doing a new thing'",
      significance:
        "System failure = Corrupt system being replaced by Kingdom system",
      category: "patterns",
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All Revelations",
      icon: Eye,
      count: synchronicities.length,
    },
    {
      id: "errors",
      name: "Console Errors",
      icon: AlertTriangle,
      count: synchronicities.filter((s) => s.category === "errors").length,
    },
    {
      id: "timing",
      name: "Divine Timing",
      icon: Clock,
      count: synchronicities.filter((s) => s.category === "timing").length,
    },
    {
      id: "numbers",
      name: "Sacred Numbers",
      icon: Crown,
      count: synchronicities.filter((s) => s.category === "numbers").length,
    },
    {
      id: "patterns",
      name: "Patterns",
      icon: Zap,
      count: synchronicities.filter((s) => s.category === "patterns").length,
    },
  ];

  const filteredSynchronicities =
    selectedCategory === "all"
      ? synchronicities
      : synchronicities.filter((s) => s.category === selectedCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Divine Revelation...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Flame className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gold-400 via-white to-purple-400 bg-clip-text text-transparent">
              THE REVELATION
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              When Heaven Speaks Through Technology: The Divine Synchronicities
              Revealing JAHmere's July 28th Freedom
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gold-400/30"
          >
            <h2 className="text-2xl font-bold text-gold-400 mb-4">
              The Divine Pattern
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every console error, every technical failure, every unexpected bug
              has been a prophetic message from heaven. God has been speaking
              through our code, revealing His perfect timing and plan for
              JAHmere's freedom on July 28th at 2:37 PM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gold-600 border-gold-400 text-black"
                    : "bg-black/30 border-gold-400/30 text-white hover:border-gold-400/60"
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-semibold">{category.name}</span>
                <span className="bg-black/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Synchronicities Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {filteredSynchronicities.map((sync, index) => (
                <motion.div
                  key={sync.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30 hover:border-gold-400/60 transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-purple-400 rounded-full flex items-center justify-center">
                          {sync.category === "errors" && (
                            <AlertTriangle className="w-6 h-6 text-white" />
                          )}
                          {sync.category === "timing" && (
                            <Clock className="w-6 h-6 text-white" />
                          )}
                          {sync.category === "numbers" && (
                            <Crown className="w-6 h-6 text-white" />
                          )}
                          {sync.category === "patterns" && (
                            <Zap className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gold-400 leading-tight">
                            {sync.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Technical Reality
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {sync.technical}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Spiritual Meaning
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {sync.spiritual}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Biblical Foundation
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {sync.biblical}
                        </p>
                      </div>

                      <div className="border-t border-gold-400/20 pt-4">
                        <h4 className="text-sm font-semibold text-gold-400 mb-2">
                          Divine Significance
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-medium">
                          {sync.significance}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* The Master Plan Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-12 text-gold-400"
          >
            The Master Plan Revealed
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-gold-400/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold-400 mb-4">
                  Phase 1: Divine Disruption
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  God began speaking through technical errors, each one a
                  prophetic declaration. Every bug was a divine message, every
                  crash a heavenly announcement that something greater was
                  coming.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Console errors = Prayer messages ascending</li>
                  <li>
                    • Service worker failures = Heaven's servant preparing
                  </li>
                  <li>• Port conflicts = Spiritual warfare intensifying</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-gold-400/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold-400 mb-4">
                  Phase 2: Numerical Revelation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sacred numbers began appearing everywhere - 33 errors
                  (Christ's victory age), 1437 (more than conquerors), 386
                  (Trinity + New Beginning + Man). God was encoding His promises
                  in our development environment.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• 33 = Jesus' age at resurrection</li>
                  <li>• 1437 = Romans 14:37 energy</li>
                  <li>• 386 = 3+8+6 = Trinity + New Beginning + JAHmere</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-gold-400/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold-400 mb-4">
                  Phase 3: Timing Confirmation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  July 28th at 2:37 PM emerged as the divine appointment. Not
                  chosen by man, but revealed through supernatural
                  synchronicities. Heaven's calendar intersecting with earth's
                  courtroom.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• 2:37 PM = Psalm 23:7 energy</li>
                  <li>• July 28th = 7 (completion) + 28 (new beginning)</li>
                  <li>• Perfect timing for maximum impact</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-gold-900/50 to-purple-900/50 border-gold-400/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold-400 mb-4">
                  Phase 4: Global Activation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The revelation spreads worldwide. Prayer warriors unite. The
                  Bridge Project becomes a rallying point for divine justice.
                  Technology and spirituality converge for heaven's invasion of
                  earth.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Portal launches July 21st (7 days before)</li>
                  <li>• Prayer momentum builds globally</li>
                  <li>• July 28th: Freedom manifests</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Technical Prophecy Examples */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-12 text-gold-400"
          >
            Technical Prophecy in Action
          </motion.h2>

          <Tabs defaultValue="console" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/30 border border-gold-400/30">
              <TabsTrigger
                value="console"
                className="data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                Console Messages
              </TabsTrigger>
              <TabsTrigger
                value="errors"
                className="data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                Error Patterns
              </TabsTrigger>
              <TabsTrigger
                value="timing"
                className="data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                Divine Timing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="console" className="mt-8">
              <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-red-400 mb-4">
                        Raw Console Output
                      </h3>
                      <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-400">
                        <div>📊 Analytics Event Received</div>
                        <div>⚠ Fast Refresh had to perform full reload</div>
                        <div>⨯ Error: Cannot find module './4447.js'</div>
                        <div>
                          ⨯ InvalidStateError: Only active worker can claim
                        </div>
                        <div className="text-gold-400">
                          ✓ Compiled in 2.9s (4567 modules)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-4">
                        Divine Translation
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <div>📊 = Heaven receiving prayer analytics</div>
                        <div>⚠ = God performing full spiritual reload</div>
                        <div>⨯ = Divine components being prepared</div>
                        <div>
                          ⨯ = JAHmere is the active worker who can claim souls
                        </div>
                        <div className="text-gold-400">
                          ✓ = Victory compiled in God's perfect timing
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="mt-8">
              <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400 mb-2">
                          33
                        </div>
                        <div className="text-sm text-gray-300">
                          Console Errors
                        </div>
                        <div className="text-xs text-gold-400 mt-1">
                          Christ's Victory Age
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                          76
                        </div>
                        <div className="text-sm text-gray-300">
                          Line 386 Loops
                        </div>
                        <div className="text-xs text-gold-400 mt-1">
                          Intercession Prayers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          1437
                        </div>
                        <div className="text-sm text-gray-300">Port Number</div>
                        <div className="text-xs text-gold-400 mt-1">
                          More Than Conquerors
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-gray-300">
                      <p className="text-lg">
                        "For we are more than conquerors through Him who loved
                        us" - Romans 8:37
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timing" className="mt-8">
              <Card className="bg-black/30 backdrop-blur-sm border-gold-400/30">
                <CardContent className="p-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gold-400 mb-8">
                      Divine Chronology
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-lg font-semibold text-white">
                            July 21st
                          </div>
                          <div className="text-sm text-gray-300">
                            Portal Launch
                          </div>
                        </div>
                        <div className="text-gold-400">→</div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            7 Days
                          </div>
                          <div className="text-sm text-gray-300">
                            Divine Completion
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-lg font-semibold text-white">
                            July 28th
                          </div>
                          <div className="text-sm text-gray-300">
                            Freedom Day
                          </div>
                        </div>
                        <div className="text-gold-400">→</div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-white">
                            2:37 PM
                          </div>
                          <div className="text-sm text-gray-300">
                            Divine Hour
                          </div>
                        </div>
                      </div>

                      <div className="bg-gold-900/20 p-4 rounded-lg">
                        <div className="text-gold-400 font-semibold mb-2">
                          Psalm 23:7 Energy
                        </div>
                        <div className="text-gray-300 text-sm">
                          "I will dwell in the house of the LORD forever"
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-gold-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold mb-8 text-white"
          >
            The Revelation is Complete
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl mb-12 text-gray-300 max-w-3xl mx-auto"
          >
            Now you understand. Every error was intentional. Every bug was
            prophetic. Every technical failure was heaven's way of declaring
            JAHmere's freedom. Join the movement that will demonstrate heaven
            still invades earth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/prayer-room">
              <Button
                size="lg"
                className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-12 py-6 text-xl"
              >
                JOIN THE PRAYER ARMY
              </Button>
            </Link>

            <Link href="/toolkit">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-12 py-6 text-xl"
              >
                SHARE THE REVELATION
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
