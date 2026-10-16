import { test, expect } from '@playwright/test';

test.describe('Admin Module: Branch KYC (Operations)', () => {
  test('ADM-BKYC-01: Branch KYC table loads with verification statuses and controls', async ({ page }) => {
    await page.goto('/#/branch-kyc');
    await expect(page.getByRole('heading', { name: /Branch KYC \/ Verification/i })).toBeVisible({ timeout: 10000 });

    const searchInput = page.getByPlaceholder('Search branches');
    await expect(searchInput).toBeVisible();

    const table = page.locator('table');
    await expect(table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /BRANCH/i })).toBeVisible();
    await expect(headers.filter({ hasText: /LOCATION/i })).toBeVisible();
    await expect(headers.filter({ hasText: /DOCUMENTS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /VERIFICATION/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();

    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-BKYC-02: Branch KYC filter tabs switch views', async ({ page }) => {
    await page.goto('/#/branch-kyc');
    await expect(page.getByRole('heading', { name: /Branch KYC \/ Verification/i })).toBeVisible({ timeout: 10000 });

    // Switch to Pending
    const tabPending = page.getByRole('button', { name: /Pending/i });
    await expect(tabPending).toBeVisible();
    await tabPending.click();
    const pendingMatch = (await tabPending.innerText()).match(/(\d+)/);
    const expectedPending = pendingMatch ? parseInt(pendingMatch[1], 10) : 0;
    if (expectedPending > 0) {
      await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });
      const pendingCount = await page.locator('tbody tr').count();
      expect(pendingCount).toBe(expectedPending);
    }

    // Switch to Approved
    const tabApproved = page.getByRole('button', { name: /Approved/i });
    await expect(tabApproved).toBeVisible();
    await tabApproved.click();
    const approvedMatch = (await tabApproved.innerText()).match(/(\d+)/);
    const expectedApproved = approvedMatch ? parseInt(approvedMatch[1], 10) : 0;
    if (expectedApproved > 0) {
      await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });
      const approvedCount = await page.locator('tbody tr').count();
      expect(approvedCount).toBe(expectedApproved);
    }

    // Switch to All
    const tabAll = page.getByRole('button', { name: /All/i });
    await expect(tabAll).toBeVisible();
    await tabAll.click();
    await expect(page.locator('tbody tr').first()).toBeVisible({ timeout: 10000 });
    const allCount = await page.locator('tbody tr').count();
    expect(allCount).toBeGreaterThan(0);
  });
});
