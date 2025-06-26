"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ImpactMetrics {
  heartsBeating: number
  lettersWritten: number
  youthReached: number
  secondsUntilFreedom: number
}

// Global event system for tracking actions
export const impactEvents = {
  addHeart: () => window.dispatchEvent(new Event('newHeart')),
  addLetter: () => window.dispatchEvent(new Event('newLetter')),
  addYouth: () => window.dispatchEvent(new Event('newYouth')),
}

export default function ImpactDashboard() {
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    heartsBeating: 247,
    lettersWritten: 89,
    youthReached: 12,
    secondsUntilFreedom: 8640000 // 100 days in seconds
  })
  const [isExpanded, setIsExpanded] = useState(true)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    // Load saved metrics
    const saved = localStorage.getItem('bridge-metrics')
    if (saved) {
      const parsed = JSON.parse(saved)
      setMetrics(prev => ({
        ...prev,
        heartsBeating: parsed.hearts || prev.heartsBeating,
        lettersWritten: parsed.letters || prev.lettersWritten
      }))
    }

    // Listen for impact events
    const handleImpact = (e: CustomEvent) => {
      const { type } = e.detail
      setShowPulse(true)
      setTimeout(() => setShowPulse(false), 1000)
      
      if (type === 'heart') {
        setMetrics(prev => {
          const newMetrics = { ...prev, heartsBeating: prev.heartsBeating + 1 }
          localStorage.setItem('bridge-metrics', JSON.stringify({
            hearts: newMetrics.heartsBeating,
            letters: newMetrics.lettersWritten
          }))
          return newMetrics
        })
      } else if (type === 'letter') {
        setMetrics(prev => {
          const newMetrics = { ...prev, lettersWritten: prev.lettersWritten + 1 }
          localStorage.setItem('bridge-metrics', JSON.stringify({
            hearts: newMetrics.heartsBeating,
            letters: newMetrics.lettersWritten
          }))
          return newMetrics
        })
        // Special animation for letters
        setIsExpanded(true) // Auto-expand to show the update
      }
    }

    window.addEventListener('impact-update', handleImpact as EventListener)

    // Countdown timer
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        secondsUntilFreedom: prev.secondsUntilFreedom - 1
      }))
    }, 1000)

    return () => {
      clearInterval(interval)
      window.removeEventListener('impact-update', handleImpact as EventListener)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  }

  const handleHeartClick = () => {
    impactEvents.addHeart()
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="bg-gradient text-white rounded-lg p-6 shadow-2xl backdrop-blur max-w-xs"
          >
            {/* Minimize button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 text-holy-gold hover:text-white transition-colors"
              title="Minimize"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <h3 className="text-holy-gold font-bold mb-4 pr-6">LIVE IMPACT</h3>
            
            <div className="space-y-3">
              {/* Hearts - Clickable */}
              <motion.button
                onClick={handleHeartClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 w-full text-left hover:bg-white/10 rounded p-1 -m-1 transition-colors"
              >
                <motion.span 
                  className="text-2xl"
                  animate={showPulse ? { scale: [1, 1.3, 1] } : {}}
                >
                  💗
                </motion.span>
                <span className="font-mono">{metrics.heartsBeating}</span>
                <span className="text-sm">hearts with JAHmere</span>
              </motion.button>

              {/* Letters */}
              <motion.div 
                className="flex items-center gap-2"
                animate={showPulse ? { scale: [1, 1.1, 1] } : {}}
              >
                <motion.span 
                  className="text-2xl"
                  animate={showPulse ? { rotate: [0, 10, -10, 0] } : {}}
                >
                  ✉️
                </motion.span>
                <motion.span 
                  key={metrics.lettersWritten}
                  initial={{ scale: 1.5, color: '#FCD34D' }}
                  animate={{ scale: 1, color: '#FFFFFF' }}
                  className="font-mono"
                >
                  {metrics.lettersWritten}
                </motion.span>
                <span className="text-sm">letters of support</span>
              </motion.div>

              {/* Youth Reached */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <span className="font-mono">{metrics.youthReached}</span>
                <span className="text-sm">youth ready to be mentored</span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                <span className="font-mono text-holy-gold text-sm">
                  {formatTime(metrics.secondsUntilFreedom)}
                </span>
              </div>

              <div className="text-center pt-2 border-t border-holy-gold/30">
                <p className="text-xs opacity-75">until sentencing</p>
                <p className="text-sm font-bold">Every action matters</p>
              </div>

              {/* Tony Dungy connection */}
              <div className="text-xs text-center opacity-80 pt-2 border-t border-holy-gold/30">
                <p className="mt-2">JAHmere's Daily Reading:</p>
                <p className="font-bold">Coach Dungy's "Quiet Strength"</p>
                <p className="text-[10px] mt-1">(Signed by his mentor)</p>
              </div>

              {/* Connection Arrow Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0 }}
                className="text-center mt-2"
              >
                <motion.div
                  animate={{ 
                    x: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="text-xs text-holy-gold"
                >
                  ← Write a letter & watch this number grow!
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsExpanded(true)}
            className="bg-gradient text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
            title="Show impact dashboard"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <span className="text-2xl">📊</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
} 