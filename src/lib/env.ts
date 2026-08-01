/**
 * Resolve Workers bindings in a way that works in production and in Vitest.
 * Prefer `cloudflare:workers` when available; fall back to an injectable test env.
 */

export interface PortfolioEnv {
  DB?: D1Database;
  AI?: {
    run: (model: string, options: Record<string, unknown>) => Promise<unknown>;
  };
  TURNSTILE_SECRET_KEY?: string;
  ALLOWED_ORIGINS?: string;
}

let testEnv: PortfolioEnv | null = null;

export function setTestEnv(env: PortfolioEnv | null): void {
  testEnv = env;
}

export async function getWorkerEnv(): Promise<PortfolioEnv> {
  if (testEnv) return testEnv;
  try {
    const mod = await import('cloudflare:workers');
    return (mod.env ?? {}) as PortfolioEnv;
  } catch {
    return {};
  }
}
