"use client";

import React from "react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { Card } from "@/components/ui/card";

function WisdomPrinciples() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Wisdom Principles</h3>
      <div className="space-y-3">
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Deep Understanding</p>
          <p className="text-sm text-muted-foreground">
            Seeing beyond the surface
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Compassionate Action</p>
          <p className="text-sm text-muted-foreground">Love in motion</p>
        </div>
        <div className="p-3 bg-primary/10 rounded">
          <p className="font-medium">Eternal Growth</p>
          <p className="text-sm text-muted-foreground">Always becoming</p>
        </div>
      </div>
    </Card>
  );
}

export default withDivineErrorBoundary(WisdomPrinciples, {
  componentName: "WisdomPrinciples",
  role: "lightworker",
});
