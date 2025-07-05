"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { PersonData, PersonRole, JourneyStage, PersonImpactLevel } from '@/types/person';
import { getPersonImageData } from '@/data/person-images';

interface TimelineViewProps {
  people: Array<PersonData & {
    derivedRole: PersonRole;
    derivedJourneyStage: JourneyStage;
    derivedImpactLevel: PersonImpactLevel;
  }>;
  className?: string;
}

// Journey stage display configurations
const journeyStageConfig = {
  seeker: {
    label: 'Seeker Stage',
    description: 'Beginning the spiritual journey',
    color: 'from-blue-700 to-blue-900'
  },
  awakening: {
    label: 'Awakening Stage',
    description: 'Experiencing spiritual growth',
    color: 'from-indigo-700 to-indigo-900'
  },
  serving: {
    label: 'Serving Stage',
    description: 'Contributing to community',
    color: 'from-emerald-700 to-emerald-900'
  },
  guiding: {
    label: 'Guiding Stage',
    description: 'Leading others on their journey',
    color: 'from-amber-700 to-amber-900'
  }
};

// Role-based colors
const roleColors = {
  lightworker: 'bg-amber-600 border-amber-400 text-white',
  messenger: 'bg-blue-600 border-blue-400 text-white',
  witness: 'bg-emerald-600 border-emerald-400 text-white',
  guardian: 'bg-amber-600 border-amber-400 text-white',
  default: 'bg-courage-blue border-blue-400 text-white'
};

// Impact level configurations
const impactConfig = {
  local: { size: 'h-12 w-12', label: 'Local' },
  regional: { size: 'h-14 w-14', label: 'Regional' },
  global: { size: 'h-16 w-16', label: 'Global' },
  eternal: { size: 'h-20 w-20', label: 'Eternal' }
};

// Generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

function TimelineView({ people, className }: TimelineViewProps) {
  const [previewPerson, setPreviewPerson] = useState<string | null>(null);
  
  // Group people by era
  const peopleByEra = people.reduce((acc, person) => {
    const era = person.derivedJourneyStage;
    if (!acc[era]) {
      acc[era] = [];
    }
    acc[era].push(person);
    return acc;
  }, {} as Record<JourneyStage, typeof people>);
  
  // Sort eras chronologically
  const sortedEras: JourneyStage[] = ['seeker', 'awakening', 'serving', 'guiding'];
  
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line that connects all eras */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2 z-0" />
      
      {sortedEras.filter(era => peopleByEra[era]?.length > 0).map((era, eraIndex) => (
        <div key={era} className="mb-16 last:mb-0">
          {/* Era Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: eraIndex * 0.1 }}
            className={`rounded-full py-2 px-6 text-center bg-gradient-to-r ${journeyStageConfig[era].color} text-white mx-auto mb-8 max-w-md relative z-10`}
          >
            <h3 className="text-xl font-bold">{journeyStageConfig[era].label}</h3>
            <p className="text-sm text-white/80">{journeyStageConfig[era].description}</p>
          </motion.div>
          
          {/* Era People */}
          <div className="space-y-12">
            {peopleByEra[era].map((person, personIndex) => {
              const role = person.derivedRole || 'default';
              const impact = person.derivedImpactLevel || 'local';
              const isEven = personIndex % 2 === 0;
              
              // Check for local image
              const personImageData = person.localImage ? getPersonImageData(person.id, role) : undefined;
              const mainImageSource = personImageData ? personImageData.display : person.heroImage;
              const thumbnailImageSource = personImageData ? personImageData.thumbnail : person.heroImage;
              
              return (
                <motion.div 
                  key={person.id}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (eraIndex * 0.1) + (personIndex * 0.05) }}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}
                >
                  {/* Person node */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 z-10"
                    onMouseEnter={() => setPreviewPerson(person.id)}
                    onMouseLeave={() => setPreviewPerson(null)}
                  >
                    <Link href={`/people/${person.slug}`}>
                      <div className={cn(
                        "relative rounded-full overflow-hidden border-2",
                        roleColors[role],
                        impactConfig[impact].size,
                        "transition-all duration-300 ease-divine",
                        "hover:scale-110 hover:shadow-lg",
                        previewPerson === person.id && "scale-110 shadow-lg"
                      )}>
                        {mainImageSource ? (
                          <Image
                            src={mainImageSource}
                            alt={person.name}
                            fill
                            sizes="(max-width: 768px) 30vw, 10vw"
                            className="object-cover"
                            placeholder={personImageData?.blurDataURL ? "blur" : "empty"}
                            blurDataURL={personImageData?.blurDataURL}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center ${roleColors[role]}"><span class="text-lg font-bold">${getInitials(person.name)}</span></div>`;
                            }}
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${roleColors[role]}`}>
                            <span className="text-lg font-bold">{getInitials(person.name)}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    {/* Impact level indicator */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/70">
                      {impactConfig[impact].label}
                    </div>
                  </div>
                  
                  {/* Content box */}
                  <div className={cn(
                    "glass backdrop-blur-md rounded-xl border border-white/10 p-4",
                    "w-5/12",
                    isEven ? "mr-auto" : "ml-auto"
                  )}>
                    <h4 className="text-lg font-bold text-white">{person.name}</h4>
                    <p className="text-sm text-hope-gold">{person.title}</p>
                    <p className="text-sm text-white/70 mt-2 line-clamp-2">{person.impact.description}</p>
                  </div>
                  
                  {/* Connector line */}
                  <div className={cn(
                    "absolute top-1/2 left-1/2 h-0.5 bg-white/20 -translate-y-1/2",
                    isEven ? "-translate-x-1/2" : "translate-x-1/2",
                    "w-[calc(50%-4rem)]"
                  )} />
                  
                  {/* Preview card on hover */}
                  <AnimatePresence>
                    {previewPerson === person.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "absolute z-20 glass backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-xl",
                          "w-64",
                          isEven ? "left-1/2 ml-24" : "right-1/2 mr-24",
                          "top-0"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {/* Small image */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                            {thumbnailImageSource ? (
                              <Image
                                src={thumbnailImageSource}
                                alt={person.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                placeholder={personImageData?.blurDataURL ? "blur" : "empty"}
                                blurDataURL={personImageData?.blurDataURL}
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center ${roleColors[role]}`}>
                                <span className="text-sm font-bold">{getInitials(person.name)}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Details */}
                          <div className="flex-1">
                            <h5 className="text-sm font-bold text-white">{person.name}</h5>
                            <p className="text-xs text-hope-gold">{person.title}</p>
                            <p className="text-xs text-white/70 mt-1 line-clamp-3">{person.impact.description}</p>
                          </div>
                        </div>
                        
                        <Link
                          href={`/people/${person.slug}`}
                          className="text-xs text-white/80 hover:text-white mt-2 flex items-center justify-center py-1 glass rounded"
                        >
                          <span>View Full Profile</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default withErrorBoundary(TimelineView, {
  componentName: 'TimelineView',
  id: 'timeline-view'
}); 