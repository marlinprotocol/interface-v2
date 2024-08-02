import { testWithSynpress, metaMaskFixtures, MetaMask } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';

import { loginToMetamask } from '../../helpers/metamask';
import { LINEA } from '../../../src/lib/chains/linea';
import { ROUTES } from '../../../src/lib/utils/constants/urls';

const test = testWithSynpress(metaMaskFixtures(BasicSetup));
const { expect } = test;

test('deploy a job -> Check if job shows up in other chain', async ({
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

	// Deploying a JOB
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
	await page.locator('#pond-input-amount-Duration').first().fill('1');

	// duration in hours
	await page.locator('#select-duration').first().click();
	await page.getByRole('button', { name: 'Hours' }).click();

	// Bandwidth
	await page.locator('#pond-input-amount-Bandwidth').first().fill('9');

	// Fill the enclave image url.
	await page.locator('#address-display-enclave-image-url').first().fill('https://example.com');

	const approveButton = page.locator('.btn-block').first();
	const text = await approveButton.innerText();
	await approveButton.click();

	if (text === 'Approve') {
		await metamask.notificationPage.approveTokenPermission(extensionId);
		await page.waitForTimeout(5000);
		await approveButton.click();
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	} else {
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	}

	await page.waitForURL(ROUTES.OYSTER_INVENTORY_URL + '/');

	// Extracting and storing the data into an object
	const firstRowData = {
		operatorAddress: await page.textContent(
			'tbody tr:first-child td:nth-child(1) [data-testid="text"]'
		),
		ipAddress: await page.textContent('tbody tr:first-child td:nth-child(2)'),
		balance: await page.textContent('tbody tr:first-child td:nth-child(3) [data-testid="tooltip"]'),
		durationLeft: await page.textContent(
			'tbody tr:first-child td:nth-child(4) [data-testid="tooltip"]'
		)
	};

	// Check if IP Address says 'N/A' and set it to null if true
	firstRowData.ipAddress = firstRowData?.ipAddress?.includes('N/A') ? null : firstRowData.ipAddress;

	await metamask.addNetwork({
		name: LINEA.chain_name,
		rpcUrl: LINEA.rpc_url,
		chainId: 59144,
		symbol: LINEA.chain_token,
		blockExplorerUrl: LINEA.block_explorer_name
	});

	// check if the table is empty
	const rowCount = await page.$$eval('tbody tr', (rows) => rows.length);
	if (rowCount !== 0) {
		let firstRowDataExists = false;
		for (let i = 1; i <= rowCount; i++) {
			const rowData = {
				operatorAddress: await page.textContent(
					'tbody tr:nth-of-type(${i}) td:nth-child(1) [data-testid="text"]'
				),
				ipAddress: await page.textContent('tbody tr:nth-of-type(${i}) td:nth-child(2)'),
				balance: await page.textContent(
					'tbody tr:nth-of-type(${i}) td:nth-child(3) [data-testid="tooltip"]'
				),
				durationLeft: await page.textContent(
					'tbody tr:nth-of-type(${i}) td:nth-child(4) [data-testid="tooltip"]'
				)
			};

			// Normalize 'N/A' to null for ipAddress
			rowData.ipAddress = rowData?.ipAddress?.includes('N/A') ? null : rowData.ipAddress;
			if (JSON.stringify(rowData) === JSON.stringify(firstRowData)) {
				firstRowDataExists = true;
				break; // Exit the loop as we have found the row
			}
			// allRowsData.push(rowData);
			expect(firstRowDataExists).toBeFalsy();
		}
	} else {
		expect(rowCount).toBe(0);
	}
});

test('use some filters -> check if the same data show up on chain change', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	// Selector for the table rows. Adjust if necessary
	const tableRowSelector = 'table > tbody > tr';
	const rowCountBeforeChange = await page.$$eval('tbody tr', (rows) => rows.length);
	let allRowsDataBeforeChange: {
		operator: string | undefined;
		instance: string | undefined;
		region: string | undefined;
		rate: string | undefined;
		vCPU: string | undefined;
		memory: string | undefined;
		arch: string | undefined;
	}[] = [];
	if (rowCountBeforeChange !== 0) {
		// Select the input field for instance filtering
		const instanceInput = page.getByPlaceholder('Select Instance', { exact: true });

		const firstRowInstanceSelector = 'tbody tr:first-child td:nth-child(2)';
		const instanceToFilter = await page
			.$(firstRowInstanceSelector)
			.then(async (res) => await res?.innerHTML());

		expect(instanceToFilter).toBeTruthy();

		if (instanceToFilter) {
			// Fill the filter field with the desired instance
			await instanceInput.fill(instanceToFilter);
			expect(instanceInput).toHaveValue(instanceToFilter);
		}

		await page.waitForTimeout(1000);

		// Wait for the table to load on the page
		await page.waitForSelector(tableRowSelector);
		// Extracting the data from the table using evaluate
		allRowsDataBeforeChange = await page.evaluate((selector) => {
			const rows = Array.from(document.querySelectorAll(selector));
			return rows.map((row) => {
				// Query data within this row for each column header
				const operator = row
					?.querySelector('[data-testid="name-with-address"]')
					?.textContent?.trim();
				const instance = row?.querySelector('td:nth-of-type(2)')?.textContent?.trim();
				const region = row?.querySelector('td:nth-of-type(3)')?.textContent?.trim();
				const rate = row
					?.querySelector('td:nth-of-type(4) [data-testid="tooltip"]')
					?.textContent?.trim();
				const vCPU = row?.querySelector('td:nth-of-type(5)')?.textContent?.trim();
				const memory = row?.querySelector('td:nth-of-type(6)')?.textContent?.trim();
				const arch = row?.querySelector('td:nth-of-type(7)')?.textContent?.trim();

				// Return an object with the data
				return { operator, instance, region, rate, vCPU, memory, arch };
			});
		}, tableRowSelector);
	}

	await metamask.addNetwork({
		name: LINEA.chain_name,
		rpcUrl: LINEA.rpc_url,
		chainId: 59144,
		symbol: LINEA.chain_token,
		blockExplorerUrl: LINEA.block_explorer_name
	});

	const rowCountAfterChange = await page.$$eval('tbody tr', (rows) => rows.length);
	if (rowCountAfterChange !== 0) {
		// Extracting the data from the table using evaluate
		await page.evaluate(
			({ tableRowSelector: selector, allRowsDataBeforeChange, expect }) => {
				const rows = Array.from(document.querySelectorAll(selector));
				return rows.map((row) => {
					// Query data within this row for each column header
					const operator = row
						?.querySelector('[data-testid="name-with-address"]')
						?.textContent?.trim();
					const instance = row?.querySelector('td:nth-of-type(2)')?.textContent?.trim();
					const region = row?.querySelector('td:nth-of-type(3)')?.textContent?.trim();
					const rate = row
						?.querySelector('td:nth-of-type(4) [data-testid="tooltip"]')
						?.textContent?.trim();
					const vCPU = row?.querySelector('td:nth-of-type(5)')?.textContent?.trim();
					const memory = row?.querySelector('td:nth-of-type(6)')?.textContent?.trim();
					const arch = row?.querySelector('td:nth-of-type(7)')?.textContent?.trim();
					const rowData = { operator, instance, region, rate, vCPU, memory, arch };

					const exist = allRowsDataBeforeChange.find(
						(row) => JSON.stringify(row) === JSON.stringify(rowData)
					);
					expect(exist).toBeFalsy();

					// Return an object with the data
					return { operator, instance, region, rate, vCPU, memory, arch };
				});
			},
			{ tableRowSelector, allRowsDataBeforeChange, expect }
		);
	}

	if (rowCountAfterChange === 0 && rowCountBeforeChange === 0) {
		expect(rowCountAfterChange).toBe(0);
	}
});
test('change chain', async ({ context, page, metamaskPage, extensionId }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	await metamask.addNetwork({
		name: LINEA.chain_name,
		rpcUrl: LINEA.rpc_url,
		chainId: 59144,
		symbol: LINEA.chain_token,
		blockExplorerUrl: LINEA.block_explorer_name
	});
});
