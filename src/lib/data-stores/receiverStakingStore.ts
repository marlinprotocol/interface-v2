import { getReceiverStakingDataFromSubgraph } from '$lib/controllers/subgraphController';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import type { Address, ReceiverStakingData } from '$lib/types/storeTypes';
import {
	DEFAULT_RECEIVER_STAKING_DATA,
	DEFAULT_WALLET_STORE
} from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';
import { epochStore } from './epochStore';

let walletAddress: Address = DEFAULT_WALLET_STORE.address;

const defaultValue = DEFAULT_RECEIVER_STAKING_DATA;
// receiver staked data store
export const receiverStakingStore: Writable<ReceiverStakingData> = writable(defaultValue);

// subcription to walletStore allows us to fetch
// receiver staked balance, queued data when the user has a valid wallet address
walletStore.subscribe(async (value) => {
	walletAddress = value.address;
	if (walletAddress !== DEFAULT_WALLET_STORE.address) {
		try {
			epochStore.subscribe(async (epoch) => {
				const data: ReceiverStakingData = await getReceiverStakingDataFromSubgraph(
					walletAddress,
					epoch.epochCycle
				);
				receiverStakingStore.set(data);
			});
		} catch (e) {
			//TODO: show error message to user
			console.error(e);
		}
	}
});

/**
 * Reset receiver staked data to its default value.
 */
export function resetReceiverStakingStore(): void {
	receiverStakingStore.set(defaultValue);
}
