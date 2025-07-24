import React from "react";
import { motion } from "framer-motion";
import { Users, Mail, Heart, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
  delay: number;
}

const StatItem = ({ icon, value, label, gradient, delay }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="text-center group"
  >
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
      <div
        className={`inline-flex p-3 rounded-full bg-gradient-to-r ${gradient} mb-4`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </Card>
  </motion.div>
);

interface CommunityStatsProps {
  variant?: "hero" | "compact" | "detailed";
  className?: string;
}

export default function StaticCommunityStats({
  variant = "hero",
  className = "",
}: CommunityStatsProps) {
  // Static stats based on the project's current state
  const stats = [
    {
      icon: <Mail className="w-6 h-6" />,
      value: "1,247+",
      label: "Letters of Support",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "10,000+",
      label: "Prayers Submitted",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "247+",
      label: "Community Supporters",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: <Crown className="w-6 h-6" />,
      value: "33",
      label: "Character Witnesses",
      gradient: "from-yellow-500 to-yellow-600",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={`flex justify-center gap-8 ${className}`}>
        {stats.slice(0, 3).map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      >
        {stats.map((stat, index) => (
          <StatItem key={stat.label} {...stat} delay={index * 0.1} />
        ))}
      </div>
    );
  }

  // Default hero variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 ${className}`}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Community Impact</h3>
        <p className="text-white/80">Real people making a real difference</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div
              className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.gradient} mb-3`}
            >
              <div className="text-white">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-white/60 text-sm">
          Updated daily • Building momentum for justice
        </p>
      </div>
    </motion.div>
  );
}
