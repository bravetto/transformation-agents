"use client";

import { ErrorBoundary } from './error-boundary';
import ErrorBoundaryWrapper from './error-boundary-wrapper';
import { withErrorBoundary } from './with-error-boundary';
import Section from './section';
import { Card } from './ui/card';
import { Heading, Text } from './ui/typography';
import { Button } from './ui/button';

// Example component that throws an error
const BrokenComponent = () => {
  throw new Error('This component intentionally throws an error');
};

export default function ExampleParentWithErrorBoundaries() {
  return (
    <Section padding="large" className="bg-comfort-cream">
      <Heading size="h1">Error Boundary Examples</Heading>
      
      <div className="grid gap-8 mt-8">
        {/* Example 1: Direct ErrorBoundary usage */}
        <Card className="p-6">
          <Heading size="h2" className="mb-4">Direct Usage</Heading>
          <ErrorBoundary fallback={<div className="text-red-500">Something went wrong!</div>}>
            <BrokenComponent />
          </ErrorBoundary>
        </Card>

        {/* Example 2: Using ErrorBoundaryWrapper */}
        <Card className="p-6">
          <Heading size="h2" className="mb-4">With Wrapper</Heading>
          <ErrorBoundaryWrapper
            fallback={<div className="text-red-500 p-4 border border-red-300 rounded">Error caught by wrapper!</div>}
          >
            <BrokenComponent />
          </ErrorBoundaryWrapper>
        </Card>

        {/* Example 3: Using HOC pattern */}
        <Card className="p-6">
          <Heading size="h2" className="mb-4">HOC Pattern</Heading>
          <EnhancedBrokenComponent />
        </Card>
      </div>
    </Section>
  );
}

// Example of using the HOC pattern
const EnhancedBrokenComponent = withErrorBoundary(BrokenComponent, {
  componentName: 'BrokenComponent',
  fallback: <div className="text-red-500 font-bold">Error handled by HOC!</div>
}); 