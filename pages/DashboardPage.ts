import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class DashboardPage extends AdminBasePage {
  readonly heading: Locator;
  readonly dateIntro: Locator;
  readonly customersCard: Locator;
  readonly businessesCard: Locator;
  readonly bookingsCard: Locator;
  readonly revenueCard: Locator;
  readonly requiresAttentionCard: Locator;
  readonly kycPendingCard: Locator;
  readonly suspendedCard: Locator;
  readonly timeFilterToday: Locator;
  readonly timeFilterWeek: Locator;
  readonly timeFilterMonth: Locator;
  readonly timeFilterYear: Locator;
  readonly revenueOverviewSection: Locator;
  readonly bookingOutcomesSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.dateIntro = page.locator('main').locator('text=/2026/').first();
    this.customersCard = page.locator('main').locator('div').filter({ hasText: /^CUSTOMERS/i }).first();
    this.businessesCard = page.locator('main').locator('div').filter({ hasText: /^BUSINESSES/i }).first();
    this.bookingsCard = page.locator('main').locator('div').filter({ hasText: /^BOOKINGS/i }).first();
    this.revenueCard = page.locator('main').locator('div').filter({ hasText: /^REVENUE/i }).first();
    this.requiresAttentionCard = page.locator('text=Requires attention').locator('..');
    this.kycPendingCard = page.locator('text=KYC pending').locator('..');
    this.suspendedCard = page.locator('text=Suspended').locator('..');

    this.timeFilterToday = page.getByRole('button', { name: 'Today' });
    this.timeFilterWeek = page.getByRole('button', { name: 'This week' });
    this.timeFilterMonth = page.getByRole('button', { name: 'This month' });
    this.timeFilterYear = page.getByRole('button', { name: 'This year' });
    this.revenueOverviewSection = page.locator('text=Revenue overview');
    this.bookingOutcomesSection = page.locator('text=Booking outcomes');
  }

  async goto() {
    await this.page.goto('/#/dashboard');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async verifyDashboardMetricsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.customersCard).toBeVisible();
    await expect(this.businessesCard).toBeVisible();
    await expect(this.bookingsCard).toBeVisible();
    await expect(this.revenueCard).toBeVisible();
  }

  async switchTimeFilter(filter: 'Today' | 'This week' | 'This month' | 'This year') {
    const btn = this.page.getByRole('button', { name: filter });
    await btn.click();
    await this.page.waitForTimeout(300);
  }
}
