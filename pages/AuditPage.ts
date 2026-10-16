import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class AuditPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly categorySelect: Locator;
  readonly statusSelect: Locator;
  readonly actionSearchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly paginationInfo: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Audit log' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.categorySelect = page.locator('select').first();
    this.statusSelect = page.locator('select').nth(1);
    this.actionSearchInput = page.getByPlaceholder('BUSINESS_SUSPEND');
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');
    this.paginationInfo = page.locator('text=/Page \\d+ of \\d+/');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.prevButton = page.getByRole('button', { name: 'Previous' });
  }

  async goto() {
    await this.page.goto('/#/audit');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async filterByCategory(category: string) {
    await this.categorySelect.selectOption({ label: category });
    await this.page.waitForTimeout(600);
  }

  async filterByStatus(status: string) {
    await this.statusSelect.selectOption({ label: status });
    await this.page.waitForTimeout(600);
  }

  async searchAction(action: string) {
    await this.actionSearchInput.fill(action);
    await this.actionSearchInput.press('Enter');
    await this.page.waitForTimeout(800);
  }
}
