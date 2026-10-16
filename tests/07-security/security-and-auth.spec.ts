import { test, expect } from '@playwright/test';

test.describe('Security & Session Integrity', () => {
  test('SEC-01: Admin accounts are protected from suspension and deletion', async ({ page }) => {
    await page.goto('/#/users');
    await expect(page.getByRole('heading', { name: 'Users & roles' })).toBeVisible({ timeout: 10000 });

    // Verify explicit policy copy in UI
    await expect(page.locator('text=Admin accounts are protected — they can\'t be suspended, banned or deleted.')).toBeVisible();

    // Verify current admin user row has no 'Suspend' or 'Delete' button
    const adminRow = page.locator('tbody tr').filter({ hasText: 'admin@gize.com' });
    await expect(adminRow).toBeVisible();
    await expect(adminRow.getByRole('button', { name: /delete/i })).toHaveCount(0);
    await expect(adminRow.getByRole('button', { name: /suspend/i })).toHaveCount(0);
  });

  test('SEC-02: Authentication tokens in localStorage conform to valid JWT structure', async ({ page }) => {
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    const tokens = await page.evaluate(() => {
      const access = localStorage.getItem('gize.admin.access_token');
      const refresh = localStorage.getItem('gize.admin.refresh_token');
      const user = localStorage.getItem('gize.admin.user');
      return {
        hasAccess: !!access,
        hasRefresh: !!refresh,
        hasUser: !!user,
        accessParts: access ? access.split('.').length : 0,
        refreshParts: refresh ? refresh.split('.').length : 0,
      };
    });

    expect(tokens.hasAccess).toBe(true);
    expect(tokens.hasRefresh).toBe(true);
    expect(tokens.hasUser).toBe(true);
    // Standard JWT has exactly 3 base64 parts (header.payload.signature)
    expect(tokens.accessParts).toBe(3);
    expect(tokens.refreshParts).toBe(3);
  });

  test('SEC-03: Sign out confirmation modal protects against accidental session termination', async ({ page }) => {
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    const signOutBtn = page.getByRole('button', { name: 'Sign out' });
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // Verify confirmation modal opens with explicit warning copy
    const dialog = page.getByRole('dialog', { name: 'Sign out?' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("You're signed in as admin@gize.com.")).toBeVisible();
    await expect(dialog.getByText(/Your session ends on this device/i)).toBeVisible();

    // Verify Cancel button dismisses modal and keeps authenticated session intact
    const cancelBtn = dialog.getByRole('button', { name: 'Cancel' });
    await cancelBtn.click();
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/#\/dashboard/);

    // Verify session token remains intact
    const tokenExists = await page.evaluate(() => !!localStorage.getItem('gize.admin.access_token'));
    expect(tokenExists).toBe(true);
  });

  test('SEC-04: XSS payloads in search inputs are sanitized and do not execute script', async ({ page }) => {
    await page.goto('/#/clients');
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible({ timeout: 10000 });

    let dialogFired = false;
    page.on('dialog', async dialog => {
      dialogFired = true;
      await dialog.dismiss();
    });

    const xssPayload = '<img src="x" onerror="alert(\'XSS\')">';
    const searchInput = page.getByPlaceholder('Search name, email or phone…');
    await searchInput.fill(xssPayload);
    await page.waitForTimeout(600);

    expect(dialogFired).toBe(false);
    // Ensure no alert dialog or unescaped img tags inserted in DOM
    const rawInjectedImg = await page.locator('img[src="x"]').count();
    expect(rawInjectedImg).toBe(0);
  });
});
