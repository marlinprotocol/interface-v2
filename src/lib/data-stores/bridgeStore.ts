import type { BridgeStore } from '$lib/types/storeTypes';
import { DEFAULT_BRIDGE_STORE } from '$lib/utils/constants/storeDefaults';
import type { BigNumber } from 'ethers';
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
		pond: BigNumber;
		mPond: BigNumber;
	},
	requestedMPond: BigNumber
) {
	bridgeStore.set({
		allowances: {
			pond: allowances.pond,
			mPond: allowances.mPond
		},
		requestedMPond: requestedMPond
	});
}

export function updateMpondAllowanceInBridgeStore(newAllowance: BigNumber) {
	bridgeStore.update((store) => {
		store.allowances.mPond = store.allowances.mPond.lt(newAllowance)
			? newAllowance
			: store.allowances.mPond;
		return store;
	});
}

export function decreaseMpondAllowanceInBridgeStore(decreaseBy: BigNumber) {
	bridgeStore.update((store) => {
		store.allowances.mPond = store.allowances.mPond.sub(decreaseBy);
		return store;
	});
}

export function updatePondAllowanceInBridgeStore(newAllowance: BigNumber) {
	bridgeStore.update((store) => {
		store.allowances.pond = store.allowances.pond.lt(newAllowance)
			? newAllowance
			: store.allowances.pond;
		return store;
	});
}

export function decreasePondAllowanceInBridgeStore(decreaseBy: BigNumber) {
	bridgeStore.update((store) => {
		store.allowances.pond = store.allowances.pond.sub(decreaseBy);
		return store;
	});
}
