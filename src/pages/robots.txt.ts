export const prerender = true;

import type { APIRoute } from 'astro';
import { DEMO_MODE, siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const body = DEMO_MODE
    ? ['User-agent: *', 'Disallow: /', '', `# Demo mode: ${siteConfig.name} is noindex`].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        '',
        `Sitemap: ${siteConfig.url.replace(/\/$/, '')}/sitemap.xml`,
      ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
