let leadMounted = false;
let assistantMounted = false;

async function mountLead(turnstileSiteKey: string) {
  if (leadMounted) {
    window.dispatchEvent(
      new CustomEvent('northline:open-lead-drawer', { detail: { source: 'repeat' } }),
    );
    return;
  }
  leadMounted = true;
  const [{ createElement }, { createRoot }, { default: LeadDrawer }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('../components/LeadDrawer'),
  ]);
  const host = document.getElementById('lead-drawer-host') ?? document.createElement('div');
  host.id = 'lead-drawer-host';
  document.body.appendChild(host);
  createRoot(host).render(createElement(LeadDrawer, { turnstileSiteKey, startOpen: true }));
}

async function mountAssistant() {
  if (assistantMounted) return;
  assistantMounted = true;
  const [{ createElement }, { createRoot }, { default: DemoAssistant }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('../components/DemoAssistant'),
  ]);
  const host = document.getElementById('assistant-host') ?? document.createElement('div');
  host.id = 'assistant-host';
  document.body.appendChild(host);
  createRoot(host).render(createElement(DemoAssistant));
}

export function bootInteractiveShell(turnstileSiteKey: string) {
  window.addEventListener('northline:open-lead-drawer', () => {
    void mountLead(turnstileSiteKey);
  });

  const schedule =
    'requestIdleCallback' in window
      ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 6000 })
      : (cb: () => void) => window.setTimeout(cb, 4000);

  schedule(() => {
    void mountAssistant();
  });
}
