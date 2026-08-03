/**
 * Capture the recommended case-study mobile screenshots (390×844 @2x).
 * Matches CASE_STUDY_COPY.md → Screenshots (best product framing).
 */
import { chromium, devices } from '@playwright/test';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const REPO_DIR = path.resolve('docs/screenshots/mobile');
const ARTIFACT_DIR = path.resolve('/opt/cursor/artifacts/mobile-screenshots');

const VIEWPORT = { width: 390, height: 844 };

async function settle(page, ms = 500) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(ms);
}

/** Dismiss portfolio chrome + hide floating assistant for cleaner case-study frames. */
async function prepareProductFrame(page) {
  await page.evaluate(() => {
    try {
      localStorage.setItem('northline-portfolio-bar-dismissed', '1');
    } catch {
      /* ignore */
    }
    const bar = document.getElementById('portfolio-bar');
    if (bar) bar.hidden = true;
  });
  await page.addStyleTag({
    content: `
      .demo-assistant,
      #assistant-host { display: none !important; visibility: hidden !important; }
      #portfolio-bar[hidden] { display: none !important; }
    `,
  });
  await page.evaluate(() => {
    document.querySelectorAll('.demo-assistant, #assistant-host').forEach((el) => {
      el.remove();
    });
  });
}

async function gotoPrepared(page, urlPath) {
  await page.goto(`${BASE}${urlPath}`, { waitUntil: 'domcontentloaded' });
  await prepareProductFrame(page);
  await settle(page);
}

async function writeShot(page, filename, options = {}) {
  await mkdir(REPO_DIR, { recursive: true });
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const repoPath = path.join(REPO_DIR, filename);
  await page.screenshot({
    path: repoPath,
    type: 'png',
    animations: 'disabled',
    ...options,
  });
  await copyFile(repoPath, path.join(ARTIFACT_DIR, filename));
  console.log(`wrote ${filename}`);
}

async function writeElementShot(locator, filename) {
  await mkdir(REPO_DIR, { recursive: true });
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const repoPath = path.join(REPO_DIR, filename);
  await locator.screenshot({ path: repoPath, animations: 'disabled' });
  await copyFile(repoPath, path.join(ARTIFACT_DIR, filename));
  console.log(`wrote ${filename}`);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  ...devices['iPhone 14'],
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

// Seed dismissed portfolio bar before first paint of product shots
await page.addInitScript(() => {
  try {
    localStorage.setItem('northline-portfolio-bar-dismissed', '1');
  } catch {
    /* ignore */
  }
});

// ---------------------------------------------------------------------------
// 1. Homepage hero and service chooser
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/');
await writeShot(page, '01-homepage-hero.png', { fullPage: false });

await page.locator('#services-chooser').scrollIntoViewIfNeeded();
await page.evaluate(() => {
  const section = document.getElementById('services-chooser')?.closest('section');
  if (!section) return;
  const y = section.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '01b-homepage-service-chooser.png', { fullPage: false });

await writeShot(page, '01c-homepage-full.png', { fullPage: true });

// ---------------------------------------------------------------------------
// 2. Mobile sticky action bar
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/');
await page.evaluate(() => window.scrollTo(0, 520));
await settle(page);
await page.locator('.mobile-action-bar').waitFor({ state: 'visible' });
await writeShot(page, '02-mobile-sticky-action-bar.png', { fullPage: false });
await writeElementShot(page.locator('.mobile-action-bar'), '02b-mobile-action-bar-detail.png');

// ---------------------------------------------------------------------------
// 3. Guided request flow (step UI is the money shot)
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/request-service/');
await page.locator('.request-flow__steps').waitFor({ state: 'visible' });
await page.locator('.request-flow__steps').scrollIntoViewIfNeeded();
await page.evaluate(() => {
  const el = document.querySelector('.request-flow');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '03-guided-request-flow.png', { fullPage: false });

// Step 2 after selecting a service and continuing
const heating = page.getByRole('button', { name: /Heating and cooling/i });
await heating.click();
await settle(page, 300);
const continueBtn = page.locator('.request-flow__actions .btn-primary');
await continueBtn.scrollIntoViewIfNeeded();
await page.evaluate(() => {
  const btn = document.querySelector('.request-flow__actions .btn-primary');
  btn?.scrollIntoView({ block: 'center' });
});
await settle(page, 200);
await continueBtn.click({ force: true });
await page.getByText('Choose the general request type').waitFor({ state: 'visible', timeout: 10_000 });
await page.evaluate(() => {
  const el = document.querySelector('.request-flow');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '03b-guided-request-flow-step.png', { fullPage: false });

// Also capture categories mid-page on service template more aggressively later


// ---------------------------------------------------------------------------
// 4. Service page template
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/services/heating-cooling/');
await writeShot(page, '04-service-page-template.png', { fullPage: false });

// Deeper template view — when-to-request guidance
await page.evaluate(() => {
  const heading = [...document.querySelectorAll('h2')].find((h) =>
    h.textContent?.includes('When to request service'),
  );
  if (!heading) return;
  const y = heading.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '04b-service-page-detail.png', { fullPage: false });

// ---------------------------------------------------------------------------
// 5. Service-area architecture
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/service-areas/');
await writeShot(page, '05-service-area-architecture.png', { fullPage: false });

const groupsHeading = page.getByRole('heading', { name: /Regional groupings/i });
if (await groupsHeading.isVisible().catch(() => false)) {
  await groupsHeading.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -72));
  await settle(page);
  await writeShot(page, '05b-service-area-groupings.png', { fullPage: false });
}

// ---------------------------------------------------------------------------
// 6. Che Xu Studio lead drawer (title + form fields)
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/');
await page.getByRole('button', { name: /Build a Website Like This/i }).first().click();
const dialog = page.getByRole('dialog');
await dialog.waitFor({ state: 'visible', timeout: 15_000 });
await page.getByRole('heading', { name: /Want a Website Built for Your Business/i }).waitFor({
  state: 'visible',
  timeout: 10_000,
});
await settle(page, 700);
await dialog.evaluate((el) => {
  el.scrollTop = 0;
});
await writeShot(page, '06-che-xu-lead-drawer.png', { fullPage: false });
await writeElementShot(dialog, '06b-che-xu-lead-drawer-panel.png');

await browser.close();
console.log('All recommended mobile screenshots captured.');
