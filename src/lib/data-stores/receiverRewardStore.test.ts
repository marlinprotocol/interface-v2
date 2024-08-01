import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	receiverRewardsStore,
	resetReceiverRewardsStore,
	updateAmountApprovedInReceiverRewardsStore,
	updateTicketRewardsInReceiverRewardsStore,
	addRewardBalanceInReceiverRewardsStore,
	initiateReceiverRewardsInReceiverRewardsStore
} from './receiverRewardsStore';
import { DEFAULT_RECEIVER_REWARDS_STORE } from '$lib/utils/constants/storeDefaults';
import type { ReceiverRewardsStore } from '$lib/types/storeTypes';

describe('receiverRewardsStore', () => {
	beforeEach(() => {
		resetReceiverRewardsStore();
	});

	it('should have correct initial value', () => {
		expect(get(receiverRewardsStore)).toEqual(DEFAULT_RECEIVER_REWARDS_STORE);
	});

	it('should reset to default value', () => {
		receiverRewardsStore.set({
			amountApproved: 100n,
			rewardBalance: 50n,
			rewardPerEpoch: 10n
		} as ReceiverRewardsStore);
		resetReceiverRewardsStore();
		expect(get(receiverRewardsStore)).toEqual(DEFAULT_RECEIVER_REWARDS_STORE);
	});

	it('should update amountApproved correctly', () => {
		updateAmountApprovedInReceiverRewardsStore(200n);
		expect(get(receiverRewardsStore).amountApproved).toBe(200n);
	});

	it('should update rewardPerEpoch correctly', () => {
		updateTicketRewardsInReceiverRewardsStore(30n);
		expect(get(receiverRewardsStore).rewardPerEpoch).toBe(30n);
	});

	it('should add reward balance correctly', () => {
		receiverRewardsStore.set({
			amountApproved: 100n,
			rewardBalance: 50n,
			rewardPerEpoch: 10n
		} as ReceiverRewardsStore);
		addRewardBalanceInReceiverRewardsStore(20n);
		const store = get(receiverRewardsStore);
		expect(store.amountApproved).toBe(80n);
		expect(store.rewardBalance).toBe(70n);
	});

	it('should initiate receiver rewards correctly', () => {
		receiverRewardsStore.set({
			amountApproved: 100n,
			rewardBalance: 50n,
			rewardPerEpoch: 10n
		} as ReceiverRewardsStore);
		initiateReceiverRewardsInReceiverRewardsStore(20n, 5n);
		const store = get(receiverRewardsStore);
		expect(store.amountApproved).toBe(80n);
		expect(store.rewardBalance).toBe(70n);
		expect(store.rewardPerEpoch).toBe(15n);
	});
});
