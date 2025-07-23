// Simple in-memory rate limiter for AI letter generation
interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

class InMemoryRateLimit {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number = 5, windowMs: number = 60 * 60 * 1000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const key = identifier;
    const current = this.requests.get(key);

    // Clean up expired entries periodically
    if (Math.random() < 0.1) {
      this.cleanup(now);
    }

    if (!current || now > current.resetTime) {
      // Create new window
      this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
      return {
        success: true,
        limit: this.limit,
        remaining: this.limit - 1,
        reset: now + this.windowMs,
      };
    }

    if (current.count >= this.limit) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.limit,
        remaining: 0,
        reset: current.resetTime,
      };
    }

    // Increment count
    current.count++;
    return {
      success: true,
      limit: this.limit,
      remaining: this.limit - current.count,
      reset: current.resetTime,
    };
  }

  private cleanup(now: number) {
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Create rate limiter instance
export const ratelimit = new InMemoryRateLimit(5, 60 * 60 * 1000); // 5 requests per hour

// Export for backward compatibility
export const rateLimitForAI = ratelimit;
