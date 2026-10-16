import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class PlatformFeesPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly editRatesButton: Locator;
  readonly customerServiceFeeCard: Locator;
  readonly providerServiceFeeCard: Locator;
  readonly breakdownSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Platform fees' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.editRatesButton = page.getByRole('button', { name: 'Edit rates' });
    this.customerServiceFeeCard = page.locator('text=CUSTOMER SERVICE FEE').locator('..');
    this.providerServiceFeeCard = page.locator('text=PROVIDER SERVICE FEE').locator('..');
    this.breakdownSection = page.locator('text=On a 1,000 ETB booking');
  }

  async goto() {
    await this.page.goto('/#/platform-fees');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }
}
