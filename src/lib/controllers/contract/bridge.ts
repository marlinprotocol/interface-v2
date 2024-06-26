import { DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS } from '$lib/utils/constants/constants';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import { BRIDGE_ABI } from '$lib/utils/abis/bridge';
import type { Address, ContractAddress } from '$lib/types/storeTypes';
import { BRIDGE_TXN_MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { type BrowserProvider, ethers } from 'ethers';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

// read methods
export async function getRequestedMPondForConversion(
	walletAddress: Address,
	provider: BrowserProvider
): Promise<bigint> {
	const oysterContract = new ethers.Contract(contractAddresses.BRIDGE, BRIDGE_ABI, provider);
	try {
		const requestedMPond = await oysterContract.totalAmountPlacedInRequests(walletAddress);
		return requestedMPond;
	} catch (error: any) {
		addToast({
			message: {
				title: 'Error',
				description: 'Error fetching requested MPond for conversion'
			},
			variant: 'error'
		});
		console.log('Error fetching requested MPond for conversion', error);
		return 0n;
	}
}

// write methods
export async function convertPondToMPond(expectedMPond: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const parentFunctionName = 'convertPondToMPond';
		const amountInString = bigNumberToString(
			expectedMPond,
			DEFAULT_CURRENCY_DECIMALS,
			MPOND_PRECISIONS
		);
		const messages = {
			initiate: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.INITIATING.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.INITIATING.message(amountInString)
			},
			created: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.CREATED.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.CREATED.message(amountInString)
			},
			success: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.SUCCESS.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.SUCCESS.message(amountInString)
			},
			failed: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.FAILED.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.POND_TO_MPOND.FAILED.message
			}
		};
		const { txn } = await createTransaction(
			() => bridgeContract.getMpond(expectedMPond),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function requestMPondConversion(amount: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const parentFunctionName = 'requestMPondConversion';
		const amountInString = bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS);
		const messages = {
			initiate: {
				title: BRIDGE_TXN_MESSAGES.REQUEST.INITIATE.title,
				message: BRIDGE_TXN_MESSAGES.REQUEST.INITIATE.message(amountInString)
			},
			created: {
				title: BRIDGE_TXN_MESSAGES.REQUEST.CREATED.title,
				message: BRIDGE_TXN_MESSAGES.REQUEST.CREATED.message(amountInString)
			},
			success: {
				title: BRIDGE_TXN_MESSAGES.REQUEST.SUCCESS.title,
				message: BRIDGE_TXN_MESSAGES.REQUEST.SUCCESS.message(amountInString)
			},
			failed: {
				title: BRIDGE_TXN_MESSAGES.REQUEST.FAILED.title,
				message: BRIDGE_TXN_MESSAGES.REQUEST.FAILED.message
			}
		};
		const { txn } = await createTransaction(
			() => bridgeContract.placeRequest(amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function cancelMPondConversionRequest(epoch: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const parentFunctionName = 'cancelMPondConversionRequest';
		const messages = {
			initiate: {
				title: BRIDGE_TXN_MESSAGES.CANCEL.INITIATE.title,
				message: BRIDGE_TXN_MESSAGES.CANCEL.INITIATE.message
			},
			created: {
				title: BRIDGE_TXN_MESSAGES.CANCEL.CREATED.title,
				message: BRIDGE_TXN_MESSAGES.CANCEL.CREATED.message
			},
			success: {
				title: BRIDGE_TXN_MESSAGES.CANCEL.SUCCESS.title,
				message: BRIDGE_TXN_MESSAGES.CANCEL.SUCCESS.message
			},
			failed: {
				title: BRIDGE_TXN_MESSAGES.CANCEL.FAILED.title,
				message: BRIDGE_TXN_MESSAGES.CANCEL.FAILED.message
			}
		};
		const { txn } = await createTransaction(
			() => bridgeContract.cancelRequest(epoch),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function confirmMPondConversion(epoch: bigint, amount: bigint) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const parentFunctionName = 'confirmMPondConversion';
		const amountInString = bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS);
		const messages = {
			initiate: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.INITIATE.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.INITIATE.message(amountInString)
			},
			created: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.CREATED.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.INITIATE.message(amountInString)
			},
			success: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.SUCCESS.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.INITIATE.message(amountInString)
			},
			failed: {
				title: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.FAILED.title,
				message: BRIDGE_TXN_MESSAGES.CONVERT.MPOND_TO_POND.FAILED.message
			}
		};
		const { txn } = await createTransaction(
			() => bridgeContract.convert(epoch, amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
