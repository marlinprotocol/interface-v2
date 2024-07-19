import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import DisconnectWalletModal from './DisconnectWalletModal.svelte';
const { chainConfigStore, walletStore, chainStore, web3WalletStore } = await vi.hoisted(
	() => import('$lib/data-stores/mock-data-stores/mockStores')
);

beforeAll(() => {
	walletStore.mockSetSubscribeValue({ provider: undefined, signer: undefined, address: '0x123' });
	vi.mock('$lib/data-stores/walletProviderStore', async () => {
		return {
			web3WalletStore,
			walletStore
		};
	});
	vi.mock('$lib/data-stores/chainProviderStore', async () => {
		return {
			chainConfigStore,
			chainStore
		};
	});
});
describe('DisconnectWalletModal', () => {
	const mockFn = vi.fn();
	it('renders properly', () => {
		const { container } = render(DisconnectWalletModal, {
			props: {
				modalFor: 'id-testing',
				disconnect: () => {}
			}
		});
		expect(container).toMatchSnapshot();
	});
	it('calls disconnect function on logout', async () => {
		const { getByText } = render(DisconnectWalletModal, {
			props: {
				modalFor: 'id-testing',
				disconnect: mockFn
			}
		});
		const button = getByText('LOGOUT');
		await fireEvent.click(button);
		await tick(); // Wait for any store updates if needed
		expect(mockFn).toHaveBeenCalledOnce();
	});
	it('has the correct block explorer', () => {
		const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
		const viewLink = getByText('Block Explorer').closest('a');
		expect(viewLink?.getAttribute('href')).toBe('https://blockexplorer.com/address/0x123');
	});

	it('has the button to add Pond to the users wallet', () => {
		const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
		expect(getByText('Add POND')).toBeTruthy();
	});

	it('has the button to add MPond to the users wallet', () => {
		const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
		expect(getByText('Add MPond')).toBeTruthy();
	});

	it('displays the wallet address from the store', async () => {
		const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
		expect(getByText('0x123')).toBeTruthy();
	});
});
