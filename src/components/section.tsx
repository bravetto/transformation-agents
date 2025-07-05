'use client';

import React, { ReactNode, forwardRef } from 'react';
import { Container, Heading, Text } from '@/components/ui';
import { cn } from '@/lib/utils';
import { RevealOnScroll } from '@/components/ui/page-transition';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'gradient' | 'dark' | 'subtle' | 'transparent';
  container?: boolean;
  fullWidth?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  centered?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  title,
  subtitle,
  children,
  className,
  variant = 'default',
  container = true,
  fullWidth = false,
  padding = 'large',
  centered = false,
}, ref) => {
  const paddingClasses = {
    none: '',
    small: 'py-8',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-20'
  }

  const variantClasses = {
    default: 'bg-white text-gentle-charcoal',
    light: 'bg-comfort-cream text-gentle-charcoal',
    gradient: 'bg-soft-cloud text-gentle-charcoal',
    dark: 'bg-moon-glow text-gentle-charcoal',
    subtle: 'bg-soft-cloud/50 text-gentle-charcoal',
    transparent: 'bg-transparent text-gentle-charcoal',
  }

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative',
        paddingClasses[padding],
        variantClasses[variant],
        className
      )}
    >
      {container ? (
        <div className={cn(
          'container mx-auto px-4',
          fullWidth ? 'max-w-none' : ''
        )}>
          {(title || subtitle) && (
            <div className={cn('mb-8 md:mb-12', centered && 'text-center')}>
              {title && (
                <RevealOnScroll>
                  <Heading as="h2" size="h2" className="mb-4">
                    {title}
                  </Heading>
                </RevealOnScroll>
              )}
              
              {subtitle && (
                <RevealOnScroll delay={0.2}>
                  <Text size="xl" textColor="accent" className="font-medium">
                    {subtitle}
                  </Text>
                </RevealOnScroll>
              )}
            </div>
          )}
          
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section; 