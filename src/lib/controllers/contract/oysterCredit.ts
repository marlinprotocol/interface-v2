import { contractAddressStore } from '$lib/data-stores/contractStore';
import type { ContractAddress } from '$lib/types/storeTypes';
import { OYSTER_CREDIT_ABI } from '$lib/utils/abis/oysterCredit';
import { COMMON_TXN_MESSAGES, OYSTER_CREDIT_TXN_MESSAGES } from '$lib/utils/constants/messages';
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
		const parentFunctionName = 'createNewOysterJobWithCredits';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CREATE_JOB_WITH_CREDIT.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CREATE_JOB_WITH_CREDIT.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CREATE_JOB_WITH_CREDIT.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CREATE_JOB_WITH_CREDIT.FAILED.description
			}
		};

		// using "send" on the base contract method as we want a contractTransactionReceipt to
		// get the jobId of the newly created job emitted as an event from the contract
		const { txn, approveReciept } = await createTransaction(
			() => oysterCreditContract.jobOpen.send(metadata, provider, rate, balance),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'addCreditsToOysterJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.ADD_CREDITS_JOB.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.ADD_CREDITS_JOB.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.ADD_CREDITS_JOB.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.ADD_CREDITS_JOB.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobDeposit(jobId, amount),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'stopOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.STOP_CREDIT_JOB.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.STOP_CREDIT_JOB.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.STOP_CREDIT_JOB.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.STOP_CREDIT_JOB.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobClose(jobId),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'withdrawFundsFromOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.WITHDRAW_JOB_CREDIT.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.WITHDRAW_JOB_CREDIT.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.WITHDRAW_JOB_CREDIT.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.WITHDRAW_JOB_CREDIT.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobWithdraw(jobId, amount),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'initiateRateReviseOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateInitiate(jobId, rate),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateBandwidthRateReviseOysterCreditJob(jobId: BytesLike, rate: bigint) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const parentFunctionName = 'initiateRateReviseOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateInitiate(jobId, rate),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'finaliseRateReviseOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.AMEND_RATE_JOB.INITIATED
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.AMEND_RATE_JOB.CREATED
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.AMEND_RATE_JOB.SUCCESS
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.AMEND_RATE_JOB.FAILED
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateFinalize(jobId),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function finaliseBandwidthRateReviseOysterCreditJob(jobId: BytesLike) {
	const oysterCreditContract = createSignerContract(
		contractAddresses.OYSTER_CREDIT,
		OYSTER_CREDIT_ABI
	);
	try {
		const parentFunctionName = 'finaliseRateReviseOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.description
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateFinalize(jobId),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'cancelRateReviseOysterCreditJob';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CANCEL.INITITATED
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CANCEL.CREATED
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CANCEL.SUCCESS
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: OYSTER_CREDIT_TXN_MESSAGES.CANCEL.FAILED
			}
		};

		const { txn } = await createTransaction(
			() => oysterCreditContract.jobReviseRateCancel(jobId),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
