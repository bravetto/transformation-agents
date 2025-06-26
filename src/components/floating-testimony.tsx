"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonies = [
  {
    text: "When things happen to us that aren't exactly what we had hoped for, there's only one response that will help us move on. Get over it, get up, and try it again.",
    author: "Tony Dungy",
    emoji: "🙏"
  },
  {
    text: "We have so many young men growing up without their dads. We have to fill that void. We have to do a better job helping them see what it means to be a man.",
    author: "Tony Dungy",
    emoji: "💪"
  },
  {
    text: "If you want to make a difference in the lives of people, you must walk alongside them, lift and encourage them, spend time with them, not shout down from on high.",
    author: "Tony Dungy",
    emoji: "🤝"
  },
  {
    text: "Sometimes I think God wants there to be a circus so we can show there's another way to respond.",
    author: "Tony Dungy",
    emoji: "✨"
  },
  {
    text: "Part of our purpose in life is to build a legacy – a consistent pattern of building into the lives of others.",
    author: "Tony Dungy",
    emoji: "🌟"
  },
  {
    text: "We need somebody to give us a chance.",
    author: "Tony Dungy",
    emoji: "🔑"
  },
  {
    text: "You can't always control circumstances. However, you can always control your attitude, approach, and response.",
    author: "Tony Dungy",
    emoji: "💡"
  },
  {
    text: "I don't have the strength or wisdom to get through a single day without guidance and grace from God.",
    author: "Tony Dungy",
    emoji: "🕊️"
  },
  {
    text: "I'm reading Coach's book in my cell right now. 'Quiet Strength' is teaching me how to lead from behind bars.",
    author: "JAHmere Webb",
    emoji: "📖"
  },
  {
    text: "The Lord has a plan. We always think the plans are A, B, C and D, and everything is going to be perfect for us and it may not be that way, but it's still his plan.",
    author: "Tony Dungy",
    emoji: "🎯"
  }
]

export default function FloatingTestimony() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Check if user has previously closed it
    const wasMinimized = localStorage.getItem('testimony-minimized')
    if (wasMinimized === 'true') {
      setIsMinimized(true)
    }
    
    // Show after 3 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 3000)
    
    // Rotate testimonies
    const interval = setInterval(() => {
      if (!isMinimized) {
        setCurrentIndex((prev) => (prev + 1) % testimonies.length)
      }
    }, 8000) // Slightly longer for these meaningful quotes

    return () => {
      clearTimeout(showTimer)
      clearInterval(interval)
    }
  }, [isMinimized])

  const handleMinimize = () => {
    setIsMinimized(true)
    setHasInteracted(true)
    localStorage.setItem('testimony-minimized', 'true')
  }

  const handleRestore = () => {
    setIsMinimized(false)
    localStorage.removeItem('testimony-minimized')
  }

  if (!isVisible) return null

  const current = testimonies[currentIndex]

  return (
    <>
      {/* Minimized State - Small floating button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleRestore}
            className="fixed top-4 right-4 z-40 bg-gradient text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            title="Show testimonies"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-2xl"
            >
              💬
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Testimony */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-4 z-40 max-w-md"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-holy-gold/10 blur-2xl" />
              
              {/* Card */}
              <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-holy-gold/20">
                {/* Close button */}
                <button
                  onClick={handleMinimize}
                  className="absolute -top-2 -right-2 bg-royal-purple text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-royal-purple/80 transition-colors"
                  title="Minimize"
                >
                  ×
                </button>

                {/* Floating emoji */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl"
                >
                  {current.emoji}
                </motion.div>
                
                {/* Quote */}
                <blockquote className="text-center pt-2">
                  <p className="text-base md:text-lg text-sacred-midnight font-medium mb-3">
                    "{current.text}"
                  </p>
                  <footer className="text-sm text-royal-purple font-bold">
                    — {current.author}
                  </footer>
                </blockquote>
                
                {/* Progress dots */}
                <div className="flex justify-center gap-1 mt-4">
                  {testimonies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-8 bg-holy-gold' 
                          : 'w-1.5 bg-royal-purple/30 hover:bg-royal-purple/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Context hint */}
                {!hasInteracted && (
                  <p className="text-xs text-center mt-3 text-royal-purple/60">
                    Coach Dungy's wisdom • Click × to minimize
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 