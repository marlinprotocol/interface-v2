import { test, expect } from '@playwright/test';
import {
	extractMemoryColumnData,
	extractRateColumnData,
	extractVcpuColumnData,
	isSortedNumerically
} from '../../helpers/marketplace';
import { ROUTES } from '../../../src/lib/utils/constants/urls';

test('navigating to /oyster/marketplace/', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL);

	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();
});

test('Renders the table', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// Check if the table is present
	const table = await page.$('table');
	expect(table).not.toBeNull();
});

test('Renders the table with a maximum of 10 rows.', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const rowCount = await page.$$eval('tbody > tr.main-row', (rows) => rows.length);
	expect(rowCount).toBeLessThanOrEqual(10);
});

test('Sorting of rate works', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// const dataBeforeSorting = await extractRateColumnData(page);

	// Click on the RATE header to sort by RATE
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Extract data after sorting
	const dataAfterSorting = await extractRateColumnData(page);

	// console.log({ dataBeforeSorting, dataAfterSorting });

	// Checking if the RATE column is sorted
	expect(isSortedNumerically(dataAfterSorting)).toBeTruthy();
});

test('Sorting of vCPU works', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// const dataBeforeSorting = await extractVcpuColumnData(page);

	// Click on the vCPU header to sort by RATE
	const vcpuHeader = page.locator('th:has-text("vCPU")');
	await vcpuHeader.click();

	// Extract data after sorting
	const dataAfterSorting = await extractVcpuColumnData(page);
	const vpcDataInNumbers = dataAfterSorting.map(Number);

	// console.log({ dataBeforeSorting, dataAfterSorting });

	// Checking if the RATE column is sorted
	expect(isSortedNumerically(vpcDataInNumbers)).toBeTruthy();
});

test('Sorting of memory works', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// const dataBeforeSorting = await extractMemoryColumnData(page);

	const memoryHeader = page.locator('th:has-text("MEMORY")');
	await memoryHeader.click();

	const dataAfterSorting = await extractMemoryColumnData(page);

	// console.log(dataBeforeSorting, dataAfterSorting)

	// Checking if the Memory column is sorted numerically
	expect(isSortedNumerically(dataAfterSorting)).toBeTruthy();
});

test('Searching random operator gives no result text', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1000);

	// there are 11 elements with the same placeholder.
	const inputElement = page.getByPlaceholder('Search').first();

	await inputElement.fill('Some thing random');
	await expect(inputElement).toBeVisible();
	const emptyState = await page.getByText('No data found!', { exact: true }).innerHTML();
	expect(emptyState).toBe('No data found!');
});

test('Clear button works', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1000);

	const inputElement = page.getByPlaceholder('Search').first();
	await inputElement.fill('Some thing random');
	await expect(inputElement).toBeVisible();
	await expect(inputElement).toHaveValue('Some thing random');
	const clearButton = page.getByRole('button', { name: 'CLEAR' });
	await clearButton.click();
	// Expect the input to be empty after clicking the clear button
	await expect(inputElement).toHaveValue('');
});

test('Searching an operator shows relevant results', async ({ page }) => {
	const testInput = 'Kiv';
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	await page.waitForTimeout(1000);

	const inputElement = page.getByPlaceholder('Search').first();
	console.log(inputElement);
	await inputElement.fill('Kiv');
	await expect(inputElement).toBeVisible();
	const operatorTexts = await page.$$eval('td', (tds) =>
		tds
			.map((td) => {
				// Using querySelector to get the first element with data-testid="text" inside the td
				const textElement = td.querySelector('[data-testid="text"]');
				// Returning its text content trimmed of any whitespace
				return textElement ? textElement.textContent?.trim() : null;
			})
			// Filter out any null values that may have resulted from tds without the targeted child element
			.filter((text) => text !== null)
	);

	// check to see if all the rows in the table starts with the input provided above.
	let onlyRelevantSearchResults = true;

	operatorTexts.forEach((operator) => {
		if (!operator?.startsWith(testInput)) {
			onlyRelevantSearchResults = false;
		}
	});
	expect(onlyRelevantSearchResults).toBeTruthy();
});

