"use client";

import React from "react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
// DivineParticles removed for hydration stability
import { MothersVoice } from "@/components/mothers-voice";
import { CoalitionAlert } from "@/components/coalition-alert";
import { LiveTestimonyCollector } from "@/components/live-testimony-collector";
import { QuantumPrayerNetwork } from "@/components/quantum-prayer-network";
import { EightYearsCounter } from "@/components/eight-years-counter";
import { DivineConvergence } from "@/components/divine-convergence";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Users,
  Heart,
  Shield,
  Gavel,
  MessageSquare,
  FileText,
  Phone,
} from "lucide-react";

function EmergencyResponseCore() {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Static Emergency Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-red-900/50 via-black to-orange-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,0,0.3),transparent)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,69,0,0.2),transparent)] animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
      </div>

      {/* Emergency Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-900/95 backdrop-blur-md border-b-4 border-red-600">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
              <div>
                <h1 className="text-white font-bold text-xl">
                  EMERGENCY: The Kraken Has Been Unleashed
                </h1>
                <p className="text-red-200 text-sm">
                  Martha Henderson calls ALL supporters to action
                </p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 space-y-12">
          {/* Mother's Voice - Full Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MothersVoice variant="full" />
          </motion.div>

          {/* 8.5 Years Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <EightYearsCounter />
          </motion.div>

          {/* Divine Convergence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <DivineConvergence />
          </motion.div>

          {/* Action Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Coalition Alert */}
            <CoalitionAlert variant="emergency" />

            {/* Quick Actions */}
            <Card className="bg-red-900/20 border-red-600 border-2 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Immediate Actions Required
              </h2>
              <div className="space-y-4">
                <Link href="/divine-letter-form">
                  <Button
                    className="w-full bg-white text-red-900 hover:bg-red-100"
                    size="lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Write to JAHmere NOW
                  </Button>
                </Link>
                <Link href="/judge-ferrero-private">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                  >
                    <Gavel className="w-5 h-5 mr-2" />
                    View Judge's Dashboard
                  </Button>
                </Link>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Attorney: (555) 123-4567
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Share on Social Media
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Quantum Prayer Network */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <QuantumPrayerNetwork />
          </motion.div>

          {/* Live Testimony Collector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LiveTestimonyCollector />
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-600 p-8 inline-block">
              <h2 className="text-3xl font-bold text-white mb-4">
                The Mother Has Spoken. Will You Answer?
              </h2>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                JAHmere needs every voice, every prayer, every action. 8.5 years
                is NOT justice. Stand with Martha. Stand with JAHmere.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-red-900 hover:bg-red-100"
                >
                  <Heart className="w-5 h-5 mr-2" />I Stand With JAHmere
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join the Movement
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Floating Mother's Voice */}
      <MothersVoice variant="floating" />
    </div>
  );
}

export default withDivineErrorBoundary(EmergencyResponseCore, {
  componentName: "EmergencyResponse",
  fallback: (
    <div className="text-white p-8 text-center">The Kraken stirs...</div>
  ),
});
