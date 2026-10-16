import { test, expect } from '@playwright/test';

test.describe('Admin Module: Catalog (System)', () => {
  test('ADM-CAT-01: Catalog displays business types and categories tabs', async ({ page }) => {
    await page.goto('/#/catalog');
    await expect(page.getByRole('heading', { name: 'Catalog' })).toBeVisible({ timeout: 10000 });

    const tabTypes = page.getByRole('button', { name: 'Business types' });
    const tabCategories = page.getByRole('button', { name: 'Categories' });

    await expect(tabTypes).toBeVisible();
    await expect(tabCategories).toBeVisible();

    // Verify sub-module navigation to categories
    await tabCategories.click();
    await page.waitForTimeout(600);
    await expect(page).toHaveURL(/#\/catalog\/categories/);

    // Verify known category items are listed with exact text match
    await expect(page.getByText('Hair', { exact: true })).toBeVisible();
    await expect(page.getByText('Nails', { exact: true })).toBeVisible();
  });
});
