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
	parentFunctionName: string,
	titles?: { initiateTxnTitle?: string; successTxnTitle?: string; failedTxnTitle?: string },
	config?: { disableToastDescription: boolean }
) {
	try {
		addToast({
			message: {
				description: initiateTxnMessage,
				title: titles?.initiateTxnTitle || ''
			},
			variant: 'warning'
		});

		const txn = await contractFunctionCall();

		addToast({
			message: {
				title: titles?.initiateTxnTitle || '',
				description: !config?.disableToastDescription ? MESSAGES.TOAST.TRANSACTION.CREATED : ''
			},
			variant: 'warning'
		});

		// waiting for the transaction to be mined
		const approveReciept = await txn.wait();

		// if the transaction is not mined, throw an error and show a toast
		if (!approveReciept) {
			addToast({
				message: {
					description: !config?.disableToastDescription ? MESSAGES.TOAST.TRANSACTION.FAILED : '',
					title: titles?.failedTxnTitle || ''
				},
				variant: 'error'
			});
			throw new Error(errorTxnMessage);
		}

		// if the transaction is mined, show a toast with success message and return the txn
		addToast({
			message: {
				title: titles?.successTxnTitle || '',
				description: successTxnMessage
					? MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + successTxnMessage
					: ''
			},
			variant: 'success'
		});
		return { txn: txn, approveReciept: approveReciept };
	} catch (error: any) {
		let description = error.reason
			? capitalizeFirstLetter(error.reason)
			: MESSAGES.TOAST.TRANSACTION.FAILED;
		let title = '';

		if (error.shortMessage === 'user rejected action') {
			description = 'Transaction rejected by the user';
			title = 'Transaction Rejected';
		}

		addToast({
			message: {
				description,
				title: titles?.failedTxnTitle || title
			},
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error(`Transaction Error while creating transaction for ${parentFunctionName}`);
	}
}
