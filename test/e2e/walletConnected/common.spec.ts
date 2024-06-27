import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';

const test = testWithSynpress(BasicSetup, unlockForFixture);
const { expect } = test;

test('Check Logout', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	// const connect = await page.waitForSelector('label[for="disconnect-wallet-modal"]');

	// await connect.click();

	// await page.getByText('LOGOUT').click();

	// const isConnectWallet = await page.getByText('Connect Wallet').isVisible();

	// expect(isConnectWallet).toBeTruthy();
});

test('check for Linea Unsupported network in Bridge', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	// change chain to linea
	await page.locator('#chain-dropdown').first().click();
	await page.getByRole('button', { name: 'Linea Goerli' }).click();

	await metamask.notificationPage.approveSwitchNetwork(extensionId);

	await page.waitForTimeout(2000);

	await page.goto(ROUTES.BRIDGE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(2000);

	await page.waitForSelector('text=Unsupported Network');
	await page.waitForSelector('text=Please switch to one of the chains in the dropdown to continue');

	// Check Chain Switch Dropdown
	const switchDropdown = await page.$('.menu.dropdown-content');
	expect(switchDropdown).toBe(null);
	await page.locator('#chain-dropdown').first().click();
	const switchDropdownOpen = await page.$('.menu.dropdown-content');
	expect(switchDropdownOpen).toBeTruthy();
	await page.locator('#chain-dropdown').first().click();

	// Check Prompt Chain Switch Dropdown
	const promptSwitchDropdown = await page.$('.menu.dropdown-content');
	expect(promptSwitchDropdown).toBe(null);
	await page.locator('#network-prompt-chain-switcher-drop-down').first().click();
	const promptSwitchDropdownOpen = await page.$('.menu.dropdown-content');
	expect(promptSwitchDropdownOpen).toBeTruthy();
	await page.locator('#network-prompt-chain-switcher-drop-down').first().click();
});
