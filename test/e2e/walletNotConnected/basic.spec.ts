import { test, expect } from '@playwright/test';

// test('navigating to /  to /dashboard', async ({ page }) => {
// 	await Promise.all([await page.goto('/'), await page.waitForURL('/dashboard/')]);
// 	const url = page.url();
// 	expect(url.endsWith('/dashboard/')).toBeTruthy();
// });

test('demo', async () => {
	expect(2).toBe(2);
});
