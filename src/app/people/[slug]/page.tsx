import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPersonBySlug, getAllPeople } from "@/data/people";
import type { PersonData } from "@/types/person";
import { ErrorBoundary } from "@/components/error-boundary";

// Import enhanced components for rendering different section types
import EnhancedPersonHero from "@/components/people/enhanced-person-hero";
import PersonTestimony from "@/components/people/person-testimony";
import PersonImpact from "@/components/people/person-impact";
import PersonLetter from "@/components/people/person-letter";
import PersonVideo from "@/components/people/person-video";
import PersonCustom from "@/components/people/person-custom";

// Define types for the page parameters (Next.js 15 async params)
interface PersonPageParams {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static metadata
export async function generateMetadata({
  params,
}: PersonPageParams): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);

  if (!person) {
    return {
      title: "Person Not Found",
      description: "The requested person could not be found.",
    };
  }

  const defaultImage = "/images/fallbacks/default-fallback.jpg";

  return {
    title: person.metadata?.title || `${person.name} - The Bridge Project`,
    description: person.metadata?.description || person.impact.description,
    openGraph: {
      title: person.metadata?.title || `${person.name} - The Bridge Project`,
      description: person.metadata?.description || person.impact.description,
      images: [
        {
          url: person.metadata?.ogImage || person.heroImage || defaultImage,
          width: 1200,
          height: 630,
          alt: `${person.name} - The Bridge Project`,
        },
      ],
    },
  };
}

// Generate static paths for all person pages
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

/**
 * Renders content sections based on the type
 */
function renderSection(
  section: NonNullable<PersonData["sections"]>[0],
  personData: PersonData,
) {
  try {
    switch (section.type) {
      case "hero":
        return (
          <EnhancedPersonHero
            key={`hero-${personData.id}`}
            name={section.content.title}
            subtitle={section.content.subtitle}
            description={section.content.description}
            imageSrc={personData.heroImage}
            imageAlt={`${personData.name} profile photo`}
            personId={personData.id}
            localImage={personData.localImage}
            role={personData.role}
            variant="primary"
            cta={
              section.content.ctaText && section.content.ctaHref
                ? {
                    text: section.content.ctaText,
                    link: section.content.ctaHref,
                  }
                : undefined
            }
          />
        );

      case "testimony":
        return (
          <PersonTestimony
            key={`testimony-${personData.id}`}
            title={section.content.title}
            description={section.content.description}
            testimonies={section.content.testimonies}
          />
        );

      case "impact":
        return (
          <PersonImpact
            key={`impact-${personData.id}`}
            title={section.content.title}
            description={section.content.description}
            stats={section.content.stats}
            achievements={section.content.achievements || []}
          />
        );

      case "letter":
        const signature =
          typeof section.content.signature === "object"
            ? section.content.signature?.image
            : section.content.signature;

        return (
          <PersonLetter
            key={`letter-${personData.id}`}
            title={section.content.title}
            body={section.content.body}
            date={section.content.date}
            signature={signature}
          />
        );

      case "video":
        return (
          <PersonVideo
            key={`video-${personData.id}`}
            title={section.content.title}
            description={section.content.description}
            videoUrl={section.content.videoUrl}
            thumbnailUrl={section.content.thumbnailUrl}
          />
        );

      case "custom":
        return (
          <PersonCustom
            key={`custom-${personData.id}-${section.content.component}`}
            title={section.content.title}
            description={section.content.description}
            component={section.content.component}
            props={section.content.props}
          />
        );

      default:
        return null;
    }
  } catch (error) {
    console.error(`Error rendering section ${section.type}:`, error);
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        <h3 className="text-lg font-semibold">
          Error rendering {section.type} section
        </h3>
        <p>The content could not be displayed. Please try again later.</p>
      </div>
    );
  }
}

// The main person page component
export default async function PersonPage({ params }: PersonPageParams) {
  // Await params for Next.js 15
  const { slug } = await params;

  // Get person data by slug
  const person = getPersonBySlug(slug);

  // If person doesn't exist, show 404 page
  if (!person) {
    notFound();
  }

  // Build hero props
  const heroProps = {
    name: person.name,
    subtitle: person.title,
    description: person.impact.description,
    imageSrc: person.heroImage,
    imageAlt: `${person.name} profile photo`,
    personId: person.id,
    localImage: person.localImage,
    role: person.role || "default",
    variant: "primary" as const,
  };

  // Find the hero section if it exists
  const heroSection = person.sections?.find(
    (section) => section.type === "hero",
  );

  return (
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center">
          Sorry, something went wrong loading this person's profile.
        </div>
      }
    >
      <main className="page-container">
        {/* Hero Section - Full Width */}
        <section className="w-full">
          <Suspense fallback={<PersonPageSkeleton />}>
            {heroSection ? (
              renderSection(heroSection, person)
            ) : (
              <EnhancedPersonHero {...heroProps} />
            )}
          </Suspense>
        </section>

        {/* Render all non-hero sections dynamically */}
        <Suspense fallback={<PersonPageSkeleton />}>
          {person.sections
            ?.filter((section) => section.type !== "hero")
            .map((section) => (
              <section
                key={`section-${section.type}-${section.id || Math.random().toString(36).substring(7)}`}
                className="section-spacing"
              >
                <ErrorBoundary
                  fallback={
                    <div className="container-wide p-6 bg-gray-100 rounded-lg">
                      <h3 className="text-lg font-semibold">
                        Error loading {section.type} section
                      </h3>
                      <p>This content could not be displayed.</p>
                    </div>
                  }
                >
                  {renderSection(section, person)}
                </ErrorBoundary>
              </section>
            ))}
        </Suspense>
      </main>
    </ErrorBoundary>
  );
}
