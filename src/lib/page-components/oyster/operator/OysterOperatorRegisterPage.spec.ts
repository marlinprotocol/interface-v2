/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import OysterOperatorRegistration from './OysterOperatorRegisterPage.svelte';

// Mocking the walletProviderStore
const { web3WalletStore, walletStore, connected, page } = await vi.hoisted(
	() => import('$lib/data-stores/mock-data-stores/mockStores')
);

beforeAll(() => {
	// Mocking the walletProviderStore data
	vi.mock('$lib/data-stores/walletProviderStore', async () => {
		return {
			web3WalletStore,
			walletStore,
			connected
		};
	});

	vi.mock('$app/stores', async () => {
		return {
			page: page
		};
	});
});

describe('OysterOperatorRegistration', () => {
	test('renders the component', () => {
		const { container } = render(OysterOperatorRegistration);
		expect(container).toMatchSnapshot();
	});

	test('displays the correct title', () => {
		const { getByText, findAllByText } = render(OysterOperatorRegistration);
		expect(getByText('Hello, Fishy')).toBeTruthy();
		expect(getByText('Documentation')).toBeTruthy();
		expect(findAllByText('Register')).toBeTruthy();
	});

	test('get a placement for enter wallet address & CP Url', () => {
		const { getByPlaceholderText } = render(OysterOperatorRegistration);
		expect(getByPlaceholderText('Paste URL here')).toBeTruthy();
	});

	test('connect wallet and fire register', async () => {
		const testAddress = process.env.VITE_WALLET_ADDRESS || '';
		const cpUrlValue = process.env.VITE_TEST_CP_URL_1 || '';

		const { findAllByText, getByPlaceholderText, container } = render(OysterOperatorRegistration);

		// Simulate wallet connection
		connected.set(true);
		connected.mockSetSubscribeValue(true);
		walletStore.mockSetSubscribeValue({
			address: testAddress,
			provider: undefined,
			signer: undefined
		});

		// Wait for the DOM to update after connecting the wallet
		await waitFor(() => {
			// Check for the presence of the REGISTER button
			expect(findAllByText('Register')).toBeTruthy();
		});

		// Wait for the Control Plane URL field to be empty
		await waitFor(() => {
			const cpUrlInput: any = getByPlaceholderText('Paste URL here');
			expect(cpUrlInput.value).toBe('');
		});

		const cpUrlInput: any = getByPlaceholderText('Paste URL here');
		// Set the value in the Control Plane URL field
		fireEvent.input(cpUrlInput, { target: { value: cpUrlValue } });

		// Wait for the Control Plane URL field to be updated with the provided value
		await waitFor(() => {
			expect(cpUrlInput.value).toBe(cpUrlValue);
		});

		// Wait for the instances table to be rendered
		await waitFor(() => {
			const instancesTable = container.getElementsByTagName('table');
			expect(instancesTable).toBeTruthy();
		});
	});
});
