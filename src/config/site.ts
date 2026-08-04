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
  /**
   * Case-study brief shown below the desktop / mobile responsive mockup
   * (conversion & SEO section) on the Che Xu Studio portfolio page.
   * NorthLine is a fictional demonstration — not a real client project.
   */
  caseStudy: {
    sectionTitle: 'Desktop view · Mobile responsive · Conversion & SEO',
    presentation: 'portfolio-concept' as const,
    images: {
      desktop: '/images/case-study/desktop-homepage.png',
      mobile: '/images/case-study/mobile-homepage.png',
    },
    clientIndustry: {
      title: 'Home Services',
      description:
        'A residential home services business providing reliable solutions for homeowners, with a focus on making it easy to request services and connect with the company.',
    },
    projectGoal:
      'Design and develop a modern, conversion-focused website that builds trust, improves user experience, supports local SEO, and encourages visitors to become qualified leads through clear calls to action and a mobile-first experience.',
    role: [
      'UX Research & Strategy',
      'Information Architecture',
      'UI/Visual Design',
      'Responsive Web Design',
      'WordPress Development',
      'Technical SEO Implementation',
      'Performance Optimization',
      'Accessibility Best Practices',
    ],
    technologies: [
      'WordPress',
      'PHP',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Design',
      'Technical SEO',
      'Performance Optimization',
      'Accessibility (WCAG)',
      'Google Fonts',
      'SVG Icons',
    ],
    disclosure:
      'NorthLine Home Services is a fictional demonstration. Present this work honestly as a portfolio concept, practice project, or demonstration project unless it becomes a real client project. Avoid implying it was built for an actual client.',
  },
} as const;

export type SiteConfig = typeof siteConfig;
