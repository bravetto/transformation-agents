"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="bg-red-50 border-2 border-red-100 rounded-lg p-8 max-w-xl w-full">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Something went wrong
        </h2>

        <p className="mb-6 text-gray-700">
          We apologize for the inconvenience. Please try again.
        </p>

        <div className="bg-white p-4 rounded mb-6 overflow-auto max-h-32">
          <p className="font-mono text-sm text-red-500">
            {error.message || "An unexpected error occurred"}
            {error.digest && (
              <span className="block mt-1 text-gray-500">({error.digest})</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="default" onClick={reset}>
            Try again
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Return to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
