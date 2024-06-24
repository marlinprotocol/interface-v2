import {
	decreaseDeclaredComputeInKalypso,
	decreaseStakeInKalypso,
	increaseDeclaredComputeInKalypso,
	increaseStakeInKalypso,
	initiateDecreaseDeclaredComputeInKalypso,
	initiateDecreaseStakeInKalypso,
	registerInKalypso,
	unregisterInKalypso,
	updateRewardAddressInKalypso
} from '$lib/controllers/contract/kalypso';
import { approveToken } from '$lib/controllers/contract/token';
import {
	decreaseDeclaredComputeInKalypsoStore,
	decreaseStakeInKalypsoStore,
	increaseDeclaredComputeInKalypsoStore,
	increaseStakeInKalypsoStore,
	initiateDecreaseDeclaredComputeInKalypsoStore,
	initiateDecreaseStakeInKalypsoStore,
	reduceApprovedFundsInKalypsoStore,
	registerInKalypsoStore,
	unregisterInKalypsoStore,
	updateApprovedFundsInKalypsoStore,
	updateRewardAddressInKalypsoStore
} from '$lib/data-stores/kalypsoStore';
import {
	addMockToWalletBalanceStore,
	withdrawMockFromWalletBalanceStore
} from '$lib/data-stores/walletProviderStore';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import type { Address } from '$lib/types/storeTypes';
import { DEFAULT_KALYPSO_STORE } from '../constants/storeDefaults';

export async function handleRegisterInKalypso(
	rewardAddress: Address,
	declaredCompute: bigint,
	initialStake: bigint,
	generatorData: string
) {
	try {
		await registerInKalypso(rewardAddress, declaredCompute, initialStake, generatorData);
		registerInKalypsoStore(
			rewardAddress,
			declaredCompute,
			initialStake,
			generatorData,
			DEFAULT_KALYPSO_STORE.stakingDetails.sumOfComputeAllocations,
			DEFAULT_KALYPSO_STORE.decreaseDeclaredCompute,
			DEFAULT_KALYPSO_STORE.decreaseStake
		);
		reduceApprovedFundsInKalypsoStore(initialStake);
		withdrawMockFromWalletBalanceStore(initialStake);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleApproveFundForKalypso(
	amount: bigint,
	kalypsoToken: TokenMetadata,
	kalypsoContractAddress: string
) {
	try {
		await approveToken(kalypsoToken, amount, kalypsoContractAddress);
		updateApprovedFundsInKalypsoStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleUpdateRewardAddressForKalypso(rewardAddress: Address) {
	try {
		await updateRewardAddressInKalypso(rewardAddress);
		updateRewardAddressInKalypsoStore(rewardAddress);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

/**
 *  @param refundAddress consider address from `$walletStore.walletAddress`
 */
export async function handleUnregisterInKalypso(refundAddress: Address) {
	try {
		await unregisterInKalypso(refundAddress);
		unregisterInKalypsoStore();
	} catch (e) {
		console.log('e :>> ', e);
	}
}

/**
 *  @param generatorAddress consider address from `$walletStore.walletAddress`
 */
export async function handleAddStakeForKalypso(amount: bigint, generatorAddress: Address) {
	try {
		await increaseStakeInKalypso(amount, generatorAddress);
		increaseStakeInKalypsoStore(amount);
		reduceApprovedFundsInKalypsoStore(amount);
		withdrawMockFromWalletBalanceStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleInitiateDecreaseStakeInKalypso(
	amountToReduce: bigint,
	endEpochTime: number
) {
	try {
		await initiateDecreaseStakeInKalypso(amountToReduce);
		initiateDecreaseStakeInKalypsoStore(amountToReduce, endEpochTime);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

/**
 * 	@param amountToReduce consider amount from `$kalypsoStore.decreaseStake.withdrawAmount`
 *  @param toAddress consider address from `$walletStore.walletAddress`
 */
export async function handleDecreaseStakeInKalypso(toAddress: Address, amountToReduce: bigint) {
	try {
		await decreaseStakeInKalypso(toAddress, amountToReduce);
		addMockToWalletBalanceStore(amountToReduce);
		decreaseStakeInKalypsoStore(amountToReduce);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleIncreaseDeclaredComputeForKalypso(computeToIncrease: bigint) {
	try {
		await increaseDeclaredComputeInKalypso(computeToIncrease);
		increaseDeclaredComputeInKalypsoStore(computeToIncrease);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleInitiateDecreaseDeclaredComputeInKalypso(
	computeToReduce: bigint,
	endEpochTime: number
) {
	try {
		await initiateDecreaseDeclaredComputeInKalypso(computeToReduce);
		initiateDecreaseDeclaredComputeInKalypsoStore(computeToReduce, endEpochTime);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleDecreaseDeclaredComputeInKalypso() {
	try {
		await decreaseDeclaredComputeInKalypso();
		decreaseDeclaredComputeInKalypsoStore();
	} catch (e) {
		console.log('e :>> ', e);
	}
}
