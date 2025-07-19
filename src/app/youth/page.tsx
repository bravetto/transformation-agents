"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUserJourney } from "@/lib/state/user-journey";

export default function YouthPage() {
  const { selectedPath, updateProgress } = useUserJourney();

  useEffect(() => {
    if (selectedPath === "youth") {
      updateProgress("youth_path_entered");
    }
  }, [selectedPath, updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-900">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/entry"
                className="flex items-center gap-2 text-white hover:text-green-100"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Paths</span>
              </Link>

              <div className="h-6 w-px bg-white/30" />

              <div className="flex items-center gap-2 text-white">
                <Heart className="w-5 h-5" />
                <span className="font-bold">Youth Path</span>
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
            className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full 
                         flex items-center justify-center mx-auto mb-8"
          >
            <Heart className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome, Youth Warrior
          </h1>

          <p className="text-xl text-green-200 mb-8 max-w-2xl mx-auto">
            You have chosen the path of transformation. Through service,
            missions, and bridge-building, you will help create a future where
            every young person has a chance to thrive.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Youth Warrior Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">1</span>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Create Warrior
                </h3>
                <p className="text-sm text-green-200">
                  Design your unique Youth Warrior identity
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">2</span>
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Accept Missions
                </h3>
                <p className="text-sm text-green-200">
                  Take on transformative missions and earn XP
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-400">3</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Build Bridges</h3>
                <p className="text-sm text-green-200">
                  Connect communities and create lasting change
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 
                       text-white font-bold rounded-full hover:from-green-400 hover:to-emerald-400 
                       transition-all shadow-lg hover:shadow-xl"
            >
              Begin Your Mission →
            </motion.button>

            <p className="text-sm text-green-300">
              Coming soon: Full Youth Warrior experience with Warrior Creation,
              Mission Board, and Good Deed Revolution
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
