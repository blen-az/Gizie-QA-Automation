import { test, expect } from '@playwright/test';

test.describe('Admin Module: Users & Roles (System)', () => {
  test('ADM-USR-01: Users table loads with accounts, roles, and status indicators', async ({ page }) => {
    await page.goto('/#/users');
    await expect(page.getByRole('heading', { name: 'Users & roles' })).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByPlaceholder('Search name, email or phone…');
    await expect(searchInput).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /ACCOUNT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ROLE/i })).toBeVisible();
    await expect(headers.filter({ hasText: /VERIFIED/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();

    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-USR-02: Search filters user accounts', async ({ page }) => {
    await page.goto('/#/users');
    await expect(page.getByRole('heading', { name: 'Users & roles' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByPlaceholder('Search name, email or phone…');
    await searchInput.fill('admin');
    await page.waitForTimeout(600);

    await expect(page.locator('tbody tr').first()).toBeVisible();
    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThan(0);

    // Search for non-existent
    await searchInput.fill('__NO_SUCH_USER_9999__');
    await page.waitForTimeout(600);
    const zeroCount = await page.locator('tbody tr').count();
    expect(zeroCount).toBe(0);
  });
});
