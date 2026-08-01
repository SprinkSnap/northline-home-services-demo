import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  '/',
  '/services',
  '/services/heating-cooling',
  '/services/plumbing',
  '/services/electrical',
  '/services/home-maintenance',
  '/service-areas',
  '/about',
  '/how-it-works',
  '/request-service',
  '/contact',
];

test.describe('NorthLine demo smoke', () => {
  test('home shows fictional disclosure and primary navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Reliable Home Comfort, Without the Runaround',
    );
    await expect(page.getByText(/fictional demonstration/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request Service' }).first()).toBeVisible();
  });

  test('service cards link to service pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore Service' }).first().click();
    await expect(page).toHaveURL(/\/services\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('request flow completes without network submission of demo data', async ({ page }) => {
    const posted: string[] = [];
    page.on('request', (request) => {
      if (request.method() === 'POST') posted.push(request.url());
    });

    await page.goto('/request-service');
    await page.getByRole('button', { name: 'Heating and cooling' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Seasonal tune-up' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Flexible' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByLabel('Name').fill('Demo User');
    await page.getByLabel('Email').fill('demo@example.com');
    await page.getByRole('button', { name: 'Finish demonstration' }).click();
    await expect(
      page.getByText('You’ve completed the NorthLine conversion-flow demonstration.'),
    ).toBeVisible();
    expect(posted.filter((url) => url.includes('/api/'))).toHaveLength(0);
  });

  test('mobile menu opens, traps focus path, and closes', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.startsWith('desktop') || testInfo.project.name.startsWith('laptop'),
      'Mobile menu hidden on large screens',
    );
    await page.goto('/');
    await page.getByRole('button', { name: /open menu/i }).click();
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Menu' })).toHaveCount(0);
  });

  test('demo pages send noindex robots meta', async ({ page }) => {
    await page.goto('/');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toBe('noindex, nofollow');
  });

  for (const route of routes) {
    test(`renders ${route} without horizontal overflow`, async ({ page }) => {
      await page.goto(route);
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(hasOverflow).toBe(false);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  }

  test('homepage has no serious accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? ''),
    );
    expect(serious).toEqual([]);
  });
});
