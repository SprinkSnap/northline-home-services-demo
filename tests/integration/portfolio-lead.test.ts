import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetRateLimitStore } from '../../src/lib/rate-limit';
import { setTestEnv } from '../../src/lib/env';

vi.mock('../../src/lib/turnstile', () => ({
  verifyTurnstile: vi.fn(async (token: string) => token === 'good-token'),
}));

import { POST } from '../../src/pages/api/portfolio-lead';

function makeRequest(body: unknown, init?: { origin?: string; ip?: string }) {
  return new Request('http://localhost:4321/api/portfolio-lead', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: init?.origin ?? 'http://localhost:4321',
      'cf-connecting-ip': init?.ip ?? '127.0.0.1',
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: 'Alex Contractor',
  email: 'alex@example.com',
  business_type: 'plumbing',
  existing_website: 'https://example.com',
  primary_goal: 'local-seo',
  package_interest: 'growth',
  message: 'Looking for a redesign',
  consent: true,
  company_website: '',
  turnstileToken: 'good-token',
  source_demo: 'northline-home-services',
};

describe('POST /api/portfolio-lead', () => {
  beforeEach(() => {
    resetRateLimitStore();
    setTestEnv(null);
  });

  it('validates and inserts into D1 when available', async () => {
    const bind = vi.fn().mockReturnValue({ run: vi.fn().mockResolvedValue({}) });
    const prepare = vi.fn().mockReturnValue({ bind });
    setTestEnv({
      DB: { prepare } as unknown as D1Database,
      TURNSTILE_SECRET_KEY: 'secret',
    });

    const response = await POST({
      request: makeRequest(validBody),
    } as never);

    expect(response.status).toBe(200);
    expect(prepare).toHaveBeenCalled();
    expect(bind).toHaveBeenCalled();
  });

  it('fails closed on Turnstile failure', async () => {
    setTestEnv({
      TURNSTILE_SECRET_KEY: 'secret',
      DB: { prepare: vi.fn() } as unknown as D1Database,
    });
    const response = await POST({
      request: makeRequest({ ...validBody, turnstileToken: 'bad-token' }),
    } as never);
    expect(response.status).toBe(400);
    const json = (await response.json()) as { error?: string };
    expect(json.error).toBe('TURNSTILE_FAILED');
  });

  it('rate limits repeated submissions', async () => {
    const prepare = vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({ run: vi.fn().mockResolvedValue({}) }),
    });
    setTestEnv({
      TURNSTILE_SECRET_KEY: 'secret',
      DB: { prepare } as unknown as D1Database,
    });

    for (let i = 0; i < 5; i += 1) {
      const ok = await POST({ request: makeRequest(validBody, { ip: '9.9.9.9' }) } as never);
      expect(ok.status).toBe(200);
    }
    const limited = await POST({
      request: makeRequest(validBody, { ip: '9.9.9.9' }),
    } as never);
    expect(limited.status).toBe(429);
  });

  it('rejects disallowed origins', async () => {
    const response = await POST({
      request: makeRequest(validBody, { origin: 'https://evil.example' }),
    } as never);
    expect(response.status).toBe(403);
  });
});
