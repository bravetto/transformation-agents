"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heading, Text, Button, Card, Container } from "@/components/ui";
import DivineImage from "@/components/ui/divine-image";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";

// Test component that intentionally errors
function ErrorComponent() {
  // This will cause an error when the button is clicked
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("This is an intentional test error");
  }

  return (
    <div className="p-6 border border-dashed border-hope-gold rounded-lg">
      <Text>This component is wrapped in an error boundary.</Text>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => setShouldError(true)}
      >
        Trigger Error
      </Button>
    </div>
  );
}

// Different error boundary roles for testing
const TestErrorBoundaries = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div>
        <Text className="mb-2 font-semibold">Lightworker Error Boundary:</Text>
        <DivineErrorBoundary role="lightworker">
          <ErrorComponent />
        </DivineErrorBoundary>
      </div>

      <div>
        <Text className="mb-2 font-semibold">Messenger Error Boundary:</Text>
        <DivineErrorBoundary role="messenger">
          <ErrorComponent />
        </DivineErrorBoundary>
      </div>

      <div>
        <Text className="mb-2 font-semibold">Witness Error Boundary:</Text>
        <DivineErrorBoundary role="witness">
          <ErrorComponent />
        </DivineErrorBoundary>
      </div>

      <div>
        <Text className="mb-2 font-semibold">Guardian Error Boundary:</Text>
        <DivineErrorBoundary role="guardian">
          <ErrorComponent />
        </DivineErrorBoundary>
      </div>
    </div>
  );
};

// Test for asset fallbacks
const TestAssetFallbacks = () => {
  return (
    <div className="space-y-6 mb-12">
      <Heading as="h2" size="h3">
        Asset Fallback System
      </Heading>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Working image */}
        <div className="space-y-2">
          <Text size="sm" className="font-semibold">
            Working Image:
          </Text>
          <DivineImage
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={200}
            assetType="image"
            role="lightworker"
          />
        </div>

        {/* Missing image with fallback */}
        <div className="space-y-2">
          <Text size="sm" className="font-semibold">
            Missing Image:
          </Text>
          <DivineImage
            src="/images/non-existent-image.jpg"
            alt="Missing Image"
            width={200}
            height={200}
            assetType="image"
            role="messenger"
          />
        </div>

        {/* Missing signature with fallback */}
        <div className="space-y-2">
          <Text size="sm" className="font-semibold">
            Missing Signature:
          </Text>
          <DivineImage
            src="/images/signatures/tony-dungy.png"
            alt="Tony Dungy Signature"
            width={200}
            height={100}
            assetType="signature"
            name="Tony Dungy"
            role="guardian"
          />
        </div>

        {/* Missing video thumbnail with fallback */}
        <div className="space-y-2">
          <Text size="sm" className="font-semibold">
            Missing Video Thumbnail:
          </Text>
          <DivineImage
            src="/images/video-thumbnails/jahmere-testimony.jpg"
            alt="Jahmere Video"
            width={200}
            height={120}
            assetType="video-thumbnail"
            name="Jahmere's Testimony"
            role="witness"
          />
        </div>
      </div>
    </div>
  );
};

// Test recovery page
export default function TestRecoveryPage() {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="h1" className="mb-4">
          Recovery System Test
        </Heading>
        <Text className="mb-8">
          This page tests the error boundary and asset management systems
          implemented during the emergency stabilization phase.
        </Text>

        <Card className="mb-8 p-6">
          <Heading as="h2" size="h3" className="mb-4">
            Error Boundary System
          </Heading>
          <Text className="mb-6">
            Click the buttons below to trigger errors and see how each
            role-themed error boundary handles them. The error boundaries will
            catch the errors and display beautiful fallback UI with recovery
            options.
          </Text>

          <TestErrorBoundaries />
        </Card>

        <Card className="mb-8 p-6">
          <Heading as="h2" size="h3" className="mb-4">
            Asset Management System
          </Heading>
          <Text className="mb-6">
            The images below demonstrate the asset fallback system. Missing
            assets are replaced with beautiful role-themed fallbacks.
          </Text>

          <TestAssetFallbacks />
        </Card>

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </Container>
  );
}
