export interface TurnstileVerifyResult {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstile(
  token: string,
  secret: string,
  ip?: string,
): Promise<boolean> {
  if (!secret) {
    // Local development escape hatch when secret is unset.
    return token === 'dev-bypass' || import.meta.env.DEV === true;
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileVerifyResult;
  return Boolean(result.success);
}
