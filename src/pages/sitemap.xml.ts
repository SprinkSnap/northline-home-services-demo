export const prerender = true;

import type { APIRoute } from 'astro';
import { DEMO_MODE, siteConfig } from '../config/site';
import { services } from '../content/services';
import { absoluteUrl } from '../lib/seo';

const staticPaths = [
  '/',
  '/services',
  '/service-areas',
  '/about',
  '/how-it-works',
  '/request-service',
  '/contact',
  ...services.map((service) => `/services/${service.slug}`),
];

export const GET: APIRoute = () => {
  // In demo mode the site is noindex; sitemap still lists routes for internal QA.
  const urls = staticPaths
    .map(
      (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
<!-- demo_mode=${DEMO_MODE} site=${siteConfig.name} -->`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      ...(DEMO_MODE ? { 'x-robots-tag': 'noindex, nofollow' } : {}),
    },
  });
};
