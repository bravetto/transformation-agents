import { PersonData as NewPersonData } from '@/types/person';

// Define types for impact section content
interface ImpactStat {
  id?: string;
  value: string | number;
  label: string;
  description?: string;
}

interface ImpactAchievement {
  id?: string;
  title: string;
  description: string;
  date: string;
}

interface ImpactSectionContent {
  title?: string;
  description?: string;
  stats?: ImpactStat[];
  achievements?: ImpactAchievement[];
}

// Define the existing PersonData format for backward compatibility
export interface ExistingPersonData {
  slug: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    subtitle: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    cta?: {
      text: string;
      link: string;
    };
    variant?: 'primary' | 'secondary' | 'tertiary';
  };
  testimony?: {
    title: string;
    description?: string;
    testimonies: Array<{
      id: string;
      quote: string;
      author: string;
      role?: string;
      date?: string;
    }>;
  };
  impact?: {
    title: string;
    description?: string;
    stats: Array<{
      id: string;
      value: string;
      label: string;
      description?: string;
    }>;
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      date: string;
    }>;
  };
}

/**
 * Adapts the existing person data format to the new format
 * This allows us to maintain compatibility with our components
 * while adopting the new data structure
 */
export function adaptToNewFormat(existingData: ExistingPersonData): NewPersonData {
  const testimonies = existingData.testimony?.testimonies || [];
  const mainTestimony = testimonies.length > 0 ? testimonies[0] : null;
  
  return {
    id: existingData.slug,
    slug: existingData.slug,
    name: existingData.name,
    title: existingData.title,
    heroImage: existingData.hero.imageSrc,
    
    testimony: mainTestimony ? {
      quote: mainTestimony.quote,
      context: `${mainTestimony.author}${mainTestimony.role ? `, ${mainTestimony.role}` : ''}`,
      date: mainTestimony.date || '2024'
    } : {
      quote: '',
      context: '',
      date: '2024'
    },
    
    impact: {
      title: existingData.impact?.title || '',
      description: existingData.impact?.description || '',
      stats: existingData.impact?.stats.map(stat => ({
        label: stat.label,
        value: stat.value
      })) || []
    },
    
    sections: [
      // Add testimony section if available
      ...(existingData.testimony ? [{
        type: 'testimony' as const,
        content: {
          title: existingData.testimony.title,
          description: existingData.testimony.description,
          testimonies: existingData.testimony.testimonies.map(t => ({
            id: t.id,
            quote: t.quote,
            author: t.author,
            role: t.role,
            date: t.date
          }))
        }
      }] : []),
      
      // Add impact section if available
      ...(existingData.impact ? [{
        type: 'impact' as const,
        content: {
          title: existingData.impact.title,
          description: existingData.impact.description,
          stats: existingData.impact.stats.map(stat => ({
            id: stat.id,
            label: stat.label,
            value: stat.value,
            description: stat.description
          })),
          achievements: existingData.impact.achievements.map(achievement => ({
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            date: achievement.date
          }))
        }
      }] : [])
    ],
    
    metadata: {
      title: existingData.metaTitle,
      description: existingData.metaDescription,
      ogImage: existingData.hero.imageSrc
    }
  };
}

/**
 * Adapts the new person data format back to the existing format
 * This is useful for backward compatibility
 */
export function adaptToExistingFormat(newData: NewPersonData): ExistingPersonData {
  // Find the testimony section if it exists
  const testimonySection = newData.sections.find(section => section.type === 'testimony');
  const testimonySectionContent = testimonySection?.type === 'testimony' ? testimonySection.content : null;
  
  // Find the impact section if it exists
  const impactSection = newData.sections.find(section => section.type === 'impact');
  const impactSectionContent = impactSection?.type === 'impact' ? impactSection.content as ImpactSectionContent : null;
  
  return {
    slug: newData.slug,
    name: newData.name,
    title: newData.title,
    metaTitle: newData.metadata?.title || `${newData.name} - The Bridge Project`,
    metaDescription: newData.metadata?.description || newData.impact.description,
    
    hero: {
      subtitle: newData.title,
      description: newData.impact.description,
      imageSrc: newData.heroImage,
      imageAlt: `${newData.name} profile image`,
      variant: 'primary'
    },
    
    testimony: testimonySectionContent ? {
      title: testimonySectionContent.title || 'Testimonials',
      description: testimonySectionContent.description,
      testimonies: testimonySectionContent.testimonies || [
        {
          id: 'testimony-1',
          quote: newData.testimony.quote,
          author: newData.testimony.context.split(',')[0] || '',
          role: newData.testimony.context.split(',')[1]?.trim() || undefined,
          date: newData.testimony.date
        }
      ]
    } : undefined,
    
    impact: impactSectionContent ? {
      title: newData.impact.title,
      description: newData.impact.description,
      stats: (impactSectionContent.stats || []).map((stat: ImpactStat, index: number) => ({
        id: stat.id || `stat-${index + 1}`,
        value: String(stat.value),
        label: stat.label,
        description: stat.description
      })),
      achievements: (impactSectionContent.achievements || []).map((achievement: ImpactAchievement, index: number) => ({
        id: achievement.id || `achievement-${index + 1}`,
        title: achievement.title,
        description: achievement.description,
        date: achievement.date
      }))
    } : undefined
  };
} 