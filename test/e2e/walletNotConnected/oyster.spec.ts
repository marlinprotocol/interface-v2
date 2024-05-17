import { test, expect } from '@playwright/test';

test('navigating to /oyster/operator/', async ({ page }) => {
	await page.goto('/oyster/operator/', { waitUntil: 'networkidle' });

	const hasText = await page.textContent('text=Hello, Fishy');
	expect(hasText).toBeTruthy();
});

test('Inputs disabled if wallet not connected', async ({ page }) => {
	await page.goto('/oyster/operator/', { waitUntil: 'networkidle' });

	const addressInput = page.getByPlaceholder('Enter your address here');
	expect(addressInput).toBeDisabled();
	const cpUrlInput = page.getByPlaceholder('Paste URL here');
	expect(cpUrlInput).toBeDisabled();
	const editButton = page.getByTestId('container-card-body').getByRole('button').first();
	await editButton.click();
	expect(page.textContent('text=Please connect your wallet.')).toBeTruthy();
});
