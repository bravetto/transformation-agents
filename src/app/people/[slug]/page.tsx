import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPerson, getAllPeople } from "@/data/people";
import { Suspense } from "react";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import EnhancedPersonHero from "@/components/people/enhanced-person-hero-simple";
import PersonTestimony from "@/components/people/person-testimony";
import PersonImpact from "@/components/people/person-impact";
import PersonLetter from "@/components/people/person-letter";
import EnhancedPersonTimeline from "@/components/people/enhanced-person-timeline";
import {
  SocialShareSuite,
  generatePersonShareableContent,
} from "@/components/social-sharing";
import Link from "next/link";
import { PersonRole } from "@/types/person";

interface PersonPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PersonPageParams): Promise<Metadata> {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    return {
      title: "Person Not Found",
    };
  }

  return {
    title: `${personData.name} | The Bridge Project`,
    description:
      personData.impact?.description ||
      personData.testimony?.quote ||
      `Learn about ${personData.name}`,
    openGraph: {
      title: `${personData.name} | The Bridge Project`,
      description:
        personData.impact?.description ||
        personData.testimony?.quote ||
        `Learn about ${personData.name}`,
      images: [
        {
          url: personData.heroImage || "/images/fallbacks/default-fallback.jpg",
          width: 1200,
          height: 630,
          alt: `${personData.name} - The Bridge Project`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const people = getAllPeople();
  return people.map((person) => ({
    slug: person.slug,
  }));
}

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

export default async function PersonPage({ params }: PersonPageParams) {
  const { slug } = await params;
  const personData = getPerson(slug);

  if (!personData) {
    notFound();
  }

  // Build hero props from person data
  const heroProps = {
    name: personData.name,
    subtitle: personData.title || "",
    description:
      personData.impact?.description ||
      personData.testimony?.context ||
      `Learn about ${personData.name}`,
    imageSrc: personData.heroImage || "/images/fallbacks/default-fallback.jpg",
    imageAlt: `${personData.name} profile photo`,
    personId: personData.id,
    localImage: personData.localImage || true,
    role: (personData.role || "lightworker") as PersonRole,
    variant: "primary" as const,
  };

  return (
    <DivineErrorBoundary
      componentName={`${personData.name}Page`}
      role="guardian"
      fallback={
        <div className="p-8 text-center">
          Sorry, something went wrong loading {personData.name}'s profile.
          <div className="mt-4">
            <Link href="/people" className="text-blue-500 hover:underline">
              Return to People Directory
            </Link>
          </div>
        </div>
      }
    >
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="w-full">
          <DivineErrorBoundary
            componentName={`${personData.name}Hero`}
            role="messenger"
            fallback={
              <div className="container-wide py-12 text-center">
                <h2 className="text-3xl font-bold">{personData.name}</h2>
                <p className="mt-4">Hero section could not be displayed</p>
              </div>
            }
          >
            <Suspense fallback={<PersonPageSkeleton />}>
              <EnhancedPersonHero {...heroProps} />
            </Suspense>
          </DivineErrorBoundary>
        </section>

        {/* Testimony Section */}
        {personData.testimony && (
          <Suspense fallback={<PersonPageSkeleton />}>
            <DivineErrorBoundary
              componentName={`${personData.name}Testimony`}
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
              <PersonTestimony
                title="Vision & Testimony"
                description={
                  personData.sections?.find((s) => s.type === "testimony")
                    ?.content?.description || "Personal journey and insights"
                }
                testimonies={[
                  {
                    id: "main-testimony",
                    quote: personData.testimony.quote,
                    author: personData.name,
                    role: personData.title || "",
                    date: personData.testimony.date || "",
                  },
                ]}
              />
            </DivineErrorBoundary>
          </Suspense>
        )}

        {/* Impact Section */}
        {personData.impact && (
          <Suspense fallback={<PersonPageSkeleton />}>
            <DivineErrorBoundary
              componentName={`${personData.name}Impact`}
              role="messenger"
              fallback={
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Error loading impact section
                  </h3>
                  <p>This content could not be displayed.</p>
                </div>
              }
            >
              <PersonImpact
                title={personData.impact.title}
                description={personData.impact.description}
                stats={
                  personData.impact.stats?.map((stat) => ({
                    id: `stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`,
                    value: stat.value.toString(),
                    label: stat.label,
                  })) || []
                }
                achievements={
                  personData.sections?.find((s) => s.type === "impact")?.content
                    ?.achievements || []
                }
              />
            </DivineErrorBoundary>
          </Suspense>
        )}

        {/* Letter Section */}
        {personData.sections?.find((s) => s.type === "letter") && (
          <Suspense fallback={<PersonPageSkeleton />}>
            <DivineErrorBoundary
              componentName={`${personData.name}Letter`}
              role="messenger"
              fallback={
                <div className="p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Error loading letter section
                  </h3>
                  <p>This content could not be displayed.</p>
                </div>
              }
            >
              {(() => {
                const letterSection = personData.sections?.find(
                  (s) => s.type === "letter",
                );
                if (letterSection?.type === "letter") {
                  return (
                    <PersonLetter
                      title={letterSection.content.title}
                      body={letterSection.content.body}
                      date={letterSection.content.date}
                      signature={
                        typeof letterSection.content.signature === "string"
                          ? letterSection.content.signature
                          : letterSection.content.signature?.image
                      }
                    />
                  );
                }
                return null;
              })()}
            </DivineErrorBoundary>
          </Suspense>
        )}

        {/* Social Sharing Section - ADVANCED VIRAL OPTIMIZATION! */}
        <section className="w-full bg-gradient-to-r from-blue-50 to-purple-50 py-12">
          <div className="container mx-auto px-4">
            <Suspense
              fallback={
                <div className="h-32 bg-white rounded-lg animate-pulse" />
              }
            >
              <DivineErrorBoundary
                componentName={`${personData.name}SocialSharing`}
                role="messenger"
                fallback={
                  <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Share {personData.name}'s Story
                    </h3>
                    <p className="text-gray-600">
                      Sharing is temporarily unavailable. Please copy the URL to
                      share manually.
                    </p>
                  </div>
                }
              >
                <SocialShareSuite
                  content={generatePersonShareableContent(personData)}
                  showPrayerCall={
                    personData.id === "jahmere-webb" ||
                    personData.role === "lightworker"
                  }
                  showUrgency={personData.id === "jahmere-webb"}
                  highlightFreedomMission={personData.id === "jahmere-webb"}
                  trackViralCoefficient={true}
                  trackEngagement={true}
                  enableAbTesting={true}
                  layout="horizontal"
                  showLabels={true}
                  showCounts={false}
                  className="max-w-4xl mx-auto"
                />
              </DivineErrorBoundary>
            </Suspense>
          </div>
        </section>

        {/* Interactive Timeline Section - NEW! */}
        <section className="w-full bg-gray-50 py-16">
          <div className="container-wide">
            <Suspense fallback={<PersonPageSkeleton />}>
              <DivineErrorBoundary
                componentName={`${personData.name}Timeline`}
                role="messenger"
                fallback={
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-semibold">
                      Error loading timeline section
                    </h3>
                    <p>The interactive timeline could not be displayed.</p>
                  </div>
                }
              >
                <EnhancedPersonTimeline
                  person={personData}
                  variant="detailed"
                  showFilters={true}
                  showStats={true}
                />
              </DivineErrorBoundary>
            </Suspense>
          </div>
        </section>
      </main>
    </DivineErrorBoundary>
  );
}
