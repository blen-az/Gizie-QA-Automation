import { test, expect } from '@playwright/test';
import { NotificationsPage } from '../../pages/NotificationsPage.js';

test.describe('Admin Module: Notifications (System)', () => {
  test('ADM-NOTIF-01: Notifications page loads with Inbox and Send controls', async ({ page }) => {
    const notifPage = new NotificationsPage(page);
    await notifPage.goto();

    await expect(notifPage.heading).toBeVisible();
    await expect(notifPage.refreshButton).toBeVisible();
    await expect(notifPage.inboxButton).toBeVisible();
    await expect(notifPage.sendButton).toBeVisible();
  });

  test('ADM-NOTIF-02: Broadcast Announcement form opens with all fields', async ({ page }) => {
    const notifPage = new NotificationsPage(page);
    await notifPage.goto();

    await notifPage.openSendBroadcastForm();

    await expect(notifPage.titleInput).toBeVisible();
    await expect(notifPage.messageTextarea).toBeVisible();
    await expect(notifPage.categorySelect).toBeVisible();
    await expect(notifPage.typeInput).toBeVisible();
    await expect(notifPage.audienceSelect).toBeVisible();
    await expect(notifPage.reviewAndSendButton).toBeVisible();
  });

  test('ADM-NOTIF-03: Character length boundaries on notification fields', async ({ page }) => {
    const notifPage = new NotificationsPage(page);
    await notifPage.goto();
    await notifPage.openSendBroadcastForm();

    // Verify maxLength attribute on title input
    const titleMaxLength = await notifPage.titleInput.getAttribute('maxlength');
    expect(Number(titleMaxLength)).toBe(120);

    // Verify maxLength on message textarea
    const msgMaxLength = await notifPage.messageTextarea.getAttribute('maxlength');
    expect(Number(msgMaxLength)).toBe(500);
  });
});
