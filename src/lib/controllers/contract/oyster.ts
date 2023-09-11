import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { ContractAddress } from '$lib/types/storeTypes';
import { MESSAGES } from '$lib/utils/constants/messages';
import { OYSTER_MARKET_ABI } from '$lib/utils/abis/oysterMarket';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import type { BytesLike } from 'ethers';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function registerOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERED;
		const errorTxnMessage = 'Unable to register as Oyster Infrastructure Provider.';
		const parentFunctionName = 'registerOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerAdd(controlPlaneUrl),
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

export async function updateOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATED;
		const errorTxnMessage = 'Unable to update Oyster Infrastructure Provider.';
		const parentFunctionName = 'updateOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerUpdateWithCp(controlPlaneUrl),
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

export async function removeOysterInfrastructureProvider() {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED;
		const errorTxnMessage = 'Unable to remove Oyster Infrastructure Provider.';
		const parentFunctionName = 'removeOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerRemove(),
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

export async function createNewOysterJob(
	metadata: string,
	provider: string,
	rate: bigint,
	balance: bigint
) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATED;
		const errorTxnMessage = 'Unable to create new Oyster Job.';
		const parentFunctionName = 'createNewOysterJob';
		const { txn, approveReciept } = await createTransaction(
			() => oysterContract.jobOpen(metadata, provider, rate, balance),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return {
			txn,
			approveReciept
		};
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function stopOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPED;
		const errorTxnMessage = 'Unable to stop Oyster Job.';
		const parentFunctionName = 'stopOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobClose(jobId),
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

export async function withdrawFundsFromOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWN;
		const errorTxnMessage = 'Unable to withdraw funds from Oyster Job.';
		const parentFunctionName = 'withdrawFundsFromOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobWithdraw(jobId, amount),
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

export async function addFundsToOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.ADDING_FUNDS;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED;
		const errorTxnMessage = 'Unable to add funds to Oyster Job.';
		const parentFunctionName = 'addFundsToOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobDeposit(jobId, amount),
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

export async function initiateRateReviseOysterJob(jobId: BytesLike, rate: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED;
		const errorTxnMessage = 'Unable to initiate rate revision for Oyster Job.';
		const parentFunctionName = 'initiateRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateInitiate(jobId, rate),
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

export async function cancelRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLED;
		const errorTxnMessage = 'Unable to cancel rate revision for Oyster Job.';
		const parentFunctionName = 'cancelRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateCancel(jobId),
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

export async function finaliseRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDED;
		const errorTxnMessage = 'Unable to finalise rate revision for Oyster Job.';
		const parentFunctionName = 'finaliseRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateFinalize(jobId),
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

export async function settleOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLED;
		const errorTxnMessage = 'Unable to settle Oyster Job.';
		const parentFunctionName = 'settleOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobSettle(jobId),
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
