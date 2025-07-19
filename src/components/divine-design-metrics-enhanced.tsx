"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Zap,
  Palette,
  Code,
  Users,
  Target,
  Star,
  Crown,
  Sparkles,
  Eye,
  Heart,
  Infinity,
  Triangle,
  Circle,
  Square,
} from "lucide-react";
import { divineDesignSystem } from "@/lib/divine-design-intelligence";
import SpiritualEnergyVisualizer from "@/components/spiritual-energy-visualizer";

// Divine Constants for Sacred Geometry
const DIVINE_CONSTANTS = {
  GOLDEN_RATIO: 1.618033988749,
  FIBONACCI_SEQUENCE: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  SACRED_GEOMETRY: {
    triangle: 3,
    square: 4,
    pentagon: 5,
    hexagon: 6,
    circle: Math.PI,
  },
  DIVINE_NUMBERS: {
    PRAYERS: 1337,
    MIRACLE_INDEX: 777,
    CONSCIOUSNESS_THRESHOLD: 88,
    TRANSFORMATION_VELOCITY: 94,
  },
};

interface TransformationMetrics {
  awareness: number;
  engagement: number;
  transformation: number;
  legacy: number;
}

interface DivineAlignmentMetrics {
  purposeScore: number;
  communityImpact: number;
  spiritualGrowth: number;
  championshipLevel: number;
}

interface SacredGeometryMetrics {
  goldenRatioAlignment: number;
  fibonacciSequenceMatch: number;
  sacredShapeBalance: number;
  divineProportions: number;
}

