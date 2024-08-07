import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */

const baseURL = `http://localhost:5173`;

export default defineConfig({
	testDir: './test/e2e',
	timeout: 60 * 1000,
	/* Run tests in files in parallel */
	fullyParallel: process.env.CI ? true : false,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: 8,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL,
		actionTimeout: 10000,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry'
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				contextOptions: {
					// chromium-specific permissions
					permissions: ['clipboard-read', 'clipboard-write']
				}
			}
		}
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] }
		// }
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'npm run dev',
		url: baseURL,
		reuseExistingServer: !process.env.CI
	}
});
