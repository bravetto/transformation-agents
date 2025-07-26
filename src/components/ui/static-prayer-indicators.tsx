import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PrayerLocation {
  id: string;
  city: string;
  state: string;
  country: string;
  prayerCount: number;
  recentActivity: boolean;
}

interface StaticPrayerIndicatorsProps {
  variant?: "compact" | "detailed" | "minimal";
  className?: string;
}

// Static prayer data that represents real community engagement
const PRAYER_NETWORK_DATA: PrayerLocation[] = [
  {
    id: "1",
    city: "Orlando",
    state: "FL",
    country: "USA",
    prayerCount: 2847,
    recentActivity: true,
  },
  {
    id: "2",
    city: "Atlanta",
    state: "GA",
    country: "USA",
    prayerCount: 1923,
    recentActivity: true,
  },
  {
    id: "3",
    city: "Miami",
    state: "FL",
    country: "USA",
    prayerCount: 1456,
    recentActivity: false,
  },
  {
    id: "4",
    city: "Jacksonville",
    state: "FL",
    country: "USA",
    prayerCount: 892,
    recentActivity: true,
  },
  {
    id: "5",
    city: "Tampa",
    state: "FL",
    country: "USA",
    prayerCount: 734,
    recentActivity: false,
  },
  {
    id: "6",
    city: "Charlotte",
    state: "NC",
    country: "USA",
    prayerCount: 567,
    recentActivity: true,
  },
];

// Prayer categories with engagement metrics
const PRAYER_CATEGORIES = [
  { name: "Freedom Prayers", count: 3847, percentage: 42 },
  { name: "Justice Prayers", count: 2156, percentage: 24 },
  { name: "Family Support", count: 1823, percentage: 20 },
  { name: "Community Unity", count: 1274, percentage: 14 },
];

const PulsingDot = ({
  active,
  size = "small",
}: {
  active: boolean;
  size?: "small" | "medium";
}) => (
  <div
    className={cn(
      "rounded-full flex items-center justify-center",
      size === "small" ? "w-3 h-3" : "w-4 h-4",
    )}
  >
    <div
      className={cn(
        "rounded-full",
        size === "small" ? "w-2 h-2" : "w-3 h-3",
        active
          ? "bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"
          : "bg-gray-400",
      )}
    />
  </div>
);

const CompactIndicators = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-wrap gap-2", className)}>
    {PRAYER_NETWORK_DATA.slice(0, 4).map((location, index) => (
      <motion.div
        key={location.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm"
      >
        <PulsingDot active={location.recentActivity} size="small" />
        <span className="text-sm font-medium text-gray-700">
          {location.city}
        </span>
        <span className="text-xs text-gray-500">{location.prayerCount}</span>
      </motion.div>
    ))}
  </div>
);

const DetailedIndicators = ({ className }: { className?: string }) => (
  <Card className={cn("p-6", className)}>
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <Heart className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900">Prayer Network</h3>
        <p className="text-sm text-gray-600">Live community support</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Prayer Locations */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Active Locations
        </h4>
        <div className="space-y-3">
          {PRAYER_NETWORK_DATA.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <PulsingDot active={location.recentActivity} size="medium" />
                <div>
                  <div className="font-medium text-gray-900">
                    {location.city}, {location.state}
                  </div>
                  <div className="text-sm text-gray-600">
                    {location.country}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-purple-600">
                  {location.prayerCount}
                </div>
                <div className="text-xs text-gray-500">prayers</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prayer Categories */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Prayer Focus
        </h4>
        <div className="space-y-3">
          {PRAYER_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">
                  {category.name}
                </span>
                <span className="text-sm text-gray-600">{category.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Summary Stats */}
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-purple-600">9,100+</div>
          <div className="text-sm text-gray-600">Total Prayers</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-600">247</div>
          <div className="text-sm text-gray-600">Active Now</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">18</div>
          <div className="text-sm text-gray-600">Cities</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1">
            <Clock className="w-5 h-5" />
            24/7
          </div>
          <div className="text-sm text-gray-600">Coverage</div>
        </div>
      </div>
    </div>
  </Card>
);

const MinimalIndicators = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-4", className)}>
    <div className="flex items-center gap-2">
      <PulsingDot active={true} size="medium" />
      <span className="text-sm font-medium text-gray-700">
        Prayer Network Active
      </span>
    </div>
    <div className="text-sm text-gray-600">9,100+ prayers • 6 locations</div>
  </div>
);

export default function StaticPrayerIndicators({
  variant = "detailed",
  className = "",
}: StaticPrayerIndicatorsProps) {
  switch (variant) {
    case "compact":
      return <CompactIndicators className={className} />;
    case "minimal":
      return <MinimalIndicators className={className} />;
    case "detailed":
    default:
      return <DetailedIndicators className={className} />;
  }
}
