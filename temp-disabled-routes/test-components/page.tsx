"use client";

import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TestimonialCard from "@/components/testimonial-card";

function TestComponentsPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Component Library</h1>

      <div className="space-y-12">
        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
              <p className="text-gray-400">
                This is a basic card component with some content.
              </p>
            </Card>
            <Card className="p-6 border-blue-500">
              <h3 className="text-lg font-semibold mb-2">Colored Border</h3>
              <p className="text-gray-400">Card with a custom border color.</p>
            </Card>
            <Card className="p-6 bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">Dark Card</h3>
              <p className="text-gray-400">Card with dark background.</p>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Form Elements Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Form Elements
          </h2>
          <div className="max-w-md space-y-4">
            <div>
              <Label htmlFor="input">Input Field</Label>
              <Input id="input" placeholder="Enter text..." />
            </div>
            <div>
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea
                id="textarea"
                placeholder="Enter longer text..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="select">Select</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Testimonial Card Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">
            Testimonial Card
          </h2>
          <div className="max-w-2xl">
            <TestimonialCard
              quote="The Bridge Project has transformed our community in ways we never imagined possible."
              author="John Doe"
              role="Community Leader"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(TestComponentsPage, {
  componentName: "TestComponentsPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading component library
    </div>
  ),
});
