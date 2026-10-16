import { test, expect } from '@playwright/test';
import { FraudPage } from '../../pages/FraudPage.js';

test.describe('Admin Module: Fraud Alerts (Risk)', () => {
  test('ADM-FRD-01: Fraud alerts table loads with rules, severity, and status', async ({ page }) => {
    const fraudPage = new FraudPage(page);
    await fraudPage.goto();

    await expect(fraudPage.heading).toBeVisible();
    await expect(fraudPage.refreshButton).toBeVisible();
    await expect(fraudPage.severitySelect).toBeVisible();
    await expect(fraudPage.table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /ALERT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /RULE/i })).toBeVisible();
    await expect(headers.filter({ hasText: /SEVERITY/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /ACTION/i })).toBeVisible();

    const count = await fraudPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-FRD-02: Status tabs switch between alert resolution states', async ({ page }) => {
    const fraudPage = new FraudPage(page);
    await fraudPage.goto();

    await expect(fraudPage.tabAll).toBeVisible();
    await expect(fraudPage.tabOpen).toBeVisible();
    await expect(fraudPage.tabReviewed).toBeVisible();
    await expect(fraudPage.tabDismissed).toBeVisible();

    // Click Open tab
    await fraudPage.tabOpen.click();
    await page.waitForTimeout(400);

    // Click All tab
    await fraudPage.tabAll.click();
    await page.waitForTimeout(400);
    const count = await fraudPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-FRD-03: Filter by severity dropdown functions properly', async ({ page }) => {
    const fraudPage = new FraudPage(page);
    await fraudPage.goto();

    // Verify all 4 expected severity options exist
    const options = await fraudPage.severitySelect.locator('option').allInnerTexts();
    expect(options).toEqual(['All severities', 'Low severity', 'Medium severity', 'High severity']);

    // Filter by High severity
    await fraudPage.severitySelect.selectOption({ label: 'High severity' });
    await page.waitForTimeout(400);
    const highCount = await fraudPage.tableRows.count();
    expect(highCount).toBe(3);
    const highBadges = await page.locator('tbody tr').getByText(/high/i).count();
    expect(highBadges).toBeGreaterThan(0);

    // Filter by Medium severity
    await fraudPage.severitySelect.selectOption({ label: 'Medium severity' });
    await page.waitForTimeout(400);
    const medCount = await fraudPage.tableRows.count();
    expect(medCount).toBe(1);

    // Reset to All severities
    await fraudPage.severitySelect.selectOption({ label: 'All severities' });
    await page.waitForTimeout(400);
    const allCount = await fraudPage.tableRows.count();
    expect(allCount).toBe(4);
  });
});
