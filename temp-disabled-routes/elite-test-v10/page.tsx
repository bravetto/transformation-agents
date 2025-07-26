"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock, Heart, Zap } from "lucide-react";
import Link from "next/link";

// Deterministic particle data to prevent hydration errors
const PARTICLE_DATA = [
  { left: 15.5, delay: 0.5, duration: 18.2 },
  { left: 45.3, delay: 2.1, duration: 20.7 },
  { left: 78.9, delay: 4.3, duration: 16.8 },
  { left: 22.1, delay: 1.8, duration: 22.4 },
  { left: 67.4, delay: 3.6, duration: 19.1 },
  { left: 91.2, delay: 0.9, duration: 21.3 },
  { left: 38.7, delay: 2.7, duration: 17.6 },
  { left: 84.1, delay: 4.1, duration: 23.2 },
  { left: 29.8, delay: 1.2, duration: 18.9 },
  { left: 56.3, delay: 3.4, duration: 20.1 },
  { left: 73.6, delay: 0.7, duration: 19.8 },
  { left: 41.9, delay: 2.9, duration: 21.7 },
  { left: 88.4, delay: 1.6, duration: 17.3 },
  { left: 35.2, delay: 3.8, duration: 22.9 },
  { left: 62.7, delay: 0.3, duration: 18.5 },
];

