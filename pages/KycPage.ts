import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class KycPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tabAll: Locator;
  readonly tabPending: Locator;
  readonly tabApproved: Locator;
  readonly tabRejected: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /KYC \/ Verification/i });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.searchInput = page.getByPlaceholder('Search businesses');
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');

    this.tabAll = page.getByRole('button', { name: /^All\d*/i });
    this.tabPending = page.getByRole('button', { name: /^Pending\d*/i });
    this.tabApproved = page.getByRole('button', { name: /^Approved\d*/i });
    this.tabRejected = page.getByRole('button', { name: /^Rejected\d*/i });
  }

  async goto() {
    await this.page.goto('/#/kyc');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(500);
  }
}
