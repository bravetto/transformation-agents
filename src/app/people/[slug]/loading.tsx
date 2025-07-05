"use client";

import { LoadingMessages } from '@/components/people/LoadingStates';
import { motion } from 'framer-motion';

export default function PersonPageLoading() {
  return (
    <main>
      {/* Loading Message */}
      <div className="container mx-auto py-8">
        <LoadingMessages />
      </div>
      
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-courage-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content Skeleton */}
            <div className="order-2 lg:order-1">
              <div className="h-12 shimmer shimmer-messenger rounded-lg w-3/4 mb-4"></div>
              <div className="h-8 shimmer shimmer-messenger rounded-lg w-1/2 mb-6"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 shimmer shimmer-messenger rounded w-full"></div>
                <div className="h-4 shimmer shimmer-messenger rounded w-full"></div>
                <div className="h-4 shimmer shimmer-messenger rounded w-5/6"></div>
                <div className="h-4 shimmer shimmer-messenger rounded w-4/5"></div>
              </div>
              <div className="h-10 shimmer shimmer-messenger rounded-lg w-40"></div>
            </div>
            
            {/* Image Skeleton with Ethereal Particles */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full overflow-hidden border-4 border-white/30 shimmer shimmer-messenger">
                {/* Floating particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white opacity-40"
                    initial={{ 
                      x: Math.random() * 100 - 50, 
                      y: Math.random() * 100 - 50,
                      scale: 0.5 + Math.random() * 0.5
                    }}
                    animate={{ 
                      x: Math.random() * 100 - 50, 
                      y: Math.random() * 100 - 50,
                      scale: 0.8 + Math.random() * 0.5
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 4, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    style={{
                      width: `${8 + Math.random() * 8}px`,
                      height: `${8 + Math.random() * 8}px`,
                      filter: 'blur(2px)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimony Section Skeleton */}
      <section className="py-16 md:py-24 bg-comfort-cream">
        <div className="container mx-auto px-4">
          {/* Section header Skeleton */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="h-10 shimmer shimmer-witness rounded-lg w-1/3 mx-auto mb-4"></div>
            <div className="h-6 shimmer shimmer-witness rounded-lg w-2/3 mx-auto"></div>
          </div>
          
          {/* Testimony Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="relative glass backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12">
              {/* Quote icon placeholder */}
              <div className="absolute -top-6 -left-6 bg-hope-gold/50 rounded-full p-4 h-14 w-14 shimmer shimmer-witness"></div>
              
              {/* Testimony content skeleton */}
              <div className="min-h-[200px]">
                <div className="space-y-4">
                  <div className="h-6 shimmer shimmer-witness rounded w-full"></div>
                  <div className="h-6 shimmer shimmer-witness rounded w-full"></div>
                  <div className="h-6 shimmer shimmer-witness rounded w-4/5"></div>
                </div>
                
                <div className="flex items-center mt-6">
                  <div>
                    <div className="h-6 shimmer shimmer-witness rounded w-40 mb-2"></div>
                    <div className="h-4 shimmer shimmer-witness rounded w-24"></div>
                  </div>
                </div>
              </div>
              
              {/* Navigation dots skeleton */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="h-3 w-3 rounded-full shimmer shimmer-witness"></div>
                <div className="h-3 w-3 rounded-full shimmer shimmer-witness"></div>
                <div className="h-3 w-3 rounded-full shimmer shimmer-witness"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section Skeleton */}
      <section className="py-16 md:py-24 bg-gentle-charcoal text-white">
        <div className="container mx-auto px-4">
          {/* Section header Skeleton */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="h-10 shimmer shimmer-lightworker rounded-lg w-1/3 mx-auto mb-4"></div>
            <div className="h-6 shimmer shimmer-lightworker rounded-lg w-2/3 mx-auto"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full glass backdrop-blur-sm border-white/20 rounded-lg p-6"
                >
                  <div className="flex flex-col h-full justify-center items-center">
                    <div className="h-10 shimmer shimmer-lightworker rounded w-16 mb-2"></div>
                    <div className="h-6 shimmer shimmer-lightworker rounded w-24 mb-2"></div>
                    <div className="h-4 shimmer shimmer-lightworker rounded w-32"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Achievements Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="h-8 shimmer shimmer-guardian rounded-lg w-64 mx-auto mb-8"></div>
            
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass backdrop-blur-sm border-white/20 rounded-lg overflow-hidden p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 shimmer shimmer-guardian rounded w-1/3"></div>
                    <div className="h-4 shimmer shimmer-guardian rounded w-16"></div>
                  </div>
                  <div className="h-4 shimmer shimmer-guardian rounded w-full mt-4"></div>
                  <div className="h-4 shimmer shimmer-guardian rounded w-full mt-2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 