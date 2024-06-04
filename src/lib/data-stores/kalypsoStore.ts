import type { Address, KalypsoStore } from '$lib/types/storeTypes';
import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const kalypsoStore: Writable<KalypsoStore> = writable(DEFAULT_KALYPSO_STORE);

export function registerInKalypsoStore(
	rewardsAddress: Address,
	stakedAmount: bigint,
	declaredCompute: bigint,
	generatorData: string
) {
	kalypsoStore.update((state) => {
		return {
			...state,
			registered: true,
			stakingDetails: {
				rewardsAddress: rewardsAddress,
				stakedAmount: stakedAmount,
				declaredCompute: declaredCompute,
				generatorData: generatorData
			}
		};
	});
}

export function unregisterInKalypsoStore() {
	kalypsoStore.update(() => {
		return {
			...DEFAULT_KALYPSO_STORE
		};
	});
}

export function updateApprovedFundsInKalypsoStore(amount: bigint) {
	kalypsoStore.update((state) => {
		return {
			...state,
			approvedAmount: amount > state.approvedAmount ? amount : state.approvedAmount
		};
	});
}
