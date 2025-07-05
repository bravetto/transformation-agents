import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Container component for consistent layout spacing
 * Controls max-width and horizontal padding
 */
const containerVariants = cva(
  // Base styles
  'mx-auto px-4 sm:px-6 w-full',
  {
    variants: {
      // Size variants
      size: {
        xs: 'max-w-screen-sm',  // 640px
        sm: 'max-w-screen-md',  // 768px
        md: 'max-w-screen-lg',  // 1024px
        lg: 'max-w-screen-xl',  // 1280px
        xl: 'max-w-screen-2xl', // 1536px
        full: 'max-w-none',     // No max-width
      },
      
      // Padding variants
      padding: {
        none: 'px-0 sm:px-0',
        sm: 'px-2 sm:px-4',
        md: 'px-4 sm:px-6',
        lg: 'px-6 sm:px-8',
        xl: 'px-8 sm:px-10',
      },
      
      // Vertical padding
      py: {
        none: 'py-0',
        sm: 'py-4',
        md: 'py-8',
        lg: 'py-12',
        xl: 'py-16',
        '2xl': 'py-24',
      },
    },
    defaultVariants: {
      size: 'md',
      padding: 'md',
      py: 'none',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

/**
 * Container component
 * Used for consistent horizontal spacing and max-width
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, py, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size, padding, py, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export default Container; 