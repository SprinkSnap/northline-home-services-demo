import { describe, expect, it, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimitStore } from '../../src/lib/rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it('allows requests under the limit', () => {
    const first = checkRateLimit('test', 2, 60_000, 1_000);
    const second = checkRateLimit('test', 2, 60_000, 1_100);
    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
  });

  it('blocks when the limit is exceeded', () => {
    checkRateLimit('test', 2, 60_000, 1_000);
    checkRateLimit('test', 2, 60_000, 1_100);
    const third = checkRateLimit('test', 2, 60_000, 1_200);
    expect(third.allowed).toBe(false);
    expect(third.retryAfterSeconds).toBeGreaterThan(0);
  });
});
