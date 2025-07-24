import { cache } from "react";

/**
 * Generate a unique identifier for A/B testing
 * Uses React cache to ensure consistency within a single request
 */
export const generateId = cache((): string => {
  // Generate timestamp-based ID with random component
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
});

/**
 * Generate a deterministic variant assignment based on user ID
 * This ensures users consistently see the same variant
 */
export function assignVariant<T extends string>(
  userId: string,
  variants: T[],
  weights?: Record<T, number>,
): T {
  // Simple hash function for consistent assignment
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Normalize hash to 0-1 range
  const normalizedHash = Math.abs(hash) / 2147483647;

  if (weights) {
    // Weighted assignment
    let cumulativeWeight = 0;
    const totalWeight = (Object.values(weights) as number[]).reduce(
      (sum: number, weight: number) => sum + weight,
      0,
    );

    for (const variant of variants) {
      cumulativeWeight += (weights[variant] || 0) / totalWeight;
      if (normalizedHash <= cumulativeWeight) {
        return variant;
      }
    }
  }

  // Equal distribution fallback
  const index = Math.floor(normalizedHash * variants.length);
  return variants[index] || variants[0];
}

/**
 * Check if user should be included in experiment based on traffic allocation
 */
export function shouldIncludeInExperiment(
  userId: string,
  trafficAllocation: number = 1.0,
): boolean {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const normalizedHash = Math.abs(hash) / 2147483647;
  return normalizedHash <= trafficAllocation;
}
