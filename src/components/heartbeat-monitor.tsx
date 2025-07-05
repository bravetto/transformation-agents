"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Activity, TrendingUp } from "lucide-react"
import { impactEvents } from "./impact-dashboard"

interface HeartbeatMonitorProps {
  className?: string
}

export default function HeartbeatMonitor({ className = "" }: HeartbeatMonitorProps) {
  const [heartCount, setHeartCount] = useState(247)
  const [isBeating, setIsBeating] = useState(true)
  const [showPulse, setShowPulse] = useState(false)
  const [recentHearts, setRecentHearts] = useState<{ id: number; name: string; location: string }[]>([])
  const [hasAddedHeart, setHasAddedHeart] = useState(false)

  // Simulate real-time heartbeats
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setHeartCount(prev => prev + 1)
        setShowPulse(true)
        
        // Add a recent heart
        const names = ["Sarah", "Michael", "Jessica", "David", "Maria", "James", "Linda", "Robert"]
        const locations = ["NYC", "LA", "Chicago", "Houston", "Phoenix", "Philly", "San Antonio", "Dallas"]
        const newHeart = {
          id: Date.now(),
          name: names[Math.floor(Math.random() * names.length)],
          location: locations[Math.floor(Math.random() * locations.length)]
        }
        
        setRecentHearts(prev => [newHeart, ...prev].slice(0, 3))
        
        setTimeout(() => setShowPulse(false), 1000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Heartbeat animation cycle
  useEffect(() => {
    const beatInterval = setInterval(() => {
      setIsBeating(true)
      setTimeout(() => setIsBeating(false), 200)
      setTimeout(() => {
        setIsBeating(true)
        setTimeout(() => setIsBeating(false), 200)
      }, 400)
    }, 2000)

    return () => clearInterval(beatInterval)
  }, [])

  const addHeart = () => {
    setHeartCount(prev => prev + 1)
    setShowPulse(true)
    setTimeout(() => setShowPulse(false), 1000)
    // Dispatch global impact event
    impactEvents.addHeart()
    setHasAddedHeart(true)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Monitor Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 border border-hope-gold/30 shadow-2xl overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 mb-6">
          <Activity className="h-6 w-6 text-hope-gold" />
          <h3 className="text-xl font-bold text-gentle-charcoal">Community Heartbeat</h3>
        </div>

        {/* Main Counter */}
        <div className="relative z-10 text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative inline-block"
          >
            <Heart className="h-24 w-24 text-growth-green fill-current mx-auto" />
            
            {/* Animated beat count */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-6xl font-bold text-hope-gold">{heartCount}</span>
              </motion.div>
            </AnimatePresence>

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-hope-gold/30"
              animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <p className="text-lg mt-2 text-gentle-charcoal font-medium">Hearts Beating with JAHmere</p>
        </div>

        {/* EKG Line */}
        <div className="relative z-10 h-20 mb-4 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true" role="img" aria-label="Heart rate visualization">
            <motion.path
              d="M 0 100 L 50 100 L 60 80 L 70 120 L 80 60 L 90 140 L 100 100 L 400 100"
              stroke="#10B981"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
          
          {/* Moving dot */}
          <motion.div
            className="absolute w-3 h-3 bg-growth-green rounded-full shadow-lg"
            animate={{
              x: [0, 400],
              y: [50, 50, 20, 50, 80, 50, 50]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: '40%' }}
          />
        </div>

        {/* Recent Hearts */}
        <div className="relative z-10">
          <p className="text-sm text-hope-gold font-semibold mb-2">Latest Supporters:</p>
          <AnimatePresence mode="popLayout">
            {recentHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="flex items-center gap-2 py-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="h-4 w-4 text-growth-green fill-current" />
                </motion.div>
                <span className="text-gentle-charcoal font-medium">{heart.name} from {heart.location} joined the movement</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addHeart}
          disabled={hasAddedHeart}
          className="relative z-10 w-full mt-6 bg-hope-gold text-gentle-charcoal py-3 rounded-lg font-bold hover:bg-courage-blue hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {hasAddedHeart ? "Your Heart is Beating with JAHmere ❤️" : "Add Your Heart"}
        </motion.button>

        <p className="relative z-10 text-center text-sm mt-4 text-soft-shadow font-medium">
          Every heart creates a ripple of hope
        </p>
      </motion.div>

      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-4xl"
          >
            💗
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 