import { render } from '@testing-library/svelte';
import DisconnectWalletButton from './DisconnectWalletButton.svelte';
import { tick } from 'svelte';

const { web3WalletStore, walletStore, chainStore, chainConfigStore, connected, allowedChainsStore } = await vi.hoisted(() => import('$lib/data-stores/mock-data-stores/mockStores'));


beforeAll(() => {
    vi.mock('$lib/data-stores/walletProviderStore', async () => {
        return {
            web3WalletStore,
            walletStore,
            connected,
        }
    });
    vi.mock('$lib/data-stores/chainProviderStore', async () => {
        return {
            chainStore,
            chainConfigStore,
            allowedChainsStore
        }
    });
});

describe('DisconnectWalletButton', () => {
    it('renders the DisconnectWalletButton component properly', () => {
        const { container } = render(DisconnectWalletButton);
        expect(container).toMatchSnapshot();
    });

    it('shows correct chain, address, metamask logo and shortAddress', async () => {
        const testAddress = '0xDEADBEEF12345678901234567890123456789012';
        const { getByAltText, getByText } = render(DisconnectWalletButton, { props: { lastAddress: '0x123...' } });
        const image = getByAltText('Metamask Logo');
        walletStore.mockSetSubscribeValue({ address: testAddress, provider: undefined, signer: undefined });
        chainStore.mockSetSubscribeValue({ chainDisplayName: 'display-name', chainId: 39, chainName: '', isValidChain: true, chainImage: '' });
        const shortenAddress = testAddress.slice(0, 6) + '...' + testAddress.slice(38);
        await tick();
        expect(getByText(testAddress)).toBeTruthy();
        expect(getByText(shortenAddress)).toBeTruthy();
        expect(getByText('DISPLAY-NAME')).toBeTruthy();
        expect(image).toBeTruthy();
    });
})

