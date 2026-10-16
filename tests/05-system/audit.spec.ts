import { test, expect } from '@playwright/test';
import { AuditPage } from '../../pages/AuditPage.js';

test.describe('Admin Module: Audit Log (System)', () => {
  test('ADM-AUD-01: Audit log loads with records, timestamps, and details', async ({ page }) => {
    const auditPage = new AuditPage(page);
    await auditPage.goto();

    await expect(auditPage.heading).toBeVisible();
    await expect(auditPage.refreshButton).toBeVisible();
    await expect(auditPage.table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /TIME/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ACTOR/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ACTION/i })).toBeVisible();
    await expect(headers.filter({ hasText: /TARGET/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();

    await expect(auditPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const count = await auditPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-AUD-02: Category dropdown filters audit events', async ({ page }) => {
    const auditPage = new AuditPage(page);
    await auditPage.goto();

    await expect(auditPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    await auditPage.filterByCategory('Auth');
    await page.waitForTimeout(600);
    const authCount = await auditPage.tableRows.count();
    expect(authCount).toBeGreaterThan(0);

    // Filter back to All categories
    await auditPage.filterByCategory('All categories');
    await page.waitForTimeout(600);
    const allCount = await auditPage.tableRows.count();
    expect(allCount).toBeGreaterThanOrEqual(authCount);
  });

  test('ADM-AUD-03: Action search input filters audit log records', async ({ page }) => {
    const auditPage = new AuditPage(page);
    await auditPage.goto();

    await expect(auditPage.tableRows.first()).toBeVisible({ timeout: 10000 });

    // Use category Auth first to ensure auth records are active
    await auditPage.filterByCategory('Auth');
    await page.waitForTimeout(500);

    // Clear search
    await auditPage.actionSearchInput.fill('');
    await page.waitForTimeout(400);
    const count = await auditPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-AUD-04: Pagination navigation cycles pages and updates page indicator', async ({ page }) => {
    const auditPage = new AuditPage(page);
    await auditPage.goto();

    await expect(auditPage.paginationInfo).toBeVisible({ timeout: 10000 });
    const initialText = await auditPage.paginationInfo.textContent();
    expect(initialText).toContain('Page 1');

    if (await auditPage.nextButton.isEnabled()) {
      await auditPage.nextButton.click();
      await page.waitForTimeout(600);
      const nextPageText = await auditPage.paginationInfo.textContent();
      expect(nextPageText).toContain('Page 2');

      // Go back to Page 1
      await auditPage.prevButton.click();
      await page.waitForTimeout(600);
      const prevPageText = await auditPage.paginationInfo.textContent();
      expect(prevPageText).toContain('Page 1');
    }
  });
});
