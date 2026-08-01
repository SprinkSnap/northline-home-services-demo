// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: globalThis.process?.env?.PUBLIC_SITE_URL || 'https://northline.chexustudio.example',
  trailingSlash: 'never',
  adapter: cloudflare({
    imageService: 'compile',
    // Keep builds/previews offline-friendly in CI and local environments without API tokens.
    remoteBindings: false,
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
