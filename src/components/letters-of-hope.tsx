"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Send, Sparkles, TrendingUp } from "lucide-react"
import { impactEvents } from "./impact-dashboard"

interface LetterData {
  id: number
  name: string
  location: string
  preview: string
  timestamp: Date
}

export default function LettersOfHope() {
  const [letterCount, setLetterCount] = useState(89)
  const [isWriting, setIsWriting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [recentLetters, setRecentLetters] = useState<LetterData[]>([])
  const [letterForm, setLetterForm] = useState({ name: '', location: '', message: '' })
  const [showImpactBurst, setShowImpactBurst] = useState(false)

  // Load saved count
  useEffect(() => {
    const saved = localStorage.getItem('bridge-metrics')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.letters) setLetterCount(parsed.letters)
    }
  }, [])

  // Listen for letter updates from other components
  useEffect(() => {
    const handleImpact = (e: CustomEvent) => {
      if (e.detail.type === 'letter') {
        setLetterCount(prev => prev + 1)
        setShowImpactBurst(true)
        setTimeout(() => setShowImpactBurst(false), 2000)
      }
    }

    window.addEventListener('impact-update', handleImpact as EventListener)
    return () => window.removeEventListener('impact-update', handleImpact as EventListener)
  }, [])

  const handleSubmitLetter = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!letterForm.name || !letterForm.location || !letterForm.message) return

    // Create immediate visual feedback
    setShowSuccess(true)
    
    // Add to recent letters
    const newLetter: LetterData = {
      id: Date.now(),
      name: letterForm.name,
      location: letterForm.location,
      preview: letterForm.message.slice(0, 50) + '...',
      timestamp: new Date()
    }
    
    setRecentLetters(prev => [newLetter, ...prev].slice(0, 3))
    
    // Update global count
    impactEvents.addLetter()
    
    // Show impact animation
    setShowImpactBurst(true)
    
    // Reset form after delay
    setTimeout(() => {
      setLetterForm({ name: '', location: '', message: '' })
      setIsWriting(false)
      setShowSuccess(false)
      setShowImpactBurst(false)
    }, 3000)
  }

  return (
    <section className="bg-gradient text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Content & Form */}
          <div>
            <h2 className="text-holy-gold mb-6">Letters of Hope</h2>
            <p className="text-xl mb-4">
              Every letter to Judge Ferrero is a voice for transformation. 
              Watch your words join the chorus in real-time.
            </p>
            <p className="mb-6">
              When you write, you're not just sending a letter—you're casting a vote 
              for healing over harm, purpose over punishment.
            </p>
            
            {/* Quick Letter Form */}
            {!isWriting ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWriting(true)}
                className="bg-holy-gold text-sacred-midnight px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                <FileText className="h-5 w-5" />
                Write Your Letter Now
              </motion.button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitLetter}
                className="space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={letterForm.name}
                    onChange={(e) => setLetterForm({ ...letterForm, name: e.target.value })}
                    className="bg-white/20 border border-holy-gold/30 rounded px-4 py-2 text-white placeholder-white/60"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your City"
                    value={letterForm.location}
                    onChange={(e) => setLetterForm({ ...letterForm, location: e.target.value })}
                    className="bg-white/20 border border-holy-gold/30 rounded px-4 py-2 text-white placeholder-white/60"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your message to Judge Ferrero (even a few words matter)..."
                  value={letterForm.message}
                  onChange={(e) => setLetterForm({ ...letterForm, message: e.target.value })}
                  className="w-full bg-white/20 border border-holy-gold/30 rounded px-4 py-2 text-white placeholder-white/60 min-h-[100px]"
                  required
                />
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-holy-gold text-sacred-midnight py-3 rounded-lg font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    Send Letter
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            <p className="text-holy-gold font-bold text-lg mt-6">
              "Your letter could be the one that tips the scales of justice."
            </p>
          </div>

          {/* Right Side - Letter Impact Visualization */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-holy-gold/20 to-royal-purple/20 rounded-2xl p-6 backdrop-blur-sm border border-holy-gold/30 overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {[...Array(5)].map((_, i) => (
                    <motion.path
                      key={i}
                      d={`M ${i * 80} 300 Q ${i * 80 + 40} 150 ${i * 80} 0`}
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-holy-gold" />
                  <h3 className="text-xl font-bold">Letters to Honor Judge Ferrero</h3>
                </div>
                <motion.div
                  animate={{ rotate: showImpactBurst ? 360 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Sparkles className="h-6 w-6 text-holy-gold" />
                </motion.div>
              </div>

              {/* Letter Count with Impact Animation */}
              <div className="relative z-10 text-center mb-6">
                <AnimatePresence>
                  {showImpactBurst && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-32 h-32 bg-holy-gold rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  key={letterCount}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative inline-block"
                >
                  <span className="text-6xl font-bold text-holy-gold">{letterCount}</span>
                  {showSuccess && (
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -50, opacity: 0 }}
                      transition={{ duration: 2 }}
                      className="absolute -top-2 right-0 text-2xl"
                    >
                      +1
                    </motion.div>
                  )}
                </motion.div>
                <p className="text-lg mt-2">Voices for Transformation</p>
              </div>

              {/* Visual Letter Stream */}
              <div className="relative z-10 h-32 mb-6 overflow-hidden">
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-holy-gold">
                        <p className="text-sm font-bold">Your letter is on its way! ✉️</p>
                        <div className="mt-2 flex items-center justify-center">
                          <motion.div
                            animate={{ x: [0, 100] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-holy-gold rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Floating Letters Animation */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl"
                      initial={{ x: -50, y: Math.random() * 100 }}
                      animate={{ 
                        x: 400,
                        y: Math.random() * 100
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        delay: i * 3,
                        ease: "linear"
                      }}
                    >
                      ✉️
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Letters */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-holy-gold font-semibold">Latest Letters:</p>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <AnimatePresence>
                  {recentLetters.length > 0 ? (
                    recentLetters.map((letter, index) => (
                      <motion.div
                        key={letter.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm bg-white/10 rounded-lg px-3 py-2"
                      >
                        <FileText className="h-4 w-4 text-holy-gold flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold">{letter.name} from {letter.location}</p>
                          <p className="text-xs opacity-75">{letter.preview}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm opacity-75">
                      <p>Be the first to write today!</p>
                      <p className="text-xs mt-1">Your words matter.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Connection to Impact Dashboard */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 text-center text-xs mt-4 opacity-75"
              >
                <p>Every letter updates the live counter →</p>
                <p className="text-holy-gold font-semibold">Watch your impact in real-time!</p>
              </motion.div>
            </motion.div>

            {/* Success Celebration */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-holy-gold text-sacred-midnight rounded-lg p-6 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="text-6xl mb-2"
                    >
                      🎉
                    </motion.div>
                    <p className="text-xl font-bold">Thank You!</p>
                    <p className="text-sm">Your voice joins the movement!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
} 