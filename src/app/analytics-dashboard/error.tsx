"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AnalyticsDashboardError({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Log error for monitoring
    console.error("Analytics Dashboard Error:", error);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry, LogRocket, etc.
      // captureException(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardContent className="p-8 text-center space-y-6">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-red-100 rounded-full">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </motion.div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Error
              </h1>
              <p className="text-gray-600">
                The analytics dashboard encountered an unexpected error and
                needs to be restarted.
              </p>
            </div>

            {/* Error Details */}
            {process.env.NODE_ENV === "development" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-lg p-4 text-left"
              >
                <h3 className="font-medium text-gray-900 mb-2">
                  Error Details:
                </h3>
                <code className="text-sm text-red-600 break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={reset}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart Dashboard
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
              </div>
            </div>

            {/* Support Information */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>If this error persists, please contact support.</p>
              <p>Error occurred at: {new Date().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
