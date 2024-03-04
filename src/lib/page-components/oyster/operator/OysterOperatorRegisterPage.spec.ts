/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import OysterOperatorRegistration from './OysterOperatorRegisterPage.svelte';

// Mocking the walletProviderStore
const { web3WalletStore, walletStore, connected } = await vi.hoisted(
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
});

describe('OysterOperatorRegistration', () => {
	test('renders the component', () => {
		const { container } = render(OysterOperatorRegistration);
		expect(container).toMatchSnapshot();
	});

	test('displays the correct title', () => {
		const { getByText } = render(OysterOperatorRegistration);
		expect(getByText('Operator Registration')).toBeTruthy();
	});

	test('get a placement for enter wallet address & CP Url', () => {
		const { getByPlaceholderText } = render(OysterOperatorRegistration);
		expect(getByPlaceholderText('Enter your address here')).toBeTruthy();
		expect(getByPlaceholderText('Paste URL here')).toBeTruthy();
	});

	test('connect wallet and fire register', async () => {
		const testAddress = '0x78f43d0bdB00E411A5797C8f50D7DDf793dd9884';
		const cpUrlValue = 'http://3.108.237.212:8080';

		const { getByText, getByPlaceholderText, getByTestId, container } = render(
			OysterOperatorRegistration
		);

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
			expect(getByText('REGISTER')).toBeTruthy();
		});

		// Wait for the Address field to be populated with the wallet address
		await waitFor(() => {
			const addressInput: any = getByPlaceholderText('Enter your address here');
			expect(addressInput.value).toBe(testAddress);
		});

		// Wait for the Control Plane URL field to be empty
		await waitFor(() => {
			const cpUrlInput: any = getByPlaceholderText('Paste URL here');
			expect(cpUrlInput.value).toBe('');
		});

		const cpUrlInput: any = getByPlaceholderText('Paste URL here');
		// Set the value in the Control Plane URL field
		fireEvent.input(cpUrlInput, { target: { value: cpUrlValue } });

		// Wait for the instances table button to be rendered
		await waitFor(() => {
			const instancesTableBtn = getByTestId('collapse-button');
			expect(instancesTableBtn).toBeTruthy();
			expect(instancesTableBtn.getElementsByClassName('icon-disabled')).toBeTruthy();
		});

		// Wait for the Control Plane URL field to be updated with the provided value
		await waitFor(() => {
			expect(cpUrlInput.value).toBe(cpUrlValue);
		});

		// Wait for the instances table to be rendered
		await waitFor(() => {
			const instancesTable = container.getElementsByTagName('table');
			expect(instancesTable).toBeTruthy();
		});

		// Click on the instances table collapse button
		fireEvent.click(getByTestId('collapse-button'));

		// Wait for the collapse button to be updated after click
		await waitFor(() => {
			const tableBtn = getByTestId('collapse-button').getElementsByClassName('icon-primary');
			expect(tableBtn).toBeTruthy();
		});
	});
});
