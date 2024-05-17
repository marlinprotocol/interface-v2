import { test, expect } from '@playwright/test';
import { EXTERNAL_LINKS, ROUTES } from '../../../src/lib/utils/constants/urls';

test('navigating to /oyster/operator/', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_JOBS_URL, { waitUntil: 'networkidle' });

	const hasText = await page.textContent('text=Hello, Fishy');
	expect(hasText).toBeTruthy();
});

test('documentation button routes to document page', async ({ page, context }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_JOBS_URL, { waitUntil: 'networkidle' });
	const documentationButton = page.getByRole('button', { exact: true, name: 'Documentation' });
	expect(documentationButton).toBeEnabled();

	const [newPage] = await Promise.all([
		context.waitForEvent('page'), // Wait for the new tab (popup) to open
		await documentationButton.click()
	]);

	// Wait for the newPage to finish loading
	await newPage.waitForLoadState('load');

	expect(newPage.url()).toBe(EXTERNAL_LINKS.OYSTER_OPERATOR_DOCS_LINK);
});

test('Inputs disabled if wallet not connected', async ({ page }) => {
	await page.goto(ROUTES.OYSTER_OPERATOR_JOBS_URL, { waitUntil: 'networkidle' });

	const addressInput = page.getByPlaceholder('Enter your address here');
	expect(addressInput).toBeDisabled();
	const cpUrlInput = page.getByPlaceholder('Paste URL here');
	expect(cpUrlInput).toBeDisabled();
	const editButton = page.getByTestId('container-card-body').getByRole('button').first();
	await editButton.click();
	expect(page.textContent('text=Please connect your wallet.')).toBeTruthy();
});
