import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge component for labels and indicators
 * Used for status indicators, counters, etc.
 */
const badgeVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      // Visual variants
      variant: {
        default: 'bg-hope-gold text-gentle-charcoal',
        primary: 'bg-courage-blue text-white',
        secondary: 'bg-soft-cloud text-gentle-charcoal border border-quiet-stone',
        outline: 'bg-transparent text-gentle-charcoal border border-hope-gold',
        accent: 'bg-gold text-midnight',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-error text-white',
        info: 'bg-info text-white',
        ghost: 'bg-white/10 text-white backdrop-blur-sm',
        divine: 'bg-hope-gold text-gentle-charcoal',
      },
      
      // Size variants
      size: {
        sm: 'text-[10px] px-2 py-0.5',
        default: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component
 * Used for labels, tags, and status indicators
 */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { badgeVariants }; 