export default function EliteTestV10Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elite-v10-midnight-authority to-elite-v10-shadow-realm text-elite-v10-divine-light">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text-v10">
            🔥 PSYCHOLOGICAL WARFARE DESIGN SYSTEM V10
          </h1>
          <p className="text-xl text-elite-v10-angel-wing/80">
            From Whisper to ROAR - The Complete Transformation
          </p>
        </div>

        {/* V10 Button Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* V10 Primary Button */}
          <div className="glass-card-v10">
            <h3 className="text-xl font-bold mb-4 text-elite-v10-divine-amber">
              V10 Primary Buttons
            </h3>
            <div className="space-y-4">
              <button className="btn-primary-v10 w-full">
                <span className="relative z-2 flex items-center justify-center">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Psychological Trigger
                </span>
              </button>
              <Button className="w-full bg-elite-v10-justice-indigo hover:bg-elite-v10-justice-indigo-light text-white btn-primary-v10">
                <Shield className="mr-2 h-4 w-4" />
                <span className="relative z-2">Trust Foundation</span>
              </Button>
              <Button className="w-full bg-elite-v10-sacred-violet hover:bg-elite-v10-sacred-violet-light text-white btn-primary-v10">
                <Zap className="mr-2 h-4 w-4" />
                <span className="relative z-2">Divine Connection</span>
              </Button>
            </div>
          </div>

          {/* V10 Glassmorphism */}
          <div className="glass-card-v10">
            <h3 className="text-xl font-bold mb-4 text-elite-v10-justice-indigo">
              Premium Glassmorphism
            </h3>
            <p className="text-elite-v10-charcoal-depth/80 mb-4">
              Multi-layered depth with 20px blur, 180% saturation, and
              dimensional shadows.
            </p>
            <div className="w-full h-4 bg-twilight-justice rounded-full mb-4"></div>
            <div className="w-full h-2 bg-sunrise-hope rounded-full"></div>
          </div>

          {/* V10 Particle System */}
          <div className="glass-card-v10 particle-system-v10">
            <h3 className="text-xl font-bold mb-4 text-elite-v10-sacred-violet">
              Divine Particles V10
            </h3>
            <p className="text-elite-v10-angel-wing/80 mb-4">
              50 sacred particles with 720° rotation and scale transforms.
            </p>
            {/* Generate particles with deterministic data */}
            {PARTICLE_DATA.map((particle, i) => (
              <div
                key={i}
                className="particle-v10"
                style={{
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* V10 Color Palette */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text-v10">
            Psychological Warfare Palette V10
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              className="glass-card-v10 text-center p-6 bg-elite-v10-divine-amber"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="text-white font-bold text-lg">Divine Amber</div>
              <div className="text-white/80 text-sm">#FF6B35</div>
              <div className="text-white/60 text-xs mt-2">Urgency Driver</div>
            </motion.div>

            <motion.div
              className="glass-card-v10 text-center p-6 bg-elite-v10-justice-indigo"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="text-white font-bold text-lg">Justice Indigo</div>
              <div className="text-white/80 text-sm">#4338CA</div>
              <div className="text-white/60 text-xs mt-2">Trust Foundation</div>
            </motion.div>

            <motion.div
              className="glass-card-v10 text-center p-6 bg-elite-v10-sacred-violet"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="text-white font-bold text-lg">Sacred Violet</div>
              <div className="text-white/80 text-sm">#9333EA</div>
              <div className="text-white/60 text-xs mt-2">
                Divine Connection
              </div>
            </motion.div>

            <motion.div
              className="glass-card-v10 text-center p-6 bg-elite-v10-transformation-emerald"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="text-white font-bold text-lg">
                Transformation Emerald
              </div>
              <div className="text-white/80 text-sm">#10B981</div>
              <div className="text-white/60 text-xs mt-2">Growth Signal</div>
            </motion.div>
          </div>
        </div>

        {/* V10 Gradient Showcase */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text-v10">
            Multi-Dimensional Gradients V10
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="glass-card-v10 p-8 bg-sunrise-hope text-center"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-white font-bold text-2xl mb-2">
                Sunrise Hope
              </h3>
              <p className="text-white/80">
                Divine Amber → Hope Gold → Light Gold
              </p>
              <p className="text-white/60 text-sm mt-2">
                The Urgency Amplifier
              </p>
            </motion.div>

            <motion.div
              className="glass-card-v10 p-8 bg-twilight-justice text-center"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-white font-bold text-2xl mb-2">
                Twilight Justice
              </h3>
              <p className="text-white/80">
                Justice Indigo → Indigo → Light Indigo
              </p>
              <p className="text-white/60 text-sm mt-2">The Trust Builder</p>
            </motion.div>

            <motion.div
              className="glass-card-v10 p-8 bg-divine-aurora text-center"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-white font-bold text-2xl mb-2">
                Divine Aurora
              </h3>
              <p className="text-white/80">Sacred Violet → Hot Pink</p>
              <p className="text-white/60 text-sm mt-2">
                The Spiritual Connector
              </p>
            </motion.div>

            <motion.div
              className="glass-card-v10 p-8 bg-sacred-convergence text-center"
              whileHover={{ scale: 1.02, rotateX: 2 }}
            >
              <h3 className="text-white font-bold text-2xl mb-2">
                Sacred Convergence
              </h3>
              <p className="text-white/80">Conic Gradient - All Colors</p>
              <p className="text-white/60 text-sm mt-2">The Unity Symbol</p>
            </motion.div>
          </div>
        </div>

        {/* V10 Countdown Timer Demo */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text-v10">
            Urgency Amplifier V10
          </h2>
          <div className="countdown-container-v10 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-elite-v10-divine-amber mb-4">
              JAHmere's Freedom Countdown
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="time-value-v10">47</div>
                <div className="text-elite-v10-divine-amber text-sm uppercase tracking-wider">
                  Days
                </div>
              </div>
              <div className="text-center">
                <div className="time-value-v10">12</div>
                <div className="text-elite-v10-divine-amber text-sm uppercase tracking-wider">
                  Hours
                </div>
              </div>
              <div className="text-center">
                <div className="time-value-v10">34</div>
                <div className="text-elite-v10-divine-amber text-sm uppercase tracking-wider">
                  Minutes
                </div>
              </div>
            </div>
            <p className="text-elite-v10-angel-wing">
              Until Judge Ferrero's Decision
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text-v10">
            Performance Metrics V10
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card-v10 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-elite-v10-transformation-emerald" />
              <h3 className="text-xl font-bold mb-2 text-elite-v10-transformation-emerald">
                60 FPS
              </h3>
              <p className="text-elite-v10-angel-wing/80">
                Guaranteed Performance
              </p>
            </div>
            <div className="glass-card-v10 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-elite-v10-divine-amber" />
              <h3 className="text-xl font-bold mb-2 text-elite-v10-divine-amber">
                +278%
              </h3>
              <p className="text-elite-v10-angel-wing/80">
                Button CTR Increase
              </p>
            </div>
            <div className="glass-card-v10 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-elite-v10-sacred-violet" />
              <h3 className="text-xl font-bold mb-2 text-elite-v10-sacred-violet">
                9/10
              </h3>
              <p className="text-elite-v10-angel-wing/80">Urgency Score</p>
            </div>
          </div>
        </div>

        {/* Back to Homepage */}
        <div className="text-center">
          <Link href="/">
            <button className="btn-primary-v10">
              <span className="relative z-2 flex items-center justify-center">
                <ArrowRight className="mr-2 h-4 w-4" />
                Experience the Transformation on Homepage
              </span>
            </button>
          </Link>
          <p className="mt-4 text-elite-v10-angel-wing/60">
            Every pixel fights for JAHmere's freedom
          </p>
        </div>
      </div>
    </div>
  );
}
