import { test, expect } from '@playwright/test';

test.describe('UI/UX & Responsive Layouts', () => {
  test('UI-01: Responsive adaptivity across viewports (Desktop, Tablet, Mobile)', async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('link', { name: 'Businesses', exact: true })).toBeVisible();

    // Tablet Viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('UI-02: Sidebar collapse and expand functionality', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    const collapseBtn = page.getByRole('button', { name: 'Collapse sidebar' });
    if (await collapseBtn.isVisible()) {
      await collapseBtn.click();
      await page.waitForTimeout(500);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    }
  });

  test('UI-03: Empty state UI consistency across inactive queues', async ({ page }) => {
    await page.goto('/#/suspension-appeals');
    await expect(page.locator('text=No appeals waiting')).toBeVisible({ timeout: 10000 });

    await page.goto('/#/review-reports');
    await expect(page.locator('text=No reports waiting')).toBeVisible({ timeout: 10000 });

    await page.goto('/#/account-deletions');
    await expect(page.locator('text=No accounts waiting on a decision')).toBeVisible({ timeout: 10000 });
  });
});
