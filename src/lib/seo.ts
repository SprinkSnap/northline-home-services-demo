import { siteConfig, DEMO_MODE } from '../config/site';
import { verifiedBusiness } from '../config/business';
import type { FaqItem } from '../content/faqs';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return base;
  return `${base}${normalized.replace(/\/$/, '')}`;
}

export function buildTitle(pageTitle: string): string {
  if (pageTitle.includes(siteConfig.name) || pageTitle.includes('Che Xu Studio')) {
    return pageTitle;
  }
  return `${pageTitle} | ${siteConfig.name}`;
}

export function robotsContent(forceNoindex = false): string {
  if (DEMO_MODE || forceNoindex) return 'noindex, nofollow';
  return 'index, follow';
}

export function organizationJsonLd(): Record<string, unknown> | null {
  // Always safe: describes Che Xu Studio as the creator, not a fake NorthLine LocalBusiness.
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.cheXu.name,
    url: siteConfig.cheXu.url,
    email: siteConfig.cheXu.email,
    description: 'Che Xu Studio designs conversion-focused websites for local service businesses.',
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]): Record<string, unknown> | null {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      '@type': 'Organization',
      name: DEMO_MODE ? siteConfig.cheXu.name : (verifiedBusiness?.displayName ?? siteConfig.name),
    },
  };
}

/**
 * LocalBusiness structured data is omitted in DEMO_MODE.
 * Only render when DEMO_MODE is false and verified business data exists.
 */
export function localBusinessJsonLd(): Record<string, unknown> | null {
  if (DEMO_MODE || !verifiedBusiness) return null;

  return {
    '@context': 'https://schema.org',
    '@type': verifiedBusiness.contractorSubtype,
    name: verifiedBusiness.displayName,
    legalName: verifiedBusiness.legalName,
    description: verifiedBusiness.description,
    telephone: verifiedBusiness.phone,
    email: verifiedBusiness.email,
    url: siteConfig.url,
    priceRange: verifiedBusiness.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: verifiedBusiness.streetAddress,
      addressLocality: verifiedBusiness.addressLocality,
      addressRegion: verifiedBusiness.addressRegion,
      postalCode: verifiedBusiness.postalCode,
      addressCountry: verifiedBusiness.addressCountry,
    },
    geo:
      verifiedBusiness.latitude != null && verifiedBusiness.longitude != null
        ? {
            '@type': 'GeoCoordinates',
            latitude: verifiedBusiness.latitude,
            longitude: verifiedBusiness.longitude,
          }
        : undefined,
    areaServed: verifiedBusiness.areaServed,
    sameAs: verifiedBusiness.sameAs,
    openingHoursSpecification: verifiedBusiness.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
  };
}

export function collectJsonLd(blocks: Array<Record<string, unknown> | null | undefined>) {
  return blocks.filter(Boolean) as Record<string, unknown>[];
}
