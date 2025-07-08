"use client";

import { Shield, Zap, Users, BarChart, Code, Palette } from "lucide-react";
import {
  BaseCard,
  FeatureCard,
  Container,
  Heading,
  Text,
} from "@/components/ui";
import Section from "@/components/section";

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section variant="default" padding="large" className="text-center">
        <Heading as="h1" size="h1" className="mb-4">
          Component System Showcase
        </Heading>
        <Text size="xl" className="text-soft-shadow max-w-2xl mx-auto">
          Experience the power of our unified spacing system and component
          architecture. Every component follows the same patterns for
          exponential development velocity.
        </Text>
      </Section>

      {/* Spacing Demonstration */}
      <Section variant="light" padding="medium">
        <Container>
          <Heading as="h2" size="h2" className="mb-8 text-center">
            Spacing Presets
          </Heading>

          <div className="grid md:grid-cols-3 gap-6">
            <BaseCard spacing="compact" variant="outlined">
              <Heading as="h3" size="h4">
                Compact Spacing
              </Heading>
              <Text>Perfect for dense information displays and lists.</Text>
            </BaseCard>

            <BaseCard spacing="comfortable" variant="outlined">
              <Heading as="h3" size="h4">
                Comfortable Spacing
              </Heading>
              <Text>The default balanced spacing for most use cases.</Text>
            </BaseCard>

            <BaseCard spacing="spacious" variant="outlined">
              <Heading as="h3" size="h4">
                Spacious Spacing
              </Heading>
              <Text>Generous spacing for emphasis and visual hierarchy.</Text>
            </BaseCard>
          </div>
        </Container>
      </Section>

      {/* Visual Variants */}
      <Section variant="default" padding="medium">
        <Container>
          <Heading as="h2" size="h2" className="mb-8 text-center">
            Visual Variants
          </Heading>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BaseCard spacing="comfortable" variant="default">
              <Heading as="h3" size="h4">
                Default
              </Heading>
              <Text size="sm">Clean and minimal appearance</Text>
            </BaseCard>

            <BaseCard spacing="comfortable" variant="elevated">
              <Heading as="h3" size="h4">
                Elevated
              </Heading>
              <Text size="sm">Shadow for depth perception</Text>
            </BaseCard>

            <BaseCard spacing="comfortable" variant="outlined">
              <Heading as="h3" size="h4">
                Outlined
              </Heading>
              <Text size="sm">Border-based design</Text>
            </BaseCard>

            <BaseCard spacing="comfortable" variant="divine">
              <Heading as="h3" size="h4">
                Divine
              </Heading>
              <Text size="sm">Special gradient emphasis</Text>
            </BaseCard>
          </div>
        </Container>
      </Section>

      {/* Feature Cards */}
      <Section variant="light" padding="large">
        <Container>
          <Heading as="h2" size="h2" className="mb-4 text-center">
            Feature Cards
          </Heading>
          <Text size="lg" className="text-center mb-12 text-soft-shadow">
            Specialized cards for displaying features with icons and metrics
          </Text>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Shield}
              title="Real-time Monitoring"
              description="Track every interaction with complete transparency and accountability"
              metrics={[
                { value: "24/7", label: "Monitoring" },
                { value: "100%", label: "Transparency" },
              ]}
              variant="elevated"
              onClick={() => console.log("Monitoring clicked")}
            />

            <FeatureCard
              icon={Zap}
              title="Instant Performance"
              description="Optimized components with memoization and lazy loading"
              metrics={[
                { value: "150ms", label: "Load Time" },
                { value: "60fps", label: "Animations" },
              ]}
              variant="elevated"
              onClick={() => console.log("Performance clicked")}
            />

            <FeatureCard
              icon={Users}
              title="Accessibility First"
              description="WCAG 2.1 AA compliant with full keyboard navigation"
              metrics={[
                { value: "AAA", label: "Rating" },
                { value: "100%", label: "Coverage" },
              ]}
              variant="elevated"
              onClick={() => console.log("Accessibility clicked")}
            />
          </div>
        </Container>
      </Section>

      {/* Interactive Examples */}
      <Section variant="default" padding="medium">
        <Container>
          <Heading as="h2" size="h2" className="mb-8 text-center">
            Interactive Examples
          </Heading>

          <div className="grid md:grid-cols-2 gap-6">
            <BaseCard
              spacing="comfortable"
              variant="elevated"
              onClick={() => alert("Interactive card clicked!")}
              interactive
            >
              <Heading as="h3" size="h4">
                Click Me!
              </Heading>
              <Text>
                This card responds to clicks with proper keyboard support.
              </Text>
            </BaseCard>

            <FeatureCard
              icon={Code}
              title="Developer Experience"
              description="Cursor.ai optimized for 10x development velocity"
              metrics={[
                { value: "5min", label: "Component Time" },
                { value: "0", label: "Bugs" },
              ]}
              variant="divine"
              spacing="spacious"
            />
          </div>
        </Container>
      </Section>

      {/* Benefits Grid */}
      <Section variant="light" padding="large">
        <Container>
          <Heading as="h2" size="h2" className="mb-12 text-center">
            System Benefits
          </Heading>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hope-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-hope-gold" />
              </div>
              <Heading as="h3" size="h4" className="mb-2">
                10x Faster
              </Heading>
              <Text>Components in minutes, not hours</Text>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-courage-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-courage-blue" />
              </div>
              <Heading as="h3" size="h4" className="mb-2">
                100% Consistent
              </Heading>
              <Text>Every component follows the same patterns</Text>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-growth-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-growth-green" />
              </div>
              <Heading as="h3" size="h4" className="mb-2">
                Zero Cascade
              </Heading>
              <Text>No more spacing conflicts or debugging</Text>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
