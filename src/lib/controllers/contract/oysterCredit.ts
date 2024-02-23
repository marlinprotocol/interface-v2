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
		// using "send" on the base contract method as we want a contractTransactionReceipt to
		// get the jobId of the newly created job emitted as an event from the contract
		const { txn, approveReciept } = await createTransaction(
			() => oysterCreditContract.jobOpen.send(metadata, provider, rate, balance),
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

export async function addCreditsToOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER_CREDIT, OYSTER_CREDIT_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_CREDITS_JOB.ADDING_CREDITS;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_CREDITS_JOB.CREDITS_ADDED;
		const errorTxnMessage = 'Unable to add credits to Oyster Job.';
		const parentFunctionName = 'addCreditsToOysterJob';

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
