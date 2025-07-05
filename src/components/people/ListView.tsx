"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { PersonData, PersonRole, PersonTheme } from '@/types/person';
import { getPersonImageData } from '@/data/person-images';

interface ListViewProps {
  people: Array<PersonData & {
    derivedRole: PersonRole;
    derivedThemes: PersonTheme[];
  }>;
  className?: string;
}

// Role-based colors and icons
const roleConfig = {
  lightworker: {
    color: 'bg-amber-600 text-white',
    lightColor: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  messenger: {
    color: 'bg-blue-600 text-white',
    lightColor: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  witness: {
    color: 'bg-emerald-600 text-white',
    lightColor: 'bg-emerald-100 text-emerald-700',
    borderColor: 'border-emerald-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  guardian: {
    color: 'bg-amber-600 text-white',
    lightColor: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  default: {
    color: 'bg-courage-blue text-white',
    lightColor: 'bg-blue-100 text-blue-700',
    borderColor: 'border-courage-blue',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
};

// Theme badge colors
const themeColors: Record<PersonTheme, string> = {
  faith: 'bg-purple-50 text-purple-700 border-purple-200',
  courage: 'bg-blue-50 text-blue-700 border-blue-200',
  transformation: 'bg-green-50 text-green-700 border-green-200',
  leadership: 'bg-amber-50 text-amber-700 border-amber-200',
  unity: 'bg-pink-50 text-pink-700 border-pink-200',
  wisdom: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

// Generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

function ListView({ people, className }: ListViewProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {people.map((person, index) => {
        const role = person.derivedRole || 'default';
        const roleData = roleConfig[role];
        
        // Check for local image
        const personImageData = person.localImage ? getPersonImageData(person.id, role) : undefined;
        const imageSource = personImageData ? personImageData.display : person.heroImage;
        
        // Extract first testimony for preview
        const firstTestimony = person.testimony?.quote?.length > 0 
          ? person.testimony.quote
          : person.sections.find(s => s.type === 'testimony')?.content?.testimonies?.[0]?.quote || '';
        
        // Truncate testimony for preview
        const testimonyPreview = firstTestimony 
          ? firstTestimony.length > 140 
            ? firstTestimony.substring(0, 140) + '...' 
            : firstTestimony
          : '';

        return (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative glass backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Column */}
              <div className="md:w-1/4 lg:w-1/5 relative">
                <div className="aspect-square relative overflow-hidden">
                  {imageSource ? (
                    <Image
                      src={imageSource}
                      alt={person.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                      placeholder={personImageData?.blurDataURL ? "blur" : "empty"}
                      blurDataURL={personImageData?.blurDataURL}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center ${roleData.color}"><span class="text-3xl font-bold">${getInitials(person.name)}</span></div>`;
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${roleData.color}`}>
                      <span className="text-3xl font-bold">{getInitials(person.name)}</span>
                    </div>
                  )}
                </div>
                
                {/* Role badge */}
                <div className={`absolute top-2 left-2 ${roleData.color} rounded-full p-1 shadow-lg`}>
                  {roleData.icon}
                </div>
              </div>
              
              {/* Content Column */}
              <div className="p-6 md:w-3/4 lg:w-4/5 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{person.name}</h3>
                    <p className="text-hope-gold">{person.title}</p>
                  </div>
                  
                  {/* View Profile Button */}
                  <Link
                    href={`/people/${person.slug}`}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors ease-divine flex items-center gap-2"
                  >
                    <span>View Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                
                {/* Theme tags */}
                {person.derivedThemes && person.derivedThemes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {person.derivedThemes.map(theme => (
                      <span 
                        key={theme} 
                        className={`text-xs px-2 py-1 rounded-full border ${themeColors[theme]}`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Description */}
                <p className="text-white/80 mb-4">{person.impact.description}</p>
                
                {/* Testimony preview */}
                {testimonyPreview && (
                  <div className="mt-auto">
                    <div className="glass rounded-lg p-4 relative">
                      <svg className="absolute top-2 left-2 w-4 h-4 text-hope-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <p className="text-sm text-white/80 italic pl-6">"{testimonyPreview}"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default withErrorBoundary(ListView, {
  componentName: 'ListView',
  id: 'list-view'
}); 