import { z } from 'zod';

export const MAX_BODY_BYTES = 8_192;

export const businessTypes = [
  'hvac',
  'plumbing',
  'electrical',
  'general-contractor',
  'home-services',
  'other',
] as const;

export const primaryGoals = [
  'more-qualified-leads',
  'better-mobile-conversion',
  'local-seo',
  'online-booking',
  'brand-refresh',
  'not-sure',
] as const;

export const packageInterests = ['starter', 'growth', 'custom', 'not-sure'] as const;

export const portfolioLeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  business_type: z.enum(businessTypes),
  existing_website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v : undefined)),
  primary_goal: z.enum(primaryGoals),
  package_interest: z
    .enum(packageInterests)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v : undefined)),
  message: z
    .string()
    .trim()
    .max(1_000)
    .optional()
    .or(z.literal(''))
    .transform((v) => (v ? v : undefined)),
  consent: z.literal(true, {
    error: 'Consent is required to submit this enquiry.',
  }),
  company_website: z.string().max(0).optional(), // honeypot
  turnstileToken: z.string().min(1).max(2_048),
  source_demo: z.literal('northline-home-services'),
});

export type PortfolioLeadInput = z.infer<typeof portfolioLeadSchema>;

export const assistantMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(1_000),
      }),
    )
    .min(1)
    .max(12),
  turnstileToken: z.string().min(1).max(2_048).optional(),
});

export type AssistantMessageInput = z.infer<typeof assistantMessageSchema>;

export function parseJsonBody(raw: string): unknown {
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    throw new Error('PAYLOAD_TOO_LARGE');
  }
  return JSON.parse(raw) as unknown;
}
