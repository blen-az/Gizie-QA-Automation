import { test, expect } from '@playwright/test';

test.describe('Admin Module: Payout Banks (System)', () => {
  test('ADM-BNK-01: Payout banks page displays configured banks and wallets list', async ({ page }) => {
    await page.goto('/#/payout-banks');
    await expect(page.getByRole('heading', { name: 'Payout banks' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit banks' })).toBeVisible();

    // Verify key banks and wallets are listed
    await expect(page.locator('text=CBE')).toBeVisible();
    await expect(page.locator('text=Awash')).toBeVisible();
    await expect(page.locator('text=Telebirr')).toBeVisible();
  });
});
