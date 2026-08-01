import { describe, expect, it } from 'vitest';
import {
  assertDemoRequestNotTransmitted,
  demoServiceOptions,
  requestTypesByService,
  timingOptions,
} from '../../src/lib/request-flow';

describe('request flow demo data', () => {
  it('includes required service choices', () => {
    const ids = demoServiceOptions.map((o) => o.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'heating-cooling',
        'plumbing',
        'electrical',
        'home-maintenance',
        'not-sure',
      ]),
    );
  });

  it('provides request types for every service choice', () => {
    for (const option of demoServiceOptions) {
      expect(
        requestTypesByService[option.id as keyof typeof requestTypesByService].length,
      ).toBeGreaterThan(0);
    }
  });

  it('provides timing options without availability promises', () => {
    expect(timingOptions.length).toBe(4);
    expect(timingOptions.join(' ')).not.toMatch(/guaranteed appointment/i);
  });

  it('documents that demo requests are not transmitted', () => {
    expect(() => assertDemoRequestNotTransmitted()).not.toThrow();
  });
});
