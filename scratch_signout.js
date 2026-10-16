const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    storageState: path.join(__dirname, '.auth', 'admin.json')
  });
  const page = await context.newPage();
  await page.goto('https://admin.gizie.et/#/dashboard');
  await page.waitForTimeout(2000);

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('dialog', dialog => {
    console.log('DIALOG DETECTED:', dialog.message());
    dialog.accept();
  });

  const signOutBtn = page.getByRole('button', { name: 'Sign out' });
  await signOutBtn.click();
  await page.waitForTimeout(500);

  page.on('request', req => console.log('REQ:', req.method(), req.url()));
  page.on('response', res => console.log('RES:', res.status(), res.url()));

  const confirmBtn = page.getByRole('dialog', { name: 'Sign out?' }).getByRole('button', { name: 'Sign out' });
  await confirmBtn.click();
  await page.waitForTimeout(2000);

  console.log('URL after confirm:', page.url());
  const tokenAfter = await page.evaluate(() => localStorage.getItem('gize.admin.access_token'));
  console.log('Token exists after confirm:', !!tokenAfter);

  console.log('Current URL after click:', page.url());
  const localTokens = await page.evaluate(() => localStorage.getItem('gize.admin.access_token'));
  console.log('Local token exists:', !!localTokens);

  await browser.close();
})();
