'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button component using the design system
 * Follows consistent patterns with variants for different use cases
 */

const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-courage-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      // Visual variants
      variant: {
        default: 'bg-hope-gold text-pure-white hover:bg-hope-gold/90',
        primary: 'bg-courage-blue hover:bg-courage-blue/90 text-white',
        secondary: 'bg-soft-cloud hover:bg-moon-glow border border-hope-gold text-gentle-charcoal',
        outline: 'border border-quiet-stone hover:bg-soft-cloud text-gentle-charcoal',
        ghost: 'hover:bg-soft-cloud text-gentle-charcoal',
        link: 'text-courage-blue underline-offset-4 hover:underline',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-growth-green text-pure-white hover:bg-growth-green/90',
        // Keep divine for backward compatibility but update colors
        divine: 'bg-hope-gold hover:bg-hope-gold/90 text-gentle-charcoal shadow-md hover:shadow-lg',
      },
      
      // Size variants
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md text-xs',
        lg: 'h-11 px-8 rounded-md text-base',
        xl: 'h-14 px-10 rounded-lg text-lg',
        icon: 'h-10 w-10',
      },
      
      // Width variants
      width: {
        default: '',
        full: 'w-full',
        auto: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      width: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button component with multiple variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants }; 