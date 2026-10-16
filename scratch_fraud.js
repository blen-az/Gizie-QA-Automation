const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ storageState: path.join(__dirname, '.auth', 'admin.json') });
  const page = await context.newPage();
  await page.goto('https://admin.gizie.et/#/fraud');
  await page.waitForTimeout(2000);

  const select = page.locator('select');
  const options = await select.locator('option').allInnerTexts();
  console.log('Options:', options);

  // Initial count
  const initialCount = await page.locator('tbody tr').count();
  console.log('Initial row count:', initialCount);

  // Select each option and count rows
  for (let i = 0; i < options.length; i++) {
    await select.selectOption({ index: i });
    await page.waitForTimeout(400);
    const count = await page.locator('tbody tr').count();
    console.log(`Option "${options[i]}" row count: ${count}`);
  }

  await browser.close();
})();
