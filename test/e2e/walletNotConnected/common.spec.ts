import { test, expect } from '@playwright/test';
import { ROUTES } from '../../../src/lib/utils/constants/urls';

// const test = testWithSynpress(BasicSetup, unlockForFixture);
// const { expect } = test;

test('Empty State Interactions should work', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	await page.waitForSelector(
		'text=Switch to the appropriate network and connect your wallet to get started'
	);

	const networkPrompt = page.locator('#network-prompt');

	const connectWalletBtnInside = await networkPrompt.getByText('Connect Wallet').isVisible();

	expect(connectWalletBtnInside).toBeTruthy();

	// Check Chain Switch Dropdown
	const switchDropdown = await page.$('.menu.dropdown-content');
	expect(switchDropdown).toBe(null);
	await page.locator('#header-chain-switcher-dropdown').first().click();
	const switchDropdownOpen = await page.$('.menu.dropdown-content');
	expect(switchDropdownOpen).toBeTruthy();
	await page.locator('#header-chain-switcher-dropdown').first().click();

	// Check Prompt Chain Switch Dropdown
	const promptSwitchDropdown = await page.$('.menu.dropdown-content');
	expect(promptSwitchDropdown).toBe(null);
	await page.locator('#oyster-table-column-chain-switcher-dropdown').first().click();
	const promptSwitchDropdownOpen = await page.$('.menu.dropdown-content');
	expect(promptSwitchDropdownOpen).toBeTruthy();
	await page.locator('#oyster-table-column-chain-switcher-dropdown').first().click();
});
