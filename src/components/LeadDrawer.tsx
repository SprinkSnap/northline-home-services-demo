import { useEffect, useId, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { businessTypes, packageInterests, primaryGoals } from '../lib/validation';
import { IconClose } from './icons/Icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldLabels: Record<string, string> = {
  hvac: 'HVAC',
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  'general-contractor': 'General contractor',
  'home-services': 'Home services',
  other: 'Other',
  'more-qualified-leads': 'More qualified leads',
  'better-mobile-conversion': 'Better mobile conversion',
  'local-seo': 'Local SEO',
  'online-booking': 'Online booking',
  'brand-refresh': 'Brand refresh',
  'not-sure': 'Not sure yet',
  starter: 'Starter',
  growth: 'Growth',
  custom: 'Custom',
};

export default function LeadDrawer({
  turnstileSiteKey = '',
  startOpen = false,
}: {
  turnstileSiteKey?: string;
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (startOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      trackEvent('portfolio_lead_started', { location: 'drawer' });
    }
    function onOpen() {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      setStatus('idle');
      setError('');
      trackEvent('portfolio_lead_started', { location: 'drawer' });
    }
    window.addEventListener('northline:open-lead-drawer', onOpen);
    return () => window.removeEventListener('northline:open-lead-drawer', onOpen);
  }, [startOpen]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open]);

  async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      business_type: String(data.get('business_type') ?? ''),
      existing_website: String(data.get('existing_website') ?? ''),
      primary_goal: String(data.get('primary_goal') ?? ''),
      package_interest: String(data.get('package_interest') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: data.get('consent') === 'on',
      company_website: String(data.get('company_website') ?? ''),
      turnstileToken: String(data.get('cf-turnstile-response') ?? data.get('turnstileToken') ?? ''),
      source_demo: 'northline-home-services' as const,
    };

    if (!payload.turnstileToken) {
      payload.turnstileToken = turnstileSiteKey ? '' : 'dev-bypass';
    }

    try {
      const response = await fetch('/api/portfolio-lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setStatus('error');
        setError('We could not send your request. Please try again or email Che Xu Studio.');
        return;
      }
      setStatus('success');
      trackEvent('portfolio_lead_submitted', { location: 'drawer' });
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again in a moment.');
    }
  }

  if (!open) return null;

  return (
    <div className="lead-drawer">
      <div className="lead-drawer__backdrop" onClick={() => setOpen(false)} />
      <div
        className="lead-drawer__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div className="lead-drawer__header">
          <div>
            <h2 id={titleId}>Want a Website Built for Your Business?</h2>
            <p id={descId}>
              Tell us what you need and Che Xu Studio will recommend the best starting package.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="lead-drawer__close"
            onClick={() => setOpen(false)}
            aria-label="Close enquiry form"
          >
            <IconClose />
          </button>
        </div>

        {status === 'success' ? (
          <div className="lead-drawer__success" role="status">
            <p>
              Thanks — your enquiry was sent to Che Xu Studio. We will follow up with a website plan
              recommendation.
            </p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <form className="lead-drawer__form" onSubmit={onSubmit} noValidate>
            <label>
              Name
              <input name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required maxLength={120} />
            </label>
            <label>
              Business type
              <select name="business_type" required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {fieldLabels[type]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Existing website <span className="optional">(optional)</span>
              <input name="existing_website" type="url" placeholder="https://" maxLength={200} />
            </label>
            <label>
              Primary goal
              <select name="primary_goal" required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {primaryGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {fieldLabels[goal]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Package interest <span className="optional">(optional)</span>
              <select name="package_interest" defaultValue="">
                <option value="">No preference yet</option>
                {packageInterests.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {fieldLabels[pkg]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message <span className="optional">(optional)</span>
              <textarea name="message" rows={4} maxLength={1000} />
            </label>

            <label className="hp" aria-hidden="true">
              Company website
              <input name="company_website" tabIndex={-1} autoComplete="off" />
            </label>

            {turnstileSiteKey ? (
              <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />
            ) : (
              <input type="hidden" name="turnstileToken" value="dev-bypass" />
            )}

            <label className="consent">
              <input name="consent" type="checkbox" required />
              <span>
                I agree that Che Xu Studio may contact me about a website plan. I understand
                NorthLine is a fictional demo and this form is for Che Xu Studio only.
              </span>
            </label>

            {error ? (
              <p className="lead-drawer__error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Request My Website Plan'}
            </button>
            <p className="privacy-note">
              We only store consented enquiries. No marketing consent is preselected.
            </p>
          </form>
        )}
      </div>

      <style>{`
        .lead-drawer { position: fixed; inset: 0; z-index: 90; }
        .lead-drawer__backdrop {
          position: absolute; inset: 0; background: rgb(11 31 51 / 0.5);
        }
        .lead-drawer__panel {
          position: absolute; top: 0; right: 0; height: 100%;
          width: min(28rem, 100%); background: #fff; padding: 1.25rem;
          overflow-y: auto; box-shadow: -12px 0 40px rgb(11 31 51 / 0.18);
        }
        .lead-drawer__header {
          display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;
        }
        .lead-drawer__header h2 {
          margin: 0 0 0.4rem; font-family: Georgia, 'Source Serif 4', serif;
          font-size: 1.45rem; color: #0B1F33; line-height: 1.2;
        }
        .lead-drawer__header p { margin: 0; color: #5b6b7c; }
        .lead-drawer__close {
          width: 44px; height: 44px; border: 1px solid #d7e0ea; border-radius: 0.625rem;
          background: #fff; cursor: pointer; display: grid; place-items: center;
        }
        .lead-drawer__form { display: grid; gap: 0.85rem; }
        .lead-drawer__form label { display: grid; gap: 0.35rem; font-weight: 650; color: #0B1F33; }
        .lead-drawer__form .optional { font-weight: 500; color: #5b6b7c; }
        .lead-drawer__form input,
        .lead-drawer__form select,
        .lead-drawer__form textarea {
          min-height: 44px; border: 1px solid #d7e0ea; border-radius: 0.625rem;
          padding: 0.6rem 0.75rem; font: inherit;
        }
        .lead-drawer__form textarea { min-height: 110px; resize: vertical; }
        .consent { grid-template-columns: auto 1fr; align-items: start; font-weight: 500 !important; }
        .consent input { width: 1.15rem; height: 1.15rem; margin-top: 0.2rem; }
        .hp { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
        .lead-drawer__error { color: #b42318; margin: 0; }
        .lead-drawer__success { display: grid; gap: 1rem; }
        .privacy-note { margin: 0; color: #5b6b7c; font-size: 0.9rem; font-weight: 500; }
      `}</style>
      {turnstileSiteKey ? (
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      ) : null}
    </div>
  );
}
