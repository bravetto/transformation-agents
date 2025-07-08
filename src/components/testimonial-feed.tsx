"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { withDivineErrorBoundary } from "./ui/divine-error-boundary";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  location: string;
  timestamp: Date;
}

interface TestimonialFeedProps {
  className?: string;
  refreshInterval?: number;
}

// Mock testimonial data generator
const generateMockTestimonials = (): Testimonial[] => {
  return [
    {
      id: "1",
      text: "Tony showed us the way, JAHmere is the proof...",
      author: "Pastor James",
      location: "FL",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "Bravëtto just hired 3 program graduates!",
      author: "Michael M.",
      location: "NY",
      timestamp: new Date(),
    },
    {
      id: "3",
      text: "My son found his Greatness Zone!",
      author: "Maria",
      location: "TX",
      timestamp: new Date(),
    },
    {
      id: "4",
      text: "Our church is all in with The Bridge Project",
      author: "Rev. Williams",
      location: "GA",
      timestamp: new Date(),
    },
    {
      id: "5",
      text: "From system-involved to system-changer. Thank you Tony & Lauren!",
      author: "Marcus",
      location: "CA",
      timestamp: new Date(),
    },
  ];
};

function TestimonialFeed({
  className = "",
  refreshInterval = 5000,
}: TestimonialFeedProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize testimonials
  useEffect(() => {
    setTestimonials(generateMockTestimonials());
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <MessageSquare className="h-5 w-5 text-amber-500 mr-2" />
        <h3 className="text-lg font-semibold">Live Testimonials</h3>
      </div>

      <div className="h-24 relative">
        <AnimatePresence mode="wait">
          {currentTestimonial && (
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <p className="text-lg mb-2 italic">"{currentTestimonial.text}"</p>
              <p className="text-sm text-gray-500">
                - {currentTestimonial.author}, {currentTestimonial.location}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-amber-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(TestimonialFeed, {
  componentName: "TestimonialFeed",
});
