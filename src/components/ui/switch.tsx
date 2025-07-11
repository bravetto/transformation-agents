"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  [
    "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-gold data-[state=unchecked]:bg-white/10",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-gold",
        purple: "data-[state=checked]:bg-purple",
        success: "data-[state=checked]:bg-success",
      },
      size: {
        default: "h-[24px] w-[44px]",
        sm: "h-[20px] w-[36px]",
        lg: "h-[28px] w-[52px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-lg ring-0",
    "transition-transform",
    "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  ].join(" "),
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  thumbSize?: VariantProps<typeof thumbVariants>["size"];
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      thumbSize = size,
      label,
      description,
      ...props
    },
    ref,
  ) => (
    <div className="flex items-start space-x-2">
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(thumbVariants({ size: thumbSize }))}
        />
      </SwitchPrimitives.Root>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={props.id}
              className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-white/60">{description}</p>
          )}
        </div>
      )}
    </div>
  ),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
