# Case-study screenshots

Recommended captures for the Che Xu Studio work page
(`chexustudio.com/work` → NorthLine Home Services → **Desktop · Tablet · Mobile · Conversion & SEO**).

## Best one per breakpoint (work-page mockups)

These are the primary frames for the responsive mockup row. Regenerate with:

```bash
npm run preview   # in another terminal, after `npm run build`
npm run screenshots:case-study
```

| Breakpoint | Viewport        | Output                                              |
| ---------- | --------------- | --------------------------------------------------- |
| Desktop    | 1440×900 @2x    | `public/images/case-study/desktop-homepage.png`     |
| Tablet     | 768×1024 @2x    | `public/images/case-study/tablet-homepage.png`      |
| Mobile     | 390×844 @2x     | `public/images/case-study/mobile-homepage.png`      |

Each frame shows the homepage hero: brand, benefit-led H1, trust signals, and dual CTAs—the strongest conversion & SEO story at that size.

## Full recommended sets

```bash
npm run screenshots:mobile
npm run screenshots:tablet
npm run screenshots:desktop
# or all of the above + case-study mockups:
npm run screenshots
```

Requires a running site at `BASE_URL` (default `http://127.0.0.1:4321`).

### Mobile (390×844 @2x) — `docs/screenshots/mobile/`

1. Homepage hero and service chooser — `01-homepage-hero.png`, `01b-homepage-service-chooser.png`
2. Mobile sticky action bar — `02-mobile-sticky-action-bar.png`
3. Guided request flow — `03-guided-request-flow.png`, `03b-guided-request-flow-step.png`
4. Service page template — `04-service-page-template.png`
5. Service-area architecture — `05-service-area-architecture.png`, `05b-service-area-groupings.png`
6. Che Xu Studio lead drawer — `06-che-xu-lead-drawer.png`

### Tablet (768×1024 @2x) — `docs/screenshots/tablet/`

1. Homepage hero and service chooser — `01-homepage-hero.png`, `01b-homepage-service-chooser.png`
2. Tablet conversion chrome / sticky actions — `02-*.png`
3. Guided request flow — `03-guided-request-flow.png`, `03b-guided-request-flow-step.png`
4. Service page template — `04-service-page-template.png`
5. Service-area architecture — `05-service-area-architecture.png`, `05b-service-area-groupings.png`
6. Che Xu Studio lead drawer — `06-che-xu-lead-drawer.png`

### Desktop (1440×900) — `docs/screenshots/desktop/`

1. Homepage hero and service chooser — `01-homepage-hero.png`, `01b-homepage-service-chooser.png`
2. Desktop header chrome (nav + CTAs) — `02-desktop-header-chrome.png`
3. Guided request flow — `03-guided-request-flow.png`, `03b-guided-request-flow-step.png`
4. Service page template — `04-service-page-template.png`
5. Service-area architecture — `05-service-area-architecture.png`, `05b-service-area-groupings.png`
6. Che Xu Studio lead drawer — `06-che-xu-lead-drawer.png`

Artifact copies are also written under `/opt/cursor/artifacts/` for walkthroughs.
