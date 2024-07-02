import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { ContractAddress } from '$lib/types/storeTypes';
import { OYSTER_TXN_MESSAGES } from '$lib/utils/constants/messages';
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
		const parentFunctionName = 'registerOysterInfrastructureProvider';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.CREATED.title,
				description: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.FAILED.title,
				description: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.providerAdd(controlPlaneUrl),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function updateOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'updateOysterInfrastructureProvider';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.CREATED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.FAILED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.providerUpdateWithCp(controlPlaneUrl),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function removeOysterInfrastructureProvider() {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'removeOysterInfrastructureProvider';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.CREATED.title,
				description: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.FAILED.title,
				description: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.providerRemove(),
			parentFunctionName,
			messages
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
		const parentFunctionName = 'createNewOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.CREATE_JOB.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.CREATED.title,
				description: OYSTER_TXN_MESSAGES.CREATE_JOB.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.CREATE_JOB.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.FAILED.title,
				description: OYSTER_TXN_MESSAGES.CREATE_JOB.FAILED.description
			}
		};
		// using "send" on the base contract method as we want a contractTransactionReceipt to
		// get the jobId of the newly created job emitted as an event from the contract
		const { txn, approveReciept } = await createTransaction(
			() => oysterContract.jobOpen.send(metadata, provider, rate, balance),
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

export async function stopOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'stopOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.STOP_JOB.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.CREATED.title,
				description: OYSTER_TXN_MESSAGES.STOP_JOB.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.STOP_JOB.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.FAILED.title,
				description: OYSTER_TXN_MESSAGES.STOP_JOB.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobClose(jobId),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function withdrawFundsFromOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'withdrawFundsFromOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.WITHDRAW.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.CREATED.title,
				description: OYSTER_TXN_MESSAGES.WITHDRAW.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.WITHDRAW.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.FAILED.title,
				description: OYSTER_TXN_MESSAGES.WITHDRAW.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobWithdraw(jobId, amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function addFundsToOysterJob(jobId: BytesLike, amount: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'addFundsToOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.ADD_FUND.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.CREATED.title,
				description: OYSTER_TXN_MESSAGES.ADD_FUND.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.ADD_FUND.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.FAILED.title,
				description: OYSTER_TXN_MESSAGES.ADD_FUND.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobDeposit(jobId, amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateRateReviseOysterJob(jobId: BytesLike, rate: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'initiateRateReviseOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateInitiate(jobId, rate),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateBandwidthRateReviseOysterJob(jobId: BytesLike, rate: bigint) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'initiateRateReviseOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.title,
				description: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateInitiate(jobId, rate),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function cancelRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'cancelRateReviseOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.CANCEL_STOP.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.CREATED.title,
				description: OYSTER_TXN_MESSAGES.CANCEL_STOP.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.CANCEL_STOP.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.FAILED.title,
				description: OYSTER_TXN_MESSAGES.CANCEL_STOP.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateCancel(jobId),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function finaliseRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'finaliseRateReviseOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateFinalize(jobId),
			parentFunctionName,
			messages
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function finaliseBandwidthRateReviseOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'finaliseRateReviseOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.title,
				description: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateFinalize(jobId),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function settleOysterJob(jobId: BytesLike) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'settleOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.SETTLE_JOB.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.CREATED.title,
				description: OYSTER_TXN_MESSAGES.SETTLE_JOB.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.SETTLE_JOB.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.FAILED.title,
				description: OYSTER_TXN_MESSAGES.SETTLE_JOB.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobSettle(jobId),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function updateEnclaveUrlForOysterJob(jobId: BytesLike, metadata: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const parentFunctionName = 'updateEnclaveUrlForOysterJob';
		const messages = {
			initiate: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.INITIATED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.INITIATED.description
			},
			created: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.CREATED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.CREATED.description
			},
			success: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.SUCCESS.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.SUCCESS.description
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.FAILED.title,
				description: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.FAILED.description
			}
		};
		const { txn } = await createTransaction(
			() => oysterContract.jobMetadataUpdate(jobId, metadata),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
