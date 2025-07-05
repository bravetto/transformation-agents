# 🚨 IMMEDIATE FIXES - The Bridge Project

This document outlines critical fixes that should be addressed immediately to ensure the codebase is stable and production-ready.

## 1. Fix TypeScript Errors in Tests

**Issue**: The test file `src/components/ui/__tests__/button.test.tsx` has 16 TypeScript errors related to missing Jest matchers.

**Fix**:

```typescript
// src/setupTests.ts - Ensure this file is properly set up
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
```

Also ensure that `jest.config.js` properly imports the setup file:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // ... other config
};
```

## 2. Add Null Checks to Components

### SynchronicityMap Component

**Issue**: The component doesn't properly check for null/undefined values before accessing array elements.

**Fix**:

```typescript
// src/components/people/synchronicity-map.tsx
function SynchronicityMap({ title, description, timeline = [], formula }: SynchronicityMapProps) {
  return (
    <div className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {description}
      </p>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line - Only show if timeline exists and has items */}
        {timeline && timeline.length > 0 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
        )}
        
        {/* Timeline events */}
        <div className="space-y-12">
          {/* Improved null check and empty state handling */}
          {timeline && timeline.length > 0 ? timeline.map((item, index) => (
            <motion.div
              key={item.year || index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-primary mb-2">{item.year}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.event}</p>
                </div>
              </div>
              
              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
            </motion.div>
          )) : (
            <div className="text-center text-muted-foreground">No timeline data available</div>
          )}
        </div>
        
        {/* Formula - Only render if formula exists */}
        {formula && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-8 rounded-lg inline-block">
              <p className="text-xl font-bold text-primary">{formula}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

### AssessmentAlignment Component

**Issue**: Similar null check issues.

**Fix**:

```typescript
// src/components/people/assessment-alignment.tsx
function AssessmentAlignment({ title, description, alignments = [], message }: AssessmentAlignmentProps) {
  return (
    <div className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">{description}</p>
        
        <div className="space-y-6">
          {alignments && alignments.length > 0 ? alignments.map((alignment, index) => (
            <motion.div
              key={alignment.trait || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">{alignment.trait}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Jay</p>
                  <p className="text-2xl font-bold text-primary">{alignment.person1Score}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">JAHmere</p>
                  <p className="text-2xl font-bold text-primary">{alignment.person2Score}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">{alignment.meaning}</p>
            </motion.div>
          )) : (
            <div className="text-center text-muted-foreground">No alignment data available</div>
          )}
        </div>
        
        {/* Only render if message exists */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-lg font-medium text-primary">{message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
```

## 3. Fix PersonData Type Definition

**Issue**: The `sections` array in the `PersonData` interface is missing the `hero` type which is used in the data files.

**Fix**:

```typescript
// src/types/person.ts
export interface PersonData {
  id: string;
  slug: string;
  name: string;
  title: string;
  heroImage: string;
  
  // Primary testimony
  testimony: {
    quote: string;
    context: string;
    date: string;
  };
  
  // Impact metrics
  impact: ImpactData;
  
  // Sections for the person's page
  sections: Array<{
    id?: string;
    type: 'hero' | 'testimony' | 'impact' | 'letter' | 'video' | 'custom';
    content: any; // Content varies based on type
  }>;
  
  // Metadata for SEO
  metadata?: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
```

## 4. Remove console.log Statements

**Issue**: There are console.log statements in production code.

**Fix**:

```typescript
// src/app/contact/page.tsx
// Replace:
console.log('Form submitted:', formData);

// With:
// Use a proper logging solution or remove entirely for production
```

```typescript
// src/app/letter-to-dungy/page.tsx
// Replace:
console.log('Letter sent to Tony Dungy');

// With:
// Use a proper logging solution or remove entirely for production
```

## 5. Update next.config.js

**Issue**: The next.config.js file has TODO comments and is ignoring TypeScript and ESLint errors.

**Fix**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove these for production after fixing errors
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ['images.unsplash.com', 'thebridgeproject.org'],
  },
  // Production optimizations
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  // Security headers are in vercel.json
};

module.exports = nextConfig;
```

## 6. Add Missing Optional Chaining

**Issue**: Several components access properties without checking if the parent object exists.

**Fix**:

```typescript
// Throughout codebase, use optional chaining:
// Before:
const description = person.metadata.description;

// After:
const description = person?.metadata?.description;
```

## 7. Fix Test Configuration

**Issue**: Jest configuration is incomplete.

**Fix**:

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/types/**/*',
  ],
};
``` 