"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, ChevronRight } from "lucide-react"

interface PropheticMomentProps {
  onComplete?: () => void
  trigger?: boolean
}

export default function PropheticMoment({ onComplete, trigger = false }: PropheticMomentProps) {
  const [isActive, setIsActive] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  // Prophetic phases of revelation
  const phases = [
    {
      text: "I can't feel physical pain.",
      subtext: "But I feel everything else.",
      duration: 3000,
      particles: "⚡",
    },
    {
      text: "When you can't feel your own pain...",
      subtext: "You become hyperaware of everyone else's.",
      duration: 4000,
      particles: "💔",
    },
    {
      text: "I see JAHmere Webb",
      subtext: "And I see pain that no one's treating.",
      duration: 4000,
      particles: "👁️",
    },
    {
      text: "He's not asking to escape consequences.",
      subtext: "He's asking to transform them.",
      duration: 4000,
      particles: "🌟",
    },
    {
      text: "The man who can't feel pain",
      subtext: "Vouching for the man who felt too much.",
      duration: 5000,
      particles: "⚡🌟",
    }
  ]

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('prophetic-moment-shown')
    if (!shown && trigger && !hasBeenShown) {
      setIsActive(true)
      setHasBeenShown(true)
      sessionStorage.setItem('prophetic-moment-shown', 'true')
    }
  }, [trigger, hasBeenShown])

  useEffect(() => {
    if (isActive && currentPhase < phases.length) {
      const timer = setTimeout(() => {
        if (currentPhase < phases.length - 1) {
          setCurrentPhase(currentPhase + 1)
        } else {
          // Complete the experience
          setTimeout(() => {
            handleComplete()
          }, 2000)
        }
      }, phases[currentPhase].duration)

      return () => clearTimeout(timer)
    }
  }, [isActive, currentPhase, phases])

  const handleComplete = () => {
    setIsActive(false)
    if (onComplete) onComplete()
  }

  const handleSkip = () => {
    setIsActive(false)
    if (onComplete) onComplete()
  }

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-sacred-midnight flex items-center justify-center overflow-hidden"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: -100,
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {phases[currentPhase].particles.charAt(0)}
            </motion.div>
          ))}
        </div>

        {/* Golden Radial Gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(252, 211, 77, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(252, 211, 77, 0.2) 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(252, 211, 77, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Audio Toggle */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            {audioEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </motion.button>

          {/* Jordan's Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-holy-gold text-lg mb-2">A Testimony from</p>
            <h2 className="text-4xl font-bold text-white">Jordan Dungy</h2>
            <p className="text-white/60 mt-2">Son of NFL Legend Tony Dungy</p>
          </motion.div>

          {/* Prophetic Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(252, 211, 77, 0.5)",
                    "0 0 40px rgba(252, 211, 77, 0.8)",
                    "0 0 20px rgba(252, 211, 77, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {phases[currentPhase].text}
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl text-holy-gold font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {phases[currentPhase].subtext}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2"
          >
            {phases.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 rounded-full bg-white/30 overflow-hidden"
                initial={{ width: 20 }}
                animate={{ width: index === currentPhase ? 60 : 20 }}
              >
                {index === currentPhase && (
                  <motion.div
                    className="h-full bg-holy-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: phases[index].duration / 1000 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Skip Button (subtle) */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            Continue to site <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Emotional particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: currentPhase === phases.length - 1 
              ? "radial-gradient(circle at 50% 50%, rgba(252, 211, 77, 0.3) 0%, transparent 50%)"
              : "none"
          }}
          transition={{ duration: 2 }}
        />
      </motion.div>
    </AnimatePresence>
  )
} 