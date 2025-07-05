"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Send, Sparkles, TrendingUp } from "lucide-react"
import { impactEvents } from "./impact-dashboard"
import DivineParticles from "./divine-particles"
import { SacredReveal, MagneticButton, FloatingElement } from "./sacred-animations"
import { AutoAnimateList } from "./auto-animate-wrapper"

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
    <section className="bg-comfort-cream relative overflow-hidden py-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#F59E0B" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Content & Form */}
          <div>
            <div>
              <h2 className="text-4xl font-bold text-hope-gold mb-6">Letters of Hope</h2>
              <p className="text-xl text-gentle-charcoal mb-4">
                Every letter to Judge Ferrero is a voice for transformation. 
                Watch your words join the chorus in real-time.
              </p>
              <p className="text-soft-shadow mb-6">
                When you write, you're not just sending a letter—you're casting a vote 
                for healing over harm, purpose over punishment.
              </p>
            </div>
            
            {/* Quick Letter Form */}
            {!isWriting ? (
              <button 
                onClick={() => setIsWriting(true)}
                className="bg-hope-gold text-gentle-charcoal px-6 py-3 rounded-lg font-bold hover:bg-courage-blue hover:text-white transition-colors flex items-center gap-2 inline-flex"
              >
                <FileText className="h-5 w-5" />
                Write Your Letter Now
              </button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmitLetter}
                className="space-y-4 bg-white rounded-lg p-6 shadow-lg border border-hope-gold/30"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={letterForm.name}
                    onChange={(e) => setLetterForm({ ...letterForm, name: e.target.value })}
                    className="bg-soft-cloud border border-moon-glow rounded px-4 py-2 text-gentle-charcoal placeholder-soft-shadow"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your City"
                    value={letterForm.location}
                    onChange={(e) => setLetterForm({ ...letterForm, location: e.target.value })}
                    className="bg-soft-cloud border border-moon-glow rounded px-4 py-2 text-gentle-charcoal placeholder-soft-shadow"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your message to Judge Ferrero (even a few words matter)..."
                  value={letterForm.message}
                  onChange={(e) => setLetterForm({ ...letterForm, message: e.target.value })}
                  className="w-full bg-soft-cloud border border-moon-glow rounded px-4 py-2 text-gentle-charcoal placeholder-soft-shadow min-h-[100px]"
                  required
                />
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-hope-gold text-gentle-charcoal py-3 rounded-lg font-bold hover:bg-courage-blue hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    Send Letter
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="px-6 py-3 border border-soft-shadow rounded-lg hover:bg-moon-glow transition-colors text-gentle-charcoal"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            <p className="text-hope-gold font-bold text-lg mt-6">
              "Your letter could be the one that tips the scales of justice."
            </p>
          </div>

          {/* Right Side - Letter Impact Visualization */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-hope-gold/30 shadow-lg overflow-hidden"
            >
              {/* Animated Background */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 300" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <motion.path
                      key={i}
                      d={`M ${i * 80} 300 Q ${i * 80 + 40} 150 ${i * 80} 0`}
                      stroke="#F59E0B"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.1"
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
                  <FileText className="h-6 w-6 text-hope-gold" />
                  <h3 className="text-xl font-bold text-gentle-charcoal">Letters to Honor Judge Ferrero</h3>
                </div>
                <motion.div
                  animate={{ rotate: showImpactBurst ? 360 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Sparkles className="h-6 w-6 text-hope-gold" />
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
                      <div className="w-32 h-32 bg-hope-gold/20 rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  key={letterCount}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative inline-block"
                >
                  <span className="text-6xl font-bold text-hope-gold">{letterCount}</span>
                  {showSuccess && (
                    <motion.div
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -50, opacity: 0 }}
                      transition={{ duration: 2 }}
                      className="absolute -top-2 right-0 text-2xl text-growth-green"
                    >
                      +1
                    </motion.div>
                  )}
                </motion.div>
                <p className="text-lg mt-2 text-gentle-charcoal font-medium">Voices for Transformation</p>
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
                      <div className="bg-soft-cloud rounded-lg p-4 border border-hope-gold">
                        <p className="text-sm font-bold text-gentle-charcoal">Your letter is on its way! ✉️</p>
                        <div className="mt-2 flex items-center justify-center">
                          <motion.div
                            animate={{ x: [0, 100] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-hope-gold rounded-full"
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
                  <p className="text-sm text-hope-gold font-semibold">Latest Letters:</p>
                  <TrendingUp className="h-4 w-4 text-growth-green" />
                </div>
                
                {recentLetters.length > 0 ? (
                  <AutoAnimateList
                    items={recentLetters}
                    renderItem={(letter, index) => (
                      <div className="flex items-start gap-2 text-sm bg-soft-cloud rounded-lg px-3 py-2">
                        <FileText className="h-4 w-4 text-hope-gold flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold text-gentle-charcoal">{letter.name} from {letter.location}</p>
                          <p className="text-sm text-soft-shadow">{letter.preview}</p>
                        </div>
                      </div>
                    )}
                    keyExtractor={(letter) => letter.id}
                    duration={400}
                  />
                ) : (
                  <div className="text-center py-4 text-sm text-soft-shadow">
                    <p className="font-medium text-gentle-charcoal">Be the first to write today!</p>
                    <p className="text-sm mt-1 text-soft-shadow">Your words matter.</p>
                  </div>
                )}
              </div>

              {/* Connection to Impact Dashboard */}
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 text-center text-sm mt-4 text-soft-shadow"
              >
                <p>Every letter updates the live counter →</p>
                <p className="text-hope-gold font-semibold">Watch your impact in real-time!</p>
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
                  <div className="bg-hope-gold text-gentle-charcoal rounded-lg p-6 text-center shadow-xl">
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