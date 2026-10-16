import { Page, Locator, expect } from '@playwright/test';

export class AdminBasePage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly logo: Locator;
  readonly collapseSidebarButton: Locator;
  readonly banner: Locator;
  readonly needsActionButton: Locator;
  readonly topNotificationsButton: Locator;
  readonly topAuditLogLink: Locator;
  readonly signOutButton: Locator;
  readonly userAccountDisplay: Locator;

  // Sidebar navigation links
  readonly navDashboard: Locator;
  readonly navBusinesses: Locator;
  readonly navSuspensionAppeals: Locator;
  readonly navKyc: Locator;
  readonly navBranchKyc: Locator;
  readonly navBookings: Locator;
  readonly navWithdrawals: Locator;
  readonly navClients: Locator;
  readonly navReviewReports: Locator;
  readonly navAccountDeletions: Locator;
  readonly navFraudAlerts: Locator;
  readonly navUsersRoles: Locator;
  readonly navNotifications: Locator;
  readonly navPlatformFees: Locator;
  readonly navBookingRules: Locator;
  readonly navPayoutBanks: Locator;
  readonly navCatalog: Locator;
  readonly navTerms: Locator;
  readonly navAuditLog: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('complementary, nav');
    this.logo = page.getByRole('link', { name: 'Gizie Admin' });
    this.collapseSidebarButton = page.getByRole('button', { name: 'Collapse sidebar' });
    this.banner = page.locator('banner, header');
    this.needsActionButton = page.getByRole('button', { name: /Needs action/i });
    this.topNotificationsButton = page.locator('header button, [role=banner] button').filter({ hasText: /notification/i });
    this.topAuditLogLink = page.locator('header a, [role=banner] a').filter({ hasText: /audit log/i });
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
    this.userAccountDisplay = page.locator('text=admin@gize.com');

    // Navigation links
    this.navDashboard = page.getByRole('link', { name: 'Dashboard' });
    this.navBusinesses = page.getByRole('link', { name: 'Businesses' });
    this.navSuspensionAppeals = page.getByRole('link', { name: 'Suspension appeals' });
    this.navKyc = page.getByRole('link', { name: /KYC \/ Verification/i });
    this.navBranchKyc = page.getByRole('link', { name: 'Branch KYC' });
    this.navBookings = page.getByRole('link', { name: 'Bookings' });
    this.navWithdrawals = page.getByRole('link', { name: /Withdrawals/i });
    this.navClients = page.getByRole('link', { name: 'Clients' });
    this.navReviewReports = page.getByRole('link', { name: 'Review moderation' });
    this.navAccountDeletions = page.getByRole('link', { name: 'Account deletions' });
    this.navFraudAlerts = page.getByRole('link', { name: 'Fraud alerts' });
    this.navUsersRoles = page.getByRole('link', { name: 'Users & roles' });
    this.navNotifications = page.getByRole('link', { name: 'Notifications' });
    this.navPlatformFees = page.getByRole('link', { name: 'Platform fees' });
    this.navBookingRules = page.getByRole('link', { name: 'Booking rules' });
    this.navPayoutBanks = page.getByRole('link', { name: 'Payout banks' });
    this.navCatalog = page.getByRole('link', { name: 'Catalog' });
    this.navTerms = page.getByRole('link', { name: 'Terms & conditions' });
    this.navAuditLog = page.getByRole('link', { name: 'Audit log' }).first();
  }

  async verifyShellLoaded() {
    await expect(this.logo).toBeVisible({ timeout: 10000 });
    await expect(this.signOutButton).toBeVisible();
    await expect(this.navDashboard).toBeVisible();
  }
}
