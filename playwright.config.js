// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: 'html',
  timeout: 30 * 1000, // 30 seconds
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});

