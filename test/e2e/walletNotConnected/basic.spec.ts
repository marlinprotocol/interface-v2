import { test, expect } from '@playwright/test';

test('navigating to / redirects to /relay/receiver/staking', async ({ page }) => {
	await page.goto('/');

	await page.waitForURL('/relay/receiver/staking/');

	const url = page.url();
	expect(url.endsWith('/relay/receiver/staking/')).toBeTruthy();
});