test(`Deploy and check if toast for connect wallet shows.`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// const dataBeforeSorting = await extractRateColumnData(page);

	// Click on the RATE header to sort by RATE
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Select the 'DEPLOY' button within the first row
	const allDeployImages = await page.$$('img[alt="Deploy"]');
	if (allDeployImages.length > 0) {
		// Click the parent button of the first image
		await allDeployImages[0].click();
	} else {
		console.log('No deploy buttons found!');
		test.skip();
	}

	await page.waitForTimeout(1000);

	const connectWalletText = await page
		.getByText('Please connect your wallet to deploy')
		.innerHTML();
	expect(connectWalletText).toBeTruthy();
});

test(`Copy button on row is working`, async ({ page, context }) => {
	// Grant permissions for clipboard-read
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);

	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const firstRowSelector = 'tbody tr:first-child';
	await page.hover(firstRowSelector);

	const copyButtonSelector = 'tbody tr:first-child button img[alt="Copy"]';
	await page.click(copyButtonSelector);

	// Read the clipboard content
	const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
	const shortAddress =
		clipboardContent.slice(0, 10) + '...' + clipboardContent.slice(clipboardContent.length - 10);

	const address = await page
		.getByRole('row', { name: `${shortAddress} Copy` })
		.getByTestId('text')
		.first()
		.textContent();
	if (!address) {
		test.fail();
		return;
	}

	const expectedAddressArray = (address || '').split('.');
	const expectedAddressStart = expectedAddressArray[0];
	const expectedAddressEnd = expectedAddressArray[expectedAddressArray.length - 1];

	await page.waitForSelector('text=Address copied to clipboard');

	// // Check if the clipboard content matches the expected data
	expect(clipboardContent.startsWith(expectedAddressStart)).toBeTruthy();
	expect(clipboardContent.endsWith(expectedAddressEnd)).toBeTruthy();
});

test(`filter by instance`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// Select the input field for instance filtering
	const inputElement = page.locator('.mt-4 > div > div > div > div > .input').first();

	const firstRowInstanceSelector = 'tbody tr:first-child td:nth-child(2)';
	const instanceToFilter = await page
		.$(firstRowInstanceSelector)
		.then(async (res) => await res?.innerHTML());

	expect(instanceToFilter).toBeTruthy();

	if (instanceToFilter) {
		// Fill the filter field with the desired instance
		await inputElement.fill(instanceToFilter);
		expect(inputElement).toHaveValue(instanceToFilter);

		// After filtering, optionally wait for a network response or some indication that filtering is done
		await page.waitForTimeout(1000);

		// Selector for the column containing the instance types to fetch from all rows
		const instanceColumnSelector = 'tbody tr td:nth-child(2)';

		// Evaluate page content and retrieve text from all instance columns
		const instancesOnPage = await page.evaluate((selector) => {
			// Get all elements that match the selector
			const elements = Array.from(document.querySelectorAll(selector));
			// Return their text content inside an array
			return elements.map((element) => element.textContent?.trim());
		}, instanceColumnSelector);

		// Check if all instances match the one you filtered by
		const allInstancesMatch = instancesOnPage.every(
			(instance) => instance?.endsWith(instanceToFilter)
		);
		expect(allInstancesMatch).toBeTruthy();
	}
});

test(`filter by region`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// The input element for region filtering, adjust the selector accordingly
	const inputElement = page.locator('div:nth-child(2) > div > div > div > .input').first();

	// Selector for the first row's region column
	const firstRowRegionSelector = 'tbody tr:first-child td:nth-child(3)';
	const regionToFilter = await page
		.$(firstRowRegionSelector)
		.then(async (res) => await res?.innerText());

	expect(regionToFilter).toBeTruthy();

	if (regionToFilter) {
		// Fill the filter field with the desired region
		await inputElement.fill(regionToFilter);
		expect(inputElement).toHaveValue(regionToFilter);

		// After filtering, wait for the filter operation to complete (networkidle, response, etc.)
		await page.waitForTimeout(1000); // Or use waitForSelector, waitForFunction, etc.

		// Selector for the column containing the region types to fetch from all rows
		const regionColumnSelector = 'tbody tr td:nth-child(3)';

		// Retrieve text from all region columns
		const regionsOnPage = await page.evaluate((selector) => {
			const elements = Array.from(document.querySelectorAll(selector));
			return elements.map((element) => element.textContent?.trim());
		}, regionColumnSelector);

		// Check if all regions match the one you filtered by
		const allRegionsMatch = regionsOnPage.every((region) => region?.endsWith(regionToFilter));

		expect(allRegionsMatch).toBeTruthy();
	}
});

