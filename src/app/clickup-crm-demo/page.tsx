"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withErrorBoundary } from "@/components/ui/error-boundary";

function ClickUpCRMDemoPage() {
  const divineLove = useDivineLove("ClickUpCRMDemo");

  useEffect(() => {
    divineLove.manifest();
  }, [divineLove]);

  return (
    <div className="clickup-crm-demo">
      <h1>ClickUp CRM Demo</h1>
      {/* Demo content */}
    </div>
  );
}

export default withErrorBoundary(ClickUpCRMDemoPage, "ClickUpCRMDemo", (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">ClickUp CRM Demo Error</h1>
      <p>There was an error loading the CRM demo. Please try again later.</p>
    </div>
  ));
