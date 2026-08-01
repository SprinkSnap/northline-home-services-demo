# NorthLine Home Services Demo

A conversion-focused **home-services portfolio website concept** by **Che Xu Studio**.

NorthLine Home Services is fictional. The standalone demo is `noindex, nofollow`, does not publish fake NAP / LocalBusiness data, and does not accept real service bookings. Genuine business enquiries go to Che Xu Studio only.

## Architecture

- **Astro 7** with strict TypeScript
- **Cloudflare Workers** adapter (`@astrojs/cloudflare`)
- **Static generation** for marketing pages (`prerender = true`)
- **React islands** for interactive UI only (nav, request flow, lead drawer, assistant, portfolio bar)
- **Tailwind CSS v4** design tokens in `src/styles/global.css`
- **Workers endpoints**
  - `POST /api/portfolio-lead` — consented Che Xu Studio leads
  - `POST /api/assistant` — optional demo assistant (Workers AI when bound, safe fallback otherwise)
- **Cloudflare D1** for lead storage
- **Turnstile** + in-app rate limiting (+ edge Rate Limiting recommended)
- **Vitest** unit/integration tests
- **Playwright** + axe critical-flow tests

## Local setup

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Open `http://localhost:4321`.

### Useful commands

| Command                    | Purpose                                                   |
| -------------------------- | --------------------------------------------------------- |
| `npm run dev`              | Local Astro/Cloudflare dev server                         |
| `npm run build`            | Production build                                          |
| `npm run preview`          | Preview the production build                              |
| `npm run typecheck`        | Astro + TypeScript check                                  |
| `npm run lint`             | ESLint                                                    |
| `npm run format`           | Prettier write                                            |
| `npm run format:check`     | Prettier check                                            |
| `npm run test`             | Vitest unit + integration                                 |
| `npm run test:e2e`         | Playwright flows (builds/previews first via config)       |
| `npm run check`            | format check + lint + typecheck + unit/integration tests  |
| `npm run cf:typegen`       | Generate Wrangler types                                   |
| `npm run cf:dry-run`       | Build + Wrangler deploy dry run (uses `dist/server`)      |
| `npm run cf:deploy`        | Build + deploy Worker from generated `dist/server` config |
| `npm run db:migrate:local` | Apply D1 migrations locally                               |

## Environment variables

See `.dev.vars.example`.

| Variable                    | Purpose                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `PUBLIC_DEMO_MODE`          | `true` (default) enables portfolio disclosures + `noindex` and suppresses fake LocalBusiness data |
| `PUBLIC_SITE_URL`           | Canonical site origin                                                                             |
| `PUBLIC_TURNSTILE_SITE_KEY` | Browser Turnstile site key                                                                        |
| `TURNSTILE_SECRET_KEY`      | Server Turnstile secret (Workers secret / `.dev.vars`)                                            |
| `ALLOWED_ORIGINS`           | Comma-separated origins allowed to call `/api/*`                                                  |
| `PUBLIC_CHEXU_*`            | Che Xu Studio links and contact email                                                             |
| `PUBLIC_ANALYTICS_ENABLED`  | Optional analytics flag                                                                           |

Never commit real credentials.

## `DEMO_MODE` behaviour

When `PUBLIC_DEMO_MODE=true` (default):

- `noindex, nofollow`
- omit fictional LocalBusiness structured data
- omit fake NAP information
- show portfolio disclosure
- route genuine enquiries to Che Xu Studio
- NorthLine request flow does **not** transmit personal data

When `PUBLIC_DEMO_MODE=false`:

- require verified business data in `src/config/business.ts`
- enable indexing only after owner verification
- render accurate structured data only
- remove fictional-concept disclosure

## Cloudflare configuration

Primary source config: `wrangler.jsonc` (used by `astro dev` and the Vite plugin).

After `astro build`, Astro writes the **deployable** Worker config to:

`dist/server/wrangler.json` → `main: "entry.mjs"`, assets in `dist/client`

### Cloudflare Workers Builds / dashboard settings

Use these exact settings so deploy does not look for the virtual package entrypoint:

