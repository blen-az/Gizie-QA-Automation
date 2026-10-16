const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ storageState: path.join(__dirname, '.auth', 'admin.json') });
  const page = await context.newPage();
  await page.goto('https://admin.gizie.et/#/withdrawals');
  await page.waitForTimeout(2000);

  const tabPending = page.getByRole('button', { name: /^Pending/i });
  await tabPending.click();
  await page.waitForTimeout(500);
  const pendingCount = await page.locator('tbody tr').count();
  console.log('Pending count:', pendingCount);

  const tabPaid = page.getByRole('button', { name: /^Paid/i });
  await tabPaid.click();
  await page.waitForTimeout(500);
  const paidCount = await page.locator('tbody tr').count();
  const mainText = await page.locator('main').innerText();
  const hasEmpty = mainText.includes('No withdrawals') || mainText.includes('Nothing to action');
  console.log('Paid count:', paidCount, 'Has empty:', hasEmpty);

  const tabAll = page.getByRole('button', { name: /^All/i });
  await tabAll.click();
  await page.waitForTimeout(500);
  const allCount = await page.locator('tbody tr').count();
  console.log('All count:', allCount);

  await browser.close();
})();
