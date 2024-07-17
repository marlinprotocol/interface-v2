import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	bridgeStore,
	resetBridgeStore,
	initializeBridgeStore,
	updateMpondAllowanceInBridgeStore,
	decreaseMpondAllowanceInBridgeStore,
	updatePondAllowanceInBridgeStore,
	decreasePondAllowanceInBridgeStore
} from './bridgeStore';
import { DEFAULT_BRIDGE_STORE } from '$lib/utils/constants/storeDefaults';

describe('bridgeStore', () => {
	beforeEach(() => {
		resetBridgeStore();
	});

	it('should have correct initial value', () => {
		expect(get(bridgeStore)).toEqual(DEFAULT_BRIDGE_STORE);
	});

	it('should initialize correctly', () => {
		const allowances = { pond: 100n, mPond: 200n };
		const requestedMPond = 50n;
		initializeBridgeStore(allowances, requestedMPond);
		expect(get(bridgeStore)).toEqual({
			allowances,
			requestedMPond
		});
	});

	it('should update mPond allowance correctly', () => {
		initializeBridgeStore({ pond: 100n, mPond: 200n }, 50n);
		updateMpondAllowanceInBridgeStore(300n);
		expect(get(bridgeStore).allowances.mPond).toBe(300n);

		updateMpondAllowanceInBridgeStore(150n);
		expect(get(bridgeStore).allowances.mPond).toBe(300n);
	});

	it('should decrease mPond allowance correctly', () => {
		initializeBridgeStore({ pond: 100n, mPond: 200n }, 50n);
		decreaseMpondAllowanceInBridgeStore(50n);
		expect(get(bridgeStore).allowances.mPond).toBe(150n);
	});

	it('should update pond allowance correctly', () => {
		initializeBridgeStore({ pond: 100n, mPond: 200n }, 50n);
		updatePondAllowanceInBridgeStore(150n);
		expect(get(bridgeStore).allowances.pond).toBe(150n);

		updatePondAllowanceInBridgeStore(80n);
		expect(get(bridgeStore).allowances.pond).toBe(150n);
	});

	it('should decrease pond allowance correctly', () => {
		initializeBridgeStore({ pond: 100n, mPond: 200n }, 50n);
		decreasePondAllowanceInBridgeStore(30n);
		expect(get(bridgeStore).allowances.pond).toBe(70n);
	});
});
