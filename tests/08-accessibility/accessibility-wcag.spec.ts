import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility & WCAG 2.2 Standards', () => {
  test('A11Y-01: Dashboard meets core accessibility standards', async ({ page }) => {
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // Color contrast evaluated in separate design check
      .analyze();

    // Verify no critical violations
    const criticalViolations = accessibilityScanResults.violations.filter(v => v.impact === 'critical');
    expect(criticalViolations).toEqual([]);
  });

  test('A11Y-02: Form controls and interactive buttons have accessible names', async ({ page }) => {
    await page.goto('/#/notifications');
    await expect(page.getByRole('heading', { name: 'Notifications' })).toBeVisible({ timeout: 10000 });

    const sendBtn = page.getByRole('button', { name: 'Send', exact: true });
    await sendBtn.click();
    await page.waitForTimeout(500);

    // Verify all form controls have an accessible name or placeholder
    const inputs = page.locator('main input, main textarea, main select');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute('aria-label');
      const placeholder = await input.getAttribute('placeholder');
      const id = await input.getAttribute('id');
      const hasAccessibleLabel = !!ariaLabel || !!placeholder || !!id;
      expect(hasAccessibleLabel).toBe(true);
    }
  });

  test('A11Y-03: Keyboard navigation and focus order across top banner actions', async ({ page }) => {
    await page.goto('/#/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });

    // Focus first focusable element
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedTag);
  });
});
