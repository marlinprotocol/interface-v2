import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
// import ConnectedSetup from '../../wallet-setup/connected.setup'
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import { MESSAGES } from '../../../src/lib/utils/constants/messages';
import {
	extractBalanceColumnData,
	extractHourlyRateColumnData,
	extractRegionColumnData,
	isSortedNumerically
} from '../../helpers/marketplace';
import { findSmallerNumber, isSortedAlphabetically } from '../../helpers/common';

// const test = testWithSynpress(ConnectedSetup, unlockForFixture)
const test = testWithSynpress(BasicSetup, unlockForFixture);
const { expect } = test;

test('Copy Enclave Image URL', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
		if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
			await expandRowToggleButton.click();
			await page.locator('text=DETAILS').first().click();
			await page.waitForSelector('text=ORDER DETAILS');
			await page.getByTestId('enclave-image-url').getByAltText('Copy').first().click();
			await page.waitForSelector('text=Enclave Image URL copied to clipboard');
		}
	} else {
		test.skip();
	}
});

test('Initiate Stop', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
		if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
			await expandRowToggleButton.click();
			await page.locator('text=INITIATE STOP').first().click();
			await page.waitForSelector('text=INITIATE STOP');
			await page.locator('text=INITIATE STOP').click();
			await metamask.confirmTransactionAndWaitForMining();
			await page.waitForSelector(
				`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED}`
			);
		}
	} else {
		test.skip();
	}
});

test('Copy Operator Address', async ({ page, context, metamaskPage, extensionId }) => {
	// Grant permissions for clipboard-read
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);

	await page.goto('/oyster/inventory/', { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const firstRowSelector = 'tbody tr:first-child';
	await page.hover(firstRowSelector);

	const copyButtonSelector = 'tbody tr:first-child button img[alt="Copy"]';
	await page.click(copyButtonSelector);

	const addressSelector = 'tbody tr:first-child .text-grey.text-xs.font-normal';

	// Get the text content from the element
	const address = await page.textContent(addressSelector);

	const expectedAddressArray = (address || '').split('.');
	const expectedAddressStart = expectedAddressArray[0];
	const expectedAddressEnd = expectedAddressArray[expectedAddressArray.length - 1];

	// Read the clipboard content
	const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
	await page.waitForSelector('text=Address copied to clipboard');

	// Check if the clipboard content matches the expected data
	expect(clipboardContent.startsWith(expectedAddressStart)).toBeTruthy();
	expect(clipboardContent.endsWith(expectedAddressEnd)).toBeTruthy();
});

// test('Add Funds To The Job', async ({ page, context, metamaskPage, extensionId }) => {
//     // Grant permissions for clipboard-read
//     await context.grantPermissions(['clipboard-read', 'clipboard-write']);

//     await page.goto('/oyster/inventory/', { waitUntil: 'networkidle' });

//     const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
//     await loginToMetamask(metamask, page);

//     const rows = await page.$$eval('tbody tr', rows => rows);
//     if (!(rows.length > 0)) test.skip();

//     const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
//     if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
//         await expandRowToggleButton.click();
//         await page.locator('text=ADD FUNDS').first().click();
//         await page.waitForSelector('text=Add funds by approving and depositing tokens for the job');

//         await page.locator('div:nth-child(2) > div:nth-child(2) > #pond-input-amount').first().fill('1')
//         await page.getByText('Days').first().click();
//         await page.getByRole('button', { name: 'Minutes' }).click();

//         // const buttonLabel = await page.locator('.modal-footer > .btn-block').first().innerText();
//         // if(buttonLabel === 'CONFIRM') {}
//         await page.locator('text=APPROVE').first().click();
//         await metamask.approveTokenPermission();
//         await page.waitForTimeout(5000)
//         await page.waitForSelector('text=CONFIRM');
//         // const buttonLabel1 = await page.locator('.modal-footer > .btn-block').first().innerText();
//         // console.log({ buttonLabel1 })
//         await page.locator('.modal-footer > .btn-block').first().click();
//         await page.waitForTimeout(5000)
//         await metamask.confirmTransactionAndWaitForMining();

//         await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED}`)
//     }

// });

test('Sorting by Balance', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const balanceHeader = page.locator('th:has-text("BALANCE")');
		await balanceHeader.click();
		const dataAfterSorting = await extractBalanceColumnData(page);
		console.log(dataAfterSorting);
		expect(isSortedNumerically(dataAfterSorting)).toBeTruthy();
	} else {
		test.skip();
	}
});

