import { Metadata } from "next";
import { getPersonBySlug } from "@/data/people";
import { Suspense } from "react";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import EnhancedPersonHero from "@/components/people/enhanced-person-hero";
import { JordanFullTestimony } from "@/components/people/jordan-testimony";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Jordan Dungy - The Bridge Project",
  description:
    "Jordan Dungy shares his connection to JAHmere and why he believes in second chances",
  openGraph: {
    title: "Jordan Dungy - The Bridge Project",
    description:
      "Jordan Dungy shares his connection to JAHmere and why he believes in second chances",
    images: [
      {
        url: "/images/people/display/coach-dungy.jpg",
        width: 1200,
        height: 630,
        alt: "Jordan Dungy - The Bridge Project",
      },
    ],
  },
};

// Fallback component for loading state
function PersonPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
    </div>
  );
}

export default function JordanDungyPage() {
  // Get the person data
  const person = getPersonBySlug("jordan-dungy");

  // Build hero props
  const heroProps = {
    name: "Jordan Dungy",
    subtitle: "Son of NFL Hall of Famer Tony Dungy",
    description:
      "Advocate for second chances and believer in the power of mentorship",
    imageSrc: "/images/people/display/coach-dungy.jpg",
    imageAlt: "Jordan Dungy profile photo",
    personId: "jordan-dungy",
    localImage: true,
    role: "advocate",
    variant: "primary" as const,
  };

  return (
    <DivineErrorBoundary
      componentName="JordanDungyPage"
      role="guardian"
      fallback={
        <div className="p-8 text-center">
          Sorry, something went wrong loading Jordan Dungy's profile.
          <div className="mt-4">
            <Link href="/people" className="text-blue-500 hover:underline">
              Return to People Directory
            </Link>
          </div>
        </div>
      }
    >
      <main className="min-h-screen">
        {/* Full-width Banner */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">Jordan Dungy</h1>
              <p className="text-xl md:text-2xl">
                Son of NFL Hall of Famer Tony Dungy
              </p>
              <p className="text-lg opacity-90">
                Advocate for second chances and believer in the power of
                mentorship
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/people/display/coach-dungy.jpg"
                  alt="Jordan Dungy"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-amber-50 to-white">
          <DivineErrorBoundary
            componentName="JordanDungyHero"
            role="messenger"
            fallback={
              <div className="container-wide py-12 text-center">
                <h2 className="text-3xl font-bold">Jordan Dungy</h2>
                <p className="mt-4">Hero section could not be displayed</p>
              </div>
            }
          >
            <Suspense fallback={<PersonPageSkeleton />}>
              <div className="content-center">
                <EnhancedPersonHero {...heroProps} />
              </div>
            </Suspense>
          </DivineErrorBoundary>
        </section>

        {/* Enhanced Full Testimony Section (Moved from Homepage) */}
        <Suspense fallback={<PersonPageSkeleton />}>
          <DivineErrorBoundary
            componentName="JordanDungyTestimony"
            role="messenger"
            fallback={
              <div className="p-6 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold">
                  Error loading testimony section
                </h3>
                <p>This content could not be displayed.</p>
              </div>
            }
          >
            <JordanFullTestimony />
          </DivineErrorBoundary>
        </Suspense>
      </main>
    </DivineErrorBoundary>
  );
}
