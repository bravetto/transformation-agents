import { PerformanceMonitor } from "@/agents/dashboard/performance-monitor";

export default function PerformanceMonitorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛡️ Bridge Project - Defensive Architecture
          </h1>
          <p className="text-gray-600">
            Real-time runtime error detection & performance monitoring
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Protecting your 7ms championship performance from infinite loops and
            cascade failures
          </p>
        </div>

        <PerformanceMonitor />
      </div>
    </div>
  );
}
