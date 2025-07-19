"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUserJourney } from "@/lib/state/user-journey";

export default function ChampionPage() {
  const { selectedPath, updateProgress } = useUserJourney();

  useEffect(() => {
    if (selectedPath === "champion") {
      updateProgress("champion_path_entered");
    }
  }, [selectedPath, updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/entry"
                className="flex items-center gap-2 text-white hover:text-amber-100"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Paths</span>
              </Link>

              <div className="h-6 w-px bg-white/30" />

              <div className="flex items-center gap-2 text-white">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">Champion Path</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div
            className="w-24 h-24 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full 
                         flex items-center justify-center mx-auto mb-8"
          >
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome, Champion
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            You have chosen the path of influence. Your platform, your network,
            your voice - all will be instruments of transformation in JAHmere's
            journey to freedom.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Champion Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Spiritual Covering
                </h3>
                <p className="text-sm text-gray-600">
                  Receive Tony Dungy's blessing and spiritual guidance
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Legacy Assessment
                </h3>
                <p className="text-sm text-gray-600">
                  Discover your unique influence and impact potential
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Activate Network
                </h3>
                <p className="text-sm text-gray-600">
                  Multiply your impact through strategic connections
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 
                       text-white font-bold rounded-full hover:from-amber-400 hover:to-yellow-400 
                       transition-all shadow-lg hover:shadow-xl"
            >
              Begin Champion Journey →
            </motion.button>

            <p className="text-sm text-gray-500">
              Coming soon: Full Champion experience with Tony Dungy video,
              Legacy Assessment, and Network Activation
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
