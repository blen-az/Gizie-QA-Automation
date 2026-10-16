import { test, expect } from '@playwright/test';
import { KycPage } from '../../pages/KycPage.js';

test.describe('Admin Module: KYC / Verification (Operations)', () => {
  test('ADM-KYC-01: KYC verification queue loads with expected columns and data', async ({ page }) => {
    const kycPage = new KycPage(page);
    await kycPage.goto();

    await expect(kycPage.heading).toBeVisible();
    await expect(kycPage.refreshButton).toBeVisible();
    await expect(kycPage.searchInput).toBeVisible();
    await expect(kycPage.table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /BUSINESS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /DOCUMENTS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /SUBMITTED/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ACTION/i })).toBeVisible();

    const count = await kycPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-KYC-02: Status tabs filter the KYC queue', async ({ page }) => {
    const kycPage = new KycPage(page);
    await kycPage.goto();

    await expect(kycPage.tabAll).toBeVisible();
    await expect(kycPage.tabPending).toBeVisible();
    await expect(kycPage.tabApproved).toBeVisible();

    // Switch to Pending
    await kycPage.tabPending.click();
    const pendingTabMatch = (await kycPage.tabPending.innerText()).match(/(\d+)/);
    const expectedPendingCount = pendingTabMatch ? parseInt(pendingTabMatch[1], 10) : 0;
    if (expectedPendingCount > 0) {
      await expect(kycPage.tableRows.first()).toBeVisible({ timeout: 10000 });
      const pendingCount = await kycPage.tableRows.count();
      expect(pendingCount).toBe(expectedPendingCount);
    }

    // Switch to Approved
    await kycPage.tabApproved.click();
    await page.waitForTimeout(400);

    // Switch back to All
    await kycPage.tabAll.click();
    await expect(kycPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const allCount = await kycPage.tableRows.count();
    expect(allCount).toBeGreaterThan(0);
  });

  test('ADM-KYC-03: Search filters KYC submissions dynamically', async ({ page }) => {
    const kycPage = new KycPage(page);
    await kycPage.goto();

    await kycPage.search('__NO_KYC_MATCH__');
    const count = await kycPage.tableRows.count();
    expect(count).toBe(0);

    // Clear search
    await kycPage.searchInput.fill('');
    await expect(kycPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const restoredCount = await kycPage.tableRows.count();
    expect(restoredCount).toBeGreaterThan(0);
  });
});
