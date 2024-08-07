import { testWithSynpress, metaMaskFixtures, MetaMask } from '@synthetixio/synpress';

import BasicSetup from '../../wallet-setup/basic.setup';
import {
	COMMON_TXN_MESSAGES,
	OYSTER_CREDIT_TXN_MESSAGES
} from '../../../src/lib/utils/constants/messages';
import { loginToMetamask } from '../../helpers/metamask';
import { goToMarketPlaceAndFetchCredits } from '../../helpers/credits';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { getJobID } from '../../helpers/inventory';
import { marketPlaceAndFilterAndSortByRate } from '../../helpers/marketplace';

const test = testWithSynpress(metaMaskFixtures(BasicSetup));

const { expect } = test;

test('Able Get Credits Balance', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);
	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();

	const walletBalance = await goToMarketPlaceAndFetchCredits(page);
	expect(walletBalance).not.toBeLessThan(1);
});

test('Deploy a job using credits', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);
	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();

	await marketPlaceAndFilterAndSortByRate(page);

	// Select and click the 'DEPLOY' button within the first row
	await page.locator('tbody tr:first-child td:nth-of-type(8)').click();

	// Make sure the modal opened.
	await page.waitForSelector('text=CREATE ORDER');
	// Wait for the modal to be visible if it is not immediately so
	await page.waitForSelector('.modal-body');

	// Duration
	await page.locator('#pond-input-amount-Duration').first().fill('1');

	// duration in hours
	await page.locator('#select-duration').first().click();
	await page.getByRole('button', { name: 'Hours' }).click();

	// Bandwidth
	await page.locator('#pond-input-amount-Bandwidth').first().fill('9');

	// Fill the enclave image url.
	await page.locator('#address-display-enclave-image-url').first().fill('https://example.com');

	await page.locator('.checkbox-primary').first().click();

	const walletBalance = await page.locator('#wallet-credits').first().innerHTML();
	let walletBalanceInNumber = 0;
	// Extract the number string
	const match = walletBalance.match(/(\d+\.\d+)/);
	walletBalanceInNumber = match ? parseFloat(match[0]) : 0;
	console.log({ walletBalanceInNumber });

	const approveButton = page.locator('.btn-block').first();
	const text = await approveButton.innerText();
	await approveButton.click();

	if (text === 'Approve') {
		await metamask.notificationPage.approveTokenPermission(extensionId);
		await page.waitForTimeout(5_000);
		await approveButton.click();
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
		await page.waitForURL(ROUTES.OYSTER_INVENTORY_URL + '/', { waitUntil: 'networkidle' });
		const walletBalance = await goToMarketPlaceAndFetchCredits(page);
		expect(walletBalance).toBeLessThan(walletBalanceInNumber);
	} else {
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
		await page.waitForURL(ROUTES.OYSTER_INVENTORY_URL + '/', { waitUntil: 'networkidle' });
		await page.reload();
		await page.waitForTimeout(5_000);
		const walletBalance = await goToMarketPlaceAndFetchCredits(page);
		console.log({ walletBalance });
		expect(walletBalance).toBeLessThan(walletBalanceInNumber);
	}
});

test('Add funds to job using credits.', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const creditsBalance = await goToMarketPlaceAndFetchCredits(page);
	if (creditsBalance < 5) {
		console.log('not enough credits.');
		test.skip();
	}

	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const durationHeader = page.locator('th:has-text("DURATION LEFT")');
	await durationHeader.click();

	const durationStrings = await page.$$eval('tbody tr:first-child', (rows) => {
		return rows.map((row) => {
			const durationCell = row.querySelector('td:nth-of-type(4)');
			return durationCell ? durationCell.textContent?.trim() : '';
		});
	});

	const durations = durationStrings
		.map((timeString) => {
			const matches = timeString?.match(/\d+/g); // matches array of strings with digits
			return matches ? matches.map(Number) : []; // convert to numbers, return empty array if no matches
		})
		.flat();

	const includesNon100 = durations.some((number) => number !== 100);
	if (!includesNon100) {
		console.log('no entries with valid duration');
		return test.skip();
	}

	const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
	if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
		const jobId = await getJobID(context, page);

		const approveId = `#job-add-funds-modal-${jobId}-add-funds-approve-btn`;
		const confirmId = `#job-add-funds-modal-${jobId}-add-funds-confirm-btn`;

		await expandRowToggleButton.click();
		await page.locator('text=ADD FUNDS').first().click();
		await page.waitForTimeout(1000);

		await page.locator('#pond-input-amount-Duration').first().fill('10');

		await page.getByText('Days').first().click();
		await page.getByRole('button', { name: 'Minutes' }).click();

		await page.waitForTimeout(1000);

		const approveButton = await page.$(approveId);

		if (approveButton) {
			await approveButton.click();
			await metamask.notificationPage.approveTokenPermission(extensionId);
			await page.waitForTimeout(5000);
			const confirmButton = await page.$(confirmId);
			if (confirmButton) {
				await confirmButton.click();
				await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
			}
		} else {
			const confirmButton = await page.$(confirmId);
			if (confirmButton) {
				await confirmButton.click();
				await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
			}
		}

		await page.waitForSelector(
			`text=${COMMON_TXN_MESSAGES.SUCCESS.description} ${OYSTER_CREDIT_TXN_MESSAGES.ADD_CREDITS_JOB.SUCCESS.description}`
		);

		await page.waitForTimeout(10_000);

		const latestCreditsBalance = await goToMarketPlaceAndFetchCredits(page);
		console.log({ latestCreditsBalance, creditsBalance });
		expect(latestCreditsBalance).toBeLessThan(creditsBalance);
	}
});
