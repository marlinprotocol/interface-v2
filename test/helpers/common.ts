import { Page } from '@playwright/test';

export const findSmallerNumber = (num: number) => {
	// JavaScript provides a constant Number.EPSILON which represents
	// the smallest interval between two representable numbers.
	// You could also choose a different decrement value if needed.
	const decrement = Number.EPSILON;

	// Subtract the decrement from the number to get a smaller number.
	const smallerNumber = num - decrement;

	return smallerNumber;
};

export const isSortedAlphabetically = (array: string[]) => {
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i].localeCompare(array[i + 1]) > 0) {
			return false;
		}
	}
	return true;
};

export const getWalletAddress = async (page: Page) => {
	const labelSelector = `label[for="disconnect-wallet-modal"]`;
	await page.waitForSelector(labelSelector);

	// Click the label
	await page.click(labelSelector);
	await page.textContent('text=Your wallet');
	const walletAddress = await page.getByTestId('wallet-address').innerText();
	await page.getByTestId('modal-close-button').nth(1).click();
	return walletAddress;
};

export const confirmPageTitle = async (page: Page) => {
	const walletAddress = await getWalletAddress(page);
	const shortWalletAddress =
		walletAddress.slice(0, 6) + '...' + walletAddress.slice(walletAddress.length - 6);

	const hasText = await page.textContent(`text=Hello, ${shortWalletAddress}`);
	return hasText;
};
