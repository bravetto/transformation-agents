// Simplified interfaces replacing complex consciousness system
export interface ComponentHealth {
  status: "active" | "idle" | "error";
  renders: number;
  errors: number;
  lastError?: string;
  performance: "optimal" | "degraded" | "critical";
}

export interface ComponentFeatures {
  lazyLoading: boolean;
  errorRecovery: boolean;
  statePreservation: boolean;
  analyticsEnabled: boolean;
}

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  updateFrequency: number;
  optimizationLevel: "basic" | "enhanced" | "maximum";
}

export interface UserActivityTracker {
  isActive: boolean;
  lastInteraction: number;
  sessionDuration: number;
  interactionCount: number;
}
