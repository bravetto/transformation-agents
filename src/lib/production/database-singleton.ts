/**
 * Production Database Singleton Pattern
 * Handles connection pooling, graceful shutdown, and error recovery
 */

interface DatabaseConfig {
  url: string;
  maxConnections: number;
  idleTimeout: number;
  connectionTimeout: number;
  enableLogging: boolean;
}

interface QueryOptions {
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheKey?: string;
  cacheTtl?: number;
}

class ProductionDatabase {
  private static instance: ProductionDatabase;
  private pool: any; // Replace with your DB client type
  private connectionCount = 0;
  private isShuttingDown = false;
  private queryCache = new Map<string, { data: any; expires: number }>();

  private constructor(private config: DatabaseConfig) {
    this.initializePool();
    this.setupGracefulShutdown();
  }

  static getInstance(config?: DatabaseConfig): ProductionDatabase {
    if (!ProductionDatabase.instance) {
      if (!config) {
        throw new Error("Database config required for first initialization");
      }
      ProductionDatabase.instance = new ProductionDatabase(config);
    }
    return ProductionDatabase.instance;
  }

  private async initializePool() {
    try {
      // Initialize your database pool here
      // This is a generic pattern - adapt for your DB client
      console.log("[DATABASE] Initializing connection pool...");

      // Example for various databases:
      // PostgreSQL: new Pool({ connectionString: this.config.url, max: this.config.maxConnections })
      // MongoDB: new MongoClient(this.config.url, { maxPoolSize: this.config.maxConnections })
      // Redis: new Redis(this.config.url, { maxRetriesPerRequest: 3 })

      console.log("[DATABASE] Connection pool ready");
    } catch (error) {
      console.error("[DATABASE] Failed to initialize pool:", error);
      throw error;
    }
  }

  private setupGracefulShutdown() {
    const shutdown = async () => {
      if (this.isShuttingDown) return;

      console.log("[DATABASE] Graceful shutdown initiated...");
      this.isShuttingDown = true;

      try {
        // Wait for active connections to complete
        let attempts = 0;
        while (this.connectionCount > 0 && attempts < 10) {
          console.log(
            `[DATABASE] Waiting for ${this.connectionCount} connections...`,
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
          attempts++;
        }

        // Close pool
        if (this.pool) {
          await this.pool.end();
          console.log("[DATABASE] Pool closed successfully");
        }
      } catch (error) {
        console.error("[DATABASE] Error during shutdown:", error);
      }
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    process.on("beforeExit", shutdown);
  }

  async executeQuery<T>(
    query: string,
    params: any[] = [],
    options: QueryOptions = {},
  ): Promise<T> {
    if (this.isShuttingDown) {
      throw new Error("Database is shutting down");
    }

    const {
      timeout = 30000,
      retries = 3,
      cache = false,
      cacheKey,
      cacheTtl = 300000, // 5 minutes
    } = options;

    // Check cache first
    if (cache && cacheKey) {
      const cached = this.queryCache.get(cacheKey);
      if (cached && cached.expires > Date.now()) {
        return cached.data;
      }
    }

    this.connectionCount++;

    try {
      const result = await this.retryOperation(
        () => this.performQuery<T>(query, params, timeout),
        retries,
      );

      // Cache result if requested
      if (cache && cacheKey && result) {
        this.queryCache.set(cacheKey, {
          data: result,
          expires: Date.now() + cacheTtl,
        });
      }

      return result;
    } finally {
      this.connectionCount--;
    }
  }

  private async performQuery<T>(
    query: string,
    params: any[],
    timeout: number,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Query timeout after ${timeout}ms`));
      }, timeout);

      try {
        // Execute query with your database client
        // This is pseudocode - adapt for your specific database
        // const result = await this.pool.query(query, params);
        // resolve(result.rows || result);

        // For demo - replace with actual query execution
        clearTimeout(timer);
        resolve({} as T);
      } catch (error) {
        clearTimeout(timer);
        reject(error);
      }
    });
  }

  private async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on certain errors
        if (this.isNonRetryableError(error)) {
          throw error;
        }

        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise((resolve) => setTimeout(resolve, delay));
          console.warn(
            `[DATABASE] Retry attempt ${attempt + 1} after ${delay}ms`,
          );
        }
      }
    }

    throw lastError!;
  }

  private isNonRetryableError(error: any): boolean {
    // Define errors that shouldn't be retried
    const nonRetryableMessages = [
      "syntax error",
      "permission denied",
      "relation does not exist",
      "column does not exist",
    ];

    const message = error?.message?.toLowerCase() || "";
    return nonRetryableMessages.some((msg) => message.includes(msg));
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple health check query
      await this.executeQuery("SELECT 1", [], { timeout: 5000 });
      return true;
    } catch (error) {
      console.error("[DATABASE] Health check failed:", error);
      return false;
    }
  }

  clearCache(): void {
    this.queryCache.clear();
    console.log("[DATABASE] Query cache cleared");
  }

  getStats() {
    return {
      activeConnections: this.connectionCount,
      cacheSize: this.queryCache.size,
      isShuttingDown: this.isShuttingDown,
    };
  }
}

// Export singleton instance factory
export const createDatabase = (config: DatabaseConfig) => {
  return ProductionDatabase.getInstance(config);
};

// Export default configuration
export const defaultDatabaseConfig: DatabaseConfig = {
  url: process.env.DATABASE_URL || "postgresql://localhost:5432/bridge_project",
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || "20"),
  idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || "30000"),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || "5000"),
  enableLogging: process.env.NODE_ENV !== "production",
};
