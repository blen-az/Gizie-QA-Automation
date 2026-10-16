import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class FraudPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly severitySelect: Locator;
  readonly tabOpen: Locator;
  readonly tabReviewed: Locator;
  readonly tabDismissed: Locator;
  readonly tabAll: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Fraud alerts' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.severitySelect = page.locator('select');
    this.tabOpen = page.getByRole('button', { name: /^Open/i });
    this.tabReviewed = page.getByRole('button', { name: /^Reviewed/i });
    this.tabDismissed = page.getByRole('button', { name: /^Dismissed/i });
    this.tabAll = page.getByRole('button', { name: /^All/i });
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');
  }

  async goto() {
    await this.page.goto('/#/fraud');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async filterBySeverity(severity: string) {
    await this.severitySelect.selectOption({ label: severity });
    await this.page.waitForTimeout(500);
  }
}
