"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Heart,
  Star,
  Crown,
  Infinity as InfinityIcon,
  Eye,
  Waves,
} from "lucide-react";
import {
  SpiritualEnergyViz,
  QuantumInteractions,
} from "@/lib/divine-design-intelligence";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface SpiritualEnergyVisualizerProps {
  spiritualLevel: number;
  miracleProximity: number;
  prayerIntensity: number;
  consciousnessLevel: number;
  userCount?: number;
  isActive?: boolean;
  className?: string;
}

interface EnergyParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  type: "prayer" | "miracle" | "consciousness" | "quantum";
  lifespan: number;
}

const SpiritualEnergyVisualizer: React.FC<SpiritualEnergyVisualizerProps> = ({
  spiritualLevel,
  miracleProximity,
  prayerIntensity,
  consciousnessLevel,
  userCount = 1,
  isActive = true,
  className = "",
}) => {
  const [particles, setParticles] = useState<EnergyParticle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Get aura effect based on spiritual level
  const auraEffect = useMemo(
    () => SpiritualEnergyViz.getAuraEffect(spiritualLevel),
    [spiritualLevel],
  );

  // Get divine particles configuration
  const divineParticles = useMemo(
    () => SpiritualEnergyViz.getDivineParticles(miracleProximity),
    [miracleProximity],
  );

  // Get quantum visualization
  const quantumViz = useMemo(
    () =>
      QuantumInteractions.getCollectiveConsciousnessVisualization(userCount),
    [userCount],
  );

  // Create particles based on spiritual metrics
  const createParticle = useCallback(
    (type: EnergyParticle["type"]): EnergyParticle => {
      const colors = {
        prayer: "#FFD700",
        miracle: "#8B5CF6",
        consciousness: "#3B82F6",
        quantum: "#10B981",
      };

      return {
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 2 + 1,
        color: colors[type],
        type,
        lifespan: Math.random() * 5000 + 3000,
      };
    },
    [],
  );

  // Update particles based on spiritual metrics
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setParticles((prev) => {
        let newParticles = [...prev];

        // Remove expired particles
        newParticles = newParticles.filter((p) => p.lifespan > 0);

        // Update existing particles
        newParticles = newParticles.map((p) => ({
          ...p,
          x: (p.x + p.speed * 0.1) % 100,
          y: (p.y + Math.sin(Date.now() * 0.001 + p.x) * 0.5) % 100,
          lifespan: p.lifespan - 100,
        }));

        // Add new particles based on spiritual metrics
        const maxParticles = Math.min(divineParticles.count, 50);

        if (newParticles.length < maxParticles) {
          const particleTypes: EnergyParticle["type"][] = [];

          if (prayerIntensity > 500) particleTypes.push("prayer");
          if (miracleProximity > 0.5) particleTypes.push("miracle");
          if (consciousnessLevel > 70) particleTypes.push("consciousness");
          if (quantumViz.energyFlow === "active") particleTypes.push("quantum");

          if (particleTypes.length > 0) {
            const randomType =
              particleTypes[Math.floor(Math.random() * particleTypes.length)];
            newParticles.push(createParticle(randomType));
          }
        }

        return newParticles;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [
    isActive,
    divineParticles.count,
    prayerIntensity,
    miracleProximity,
    consciousnessLevel,
    quantumViz.energyFlow,
    createParticle,
  ]);

  // Handle mouse movement for quantum entanglement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  // Get dynamic class names based on spiritual state
  const getVisualizerClasses = useMemo(() => {
    const classes = ["spiritual-energy-visualizer"];

    if (spiritualLevel > 80) classes.push("consciousness-high");
    else if (spiritualLevel > 50) classes.push("consciousness-medium");
    else classes.push("consciousness-low");

    if (miracleProximity > 0.8) classes.push("miracle-manifesting");
    else if (miracleProximity > 0.6) classes.push("miracle-imminent");
    else if (miracleProximity > 0.3) classes.push("miracle-approaching");

    if (prayerIntensity > 1000) classes.push("prayer-intensity-maximum");
    else if (prayerIntensity > 750) classes.push("prayer-intensity-high");
    else if (prayerIntensity > 500) classes.push("prayer-intensity-medium");

    if (quantumViz.energyFlow === "active") classes.push("quantum-connection");

    return classes.join(" ");
  }, [
    spiritualLevel,
    miracleProximity,
    prayerIntensity,
    quantumViz.energyFlow,
  ]);

  return (
    <div
      className={`
        relative w-full h-full overflow-hidden
        ${getVisualizerClasses}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spiritual Energy Particles Background */}
      <div className="absolute inset-0 spiritual-energy-particles" />

      {/* Aura Effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-full pointer-events-none
          ${auraEffect.color}
        `}
        style={{
          width: `${Math.min(spiritualLevel * 2, 100)}%`,
          height: `${Math.min(spiritualLevel * 2, 100)}%`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
          opacity: spiritualLevel / 100,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [
            spiritualLevel / 100,
            (spiritualLevel / 100) * 0.8,
            spiritualLevel / 100,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dynamic Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              borderRadius: "50%",
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              rotate: [0, 360],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: particle.lifespan / 1000,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Quantum Entanglement Connections */}
      {quantumViz.energyFlow === "active" && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {Array.from({ length: quantumViz.particleCount / 10 }).map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${mousePosition.x}%`}
              y2={`${mousePosition.y}%`}
              stroke="#8B5CF6"
              strokeWidth="1"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </svg>
      )}

      {/* Spiritual Icons */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-3 gap-8 opacity-20">
          {spiritualLevel > 80 && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-8 h-8 text-purple-400" />
            </motion.div>
          )}

          {miracleProximity > 0.7 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-8 h-8 text-yellow-400" />
            </motion.div>
          )}

          {prayerIntensity > 800 && (
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-red-400" />
            </motion.div>
          )}

          {consciousnessLevel > 85 && (
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Eye className="w-8 h-8 text-blue-400" />
            </motion.div>
          )}

          {quantumViz.energyFlow === "active" && (
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <InfinityIcon className="w-8 h-8 text-green-400" />
            </motion.div>
          )}

          {divineParticles.count > 30 && (
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          )}

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
            >
              <Zap className="w-8 h-8 text-purple-400" />
            </motion.div>
          )}

          {userCount > 5 && (
            <motion.div
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Waves className="w-8 h-8 text-blue-400" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Spiritual Metrics Display */}
      <div className="absolute bottom-4 left-4 text-xs text-white/70 space-y-1 pointer-events-none">
        <div>Spiritual Level: {spiritualLevel}%</div>
        <div>Miracle Proximity: {Math.round(miracleProximity * 100)}%</div>
        <div>Prayer Intensity: {prayerIntensity}</div>
        <div>Consciousness: {consciousnessLevel}%</div>
        <div>Quantum Flow: {quantumViz.energyFlow}</div>
        <div>Active Particles: {particles.length}</div>
      </div>
    </div>
  );
};

export default withErrorBoundary(SpiritualEnergyVisualizer, "SpiritualEnergyVisualizer", (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg" />
  ));
