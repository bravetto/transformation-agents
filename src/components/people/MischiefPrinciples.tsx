"use client";

import React from "react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { Card } from "@/components/ui/card";

function MischiefPrinciples() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Mischief Principles</h3>
      <div className="space-y-3">
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Creative Chaos</p>
          <p className="text-sm text-muted-foreground">
            Finding joy in the unexpected
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Playful Wisdom</p>
          <p className="text-sm text-muted-foreground">
            Learning through laughter
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Sacred Mischief</p>
          <p className="text-sm text-muted-foreground">
            Divine humor in action
          </p>
        </div>
      </div>
    </Card>
  );
}

export default withDivineErrorBoundary(MischiefPrinciples, {
  componentName: "MischiefPrinciples",
  role: "lightworker",
});
