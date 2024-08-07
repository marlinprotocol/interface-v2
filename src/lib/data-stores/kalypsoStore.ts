import type { Address, KalypsoStore } from '$lib/types/storeTypes';
import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const kalypsoStore: Writable<KalypsoStore> = writable(DEFAULT_KALYPSO_STORE);

export function registerInKalypsoStore(
	rewardsAddress: Address,
	declaredCompute: bigint,
	stakedAmount: bigint,
	generatorData: string,
	sumOfComputeAllocations: bigint,
	decreaseComputeData: { initiated: boolean; compute: bigint },
	decreaseStakeData: { initiated: boolean; withdrawAmount: bigint }
) {
	kalypsoStore.update((state) => {
		return {
			...state,
			registered: true,
			decreaseDeclaredCompute: {
				initiated: decreaseComputeData.initiated,
				compute: decreaseComputeData.compute,
				endEpochTime: 0
			},
			decreaseStake: {
				initiated: decreaseStakeData.initiated,
				withdrawAmount: decreaseStakeData.withdrawAmount,
				endEpochTime: 0
			},
			stakingDetails: {
				rewardsAddress: rewardsAddress,
				stakedAmount: stakedAmount,
				declaredCompute: declaredCompute,
				generatorData: generatorData,
				sumOfComputeAllocations: sumOfComputeAllocations
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

export function setBlockMetadataInKalypsoStore(
	blockMineTime: number,
	numberOfBlocksToWait: number
) {
	kalypsoStore.update((state) => {
		return {
			...state,
			blockMetadata: {
				blockMineTime: blockMineTime,
				numberOfBlocksToWait: numberOfBlocksToWait
			}
		};
	});
}

export function updateApprovedFundsInKalypsoStore(amount: bigint) {
	kalypsoStore.update((state: KalypsoStore) => {
		return {
			...state,
			approvedAmount: amount > state.approvedAmount ? amount : state.approvedAmount
		};
	});
}

export function reduceApprovedFundsInKalypsoStore(amount: bigint) {
	kalypsoStore.update((state: KalypsoStore) => {
		return {
			...state,
			approvedAmount: state.approvedAmount - amount
		};
	});
}

export function updateRewardAddressInKalypsoStore(rewardAddress: Address) {
	kalypsoStore.update((state: KalypsoStore) => {
		return {
			...state,
			stakingDetails: {
				...state.stakingDetails,
				rewardsAddress: rewardAddress
			}
		};
	});
}

export function increaseStakeInKalypsoStore(stakedAmount: bigint) {
	kalypsoStore.update((state: KalypsoStore) => {
		return {
			...state,
			stakingDetails: {
				...state.stakingDetails,
				stakedAmount: state.stakingDetails.stakedAmount + stakedAmount
			}
		};
	});
}

export function decreaseStakeInKalypsoStore(withdrawAmount: bigint) {
	kalypsoStore.update((state: KalypsoStore) => {
		return {
			...state,
			decreaseStake: {
				...DEFAULT_KALYPSO_STORE.decreaseStake
			},

			stakingDetails: {
				...state.stakingDetails,
				stakedAmount: state.stakingDetails.stakedAmount - withdrawAmount
			}
		};
	});
}

export function initiateDecreaseStakeInKalypsoStore(withdrawAmount: bigint, endEpochTime: number) {
	kalypsoStore.update((state) => {
		return {
			...state,
			decreaseStake: {
				initiated: true,
				withdrawAmount: withdrawAmount,
				endEpochTime: endEpochTime
			}
		};
	});
}

export function increaseDeclaredComputeInKalypsoStore(declaredCompute: bigint) {
	kalypsoStore.update((state) => {
		return {
			...state,
			stakingDetails: {
				...state.stakingDetails,
				declaredCompute: state.stakingDetails.declaredCompute + declaredCompute
			}
		};
	});
}

export function decreaseDeclaredComputeInKalypsoStore() {
	kalypsoStore.update((state) => {
		return {
			...state,
			decreaseDeclaredCompute: {
				...DEFAULT_KALYPSO_STORE.decreaseDeclaredCompute
			},
			stakingDetails: {
				...state.stakingDetails,
				declaredCompute:
					state.stakingDetails.declaredCompute - state.decreaseDeclaredCompute.compute
			}
		};
	});
}

export function initiateDecreaseDeclaredComputeInKalypsoStore(
	declaredCompute: bigint,
	endEpochTime: number
) {
	kalypsoStore.update((state) => {
		return {
			...state,
			decreaseDeclaredCompute: {
				initiated: true,
				compute: declaredCompute,
				endEpochTime: endEpochTime
			}
		};
	});
}

export function switchStakeTabInKalypsoStore(tab: KalypsoStore['activeStakeTab']) {
	kalypsoStore.update((state) => {
		return {
			...state,
			activeStakeTab: tab
		};
	});
}

export function switchComputeTabInKalypsoStore(tab: KalypsoStore['activeComputeTab']) {
	kalypsoStore.update((state) => {
		return {
			...state,
			activeComputeTab: tab
		};
	});
}
