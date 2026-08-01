# Launch Checklist — NorthLine Home Services Demo

## Integrity

- [ ] Portfolio bar and homepage disclosure clearly state the concept is fictional
- [ ] No fake address, phone, licences, insurance, reviews, awards, stats, staff, or vehicles
- [ ] No fabricated review structured data
- [ ] NorthLine request flow does not transmit or store personal data
- [ ] Only Che Xu Studio lead form is live

## SEO / demo mode

- [ ] `PUBLIC_DEMO_MODE=true` for the standalone demo
- [ ] Pages emit `noindex, nofollow`
- [ ] `robots.txt` disallows indexing in demo mode
- [ ] LocalBusiness JSON-LD omitted while fictional
- [ ] Unique titles, descriptions, H1s, canonicals, breadcrumbs verified
- [ ] Sitemap generated and reviewed
- [ ] Case-study page on Che Xu Studio site remains indexable (separate publish)

## Conversion

- [ ] Primary CTA per section is clear
- [ ] Mobile sticky action bar works at 360–390px
- [ ] Lead drawer opens only from user action
- [ ] Consent is explicit and not preselected
- [ ] Success / error states verified

## Accessibility

- [ ] Skip link works
- [ ] Keyboard navigation for header, mobile menu, drawer, request flow
- [ ] Focus restore on dialog close
- [ ] Visible focus indicators
- [ ] Contrast checks on navy / amber / blue combinations
- [ ] `prefers-reduced-motion` respected
- [ ] axe serious/critical issues resolved on key pages

## Security / privacy

- [ ] Turnstile site + secret configured for non-local environments
- [ ] Allowed origins configured
- [ ] D1 migrations applied
- [ ] Secrets present only in `.dev.vars` / Workers secrets
- [ ] CSP / HSTS / security headers verified in preview
- [ ] Dependency audit clean (`npm audit`)

## Performance

- [ ] Production build succeeds
- [ ] Lighthouse mobile targets reviewed on home, service, request pages
- [ ] No horizontal overflow at 360 / 390 / 768 / 1024 / 1440
- [ ] LCP image / hero strategy confirmed
- [ ] Third-party scripts minimized

## Cloudflare

- [ ] `wrangler.jsonc` database id replaced
- [ ] D1 binding verified
- [ ] AI binding optional but documented
- [ ] Edge rate limiting configured for `/api/*`
- [ ] Workers Builds **Build command** = `npm run build`
- [ ] Workers Builds **Deploy command** = `npx wrangler deploy --config dist/server/wrangler.json`
- [ ] `npm run cf:dry-run` succeeds
- [ ] Deployment authorized before any live publish

## Documentation

- [ ] README accurate
- [ ] `.dev.vars.example` complete
- [ ] `ASSET_LICENSES.md` up to date
- [ ] `CASE_STUDY_COPY.md` ready for Che Xu Studio publishing
- [ ] Owner-verified values list reviewed with the client before any `DEMO_MODE=false` launch
