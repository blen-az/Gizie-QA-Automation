const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ storageState: path.join(__dirname, '.auth', 'admin.json') });
  const page = await context.newPage();
  await page.goto('https://admin.gizie.et/#/branch-kyc');
  await page.waitForTimeout(2000);

  console.log('Heading:', await page.locator('h1').innerText());
  console.log('Table visible:', await page.locator('table').isVisible());
  console.log('Table text:', await page.locator('table').innerText().catch(() => 'no table'));
  console.log('Main text:', await page.locator('main').innerText());

  await browser.close();
})();
