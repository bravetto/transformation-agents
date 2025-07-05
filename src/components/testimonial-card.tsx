'use client';

import React from 'react';
import { Card, Text, Quote } from '@/components/ui';
import { RevealOnScroll } from '@/components/ui/page-transition';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  variant?: 'default' | 'outline' | 'light' | 'primary' | 'secondary' | 'ghost' | 'divine' | 'glow' | 'accent' | 'subtle';
  className?: string;
  delay?: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  variant = 'default',
  className,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <RevealOnScroll delay={delay}>
      <Card 
        variant={variant}
        padding="lg"
        className={cn('h-full', className)}
      >
        <Quote size="lg" className="mb-4">
          {quote}
        </Quote>
        
        <div className="mt-4 flex items-center">
          <div className="ml-2">
            <Text weight="bold" color="accent" className="text-sm">
              {author}
            </Text>
            
            {role && (
              <Text size="sm" color="muted">
                {role}
              </Text>
            )}
          </div>
        </div>
      </Card>
    </RevealOnScroll>
  );
} 