import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ChainSwitcher from './ChainSwitcher.svelte';

const {
	web3WalletStore,
	walletStore,
	chainStore,
	chainConfigStore,
	connected,
	allowedChainsStore
} = await vi.hoisted(() => import('$lib/data-stores/mock-data-stores/mockStores'));

beforeAll(() => {
	vi.mock('$lib/data-stores/walletProviderStore', async () => {
		return {
			web3WalletStore,
			walletStore,
			connected
		};
	});
	vi.mock('$lib/data-stores/chainProviderStore', async () => {
		return {
			chainStore,
			chainConfigStore,
			allowedChainsStore
		};
	});
});

describe('ChainSwitcher', () => {
	it("render's the component properly", async () => {
		const { container } = render(ChainSwitcher);
		expect(container).toMatchSnapshot();
	});

	it('displays the correct chain image', async () => {
		chainStore.mockSetSubscribeValue({
			chainDisplayName: '',
			chainId: 43,
			chainImage: '/images/arbitrum.webp',
			chainName: '',
			isValidChain: true
		});

		const { getByAltText, findByRole } = render(ChainSwitcher);
		const button = await findByRole('button');
		await button.click(); // Wait for the button and then click it

		const chainLogo = getByAltText('Chain Logo');
		expect(chainLogo.getAttribute('src')).toBe('/images/arbitrum.webp');
	});
});
