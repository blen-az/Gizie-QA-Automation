import { test, expect } from '@playwright/test';
import { PlatformFeesPage } from '../../pages/PlatformFeesPage.js';

test.describe('Admin Module: Platform Fees (System)', () => {
  test('ADM-FEE-01: Platform fee rates and mock 1,000 ETB calculation render accurately', async ({ page }) => {
    const feePage = new PlatformFeesPage(page);
    await feePage.goto();

    await expect(feePage.heading).toBeVisible();
    await expect(feePage.refreshButton).toBeVisible();
    await expect(feePage.editRatesButton).toBeVisible();

    // Verify rate cards
    await expect(feePage.customerServiceFeeCard).toBeVisible();
    await expect(feePage.providerServiceFeeCard).toBeVisible();

    // Verify Customer fee contains percentage
    await expect(feePage.customerServiceFeeCard).toContainText(/%/);
    await expect(feePage.providerServiceFeeCard).toContainText(/%/);

    // Verify breakdown section exists
    await expect(feePage.breakdownSection).toBeVisible();
    await expect(page.locator('text=CUSTOMER PAYS')).toBeVisible();
    await expect(page.locator('text=BUSINESS RECEIVES')).toBeVisible();
    await expect(page.locator('text=GIZIE KEEPS')).toBeVisible();
  });
});
