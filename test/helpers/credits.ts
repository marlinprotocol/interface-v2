import { Page } from '@playwright/test';
import { ROUTES } from '../../src/lib/utils/constants/urls';

export const goToMarketPlaceAndFetchCredits = async (page: Page) => {
	await page.goto(ROUTES.OYSTER_MARKETPLACE_URL, { waitUntil: 'networkidle' });
	// sort by rate.
	const rateHeader = page.locator('th:has-text("RATE")');
	await rateHeader.click();

	// Select and click the 'DEPLOY' button within the first row
	await page.locator('tbody tr:first-child td:nth-of-type(8)').click();

	// Make sure the modal opened.
	await page.waitForSelector('text=CREATE ORDER');
	// Wait for the modal to be visible if it is not immediately so
	await page.waitForSelector('.modal-body');

	await page.locator('.checkbox-primary').first().click();
	const walletBalance = await page.locator('#wallet-credits').first().innerHTML();

	// Extract the number string
	const match = walletBalance.match(/(\d+\.\d+)/);
	const number = match ? parseFloat(match[0]) : 0;
	return number;
};
