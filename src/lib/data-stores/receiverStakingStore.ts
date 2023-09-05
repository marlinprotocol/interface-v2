import type { ReceiverStakingData } from '$lib/types/storeTypes';
import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
import { getCurrentEpochCycle } from '$lib/utils/helpers/commonHelper';

import { writable, type Writable } from 'svelte/store';

/**
 * receiver staked data store holds signer, epoch data and various balances
 * for receiver staking
 */
export const receiverStakingStore: Writable<ReceiverStakingData> = writable(
	DEFAULT_RECEIVER_STAKING_DATA
);

/**
 * reset receiverStakingStore to its default value.
 */
export function resetReceiverStakingStore(): void {
	receiverStakingStore.set(DEFAULT_RECEIVER_STAKING_DATA);
}

export function updateSignerAddressInReceiverStakingStore(signerAddress: string): void {
	receiverStakingStore.update((store) => {
		store.signer = signerAddress;
		return store;
	});
}

export function updateAllowanceInReceiverStakingStore(newAllowance: bigint): void {
	receiverStakingStore.update((store) => {
		store.approvedBalance =
			store.approvedBalance < newAllowance ? newAllowance : store.approvedBalance;
		return store;
	});
}

export function addStakedBalanceInReceiverStakingStore(inputAmount: bigint): void {
	// if epoch startTime is less than current time, update queued balance else staked balance
	receiverStakingStore.update((value: ReceiverStakingData) => {
		const {
			epochData: { startTime, epochLength }
		} = value;
		const currentTime = Date.now() / 1000;
		const epochCycle = getCurrentEpochCycle(startTime, epochLength);

		return {
			...value,
			epochData: {
				...value.epochData,
				epochCycle
			},
			queuedBalance:
				startTime < currentTime ? value.queuedBalance + inputAmount : value.queuedBalance,
			stakedBalance:
				startTime < currentTime ? value.stakedBalance : value.stakedBalance + inputAmount,
			approvedBalance: value.approvedBalance - inputAmount
		};
	});
}

export function withdrawStakedBalanceFromReceiverStakingStore(inputAmount: bigint) {
	//substract input amount first from queued amount and then from staked amount
	receiverStakingStore.update((value) => {
		if (inputAmount > value.queuedBalance) {
			value.stakedBalance = value.stakedBalance - (inputAmount - value.queuedBalance);
			value.queuedBalance = BIG_NUMBER_ZERO;
		} else {
			value.queuedBalance = value.queuedBalance - inputAmount;
		}
		return value;
	});
}

export function updateEpochOnTimerEndInReceiverStakingStore() {
	receiverStakingStore.update((value) => {
		return {
			...value,
			queuedBalance: BIG_NUMBER_ZERO,
			stakedBalance: value.stakedBalance + value.queuedBalance,
			epochData: {
				...value.epochData,
				epochCycle: value.epochData.epochCycle + 1
			}
		};
	});
}

export function initializeReceiverStakingStore(data: ReceiverStakingData) {
	receiverStakingStore.set(data);
}
