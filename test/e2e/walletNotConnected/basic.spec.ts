import { test, expect } from '@playwright/test';

test('navigating to /  to /dashboard', async ({ page }) => {
	await page.goto('/');

	await page.waitForURL('/dashboard/');

	const url = page.url();
	expect(url.endsWith('/dashboard/')).toBeTruthy();
});
