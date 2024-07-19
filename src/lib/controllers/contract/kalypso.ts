import { contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import type { Address, ContractAddress } from '$lib/types/storeTypes';
import { KALYPSO_ABI } from '$lib/utils/abis/kalypso';
import { KALYPSO_TXN_MESSAGES } from '$lib/utils/constants/messages';
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
		const sumOfComputeAllocations =
			res?.[2] || DEFAULT_KALYPSO_STORE.stakingDetails.sumOfComputeAllocations;
		const declaredCompute = res?.[6] || DEFAULT_KALYPSO_STORE.stakingDetails.declaredCompute;
		const intendedStakeUtilization = res?.[7];
		const intendedComputeUtilization = res?.[8];
		const generatorData = res?.[9] || DEFAULT_KALYPSO_STORE.stakingDetails.generatorData;

		return {
			rewardsAddress,
			stakedAmount,
			sumOfComputeAllocations,
			declaredCompute,
			intendedStakeUtilization,
			intendedComputeUtilization,
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
		return { ...DEFAULT_KALYPSO_STORE.stakingDetails };
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.REGISTER_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.register(rewardAddress, declaredCompute, initialStake, generatorData),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function updateRewardAddressInKalypso(newRewardAddress: Address) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const parentFunctionName = 'updateRewardAddressInKalypso';
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.UPDATE_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.changeRewardAddress(newRewardAddress),
			parentFunctionName,
			messages
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.UNREGISTER_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.deregister(refundAddress),
			parentFunctionName,
			messages
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
		const amountInString = bigNumberToString(amount);
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.INITIATED.title,
				description:
					KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.INITIATED.description(amountInString)
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.CREATED.description(amountInString)
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.SUCCESS.description(amountInString)
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_STAKE_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.stake(generatorAddress, amount),
			parentFunctionName,
			messages
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_STAKE_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.intendToReduceStake(amountToReduce),
			parentFunctionName,
			messages
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
		const amountInString = bigNumberToString(amountToReduce);
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.INITIATED.title,
				description:
					KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.INITIATED.description(amountInString)
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.CREATED.description(amountInString)
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.SUCCESS.description(amountInString)
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_STAKE_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.unstake(address),
			parentFunctionName,
			messages
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.INCREASE_DECLARED_COMPUTE_KALYPSO.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.increaseDeclaredCompute(computeToIncrease),
			parentFunctionName,
			messages
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.title,
				description:
					KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.title,
				description:
					KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.title,
				description:
					KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.title,
				description:
					KALYPSO_TXN_MESSAGES.INITIATE_DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => kalypsoContract.intendToReduceCompute(computeToReduce),
			parentFunctionName,
			messages
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
		const messages = {
			initiate: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.INITIATED.description
			},
			created: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.CREATED.description
			},
			success: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.SUCCESS.description
			},
			failed: {
				title: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.title,
				description: KALYPSO_TXN_MESSAGES.DECREASE_DECLARED_COMPUTE_KALYPSO.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => kalypsoContract.decreaseDeclaredCompute(),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
