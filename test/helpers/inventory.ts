import { Page } from '@playwright/test';

export async function getJobID(context, page: Page, n = 1) {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	const firstRowSelector = `tbody tr:nth-child(${n}) td:nth-child(1)`;
	await page.hover(firstRowSelector);

	const copyButtonSelector = `tbody tr:nth-child(${n}) td:nth-child(1) button img[alt="Copy"]`;
	await page.click(copyButtonSelector);

	const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
	return clipboardContent;
}
