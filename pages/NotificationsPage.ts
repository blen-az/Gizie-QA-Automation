import { Page, Locator, expect } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage.js';

export class NotificationsPage extends AdminBasePage {
  readonly heading: Locator;
  readonly refreshButton: Locator;
  readonly inboxButton: Locator;
  readonly sendButton: Locator;
  readonly markAllReadButton: Locator;

  // Broadcast form locators
  readonly titleInput: Locator;
  readonly messageTextarea: Locator;
  readonly categorySelect: Locator;
  readonly typeInput: Locator;
  readonly audienceSelect: Locator;
  readonly reviewAndSendButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Notifications' });
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.inboxButton = page.getByRole('button', { name: 'Inbox' });
    this.sendButton = page.getByRole('button', { name: 'Send', exact: true });
    this.markAllReadButton = page.getByRole('button', { name: /Mark all read/i });

    // Broadcast form
    this.titleInput = page.getByPlaceholder('System maintenance tonight');
    this.messageTextarea = page.getByPlaceholder('Gizie will be unavailable from 1–2 AM.');
    this.categorySelect = page.locator('select').first();
    this.typeInput = page.getByPlaceholder('maintenance_notice');
    this.audienceSelect = page.locator('select').nth(1);
    this.reviewAndSendButton = page.getByRole('button', { name: /Review & send/i });
  }

  async goto() {
    await this.page.goto('/#/notifications');
    await expect(this.heading).toBeVisible({ timeout: 10000 });
  }

  async openSendBroadcastForm() {
    await this.sendButton.click();
    await expect(this.titleInput).toBeVisible({ timeout: 5000 });
  }
}
