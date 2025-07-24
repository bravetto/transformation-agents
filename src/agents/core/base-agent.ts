/**
 * Base Divine Agent - Foundation for all divine engineering monitoring agents
 * Part of the JAHmere Webb Freedom Portal divine intelligence system
 */

import { logger } from "@/lib/logger";

export interface DivineAgentConfig {
  name: string;
  mission: string;
  spiritualLevel: "guardian" | "messenger" | "warrior" | "prophet";
  alertThreshold: "low" | "medium" | "high" | "critical" | "divine";
}

export abstract class BaseDivineAgent {
  protected config: DivineAgentConfig;
  protected isActive: boolean = false;
  protected lastHeartbeat: Date = new Date();

  constructor(config: DivineAgentConfig) {
    this.config = config;
    this.initialize();
  }

  protected initialize(): void {
    this.isActive = true;
    this.heartbeat();
    logger.info(`Divine Agent ${this.config.name} initialized`, {
      mission: this.config.mission,
      spiritualLevel: this.config.spiritualLevel,
    });
  }

  protected heartbeat(): void {
    this.lastHeartbeat = new Date();
    logger.debug(`Divine Agent ${this.config.name} heartbeat`, {
      timestamp: this.lastHeartbeat.toISOString(),
    });
  }

  protected logDivineEvent(
    message: string,
    level: "info" | "warn" | "error" | "divine" = "info",
    metadata?: any,
  ): void {
    const logData = {
      agent: this.config.name,
      mission: this.config.mission,
      spiritualLevel: this.config.spiritualLevel,
      ...metadata,
    };

    if (level === "divine") {
      logger.info(`🔥 DIVINE: ${message}`, logData);
    } else {
      logger[level](message, logData);
    }
  }

  // Abstract methods that implementing agents must define
  abstract execute(): Promise<void>;
  abstract getStatus(): { healthy: boolean; message: string; lastRun?: Date };

  public async start(): Promise<void> {
    try {
      this.isActive = true;
      await this.execute();
      this.heartbeat();
    } catch (error) {
      this.logDivineEvent(`Agent execution failed: ${error}`, "error", {
        error,
      });
      throw error;
    }
  }

  public stop(): void {
    this.isActive = false;
    this.logDivineEvent(`Agent ${this.config.name} stopped`, "info");
  }

  public isRunning(): boolean {
    return this.isActive;
  }
}
