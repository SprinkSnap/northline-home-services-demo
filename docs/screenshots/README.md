# Case-study screenshots

Recommended frames for the Che Xu Studio case study (`CASE_STUDY_COPY.md`).

| Viewport | Size | Path | Regen |
|----------|------|------|-------|
| Mobile | 390×844 @2x | [`mobile/`](./mobile/) | `npm run screenshots:mobile` |
| Tablet | 768×1024 @2x | [`tablet/`](./tablet/) | `npm run screenshots:tablet` |
| Desktop | 1440×900 | [`desktop/`](./desktop/) | `npm run screenshots:desktop` |

Run all: `npm run screenshots` (requires preview on `http://127.0.0.1:4321`).

## Recommended set

Same six story beats across viewports:

| # | Story beat | Mobile | Tablet | Desktop |
|---|------------|--------|--------|---------|
| 1 | Homepage hero | `01-homepage-hero.png` | `01-homepage-hero.png` | `01-homepage-hero.png` |
| 1b | Service chooser | `01b-…` | `01b-…` | `01b-…` |
| 2 | Conversion chrome | sticky action bar | sticky action bar | header nav + CTAs |
| 3 | Guided request flow | `03-…` | `03-…` | `03-…` |
| 3b | Request-type step | `03b-…` | `03b-…` | `03b-…` |
| 4 | Service page template | `04-…` | `04-…` | `04-…` |
| 5 | Service-area architecture | `05-…` | `05-…` | `05-…` |
| 6 | Che Xu lead drawer | `06-…` | `06-…` | `06-…` |

Notes:

- **Tablet (768)** still uses hamburger nav + sticky action bar (desktop chrome starts at **1024px**).
- Supplemental crops and mid-page frames (`*b`, `01c-homepage-full.png`) are included for galleries.

## Capture notes

- Portfolio bar is dismissed and the demo assistant is hidden so frames show the product UI.
- Preview must be serving the current build before regenerating.
