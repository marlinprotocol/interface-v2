import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { Address } from '@web3-onboard/core/dist/types';

import type { ContractAddress } from '$lib/types/storeTypes';
import { MESSAGES } from '$lib/utils/constants/messages';
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
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.INITIATED;
		const errorTxnMessage = 'Unable to initiate receiver rewards.';
		const parentFunctionName = 'initiateReceiverRewards';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setupReceiverReward(rewardBalance, rewardPerEpoch),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
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
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATING_REWARDS(
			bigNumberToString(rewardBalance, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATED_REWARDS(
			bigNumberToString(rewardBalance, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to add receiver balance.';
		const parentFunctionName = 'addReceiverBalance';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.addReceiverBalance(receiverAddress, rewardBalance),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
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
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATING_REWARDS(
			bigNumberToString(rewardPerEpoch, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATED_REWARDS(
			bigNumberToString(rewardPerEpoch, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to update ticket rewards.';
		const parentFunctionName = 'updateReceiverTicketReward';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setReceiverRewardPerEpoch(rewardPerEpoch),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
