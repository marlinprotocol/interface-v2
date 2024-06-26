import type { Address } from '@web3-onboard/core/dist/types';
import { COMMON_TXN_MESSAGES } from '$lib/utils/constants/messages';
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
	parentFunctionName: string,
	messages?: {
		initiate: { title: string; message: string };
		created: { title: string; message: string };
		success: { title: string; message: string };
		failed: { title: string; message: string };
	}
) {
	try {
		addToast({
			message: {
				title: messages?.initiate.title || COMMON_TXN_MESSAGES.INITIATED.title,
				description: messages?.initiate.message || COMMON_TXN_MESSAGES.INITIATED.message
			},
			variant: 'warning'
		});

		const txn = await contractFunctionCall();

		addToast({
			message: {
				title: messages?.created.title || COMMON_TXN_MESSAGES.CREATED.title,
				description: messages?.created.message || COMMON_TXN_MESSAGES.CREATED.message
			},
			variant: 'warning'
		});

		// waiting for the transaction to be mined
		const approveReciept = await txn.wait();

		// if the transaction is not mined, throw an error and show a toast
		if (!approveReciept) {
			addToast({
				message: {
					title: messages?.failed.title || COMMON_TXN_MESSAGES.FAILED.title,
					description: messages?.failed.message || COMMON_TXN_MESSAGES.FAILED.message
				},
				variant: 'error'
			});
			throw new Error(messages?.failed.message || COMMON_TXN_MESSAGES.FAILED.message);
		}

		// if the transaction is mined, show a toast with success message and return the txn
		addToast({
			message: {
				title: messages?.success.title || COMMON_TXN_MESSAGES.SUCCESS.title,
				description: messages?.success.message
					? COMMON_TXN_MESSAGES.SUCCESS.message + ' ' + messages.success.message
					: COMMON_TXN_MESSAGES.SUCCESS.message
			},
			variant: 'success'
		});
		return { txn: txn, approveReciept: approveReciept };
	} catch (error: any) {
		let title = '';
		let description = error.reason
			? capitalizeFirstLetter(error.reason)
			: COMMON_TXN_MESSAGES.FAILED.message;

		if (error.shortMessage === 'user rejected action') {
			title = 'Transaction Rejected';
			description = 'Transaction rejected by the user';
		}

		addToast({
			message: {
				title: messages?.failed.title || title,
				description
			},
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error(`Transaction Error while creating transaction for ${parentFunctionName}`);
	}
}
