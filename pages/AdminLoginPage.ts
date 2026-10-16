import { Page, Locator, expect } from '@playwright/test';

export class AdminLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;
  readonly heading: Locator;
  readonly emailAlert: Locator;
  readonly passwordAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign in' });
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember my email/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.emailAlert = page.locator('[role=alert]').filter({ hasText: /valid email/i });
    this.passwordAlert = page.locator('[role=alert]').filter({ hasText: /password is required/i });
  }

  async goto() {
    await this.page.goto('/#/login');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async submitEmpty() {
    await this.signInButton.click();
  }

  async fillCredentials(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
  }
}
