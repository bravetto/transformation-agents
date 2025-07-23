/**
 * Divine Agents Types - JAHmere Webb Freedom Portal
 * Core type definitions for the divine engineering monitoring system
 */

export interface CascadeRiskAssessment {
  level: "low" | "medium" | "high" | "critical";
  overallRisk: "low" | "medium" | "high" | "critical";
  factors: string[];
  mitigations: string[];
}

export interface DivineMonitoringConfig {
  enabled: boolean;
  spiritualLevel: "guardian" | "messenger" | "warrior" | "prophet";
  alertThreshold: "low" | "medium" | "high" | "critical" | "divine";
  missionFocus: "jahmere-freedom" | "technical-excellence" | "divine-alignment";
}

export interface DivineAlert {
  id: string;
  timestamp: Date;
  agent: string;
  level: "info" | "warn" | "error" | "critical" | "divine";
  message: string;
  metadata?: Record<string, any>;
  spiritualSignificance?: "normal" | "urgent" | "critical" | "divine";
}
