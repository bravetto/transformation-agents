"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  [
    "peer h-4 w-4 shrink-0 rounded-sm border border-shadow/30",
    "ring-offset-midnight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:text-white",
    "data-[state=checked]:border-gold",
    "transition-colors duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-purple",
        accent: "data-[state=checked]:bg-gold",
        primary: "data-[state=checked]:bg-purple",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, label, description, ...props }, ref) => (
  <div className="flex items-start gap-2">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
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
        {description && <p className="text-sm text-white/60">{description}</p>}
      </div>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
