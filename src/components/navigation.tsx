"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart, FileText, Users, Home, ChevronDown } from "lucide-react"
import { Container, Button, Popover, PopoverTrigger, PopoverContent } from "@/components/ui"

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Story", icon: <Home className="h-4 w-4" /> },
  { href: "#truth", label: "Truth", icon: <Heart className="h-4 w-4" /> },
  { 
    href: "/people", 
    label: "People", 
    icon: <Users className="h-4 w-4" />,
    children: [
      { href: "/people/jahmere-webb", label: "JAHmere Webb", icon: <Users className="h-4 w-4" /> },
      { href: "/people/martha-henderson", label: "Martha Henderson", icon: <Users className="h-4 w-4" /> },
      { href: "/people/jordan-dungy", label: "Jordan Dungy", icon: <Users className="h-4 w-4" /> },
      { href: "/people/michael-mataluni", label: "Michael Mataluni", icon: <Users className="h-4 w-4" /> },
      { href: "/people/coach-dungy", label: "Coach Dungy", icon: <Users className="h-4 w-4" /> },
      { href: "/people/jay-forte", label: "Jay Forte", icon: <Users className="h-4 w-4" /> },
    ]
  },
  { href: "/contact", label: "Action", icon: <FileText className="h-4 w-4" /> },
  { href: "#progress", label: "Progress", icon: <FileText className="h-4 w-4" /> },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-pure-white shadow-md' 
            : 'bg-comfort-cream'
        }`}
      >
        <Container>
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
                <div className="h-10 w-10 bg-hope-gold rounded-full flex items-center justify-center">
                  <span className="text-pure-white font-bold text-xl">B</span>
                </div>
              </motion.div>
              <div>
                <span className="text-gentle-charcoal font-bold text-lg">THE BRIDGE</span>
                <div className="text-xs text-soft-shadow">Building from Day 1</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                item.children ? (
                  <Popover key={item.href}>
                    <PopoverTrigger asChild>
                      <button
                        className={`flex items-center gap-2 transition-colors ${
                          pathname.startsWith(item.href)
                            ? "text-hope-gold font-semibold"
                            : "text-gentle-charcoal hover:text-hope-gold"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-pure-white border-quiet-stone shadow-lg p-2 min-w-[200px]" align="start">
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gentle-charcoal hover:bg-soft-cloud hover:text-hope-gold rounded-md transition-colors mb-1"
                      >
                        View All {item.label}
                      </Link>
                      <div className="h-px bg-quiet-stone my-1" />
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gentle-charcoal hover:bg-soft-cloud hover:text-hope-gold rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors ${
                      pathname === item.href
                        ? "text-hope-gold font-semibold"
                        : "text-gentle-charcoal hover:text-hope-gold"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              ))}
              <Link href="/contact">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="bg-hope-gold text-pure-white hover:bg-hope-gold/90"
                >
                  Take Action
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gentle-charcoal hover:text-hope-gold transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-pure-white md:hidden"
          >
            <div className="flex flex-col pt-20 px-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        className={`flex items-center justify-between w-full py-4 border-b border-quiet-stone ${
                          pathname.startsWith(item.href)
                            ? "text-hope-gold font-semibold" 
                            : "text-gentle-charcoal hover:text-hope-gold"
                        } transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-lg">{item.label}</span>
                        </div>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            expandedItems.includes(item.href) ? "rotate-180" : ""
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.href) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-3 pl-10 text-sm text-gentle-charcoal hover:text-hope-gold transition-colors"
                            >
                              View All {item.label}
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 py-3 pl-10 text-sm ${
                                  pathname === child.href
                                    ? "text-hope-gold font-semibold"
                                    : "text-gentle-charcoal hover:text-hope-gold"
                                } transition-colors`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-4 border-b border-quiet-stone ${
                        pathname === item.href 
                          ? "text-hope-gold font-semibold" 
                          : "text-gentle-charcoal hover:text-hope-gold"
                      } transition-colors`}
                    >
                      {item.icon}
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="primary" 
                    width="full" 
                    className="bg-hope-gold text-pure-white hover:bg-hope-gold/90"
                  >
                    Take Action Now
                  </Button>
                </Link>
              </motion.div>
              
              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 text-center"
              >
                <p className="text-hope-gold font-bold text-lg mb-2">
                  Zero Graduates. Infinite Possibility.
                </p>
                <p className="text-soft-shadow text-sm">
                  Building Justice from Day One
                </p>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-8 border-t border-quiet-stone"
              >
                <div className="flex flex-col gap-2 text-sm">
                  <Link 
                    href="/check-in" 
                    className="text-soft-shadow hover:text-hope-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    Daily Check-In
                  </Link>
                  <Link 
                    href="/dashboard/judge" 
                    className="text-soft-shadow hover:text-hope-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    Judge Dashboard
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 