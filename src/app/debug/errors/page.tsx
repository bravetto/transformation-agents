"use client";

import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  RefreshCw,
  Download,
} from "lucide-react";
import { useState } from "react";

function ErrorLogViewerPage() {
  const [selectedError, setSelectedError] = useState<any>(null);

  // Mock error logs
  const errorLogs = [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      level: "error",
      message: "Failed to fetch user data",
      stack:
        "Error: Failed to fetch user data\n    at fetchUserData (user-service.ts:45)\n    at async UserProfile (user-profile.tsx:23)",
      context: { userId: "12345", endpoint: "/api/users/12345" },
      count: 3,
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      level: "warning",
      message: "API rate limit approaching",
      stack: null,
      context: { remaining: 50, limit: 1000 },
      count: 1,
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      level: "error",
      message: "Database connection timeout",
      stack:
        "Error: Connection timeout\n    at PostgresClient.connect (db.ts:123)\n    at async getUsers (user-repository.ts:56)",
      context: { database: "production", timeout: 30000 },
      count: 5,
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      level: "info",
      message: "Cache invalidated successfully",
      stack: null,
      context: { cacheKey: "user-list", size: "2.3MB" },
      count: 1,
    },
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "info":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Error Log Viewer</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Error Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-gray-400">Errors</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">8</p>
        </Card>
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">Warnings</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">12</p>
        </Card>
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400">Info</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">24</p>
        </Card>
      </div>

      {/* Error Logs */}
      <Card className="bg-gray-800 border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Logs</h2>
          <div className="space-y-2">
            {errorLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedError(log)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-700/50 ${getLevelColor(log.level)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getLevelIcon(log.level)}
                    <div className="flex-1">
                      <p className="font-medium text-white">{log.message}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatTimestamp(log.timestamp)}
                      </p>
                    </div>
                  </div>
                  {log.count > 1 && (
                    <Badge variant="secondary" className="ml-2">
                      {log.count}x
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Error Details Modal */}
      {selectedError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <Card className="w-full max-w-2xl bg-gray-800 border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Error Details
                </h3>
                <button
                  onClick={() => setSelectedError(null)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Message</p>
                  <p className="text-white mt-1">{selectedError.message}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Timestamp</p>
                  <p className="text-white mt-1">
                    {formatTimestamp(selectedError.timestamp)}
                  </p>
                </div>

                {selectedError.stack && (
                  <div>
                    <p className="text-sm text-gray-400">Stack Trace</p>
                    <pre className="mt-1 p-3 bg-gray-900 rounded text-sm text-gray-300 overflow-x-auto">
                      {selectedError.stack}
                    </pre>
                  </div>
                )}

                {selectedError.context && (
                  <div>
                    <p className="text-sm text-gray-400">Context</p>
                    <pre className="mt-1 p-3 bg-gray-900 rounded text-sm text-gray-300 overflow-x-auto">
                      {JSON.stringify(selectedError.context, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default withDivineErrorBoundary(ErrorLogViewerPage, {
  componentName: "ErrorLogViewerPage",
  fallback: (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      Error loading error logs
    </div>
  ),
});
