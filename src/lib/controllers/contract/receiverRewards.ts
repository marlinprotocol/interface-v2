import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import type { Address } from '@web3-onboard/core/dist/types';
import type { ContractAddress } from '$lib/types/storeTypes';
import { COMMON_TXN_MESSAGES, RECEIVER_REWARDS_TXN_MESSAGES } from '$lib/utils/constants/messages';
import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
import { REWARD_DELEGATORS_ABI } from '$lib/utils/abis/rewardDelegators';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function initiateReceiverRewards(rewardBalance: bigint, rewardPerEpoch: bigint) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		REWARD_DELEGATORS_ABI
	);
	try {
		const parentFunctionName = 'initiateReceiverRewards';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setupReceiverReward(rewardBalance, rewardPerEpoch),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
export async function addReceiverBalance(receiverAddress: Address, rewardBalance: bigint) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		REWARD_DELEGATORS_ABI
	);
	try {
		const parentFunctionName = 'addReceiverBalance';
		const amountInString = bigNumberToString(
			rewardBalance,
			DEFAULT_CURRENCY_DECIMALS,
			POND_PRECISIONS
		);
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.INITIATED.description(amountInString)
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.CREATED.description(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.SUCCESS.description(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.FAILED.description(amountInString)
			}
		};
		const { txn } = await createTransaction(
			() => rewardDelegatorContract.addReceiverBalance(receiverAddress, rewardBalance),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
export async function updateReceiverTicketReward(rewardPerEpoch: bigint) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		REWARD_DELEGATORS_ABI
	);
	try {
		const parentFunctionName = 'updateReceiverTicketReward';
		const amountInString = bigNumberToString(
			rewardPerEpoch,
			DEFAULT_CURRENCY_DECIMALS,
			POND_PRECISIONS
		);
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description:
					RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.INITIATED.description(amountInString)
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description:
					RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.CREATED.description(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description:
					RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.SUCCESS.description(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.FAILED.description(amountInString)
			}
		};
		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setReceiverRewardPerEpoch(rewardPerEpoch),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
