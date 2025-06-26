"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Twitter, Instagram, MessageCircle, Link as LinkIcon, Check, TrendingUp, Users } from "lucide-react"

interface ShareStats {
  twitter: number
  instagram: number
  whatsapp: number
  total: number
}

export default function SocialAmplification() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareStats, setShareStats] = useState<ShareStats>({
    twitter: 147,
    instagram: 89,
    whatsapp: 234,
    total: 470
  })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://thebridgeproject.org'
  
  const shareMessages = {
    twitter: `JAHmere Webb spent 10 years in the system. Now he wants to prevent others from entering it. 

Jordan Dungy (who can't feel physical pain) vouches for "the man who felt too much."

This isn't about escaping consequences. It's about transforming them.

Read the story that could change criminal justice: ${shareUrl}

#BridgeOverPrison #TransformJustice`,
    
    instagram: `🌉 THE BRIDGE PROJECT 🌉

"I can't feel physical pain, but I see JAHmere's pain - and it's the kind that the system is creating, not healing."
- Jordan Dungy

A Super Bowl champion's son with a rare condition speaks up for transformation over incarceration.

JAHmere Webb isn't asking to escape consequences.
He's asking to transform them.

💛 Every heart = A vote for healing
📝 Every letter = A voice for change
🌟 Every share = A life potentially saved

Link in bio to read the full story and join the movement.

#BridgeOverPrison #TransformativeJustice #SecondChances #TonyDungy #SystemChange #HealingOverHarm`,
    
    whatsapp: `*The Bridge Project - JAHmere's Story* 🌉

I just read something that changed my perspective on criminal justice.

JAHmere Webb has been in the system for 10 years. Instead of more prison time, he's proposing to mentor at-risk youth - preventing them from making his mistakes.

What makes this different:
✅ Tony Dungy (NFL Legend) is his mentor
✅ Jordan Dungy (who can't feel physical pain) wrote a powerful testimony
✅ Complete transparency through technology
✅ Zero cost to taxpayers
✅ Youth already waiting for mentorship

The math: $35,000/year to imprison vs $0 to transform lives

Read the full story and consider adding your support: ${shareUrl}

*"We need somebody to give us a chance." - Tony Dungy*`
  }

  const handleShare = (platform: keyof typeof shareMessages) => {
    // Update stats
    setShareStats(prev => ({
      ...prev,
      [platform]: prev[platform] + 1,
      total: prev.total + 1
    }))

    // Platform-specific sharing
    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.twitter)}`,
          '_blank',
          'width=600,height=400'
        )
        break
      case 'instagram':
        // Copy to clipboard for Instagram
        navigator.clipboard.writeText(shareMessages.instagram)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
        alert('Instagram caption copied! Open Instagram to share JAHmere\'s story.')
        break
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareMessages.whatsapp)}`,
          '_blank'
        )
        break
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-holy-gold to-royal-purple text-white rounded-full p-4 shadow-lg"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Share2 className="h-6 w-6" />
        </motion.div>
        
        {/* Share count badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
        >
          {shareStats.total > 999 ? '999+' : shareStats.total}
        </motion.div>
      </motion.button>

      {/* Share Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-44 right-4 z-40 bg-white rounded-2xl shadow-2xl p-6 w-96 max-w-[calc(100vw-2rem)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-sacred-midnight">
                Amplify JAHmere's Story
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Share Stats */}
            <div className="bg-gradient-to-r from-holy-gold/10 to-royal-purple/10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-sacred-midnight">
                  Community Impact
                </span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-royal-purple" />
                <span className="text-2xl font-bold text-royal-purple">
                  {shareStats.total}
                </span>
                <span className="text-sm text-gray-600">
                  people spreading hope
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3 mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 bg-[#1DA1F2] text-white rounded-lg p-3 hover:bg-[#1a8cd8] transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="flex-1 text-left">Share on Twitter/X</span>
                <span className="text-xs opacity-75">{shareStats.twitter} shares</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('instagram')}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg p-3 hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-5 w-5" />
                <span className="flex-1 text-left">Copy for Instagram</span>
                <span className="text-xs opacity-75">{shareStats.instagram} shares</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 bg-[#25D366] text-white rounded-lg p-3 hover:bg-[#22c55e] transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="flex-1 text-left">Share on WhatsApp</span>
                <span className="text-xs opacity-75">{shareStats.whatsapp} shares</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyLink}
                className="w-full flex items-center gap-3 bg-gray-100 text-sacred-midnight rounded-lg p-3 hover:bg-gray-200 transition-colors"
              >
                {copied ? <Check className="h-5 w-5 text-green-600" /> : <LinkIcon className="h-5 w-5" />}
                <span className="flex-1 text-left">
                  {copied ? 'Link Copied!' : 'Copy Link'}
                </span>
              </motion.button>
            </div>

            {/* Viral Hashtags */}
            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-sacred-midnight mb-2">
                Trending Hashtags:
              </p>
              <div className="flex flex-wrap gap-2">
                {['#BridgeOverPrison', '#TransformJustice', '#SecondChances', '#TonyDungy'].map(tag => (
                  <span
                    key={tag}
                    className="bg-royal-purple/10 text-royal-purple text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-royal-purple/20"
                    onClick={() => navigator.clipboard.writeText(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center text-sm text-gray-600"
            >
              <p className="font-semibold text-holy-gold">
                Every share saves a life.
              </p>
              <p className="text-xs mt-1">
                Your voice joins {shareStats.total} others demanding transformation.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy Success Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>Copied to clipboard!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 