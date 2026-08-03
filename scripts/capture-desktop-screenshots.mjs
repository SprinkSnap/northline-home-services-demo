/**
 * Capture recommended case-study desktop screenshots (1440×900).
 * Mirrors CASE_STUDY_COPY.md → Screenshots, framed for desktop.
 */
import { chromium, devices } from '@playwright/test';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const REPO_DIR = path.resolve('docs/screenshots/desktop');
const ARTIFACT_DIR = path.resolve('/opt/cursor/artifacts/desktop-screenshots');
const RECOMMENDED_DIR = path.resolve('/opt/cursor/artifacts/recommended-desktop');

const VIEWPORT = { width: 1440, height: 900 };

async function settle(page, ms = 500) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(ms);
}

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
  await mkdir(RECOMMENDED_DIR, { recursive: true });
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
  ...devices['Desktop Chrome'],
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});
const page = await context.newPage();

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
  const y = section.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '01b-homepage-service-chooser.png', { fullPage: false });
await writeShot(page, '01c-homepage-full.png', { fullPage: true });

// ---------------------------------------------------------------------------
// 2. Desktop conversion chrome (header nav + CTAs) — desktop counterpart to
//    the mobile sticky action bar.
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/');
await page.locator('.site-header').waitFor({ state: 'visible' });
await writeElementShot(page.locator('.site-chrome'), '02-desktop-header-chrome.png');
// In-context framing: hero with header CTAs visible
await writeShot(page, '02b-desktop-header-in-context.png', { fullPage: false });

// ---------------------------------------------------------------------------
// 3. Guided request flow
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/request-service/');
await page.locator('.request-flow__steps').waitFor({ state: 'visible' });
await page.evaluate(() => {
  const el = document.querySelector('.request-flow');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '03-guided-request-flow.png', { fullPage: false });

const heating = page.getByRole('button', { name: /Heating and cooling/i });
await heating.click();
await settle(page, 300);
const continueBtn = page.locator('.request-flow__actions .btn-primary');
await continueBtn.scrollIntoViewIfNeeded();
await continueBtn.click({ force: true });
await page.getByText('Choose the general request type').waitFor({ state: 'visible', timeout: 10_000 });
await page.evaluate(() => {
  const el = document.querySelector('.request-flow');
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo(0, Math.max(0, y));
});
await settle(page);
await writeShot(page, '03b-guided-request-flow-step.png', { fullPage: false });

// ---------------------------------------------------------------------------
// 4. Service page template
// ---------------------------------------------------------------------------
await gotoPrepared(page, '/services/heating-cooling/');
await writeShot(page, '04-service-page-template.png', { fullPage: false });

await page.evaluate(() => {
  const heading = [...document.querySelectorAll('h2')].find((h) =>
    h.textContent?.includes('When to request service'),
  );
  if (!heading) return;
  const y = heading.getBoundingClientRect().top + window.scrollY - 88;
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
  await page.evaluate(() => window.scrollBy(0, -88));
  await settle(page);
  await writeShot(page, '05b-service-area-groupings.png', { fullPage: false });
}

// ---------------------------------------------------------------------------
// 6. Che Xu Studio lead drawer (desktop side panel)
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

// Copy the primary recommended set with clean names for walkthrough artifacts
const recommended = [
  ['01-homepage-hero.png', '1-homepage-hero.png'],
  ['01b-homepage-service-chooser.png', '1b-homepage-service-chooser.png'],
  ['02-desktop-header-chrome.png', '2-desktop-header-chrome.png'],
  ['02b-desktop-header-in-context.png', '2b-desktop-header-in-context.png'],
  ['03-guided-request-flow.png', '3-guided-request-flow.png'],
  ['03b-guided-request-flow-step.png', '3b-guided-request-flow-step.png'],
  ['04-service-page-template.png', '4-service-page-template.png'],
  ['04b-service-page-detail.png', '4b-service-page-detail.png'],
  ['05-service-area-architecture.png', '5-service-area-architecture.png'],
  ['05b-service-area-groupings.png', '5b-service-area-groupings.png'],
  ['06-che-xu-lead-drawer.png', '6-che-xu-lead-drawer.png'],
];
for (const [src, dest] of recommended) {
  await copyFile(path.join(REPO_DIR, src), path.join(RECOMMENDED_DIR, dest));
}

console.log('All recommended desktop screenshots captured.');
