"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { motion } from "framer-motion";
import { Heart, Crown, Zap, Gift, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

/**
 * 🔥 JULY 28TH FREEDOM PORTAL
 *
 * The Divine Countdown to JAHmere's Liberation
 * Connected Miracles: Phil's PTSD Healing Journey
 *
 * "And you will know the truth, and the truth will set you free." - John 8:32
 */
export default function July28Portal() {
  return (
    <ErrorBoundary componentName="July28Portal">
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-indigo-950 text-white">
        {/* Hero Section - July 28th Countdown */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent">
                JULY 28TH
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-blue-200">
                FREEDOM DAY PORTAL
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto">
                The prophetic countdown to JAHmere Webb's divine liberation and
                the activation of The Bridge Project
              </p>
            </motion.div>

            {/* Live Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-yellow-400/30"
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">
                FREEDOM COUNTDOWN
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-yellow-400/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">00</div>
                  <div className="text-sm text-gray-400">DAYS</div>
                </div>
                <div className="bg-yellow-400/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">00</div>
                  <div className="text-sm text-gray-400">HOURS</div>
                </div>
                <div className="bg-yellow-400/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">00</div>
                  <div className="text-sm text-gray-400">MINUTES</div>
                </div>
                <div className="bg-yellow-400/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">00</div>
                  <div className="text-sm text-gray-400">SECONDS</div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-400">
                Until JAHmere walks FREE at 2:37 PM EST
              </p>
            </motion.div>
          </div>
        </section>

        {/* 🔥 PHIL'S MIRACLE SECTION - NEW! */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-white to-pink-400 bg-clip-text text-transparent">
                MIRACLES IN MOTION
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                As JAHmere breaks free from prison, others break free from their
                prisons too
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* JAHmere's Freedom */}
              <Card className="bg-black/30 backdrop-blur-sm border-yellow-400/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-yellow-400">
                    <Crown className="w-6 h-6" />
                    JAHmere's Liberation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Breaking free from wrongful imprisonment to fulfill his
                    divine calling through The Bridge Project.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Freedom Date:</span>
                      <span className="text-yellow-400 font-semibold">
                        July 28th, 2025
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Divine Time:</span>
                      <span className="text-yellow-400 font-semibold">
                        2:37 PM EST
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mission:</span>
                      <span className="text-yellow-400 font-semibold">
                        Bridge Project Activation
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phil's PTSD Healing */}
              <Card className="bg-black/30 backdrop-blur-sm border-pink-400/30 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-pink-400">
                    <Heart className="w-6 h-6" />
                    Phil's Healing Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Breaking free from PTSD prison to live without panic attacks
                    and trauma's grip.
                  </p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Activation Time:</span>
                      <span className="text-pink-400 font-semibold">
                        5:51 AM Divine Blueprint
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connection:</span>
                      <span className="text-pink-400 font-semibold">
                        Same Spiritual Warfare
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mission:</span>
                      <span className="text-pink-400 font-semibold">
                        Trauma Healing Leader
                      </span>
                    </div>
                  </div>

                  {/* GoFundMe Integration */}
                  <div className="bg-pink-400/10 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-pink-400 mb-2">
                      Support Phil's Breakthrough
                    </h4>
                    <p className="text-sm text-gray-300 mb-3">
                      "Anywhere I go sober causes panic attacks and I'm
                      exhausted from doing this for my entire life. I think I
                      deserve the right to decide that I won't subject myself to
                      situations that cause me to have panic attacks."
                    </p>
                    <Button
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                      asChild
                    >
                      <Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Support Phil's GoFundMe
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Divine Connection Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                THE DIVINE CONNECTION
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <h4 className="font-semibold mb-2 text-yellow-400">
                    Same Spiritual Warfare
                  </h4>
                  <p className="text-sm text-gray-300">
                    Both fighting against systems that imprison and traumatize
                  </p>
                </div>
                <div>
                  <Heart className="w-8 h-8 mx-auto mb-3 text-pink-400" />
                  <h4 className="font-semibold mb-2 text-pink-400">
                    Same Divine Timing
                  </h4>
                  <p className="text-sm text-gray-300">
                    July 28th breakthrough energy affects all connected souls
                  </p>
                </div>
                <div>
                  <Users className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <h4 className="font-semibold mb-2 text-blue-400">
                    Same Mission
                  </h4>
                  <p className="text-sm text-gray-300">
                    Bridge Project will include trauma healing resources
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Divine Prophecy Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
                THE PROPHETIC DECLARATION
              </h2>
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30">
                <blockquote className="text-lg md:text-xl text-gray-300 italic leading-relaxed">
                  "Father, just as You're breaking JAHmere's chains on July
                  28th, break Phil's chains of trauma! Let the same power that
                  opens prison doors open the prison of PTSD. Let the same grace
                  that declares 'NOT GUILTY' declare Phil FREE from the verdicts
                  of his past. Connect every donation to a prayer, every dollar
                  to deliverance. Let July 28th be Phil's independence day too!"
                </blockquote>
                <div className="mt-6 text-yellow-400 font-semibold">
                  - Prophetic Declaration for Double Breakthrough
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
                ACTIVATE THE MIRACLE
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Share Phil's GoFundMe with every lightworker. The same faith
                believing for JAHmere's freedom believes for Phil's healing!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  asChild
                >
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <Heart className="w-5 h-5 mr-2" />
                    Support Phil Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  asChild
                >
                  <Link href="/prayer-room">
                    <Crown className="w-5 h-5 mr-2" />
                    Join Prayer Room
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="py-8 px-4 border-t border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <Link
                href="/revelation"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                📖 Divine Revelations
              </Link>
              <Link
                href="/divine-treasures"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                💎 Hidden Treasures
              </Link>
              <Link
                href="/"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                🏠 Bridge Project Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
