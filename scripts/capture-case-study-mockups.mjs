/**
 * Capture the single best conversion & SEO showcase mockup for each breakpoint.
 * These feed chexustudio.com/work → “Desktop view · Mobile responsive · Conversion & SEO”.
 *
 * Outputs:
 *   public/images/case-study/{desktop,tablet,mobile}-homepage.png
 *   /opt/cursor/artifacts/case-study-mockups/
 */
import { chromium, devices } from '@playwright/test';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const PUBLIC_DIR = path.resolve('public/images/case-study');
const ARTIFACT_DIR = path.resolve('/opt/cursor/artifacts/case-study-mockups');
const RECOMMENDED_DIR = path.resolve('/opt/cursor/artifacts/recommended-responsive');

/** One best frame per breakpoint for the work-page responsive mockup row. */
const FRAMES = [
  {
    key: 'desktop',
    filename: 'desktop-homepage.png',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    context: { ...devices['Desktop Chrome'] },
  },
  {
    key: 'tablet',
    filename: 'tablet-homepage.png',
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
    context: {
      ...devices['iPad Mini'],
      isMobile: true,
      hasTouch: true,
    },
  },
  {
    key: 'mobile',
    filename: 'mobile-homepage.png',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    context: {
      ...devices['iPhone 14'],
      isMobile: true,
      hasTouch: true,
    },
  },
];

async function settle(page, ms = 600) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(ms);
}

/** Clean product frame: portfolio bar dismissed, floating assistant hidden. */
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

async function captureFrame(browser, frame) {
  const context = await browser.newContext({
    ...frame.context,
    viewport: frame.viewport,
    deviceScaleFactor: frame.deviceScaleFactor,
  });
  const page = await context.newPage();

  await page.addInitScript(() => {
    try {
      localStorage.setItem('northline-portfolio-bar-dismissed', '1');
    } catch {
      /* ignore */
    }
  });

  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await prepareProductFrame(page);
  await page.locator('.hero').waitFor({ state: 'visible' });
  // Ensure hero photo is painted before capture
  await page
    .locator('.hero__photo')
    .evaluate((img) => {
      if (img.complete) return;
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    })
    .catch(() => {});
  await settle(page, 800);

  // Homepage hero is the conversion money shot: brand, H1, trust, dual CTAs.
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page, 200);

  await mkdir(PUBLIC_DIR, { recursive: true });
  await mkdir(ARTIFACT_DIR, { recursive: true });
  await mkdir(RECOMMENDED_DIR, { recursive: true });

  const publicPath = path.join(PUBLIC_DIR, frame.filename);
  await page.screenshot({
    path: publicPath,
    type: 'png',
    animations: 'disabled',
    fullPage: false,
  });
  await copyFile(publicPath, path.join(ARTIFACT_DIR, frame.filename));
  await copyFile(
    publicPath,
    path.join(RECOMMENDED_DIR, `${frame.key}-homepage-hero.png`),
  );
  console.log(
    `wrote ${frame.key} → ${frame.filename} (${frame.viewport.width}×${frame.viewport.height} @${frame.deviceScaleFactor}x)`,
  );

  await context.close();
}

const browser = await chromium.launch();
for (const frame of FRAMES) {
  await captureFrame(browser, frame);
}
await browser.close();

console.log('Best desktop / tablet / mobile case-study mockups captured.');
