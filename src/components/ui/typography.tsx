import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Typography components using the design system
 * Consistent text styling throughout the application
 */

// Heading component
const headingVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        h1: 'text-4xl md:text-5xl lg:text-6xl',
        h2: 'text-3xl md:text-4xl lg:text-5xl',
        h3: 'text-2xl md:text-3xl lg:text-4xl',
        h4: 'text-xl md:text-2xl lg:text-3xl',
        h5: 'text-lg md:text-xl lg:text-2xl',
        h6: 'text-base md:text-lg lg:text-xl',
      },
      textColor: {
        default: 'text-gentle-charcoal',
        primary: 'text-gentle-charcoal',
        secondary: 'text-soft-shadow',
        accent: 'text-hope-gold',
        muted: 'text-whisper-gray',
      },
    },
    defaultVariants: {
      size: 'h1',
      textColor: 'default',
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, textColor, as = 'h1', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, textColor, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';

// Text component
const textVariants = cva(
  'leading-7',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
      },
      textColor: {
        default: 'text-gentle-charcoal',
        primary: 'text-gentle-charcoal',
        secondary: 'text-soft-shadow',
        accent: 'text-hope-gold',
        muted: 'text-whisper-gray',
        error: 'text-error',
        success: 'text-growth-green',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'base',
      textColor: 'default',
      weight: 'normal',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, textColor, weight, as = 'p', ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, textColor, weight, className }))}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

// Quote component
export interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  size?: 'sm' | 'base' | 'lg' | 'md'; // Add 'md' to supported sizes
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, size = 'base', ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-sm',
      base: 'text-base',
      md: 'text-base', // 'md' as alias for 'base'
      lg: 'text-lg md:text-xl',
    };

    return (
      <blockquote
        ref={ref}
        className={cn(
          'border-l-4 border-hope-gold pl-6 italic text-soft-shadow',
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Quote.displayName = 'Quote';

export { Heading, Text, Quote, headingVariants, textVariants }; 