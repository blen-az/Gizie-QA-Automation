import { test, expect } from '@playwright/test';
import { BookingsPage } from '../../pages/BookingsPage.js';

test.describe('Admin Module: Bookings (Operations)', () => {
  test('ADM-BKG-01: Bookings table loads with expected columns and active records', async ({ page }) => {
    const bookingsPage = new BookingsPage(page);
    await bookingsPage.goto();

    await expect(bookingsPage.heading).toBeVisible();
    await expect(bookingsPage.refreshButton).toBeVisible();
    await expect(bookingsPage.searchInput).toBeVisible();
    await expect(bookingsPage.table).toBeVisible();

    const headers = page.locator('thead th');
    await expect(headers.filter({ hasText: /BOOKING/i })).toBeVisible();
    await expect(headers.filter({ hasText: /BUSINESS/i })).toBeVisible();
    await expect(headers.filter({ hasText: /WHEN/i })).toBeVisible();
    await expect(headers.filter({ hasText: /AMOUNT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /PAYMENT/i })).toBeVisible();
    await expect(headers.filter({ hasText: /STATUS/i })).toBeVisible();

    await expect(bookingsPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const count = await bookingsPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-BKG-02: Lifecycle status tabs switch booking views', async ({ page }) => {
    const bookingsPage = new BookingsPage(page);
    await bookingsPage.goto();

    await expect(bookingsPage.tabAll).toBeVisible();
    await expect(bookingsPage.tabUpcoming).toBeVisible();
    await expect(bookingsPage.tabCancelled).toBeVisible();

    await bookingsPage.tabUpcoming.click();
    await page.waitForTimeout(400);

    await bookingsPage.tabCancelled.click();
    await page.waitForTimeout(400);

    await bookingsPage.tabAll.click();
    await page.waitForTimeout(400);
    const count = await bookingsPage.tableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('ADM-BKG-03: Search query filters bookings by booking code or customer', async ({ page }) => {
    const bookingsPage = new BookingsPage(page);
    await bookingsPage.goto();

    await expect(bookingsPage.tableRows.first()).toBeVisible({ timeout: 10000 });

    await bookingsPage.search('LYU');
    await page.waitForTimeout(800);
    const filteredCount = await bookingsPage.tableRows.count();
    expect(filteredCount).toBeGreaterThan(0);

    await bookingsPage.search('__NON_EXISTENT_BOOKING_9999__');
    await page.waitForTimeout(800);
    const zeroCount = await bookingsPage.tableRows.count();
    expect(zeroCount).toBe(0);
  });

  test('ADM-BKG-04: Pagination exists and displays current page information', async ({ page }) => {
    const bookingsPage = new BookingsPage(page);
    await bookingsPage.goto();

    await expect(bookingsPage.paginationInfo).toBeVisible();
    const paginationText = await bookingsPage.paginationInfo.textContent();
    expect(paginationText).toMatch(/Page \d+ of \d+/);
  });
});
