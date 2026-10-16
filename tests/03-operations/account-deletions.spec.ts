import { test, expect } from '@playwright/test';

test.describe('Admin Module: Account Deletions (Operations)', () => {
  test('ADM-DEL-01: Account deletions page loads with decision tabs and search', async ({ page }) => {
    await page.goto('/#/account-deletions');
    await expect(page.getByRole('heading', { name: 'Account deletions' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Pending/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Approved/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Rejected/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^All/i })).toBeVisible();

    const searchInput = page.getByRole('searchbox');
    await expect(searchInput).toBeVisible();
  });
});
