import { Metadata } from "next";
import { getPersonBySlug } from "@/data/people";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import EnhancedPersonHero from "@/components/people/enhanced-person-hero";
import { JordanFullTestimony } from "@/components/people/jordan-testimony";

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
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center">
          Sorry, something went wrong loading Jordan Dungy's profile.
        </div>
      }
    >
      <main className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <Suspense fallback={<PersonPageSkeleton />}>
            <div className="content-center">
              <EnhancedPersonHero {...heroProps} />
            </div>
          </Suspense>
        </section>

        {/* Enhanced Full Testimony Section (Moved from Homepage) */}
        <Suspense fallback={<PersonPageSkeleton />}>
          <ErrorBoundary
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
          </ErrorBoundary>
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