test(`filter by vCPU`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	// Select the input field for vCPU filtering
	const inputElement = page.locator('div:nth-child(3) > div > div > div > .input').first();

	// Selector for the first row's vCPU column
	const firstRowvCPUSelector = 'tbody tr:first-child td:nth-child(4)';
	const vCPUToFilter = await page
		.$(firstRowvCPUSelector)
		.then(async (res) => await res?.innerText());

	expect(vCPUToFilter).toBeTruthy();

	if (vCPUToFilter) {
		// Fill the filter field with the desired vCPU number
		await inputElement.fill(vCPUToFilter);
		expect(inputElement).toHaveValue(vCPUToFilter);

		// After filtering, wait for the filter operation to complete (networkidle, response, etc.)
		await page.waitForTimeout(1000); // Or use waitForSelector, waitForFunction, etc.

		// Selector for the column containing the vCPU numbers to fetch from all rows
		const vCPUColumnSelector = 'tbody tr td:nth-child(4)';

		// Retrieve text from all vCPU columns
		const vCPUsOnPage = await page.evaluate((selector) => {
			const elements = Array.from(document.querySelectorAll(selector));
			return elements.map((element) => element.textContent?.trim());
		}, vCPUColumnSelector);

		// Check if all vCPU cells match the one you filtered by
		const allvCPUsMatch = vCPUsOnPage.every((vCPU) => vCPU?.endsWith(vCPUToFilter));

		expect(allvCPUsMatch).toBeTruthy();
	}
});

test('filter by memory', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const memoryFilter = page.locator('div:nth-child(4) > div > div > div > .input');

	const firstRowMemorySelector = 'tbody tr:first-child td:nth-child(5)';
	const memoryToFilter = await page
		.$(firstRowMemorySelector)
		.then(async (res) => (await res?.innerText())?.split(' ')[0]);
	expect(memoryToFilter).toBeTruthy();

	if (memoryToFilter) {
		// Enter the memory to filter by in the filter field
		await memoryFilter.fill(memoryToFilter);

		// Wait for the table to update after filtering
		await page.waitForTimeout(1000);

		// The selector for all table cells in the memory column
		const memoryColumnCellsSelector = 'tbody tr td:nth-child(5)';

		// Retrieve the memory values for each row by evaluating the content of each relevant cell
		const memoryValues = await page.$$eval(memoryColumnCellsSelector, (tds) =>
			tds.map((td) => td.textContent?.trim())
		);

		// Check if all the memory values in the table match the filtered memory value
		memoryValues.every((memoryValue) =>
			expect(memoryValue?.endsWith(memoryToFilter + ' MB')).toBeTruthy()
		);
	}
});

test('filter by all fields using first row values', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	const instanceFilterInput = page.locator('.mt-4 > div > div > div > div > .input').first();
	const regionFilterInput = page.locator('div:nth-child(2) > div > div > div > .input').first();
	const vCPUFilterInput = page.locator('div:nth-child(3) > div > div > div > .input').first();
	const memoryFilterInput = page.locator('div:nth-child(4) > div > div > div > .input');
	const archFilterInput = page.locator('div:nth-child(5) > div > div > div > .input');

	// Retrieve the first row's criteria for filtering
	const firstRowSelector = 'tbody tr:first-child';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [operator, instance, region, vcpu, memory, arch] = await page.$$eval(
		`${firstRowSelector} td`,
		(tds) => tds.map((td) => td.textContent?.trim())
	);

	if (instance && region && vcpu && memory && arch) {
		// Fill in the filter inputs with the retrieved values
		await instanceFilterInput.fill(instance);
		await regionFilterInput.fill(region);
		await vCPUFilterInput.fill(vcpu);
		await memoryFilterInput.fill(memory.split(' ')[0]);
		await archFilterInput.fill(arch);

		// Wait for the filters to be applied and the table to refresh
		await page.waitForTimeout(1000);

		const filtersMatch = await page.$$eval(
			'tbody tbody tr',
			(rows, [instance, region, vcpu, memory, arch]) => {
				return rows.every((row) => {
					return (
						row.children[1].textContent?.trim() === instance &&
						row.children[2].textContent?.trim() === region &&
						row.children[4].textContent?.trim() === vcpu &&
						row.children[5].textContent?.trim() === memory &&
						row.children[6].textContent?.trim() === arch
					);
				});
			},
			[instance, region, vcpu, memory, arch]
		);

		// Assert that all visible rows match the filter criteria
		expect(filtersMatch).toBeTruthy();
	}
});
