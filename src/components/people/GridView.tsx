"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PersonData, PersonRole } from "@/types/person";
import PersonCard from "@/components/ui/person-card";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface GridViewProps {
  people: Array<
    PersonData & {
      derivedRole: PersonRole;
    }
  >;
  className?: string;
}

function GridView({ people, className }: GridViewProps) {
  // Animation variants with divine easing
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Memoize the grid items to prevent unnecessary re-renders
  const renderedPeople = useMemo(() => {
    // Item variants for individual cards
    const itemVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    return people.map((person, index) => {
      // Use the derived role from pre-processing
      const role = person.derivedRole;

      // For featured card, make it span full width on mobile, 2 columns on tablet
      const isFeatured = index === 0 && people.length > 2;
      const featuredClasses = isFeatured
        ? "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-2"
        : "";

      return (
        <motion.div
          key={person.id}
          variants={itemVariants}
          layout
          className={cn("transform-gpu will-change-transform", featuredClasses)}
          whileHover={{
            scale: 1.03,
            rotate: Math.random() > 0.5 ? 0.5 : -0.5,
            boxShadow:
              "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 25px rgba(255, 255, 255, 0.3)",
            filter: "brightness(1.05)",
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
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
            size={isFeatured ? "featured" : "medium"}
          />
        </motion.div>
      );
    });
  }, [people]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10",
        className,
      )}
    >
      {renderedPeople}
    </motion.div>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders when props haven't changed
const MemoizedGridView = React.memo(GridView);

export default withErrorBoundary(MemoizedGridView, "GridView");
