import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ChainSwitcher from './ChainSwitcher.svelte';

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

describe('ChainSwitcher', () => {

    it(`render's the component properly`, async () => {
        const { container } = render(ChainSwitcher);
        expect(container).toMatchSnapshot();
    });

    it('displays correct the chain image', async () => {
        chainStore.mockSetSubscribeValue({ chainDisplayName: '', chainId: 43, chainImage: '/src/example.png', chainName: '', isValidChain: true })
        const { getByAltText } = render(ChainSwitcher);
        expect(getByAltText('current chain').getAttribute('src')).toBe('/src/example.png')
    });

    it(`render's the dark mode classes`, async () => {
        const { container } = render(ChainSwitcher, { props: { isDark: true } });
        expect(container).toMatchSnapshot();
    });

});