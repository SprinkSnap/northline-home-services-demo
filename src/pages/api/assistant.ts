export const prerender = false;

import type { APIRoute } from 'astro';
import { assistantMessageSchema, parseJsonBody, MAX_BODY_BYTES } from '../../lib/validation';
import { buildAssistantReply, clampAssistantOutput } from '../../lib/assistant';
import { checkRateLimit } from '../../lib/rate-limit';
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

const SYSTEM_PROMPT = [
  'You are an AI assistant in a fictional portfolio demonstration by Che Xu Studio.',
  'NorthLine Home Services is not a real company.',
  'Never diagnose equipment, provide repair instructions, guarantee availability, invent pricing,',
  'claim to dispatch a technician, request payment information, or claim to be human.',
  'You may explain the demo, navigate visitors to service pages, describe conversion features,',
  'explain local SEO architecture, and encourage a consented Che Xu Studio enquiry.',
  'Keep replies under 120 words.',
].join(' ');

export const POST: APIRoute = async ({ request }) => {
  try {
    const origin = request.headers.get('origin');
    if (origin && !isAllowedOrigin(origin, siteConfig.url)) {
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
    const rate = checkRateLimit(`assistant:${ip}`, 20, 60_000);
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
    } catch {
      return jsonError(400, 'INVALID_JSON');
    }

    const result = assistantMessageSchema.safeParse(parsed);
    if (!result.success) {
      return jsonError(400, 'VALIDATION_FAILED');
    }

    const lastUser = [...result.data.messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) {
      return jsonError(400, 'VALIDATION_FAILED');
    }

    const fallback = clampAssistantOutput(buildAssistantReply(lastUser.content));
    const env = await getWorkerEnv();

    if (env.AI) {
      try {
        const aiResult = (await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...result.data.messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 220,
        })) as { response?: string };

        const reply = clampAssistantOutput(
          aiResult.response?.trim()
            ? `${aiResult.response.trim()}\n\nI'm an AI assistant in a fictional portfolio demonstration by Che Xu Studio.`
            : fallback,
        );
        return jsonOk({ reply });
      } catch (error) {
        console.error('assistant AI failure', redactForLogs({ message: String(error) }));
        return jsonOk({ reply: fallback });
      }
    }

    return jsonOk({ reply: fallback });
  } catch (error) {
    console.error('assistant failure', redactForLogs({ message: String(error) }));
    return jsonError(500, 'REQUEST_FAILED');
  }
};

export const GET: APIRoute = async () => jsonError(405, 'METHOD_NOT_ALLOWED');
