"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { impactEvents } from '@/components/impact-dashboard'

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [supportForm, setSupportForm] = useState({ name: '', email: '', message: '' })
  const [volunteerForm, setVolunteerForm] = useState({ name: '', email: '', skills: '', availability: '' })
  const [supportSubmitted, setSupportSubmitted] = useState(false)
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add letter to impact counter
    impactEvents.addLetter()
    setSupportSubmitted(true)
    
    // Show celebration animation
    const celebration = document.createElement('div')
    celebration.className = 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none'
    celebration.innerHTML = `
      <div class="bg-holy-gold text-sacred-midnight rounded-lg p-8 text-center transform scale-0 animate-celebrate">
        <div class="text-8xl mb-4">🎉</div>
        <p class="text-2xl font-bold mb-2">Your Letter is Flying to Judge Ferrero!</p>
        <p class="text-lg">Watch the counter increase →</p>
      </div>
    `
    document.body.appendChild(celebration)
    
    // Add celebration animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes celebrate {
        0% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      .animate-celebrate {
        animation: celebrate 0.6s ease-out forwards;
      }
    `
    document.head.appendChild(style)
    
    // Remove celebration after animation
    setTimeout(() => {
      celebration.remove()
      style.remove()
    }, 3000)
    
    // Here you would typically send the data to your backend
    console.log('Support letter submitted:', supportForm)
  }

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add heart to impact counter for volunteers
    impactEvents.addHeart()
    setVolunteerSubmitted(true)
    // Here you would typically send the data to your backend
    console.log('Volunteer form submitted:', volunteerForm)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-sacred-midnight text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-sacred-midnight via-royal-purple to-holy-gold opacity-10" />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-holy-gold hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Contact & Support</h1>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Stand With JAHmere
          </h2>
          <p className="text-xl text-holy-gold">
            Your voice matters. Your support creates change.
          </p>
          <p className="mt-4">
            JAHmere is reading Coach Dungy's books in his cell. Your letter could be his next source of hope.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Support Letter Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-holy-gold/20"
          >
            <h3 className="text-2xl font-bold text-holy-gold mb-4">Write a Letter of Support</h3>
            <p className="text-sm mb-6 opacity-90">
              Your letter will be shared with Judge Ferrero and added to JAHmere's case file.
              Every letter strengthens the bridge.
            </p>

            {supportSubmitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  ✉️
                </motion.div>
                <h4 className="text-2xl font-bold text-holy-gold mb-2">Thank You!</h4>
                <p>Your letter has been received and will make a difference.</p>
                <p className="text-sm mt-4 opacity-75">
                  Watch the letter counter increase on the impact dashboard!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="support-name">
                    Your Name
                  </label>
                  <input
                    id="support-name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="support-email">
                    Email
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="support-message">
                    Your Message
                  </label>
                  <textarea
                    id="support-message"
                    required
                    rows={6}
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    placeholder="Share why you believe in second chances, transformation, or JAHmere's mission..."
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
                >
                  Send Letter of Support
                </button>
              </form>
            )}
          </motion.div>

          {/* Volunteer Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-holy-gold/20"
          >
            <h3 className="text-2xl font-bold text-holy-gold mb-4">Volunteer to Help</h3>
            <p className="text-sm mb-6 opacity-90">
              Join the bridge builders. Help transform lives through mentorship and support.
              Coach Dungy taught us that everyone can make a difference.
            </p>

            {volunteerSubmitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  💗
                </motion.div>
                <h4 className="text-2xl font-bold text-holy-gold mb-2">Welcome to the Team!</h4>
                <p>We'll be in touch soon about volunteer opportunities.</p>
                <p className="text-sm mt-4 opacity-75">
                  You've added your heart to our growing community!
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="volunteer-name">
                    Your Name
                  </label>
                  <input
                    id="volunteer-name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="volunteer-email">
                    Email
                  </label>
                  <input
                    id="volunteer-email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="volunteer-skills">
                    How Can You Help?
                  </label>
                  <textarea
                    id="volunteer-skills"
                    required
                    rows={3}
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    placeholder="Mentoring, technical skills, community connections, etc..."
                    value={volunteerForm.skills}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" htmlFor="volunteer-availability">
                    Availability
                  </label>
                  <input
                    id="volunteer-availability"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-white/20 border border-holy-gold/30 focus:border-holy-gold focus:outline-none"
                    placeholder="Weekly, monthly, project-based..."
                    value={volunteerForm.availability}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-3 rounded-full font-bold hover:shadow-lg transition-shadow"
                >
                  Join the Bridge Builders
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-holy-gold/20">
            <h3 className="text-2xl font-bold text-holy-gold mb-4">Direct Contact</h3>
            <p className="mb-4">
              For urgent matters or media inquiries:
            </p>
            <p className="text-xl font-bold">info@thebridgeproject.org</p>
            <p className="text-sm mt-2 opacity-75">(Response within 24-48 hours)</p>
            
            <div className="mt-6 pt-6 border-t border-holy-gold/30">
              <p className="text-sm italic">
                "The measure of a man is not where he stands in moments of comfort, 
                but where he stands at times of challenge and controversy."
              </p>
              <p className="text-sm mt-2">— Martin Luther King Jr.</p>
              <p className="text-xs mt-2 opacity-75">
                (One of Coach Dungy's favorite quotes, now guiding JAHmere)
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 