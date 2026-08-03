# Case-study screenshots

Recommended frames for the Che Xu Studio case study (`CASE_STUDY_COPY.md`).

| Viewport | Size | Path | Regen |
|----------|------|------|-------|
| Mobile | 390×844 @2x | [`mobile/`](./mobile/) | `npm run screenshots:mobile` |
| Desktop | 1440×900 | [`desktop/`](./desktop/) | `npm run screenshots:desktop` |

Run both: `npm run screenshots` (requires preview on `http://127.0.0.1:4321`).

## Recommended set

Same six story beats on both viewports (desktop replaces the mobile sticky bar with header chrome):

| # | Story beat | Mobile | Desktop |
|---|------------|--------|---------|
| 1 | Homepage hero | `01-homepage-hero.png` | `01-homepage-hero.png` |
| 1b | Service chooser | `01b-homepage-service-chooser.png` | `01b-homepage-service-chooser.png` |
| 2 | Conversion chrome | `02-mobile-sticky-action-bar.png` | `02-desktop-header-chrome.png` |
| 3 | Guided request flow | `03-guided-request-flow.png` | `03-guided-request-flow.png` |
| 3b | Request-type step | `03b-guided-request-flow-step.png` | `03b-guided-request-flow-step.png` |
| 4 | Service page template | `04-service-page-template.png` | `04-service-page-template.png` |
| 5 | Service-area architecture | `05-service-area-architecture.png` | `05-service-area-architecture.png` |
| 6 | Che Xu lead drawer | `06-che-xu-lead-drawer.png` | `06-che-xu-lead-drawer.png` |

Supplemental crops and mid-page frames (`*b`, `01c-homepage-full.png`) are included for galleries.

## Capture notes

- Portfolio bar is dismissed and the demo assistant is hidden so frames show the product UI.
- Preview must be serving the current build before regenerating.