test('Sorting by Region', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const balanceHeader = page.locator('th:has-text("BALANCE")');
		await balanceHeader.click();
		const dataAfterSorting = await extractRegionColumnData(page);
		expect(isSortedAlphabetically(dataAfterSorting)).toBeTruthy();
	} else {
		test.skip();
	}
});

test('Sorting by Hourly Rate', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const hourlyRateHeader = page.locator('th:has-text("HOURLY RATE")');
		await hourlyRateHeader.click();
		const dataAfterSorting = await extractHourlyRateColumnData(page);
		console.log(dataAfterSorting);
		expect(isSortedNumerically(dataAfterSorting)).toBeTruthy();
	} else {
		test.skip();
	}
});

test('Withdraw funds more than available balance should not be allowed', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const maxAvailableBalance = await page.$eval('tbody tr.main-row:first-child', (row) => {
		const balanceCell = row.querySelector('td:nth-of-type(6)');
		console.log(balanceCell?.textContent?.trim().replace('$', '').replace(',', ''));
		return balanceCell
			? parseFloat(balanceCell.textContent?.trim().replace('$', '').replace(/,/g, '') || '')
			: 0;
	});
	console.log({ maxAvailableBalance });

	const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
	if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
		await expandRowToggleButton.click();

		await page.locator('text=WITHDRAW').first().click();
		await page.waitForSelector(`text=Enter the amount you'd like to withdraw from this job.`);
		await page
			.locator('form')
			.filter({ hasText: `Amount MAX Available balance:` })
			.first()
			.getByPlaceholder('0.00')
			.fill(`${maxAvailableBalance + 1}`);
		await page.waitForSelector('text=Insufficient balance');
	}
});

test('Withdraw funds less than available balance should be allowed', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const durationHeader = page.locator('th:has-text("DURATION LEFT")');

	// to make sure its sorted. ascending.
	await durationHeader.click();
	await durationHeader.click();
	await durationHeader.click();

	const durationStrings = await page.$$eval('tbody tr.main-row', (rows) => {
		return rows.map((row) => {
			const durationCell = row.querySelector('td:nth-of-type(7)');
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
		await expandRowToggleButton.click();

		const withDrawButton = page.locator('text=WITHDRAW').first();
		const modalId = await withDrawButton.getAttribute('for');

		const withdrawButtonText = 'WITHDRAW';

		await page.locator('text=WITHDRAW').first().click();
		const availableBalanceText = await page
			.locator('form')
			.filter({ hasText: `Amount MAX Available balance:` })
			.first()
			.innerText();
		const balanceRegex = /([\d]+\.[\d]+)/;
		const matches = balanceRegex.exec(availableBalanceText);
		const availableAmount = matches ? parseFloat(matches[1]) : 0;

		if (availableAmount === 0.0 || availableAmount === 0) {
			console.log('no amount to withdraw.');
			test.skip();
		}

		await page.waitForSelector(`text=Enter the amount you'd like to withdraw from this job.`);
		await page
			.locator('form')
			.filter({ hasText: `Amount MAX Available balance:` })
			.first()
			.getByPlaceholder('0.00')
			.fill(`${findSmallerNumber(availableAmount)}`);

		// Find the button with the text "WITHDRAW" within the modal
		const withdrawButtonSelector = `#${modalId} + div >> text="${withdrawButtonText}"`;
		const withdrawButton = await page.$(withdrawButtonSelector);

		// Perform an action on the button, such as clicking it
		await withdrawButton?.click();
		await metamask.confirmTransactionAndWaitForMining();
		await page.waitForSelector(
			`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWN}`
		);
	}
});
