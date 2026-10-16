import { test, expect } from '@playwright/test';
import { AdminLoginPage } from '../../pages/AdminLoginPage.js';

test.describe('Admin Authentication & Route Security (Unauthenticated)', () => {
  test('ADM-AUTH-01: Login page loads with all essential elements', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveTitle(/Gize Admin|Gizie Admin/i);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('ADM-AUTH-02: Submitting empty login form displays validation errors without network requests', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    let networkCallMade = false;
    page.on('request', req => {
      if (req.url().includes('/api/') || req.method() === 'POST') {
        networkCallMade = true;
      }
    });

    await loginPage.submitEmpty();

    await expect(loginPage.emailAlert).toBeVisible();
    await expect(loginPage.passwordAlert).toBeVisible();
    expect(networkCallMade).toBe(false);
  });

  test('ADM-AUTH-03: Submitting invalid email formats displays format validation error', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    const invalidEmails = ['plainaddress', 'missingatsign.com', '@nodomain.com', 'spaces in@address.com'];
    for (const invalidEmail of invalidEmails) {
      await loginPage.emailInput.fill(invalidEmail);
      await loginPage.signInButton.click();
      await expect(loginPage.emailAlert).toBeVisible();
    }
  });

  test('ADM-AUTH-04: Forgot password flow navigation and validation', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);
    await loginPage.goto();

    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/#\/forgot-password/);
    await expect(page.getByRole('heading', { name: /Forgot your password\?/i })).toBeVisible();

    const emailInput = page.getByRole('textbox', { name: /email/i });
    const sendButton = page.getByRole('button', { name: /Send reset link/i });
    const backLink = page.getByRole('link', { name: /Back to sign in/i });

    // Empty validation
    await sendButton.click();
    await expect(page.locator('[role=alert]').filter({ hasText: /valid email/i })).toBeVisible();

    // Return to sign in
    await backLink.click();
    await expect(page).toHaveURL(/#\/login/);
  });

  test('ADM-AUTH-05: Protected routes redirect to login when unauthenticated', async ({ page }) => {
    const protectedRoutes = ['#/dashboard', '#/businesses', '#/kyc', '#/users', '#/platform-fees'];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/#\/login/);
      await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    }
  });
});
