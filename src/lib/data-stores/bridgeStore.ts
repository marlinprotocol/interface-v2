import type { BridgeStore } from '$lib/types/storeTypes';
import { DEFAULT_BRIDGE_STORE } from '$lib/utils/constants/storeDefaults';

import { writable, type Writable } from 'svelte/store';

export const bridgeStore: Writable<BridgeStore> = writable(DEFAULT_BRIDGE_STORE);

/**
 * Resets the bridgeStore to its default value.
 */
export function resetBridgeStore() {
	bridgeStore.set(DEFAULT_BRIDGE_STORE);
}

export function initializeBridgeStore(
	allowances: {
		pond: bigint;
		mPond: bigint;
	},
	requestedMPond: bigint
) {
	bridgeStore.set({
		allowances: {
			pond: allowances.pond,
			mPond: allowances.mPond
		},
		requestedMPond: requestedMPond
	});
}

export function updateMpondAllowanceInBridgeStore(newAllowance: bigint) {
	bridgeStore.update((store) => {
		store.allowances.mPond =
			store.allowances.mPond < newAllowance ? newAllowance : store.allowances.mPond;
		return store;
	});
}

export function decreaseMpondAllowanceInBridgeStore(decreaseBy: bigint) {
	bridgeStore.update((store) => {
		store.allowances.mPond = store.allowances.mPond - decreaseBy;
		return store;
	});
}

export function updatePondAllowanceInBridgeStore(newAllowance: bigint) {
	bridgeStore.update((store) => {
		store.allowances.pond =
			store.allowances.pond < newAllowance ? newAllowance : store.allowances.pond;
		return store;
	});
}

export function decreasePondAllowanceInBridgeStore(decreaseBy: bigint) {
	bridgeStore.update((store) => {
		store.allowances.pond = store.allowances.pond - decreaseBy;
		return store;
	});
}
