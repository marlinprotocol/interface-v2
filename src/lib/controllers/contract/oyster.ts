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
				message: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.CREATED.title,
				message: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.FAILED.title,
				message: OYSTER_TXN_MESSAGES.REGISTER_OPERATOR.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.CREATED.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.FAILED.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_CP_URL.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.CREATED.title,
				message: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.FAILED.title,
				message: OYSTER_TXN_MESSAGES.REMOVE_OPERATOR.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.CREATE_JOB.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.CREATED.title,
				message: OYSTER_TXN_MESSAGES.CREATE_JOB.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.CREATE_JOB.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.CREATE_JOB.FAILED.title,
				message: OYSTER_TXN_MESSAGES.CREATE_JOB.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.STOP_JOB.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.CREATED.title,
				message: OYSTER_TXN_MESSAGES.STOP_JOB.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.STOP_JOB.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.STOP_JOB.FAILED.title,
				message: OYSTER_TXN_MESSAGES.STOP_JOB.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.WITHDRAW.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.CREATED.title,
				message: OYSTER_TXN_MESSAGES.WITHDRAW.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.WITHDRAW.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.WITHDRAW.FAILED.title,
				message: OYSTER_TXN_MESSAGES.WITHDRAW.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.ADD_FUND.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.CREATED.title,
				message: OYSTER_TXN_MESSAGES.ADD_FUND.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.ADD_FUND.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.ADD_FUND.FAILED.title,
				message: OYSTER_TXN_MESSAGES.ADD_FUND.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.title,
				message: OYSTER_TXN_MESSAGES.INIT_CHANGE_BANDWIDTH.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.CANCEL_STOP.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.CREATED.title,
				message: OYSTER_TXN_MESSAGES.CANCEL_STOP.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.CANCEL_STOP.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.CANCEL_STOP.FAILED.title,
				message: OYSTER_TXN_MESSAGES.CANCEL_STOP.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.title,
				message: OYSTER_TXN_MESSAGES.FINAL_CHANGE_BANDWIDTH.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.SETTLE_JOB.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.CREATED.title,
				message: OYSTER_TXN_MESSAGES.SETTLE_JOB.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.SETTLE_JOB.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.SETTLE_JOB.FAILED.title,
				message: OYSTER_TXN_MESSAGES.SETTLE_JOB.FAILED.message
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
				message: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.INITIATED.message
			},
			created: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.CREATED.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.CREATED.message
			},
			success: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.SUCCESS.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.SUCCESS.message
			},
			failed: {
				title: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.FAILED.title,
				message: OYSTER_TXN_MESSAGES.UPDATE_ENCLAVE_URL_JOB.FAILED.message
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
