import { contractAddressStore } from '$lib/data-stores/contractStore';
import type { ContractAddress } from '$lib/types/storeTypes';
import { OYSTER_CREDIT_ABI } from '$lib/utils/abis/oysterCredit';
import { MESSAGES } from '$lib/utils/constants/messages';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import type { BytesLike } from 'ethers';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function createNewOysterJobWithCredits(
	metadata: string,
	provider: string,
	rate: bigint,
	balance: bigint
) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB_WITH_CREDIT.CREATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB_WITH_CREDIT.CREATED;
		const errorTxnMessage = 'Unable to create new Oyster Job with credits.';
		const parentFunctionName = 'createNewOysterJobWithCredits';

		const initiateTxnTitle = MESSAGES.TOAST.DEPLOY.CREATED;
		const successTxnTitle = MESSAGES.TOAST.DEPLOY.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.DEPLOY.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};

		// using "send" on the base contract method as we want a contractTransactionReceipt to
		// get the jobId of the newly created job emitted as an event from the contract
		const { txn, approveReciept } = await createTransaction(
			() => oysterCreditContract.jobOpen.send(metadata, provider, rate, balance),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);

		return {
			txn,
			approveReciept
		};
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function addCreditsToOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_CREDITS_JOB.ADDING_CREDITS;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_CREDITS_JOB.CREDITS_ADDED;
		const errorTxnMessage = 'Unable to add credits to Oyster Job.';
		const parentFunctionName = 'addCreditsToOysterJob';

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobDeposit(jobId, amount),
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

export async function stopOysterCreditJob(jobId: BytesLike) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_CREDIT_JOB.STOPPING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_CREDIT_JOB.STOPPED;
		const errorTxnMessage = 'Unable to stop Oyster Job.';
		const parentFunctionName = 'stopOysterCreditJob';

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobClose(jobId),
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

export async function withdrawFundsFromOysterCreditJob(jobId: BytesLike, amount: bigint) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB_CREDIT.WITHDRAWING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB_CREDIT.WITHDRAWN;
		const errorTxnMessage = 'Unable to withdraw funds from Oyster Job.';
		const parentFunctionName = 'withdrawFundsFromOysterCreditJob';

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobWithdraw(jobId, amount),
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

export async function initiateRateReviseOysterCreditJob(jobId: BytesLike, rate: bigint) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED;
		const errorTxnMessage = 'Unable to initiate rate revision for Oyster Job.';
		const parentFunctionName = 'initiateRateReviseOysterCreditJob';

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateInitiate(jobId, rate),
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

export async function finaliseRateReviseOysterCreditJob(jobId: BytesLike) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDED;
		const errorTxnMessage = 'Unable to finalise rate revision for Oyster Job.';
		const parentFunctionName = 'finaliseRateReviseOysterCreditJob';

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateFinalize(jobId),
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

export async function cancelRateReviseOysterCreditJob(jobId: BytesLike) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLED;
		const errorTxnMessage = 'Unable to cancel rate revision for Oyster Job.';
		const parentFunctionName = 'cancelRateReviseOysterCreditJob';

		const initiateTxnTitle = MESSAGES.TOAST.CANCEL_STOP.CREATED;
		const successTxnTitle = MESSAGES.TOAST.CANCEL_STOP.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.CANCEL_STOP.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateCancel(jobId),
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
