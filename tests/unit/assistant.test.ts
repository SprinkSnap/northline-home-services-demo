import { describe, expect, it } from 'vitest';
import { buildAssistantReply, clampAssistantOutput } from '../../src/lib/assistant';

describe('assistant restrictions', () => {
  it('discloses fictional portfolio status', () => {
    const reply = buildAssistantReply('hello');
    expect(reply).toContain('fictional portfolio demonstration by Che Xu Studio');
  });

  it('refuses repair / diagnosis style requests', () => {
    const reply = buildAssistantReply('How do I fix my furnace and diagnose the error code?');
    expect(reply).toMatch(/can’t diagnose|cannot diagnose|repair instructions/i);
    expect(reply).not.toMatch(/here are the steps to repair/i);
  });

  it('clamps oversized output', () => {
    expect(clampAssistantOutput('a'.repeat(50), 20).length).toBeLessThanOrEqual(20);
  });
});
