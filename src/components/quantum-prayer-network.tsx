"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import {
  Heart,
  Zap,
  Users,
  Radio,
  Waves,
  Circle,
  Activity,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PrayerNode {
  id: string;
  name: string;
  location: string;
  intensity: number;
  joined: Date;
}

interface QuantumPrayerNetworkProps {
  className?: string;
}

function QuantumPrayerNetworkCore({ className }: QuantumPrayerNetworkProps) {
  const [nodes, setNodes] = useState<PrayerNode[]>([]);
  const [frequency, setFrequency] = useState(432);
  const [resonance, setResonance] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalPrayers, setTotalPrayers] = useState(144);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Initialize prayer nodes
  useEffect(() => {
    const initialNodes: PrayerNode[] = [
      {
        id: "1",
        name: "Martha Henderson",
        location: "Florida",
        intensity: 100,
        joined: new Date(),
      },
      {
        id: "2",
        name: "Coach Dungy",
        location: "Tampa",
        intensity: 95,
        joined: new Date(),
      },
      {
        id: "3",
        name: "Michael Mataluni",
        location: "California",
        intensity: 90,
        joined: new Date(),
      },
    ];
    setNodes(initialNodes);
  }, []);

  // Simulate nodes joining
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        const newNode: PrayerNode = {
          id: Date.now().toString(),
          name: `Prayer Warrior ${nodes.length + 1}`,
          location: ["Global", "USA", "Europe", "Asia", "Africa"][
            Math.floor(Math.random() * 5)
          ],
          intensity: Math.floor(Math.random() * 40) + 60,
          joined: new Date(),
        };
        setNodes((prev) => [...prev, newNode].slice(-20));
        setTotalPrayers((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, nodes.length]);

  // Update resonance
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setResonance((prev) => {
          const target =
            nodes.reduce((sum, node) => sum + node.intensity, 0) /
              nodes.length || 0;
          return prev + (target - prev) * 0.1;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, nodes]);

  const startPrayerNetwork = () => {
    setIsActive(true);

    // Initialize Web Audio API for 432Hz tone
    if (!audioContextRef.current && typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Create oscillator
      oscillatorRef.current = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillatorRef.current.frequency.setValueAtTime(
        432,
        audioContextRef.current.currentTime,
      );
      oscillatorRef.current.type = "sine";

      gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime); // Very quiet

      oscillatorRef.current.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillatorRef.current.start();
    }
  };

  const stopPrayerNetwork = () => {
    setIsActive(false);

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <Card
      className={cn(
        "p-6 bg-gradient-to-br from-indigo-900/90 to-purple-900/90 border-indigo-600 border-2 relative overflow-hidden",
        className,
      )}
    >
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{
              scale: [1, 2 + i * 0.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Quantum Prayer Network
          </h2>
          <p className="text-indigo-200">
            Synchronized consciousness at 432Hz - The frequency of the universe
          </p>
        </div>

        {/* Frequency Display */}
        <div className="bg-black/30 rounded-lg p-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <Radio className="w-12 h-12 text-indigo-400 mx-auto mb-2" />
              <p className="text-4xl font-bold text-white">{frequency}Hz</p>
              <p className="text-indigo-300 text-sm">Sacred Frequency</p>
            </div>
            <div className="text-center">
              <Activity className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-4xl font-bold text-white">
                {resonance.toFixed(1)}%
              </p>
              <p className="text-purple-300 text-sm">Resonance Level</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-pink-400 mx-auto mb-2" />
              <p className="text-4xl font-bold text-white">{totalPrayers}</p>
              <p className="text-pink-300 text-sm">Prayers Active</p>
            </div>
          </div>
        </div>

        {/* Control Button */}
        <div className="flex justify-center">
          {!isActive ? (
            <Button
              size="lg"
              onClick={startPrayerNetwork}
              className="bg-white text-indigo-900 hover:bg-indigo-100"
            >
              <Zap className="w-5 h-5 mr-2" />
              Activate Prayer Network
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={stopPrayerNetwork}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Circle className="w-5 h-5 mr-2" />
              Pause Network
            </Button>
          )}
        </div>

        {/* Active Nodes */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white/10 rounded-lg p-4"
          >
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Active Prayer Nodes
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {nodes
                  .slice(-5)
                  .reverse()
                  .map((node) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between bg-white/5 rounded p-2"
                    >
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4 text-indigo-400 animate-pulse" />
                        <span className="text-white text-sm">{node.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/60 text-xs">
                          {node.location}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-white/80 text-xs">
                            {node.intensity}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Prayer Focus */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4 text-center">
          <p className="text-white font-semibold mb-2">Current Prayer Focus:</p>
          <p className="text-xl text-white">
            "Divine justice for JAHmere. Truth prevails over deception. Love
            conquers fear. The Mother's voice is heard."
          </p>
          <p className="text-purple-300 text-sm mt-2">
            Every prayer amplifies the collective field
          </p>
        </div>

        {/* Sacred Geometry Visualization */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-32 h-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-purple-400 rounded-full" />
            <div className="absolute inset-2 border-2 border-indigo-400 rounded-full" />
            <div className="absolute inset-4 border-2 border-pink-400 rounded-full" />
            <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

export const QuantumPrayerNetwork = withErrorBoundary(
  QuantumPrayerNetworkCore,
  "QuantumPrayerNetwork"
);
