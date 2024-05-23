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

		const initiateTxnTitle = MESSAGES.TOAST.REGISTER_OPERATOR.CREATED;
		const successTxnTitle = MESSAGES.TOAST.REGISTER_OPERATOR.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.REGISTER_OPERATOR.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};

		const { txn } = await createTransaction(
			() => oysterContract.providerAdd(controlPlaneUrl),
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

export async function updateOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATED;
		const errorTxnMessage = 'Unable to update Oyster Infrastructure Provider.';
		const parentFunctionName = 'updateOysterInfrastructureProvider';
		const initiateTxnTitle = MESSAGES.TOAST.UPDATE_OPERATOR.CREATED;
		const successTxnTitle = MESSAGES.TOAST.UPDATE_OPERATOR.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.UPDATE_OPERATOR.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.providerUpdateWithCp(controlPlaneUrl),
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

export async function removeOysterInfrastructureProvider() {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED;
		const errorTxnMessage = 'Unable to remove Oyster Infrastructure Provider.';
		const parentFunctionName = 'removeOysterInfrastructureProvider';
		const initiateTxnTitle = MESSAGES.TOAST.UNREGISTER_OPERATOR.CREATED;
		const successTxnTitle = MESSAGES.TOAST.UNREGISTER_OPERATOR.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.UNREGISTER_OPERATOR.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.providerRemove(),
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
			() => oysterContract.jobOpen.send(metadata, provider, rate, balance),
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

export async function stopOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPED;
		const errorTxnMessage = 'Unable to stop Oyster Job.';
		const parentFunctionName = 'stopOysterJob';

		const initiateTxnTitle = MESSAGES.TOAST.STOP_JOB.CREATED;
		const successTxnTitle = MESSAGES.TOAST.STOP_JOB.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.STOP_JOB.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobClose(jobId),
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

export async function withdrawFundsFromOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWN;
		const errorTxnMessage = 'Unable to withdraw funds from Oyster Job.';
		const parentFunctionName = 'withdrawFundsFromOysterJob';
		const initiateTxnTitle = MESSAGES.TOAST.WITHDRAW.CREATED;
		const successTxnTitle = MESSAGES.TOAST.WITHDRAW.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.WITHDRAW.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobWithdraw(jobId, amount),
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

export async function addFundsToOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.ADDING_FUNDS;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED;
		const errorTxnMessage = 'Unable to add funds to Oyster Job.';
		const parentFunctionName = 'addFundsToOysterJob';
		const initiateTxnTitle = MESSAGES.TOAST.ADD_FUND.CREATED;
		const successTxnTitle = MESSAGES.TOAST.ADD_FUND.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.ADD_FUND.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobDeposit(jobId, amount),
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

export async function initiateRateReviseOysterJob(jobId: BytesLike, rate: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED;
		const errorTxnMessage = 'Unable to initiate rate revision for Oyster Job.';
		const parentFunctionName = 'initiateRateReviseOysterJob';
		const initiateTxnTitle = MESSAGES.TOAST.INIT_STOP.CREATED;
		const successTxnTitle = MESSAGES.TOAST.INIT_STOP.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.INIT_STOP.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateInitiate(jobId, rate),
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

export async function cancelRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLED;
		const errorTxnMessage = 'Unable to cancel rate revision for Oyster Job.';
		const parentFunctionName = 'cancelRateReviseOysterJob';
		const initiateTxnTitle = MESSAGES.TOAST.CANCEL_STOP.CREATED;
		const successTxnTitle = MESSAGES.TOAST.CANCEL_STOP.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.CANCEL_STOP.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateCancel(jobId),
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

export async function updateEnclaveUrlForOysterJob(jobId: BytesLike, metadata: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_ENCLAVE_URL_JOB.UPDATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_ENCLAVE_URL_JOB.UPDATED;
		const errorTxnMessage = 'Unable to update enclave URL for Oyster Job.';
		const parentFunctionName = 'updateEnclaveUrlForOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobMetadataUpdate(jobId, metadata),
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
