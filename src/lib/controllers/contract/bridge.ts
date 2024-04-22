import { DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS } from '$lib/utils/constants/constants';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import { BRIDGE_ABI } from '$lib/utils/abis/bridge';

import type { ContractAddress } from '$lib/types/storeTypes';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function convertPondToMPond(expectedMPond: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTING(
			bigNumberToString(expectedMPond, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTED(
			bigNumberToString(expectedMPond, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to convert POND to MPond';
		const parentFunctionName = 'convertPondToMPond';
		const initiateTxnTitle = MESSAGES.TOAST.CONVERSION.CREATED;
		const successTxnTitle = MESSAGES.TOAST.CONVERSION.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.CONVERSION.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => bridgeContract.getMpond(expectedMPond),
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

export async function requestMPondConversion(amount: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTING(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to place request for converting MPond to POND.';
		const parentFunctionName = 'requestMPondConversion';

		const { txn } = await createTransaction(
			() => bridgeContract.placeRequest(amount),
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

export async function cancelMPondConversionRequest(epoch: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLED;
		const errorTxnMessage = 'Unable to cancel request for converting MPond to POND.';
		const parentFunctionName = 'cancelMPondConversionRequest';

		const { txn } = await createTransaction(
			() => bridgeContract.cancelRequest(epoch),
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

export async function confirmMPondConversion(epoch: bigint, amount: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTING(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to convert MPond to POND.';
		const parentFunctionName = 'confirmMPondConversion';

		const { txn } = await createTransaction(
			() => bridgeContract.convert(epoch, amount),
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
