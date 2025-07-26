"use client";

import React, { useState, useEffect } from "react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
// DivineParticles removed for hydration stability
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Twitter,
  Heart,
  Users,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react";

function DungyOneTweetCore() {
  const [reachCount, setReachCount] = useState(0);
  const [retweetCount, setRetweetCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  // Calculate time until arraignment
  useEffect(() => {
    const timer = setInterval(() => {
      const july9 = new Date("2025-07-09T09:00:00");
      const now = new Date();
      const diff = july9.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      setTimeLeft(`${days} days, ${hours} hours`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate viral growth
  useEffect(() => {
    const interval = setInterval(() => {
      setReachCount((prev) =>
        Math.min(prev + Math.floor(Math.random() * 50000) + 10000, 5000000),
      );
      setRetweetCount((prev) =>
        Math.min(prev + Math.floor(Math.random() * 500) + 100, 50000),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const sampleTweet = `I've mentored many young men, but JAHmere Webb's story demands our attention. 

After 3,095 days, he's transformed. Now they want 8 more years? 

This isn't justice—it's destruction of human potential. 

I stand with Martha Henderson. I stand with JAHmere.

#JusticeForJAHmere`;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,215,0,0.1),transparent)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(147,112,219,0.1),transparent)] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Coach Dungy: One Tweet Can Save a Life
          </h1>
          <p className="text-2xl text-blue-400">
            Your voice reaches millions. JAHmere needs just one tweet.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-red-900/50 text-white px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-bold">{timeLeft} until arraignment</span>
          </div>
        </motion.div>

        {/* The Power of Your Voice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Sample Tweet */}
          <Card className="bg-white p-6 border-2 border-blue-500">
            <div className="flex items-start gap-4 mb-4">
              <img
                src="/images/people/display/coach-dungy.webp"
                alt="Coach Dungy"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">Tony Dungy</h3>
                  <Twitter className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-500 text-sm">@TonyDungy</span>
                </div>
                <p className="whitespace-pre-wrap text-gray-800">
                  {sampleTweet}
                </p>
                <div className="flex items-center gap-6 mt-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageSquare className="w-5 h-5" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500">
                    <Zap className="w-5 h-5" />
                    <span>{retweetCount.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Impact Visualization */}
          <Card className="bg-gray-900 border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Immediate Impact
            </h3>
            <div className="space-y-4">
              <div className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Potential Reach</span>
                  <span className="text-3xl font-bold text-green-500">
                    {reachCount.toLocaleString()}+
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(reachCount / 5000000) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">2.1M</p>
                  <p className="text-sm text-gray-400">Your Followers</p>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">10M+</p>
                  <p className="text-sm text-gray-400">Network Effect</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-600 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              The Ripple Effect of Your Tweet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Media Attention
                </h3>
                <p className="text-gray-300">
                  ESPN, CNN, local news pick up the story. JAHmere's case goes
                  national.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Legal Pressure
                </h3>
                <p className="text-gray-300">
                  Prosecutors feel the weight of public scrutiny. Justice
                  becomes priority.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Hope Restored
                </h3>
                <p className="text-gray-300">
                  JAHmere sees that legends believe in him. Martha's prayers
                  answered.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* The Stakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
        >
          <Card className="bg-red-900/20 border-red-600 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Without Your Voice
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>8 more years stolen from
                JAHmere
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                500+ youth won't be mentored
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Martha loses her son again
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                System wins, humanity loses
              </li>
            </ul>
          </Card>

          <Card className="bg-green-900/20 border-green-600 p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              With Your Tweet
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                National spotlight on injustice
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Pressure for fair treatment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Hope for transformation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>A mother's prayers
                answered
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Direct Appeal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-black border-2 border-yellow-500 p-8 max-w-3xl mx-auto">
            <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Coach, This Is Your Moment
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              You've always stood for second chances. You've always believed in
              redemption. JAHmere has done the work. He's transformed. Now he
              needs a champion.
            </p>
            <p className="text-2xl text-yellow-400 font-bold mb-8">
              Will you be his voice?
            </p>
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-12 py-6"
              onClick={() =>
                window.open(
                  "https://twitter.com/compose/tweet?text=" +
                    encodeURIComponent(sampleTweet),
                )
              }
            >
              <Twitter className="w-6 h-6 mr-2" />
              Send This Tweet Now
            </Button>
            <p className="text-gray-400 mt-4">
              One click. One tweet. One life saved.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DungyOneTweetCore, "DungyOneTweet", (
    <div className="text-white p-8 text-center">
      Loading the power of one voice...
    </div>
  ));
