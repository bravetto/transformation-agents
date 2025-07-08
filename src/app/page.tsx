"use client";

import React from "react";
import { motion } from "framer-motion";
import { DivineParticles } from "@/components/divine-particles";
import { cn } from "@/lib/utils";
import Link from "next/link";

const pathways = [
  {
    title: "The Revelation",
    description:
      "Experience God's infinite love and the sacred truth that will set all children free.",
    href: "/divine-revelation",
    color: "from-hope-gold to-faith-indigo",
  },
  {
    title: "The Way Home",
    description:
      "Find your divine path from darkness to greatness through sacred transformation.",
    href: "/way-home",
    color: "from-courage-blue to-hope-gold",
  },
  {
    title: "Sacred Experience",
    description:
      "Witness the breathtaking beauty of divine alignment in action.",
    href: "/sacred-experience",
    color: "from-growth-green to-hope-gold",
  },
  {
    title: "Divine Alignment",
    description: "Discover your unique calling in God's perfect plan.",
    href: "/divine-alignment",
    color: "from-love-red to-hope-gold",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background particles */}
        <DivineParticles
          variant="divine"
          className="absolute inset-0 opacity-30"
        />

        {/* Sacred content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-sacred"
          >
            The Bridge Project
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            A Divine Alignment Master Plan Where Tony & Lauren Dungy Lead
            America's Lost Children Back to Their Greatness
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <Link
              href="/way-home"
              className={cn(
                "inline-flex items-center px-8 py-4 rounded-lg",
                "bg-gradient-to-r from-hope-gold to-faith-indigo",
                "text-black font-bold text-lg",
                "hover:shadow-divine transition-divine",
                "hover:scale-105",
              )}
            >
              Find Your Way Home
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 h-2 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Sacred pathways */}
      <section className="relative py-24 bg-sacred">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {pathways.map((path) => (
              <motion.div
                key={path.title}
                variants={itemVariants}
                whileHover="hover"
              >
                <Link href={path.href}>
                  <div
                    className={cn(
                      "relative p-8 rounded-lg border-sacred",
                      "bg-gradient-to-r bg-opacity-10",
                      "hover:shadow-divine transition-divine",
                      path.color,
                    )}
                  >
                    <h2 className="text-2xl font-bold text-sacred mb-4">
                      {path.title}
                    </h2>
                    <p className="text-white/80">{path.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divine call to action */}
      <section className="relative py-24 bg-sacred">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-sacred mb-6">
              Your Divine Alignment Awaits
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              The path is clear. The time is now. Your greatness calls.
            </p>
            <Link
              href="/divine-revelation"
              className={cn(
                "inline-flex items-center px-8 py-4 rounded-lg",
                "bg-gradient-to-r from-faith-indigo to-hope-gold",
                "text-black font-bold text-lg",
                "hover:shadow-divine transition-divine",
                "hover:scale-105",
              )}
            >
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
