import { test, expect } from '@playwright/test';

test.describe('Admin Module: Booking Rules (System)', () => {
  test('ADM-RULE-01: Booking rules page displays cutoff window and active cancellation policy', async ({ page }) => {
    await page.goto('/#/booking-rules');
    await expect(page.getByRole('heading', { name: 'Booking rules' })).toBeVisible({ timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit cutoff' })).toBeVisible();

    await expect(page.getByText('Days before', { exact: true })).toBeVisible();
    await expect(page.getByText('Hours before', { exact: true })).toBeVisible();
    await expect(page.locator('text=CURRENT RULE')).toBeVisible();
  });
});
