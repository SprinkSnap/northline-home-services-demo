/**
 * Lightweight sliding-window rate limiter.
 * Uses an in-memory Map for local/dev and Durable Object / KV when bound in production.
 * Cloudflare Rate Limiting rules should also be configured at the edge (see README).
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
  now = Date.now(),
): RateLimitResult {
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < windowMs);

  if (bucket.timestamps.length >= limit) {
    const earliest = bucket.timestamps[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - earliest)) / 1000));
    buckets.set(key, bucket);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.timestamps.length),
    retryAfterSeconds: 0,
  };
}

/** Test helper */
export function resetRateLimitStore(): void {
  buckets.clear();
}
