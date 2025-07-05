import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPersonBySlug, getAllPeople } from '@/data/people'
import type { PersonData } from '@/types/person'

// Import components for rendering different section types
import PersonHero from '@/components/people/person-hero'
import PersonTestimony from '@/components/people/person-testimony'
import PersonImpact from '@/components/people/person-impact'
import PersonLetter from '@/components/people/person-letter'
import PersonVideo from '@/components/people/person-video'
import PersonCustom from '@/components/people/person-custom'

// Define types for the page parameters
interface PersonPageParams {
  params: {
    slug: string
  }
}

// Generate static metadata
export async function generateMetadata({ params }: PersonPageParams): Promise<Metadata> {
  const person = getPersonBySlug(params.slug)
  
  if (!person) {
    return {
      title: 'Person Not Found',
      description: 'The requested person could not be found.',
    }
  }

  return {
    title: person.metadata?.title || `${person.name} - The Bridge Project`,
    description: person.metadata?.description || person.impact.description,
    openGraph: {
      title: person.metadata?.title || `${person.name} - The Bridge Project`,
      description: person.metadata?.description || person.impact.description,
      images: [
        {
          url: person.metadata?.ogImage || person.heroImage,
          width: 1200,
          height: 630,
          alt: `${person.name} - The Bridge Project`,
        },
      ],
    },
  }
}

// Generate static paths for all person pages
export async function generateStaticParams() {
  const people = getAllPeople()
  
  return people.map(person => ({
    slug: person.slug
  }))
}

/**
 * Renders content sections based on the type
 */
function renderSection(section: PersonData['sections'][0], personData: PersonData) {
  switch (section.type) {
    case 'hero':
      return (
        <PersonHero
          key={`hero-${personData.id}`}
          name={section.content.title}
          subtitle={section.content.subtitle}
          description={section.content.description}
          imageSrc={personData.heroImage}
          imageAlt={`${personData.name} profile photo`}
          variant="primary"
          cta={section.content.ctaText && section.content.ctaHref ? {
            text: section.content.ctaText,
            link: section.content.ctaHref
          } : undefined}
        />
      );

    case 'testimony':
      return (
        <PersonTestimony
          key={`testimony-${personData.id}`}
          title={section.content.title}
          description={section.content.description}
          testimonies={section.content.testimonies}
        />
      );
    
    case 'impact':
      return (
        <PersonImpact
          key={`impact-${personData.id}`}
          title={section.content.title}
          description={section.content.description}
          stats={section.content.stats}
          achievements={section.content.achievements || []}
        />
      );
    
    case 'letter':
      const signature = typeof section.content.signature === 'object' 
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
      
    case 'video':
      return (
        <PersonVideo
          key={`video-${personData.id}`}
          title={section.content.title}
          description={section.content.description}
          videoUrl={section.content.videoUrl}
          thumbnailUrl={section.content.thumbnailUrl}
        />
      );
      
    case 'custom':
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
}

// The main person page component
export default function PersonPage({ params }: PersonPageParams) {
  // Get person data by slug
  const person = getPersonBySlug(params.slug)
  
  // If person doesn't exist, show 404 page
  if (!person) {
    notFound()
  }

  // Build hero props
  const heroProps = {
    name: person.name,
    subtitle: person.title,
    description: person.impact.description,
    imageSrc: person.heroImage,
    imageAlt: `${person.name} profile photo`,
    variant: 'primary' as const
  }
  
  // Find the hero section if it exists
  const heroSection = person.sections.find(section => section.type === 'hero')
  
  return (
    <main>
      {/* Hero Section */}
      {heroSection ? (
        renderSection(heroSection, person)
      ) : (
        <PersonHero {...heroProps} />
      )}
      
      {/* Render all non-hero sections dynamically */}
      {person.sections
        .filter(section => section.type !== 'hero')
        .map((section) => renderSection(section, person))
      }
    </main>
  )
} 