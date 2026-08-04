# Case Study Copy — NorthLine Home Services

Use this finished copy on the indexable Che Xu Studio page:

`/work/northline-home-services`

## SEO

**Title:** Home Services Website Design Demo | Che Xu Studio

**Meta description:** Explore a conversion-focused home-services website concept by Che Xu Studio, featuring local SEO architecture, mobile lead generation and a guided service-request experience.

## Page content

**H1:** NorthLine Home Services Website Concept

**Label:** Concept Project — Created to demonstrate Che Xu Studio’s design, SEO and conversion capabilities.

### Desktop view · Mobile responsive · Conversion & SEO

Use the responsive mockups from `siteConfig.caseStudy.images` (`/images/case-study/desktop-homepage.png` and `/images/case-study/mobile-homepage.png`), then the brief below.

#### Client Industry

**Home Services**

A residential home services business providing reliable solutions for homeowners, with a focus on making it easy to request services and connect with the company.

#### Project Goal

Design and develop a modern, conversion-focused website that builds trust, improves user experience, supports local SEO, and encourages visitors to become qualified leads through clear calls to action and a mobile-first experience.

#### My Role

- UX Research & Strategy
- Information Architecture
- UI/Visual Design
- Responsive Web Design
- WordPress Development
- Technical SEO Implementation
- Performance Optimization
- Accessibility Best Practices

#### Technologies Used

- WordPress
- PHP
- HTML5
- CSS3
- JavaScript
- Responsive Design
- Technical SEO
- Performance Optimization
- Accessibility (WCAG)
- Google Fonts
- SVG Icons

**Disclosure:** NorthLine Home Services is a fictional demonstration. Present this work honestly as a portfolio concept, practice project, or demonstration project unless it becomes a real client project. Avoid implying it was built for an actual client.

### Project overview

NorthLine Home Services is a fictional contractor website concept created by Che Xu Studio. It shows how a home-services business can present services clearly, guide mobile visitors into a request flow, and prepare for responsible local SEO—without relying on pressure tactics or fabricated trust signals.

### Intended audience

- HVAC companies
- Plumbers
- Electricians
- Home-maintenance providers
- Other local service businesses evaluating a website rebuild

### Fictional business challenge

Many contractor websites bury services, overload the homepage, and force homeowners to call before they understand their options. NorthLine demonstrates an alternative: a calm, conversion-focused experience that makes the next step obvious.

### Conversion strategy

- One dominant CTA per section
- Service chooser with explore + request actions
- Sticky mobile actions for Services, Request Service, and Build My Website
- Guided multistep request demonstration
- Clear handoff from the fictional demo to a real Che Xu Studio enquiry

### Mobile customer journey

The experience is designed mobile-first: large touch targets, a sticky action bar, an accessible menu, and a request flow that works in short steps. Business owners can evaluate the journey the same way their customers would.

### Service architecture

Four core services—Heating & Cooling, Plumbing, Electrical, and Home Maintenance—each receive intent-focused pages with categories, “when to request” guidance, journey steps, related services, FAQs, and breadcrumbs.

### Local SEO approach

The concept demonstrates regional service-area architecture instead of thin duplicate city pages. Because NorthLine is fictional, the live demo remains `noindex, nofollow` and omits fake LocalBusiness NAP data. A configurable SEO system is ready for verified client information.

### Performance work

Marketing pages are statically generated. Interactive pieces are limited to React islands. Fonts are self-hosted, images are purpose-built SVG/CSS visuals, and third-party scripts are minimized.

### Accessibility work

Skip links, semantic landmarks, keyboard-accessible navigation and dialogs, visible focus styles, reduced-motion support, and WCAG-oriented form labelling are included throughout.

### Image optimization

The demo uses original SVG brand and hero visuals with reserved dimensions. For a real client, Che Xu Studio can wire Cloudflare Images or local AVIF/WebP responsive pipelines once photography is supplied.

### Security approach

The only live lead form submits to Che Xu Studio via `/api/portfolio-lead` with schema validation, origin checks, Turnstile, rate limiting, honeypot protection, and D1 prepared statements. The fictional NorthLine request flow never transmits personal data.

### Screenshots

Recommended captures live in [`docs/screenshots/`](./docs/screenshots/). Regenerate with `npm run screenshots:mobile`, `npm run screenshots:desktop`, or `npm run screenshots` (see [`docs/screenshots/README.md`](./docs/screenshots/README.md)).

**Mobile (390×844 @2x)** — `docs/screenshots/mobile/`

1. Homepage hero and service chooser — `01-homepage-hero.png`, `01b-homepage-service-chooser.png`
2. Mobile sticky action bar — `02-mobile-sticky-action-bar.png`
3. Guided request flow — `03-guided-request-flow.png`, `03b-guided-request-flow-step.png`
4. Service page template — `04-service-page-template.png`
5. Service-area architecture section — `05-service-area-architecture.png`, `05b-service-area-groupings.png`
6. Che Xu Studio lead drawer — `06-che-xu-lead-drawer.png`

**Desktop (1440×900)** — `docs/screenshots/desktop/`

1. Homepage hero and service chooser — `01-homepage-hero.png`, `01b-homepage-service-chooser.png`
2. Desktop header chrome (nav + CTAs) — `02-desktop-header-chrome.png`
3. Guided request flow — `03-guided-request-flow.png`, `03b-guided-request-flow-step.png`
4. Service page template — `04-service-page-template.png`
5. Service-area architecture section — `05-service-area-architecture.png`, `05b-service-area-groupings.png`
6. Che Xu Studio lead drawer — `06-che-xu-lead-drawer.png`

### Measured Lighthouse results

Populate after running Lighthouse against the deployed or locally previewed build. Do **not** describe concept metrics as real NorthLine business results.

| Page                             | Performance | Accessibility | Best Practices | SEO notes                                                |
| -------------------------------- | ----------- | ------------- | -------------- | -------------------------------------------------------- |
| Home                             | 99          | 100           | 100            | SEO category 66 due to deliberate `noindex` in demo mode |
| Service page (Heating & Cooling) | 97          | 100           | 100            | SEO category 66 due to deliberate `noindex` in demo mode |
| Request Service                  | 98          | 100           | 100            | SEO category 66 due to deliberate `noindex` in demo mode |

Measured locally with Lighthouse mobile simulation against `astro preview` (Cloudflare adapter). These are concept demo metrics, not NorthLine business results.

Additional homepage vitals from the same run: LCP ~2.0s, CLS ~0.003, total transfer ~353 KiB.

### Live demo link

`[Add production demo URL after authorized deployment]`

### CTA

**Build a Website Like This**

Supporting line: Tell Che Xu Studio what you need and get a recommended starting package for your contractor website.
