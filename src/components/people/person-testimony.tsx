"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { withErrorBoundary } from '@/components/with-error-boundary'
import { QuoteIcon } from 'lucide-react'

export interface Testimony {
  id: string
  quote: string
  author: string
  role?: string
  date?: string
}

export interface PersonTestimonyProps {
  title: string
  description?: string
  testimonies: Testimony[]
}

function PersonTestimony({
  title,
  description,
  testimonies
}: PersonTestimonyProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Get current testimony
  const currentTestimony = testimonies[activeIndex]
  
  return (
    <section className="py-16 md:py-24 bg-comfort-cream">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-lg md:text-xl text-soft-shadow">
              {description}
            </p>
          )}
        </div>
        
        {/* Testimonies */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute -top-6 -left-6 bg-hope-gold rounded-full p-4 shadow-lg">
              <QuoteIcon className="h-6 w-6 text-gentle-charcoal" />
            </div>
            
            {/* Testimony content */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimony.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="text-xl md:text-2xl font-medium mb-6 text-gentle-charcoal">
                    "{currentTestimony.quote}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold text-lg">
                        {currentTestimony.author}
                      </p>
                      
                      {currentTestimony.role && (
                        <p className="text-soft-shadow">
                          {currentTestimony.role}
                        </p>
                      )}
                      
                      {currentTestimony.date && (
                        <p className="text-sm text-soft-shadow/70 mt-1">
                          {currentTestimony.date}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation dots */}
            {testimonies.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonies.map((testimony, index) => (
                  <button
                    key={testimony.id}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === activeIndex
                        ? 'bg-hope-gold scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View testimony from ${testimony.author}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default withErrorBoundary(PersonTestimony, {
  componentName: 'PersonTestimony',
  id: 'person-testimony'
}) 