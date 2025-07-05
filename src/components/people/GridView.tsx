"use client";

import { motion } from 'framer-motion';
import { PersonData, PersonRole } from '@/types/person';
import PersonCard from '@/components/ui/person-card';
import { cn } from '@/lib/utils';
import { withErrorBoundary } from '@/components/with-error-boundary';

interface GridViewProps {
  people: Array<PersonData & {
    derivedRole: PersonRole;
  }>;
  className?: string;
}

function GridView({ people, className }: GridViewProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
        className
      )}
    >
      {people.map((person, index) => {
        // Use the derived role from pre-processing
        const role = person.derivedRole;
        
        return (
          <motion.div
            key={person.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <PersonCard
              id={person.id}
              slug={person.slug}
              name={person.name}
              title={person.title}
              description={person.impact.description}
              imageSrc={person.heroImage}
              localImage={person.localImage}
              role={role}
              size={index === 0 && people.length > 2 ? 'featured' : 'medium'}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default withErrorBoundary(GridView, {
  componentName: 'GridView',
  id: 'grid-view'
}); 