import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { ContractAddress } from '$lib/types/storeTypes';
import { MESSAGES } from '$lib/utils/constants/messages';
import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
import { RECEIVER_STAKING_ABI } from '$lib/utils/abis/receiverStaking';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import { minifyAddress } from '$lib/utils/helpers/commonHelper';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function setSignerAddress(address: string) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.UPDATING(
			minifyAddress(address)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.SUCCESS(minifyAddress(address));
		const errorTxnMessage = 'Unable to update signer address';
		const parentFunctionName = 'setSignerAddress';

		const { txn } = await createTransaction(
			() => receiverStakingContract.setSigner(address),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function depositStakingToken(amount: bigint) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to deposit staking token';
		const parentFunctionName = 'depositStakingToken';

		const { txn } = await createTransaction(
			() => receiverStakingContract.deposit(amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}
export async function depositStakingTokenAndSetSigner(amount: bigint, signerAddress = '') {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to deposit staking token and set signer';
		const parentFunctionName = 'depositStakingTokenAndSetSigner';

		const { txn } = await createTransaction(
			() => receiverStakingContract.depositAndSetSigner(amount, signerAddress),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function withdrawStakingToken(amount: bigint) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW.POND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW.POND_WITHDREW(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to withdraw staking token';
		const parentFunctionName = 'withdrawStakingToken';

		const { txn } = await createTransaction(
			() => receiverStakingContract.withdraw(amount),
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
