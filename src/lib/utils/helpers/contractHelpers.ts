import type { Address } from '@web3-onboard/core/dist/types';
import { MESSAGES } from '$lib/utils/constants/messages';
import type { WalletStore } from '$lib/types/storeTypes';
import { addToast } from '$lib/data-stores/toastStore';
import { capitalizeFirstLetter } from '$lib/utils/helpers/commonHelper';
import { ethers } from 'ethers';
import { walletStore } from '$lib/data-stores/walletProviderStore';

let signer: WalletStore['signer'];

walletStore.subscribe((value) => {
	signer = value.signer;
});

export function createSignerContract(contractAddress: Address, contractAbi: any) {
	return new ethers.Contract(contractAddress, contractAbi, signer);
}

export async function createTransaction(
	contractFunctionCall: () => Promise<any>,
	initiateTxnMessage: string,
	successTxnMessage: string,
	errorTxnMessage: string,
	parentFunctionName: string
) {
	try {
		addToast({
			message: initiateTxnMessage,
			variant: 'info'
		});

		const txn = await contractFunctionCall();

		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});

		// waiting for the transaction to be mined
		const approveReciept = await txn.wait();

		// if the transaction is not mined, throw an error and show a toast
		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error'
			});
			throw new Error(errorTxnMessage);
		}

		// if the transaction is mined, show a toast with success message and return the txn
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + successTxnMessage,
			variant: 'success'
		});
		return { txn: txn, approveReciept: approveReciept };
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error(`Transaction Error while creating transaction for ${parentFunctionName}`);
	}
}
