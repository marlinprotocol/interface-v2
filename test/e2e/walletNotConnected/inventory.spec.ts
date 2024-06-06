import { test, expect } from '@playwright/test';

test('show connect wallet and no table', async ({ page }) => {
	await page.goto('http://localhost:5173/oyster/inventory/', { waitUntil: 'domcontentloaded' });
	console.log('name', process.env.PUBLIC_SUBGRAPH_KEY);
	console.log({ name2: process.env.VITE_TEST_CP_URL_2 });
	await page.waitForLoadState();
	const hasHeaderText = await page.textContent('text=My Active Order');

	// Selector that targets any button element
	const connectWalletButtons = await page.$$('button:has-text("Connect Wallet")');

	// Check if there are two "Connect Wallet" buttons
	const hasTwoConnectWalletButtons = connectWalletButtons.length === 2;

	expect(hasHeaderText).toBeTruthy();
	expect(hasTwoConnectWalletButtons).toBeTruthy();
});
