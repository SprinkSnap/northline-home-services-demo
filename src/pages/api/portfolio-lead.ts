export const prerender = false;

import type { APIRoute } from 'astro';
import { portfolioLeadSchema, parseJsonBody, MAX_BODY_BYTES } from '../../lib/validation';
import { checkRateLimit } from '../../lib/rate-limit';
import { verifyTurnstile } from '../../lib/turnstile';
import { isAllowedOrigin, jsonError, jsonOk, redactForLogs } from '../../lib/security';
import { siteConfig } from '../../config/site';
import { getWorkerEnv } from '../../lib/env';

function clientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin, siteConfig.url)) {
    return jsonError(403, 'ORIGIN_DENIED');
  }
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': origin ?? '',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const origin = request.headers.get('origin');
    if (!isAllowedOrigin(origin, siteConfig.url)) {
      return jsonError(403, 'ORIGIN_DENIED');
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return jsonError(415, 'UNSUPPORTED_MEDIA_TYPE');
    }

    const contentLength = Number(request.headers.get('content-length') ?? '0');
    if (contentLength > MAX_BODY_BYTES) {
      return jsonError(413, 'PAYLOAD_TOO_LARGE');
    }

    const ip = clientIp(request);
    const rate = checkRateLimit(`portfolio-lead:${ip}`, 5, 60_000);
    if (!rate.allowed) {
      return new Response(JSON.stringify({ ok: false, error: 'RATE_LIMITED' }), {
        status: 429,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'retry-after': String(rate.retryAfterSeconds),
          'cache-control': 'no-store',
        },
      });
    }

    const raw = await request.text();
    let parsed: unknown;
    try {
      parsed = parseJsonBody(raw);
    } catch (error) {
      if (error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE') {
        return jsonError(413, 'PAYLOAD_TOO_LARGE');
      }
      return jsonError(400, 'INVALID_JSON');
    }

    const result = portfolioLeadSchema.safeParse(parsed);
    if (!result.success) {
      return jsonError(400, 'VALIDATION_FAILED');
    }

    const data = result.data;

    if (data.company_website) {
      return jsonOk({ received: true });
    }

    const env = await getWorkerEnv();
    const secret = env.TURNSTILE_SECRET_KEY ?? '';
    const turnstileOk = await verifyTurnstile(data.turnstileToken, secret, ip);
    if (!turnstileOk) {
      return jsonError(400, 'TURNSTILE_FAILED');
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO portfolio_leads (
          id, name, email, business_type, existing_website, primary_goal,
          package_interest, message, consent, source_demo, created_at, consent_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)`,
      )
        .bind(
          id,
          data.name,
          data.email,
          data.business_type,
          data.existing_website ?? null,
          data.primary_goal,
          data.package_interest ?? null,
          data.message ?? null,
          data.source_demo,
          createdAt,
          createdAt,
        )
        .run();
    } else if (import.meta.env.DEV) {
      console.info(
        'portfolio-lead accepted in DEV without D1',
        redactForLogs({ id, source: data.source_demo }),
      );
    } else {
      return jsonError(503, 'STORAGE_UNAVAILABLE');
    }

    return jsonOk({ received: true, id });
  } catch (error) {
    console.error('portfolio-lead failure', redactForLogs({ message: String(error) }));
    return jsonError(500, 'REQUEST_FAILED');
  }
};

export const GET: APIRoute = async () => jsonError(405, 'METHOD_NOT_ALLOWED');
