import { testWithSynpress, metaMaskFixtures, MetaMask } from '@synthetixio/synpress';

import BasicSetup from '../../wallet-setup/basic.setup';
import { ROUTES } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import {
	COMMON_TXN_MESSAGES,
	OYSTER_CREDIT_TXN_MESSAGES,
	OYSTER_TXN_MESSAGES
} from '../../../src/lib/utils/constants/messages';
import { extractBalanceColumnData, isSortedNumerically } from '../../helpers/marketplace';

const test = testWithSynpress(metaMaskFixtures(BasicSetup));

const { expect } = test;

test('Copy Enclave Image URL', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	// Wait for table data to get fetched
	await page.waitForSelector('text=DURATION LEFT');

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
				`text=${COMMON_TXN_MESSAGES.SUCCESS} ${OYSTER_CREDIT_TXN_MESSAGES.AMEND_RATE_JOB.INITIATED}`
			);
		}
	} else {
		test.skip();
	}
});

test('Copy Job ID', async ({ page, context, metamaskPage, extensionId }) => {
	// Grant permissions for clipboard-read
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);

	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	// Wait for data
	await page.waitForTimeout(1000);

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	console.log({
		rows
	});
	if (!(rows.length > 0)) test.skip();

	const firstRowSelector = 'tbody tr:first-child td:nth-child(1)';
	await page.hover(firstRowSelector);

	const copyButtonSelector = 'tbody tr:first-child td:nth-child(1) button img[alt="Copy"]';
	await page.click(copyButtonSelector);

	let jobId = await page.$('tbody tr:first-child .text-sm.font-normal');

	if (!jobId) {
		jobId = await page.$('tbody tr:first-child .text-grey.text-xs.font-normal');
	}
	let jobIdText = '';
	if (jobId) {
		jobIdText = (await jobId.textContent()) ?? '';
	}

	// Read the clipboard content
	const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
	const shortClipBoardContent =
		clipboardContent.slice(0, 10) + '...' + clipboardContent.slice(clipboardContent.length - 10);
	await page.waitForSelector('text=Id copied to clipboard');
	// Check if the clipboard content matches the expected data
	expect(shortClipBoardContent).toBe(jobIdText?.trim());
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

//         await page.waitForSelector(text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED})
//     }

// });

test('Sorting by Balance', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	// Wait for data
	await page.waitForTimeout(2000);

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

test('Sorting by Duration Left', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_INVENTORY_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=My Active Orders');
	expect(hasText).toBeTruthy();

	// Wait for data
	await page.waitForTimeout(2000);

	const rows = await page.$$eval('tbody tr', (rows) => rows);

	if (rows.length > 0) {
		const balanceHeader = page.locator('th:has-text("DURATION LEFT")');
		await balanceHeader.click();
		const dataAfterSorting = await extractBalanceColumnData(page);
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

	// Wait for data
	await page.waitForTimeout(5000);

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const maxAvailableBalance = await page.$eval('tbody tr:first-child', (row) => {
		const balanceCell = row.querySelector('td:nth-of-type(3)');
		console.log(balanceCell?.textContent?.trim().replace('$', '').replace(',', ''));
		return balanceCell
			? parseFloat(balanceCell.textContent?.trim().replace('$', '').replace(/,/g, '') || '')
			: 0;
	});

	const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
	if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
		await expandRowToggleButton.click();

		await page.locator('text=Withdraw').first().click();
		await page
			.locator('#pond-input-amount-')
			.first()
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

	// Wait for data
	await page.waitForTimeout(5000);

	const rows = await page.$$eval('tbody tr', (rows) => rows);
	if (!(rows.length > 0)) test.skip();

	const durationHeader = page.locator('th:has-text("DURATION LEFT")');

	// to make sure its sorted. ascending.
	await durationHeader.click();
	await durationHeader.click();
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
		await expandRowToggleButton.click();

		await page.locator('text=Withdraw').first().click();
		await page.waitForTimeout(1000);
		const availableBalanceText = await page
			.locator('#withdraw-available-balance')
			.first()
			?.innerHTML();
		const balanceRegex = /([\d]+\.[\d]+)/;
		const matches = balanceRegex.exec(availableBalanceText);
		const availableAmount = matches ? parseFloat(matches[1]) : 0;

		console.log({ availableAmount });

		if (availableAmount === 0.0 || availableAmount === 0) {
			console.log('no amount to withdraw.');
			test.skip();
		}

		await page.locator('#pond-input-amount-').first().fill('0.0001');

		await page.waitForTimeout(1000);
		// Perform an action on the withdraw button, such as clicking it
		await page.locator('#modal-withdraw-btn').first()?.click();
		await page.waitForTimeout(1000);
		await metamask.confirmTransactionAndWaitForMining();
		await page.waitForSelector(
			`text=${COMMON_TXN_MESSAGES.SUCCESS} ${OYSTER_TXN_MESSAGES.WITHDRAW.SUCCESS}`
		);
	}
});
