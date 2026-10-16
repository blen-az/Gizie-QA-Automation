import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class BusinessesPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tabAll: Locator;
  readonly tabPending: Locator;
  readonly tabVerified: Locator;
  readonly tabActive: Locator;
  readonly tabSuspended: Locator;
  readonly tabRejected: Locator;
  readonly paginationInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Businesses' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.searchInput = page.getByPlaceholder('Search name, city, owner, phone…');
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');

    this.tabAll = page.getByRole('button', { name: /^All\d*/i });
    this.tabPending = page.getByRole('button', { name: /Pending verification/i });
    this.tabVerified = page.getByRole('button', { name: /^Verified\d*/i });
    this.tabActive = page.getByRole('button', { name: /^Active\d*/i });
    this.tabSuspended = page.getByRole('button', { name: /^Suspended\d*/i });
    this.tabRejected = page.getByRole('button', { name: /^Rejected\d*/i });
    this.paginationInfo = page.locator('text=/Page \\d+ of \\d+/');
  }

  async goto() {
    await this.page.goto('/#/businesses');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(500); // debounce
  }

  async clearSearch() {
    await this.searchInput.fill('');
    await this.page.waitForTimeout(500);
  }
}
