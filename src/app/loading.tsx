"use client";

import { GridLoadingSkeleton, LoadingMessages } from '@/components/people/LoadingStates';

export default function RootLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section Loading */}
        <div className="text-center mb-16">
          <div className="mx-auto w-3/4 md:w-2/3 h-16 shimmer shimmer-lightworker rounded-lg mb-6"></div>
          <div className="mx-auto w-full md:w-1/2 h-6 shimmer shimmer-messenger rounded-lg"></div>
        </div>
        
        {/* Rotating loading messages */}
        <LoadingMessages />
        
        {/* Grid Loading Skeleton */}
        <div className="mt-12">
          <GridLoadingSkeleton count={8} showFeatured={true} />
        </div>
      </div>
    </main>
  );
} 