| Setting          | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| Framework preset | None (or Astro if available — still override deploy command) |
| Build command    | `npm run build`                                              |
| Deploy command   | `npx wrangler deploy --config dist/server/wrangler.json`     |
| Root directory   | `/` (repository root)                                        |

**Do not** run bare `npx wrangler deploy` against the source `wrangler.jsonc` in CI. That config’s `main` is `@astrojs/cloudflare/entrypoints/server`, which is a Node package export for local/dev and is not a built Worker file. Cloudflare CI then fails with “entry-point file … was not found”.

Local / CLI deploy:

```bash
npm run cf:deploy
# equivalent to:
# npm run build && npx wrangler deploy --config dist/server/wrangler.json
```

Dry run:

```bash
npm run cf:dry-run
```

Bindings:

- `ASSETS` — static assets
- `DB` — D1 database `northline-portfolio-leads`
- `AI` — Workers AI (optional assistant enhancement)
- `SESSION` — KV auto-injected by the Astro Cloudflare adapter for sessions

Replace the placeholder D1 `database_id` with your real database id:

```bash
npx wrangler d1 create northline-portfolio-leads
```

### D1 setup and migrations

Migration file: `migrations/0001_portfolio_leads.sql`

```bash
# Local
npm run db:migrate:local

# Remote (authorized environments only)
npx wrangler d1 migrations apply northline-portfolio-leads --remote
```

Suggested fields: `id`, `name`, `email`, `business_type`, `existing_website`, `primary_goal`, `package_interest`, `message`, `consent`, `source_demo`, `created_at`, `consent_at`.

`source_demo` is always `northline-home-services`.

### Turnstile setup

1. Create a Turnstile widget in Cloudflare.
2. Set `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
3. Locally, if no site key is set, the lead form uses a `dev-bypass` token accepted only when no secret is configured / in DEV.

### Rate limiting setup

- Application-level sliding window in `src/lib/rate-limit.ts`
- Recommended edge rule: Cloudflare Rate Limiting / WAF custom rule on `/api/portfolio-lead` and `/api/assistant`

### Workers AI setup

If the `AI` binding is available, `/api/assistant` uses `@cf/meta/llama-3.1-8b-instruct` with a strict system prompt. If AI is unavailable, a deterministic safe fallback reply is used.

## Image workflow

- Prefer original / licensed assets documented in `ASSET_LICENSES.md`
- Current demo visuals are purpose-built SVG/CSS
- For client photography: supply assets, generate AVIF/WebP (+ fallback), responsive `srcset`/`sizes`, width/height, and lazy-load below the fold
- Cloudflare Images can be enabled when configured for a real client

## Case-study publishing

This repository is the standalone NorthLine demo. Finished Che Xu Studio case-study copy lives in [`CASE_STUDY_COPY.md`](./CASE_STUDY_COPY.md) for publishing on an indexable `/work/northline-home-services` page in the Che Xu Studio site.

## Production conversion from demo to real client

1. Collect verified NAP, hours, service areas, licences, insurance notes, and social profiles.
2. Populate `src/config/business.ts`.
3. Set `PUBLIC_DEMO_MODE=false` only after verification.
4. Remove fictional disclosures.
5. Enable accurate LocalBusiness / Service structured data.
6. Replace Che Xu portfolio CTAs with the client’s real conversion paths as agreed.
7. Create unique local content before publishing any city/location pages.
8. Re-run accessibility, SEO, and Lighthouse checks.

### Values requiring business-owner verification

- Legal / display name
- Phone and email
- Full address and geo coordinates
- Opening hours
- Service-area boundaries
- Licences / certifications / insurance claims
- Reviews and ratings
- Technician availability promises
- Pricing and guarantees
- Social profile URLs
- Payment and scheduling integrations

## Testing

```bash
npm run test
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

## Dry-run deployment

```bash
npm run cf:dry-run
```

## Production deploy (authorized only)

```bash
npm run cf:deploy
```

Or in the Cloudflare dashboard, set **Deploy command** to:

```bash
npx wrangler deploy --config dist/server/wrangler.json
```

Do **not** deploy, change DNS, or provision paid resources without explicit authorization.

## Launch checklist

See [`LAUNCH_CHECKLIST.md`](./LAUNCH_CHECKLIST.md).
