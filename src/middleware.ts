import { defineMiddleware } from 'astro:middleware';
import { securityHeaders } from './lib/security';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const isProduction = import.meta.env.PROD;
  const headers = securityHeaders(isProduction);

  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(headers)) {
    newHeaders.set(key, value);
  }

  // Strict method allow-list for API routes is enforced in handlers;
  // reject obviously unsupported methods early for non-asset paths.
  const method = context.request.method.toUpperCase();
  if (context.url.pathname.startsWith('/api/') && !['GET', 'POST', 'OPTIONS'].includes(method)) {
    return new Response(JSON.stringify({ ok: false, error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: {
        ...Object.fromEntries(newHeaders),
        allow: 'GET, POST, OPTIONS',
        'content-type': 'application/json; charset=utf-8',
      },
    });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
});
