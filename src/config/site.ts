/**
 * Site-wide configuration for the NorthLine Home Services portfolio demo.
 * DEMO_MODE controls indexing, structured data, and disclosure behaviour.
 */

export const DEMO_MODE = (import.meta.env.PUBLIC_DEMO_MODE ?? 'true') !== 'false';

export const siteConfig = {
  name: 'NorthLine Home Services',
  shortName: 'NorthLine',
  tagline: 'Reliable home comfort, without the runaround.',
  description:
    'A conversion-focused home-services website concept demonstrating how clear information, fast scheduling and thoughtful design can turn local searches into qualified service enquiries.',
  lang: 'en-CA',
  locale: 'en_CA',
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://northline.chexustudio.example',
  trailingSlash: 'never' as const,
  demoMode: DEMO_MODE,
  sourceDemo: 'northline-home-services',
  cheXu: {
    name: 'Che Xu Studio',
    url: import.meta.env.PUBLIC_CHEXU_URL ?? 'https://chexustudio.com',
    packagesUrl: import.meta.env.PUBLIC_CHEXU_PACKAGES_URL ?? 'https://chexustudio.com/packages',
    caseStudyUrl:
      import.meta.env.PUBLIC_CASE_STUDY_URL ??
      'https://chexustudio.com/work/northline-home-services',
    email: import.meta.env.PUBLIC_CHEXU_EMAIL ?? 'hello@chexustudio.com',
  },
  social: {
    ogImage: '/images/og-northline.svg',
  },
  analytics: {
    enabled: import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true',
  },
  turnstile: {
    siteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
