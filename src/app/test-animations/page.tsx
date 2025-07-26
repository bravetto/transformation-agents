"use client";

import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { useState } from "react";

function TestAnimationsPage() {
  const [animationKey, setAnimationKey] = useState(0);

  const replayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Animation Test Suite
      </h1>

      <button
        onClick={replayAnimation}
        className="mb-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Replay All Animations
      </button>

      <div className="space-y-12">
        {/* Fade In Animation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Fade In</h2>
          <motion.div
            key={`fade-${animationKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-32 h-32 bg-blue-500 rounded-lg"
          />
        </section>

        {/* Scale Animation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Scale</h2>
          <motion.div
            key={`scale-${animationKey}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-32 h-32 bg-green-500 rounded-lg"
          />
        </section>

        {/* Slide In Animation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Slide In</h2>
          <motion.div
            key={`slide-${animationKey}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 bg-purple-500 rounded-lg"
          />
        </section>

        {/* Rotate Animation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Rotate</h2>
          <motion.div
            key={`rotate-${animationKey}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 bg-red-500 rounded-lg"
          />
        </section>

        {/* Stagger Children */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Stagger Children
          </h2>
          <motion.div
            className="flex gap-4"
            initial="hidden"
            animate="visible"
            key={`stagger-${animationKey}`}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className="w-16 h-16 bg-yellow-500 rounded"
              />
            ))}
          </motion.div>
        </section>

        {/* Path Animation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            SVG Path Animation
          </h2>
          <motion.svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            key={`path-${animationKey}`}
          >
            <motion.path
              d="M 10 100 Q 100 10 190 100"
              stroke="#10b981"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </motion.svg>
        </section>
      </div>
    </div>
  );
}

export default withErrorBoundary(TestAnimationsPage, "TestAnimationsPage", (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading animation test page
    </div>
  ));
