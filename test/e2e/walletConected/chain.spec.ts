import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress';
import BasicSetup from '../../wallet-setup/basic.setup';
// import BasicSetup from '../../wallet-setup/connected.setup';
import {
	OYSTER_MARKETPLACE_URL,
	OYSTER_OWNER_INVENTORY_URL
} from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import { ARB_GOERLI } from '../../../src/lib/chains/arbGoerli';

const test = testWithSynpress(BasicSetup, unlockForFixture);
const { expect } = test;

test('deploy a job -> Check if job shows up in other chain', async ({
	context,
	page,
	metamaskPage,
	extensionId
}) => {
	await page.goto(OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId);
	await loginToMetamask(metamask, page);

	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();

	// Deploying a JOB
	// sort by rate.
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Select and click the 'DEPLOY' button within the first row
	await page.locator('tbody tr.main-row:first-child td:nth-of-type(8)').click();

	// Make sure the modal opened.
	await page.waitForSelector('text=CREATE ORDER');
	// Wait for the modal to be visible if it is not immediately so
	await page.waitForSelector('.modal-body');

	// Duration
	await page.locator('div:nth-child(2) > div:nth-child(2) > #pond-input-amount').first().fill('1');

	// duration in minutes
	await page.locator('div:nth-child(4) > .search-container > .btn').first().click();
	await page.getByRole('button', { name: 'Hours' }).click();

	// Bandwidth
	await page
		.locator('div:nth-child(5) > div > div:nth-child(2) > #pond-input-amount')
		.first()
		.fill('9');

	// Fill the enclave image url.
	await page
		.locator('.px-4 > div:nth-child(2) > #address-display')
		.first()
		.fill('https://example.com');

	const approveButton = page.locator('.btn-block').first();
	const text = await approveButton.innerText();
	await approveButton.click();

	if (text === 'APPROVE') {
		await metamask.notificationPage.approveTokenPermission(extensionId);
		await page.waitForTimeout(5_000);
		await approveButton.click();
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	} else {
		await metamask.notificationPage.confirmTransactionAndWaitForMining(extensionId);
	}

	await page.waitForURL(OYSTER_OWNER_INVENTORY_URL + '/');

	// Extracting and storing the data into an object
	const firstRowData = {
		operatorAddress: await page.textContent(
			'tbody tr:first-child td:nth-child(1) [data-testid="text"]'
		),
		ipAddress: await page.textContent('tbody tr:first-child td:nth-child(2)'),
		instance: await page.textContent('tbody tr:first-child td:nth-child(3)'),
		region: await page.textContent('tbody tr:first-child td:nth-child(4)'),
		hourlyRate: await page.textContent(
			'tbody tr:first-child td:nth-child(5) [data-testid="tooltip"]'
		),
		balance: await page.textContent('tbody tr:first-child td:nth-child(6) [data-testid="tooltip"]'),
		durationLeft: await page.textContent(
			'tbody tr:first-child td:nth-child(7) [data-testid="tooltip"]'
		)
	};

	// Check if IP Address says 'N/A' and set it to null if true
	firstRowData.ipAddress = firstRowData?.ipAddress?.includes('N/A') ? null : firstRowData.ipAddress;

	await metamask.addNetwork({
		name: ARB_GOERLI.chain_name,
		rpcUrl: ARB_GOERLI.rpc_url,
		chainId: 421613,
		symbol: ARB_GOERLI.chain_token,
		blockExplorerUrl: ARB_GOERLI.block_explorer_name
	});

	// check if the table is empty
	const rowCount = await page.$$eval('tbody tr', (rows) => rows.length);
	if (rowCount !== 0) {
		let firstRowDataExists = false;
		for (let i = 1; i <= rowCount; i++) {
			const rowData = {
				operatorAddress: await page.textContent(
					`tbody tr:nth-of-type(${i}) td:nth-child(1) [data-testid="text"]`
				),
				ipAddress: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(2)`),
				instance: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(3)`),
				region: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(4)`),
				hourlyRate: await page.textContent(
					`tbody tr:nth-of-type(${i}) td:nth-child(5) [data-testid="tooltip"]`
				),
				balance: await page.textContent(
					`tbody tr:nth-of-type(${i}) td:nth-child(6) [data-testid="tooltip"]`
				),
				durationLeft: await page.textContent(
					`tbody tr:nth-of-type(${i}) td:nth-child(7) [data-testid="tooltip"]`
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
	await page.goto(OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
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

		// for (let i = 1; i <= rowCountBeforeChange; i++) {
		//     const rowData = {
		//         operatorAddress: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(1) [data-testid="text"]`),
		//         ipAddress: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(2)`),
		//         instance: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(3)`),
		//         region: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(4)`),
		//         hourlyRate: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(5) [data-testid="tooltip"]`),
		//         balance: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(6) [data-testid="tooltip"]`),
		//         durationLeft: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(7) [data-testid="tooltip"]`)
		//     };

		//     // Normalize 'N/A' to null for ipAddress
		//     rowData.ipAddress = rowData?.ipAddress?.includes('N/A') ? null : rowData.ipAddress;
		//     allRowsDataBeforeChange.push(rowData);
		// }
	}

	await metamask.addNetwork({
		name: ARB_GOERLI.chain_name,
		rpcUrl: ARB_GOERLI.rpc_url,
		chainId: 421613,
		symbol: ARB_GOERLI.chain_token,
		blockExplorerUrl: ARB_GOERLI.block_explorer_name
	});

	// const allRowsDataAfterChange: {
	//     operatorAddress: string | null;
	//     ipAddress: string | null;
	//     instance: string | null;
	//     region: string | null;
	//     hourlyRate: string | null;
	//     balance: string | null;
	//     durationLeft: string | null;
	// }[] = [];
	const rowCountAfterChange = await page.$$eval('tbody tr', (rows) => rows.length);
	if (rowCountAfterChange !== 0) {
		// Extracting the data from the table using evaluate
		const dataAfterFilter = await page.evaluate(
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
		//     for (let i = 1; i <= rowCountAfterChange; i++) {
		//         const rowData = {
		//             operatorAddress: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(1) [data-testid="text"]`),
		//             ipAddress: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(2)`),
		//             instance: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(3)`),
		//             region: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(4)`),
		//             hourlyRate: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(5) [data-testid="tooltip"]`),
		//             balance: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(6) [data-testid="tooltip"]`),
		//             durationLeft: await page.textContent(`tbody tr:nth-of-type(${i}) td:nth-child(7) [data-testid="tooltip"]`)
		//         };

		//         // Normalize 'N/A' to null for ipAddress
		//         rowData.ipAddress = rowData?.ipAddress?.includes('N/A') ? null : rowData.ipAddress;
		//         const exist = allRowsDataBeforeChange.find((row) => JSON.stringify(row) === JSON.stringify(rowData));
		//         expect(exist).toBeFalsy();
		//         allRowsDataAfterChange.push(rowData);
		//     }
	}

	// Log out the data

	if (rowCountAfterChange === 0 && rowCountBeforeChange === 0) {
		expect(rowCountAfterChange).toBe(0);
	}
});
