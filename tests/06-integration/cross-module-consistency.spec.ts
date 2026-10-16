import { test, expect } from '@playwright/test';

test.describe('Integration & Cross-Module Consistency', () => {
  test('INT-01: Needs Action popover badges match KYC and Withdrawal queue counts', async ({ page }) => {
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    const needsActionButton = page.getByRole('button', { name: /Needs action/i });
    await expect(needsActionButton).toBeVisible();

    let totalNeedsAction = 0;
    await expect(async () => {
      const bannerText = (await needsActionButton.textContent()) || '';
      const ariaLabel = (await needsActionButton.getAttribute('aria-label')) || '';
      const match = (bannerText + ' ' + ariaLabel).match(/(\d+)/);
      totalNeedsAction = match ? parseInt(match[1], 10) : 0;
      expect(totalNeedsAction).toBeGreaterThan(0);
    }).toPass({ timeout: 10000 });

    // Open popover to extract sub-counts
    await needsActionButton.click();
    await page.waitForTimeout(600);

    const kycText = await page.locator('text=/KYC awaiting review/i').locator('..').innerText();
    const kycCountMatch = kycText.match(/(\d+)/);
    const kycCount = kycCountMatch ? parseInt(kycCountMatch[1], 10) : 0;

    const withText = await page.locator('text=/Withdrawals to pay/i').locator('..').innerText();
    const withCountMatch = withText.match(/(\d+)/);
    const withCount = withCountMatch ? parseInt(withCountMatch[1], 10) : 0;

    expect(kycCount + withCount).toBe(totalNeedsAction);

    // Close popover
    await page.keyboard.press('Escape');

    // Verify KYC page reflects the pending count
    await page.goto('/#/kyc');
    await expect(page.getByRole('heading', { name: /KYC/i })).toBeVisible({ timeout: 10000 });
    const kycPendingTab = page.getByRole('button', { name: new RegExp(`^Pending${kycCount}`, 'i') });
    await expect(kycPendingTab).toBeVisible();

    // Verify Withdrawals page reflects the pending count
    await page.goto('/#/withdrawals');
    await expect(page.getByRole('heading', { name: 'Withdrawals' })).toBeVisible({ timeout: 10000 });
    const withPendingTab = page.getByRole('button', { name: new RegExp(`^Pending${withCount}`, 'i') });
    await expect(withPendingTab).toBeVisible();
  });

  test('INT-02: Platform fee calculation model is mathematically consistent', async ({ page }) => {
    await page.goto('/#/platform-fees');
    await expect(page.getByRole('heading', { name: 'Platform fees' })).toBeVisible({ timeout: 10000 });

    const customerFeeText = await page.locator('text=CUSTOMER SERVICE FEE').locator('..').innerText();
    const providerFeeText = await page.locator('text=PROVIDER SERVICE FEE').locator('..').innerText();

    const customerRateMatch = customerFeeText.match(/(\d+)%/);
    const providerRateMatch = providerFeeText.match(/(\d+)%/);

    expect(customerRateMatch).not.toBeNull();
    expect(providerRateMatch).not.toBeNull();

    const customerRate = parseInt(customerRateMatch![1], 10);
    const providerRate = parseInt(providerRateMatch![1], 10);

    const baseBooking = 1000;
    const expectedCustomerPays = baseBooking + (baseBooking * (customerRate / 100));
    const expectedBusinessReceives = baseBooking - (baseBooking * (providerRate / 100));
    const expectedGizieKeeps = (baseBooking * (customerRate / 100)) + (baseBooking * (providerRate / 100));

    await expect(page.locator(`text=${expectedCustomerPays.toLocaleString()} ETB`)).toBeVisible();
    await expect(page.locator(`text=${expectedBusinessReceives.toLocaleString()} ETB`)).toBeVisible();
    await expect(page.locator(`text=${expectedGizieKeeps.toLocaleString()} ETB`)).toBeVisible();
  });

  test('INT-03: Payout banks configured in System match supported withdrawal accounts', async ({ page }) => {
    await page.goto('/#/payout-banks');
    await expect(page.getByRole('heading', { name: 'Payout banks' })).toBeVisible({ timeout: 10000 });

    const banks = ['CBE', 'Awash', 'Dashen', 'Abyssinia', 'Wegagen', 'Telebirr'];
    for (const bank of banks) {
      await expect(page.locator(`text=${bank}`)).toBeVisible();
    }

    await page.goto('/#/withdrawals');
    await expect(page.getByRole('heading', { name: 'Withdrawals' })).toBeVisible({ timeout: 10000 });

    const payToCell = page.locator('tbody tr td').nth(3);
    if (await payToCell.isVisible()) {
      const payToText = await payToCell.innerText();
      const matchesKnownBank = banks.some(bank => payToText.includes(bank) || payToText.includes('Other'));
      expect(matchesKnownBank).toBe(true);
    }
  });

  test('INT-04: Catalog categories match Booking service categories', async ({ page }) => {
    await page.goto('/#/catalog/categories');
    await expect(page.getByRole('heading', { name: 'Catalog' })).toBeVisible({ timeout: 10000 });

    const knownCategories = ['Hair', 'Nails', 'Beauty', 'Spa & massage', 'Barbering', 'Makeup', 'Skincare'];
    for (const cat of knownCategories) {
      await expect(page.getByText(cat, { exact: true })).toBeVisible();
    }

    await page.goto('/#/bookings');
    await expect(page.getByRole('heading', { name: 'Bookings' })).toBeVisible({ timeout: 10000 });

    const firstBooking = page.locator('tbody tr td').first();
    await expect(firstBooking).toBeVisible({ timeout: 10000 });
    const text = await firstBooking.innerText();
    expect(text).toMatch(/Lash Extensions|Hair Cut|Hydrating Facial|Manicure|Facial/i);
  });
});
