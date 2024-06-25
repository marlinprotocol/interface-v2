import { test, expect } from '@playwright/test';
import {
	extractMemoryColumnData,
	extractRateColumnData,
	extractVcpuColumnData,
	isSortedNumerically,
	marketplaceSearch
} from '../../helpers/marketplace';
import { ROUTES } from '../../../src/lib/utils/constants/urls';

test('navigating to /oyster/marketplace/', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL);

	const hasText = await page.textContent('text=Infrastructure Providers');
	expect(hasText).toBeTruthy();
});

test('Renders the table', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await marketplaceSearch(page);

	// Check if the table is present
	const table = await page.$('table');
	expect(table).not.toBeNull();
});

test('Renders the table with a maximum of 10 rows.', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await marketplaceSearch(page);

	const rowCount = await page.$$eval('tbody > tr.main-row', (rows) => rows.length);
	expect(rowCount).toBeLessThanOrEqual(10);
});

test('Sorting of rate works', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await marketplaceSearch(page);

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

	await marketplaceSearch(page);

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

	await marketplaceSearch(page);

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
	await page.getByRole('button', { name: 'Apply' }).click();
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
	await page.getByRole('button', { name: 'Apply' }).click();
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

	await marketplaceSearch(page);

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

test(`Copy button on row is working`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await marketplaceSearch(page);

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

	await page.waitForTimeout(1000);

	const instanceToFilter = 'c7g.8xlarge';
	await page.locator('#select-instance').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: instanceToFilter, exact: true }).click();
	await page.getByRole('button', { name: 'Apply' }).click();

	await page.waitForTimeout(1000);

	const instanceColumnSelector = 'tbody tr td:nth-child(2)';

	const instancesOnPage = await page.evaluate((selector) => {
		const elements = Array.from(document.querySelectorAll(selector));
		return elements.map((element) => element.textContent?.trim());
	}, instanceColumnSelector);
	const allInstancesMatch = instancesOnPage.every(
		(instance) => instance?.endsWith(instanceToFilter)
	);
	expect(allInstancesMatch).toBeTruthy();
});

test(`filter by region`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	const regionToFilter = 'us-west-1';
	await page.locator('#select-region').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: regionToFilter, exact: false }).click();
	await page.getByRole('button', { name: 'Apply' }).click();

	await page.waitForTimeout(1000);

	const regionColumnSelector = 'tbody tr td:nth-child(3)';

	const regionsOnPage = await page.evaluate((selector) => {
		const elements = Array.from(document.querySelectorAll(selector));
		return elements.map((element) => element.textContent?.trim());
	}, regionColumnSelector);
	const allregionsMatch = regionsOnPage.every((region) => region?.endsWith(regionToFilter));
	expect(allregionsMatch).toBeTruthy();
});

test(`filter by vCPU`, async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	const vCpuToFilter = '2';
	await page.locator('#select-vcpu').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: vCpuToFilter, exact: true }).click();
	await page.getByRole('button', { name: 'Apply' }).click();

	await page.waitForTimeout(1000);

	const vCpuColumnSelector = 'tbody tr td:nth-child(4)';

	const vCpusOnPage = await page.evaluate((selector) => {
		const elements = Array.from(document.querySelectorAll(selector));
		return elements.map((element) => element.textContent?.trim());
	}, vCpuColumnSelector);
	const allvCpusMatch = vCpusOnPage.every((vCpu) => vCpu?.endsWith(vCpuToFilter));
	expect(allvCpusMatch).toBeTruthy();
});

test('filter by memory', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	const memoryToFilter = '4096 MB';
	await page.locator('#select-memory').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: memoryToFilter, exact: true }).click();
	await page.getByRole('button', { name: 'Apply' }).click();

	await page.waitForTimeout(1000);

	const memoryColumnSelector = 'tbody tr td:nth-child(5)';

	const memorysOnPage = await page.evaluate((selector) => {
		const elements = Array.from(document.querySelectorAll(selector));
		return elements.map((element) => element.textContent?.trim());
	}, memoryColumnSelector);
	const allmemorysMatch = memorysOnPage.every((memory) => memory?.endsWith(memoryToFilter));
	expect(allmemorysMatch).toBeTruthy();
});

test('filter by architecture', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	const architectureToFilter = 'arm64';
	await page.locator('#select-arch').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: architectureToFilter, exact: true }).click();

	await page.getByRole('button', { name: 'Apply' }).click();

	await page.waitForTimeout(1000);

	const architectureColumnSelector = 'tbody tr td:nth-child(6)';

	const architecturesOnPage = await page.evaluate((selector) => {
		const elements = Array.from(document.querySelectorAll(selector));
		return elements.map((element) => element.textContent?.trim());
	}, architectureColumnSelector);
	const allarchitecturesMatch = architecturesOnPage.every(
		(architecture) => architecture?.endsWith(architectureToFilter)
	);
	expect(allarchitecturesMatch).toBeTruthy();
});

test('filter by all fields using first row values', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });

	await page.waitForTimeout(1000);

	const instanceToFilter = 'c6in.xlarge';
	await page.locator('#select-instance').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: instanceToFilter, exact: true }).click();

	const regionToFilter = 'us-west-1';
	await page.locator('#select-region').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: regionToFilter, exact: false }).click();

	const vCpuToFilter = '2';
	await page.locator('#select-vcpu').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: vCpuToFilter, exact: true }).click();

	const memoryToFilter = '4096 MB';
	await page.locator('#select-memory').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: memoryToFilter, exact: true }).click();

	const archToFilter = 'amd64';
	await page.locator('#select-arch').getByTestId('collapse-button').click();
	await page.getByRole('button', { name: archToFilter, exact: true }).click();

	await page.getByRole('button', { name: 'Apply' }).click();
	await page.waitForTimeout(1000);

	const filtersMatch = await page.$$eval(
		'tbody tbody tr',
		(rows, [instanceToFilter, regionToFilter, vCpuToFilter, memoryToFilter, archToFilter]) => {
			return rows.every((row) => {
				return (
					row.children[1].textContent?.trim() === instanceToFilter &&
					row.children[2].textContent?.trim() === regionToFilter &&
					row.children[4].textContent?.trim() === vCpuToFilter &&
					row.children[5].textContent?.trim() === memoryToFilter &&
					row.children[6].textContent?.trim() === archToFilter
				);
			});
		},
		[instanceToFilter, regionToFilter, vCpuToFilter, memoryToFilter, archToFilter]
	);

	expect(filtersMatch).toBeTruthy();
});
