import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const ADMIN_AUTH_FILE = path.join(__dirname, '.auth', 'admin.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1, // Sequential execution for safety against live environment
  timeout: 30000,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],
  use: {
    baseURL: 'https://admin.gizie.et',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    channel: 'chrome', // Use Google Chrome on the host
  },
  projects: [
    {
      name: 'public-auth',
      testDir: './tests/01-auth',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'admin-authenticated',
      testIgnore: ['**/01-auth/**'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: ADMIN_AUTH_FILE,
      },
    },
  ],
});
