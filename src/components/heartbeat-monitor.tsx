"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Activity } from "lucide-react"

interface HeartbeatMonitorProps {
  className?: string
}

export default function HeartbeatMonitor({ className = "" }: HeartbeatMonitorProps) {
  const [heartCount, setHeartCount] = useState(247)
  const [isBeating, setIsBeating] = useState(true)
  const [showPulse, setShowPulse] = useState(false)
  const [recentHearts, setRecentHearts] = useState<{ id: number; name: string; location: string }[]>([])

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

  return (
    <div className={`relative ${className}`}>
      {/* Main Monitor Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-sacred-midnight to-royal-purple rounded-2xl p-6 text-white shadow-2xl overflow-hidden"
      >
        {/* ECG Line Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <motion.path
              d="M 0 100 L 50 100 L 60 80 L 70 120 L 80 60 L 90 140 L 100 100 L 400 100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-holy-gold" />
            <h3 className="text-xl font-bold">Community Heartbeat</h3>
          </div>
          <motion.div
            animate={isBeating ? { scale: 1.2 } : { scale: 1 }}
            className="text-red-500"
          >
            <Heart className="h-6 w-6 fill-current" />
          </motion.div>
        </div>

        {/* Heart Count */}
        <div className="relative z-10 text-center mb-6">
          <motion.div
            key={heartCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative inline-block"
          >
            <span className="text-6xl font-bold text-holy-gold">{heartCount}</span>
            {showPulse && (
              <motion.div
                className="absolute inset-0 rounded-full bg-holy-gold/50"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>
          <p className="text-lg mt-2">Hearts Beating with JAHmere</p>
        </div>

        {/* Live Pulse Visualization */}
        <div className="relative z-10 h-24 mb-6 flex items-center justify-center">
          <svg width="100%" height="100" viewBox="0 0 400 100" className="overflow-visible">
            {/* Background grid */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
            <rect width="400" height="100" fill="url(#grid)" />
            
            {/* Heartbeat line */}
            <motion.path
              d="M 0,50 L 100,50 L 120,50 L 130,20 L 140,80 L 150,10 L 160,90 L 170,50 L 180,50 L 200,50 L 210,45 L 220,55 L 230,50 L 400,50"
              stroke="#FCD34D"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, repeat: Infinity },
                opacity: { duration: 0.5 }
              }}
            />
            
            {/* Glow effect */}
            <motion.path
              d="M 0,50 L 100,50 L 120,50 L 130,20 L 140,80 L 150,10 L 160,90 L 170,50 L 180,50 L 200,50 L 210,45 L 220,55 L 230,50 L 400,50"
              stroke="#FCD34D"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Recent Hearts */}
        <div className="relative z-10 space-y-2">
          <p className="text-sm text-holy-gold font-semibold mb-2">Latest Supporters:</p>
          <AnimatePresence>
            {recentHearts.map((heart, index) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2"
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>{heart.name} from {heart.location} joined the movement</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setHeartCount(prev => prev + 1)
            setShowPulse(true)
            setTimeout(() => setShowPulse(false), 1000)
          }}
          className="relative z-10 w-full mt-6 bg-holy-gold text-sacred-midnight py-3 rounded-lg font-bold hover:bg-white transition-colors"
        >
          Add Your Heartbeat 💗
        </motion.button>

        {/* Motivational Text */}
        <p className="relative z-10 text-center text-xs mt-4 opacity-75">
          "Every heartbeat is a vote for transformation over incarceration"
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