import type { EpochCycleStore } from '$lib/types/storeTypes';
import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';
import { receiverStakingStore } from './receiverStakingStore';
import { addToast } from './toastStore';

const defaultValue = DEFAULT_RECEIVER_STAKING_DATA.epochData.epochCycle;
// receiver staked data store
export const epochCycleStore: Writable<EpochCycleStore> = writable(defaultValue);

// subcription to walletStore allows us to fetch
// receiver staked balance, queued data when the user has a valid wallet address
receiverStakingStore.subscribe(async (value) => {
	try {
		const data: EpochCycleStore = value.epochData.epochCycle;
		epochCycleStore.set(data);
	} catch (e) {
		addToast({
			message: 'Error fetching epoch cycle data',
			variant: 'error'
		});
		console.error(e);
	}
});

/**
 * Reset receiver staked data to its default value.
 */
export function resetEpochCycleStore(): void {
	epochCycleStore.set(defaultValue);
}
