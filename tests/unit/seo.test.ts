import { describe, expect, it } from 'vitest';
import {
  localBusinessJsonLd,
  robotsContent,
  faqJsonLd,
  organizationJsonLd,
} from '../../src/lib/seo';
import { DEMO_MODE } from '../../src/config/site';

describe('SEO demo safeguards', () => {
  it('uses noindex in demo mode', () => {
    expect(DEMO_MODE).toBe(true);
    expect(robotsContent()).toBe('noindex, nofollow');
  });

  it('suppresses fictional LocalBusiness structured data in demo mode', () => {
    expect(localBusinessJsonLd()).toBeNull();
  });

  it('still allows Organization (Che Xu Studio) and FAQ schema', () => {
    expect(organizationJsonLd()?.['@type']).toBe('Organization');
    const faq = faqJsonLd([{ question: 'Q?', answer: 'A.' }]);
    expect(faq?.['@type']).toBe('FAQPage');
  });
});