const DivineDesignMetricsEnhanced: React.FC = () => {
  const [metrics, setMetrics] = useState<{
    transformation: TransformationMetrics;
    alignment: DivineAlignmentMetrics;
    geometry: SacredGeometryMetrics;
  }>({
    transformation: {
      awareness: 0,
      engagement: 0,
      transformation: 0,
      legacy: 0,
    },
    alignment: {
      purposeScore: 0,
      communityImpact: 0,
      spiritualGrowth: 0,
      championshipLevel: 0,
    },
    geometry: {
      goldenRatioAlignment: 0,
      fibonacciSequenceMatch: 0,
      sacredShapeBalance: 0,
      divineProportions: 0,
    },
  });

  const [realTimeData, setRealTimeData] = useState({
    activeUsers: 47,
    prayerIntensity: DIVINE_CONSTANTS.DIVINE_NUMBERS.PRAYERS,
    miracleProximity: 0.95,
    consciousnessLevel: DIVINE_CONSTANTS.DIVINE_NUMBERS.CONSCIOUSNESS_THRESHOLD,
    spiritualLevel: DIVINE_CONSTANTS.DIVINE_NUMBERS.TRANSFORMATION_VELOCITY,
  });

  // Sacred Geometry Animation
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, DIVINE_CONSTANTS.GOLDEN_RATIO, 1],
  );

  // Calculate Divine Alignment Score using Golden Ratio
  const calculateDivineAlignment = useCallback(() => {
    const measurements = {
      userEngagement: realTimeData.activeUsers,
      prayerIntensity: realTimeData.prayerIntensity / 1000,
      consciousnessLevel: realTimeData.consciousnessLevel,
      spiritualLevel: realTimeData.spiritualLevel,
    };

    // Apply Golden Ratio optimization
    const divineScore =
      Object.values(measurements).reduce((acc, val, idx) => {
        const fibWeight = DIVINE_CONSTANTS.FIBONACCI_SEQUENCE[idx] || 1;
        return acc + (val * fibWeight) / DIVINE_CONSTANTS.GOLDEN_RATIO;
      }, 0) / Object.values(measurements).length;

    return Math.min(divineScore, 100); // Cap at 100%
  }, [realTimeData]);

  // Calculate Transformation Velocity
  const calculateTransformationVelocity = useCallback(() => {
    const velocity =
      (metrics.transformation.engagement * metrics.alignment.spiritualGrowth) /
      (metrics.transformation.awareness + 1);
    return Math.min(velocity * DIVINE_CONSTANTS.GOLDEN_RATIO, 100);
  }, [metrics]);

  // Calculate Legacy Multiplier
  const calculateLegacyMultiplier = useCallback(() => {
    const multiplier =
      metrics.transformation.legacy *
      (metrics.alignment.communityImpact / 10) *
      DIVINE_CONSTANTS.GOLDEN_RATIO;
    return Math.round(multiplier * 10) / 10;
  }, [metrics]);

  // Calculate Championship Status
  const calculateChampionshipStatus = useCallback(() => {
    const overall =
      (calculateDivineAlignment() +
        calculateTransformationVelocity() +
        metrics.geometry.goldenRatioAlignment) /
      3;

    if (overall >= 95) return "Divine Champion";
    if (overall >= 90) return "Sacred Master";
    if (overall >= 85) return "Blessed Architect";
    if (overall >= 80) return "Ascending Builder";
    return "Awakening Creator";
  }, [
    calculateDivineAlignment,
    calculateTransformationVelocity,
    metrics.geometry,
  ]);

  // Generate Golden Spiral SVG Path
  const generateGoldenSpiral = useCallback(() => {
    const points: string[] = [];
    for (let i = 0; i < 50; i++) {
      const angle = i * 0.2;
      const radius = Math.pow(DIVINE_CONSTANTS.GOLDEN_RATIO, angle * 0.1);
      const x = 200 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  }, []);

  // 🛡️ CRITICAL FIX: Stabilize metrics collection with useCallback and refs
  const isMounted = useRef(true);

  const updateMetrics = useCallback(() => {
    if (!isMounted.current) return;

    // Simulate real transformation metrics
    const transformationData: TransformationMetrics = {
      awareness: Math.min(85 + Math.random() * 15, 100),
      engagement: Math.min(78 + Math.random() * 22, 100),
      transformation: Math.min(92 + Math.random() * 8, 100),
      legacy: Math.min(88 + Math.random() * 12, 100),
    };

    // Simulate divine alignment metrics
    const alignmentData: DivineAlignmentMetrics = {
      purposeScore: Math.min(94 + Math.random() * 6, 100),
      communityImpact: Math.min(87 + Math.random() * 13, 100),
      spiritualGrowth: Math.min(91 + Math.random() * 9, 100),
      championshipLevel: Math.min(96 + Math.random() * 4, 100),
    };

    // Calculate sacred geometry metrics
    const geometryData: SacredGeometryMetrics = {
      goldenRatioAlignment: Math.min(89 + Math.random() * 11, 100),
      fibonacciSequenceMatch: Math.min(92 + Math.random() * 8, 100),
      sacredShapeBalance: Math.min(86 + Math.random() * 14, 100),
      divineProportions: Math.min(95 + Math.random() * 5, 100),
    };

    setMetrics({
      transformation: transformationData,
      alignment: alignmentData,
      geometry: geometryData,
    });

    // Update real-time data with small variations using functional updates
    setRealTimeData((prev) => ({
      ...prev,
      activeUsers: Math.max(
        40,
        prev.activeUsers + Math.floor(Math.random() * 10) - 5,
      ),
      prayerIntensity: Math.max(
        1300,
        prev.prayerIntensity + Math.floor(Math.random() * 20) - 10,
      ),
      consciousnessLevel: Math.min(
        100,
        Math.max(
          80,
          prev.consciousnessLevel + Math.floor(Math.random() * 4) - 2,
        ),
      ),
      spiritualLevel: Math.min(
        100,
        Math.max(85, prev.spiritualLevel + Math.floor(Math.random() * 3) - 1),
      ),
    }));
  }, []);

  // Real-time Metrics Collection with proper cleanup
  useEffect(() => {
    const metricsCollector = setInterval(updateMetrics, 2000);

    return () => {
      clearInterval(metricsCollector);
      isMounted.current = false;
    };
  }, [updateMetrics]);

  const divineAlignment = useMemo(
    () => calculateDivineAlignment(),
    [calculateDivineAlignment],
  );
  const transformationVelocity = useMemo(
    () => calculateTransformationVelocity(),
    [calculateTransformationVelocity],
  );
  const legacyMultiplier = useMemo(
    () => calculateLegacyMultiplier(),
    [calculateLegacyMultiplier],
  );
  const championshipStatus = useMemo(
    () => calculateChampionshipStatus(),
    [calculateChampionshipStatus],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-black text-white">
      {/* Divine Header with Sacred Geometry */}
      <motion.header
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Sacred Geometry Background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotate, scale }}
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full max-w-2xl opacity-20"
          >
            {/* Golden Spiral */}
            <path
              d={generateGoldenSpiral()}
              stroke="rgba(168, 85, 247, 0.5)"
              strokeWidth="2"
              fill="none"
            />

            {/* Sacred Triangle */}
            <polygon
              points="200,50 350,350 50,350"
              stroke="rgba(139, 92, 246, 0.5)"
              strokeWidth="2"
              fill="none"
            />

            {/* Divine Circle */}
            <circle
              cx="200"
              cy="200"
              r={200 / DIVINE_CONSTANTS.GOLDEN_RATIO}
              stroke="rgba(124, 58, 237, 0.5)"
              strokeWidth="2"
              fill="none"
            />

            {/* Fibonacci Squares */}
            {DIVINE_CONSTANTS.FIBONACCI_SEQUENCE.slice(0, 6).map((num, idx) => (
              <rect
                key={idx}
                x={200 - num * 5}
                y={200 - num * 5}
                width={num * 10}
                height={num * 10}
                stroke="rgba(99, 102, 241, 0.3)"
                strokeWidth="1"
                fill="none"
                transform={`rotate(${idx * 60} 200 200)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Title */}
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Divine Design Metrics
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-purple-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Measuring Transformation Through Sacred Geometry
          </motion.p>

          {/* Championship Status Badge */}
          <motion.div
            className="mt-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500">
              <Crown className="w-5 h-5 mr-2" />
              {championshipStatus}
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Live Spiritual Energy Visualizer */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="h-80 bg-black/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Live Spiritual Energy Visualization
                <Badge variant="outline" className="ml-auto">
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SpiritualEnergyVisualizer
                spiritualLevel={realTimeData.spiritualLevel}
                miracleProximity={realTimeData.miracleProximity}
                prayerIntensity={realTimeData.prayerIntensity}
                consciousnessLevel={realTimeData.consciousnessLevel}
                userCount={realTimeData.activeUsers}
                className="h-56"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Divine Insights Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Divine Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InsightCard
              title="Golden Ratio Alignment"
              value={divineAlignment}
              description="Sacred proportions in design"
              icon={<Triangle className="w-8 h-8 text-yellow-400" />}
              color="yellow"
            />
            <InsightCard
              title="Transformation Velocity"
              value={transformationVelocity}
              description="Consciousness elevation speed"
              icon={<Zap className="w-8 h-8 text-purple-400" />}
              color="purple"
            />
            <InsightCard
              title="Legacy Multiplier"
              value={legacyMultiplier}
              description="Generational impact factor"
              icon={<Infinity className="w-8 h-8 text-blue-400" />}
              color="blue"
            />
            <InsightCard
              title="Championship Level"
              value={metrics.alignment.championshipLevel}
              description="Divine performance rating"
              icon={<Crown className="w-8 h-8 text-orange-400" />}
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* Sacred Geometry Metrics */}
      <section className="relative py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Sacred Geometry Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-black/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Circle className="w-5 h-5 text-purple-400" />
                  Divine Proportions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Golden Ratio</span>
                    <span className="font-mono text-yellow-400">
                      φ = {DIVINE_CONSTANTS.GOLDEN_RATIO.toFixed(6)}
                    </span>
                  </div>
                  <Progress
                    value={metrics.geometry.goldenRatioAlignment}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fibonacci Match</span>
                    <span className="font-mono text-blue-400">
                      {metrics.geometry.fibonacciSequenceMatch.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={metrics.geometry.fibonacciSequenceMatch}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sacred Balance</span>
                    <span className="font-mono text-green-400">
                      {metrics.geometry.sacredShapeBalance.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={metrics.geometry.sacredShapeBalance}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Square className="w-5 h-5 text-blue-400" />
                  Transformation Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Awareness</span>
                    <span className="font-mono text-purple-400">
                      {metrics.transformation.awareness.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={metrics.transformation.awareness}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Engagement</span>
                    <span className="font-mono text-blue-400">
                      {metrics.transformation.engagement.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={metrics.transformation.engagement}
                    className="h-2"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Legacy Impact</span>
                    <span className="font-mono text-green-400">
                      {metrics.transformation.legacy.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={metrics.transformation.legacy}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-time Metrics Footer */}
      <footer className="relative py-12 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {realTimeData.activeUsers}
              </div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">
                {realTimeData.prayerIntensity}
              </div>
              <div className="text-gray-400">Prayer Intensity</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {realTimeData.consciousnessLevel}%
              </div>
              <div className="text-gray-400">Consciousness</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">
                {Math.round(realTimeData.miracleProximity * 100)}%
              </div>
              <div className="text-gray-400">Miracle Proximity</div>
            </div>
          </div>

          <div className="mt-8 text-gray-500 text-sm">
            Divine Design Intelligence System • Real-time Sacred Geometry •
            Championship Performance Analytics
          </div>
        </div>
      </footer>
    </div>
  );
};

// Insight Card Component
const InsightCard: React.FC<{
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, description, icon, color }) => {
  return (
    <motion.div
      className={`bg-black/50 border-${color}-500/20 backdrop-blur-lg rounded-2xl p-6 border`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
        <Badge variant="outline" className="text-xs">
          Live
        </Badge>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-3xl font-bold text-white mb-2">
        {typeof value === "number" ? value.toFixed(1) : value}
        {typeof value === "number" && value <= 100 ? "%" : ""}
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default DivineDesignMetricsEnhanced;
