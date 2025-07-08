"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, ...props }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={cn("space-y-6 w-full", className)}
        {...props}
      />
    );
  },
);
Form.displayName = "Form";

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { children, className, label, description, error, required, htmlFor },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2 w-full", className)}>
        {label && (
          <Label
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-medium block mb-1.5",
              error && "text-error",
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && (
          <p className="text-sm text-white/60 mt-1.5">{description}</p>
        )}
        {error && (
          <p className="text-sm font-medium text-error mt-1.5">{error}</p>
        )}
      </div>
    );
  },
);
FormField.displayName = "FormField";

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ children, className, title, description }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4 md:space-y-6 w-full", className)}>
        {(title || description) && (
          <div className="space-y-1">
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {description && (
              <p className="text-sm text-white/60">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4 md:space-y-6 w-full">{children}</div>
      </div>
    );
  },
);
FormSection.displayName = "FormSection";

interface FormGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
  ({ children, className, columns = 2 }, ref) => {
    const gridColsClass = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns];

    return (
      <div
        ref={ref}
        className={cn(`grid ${gridColsClass} gap-4 md:gap-6 w-full`, className)}
      >
        {children}
      </div>
    );
  },
);
FormGrid.displayName = "FormGrid";

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  alignment?: "left" | "right" | "center" | "between";
}

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ children, className, alignment = "right" }, ref) => {
    const alignmentClass = {
      left: "justify-start",
      right: "justify-end",
      center: "justify-center",
      between: "justify-between",
    }[alignment];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col sm:flex-row gap-3 pt-4 md:pt-6 w-full",
          alignmentClass,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
FormActions.displayName = "FormActions";

export { Form, FormField, FormSection, FormGrid, FormActions };
