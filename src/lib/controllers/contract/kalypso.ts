import { contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import type { Address, ContractAddress } from '$lib/types/storeTypes';
import { KALYPSO_ABI } from '$lib/utils/abis/kalypso';
import { MESSAGES } from '$lib/utils/constants/messages';
import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import type { BytesLike } from 'ethers';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

// read methods
export async function getKalypsoGeneratorDataFromContract(address: Address) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const res = await kalypsoContract.generatorRegistry(address);
		const rewardsAddress = res?.[0] || DEFAULT_KALYPSO_STORE.stakingDetails.rewardsAddress;
		const stakedAmount = res?.[1] || DEFAULT_KALYPSO_STORE.stakingDetails.stakedAmount;
		const declaredCompute = res?.[6] || DEFAULT_KALYPSO_STORE.stakingDetails.declaredCompute;
		const generatorData = res?.[9] || DEFAULT_KALYPSO_STORE.stakingDetails.generatorData;
		const isRegistered = rewardsAddress !== DEFAULT_KALYPSO_STORE.stakingDetails.rewardsAddress;
		return {
			isRegistered,
			rewardsAddress,
			stakedAmount,
			declaredCompute,
			generatorData
		};
	} catch (error: any) {
		addToast({
			message: {
				title: 'Error',
				description: 'Error fetching if user registered in kalypso contract'
			},
			variant: 'error'
		});
		console.log('error fetching if user registered in kalypso contract :>> ', error);
		return { isRegistered: false, ...DEFAULT_KALYPSO_STORE.stakingDetails };
	}
}

// write methods
export async function registerInKalypso(
	rewardAddress: Address,
	declaredCompute: bigint,
	initialStake: bigint,
	generatorData: BytesLike
) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'registerInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.REGISTER_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.REGISTER_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.REGISTER_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.register(rewardAddress, declaredCompute, initialStake, generatorData),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function updateRewardAddressInKalypso(rewardAddress: Address) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'updateRewardAddressInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.newRewardAddress(rewardAddress),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function unregisterInKalypso(refundAddress: Address) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'unregisterInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.UNREGISTER_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.UNREGISTER_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.UNREGISTER_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.UNREGISTER_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.UNREGISTER_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.UNREGISTER_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.deregister(refundAddress),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function increaseStakeInKalypso(amount: bigint, generatorAddress: Address) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'increaseStakeInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.CREATED.message(
			bigNumberToString(amount)
		);
		const successTxnMessage = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.SUCCESS.message(
			bigNumberToString(amount)
		);
		const errorTxnMessage = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.INCREASE_STAKE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.stake(generatorAddress, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateDecreaseStakeInKalypso(amountToReduce: bigint) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'initiateDecreaseStakeInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.INITIATE_DECREASE_STAKE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.intendToReduceStake(amountToReduce),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function decreaseStakeInKalypso(address: Address, amountToReduce: bigint) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'decreaseStakeInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.CREATED.message(
			bigNumberToString(amountToReduce)
		);
		const successTxnMessage = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.SUCCESS.message(
			bigNumberToString(amountToReduce)
		);
		const errorTxnMessage = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.DECREASE_STAKE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.unstake(address),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function increaseDeclaredComputeInKalypso(computeToIncrease: bigint) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'increaseDeclaredComputeInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.INCREASE_DECLARED_COMPUTE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.increaseDeclaredCompute(computeToIncrease),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateDecreaseDeclaredComputeInKalypso(computeToReduce: bigint) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'initiateDecreaseDeclaredCompute';
		const initiateTxnMessage =
			MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.message;
		const successTxnMessage =
			MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.message;
		const errorTxnMessage =
			MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.message;
		const initiateTxnTitle =
			MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.intendToReduceCompute(computeToReduce),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function decreaseDeclaredComputeInKalypso() {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'decreaseDeclaredComputeInKalypso';
		const initiateTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.CREATED.message;
		const successTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.SUCCESS.message;
		const errorTxnMessage = MESSAGES.TOAST.UPDATE_KALYPSO.FAILED.message;
		const initiateTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.CREATED.title;
		const successTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.SUCCESS.title;
		const failedTxnTitle = MESSAGES.TOAST.UPDATE_KALYPSO.FAILED.title;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.decreaseDeclaredCompute(),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
