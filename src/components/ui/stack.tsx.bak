import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Stack component for consistent vertical spacing
 * A layout utility for stacking elements with consistent spacing
 */
const stackVariants = cva(
  // Base styles
  'flex',
  {
    variants: {
      // Direction variants
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        'row-reverse': 'flex-row-reverse',
        'column-reverse': 'flex-col-reverse',
      },
      
      // Spacing variants - maps to our spacing scale
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
        '3xl': 'gap-16',
      },
      
      // Alignment variants
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      
      // Justify variants
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      
      // Width variants
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
      
      // Padding variants
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      direction: 'column',
      spacing: 'md',
      align: 'stretch',
      justify: 'start',
      width: 'full',
      padding: 'none',
    },
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
}

/**
 * Stack component for consistent vertical spacing
 * Use for any vertically stacked content
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    align, 
    justify, 
    width, 
    padding, 
    as: Component = 'div', 
    ...props 
  }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(stackVariants({ 
          direction, 
          spacing, 
          align, 
          justify, 
          width, 
          padding, 
          className 
        })),
        ref,
        ...props,
      }
    );
  }
);
Stack.displayName = 'Stack';

export { stackVariants };
export default Stack; 