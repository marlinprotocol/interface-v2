import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
	chainStore,
	allowedChainsStore,
	chainConfigStore,
	resetAllowedChainsStore,
	setAllowedChainsStore,
	resetChainStore,
	initializeChainStore,
	updateChainStore,
	chainIdHasChanged
} from './chainProviderStore';
import { DEFAULT_CHAIN_STORE } from '$lib/utils/constants/storeDefaults';

// Mock the environment
vi.mock('$lib/data-stores/environment', () => ({
	environment: {
		default_chain_id: 1,
		valid_chains: {
			1: { chain_name: 'Ethereum', chain_image: 'eth.png' },
			2: { chain_name: 'Polygon', chain_image: 'polygon.png' }
		}
	}
}));

describe('chainProviderStore', () => {
	beforeEach(() => {
		resetChainStore();
		resetAllowedChainsStore();
	});

	it('chainStore initial value', () => {
		expect(get(chainStore)).toEqual(DEFAULT_CHAIN_STORE);
	});

	it('allowedChainsStore initial value', () => {
		expect(get(allowedChainsStore)).toEqual([1]);
	});

	it('chainConfigStore derived store', () => {
		initializeChainStore(1, 'Ethereum', true);
		expect(get(chainConfigStore)).toEqual({ chain_name: 'Ethereum', chain_image: 'eth.png' });

		initializeChainStore(999, 'Invalid Chain', false);
		expect(get(chainConfigStore)).toEqual({ chain_name: 'Ethereum', chain_image: 'eth.png' });
	});

	it('setAllowedChainsStore', () => {
		setAllowedChainsStore([1, 2]);
		expect(get(allowedChainsStore)).toEqual([1, 2]);
	});

	it('initializeChainStore', () => {
		initializeChainStore(2, 'Polygon', true);
		expect(get(chainStore)).toEqual({
			chainId: 2,
			chainName: 'Polygon',
			chainDisplayName: 'Polygon',
			chainImage: 'polygon.png',
			isValidChain: true
		});
	});

	it('updateChainStore', () => {
		updateChainStore(2);
		expect(get(chainStore)).toEqual({
			chainId: 2,
			chainName: 'Polygon',
			chainDisplayName: 'Polygon',
			chainImage: 'polygon.png',
			isValidChain: expect.any(Boolean)
		});
	});

	it('chainIdHasChanged', () => {
		expect(chainIdHasChanged(1, 2)).toBe(true);
		expect(chainIdHasChanged(1, 1)).toBe(false);
		expect(chainIdHasChanged(null, 1)).toBe(false);
		expect(chainIdHasChanged(1, null)).toBe(true);
	});
});
