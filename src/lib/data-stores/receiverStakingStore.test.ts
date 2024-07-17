import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
	receiverStakingStore,
	resetReceiverStakingStore,
	updateSignerAddressInReceiverStakingStore,
	updateAllowanceInReceiverStakingStore,
	addStakedBalanceInReceiverStakingStore,
	withdrawStakedBalanceFromReceiverStakingStore,
	updateEpochOnTimerEndInReceiverStakingStore,
	initializeReceiverStakingStore
} from './receiverStakingStore';
import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';

vi.mock('$lib/utils/helpers/commonHelper', () => ({
	getCurrentEpochCycle: vi.fn(() => 1)
}));

describe('receiverStakingStore', () => {
	beforeEach(() => {
		resetReceiverStakingStore();
		vi.useFakeTimers();
	});

	it('should have correct initial value', () => {
		expect(get(receiverStakingStore)).toEqual(DEFAULT_RECEIVER_STAKING_DATA);
	});

	it('should update signer address correctly', () => {
		updateSignerAddressInReceiverStakingStore('0x123');
		expect(get(receiverStakingStore).signer).toBe('0x123');
	});

	it('should update allowance correctly', () => {
		updateAllowanceInReceiverStakingStore(100n);
		expect(get(receiverStakingStore).approvedBalance).toBe(100n);

		updateAllowanceInReceiverStakingStore(50n);
		expect(get(receiverStakingStore).approvedBalance).toBe(100n);
	});

	it('should add staked balance correctly when epoch has not started', () => {
		vi.setSystemTime(new Date('2023-01-01'));
		const initialData = {
			...DEFAULT_RECEIVER_STAKING_DATA,
			epochData: { startTime: 1672531200, epochLength: 86400, epochCycle: 0 },
			stakedBalance: 100n,
			queuedBalance: 50n,
			approvedBalance: 200n
		};
		initializeReceiverStakingStore(initialData);

		addStakedBalanceInReceiverStakingStore(75n);
		const updatedStore = get(receiverStakingStore);
		expect(updatedStore.stakedBalance).toBe(175n);
		expect(updatedStore.queuedBalance).toBe(50n);
		expect(updatedStore.approvedBalance).toBe(125n);
	});

	it('should add staked balance correctly when epoch has started', () => {
		vi.setSystemTime(new Date('2023-01-02'));
		const initialData = {
			...DEFAULT_RECEIVER_STAKING_DATA,
			epochData: { startTime: 1672531200, epochLength: 86400, epochCycle: 0 },
			stakedBalance: 100n,
			queuedBalance: 50n,
			approvedBalance: 200n
		};
		initializeReceiverStakingStore(initialData);

		addStakedBalanceInReceiverStakingStore(75n);
		const updatedStore = get(receiverStakingStore);
		expect(updatedStore.stakedBalance).toBe(100n);
		expect(updatedStore.queuedBalance).toBe(125n);
		expect(updatedStore.approvedBalance).toBe(125n);
	});

	it('should withdraw staked balance correctly', () => {
		initializeReceiverStakingStore({
			...DEFAULT_RECEIVER_STAKING_DATA,
			stakedBalance: 100n,
			queuedBalance: 50n
		});

		withdrawStakedBalanceFromReceiverStakingStore(75n);
		const updatedStore = get(receiverStakingStore);
		expect(updatedStore.stakedBalance).toBe(75n);
		expect(updatedStore.queuedBalance).toBe(0n);
	});

	it('should update epoch on timer end correctly', () => {
		initializeReceiverStakingStore({
			...DEFAULT_RECEIVER_STAKING_DATA,
			stakedBalance: 100n,
			queuedBalance: 50n,
			epochData: { startTime: 0, epochLength: 0, epochCycle: 1 }
		});

		updateEpochOnTimerEndInReceiverStakingStore();
		const updatedStore = get(receiverStakingStore);
		expect(updatedStore.stakedBalance).toBe(150n);
		expect(updatedStore.queuedBalance).toBe(0n);
		expect(updatedStore.epochData.epochCycle).toBe(2);
	});
});
