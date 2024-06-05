import { test, expect } from '@playwright/test';

test('navigating to /  to /dashboard', async ({ page }) => {
	await Promise.all([
		await page.goto('/', { waitUntil: 'load' }),
		await page.waitForURL('/dashboard/')
	]);
	const url = page.url();
	expect(url.endsWith('/dashboard/')).toBeTruthy();
});
