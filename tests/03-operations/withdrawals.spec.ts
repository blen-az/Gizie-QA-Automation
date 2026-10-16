import { test, expect } from '@playwright/test';

test.describe('Admin Module: Withdrawals (Operations)', () => {
  test('ADM-WTH-01: Withdrawals page loads with filter tabs and request table', async ({ page }) => {
    await page.goto('/#/withdrawals');
    await expect(page.getByRole('heading', { name: 'Withdrawals' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Pending/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^Paid/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^All/i })).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /REQUEST/i })).toBeVisible();
    await expect(headers.filter({ hasText: /BUSINESS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /AMOUNT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /PAY TO/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();
  });

  test('ADM-WTH-02: Withdrawal filter tabs switch active status view', async ({ page }) => {
    await page.goto('/#/withdrawals');
    await expect(page.getByRole('heading', { name: 'Withdrawals' })).toBeVisible({ timeout: 10000 });

    // Switch to Pending
    const tabPending = page.getByRole('button', { name: /^Pending/i });
    await expect(tabPending).toBeVisible();
    await tabPending.click();
    await page.waitForTimeout(400);
    const pendingCount = await page.locator('tbody tr').count();
    expect(pendingCount).toBeGreaterThan(0);
    const pendingBadges = await page.locator('tbody tr td:nth-child(5)').allInnerTexts();
    expect(pendingBadges.every(b => b.toLowerCase().includes('pending'))).toBe(true);

    // Switch to Paid
    const tabPaid = page.getByRole('button', { name: /^Paid/i });
    await expect(tabPaid).toBeVisible();
    await tabPaid.click();
    await page.waitForTimeout(400);
    const paidCount = await page.locator('tbody tr').count();
    expect(paidCount).toBeGreaterThan(0);
    const paidBadges = await page.locator('tbody tr td:nth-child(5)').allInnerTexts();
    expect(paidBadges.every(b => b.toLowerCase().includes('completed') || b.toLowerCase().includes('paid'))).toBe(true);

    // Switch to All
    const tabAll = page.getByRole('button', { name: /^All/i });
    await expect(tabAll).toBeVisible();
    await tabAll.click();
    await page.waitForTimeout(400);
    const allCount = await page.locator('tbody tr').count();
    expect(allCount).toBeGreaterThanOrEqual(pendingCount + paidCount);
  });
});
