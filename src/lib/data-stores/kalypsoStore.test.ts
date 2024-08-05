import { get } from 'svelte/store';
import {
	kalypsoStore,
	registerInKalypsoStore,
	unregisterInKalypsoStore,
	setBlockMetadataInKalypsoStore,
	updateApprovedFundsInKalypsoStore,
	reduceApprovedFundsInKalypsoStore,
	updateRewardAddressInKalypsoStore,
	increaseStakeInKalypsoStore,
	decreaseStakeInKalypsoStore,
	initiateDecreaseStakeInKalypsoStore,
	increaseDeclaredComputeInKalypsoStore,
	decreaseDeclaredComputeInKalypsoStore,
	initiateDecreaseDeclaredComputeInKalypsoStore,
	switchStakeTabInKalypsoStore,
	switchComputeTabInKalypsoStore
} from './kalypsoStore';
import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
import type { Address, KalypsoStore } from '$lib/types/storeTypes';
import { describe, it, expect, beforeEach } from 'vitest';

describe('kalypsoStore', () => {
	beforeEach(() => {
		kalypsoStore.set(DEFAULT_KALYPSO_STORE);
	});

	it('should register in kalypso store', () => {
		const rewardsAddress: Address = '0x123';
		const declaredCompute = BigInt(1000);
		const stakedAmount = BigInt(500);
		const generatorData = 'data';
		const sumOfComputeAllocations = BigInt(2000);
		const decreaseComputeData = { initiated: true, compute: BigInt(100) };
		const decreaseStakeData = { initiated: true, withdrawAmount: BigInt(50) };

		registerInKalypsoStore(
			rewardsAddress,
			declaredCompute,
			stakedAmount,
			generatorData,
			sumOfComputeAllocations,
			decreaseComputeData,
			decreaseStakeData
		);

		const state = get(kalypsoStore);
		expect(state.registered).toBe(true);
		expect(state.stakingDetails.rewardsAddress).toBe(rewardsAddress);
		expect(state.stakingDetails.declaredCompute).toBe(declaredCompute);
		expect(state.stakingDetails.stakedAmount).toBe(stakedAmount);
		expect(state.stakingDetails.generatorData).toBe(generatorData);
		expect(state.stakingDetails.sumOfComputeAllocations).toBe(sumOfComputeAllocations);
		expect(state.decreaseDeclaredCompute.initiated).toBe(decreaseComputeData.initiated);
		expect(state.decreaseDeclaredCompute.compute).toBe(decreaseComputeData.compute);
		expect(state.decreaseStake.initiated).toBe(decreaseStakeData.initiated);
		expect(state.decreaseStake.withdrawAmount).toBe(decreaseStakeData.withdrawAmount);
	});

	it('should unregister in kalypso store', () => {
		unregisterInKalypsoStore();
		const state = get(kalypsoStore);
		expect(state).toEqual(DEFAULT_KALYPSO_STORE);
	});

	it('should set block metadata in kalypso store', () => {
		const blockMineTime = 123456;
		const numberOfBlocksToWait = 10;

		setBlockMetadataInKalypsoStore(blockMineTime, numberOfBlocksToWait);

		const state = get(kalypsoStore);
		expect(state.blockMetadata.blockMineTime).toBe(blockMineTime);
		expect(state.blockMetadata.numberOfBlocksToWait).toBe(numberOfBlocksToWait);
	});

	it('should update approved funds in kalypso store', () => {
		const amount = BigInt(1000);

		updateApprovedFundsInKalypsoStore(amount);

		const state = get(kalypsoStore);
		expect(state.approvedAmount).toBe(amount);
	});

	it('should reduce approved funds in kalypso store', () => {
		const initialAmount = BigInt(1000);
		kalypsoStore.update((state) => ({ ...state, approvedAmount: initialAmount }));

		const amount = BigInt(500);
		reduceApprovedFundsInKalypsoStore(amount);

		const state = get(kalypsoStore);
		expect(state.approvedAmount).toBe(initialAmount - amount);
	});

	it('should update reward address in kalypso store', () => {
		const rewardAddress: Address = '0x456';

		updateRewardAddressInKalypsoStore(rewardAddress);

		const state = get(kalypsoStore);
		expect(state.stakingDetails.rewardsAddress).toBe(rewardAddress);
	});

	it('should increase stake in kalypso store', () => {
		const initialStake = BigInt(1000);
		kalypsoStore.update((state) => ({
			...state,
			stakingDetails: { ...state.stakingDetails, stakedAmount: initialStake }
		}));

		const stakedAmount = BigInt(500);
		increaseStakeInKalypsoStore(stakedAmount);

		const state = get(kalypsoStore);
		expect(state.stakingDetails.stakedAmount).toBe(initialStake + stakedAmount);
	});

	it('should decrease stake in kalypso store', () => {
		const initialStake = BigInt(1000);
		kalypsoStore.update((state) => ({
			...state,
			stakingDetails: { ...state.stakingDetails, stakedAmount: initialStake }
		}));

		const withdrawAmount = BigInt(500);
		decreaseStakeInKalypsoStore(withdrawAmount);

		const state = get(kalypsoStore);
		expect(state.stakingDetails.stakedAmount).toBe(initialStake - withdrawAmount);
	});

	it('should initiate decrease stake in kalypso store', () => {
		const withdrawAmount = BigInt(500);
		const endEpochTime = 123456;

		initiateDecreaseStakeInKalypsoStore(withdrawAmount, endEpochTime);

		const state = get(kalypsoStore);
		expect(state.decreaseStake.initiated).toBe(true);
		expect(state.decreaseStake.withdrawAmount).toBe(withdrawAmount);
		expect(state.decreaseStake.endEpochTime).toBe(endEpochTime);
	});

	it('should increase declared compute in kalypso store', () => {
		const initialCompute = BigInt(1000);
		kalypsoStore.update((state) => ({
			...state,
			stakingDetails: { ...state.stakingDetails, declaredCompute: initialCompute }
		}));

		const declaredCompute = BigInt(500);
		increaseDeclaredComputeInKalypsoStore(declaredCompute);

		const state = get(kalypsoStore);
		expect(state.stakingDetails.declaredCompute).toBe(initialCompute + declaredCompute);
	});

	it('should decrease declared compute in kalypso store', () => {
		const initialCompute = BigInt(1000);
		const decreaseCompute = BigInt(500);
		kalypsoStore.update((state) => ({
			...state,
			stakingDetails: { ...state.stakingDetails, declaredCompute: initialCompute },
			decreaseDeclaredCompute: { initiated: true, compute: decreaseCompute, endEpochTime: 0 }
		}));

		decreaseDeclaredComputeInKalypsoStore();

		const state = get(kalypsoStore);
		expect(state.stakingDetails.declaredCompute).toBe(initialCompute - decreaseCompute);
	});

	it('should initiate decrease declared compute in kalypso store', () => {
		const declaredCompute = BigInt(500);
		const endEpochTime = 123456;

		initiateDecreaseDeclaredComputeInKalypsoStore(declaredCompute, endEpochTime);

		const state = get(kalypsoStore);
		expect(state.decreaseDeclaredCompute.initiated).toBe(true);
		expect(state.decreaseDeclaredCompute.compute).toBe(declaredCompute);
		expect(state.decreaseDeclaredCompute.endEpochTime).toBe(endEpochTime);
	});

	it('should switch stake tab in kalypso store', () => {
		const tab: KalypsoStore['activeStakeTab'] = 'add';

		switchStakeTabInKalypsoStore(tab);

		const state = get(kalypsoStore);
		expect(state.activeStakeTab).toBe(tab);
	});

	it('should switch compute tab in kalypso store', () => {
		const tab: KalypsoStore['activeComputeTab'] = 'increase';

		switchComputeTabInKalypsoStore(tab);

		const state = get(kalypsoStore);
		expect(state.activeComputeTab).toBe(tab);
	});
});
