import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';

const test = testWithSynpress(BasicSetup, unlockForFixture);
const { expect } = test;

test('connect wallet -> deploy a job -> check if it navigated to inventory', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();

	// sort by rate.
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Select and click the 'DEPLOY' button within the first row
	await page.getByTestId('deploy-table-button-0').click();

	// Make sure the modal opened.
	await page.waitForSelector('text=CREATE ORDER');
	// Wait for the modal to be visible if it is not immediately so
	await page.waitForSelector('.modal-body');

	// Duration
	await page.locator('#pond-input-amount-Duration').first().fill('3');

	// duration in minutes
	await page.locator('#select-duration').first().click();
	await page.getByRole('button', { name: 'Hours' }).click();

	// Bandwidth
	await page.locator('#pond-input-amount-Bandwidth').first().fill('90');

	// Fill the enclave image url.
	await page.locator('#address-display-enclave-image-url').first().fill('https://example.com');

	const approveButton = page.locator('.btn-block').first();
	const text = await approveButton.innerText();
	await approveButton.click();

	if (text === 'Approve') {
		await metamask.notificationPage.approveTokenPermission(extensionId);
		await page.waitForTimeout(5_000);
		await approveButton.click();
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	} else {
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	}

	await page.waitForURL(ROUTES.OYSTER_INVENTORY_URL + '/');
});

test('bandwidth cost should update on duration and bandwidth change', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();

	// sort by rate.
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Select and click the 'DEPLOY' button within the first row
	await page.getByTestId('deploy-table-button-0').click();

	// Make sure the modal opened.
	await page.waitForSelector('text=CREATE ORDER');
	// Wait for the modal to be visible if it is not immediately so
	await page.waitForSelector('.modal-body');

	// Duration
	await page.locator('#pond-input-amount-Duration').first().fill('3');

	// duration in hours
	await page.locator('#select-duration').first().click();
	await page.getByRole('button', { name: 'Hours' }).click();

	// Bandwidth
	await page.locator('#pond-input-amount-Bandwidth').first().fill('90');

	await page.waitForTimeout(500);
	let bandwidthCost = await page.locator('#pond-input-amount-bandwidth-cost').first().inputValue();

	// Change Duration
	await page.locator('#pond-input-amount-Duration').first().fill('5');

	await page.waitForTimeout(500);
	let newBandwidthCost = await page
		.locator('#pond-input-amount-bandwidth-cost')
		.first()
		.inputValue();

	expect(bandwidthCost !== newBandwidthCost).toBeTruthy();

	// Change duration in minutes
	await page.locator('#select-duration').first().click();
	await page.getByRole('button', { name: 'Minutes' }).click();

	bandwidthCost = newBandwidthCost;

	newBandwidthCost = await page.locator('#pond-input-amount-bandwidth-cost').first().inputValue();

	expect(bandwidthCost !== newBandwidthCost).toBeTruthy();
});
