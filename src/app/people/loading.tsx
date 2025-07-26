"use client";

import {
  GridLoadingSkeleton,
  LoadingMessages,
} from "@/components/people/LoadingStates";
import { motion } from "framer-motion";

export default function PeopleLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section Loading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="h-14 md:h-16 lg:h-20 w-3/4 md:w-2/3 mx-auto shimmer shimmer-lightworker rounded-xl mb-6"></div>
          <div className="h-5 md:h-6 w-full md:w-3/4 lg:w-1/2 mx-auto shimmer shimmer-messenger rounded-lg"></div>
        </motion.div>

        {/* Loading Messages */}
        <LoadingMessages />

        {/* People Grid Loading */}
        <div className="mt-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar skeleton */}
            <div className="lg:w-1/4">
              <div className="glass backdrop-blur-md rounded-xl p-6 space-y-6 sticky top-24">
                <div className="h-8 shimmer shimmer-lightworker rounded-lg w-1/2 mb-4"></div>

                {/* Role filters skeleton */}
                <div className="space-y-4">
                  <div className="h-6 shimmer shimmer-lightworker rounded-lg w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 shimmer shimmer-lightworker rounded-full w-24"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Era filters skeleton */}
                <div className="space-y-4">
                  <div className="h-6 shimmer shimmer-messenger rounded-lg w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 shimmer shimmer-messenger rounded-full w-20"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Theme filters skeleton */}
                <div className="space-y-4">
                  <div className="h-6 shimmer shimmer-witness rounded-lg w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 shimmer shimmer-witness rounded-full w-28"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Impact filters skeleton */}
                <div className="space-y-4">
                  <div className="h-6 shimmer shimmer-guardian rounded-lg w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 shimmer shimmer-guardian rounded-full w-24"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Clear filters button skeleton */}
                <div className="h-10 shimmer shimmer-lightworker rounded-lg w-full mt-4"></div>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:w-3/4 space-y-8">
              {/* Search and controls skeleton */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="h-10 shimmer shimmer-lightworker rounded-lg w-full md:w-64"></div>
                <div className="h-10 shimmer shimmer-lightworker rounded-lg w-24"></div>
              </div>

              {/* Grid skeleton */}
              <GridLoadingSkeleton count={8} showFeatured={true} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
