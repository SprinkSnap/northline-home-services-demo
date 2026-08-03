# Mobile case-study screenshots

Recommended mobile frames for the Che Xu Studio case study
(`CASE_STUDY_COPY.md`), captured at **390×844 @2x** (iPhone 14 class).

## Recommended set

| # | File | What it shows |
|---|------|----------------|
| 1 | `01-homepage-hero.png` | Homepage hero: brand, headline, CTAs, sticky actions |
| 1b | `01b-homepage-service-chooser.png` | Service chooser cards |
| 2 | `02-mobile-sticky-action-bar.png` | Sticky mobile action bar in context |
| 2b | `02b-mobile-action-bar-detail.png` | Action bar crop |
| 3 | `03-guided-request-flow.png` | Request flow — choose a service |
| 3b | `03b-guided-request-flow-step.png` | Request flow — request type step |
| 4 | `04-service-page-template.png` | Service page template (Heating & Cooling) |
| 4b | `04b-service-page-detail.png` | Service page mid-section guidance |
| 5 | `05-service-area-architecture.png` | Service-area architecture intro |
| 5b | `05b-service-area-groupings.png` | Regional groupings |
| 6 | `06-che-xu-lead-drawer.png` | Che Xu Studio lead drawer |
| 6b | `06b-che-xu-lead-drawer-panel.png` | Lead drawer panel crop |

Optional: `01c-homepage-full.png` is a full-page homepage capture for galleries.

## Regenerating

With the preview server running on port 4321:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
npm run screenshots:mobile
```

Or after build:

```bash
npm run screenshots:mobile
```

(requires `http://127.0.0.1:4321` to be serving the preview).

Portfolio chrome is dismissed and the demo assistant is hidden so the frames
show the product UI clearly.
