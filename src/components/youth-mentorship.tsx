"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Send, Share2, TrendingUp, Users, Star } from "lucide-react"
import { impactEvents } from './impact-dashboard'

interface YouthMessage {
  id: string
  to: 'JAHmere' | 'Judge Ferrero' | 'Tony Dungy' | 'Jordan Dungy'
  message: string
  name: string
  age: number
  timestamp: Date
}

export default function YouthMentorship() {
  const [youthCount, setYouthCount] = useState(15)
  const [isWriting, setIsWriting] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState<YouthMessage['to']>('JAHmere')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showViral, setShowViral] = useState(false)
  const [recentMessages, setRecentMessages] = useState<YouthMessage[]>([])

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem('youthMentorshipData')
    if (saved) {
      const data = JSON.parse(saved)
      setYouthCount(data.count || 15)
      setRecentMessages(data.messages || [])
    }

    // Listen for global impact events
    const handleNewYouth = () => {
      setYouthCount(prev => {
        const newCount = prev + 1
        localStorage.setItem('youthMentorshipData', JSON.stringify({
          count: newCount,
          messages: recentMessages
        }))
        return newCount
      })
    }

    window.addEventListener('newYouthMessage', handleNewYouth)
    return () => window.removeEventListener('newYouthMessage', handleNewYouth)
  }, [recentMessages])

  const recipients = [
    { value: 'JAHmere', label: 'JAHmere Webb', emoji: '🌉' },
    { value: 'Judge Ferrero', label: 'Honor Judge Ferrero', emoji: '⚖️' },
    { value: 'Tony Dungy', label: 'Coach Tony Dungy', emoji: '🏈' },
    { value: 'Jordan Dungy', label: 'Jordan Dungy', emoji: '⚡' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create new message
    const newMessage: YouthMessage = {
      id: Date.now().toString(),
      to: selectedRecipient,
      message: formData.message,
      name: formData.name,
      age: parseInt(formData.age),
      timestamp: new Date()
    }

    // Add to recent messages
    const updatedMessages = [newMessage, ...recentMessages.slice(0, 4)]
    setRecentMessages(updatedMessages)

    // Update count and save
    const newCount = youthCount + 1
    setYouthCount(newCount)
    
    localStorage.setItem('youthMentorshipData', JSON.stringify({
      count: newCount,
      messages: updatedMessages
    }))

    // Trigger global events
    impactEvents.addYouth()
    window.dispatchEvent(new Event('newYouthMessage'))

    // Show success animation
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setShowViral(true)
    }, 2000)

    // Reset form
    setFormData({ name: '', age: '', message: '' })
    setIsWriting(false)
  }

  const shareMessage = () => {
    const shareText = `I just shared my hopes & dreams with ${selectedRecipient} through The Bridge Project! Join ${youthCount} youth ready to be mentored. 🌉✨ #BridgeOverPrison`
    
    if (navigator.share) {
      navigator.share({
        title: 'The Bridge Project',
        text: shareText,
        url: window.location.origin
      })
    } else {
      navigator.clipboard.writeText(shareText)
    }
  }

  return (
    <section className="bg-comfort-cream py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side - Content & Form */}
          <div>
            <h2 className="text-gentle-charcoal text-3xl font-bold mb-6">Youth Ready to Be Mentored</h2>
            <p className="text-xl text-courage-blue mb-4">
              Young voices speaking truth to power. Dreams waiting to be guided. 
              Hope looking for direction.
            </p>
            <p className="mb-6 text-soft-shadow">
              Write your letter of hope. Share your dreams. Tell them why mentorship 
              matters. Your voice joins a movement of transformation.
            </p>
            
            {/* Quick Write Form */}
            {!isWriting ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWriting(true)}
                className="bg-courage-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-courage-blue/90 transition-colors flex items-center gap-2"
              >
                <Star className="h-5 w-5" />
                Share Your Dreams
              </motion.button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-lg border border-quiet-stone shadow-md"
              >
                {/* Recipient Selection */}
                <div className="grid grid-cols-2 gap-2">
                  {recipients.map((recipient) => (
                    <button
                      key={recipient.value}
                      type="button"
                      onClick={() => setSelectedRecipient(recipient.value as YouthMessage['to'])}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedRecipient === recipient.value
                          ? 'border-courage-blue bg-courage-blue/10'
                          : 'border-quiet-stone hover:border-courage-blue/50'
                      }`}
                    >
                      <span className="text-2xl">{recipient.emoji}</span>
                      <p className="text-sm font-medium mt-1 text-gentle-charcoal">{recipient.label}</p>
                    </button>
                  ))}
                </div>

                {/* Name & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2 border border-quiet-stone rounded-lg focus:border-courage-blue focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    min="13"
                    max="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="px-4 py-2 border border-quiet-stone rounded-lg focus:border-courage-blue focus:outline-none"
                    required
                  />
                </div>

                {/* Message */}
                <textarea
                  placeholder={`Dear ${selectedRecipient}, my hopes and dreams are...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 border border-quiet-stone rounded-lg focus:border-courage-blue focus:outline-none resize-none"
                  rows={4}
                  required
                />

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-courage-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-courage-blue/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="px-4 py-2 border border-quiet-stone rounded-lg hover:bg-soft-cloud transition-colors text-soft-shadow"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            {/* Impact Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-soft-shadow"
            >
              <p>
                💫 Every message creates a ripple of hope<br />
                🌟 Your voice matters in this movement<br />
                🌉 Together, we're building bridges to better futures
              </p>
            </motion.div>
          </div>

          {/* Right Side - Visual Counter */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 overflow-hidden shadow-md border border-hope-gold/30"
            >
              {/* Subtle Background */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 300" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={Math.random() * 400}
                      cy={Math.random() * 300}
                      r="2"
                      fill="#F59E0B"
                      opacity="0.2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 0.2, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-hope-gold" />
                  <h3 className="text-xl font-bold text-gentle-charcoal">Young Voices Rising</h3>
                </div>
                <motion.div
                  animate={{ rotate: showSuccess ? 360 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Sparkles className="h-6 w-6 text-hope-gold" />
                </motion.div>
              </div>

              {/* Youth Count */}
              <div className="relative z-10 text-center mb-6">
                <motion.div
                  key={youthCount}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative inline-block"
                >
                  <span className="text-6xl font-bold text-hope-gold">{youthCount}</span>
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
                <p className="text-lg mt-2 text-gentle-charcoal font-semibold">Youth Ready for Mentorship</p>
                <p className="text-sm text-soft-shadow mt-1">
                  Each one represents a life waiting to be transformed
                </p>
              </div>

              {/* Recent Messages Preview */}
              <div className="relative z-10 space-y-2 mb-4">
                <p className="text-sm font-semibold text-hope-gold mb-2">Recent Dreams Shared:</p>
                <AnimatePresence>
                  {recentMessages.slice(0, 3).map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-soft-cloud rounded-lg p-3 text-sm border border-quiet-stone"
                    >
                      <p className="font-medium text-hope-gold">
                        {msg.name}, {msg.age} → {msg.to}
                      </p>
                      <p className="text-soft-shadow line-clamp-2 text-xs mt-1">
                        "{msg.message}"
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Call to Action */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 text-center text-sm"
              >
                <p className="text-hope-gold font-semibold">
                  Your voice could be next →
                </p>
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
                  <div className="bg-hope-gold text-gentle-charcoal rounded-lg p-6 text-center shadow-md">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1 }}
                      className="text-6xl mb-2"
                    >
                      ✨
                    </motion.div>
                    <p className="text-xl font-bold">Dream Received!</p>
                    <p className="text-sm mt-1">Your hope is part of the movement!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Viral Share Prompt */}
            <AnimatePresence>
              {showViral && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md p-4 border border-quiet-stone"
                >
                  <p className="text-sm font-bold text-gentle-charcoal mb-2">
                    Share your hope with the world!
                  </p>
                  <button
                    onClick={shareMessage}
                    className="w-full bg-courage-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-courage-blue/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Your Message
                  </button>
                  <button
                    onClick={() => setShowViral(false)}
                    className="w-full mt-2 text-sm text-soft-shadow hover:text-gentle-charcoal"
                  >
                    Maybe later
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
} 