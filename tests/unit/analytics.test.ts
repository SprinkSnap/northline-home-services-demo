import { describe, expect, it } from 'vitest';
import { sanitizeAnalyticsMeta } from '../../src/lib/analytics';

describe('analytics privacy', () => {
  it('strips personal field names from meta', () => {
    const clean = sanitizeAnalyticsMeta({
      location: 'header',
      email: 'secret@example.com',
      name: 'Pat',
      message: 'hello',
    });
    expect(clean).toEqual({ location: 'header' });
  });
});
