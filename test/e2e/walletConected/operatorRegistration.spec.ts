import { testWithSynpress, metaMaskFixtures, MetaMask } from '@synthetixio/synpress';

import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import {
	COMMON_TXN_MESSAGES,
	OYSTER_TXN_MESSAGES
} from '../../../src/lib/utils/constants/messages';
import { loginToMetamask } from '../../helpers/metamask';
import { getWalletAddress } from '../../helpers/common';

const test = testWithSynpress(metaMaskFixtures(BasicSetup));

const { expect } = test;
const TEST_CP_URL_1 = process.env.VITE_TEST_CP_URL_1 || '';
const TEST_CP_URL_2 = process.env.VITE_TEST_CP_URL_2 || '';

test('Operator Registation', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const walletAddress = await getWalletAddress(page);
	const shortWalletAddress =
		walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length - 6);

	const hasText = await page.textContent(`text=Hello, ${shortWalletAddress}`);
	expect(hasText).toBeTruthy();

	const [unregisterButton] = await page.$$('button:has-text("UNREGISTER")');
	if (unregisterButton) test.skip();

	const registerButton = page.getByTestId('page-wrapper').locator('label');
	registerButton.isDisabled();

	expect(await registerButton.isDisabled()).toBeFalsy();
	registerButton.click();
	const cpURLInput = page.getByPlaceholder('Paste URL here');
	expect(cpURLInput).toHaveValue('');
	expect(cpURLInput).toBeEnabled();

	await cpURLInput.fill(TEST_CP_URL_1);

	await page.waitForSelector('text=Your control plane URL is loading...');
	await page.waitForSelector('text=Your control plane URL has been added successfully!');

	const modalRegisterButton = page.getByRole('button', { name: 'Register' });

	expect(await modalRegisterButton.isDisabled()).toBeFalsy();
	await modalRegisterButton.click();

	await metamask.confirmTransactionAndWaitForMining();
});

test('Operator Edit', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const walletAddress = await getWalletAddress(page);
	const shortWalletAddress =
		walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length - 6);

	const hasText = await page.textContent(`text=Hello, ${shortWalletAddress}`);
	expect(hasText).toBeTruthy();

	const updateButton = page.getByTestId('page-wrapper').locator('label');
	if (!updateButton) test.skip();

	updateButton.click();
	const cpURLInput = page.getByPlaceholder('Paste updated URL here');
	// await page.getByTestId('container-card-body').getByRole('button').first().click();
	await cpURLInput.fill(TEST_CP_URL_2);

	const errorMessage =
		'Registered CP URL and updated CP URL cannot be the same. Please update the CP URL.';

	const isTEST_CP_URL_2 = await page.getByText(errorMessage).isVisible();

	if (isTEST_CP_URL_2) {
		await cpURLInput.fill(TEST_CP_URL_1);
	}

	await page.waitForSelector('text=Your control plane URL is loading...');
	await page.waitForSelector('text=Your control plane URL has been added successfully!');

	const modalRegisterButton = page.getByRole('button', { name: 'Update' });
	expect(await modalRegisterButton.isDisabled()).toBeFalsy();
	await modalRegisterButton.click();

	await metamask.confirmTransactionAndWaitForMining();

	await page.waitForSelector(
		`text=${COMMON_TXN_MESSAGES.SUCCESS.description} ${OYSTER_TXN_MESSAGES.UPDATE_CP_URL.SUCCESS.description}`
	);
});

test('Operator Unregistration', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const walletAddress = await getWalletAddress(page);
	const shortWalletAddress =
		walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length - 6);

	const hasText = await page.textContent(`text=Hello, ${shortWalletAddress}`);
	expect(hasText).toBeTruthy();

	const [unregisterButton] = await page.$$('button:has-text("UNREGISTER")');
	if (!unregisterButton) test.skip();

	expect(await unregisterButton.isDisabled()).toBeFalsy();
	await unregisterButton.click();
	await metamask.confirmTransactionAndWaitForMining();
	await page.waitForSelector(
		`text=${COMMON_TXN_MESSAGES.SUCCESS.description} ${OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.SUCCESS.description}`
	);
});
