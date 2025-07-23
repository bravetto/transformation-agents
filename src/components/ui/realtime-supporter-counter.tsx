"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Clock } from "lucide-react";

interface SupporterActivity {
  id: string;
  name: string;
  location: string;
  action: string;
  timestamp: number;
}

interface RealtimeSupporterCounterProps {
  initialCount?: number;
  className?: string;
}

// Simulated real-time supporter activities for conversion psychology
const generateSupporterActivity = (): SupporterActivity => {
  const names = [
    "Maria",
    "John",
    "Sarah",
    "David",
    "Jennifer",
    "Michael",
    "Lisa",
    "Robert",
    "Jessica",
    "William",
    "Ashley",
    "James",
    "Emily",
    "Christopher",
    "Amanda",
    "Daniel",
    "Nicole",
    "Matthew",
    "Michelle",
    "Anthony",
    "Stephanie",
    "Mark",
  ];

  const locations = [
    "California",
    "Texas",
    "Florida",
    "New York",
    "Pennsylvania",
    "Illinois",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
    "Virginia",
    "Washington",
    "Arizona",
    "Tennessee",
    "Indiana",
    "Massachusetts",
    "Maryland",
    "Wisconsin",
    "Colorado",
    "Minnesota",
    "Louisiana",
    "Oregon",
    "Nevada",
    "Connecticut",
  ];

  const actions = [
    "wrote a character letter",
    "joined the movement",
    "shared JAHmere's story",
    "signed the petition",
    "made a donation",
    "volunteered to help",
    "sent a prayer",
    "contacted their representative",
  ];

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    timestamp: Date.now(),
  };
};

export function RealtimeSupporterCounter({
  initialCount = 5247,
  className = "",
}: RealtimeSupporterCounterProps) {
  const [supporterCount, setSupporterCount] = useState(initialCount);
  const [recentActivity, setRecentActivity] = useState<SupporterActivity[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate supporter count growth
  useEffect(() => {
    const growthInterval = setInterval(
      () => {
        // Random growth between 1-3 supporters every 30-90 seconds
        if (Math.random() > 0.3) {
          const growth = Math.floor(Math.random() * 3) + 1;
          setSupporterCount((prev) => prev + growth);
        }
      },
      30000 + Math.random() * 60000,
    ); // 30-90 seconds

    return () => clearInterval(growthInterval);
  }, []);

  // Simulate real-time activity feed
  useEffect(() => {
    const activityInterval = setInterval(
      () => {
        const newActivity = generateSupporterActivity();
        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 4)]); // Keep last 5 activities

        // Hide and show for brief animation
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 100);
      },
      8000 + Math.random() * 12000,
    ); // 8-20 seconds

    // Generate initial activity
    const initialActivities = Array.from(
      { length: 3 },
      generateSupporterActivity,
    );
    setRecentActivity(initialActivities);

    return () => clearInterval(activityInterval);
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Real-time Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div className="text-center">
              <motion.div
                key={supporterCount}
                initial={{ scale: 1.1, color: "#059669" }}
                animate={{ scale: 1, color: "#374151" }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-gray-900"
              >
                {supporterCount.toLocaleString()}
              </motion.div>
              <div className="text-xs text-gray-600 uppercase tracking-wider">
                Total Supporters
              </div>
            </div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">94/100</div>
            <div className="text-xs text-gray-600 uppercase tracking-wider">
              Impact Score
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Feed */}
      <AnimatePresence mode="wait">
        {isVisible && recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-blue-50 rounded-lg p-3 border border-blue-200"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="font-medium text-blue-900">
                  {recentActivity[0]?.name}
                </span>
                <span className="text-blue-700 mx-1">from</span>
                <span className="font-medium text-blue-900">
                  {recentActivity[0]?.location}
                </span>
                <span className="text-blue-700 mx-1">just</span>
                <span className="font-medium text-blue-900">
                  {recentActivity[0]?.action}
                </span>
              </div>
              <Clock className="w-3 h-3 text-blue-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Geographic Distribution Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
          <MapPin className="w-3 h-3" />
          <span>Supporters from all 50 states</span>
        </div>
      </motion.div>
    </div>
  );
}
