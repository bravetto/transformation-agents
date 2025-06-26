"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart, FileText, Users, Home, CheckCircle, BarChart } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/jordan-letter", label: "Jordan's Testimony", icon: <Heart className="h-4 w-4" /> },
    { href: "/letter-to-dungy", label: "Letter to Coach", icon: <FileText className="h-4 w-4" /> },
    { href: "/contact", label: "Take Action", icon: <Users className="h-4 w-4" /> },
    { href: "/check-in", label: "Check-In", icon: <CheckCircle className="h-4 w-4" /> },
    { href: "/dashboard/judge", label: "Judge Dashboard", icon: <BarChart className="h-4 w-4" /> },
  ]

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-royal-purple to-sacred-midnight backdrop-blur-lg shadow-lg' 
            : 'bg-gradient-to-b from-sacred-midnight/80 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <img 
                  src="/images/logo-white.png" 
                  alt="The Bridge Project" 
                  className="h-10 w-auto"
                />
              </motion.div>
              <span className="text-white font-bold text-lg hidden sm:inline">THE BRIDGE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-white/90 hover:text-holy-gold transition-colors"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-holy-gold transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-gradient-to-br from-royal-purple to-sacred-midnight backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col pt-20 px-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-white hover:text-holy-gold transition-colors py-4 border-b border-white/10"
                  >
                    {item.icon}
                    <span className="text-lg">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-holy-gold font-bold text-lg mb-2">
                  Clear Eyes. Full Hearts. Can't Lose.
                </p>
                <p className="text-white/60 text-sm">
                  Transforming Justice Through Divine Technology
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 