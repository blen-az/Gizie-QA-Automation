import { test, expect } from '@playwright/test';

test.describe('Admin Module: Suspension Appeals (Operations)', () => {
  test('ADM-APP-01: Suspension appeals queue loads with empty state / queue indicator', async ({ page }) => {
    await page.goto('/#/suspension-appeals');
    await expect(page.getByRole('heading', { name: 'Suspension appeals' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();

    const emptyState = page.locator('text=No appeals waiting');
    await expect(emptyState).toBeVisible({ timeout: 10000 });
  });
});
