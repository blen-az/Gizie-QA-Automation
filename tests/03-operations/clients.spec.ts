import { test, expect } from '@playwright/test';

test.describe('Admin Module: Clients (Operations)', () => {
  test('ADM-CLI-01: Clients table loads with customer records and login method', async ({ page }) => {
    await page.goto('/#/clients');
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByPlaceholder('Search name, email or phone…');
    await expect(searchInput).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /ACCOUNT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /SIGNS IN WITH/i })).toBeVisible();
    await expect(headers.filter({ hasText: /PHONE/i })).toBeVisible();
    await expect(headers.filter({ hasText: /VERIFIED/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();

    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-CLI-02: Search filters client records', async ({ page }) => {
    await page.goto('/#/clients');
    const searchInput = page.getByPlaceholder('Search name, email or phone…');

    await searchInput.fill('__NO_SUCH_CLIENT_99999__');
    await page.waitForTimeout(400);
    const count = await page.locator('tbody tr').count();
    expect(count).toBe(0);

    // Clear
    await searchInput.fill('');
    await page.waitForTimeout(400);
    const restored = await page.locator('tbody tr').count();
    expect(restored).toBeGreaterThan(0);
  });
});
