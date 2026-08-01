/// <reference types="astro/client" />
/// <reference path="../worker-configuration.d.ts" />

declare namespace App {
  interface Locals {
    cfContext: ExecutionContext;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_DEMO_MODE?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_CHEXU_URL?: string;
  readonly PUBLIC_CHEXU_PACKAGES_URL?: string;
  readonly PUBLIC_CASE_STUDY_URL?: string;
  readonly PUBLIC_CHEXU_EMAIL?: string;
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly ALLOWED_ORIGINS?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'cloudflare:workers' {
  export const env: Env & {
    TURNSTILE_SECRET_KEY?: string;
    ALLOWED_ORIGINS?: string;
    AI?: {
      run: (model: string, options: Record<string, unknown>) => Promise<unknown>;
    };
  };
}
