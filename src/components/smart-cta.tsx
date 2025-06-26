"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Heart, FileText, Users, ArrowRight, Clock, AlertCircle } from "lucide-react"

interface SmartCTAProps {
  userType?: 'judge' | 'supporter' | 'visitor'
}

export default function SmartCTA({ userType = 'visitor' }: SmartCTAProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [timeOnSite, setTimeOnSite] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentCTA, setCurrentCTA] = useState(0)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on site
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Smart CTA Logic
  const getCTAConfig = () => {
    // For Judge Ferrero
    if (userType === 'judge') {
      if (scrollProgress > 80) {
        return {
          title: "Ready to Transform Justice?",
          subtitle: "View the complete compliance dashboard",
          action: "Access Judge Dashboard",
          link: "/dashboard/judge",
          icon: <AlertCircle className="h-5 w-5" />,
          color: "from-green-500 to-blue-600"
        }
      }
      return {
        title: "See the Evidence",
        subtitle: "Real-time accountability and impact metrics",
        action: "View Dashboard",
        link: "/dashboard/judge",
        icon: <AlertCircle className="h-5 w-5" />,
        color: "from-royal-purple to-sacred-midnight"
      }
    }

    // Time-based CTAs
    if (timeOnSite > 120) {
      return {
        title: "You've Been Here 2+ Minutes",
        subtitle: "That means you care. Let's make it count.",
        action: "Write a Letter of Support",
        link: "/contact",
        icon: <FileText className="h-5 w-5" />,
        color: "from-holy-gold to-royal-purple"
      }
    }

    // Scroll-based CTAs
    if (scrollProgress > 75) {
      return {
        title: "You've Read JAHmere's Story",
        subtitle: "Now help write the next chapter",
        action: "Join the Movement",
        link: "/contact",
        icon: <Users className="h-5 w-5" />,
        color: "from-royal-purple to-holy-gold"
      }
    }

    if (scrollProgress > 50) {
      return {
        title: "Transformation > Incarceration",
        subtitle: "Add your voice to the chorus",
        action: "Support JAHmere",
        link: "/contact",
        icon: <Heart className="h-5 w-5" />,
        color: "from-red-500 to-pink-600"
      }
    }

    // Default CTA
    return {
      title: "Every Second Counts",
      subtitle: "JAHmere's future is being decided now",
      action: "Take Action",
      link: "/contact",
      icon: <Clock className="h-5 w-5" />,
      color: "from-royal-purple to-sacred-midnight"
    }
  }

  const config = getCTAConfig()

  // Rotation for variety
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      setCurrentCTA(prev => (prev + 1) % 3)
    }, 15000)

    return () => clearInterval(rotateTimer)
  }, [])

  return (
    <>
      {/* Floating Smart CTA */}
      <AnimatePresence>
        {scrollProgress > 20 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 z-30 max-w-sm"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-r ${config.color} rounded-2xl p-6 text-white shadow-2xl`}
            >
              {/* Urgency Indicator */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2"
              >
                <div className="h-3 w-3 bg-white rounded-full" />
              </motion.div>

              {/* Content */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-white/20 rounded-lg p-3">
                  {config.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{config.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{config.subtitle}</p>
                  <Link
                    href={config.link}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {config.action}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 bg-white/10 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-white/50"
                  initial={{ width: "0%" }}
                  animate={{ width: `${scrollProgress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Pulse for New Visitors */}
      {!hasInteracted && timeOnSite < 10 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => {
            setHasInteracted(true)
            window.location.href = "/contact"
          }}
          className="fixed bottom-20 right-4 z-30"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(252, 211, 77, 0)",
                "0 0 0 20px rgba(252, 211, 77, 0.2)",
                "0 0 0 0 rgba(252, 211, 77, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-holy-gold text-sacred-midnight rounded-full p-4 shadow-lg"
          >
            <Heart className="h-6 w-6 fill-current" />
          </motion.div>
        </motion.button>
      )}

      {/* Top Bar CTA for High Intent */}
      <AnimatePresence>
        {scrollProgress > 90 && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-holy-gold to-royal-purple text-white p-4"
          >
            <div className="container mx-auto flex items-center justify-between">
              <p className="font-bold">
                You've read the whole story. Now it's time to act.
              </p>
              <Link
                href="/contact"
                className="bg-white text-royal-purple px-6 py-2 rounded-lg font-bold hover:bg-holy-gold hover:text-sacred-midnight transition-colors"
              >
                I'm Ready to Help
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 