'use client';

import * as React from 'react';
import { UploadCloud, X, FileIcon, Image as ImageIcon, File, AlertCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from './button';

const fileUploadVariants = cva(
  [
    'relative flex flex-col items-center justify-center w-full rounded-md',
    'border-2 border-dashed border-white/20',
    'transition-colors duration-200 ease-in-out',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-midnight',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-white/5 hover:bg-white/10',
        error: 'bg-error/5 border-error/30 hover:bg-error/10',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface FileUploadProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof fileUploadVariants> {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFileTypes?: string[];
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  error?: string;
  files?: File[];
  onRemoveFile?: (index: number) => void;
  showPreview?: boolean;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ 
    className, 
    variant, 
    size, 
    onFilesSelected,
    maxFiles = 1,
    maxSizeMB = 5,
    acceptedFileTypes,
    label = 'Drop files here or click to upload',
    description,
    icon,
    error,
    files = [],
    onRemoveFile,
    showPreview = true,
    ...props 
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragError, setDragError] = React.useState<string | null>(null);

    const isFileTooLarge = (file: File): boolean => {
      return file.size > maxSizeMB * 1024 * 1024;
    };

    const isFileTypeAccepted = (file: File): boolean => {
      if (!acceptedFileTypes || acceptedFileTypes.length === 0) return true;
      
      // Convert MIME types to extensions for easier comparison
      const mimeToExt: Record<string, string[]> = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'application/pdf': ['.pdf'],
        'text/plain': ['.txt'],
        // Add more as needed
      };
      
      // Check if the file type matches any accepted type
      return acceptedFileTypes.some(type => {
        // If it's a MIME type
        if (type.includes('/')) {
          return file.type === type;
        }
        // If it's an extension
        else {
          // Check direct extension match
          if (file.name.toLowerCase().endsWith(type.toLowerCase())) {
            return true;
          }
          
          // Check if the file's MIME type maps to an accepted extension
          const extensions = mimeToExt[file.type];
          if (extensions) {
            return extensions.some(ext => type.toLowerCase() === ext.toLowerCase());
          }
          
          return false;
        }
      });
    };

    const validateFiles = (fileList: FileList | null): { valid: File[], errors: string[] } => {
      if (!fileList) return { valid: [], errors: [] };
      
      const errors: string[] = [];
      const validFiles: File[] = [];
      
      // Check max files
      if (fileList.length + files.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
        return { valid: validFiles, errors };
      }
      
      // Validate each file
      Array.from(fileList).forEach(file => {
        if (isFileTooLarge(file)) {
          errors.push(`File "${file.name}" exceeds the maximum size of ${maxSizeMB}MB`);
        } else if (!isFileTypeAccepted(file)) {
          errors.push(`File type of "${file.name}" is not accepted`);
        } else {
          validFiles.push(file);
        }
      });
      
      return { valid: validFiles, errors };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { valid, errors } = validateFiles(e.target.files);
      
      if (errors.length > 0) {
        setDragError(errors[0]);
      } else if (valid.length > 0 && onFilesSelected) {
        onFilesSelected(valid);
      }
      
      // Reset input value to allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      setDragError(null);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      setDragError(null);
      
      const { valid, errors } = validateFiles(e.dataTransfer.files);
      
      if (errors.length > 0) {
        setDragError(errors[0]);
      } else if (valid.length > 0 && onFilesSelected) {
        onFilesSelected(valid);
      }
    };

    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    // Determine file icon based on mime type
    const getFileIcon = (file: File) => {
      if (file.type.startsWith('image/')) {
        return <ImageIcon className="h-5 w-5" />;
      } else if (file.type === 'application/pdf') {
        return <FileIcon className="h-5 w-5" />;
      } else {
        return <File className="h-5 w-5" />;
      }
    };

    const hasError = error || dragError;

    return (
      <div className="w-full space-y-2">
        <div
          className={cn(
            fileUploadVariants({ 
              variant: hasError ? 'error' : variant, 
              size, 
              className 
            }),
            isDragging && 'border-gold bg-white/10'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="sr-only"
            ref={(el) => {
              // Connect both refs
              if (el) {
                (inputRef as any).current = el;
                if (typeof ref === 'function') {
                  ref(el);
                } else if (ref) {
                  ref.current = el;
                }
              }
            }}
            onChange={handleChange}
            multiple={maxFiles > 1}
            accept={acceptedFileTypes?.join(',')}
            {...props}
          />
          
          <div className="flex flex-col items-center justify-center text-center p-4 space-y-3">
            {icon || <UploadCloud className="h-10 w-10 text-white/50" />}
            <div className="space-y-1">
              <p className="text-sm font-medium">{label}</p>
              {description && (
                <p className="text-xs text-white/60">{description}</p>
              )}
            </div>
            <Button 
              type="button" 
              onClick={handleButtonClick}
              variant="outline"
              size="sm"
            >
              Select File{maxFiles > 1 ? 's' : ''}
            </Button>
          </div>
        </div>
        
        {hasError && (
          <div className="flex items-center text-error text-sm mt-1.5">
            <AlertCircle className="h-4 w-4 mr-1.5" />
            <span>{error || dragError}</span>
          </div>
        )}
        
        {showPreview && files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-white/5 rounded-md p-2 text-sm"
              >
                <div className="flex items-center space-x-2">
                  {getFileIcon(file)}
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <span className="text-white/50 text-xs">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                {onRemoveFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onRemoveFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export { FileUpload }; 