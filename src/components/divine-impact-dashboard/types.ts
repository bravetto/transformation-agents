import type { LucideIcon } from "lucide-react";

/**
 * Divine Role Type
 */
export type DivineRole = "guardian" | "messenger" | "transformer" | "catalyst" | "witness";

/**
 * Metric Card Interface
 * Defines the structure of a single metric card
 */
export interface MetricCard {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "stable";
    timeframe: string;
  };
  goal?: number;
  role: DivineRole;
}

/**
 * Props for the dashboard component
 */
export interface DivineImpactDashboardProps {
  className?: string;
  refreshInterval?: number; // in ms
  autoRefresh?: boolean;
  defaultRole?: DivineRole;
  metrics?: Partial<MetricCard>[];
}

/**
 * Props for metric card component
 */
export interface MetricCardProps {
  metric: MetricCard;
  animate?: boolean;
  className?: string;
}

/**
 * Dashboard Context Interface
 */
export interface DashboardContextType {
  metrics: MetricCard[];
  loading: boolean;
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  refreshInterval: number;
  autoRefresh: boolean;
  defaultRole: DivineRole;
}

/**
 * Dashboard Provider Props
 */
export interface DashboardProviderProps {
  children: React.ReactNode;
  refreshInterval?: number;
  autoRefresh?: boolean;
  defaultRole?: DivineRole;
  initialMetrics?: Partial<MetricCard>[];
}
