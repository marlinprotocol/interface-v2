import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import DisconnectWalletModal from './DisconnectWalletModal.svelte';
const { chainConfigStore, walletStore, chainStore } = await vi.hoisted(() => import('$lib/data-stores/mock-data-stores/mockStores'));


describe('DisconnectWalletModal', () => {
    beforeEach(() => {
        walletStore.mockSetSubscribeValue({ provider: undefined, signer: undefined, address: '0x123' });
        vi.mock('$lib/data-stores/walletProviderStore', async () => {
            return {
                walletStore,
            }
        });
        vi.mock('$lib/data-stores/chainProviderStore', async () => {
            return {
                chainConfigStore,
                chainStore
            }
        });
    });

    const mockFn = vi.fn();
    it(`render's proeprly`, () => {
        const { container } = render(DisconnectWalletModal, {
            props: {
                modalFor: 'id-testing',
                disconnect: () => { }
            }
        });
        expect(container).toMatchSnapshot();
    })
    it(`on logout disconnect is being called.`, async () => {

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
    })
    it('has the correct "View on <Block Explorer>" link', () => {
        const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
        const viewLink = getByText(`View on Block Explorer`).closest('a');
        expect(viewLink?.getAttribute('href')).toBe('https://blockexplorer.com/address/0x123');
    });

    it('displays the wallet address from the store', async () => {
        const { getByText } = render(DisconnectWalletModal, { modalFor: 'wallet', disconnect: mockFn });
        expect(getByText('0x123')).toBeTruthy();
    });
})