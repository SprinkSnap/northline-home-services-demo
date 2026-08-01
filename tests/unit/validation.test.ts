import { describe, expect, it } from 'vitest';
import {
  portfolioLeadSchema,
  parseJsonBody,
  assistantMessageSchema,
} from '../../src/lib/validation';

describe('portfolioLeadSchema', () => {
  const valid = {
    name: 'Alex Contractor',
    email: 'alex@example.com',
    business_type: 'hvac',
    existing_website: '',
    primary_goal: 'more-qualified-leads',
    package_interest: '',
    message: '',
    consent: true,
    company_website: '',
    turnstileToken: 'dev-bypass',
    source_demo: 'northline-home-services',
  };

  it('accepts a valid consented lead', () => {
    const result = portfolioLeadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects missing consent', () => {
    const result = portfolioLeadSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = portfolioLeadSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects unexpected source_demo', () => {
    const result = portfolioLeadSchema.safeParse({ ...valid, source_demo: 'other' });
    expect(result.success).toBe(false);
  });
});

describe('parseJsonBody', () => {
  it('parses small JSON bodies', () => {
    expect(parseJsonBody('{"ok":true}')).toEqual({ ok: true });
  });

  it('rejects oversized payloads', () => {
    const huge = `"${'a'.repeat(9000)}"`;
    expect(() => parseJsonBody(huge)).toThrow('PAYLOAD_TOO_LARGE');
  });
});

describe('assistantMessageSchema', () => {
  it('limits message length', () => {
    const result = assistantMessageSchema.safeParse({
      messages: [{ role: 'user', content: 'x'.repeat(1001) }],
    });
    expect(result.success).toBe(false);
  });
});
