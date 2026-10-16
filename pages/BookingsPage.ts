import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class BookingsPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tabAll: Locator;
  readonly tabUpcoming: Locator;
  readonly tabCompleted: Locator;
  readonly tabCancelled: Locator;
  readonly tabDisputed: Locator;
  readonly tabNoShow: Locator;
  readonly paginationInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Bookings' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.searchInput = page.getByPlaceholder('Search code, customer, business…');
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');

    this.tabAll = page.getByRole('button', { name: /^All\d*/i });
    this.tabUpcoming = page.getByRole('button', { name: /^Upcoming\d*/i });
    this.tabCompleted = page.getByRole('button', { name: /^Completed\d*/i });
    this.tabCancelled = page.getByRole('button', { name: /^Cancelled\d*/i });
    this.tabDisputed = page.getByRole('button', { name: /^Disputed\d*/i });
    this.tabNoShow = page.getByRole('button', { name: /^No-show\d*/i });
    this.paginationInfo = page.locator('text=/Page \\d+ of \\d+/');
  }

  async goto() {
    await this.page.goto('/#/bookings');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(800);
  }
}
