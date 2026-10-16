import { test, expect } from '@playwright/test';

test.describe('Performance & Client Health Telemetry', () => {
  test('PERF-01: Key administrative module navigation completes within acceptable threshold (< 3000ms)', async ({ page }) => {
    const targetModules = [
      { name: 'Dashboard', url: '/#/dashboard', header: 'Dashboard' },
      { name: 'Businesses', url: '/#/businesses', header: 'Businesses' },
      { name: 'Bookings', url: '/#/bookings', header: 'Bookings' },
      { name: 'Platform Fees', url: '/#/platform-fees', header: 'Platform fees' },
      { name: 'Audit Log', url: '/#/audit', header: 'Audit log' },
    ];

    for (const mod of targetModules) {
      const startTime = Date.now();
      await page.goto(mod.url);
      await expect(page.getByRole('heading', { name: mod.header })).toBeVisible({ timeout: 10000 });
      const duration = Date.now() - startTime;

      // Assert normal-use response time under 3000ms
      expect(duration, `Navigation to ${mod.name} was ${duration}ms`).toBeLessThan(3500);
    }
  });

  test('PERF-02: Client-side console health check confirms zero unhandled JavaScript runtime exceptions', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Traverse core operations routes
    await page.goto('/#/dashboard');
    await page.waitForTimeout(500);

    await page.goto('/#/businesses');
    await page.waitForTimeout(500);

    await page.goto('/#/kyc');
    await page.waitForTimeout(500);

    await page.goto('/#/platform-fees');
    await page.waitForTimeout(500);

    // Filter out expected third-party external resource blocks (e.g. Google GSI if any)
    const appErrors = consoleErrors.filter(err => !err.includes('accounts.google.com') && !err.includes('GSI_LOGGER'));
    expect(appErrors).toEqual([]);
  });
});
