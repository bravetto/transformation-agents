'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from './label';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, ...props }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={cn('space-y-6', className)}
        {...props}
      />
    );
  }
);
Form.displayName = 'Form';

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
  ({ children, className, label, description, error, required, htmlFor }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {label && (
          <Label 
            htmlFor={htmlFor} 
            className={cn(error && 'text-error')}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && (
          <p className="text-sm text-white/60">{description}</p>
        )}
        {error && (
          <p className="text-sm font-medium text-error">{error}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ children, className, title, description }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-medium">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-white/60">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    );
  }
);
FormSection.displayName = 'FormSection';

interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
}

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ children, className }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('flex flex-col sm:flex-row sm:justify-end gap-3 pt-4', className)}
      >
        {children}
      </div>
    );
  }
);
FormActions.displayName = 'FormActions';

export { Form, FormField, FormSection, FormActions }; 