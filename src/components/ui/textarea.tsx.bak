"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [
    "flex w-full min-h-[80px] rounded-md border border-shadow/30 bg-white/5 px-3 py-2 text-sm",
    "ring-offset-midnight placeholder:text-white/30",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-200 resize-vertical",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "text-white",
        accent: "border-gold/50 text-gold focus-visible:ring-gold",
        error:
          "border-error text-error placeholder:text-error/50 focus-visible:ring-error",
      },
      size: {
        default: "min-h-[80px]",
        sm: "min-h-[60px] px-2 py-1 text-xs",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
