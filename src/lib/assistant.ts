const DISCLOSURE = "I'm an AI assistant in a fictional portfolio demonstration by Che Xu Studio.";

const BLOCKED_PATTERNS = [
  /repair\s+instructions?/i,
  /how\s+do\s+i\s+fix/i,
  /diagnose/i,
  /dispatch/i,
  /send\s+(a\s+)?tech/i,
  /guarantee/i,
  /credit\s*card/i,
  /payment\s+info/i,
];

export const ASSISTANT_QUICK_ACTIONS = [
  { id: 'find-service', label: 'Help me find a service', href: '/services' },
  { id: 'request-flow', label: 'Show me the request flow', href: '/request-service' },
  { id: 'local-seo', label: 'How does local SEO work?', href: '/service-areas' },
  { id: 'want-website', label: 'I want a website like this', action: 'open-lead' as const },
  { id: 'contact', label: 'Contact Che Xu Studio', href: '/contact' },
];

export function buildAssistantReply(userMessage: string): string {
  const text = userMessage.trim();

  if (BLOCKED_PATTERNS.some((pattern) => pattern.test(text))) {
    return [
      DISCLOSURE,
      '',
      'I can’t diagnose equipment, provide repair instructions, guarantee availability, invent pricing, dispatch a technician, or request payment information.',
      'If you may have an emergency, contact local emergency services or your utility provider.',
      'If you want a website like this for your business, I can help you start a Che Xu Studio enquiry.',
    ].join('\n');
  }

  if (/local\s*seo|service\s*area|city\s*page/i.test(text)) {
    return [
      DISCLOSURE,
      '',
      'This demo shows responsible local SEO architecture: clear service pages, a service-area overview, and a template approach that only publishes location pages when unique local content exists.',
      'Because NorthLine is fictional, the site stays noindex and does not publish fake LocalBusiness data.',
      'Explore /service-areas to see the pattern, or ask Che Xu Studio to adapt it for a verified business.',
    ].join('\n');
  }

  if (/request|book|schedule|quote/i.test(text)) {
    return [
      DISCLOSURE,
      '',
      'The guided request flow at /request-service demonstrates how homeowners can choose a service, pick a request type, and select timing.',
      'It is demo-only—information is not submitted to NorthLine. For a real contractor site, Che Xu Studio can connect the same pattern to scheduling or CRM tools.',
    ].join('\n');
  }

  if (/website|che\s*xu|portfolio|price|package/i.test(text)) {
    return [
      DISCLOSURE,
      '',
      'Che Xu Studio designs fast, search-ready contractor websites with clear services, mobile conversion actions, and accessible forms.',
      'Use “Build a Website Like This” to request a website plan, or visit the packages link from the contact page.',
    ].join('\n');
  }

  if (/service|hvac|plumb|electric|maintenance/i.test(text)) {
    return [
      DISCLOSURE,
      '',
      'You can explore Heating & Cooling, Plumbing, Electrical, and Home Maintenance from /services.',
      'Each page is structured for search intent and conversion—without fake reviews, licences, or guarantees.',
      'NorthLine is not a real operating company; it demonstrates what Che Xu Studio can build.',
    ].join('\n');
  }

  return [
    DISCLOSURE,
    '',
    'I can explain this demo, point you to service pages, describe conversion features, or help start a consented Che Xu Studio enquiry.',
    'I won’t pretend NorthLine is real, diagnose home-service problems, or claim to be human.',
    'Try a quick action below, or ask about services, the request flow, local SEO, or building a website like this.',
  ].join('\n');
}

export function clampAssistantOutput(text: string, max = 1_200): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}
