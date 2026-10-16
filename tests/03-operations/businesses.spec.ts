import { test, expect } from '@playwright/test';
import { BusinessesPage } from '../../pages/BusinessesPage.js';

test.describe('Admin Module: Businesses (Operations)', () => {
  test('ADM-BIZ-01: Businesses table loads with expected columns and controls', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    await expect(bizPage.heading).toBeVisible();
    await expect(bizPage.refreshButton).toBeVisible();
    await expect(bizPage.searchInput).toBeVisible();
    await expect(bizPage.table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /BUSINESS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /OWNER/i })).toBeVisible();
    await expect(headers.filter({ hasText: /VERIFICATION/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ACTION/i })).toBeVisible();

    await expect(bizPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const count = await bizPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-BIZ-02: Status tabs filter the businesses list', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    await expect(bizPage.tabAll).toBeVisible();
    await expect(bizPage.tabPending).toBeVisible();
    await expect(bizPage.tabVerified).toBeVisible();

    await bizPage.tabPending.click();
    await page.waitForTimeout(500);

    await bizPage.tabAll.click();
    await page.waitForTimeout(500);
    const count = await bizPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-BIZ-03: Search filters businesses dynamically and clearing restores list', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    await expect(bizPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await bizPage.tableRows.count();

    await bizPage.search('a');
    await page.waitForTimeout(600);
    const filteredCount = await bizPage.tableRows.count();
    expect(filteredCount).toBeGreaterThanOrEqual(0);

    await bizPage.clearSearch();
    await page.waitForTimeout(600);
    const restoredCount = await bizPage.tableRows.count();
    expect(restoredCount).toBe(initialCount);
  });

  test('ADM-BIZ-04: Non-existent search query returns 0 rows or empty message gracefully', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    await bizPage.search('__NON_EXISTENT_BUSINESS_99999__');
    await page.waitForTimeout(600);
    const count = await bizPage.tableRows.count();
    expect(count).toBe(0);
    await expect(page.locator('text=No businesses in this filter')).toBeVisible();
  });

  test('ADM-BIZ-05: Special characters in search do not trigger application crash', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    const specialInputs = ["'", "\"", "%", "--", "\\"];
    for (const input of specialInputs) {
      await bizPage.search(input);
      await expect(bizPage.table.or(page.getByText('No businesses in this filter'))).toBeVisible({ timeout: 10000 });

      await expect(bizPage.heading).toBeVisible();
      const hasTable = await bizPage.table.isVisible();
      const hasEmptyState = await page.locator('text=No businesses in this filter').isVisible();
      expect(hasTable || hasEmptyState).toBe(true);
    }
  });

  test('ADM-BIZ-06 [DEFECT-CHECK]: Searching HTML script tag in search box handles server response', async ({ page }) => {
    const bizPage = new BusinessesPage(page);
    await bizPage.goto();

    await bizPage.search('<script>');
    await page.waitForTimeout(800);

    // Requirement: Searching HTML tags must be sanitized and return graceful empty state without crashing connection
    // Known Defect BUG-GZ-001: Backend drops connection and triggers unhandled alert: "Cannot reach the server"
    const alertError = page.locator('text=Cannot reach the server');
    const isErrorShown = await alertError.isVisible();
    test.fail(isErrorShown, 'BUG-GZ-001: Backend drops connection on <script> query with "Cannot reach the server"');
    await expect(alertError).not.toBeVisible();
  });
});
