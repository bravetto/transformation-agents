'use client';

import React from 'react';
import { Card, Text, Heading } from '@/components/ui';
import { RevealOnScroll } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'light' | 'primary' | 'secondary' | 'ghost' | 'divine' | 'glow' | 'accent' | 'subtle';
  className?: string;
  delay?: number;
}

export default function FeatureCard({
  title,
  description,
  icon,
  variant = 'default',
  className,
  delay = 0,
}: FeatureCardProps) {
  return (
    <RevealOnScroll delay={delay}>
      <Card 
        variant={variant}
        padding="lg"
        shadow="md"
        className={cn('h-full transition-transform hover:scale-[1.02]', className)}
      >
        {icon && (
          <div className="text-3xl mb-4">
            {icon}
          </div>
        )}
        
        <Heading as="h3" size="h4" className="mb-2">
          {title}
        </Heading>
        
        <Text color="muted">
          {description}
        </Text>
      </Card>
    </RevealOnScroll>
  );
} 