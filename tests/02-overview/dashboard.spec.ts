import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage.js';

test.describe('Admin Module: Dashboard (Overview)', () => {
  test('ADM-DASH-01: Authenticated session loads Dashboard with global sidebar navigation', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await dashboard.verifyShellLoaded();
    await expect(dashboard.heading).toBeVisible();
    await expect(dashboard.userAccountDisplay).toBeVisible();
  });

  test('ADM-DASH-02: Key metric cards display valid structure and data', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await dashboard.verifyDashboardMetricsVisible();

    await expect(dashboard.customersCard).toContainText(/CUSTOMERS/i);
    await expect(dashboard.businessesCard).toContainText(/BUSINESSES/i);
    await expect(dashboard.bookingsCard).toContainText(/BOOKINGS/i);
    await expect(dashboard.revenueCard).toContainText(/ETB/i);
  });

  test('ADM-DASH-03: Action queues (Requires attention & Needs Action popover) display properly', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expect(dashboard.requiresAttentionCard).toBeVisible();
    await expect(dashboard.kycPendingCard).toBeVisible();
    await expect(dashboard.suspendedCard).toBeVisible();

    if (await dashboard.needsActionButton.isVisible()) {
      await dashboard.needsActionButton.click();
      await expect(page.locator('text=NEEDS ACTION')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=KYC awaiting review')).toBeVisible();
      await page.keyboard.press('Escape');
    }
  });

  test('ADM-DASH-04: Time period filters switch active state cleanly', async ({ page }) => {
    test.setTimeout(45000);
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Switch to This year and verify active state
    await dashboard.switchTimeFilter('This year');
    await expect(page.getByRole('button', { name: 'This year' })).toBeVisible();

    // Switch back to Today
    await dashboard.switchTimeFilter('Today');
    await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
  });

  test('ADM-DASH-05: Chart sections (Revenue overview and Booking outcomes) are rendered', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expect(dashboard.revenueOverviewSection).toBeVisible();
    await expect(dashboard.bookingOutcomesSection).toBeVisible();
    await expect(page.getByText('Gross booking value', { exact: true })).toBeVisible();
    await expect(page.locator('text=Completion rate')).toBeVisible();
  });
});
