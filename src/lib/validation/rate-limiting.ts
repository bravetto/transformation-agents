import { headers } from "next/headers";

// Rate limiting configuration
const RATE_LIMITS = {
  prayer: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 prayers per 15 minutes
  witness: { maxRequests: 1, windowMs: 24 * 60 * 60 * 1000 }, // 1 witness per day
  contact: { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 contacts per hour
} as const;

// In-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export type RateLimitType = keyof typeof RATE_LIMITS;

export function getRateLimitKey(
  type: RateLimitType,
  identifier: string,
): string {
  return `${type}:${identifier}`;
}

export async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",")[0]
    : headersList.get("x-real-ip") || "unknown";
  return ip;
}

export async function checkRateLimit(
  type: RateLimitType,
  identifier?: string,
): Promise<{ allowed: boolean; remainingRequests: number; resetTime: number }> {
  const clientId = identifier || (await getClientIdentifier());
  const key = getRateLimitKey(type, clientId);
  const config = RATE_LIMITS[type];
  const now = Date.now();

  const existing = rateLimitStore.get(key);

  // Clean expired entries
  if (existing && now > existing.resetTime) {
    rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(key) || {
    count: 0,
    resetTime: now + config.windowMs,
  };

  if (current.count >= config.maxRequests) {
    return {
      allowed: false,
      remainingRequests: 0,
      resetTime: current.resetTime,
    };
  }

  // Increment count
  current.count++;
  rateLimitStore.set(key, current);

  return {
    allowed: true,
    remainingRequests: config.maxRequests - current.count,
    resetTime: current.resetTime,
  };
}

export function getRateLimitError(resetTime: number): string {
  const minutes = Math.ceil((resetTime - Date.now()) / 60000);
  return `Rate limit exceeded. Please try again in ${minutes} minute${minutes !== 1 ? "s" : ""}.`;
}
