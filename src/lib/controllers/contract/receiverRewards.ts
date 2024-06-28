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
				message: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.INITIATED.message
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.CREATED.message
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.SUCCESS.message
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.INITIATE.FAILED.message
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
				message: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.INITIATED.message(amountInString)
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.CREATED.message(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.SUCCESS.message(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.ADD_BALANCE.FAILED.message(amountInString)
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
				message: RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.INITIATED.message(amountInString)
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.CREATED.message(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.SUCCESS.message(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				message: RECEIVER_REWARDS_TXN_MESSAGES.UPDATE_REWARDS.FAILED.message(amountInString)
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
