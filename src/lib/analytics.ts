/**
 * Privacy-conscious conversion analytics.
 * Never send names, emails, messages, or other personal form values.
 */

export const ANALYTICS_EVENTS = [
  'demo_viewed',
  'service_card_selected',
  'request_demo_started',
  'request_demo_completed',
  'case_study_selected',
  'che_xu_cta_selected',
  'portfolio_lead_started',
  'portfolio_lead_submitted',
  'package_link_selected',
  'chat_opened',
  'human_handoff_requested',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsPayload = {
  event: AnalyticsEvent;
  meta?: Record<string, string | number | boolean | undefined>;
};

const PERSONAL_KEYS = /name|email|phone|message|address|website|company/i;

export function sanitizeAnalyticsMeta(
  meta: AnalyticsPayload['meta'] = {},
): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (PERSONAL_KEYS.test(key)) continue;
    if (value === undefined) continue;
    clean[key] = value;
  }
  return clean;
}

export function trackEvent(event: AnalyticsEvent, meta?: AnalyticsPayload['meta']): void {
  if (typeof window === 'undefined') return;
  const detail = { event, meta: sanitizeAnalyticsMeta(meta) };
  window.dispatchEvent(new CustomEvent('northline:analytics', { detail }));
  const w = window as Window & { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(detail);
  }
}

declare global {
  interface WindowEventMap {
    'northline:analytics': CustomEvent<AnalyticsPayload>;
    'northline:open-lead-drawer': CustomEvent<{ source?: string }>;
  }
}
