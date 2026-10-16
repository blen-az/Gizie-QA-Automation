import { test, expect } from '@playwright/test';

test.describe('Admin Module: Review Moderation (Operations)', () => {
  test('ADM-REV-01: Review moderation page loads with status tabs', async ({ page }) => {
    await page.goto('/#/review-reports');
    await expect(page.getByRole('heading', { name: 'Review moderation' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Pending/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Hidden/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Dismissed/i })).toBeVisible();

    // Auto-wait for either empty state or table once data request resolves
    const emptyState = page.locator('text=No reports waiting');
    await expect(emptyState).toBeVisible({ timeout: 10000 });
  });
});
