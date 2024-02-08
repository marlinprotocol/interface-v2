
import { render } from '@testing-library/svelte';
import HeaderConnectWallet from './HeaderConnectWallet.svelte';
import { tick } from 'svelte';

const { connected, web3WalletStore, walletStore } = await vi.hoisted(() => import('$lib/data-stores/mock-data-stores/mockStores'));


beforeAll(() => {
    vi.mock('$lib/data-stores/walletProviderStore', async () => {
        return {
            connected,
            web3WalletStore,
            walletStore,
        }
    });
});


describe('HeaderConnectWallet', () => {
    test('renders the Header Links Group component properly', () => {
        const { container } = render(HeaderConnectWallet);
        expect(container).toMatchSnapshot();
    });

    it(`render's ConnectWalletButton if wallet is not connected`, () => {
        connected.mockSetSubscribeValue(false);
        const { container, getByTestId } = render(HeaderConnectWallet);
        expect(container).toMatchSnapshot();
        expect(getByTestId('connect-wallet-button')).toBeTruthy();
    })

    it(`render's DisconnectWalletButton if wallet is not connected`, () => {
        connected.mockSetSubscribeValue(true);
        const { container, getByTestId } = render(HeaderConnectWallet);
        expect(container).toMatchSnapshot();
        expect(getByTestId('disconnect-wallet-button')).toBeTruthy();
    })

    it(`toggle between connected and disconnect state and render proper components.`, async () => {
        connected.mockSetSubscribeValue(true);
        const { getByTestId } = render(HeaderConnectWallet);
        expect(getByTestId('disconnect-wallet-button')).toBeTruthy();
        connected.mockSetSubscribeValue(false);
        await tick();
        expect(getByTestId('connect-wallet-button')).toBeTruthy();

    })
})