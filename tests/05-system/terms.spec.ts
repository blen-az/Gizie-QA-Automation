import { test, expect } from '@playwright/test';

test.describe('Admin Module: Terms & Conditions (System)', () => {
  test('ADM-TRM-01: Terms and conditions page displays published version and action controls', async ({ page }) => {
    await page.goto('/#/terms');
    await expect(page.getByRole('heading', { name: 'Terms & conditions' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New version' })).toBeVisible();

    // Verify published policy card
    await expect(page.locator('text=Platform Terms & Conditions')).toBeVisible();
    await expect(page.locator('text=Published')).toBeVisible();
    await expect(page.locator('text=/Version \\d+\\.\\d+/')).toBeVisible();
  });
});
