const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:4321',
  'http://127.0.0.1:4321',
  'https://northline.chexustudio.example',
];

export function getAllowedOrigins(): string[] {
  const fromProcess =
    typeof globalThis.process !== 'undefined' ? globalThis.process.env?.ALLOWED_ORIGINS : undefined;
  const fromEnv = fromProcess ?? import.meta.env.ALLOWED_ORIGINS;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return DEFAULT_ALLOWED_ORIGINS;
}

export function isAllowedOrigin(origin: string | null, siteUrl?: string): boolean {
  if (!origin) return false;
  const allowed = new Set(getAllowedOrigins());
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).origin);
    } catch {
      /* ignore */
    }
  }
  return allowed.has(origin);
}

export function jsonError(status: number, code = 'REQUEST_FAILED'): Response {
  return new Response(JSON.stringify({ ok: false, error: code }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export function jsonOk(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify({ ok: true, ...body }), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export function securityHeaders(isProduction: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com",
      'frame-src https://challenges.cloudflare.com',
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  };

  if (isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  return headers;
}

/** Redact likely personal data before any logging. */
export function redactForLogs(input: unknown): unknown {
  if (typeof input !== 'object' || input === null) return input;
  if (Array.isArray(input)) return input.map(redactForLogs);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (/name|email|phone|message|address|token|authorization/i.test(key)) {
      out[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      out[key] = redactForLogs(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}
