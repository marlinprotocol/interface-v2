import {
	addCreditsToOysterStore,
	addFundsToJobInOysterStore,
	cancelRateReviseInOysterStore,
	decreaseOysterAllowanceInOysterStore,
	initiateRateReviseInOysterStore,
	stopJobInOysterStore,
	updateAmountToBeSettledForJobInOysterStore,
	updateApprovedFundsInOysterStore,
	updateEnclaveUrlForOysterJobInOysterStore,
	updateJobRateInOysterStore,
	updateJobStatusOnTimerEndInOysterStore,
	withdrawCreditsFromOysterStore,
	withdrawFundsFromJobInOysterStore
} from '$lib/data-stores/oysterStore';
import { addJobToOysterLocalStorageStore } from '$lib/data-stores/localStorageStore';
import {
	addFundsToOysterJob,
	cancelRateReviseOysterJob,
	createNewOysterJob,
	finaliseBandwidthRateReviseOysterJob,
	finaliseRateReviseOysterJob,
	initiateBandwidthRateReviseOysterJob,
	initiateRateReviseOysterJob,
	settleOysterJob,
	stopOysterJob,
	updateEnclaveUrlForOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contract/oyster';
import { transformOysterJobDataToInventoryDataModel } from '$lib/utils/helpers/oysterHelpers';

import type { BytesLike } from 'ethers';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { approveToken } from '$lib/controllers/contract/token';
import type { Address } from '$lib/types/storeTypes';
import {
	addCreditsToOysterJob,
	cancelRateReviseOysterCreditJob,
	createNewOysterJobWithCredits,
	finaliseBandwidthRateReviseOysterCreditJob,
	finaliseRateReviseOysterCreditJob,
	initiateBandwidthRateReviseOysterCreditJob,
	initiateRateReviseOysterCreditJob,
	stopOysterCreditJob,
	withdrawFundsFromOysterCreditJob
} from '$lib/controllers/contract/oysterCredit';
import { withdrawUsdcFromWalletBalanceStore } from '$lib/data-stores/walletProviderStore';

export async function handleClaimAmountFromOysterJob(jobId: BytesLike) {
	try {
		await settleOysterJob(jobId);
		updateAmountToBeSettledForJobInOysterStore(jobId, 0n);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleApproveFundForOysterJob(
	amount: bigint,
	oysterToken: TokenMetadata,
	oysterContractAddress: string
) {
	try {
		await approveToken(oysterToken, amount, oysterContractAddress);
		updateApprovedFundsInOysterStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleAddFundsToJob(
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const { id } = jobData;
	try {
		const txn = await addFundsToOysterJob(id, amount);
		addFundsToJobInOysterStore(id, txn, jobData, amount, duration);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleAddCreditsToJob(
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const { id } = jobData;
	try {
		const txn = await addCreditsToOysterJob(id, amount);
		addFundsToJobInOysterStore(id, txn, jobData, amount, duration);
		withdrawCreditsFromOysterStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleFundsWithdrawFromJob(
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const { id } = jobData;
	try {
		const txn = await withdrawFundsFromOysterJob(id, amount);
		withdrawFundsFromJobInOysterStore(id, txn, jobData, amount, duration);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleFundsWithdrawFromCreditJob(
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const { id } = jobData;
	try {
		const txn = await withdrawFundsFromOysterCreditJob(id, amount);
		withdrawFundsFromJobInOysterStore(id, txn, jobData, amount, duration);
		addCreditsToOysterStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleInitiateJobRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	waitingTime: number
) {
	const { id } = jobData;
	try {
		await initiateRateReviseOysterJob(id, newRateScaled);
		initiateRateReviseInOysterStore(id, jobData, newRateScaled, waitingTime);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleInitiateBandwidthRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	waitingTime: number
) {
	const { id } = jobData;
	try {
		await initiateBandwidthRateReviseOysterJob(id, newRateScaled);
		initiateRateReviseInOysterStore(id, jobData, newRateScaled, waitingTime);
		return { status: true };
	} catch (e) {
		console.log('e :>> ', e);
		return { status: false };
	}
}

export async function handleInitiateCreditJobRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	waitingTime: number
) {
	const { id } = jobData;
	try {
		await initiateRateReviseOysterCreditJob(id, newRateScaled);
		initiateRateReviseInOysterStore(id, jobData, newRateScaled, waitingTime);
		return { status: true };
	} catch (e) {
		console.log('e :>> ', e);
		return { status: false };
	}
}

export async function handleInitiateCreditBandwidthRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	waitingTime: number
) {
	const { id } = jobData;
	try {
		await initiateBandwidthRateReviseOysterCreditJob(id, newRateScaled);
		initiateRateReviseInOysterStore(id, jobData, newRateScaled, waitingTime);
		return { status: true };
	} catch (e) {
		console.log('e :>> ', e);
		return { status: false };
	}
}

export async function handleJobRateReviseCancel(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await cancelRateReviseOysterJob(id);
		cancelRateReviseInOysterStore(id, jobData);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleCreditJobRateReviseCancel(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await cancelRateReviseOysterCreditJob(id);
		cancelRateReviseInOysterStore(id, jobData);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export function handleJobStatusOnStopTimerEnd(jobData: OysterInventoryDataModel) {
	try {
		updateJobStatusOnTimerEndInOysterStore(jobData);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFinaliseJobRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	newDuration: number
) {
	const { id } = jobData;
	try {
		await finaliseRateReviseOysterJob(id);
		updateJobRateInOysterStore(id, newRateScaled, newDuration);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFinaliseJobBandwidthRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	newDuration: number
) {
	const { id } = jobData;
	try {
		await finaliseBandwidthRateReviseOysterJob(id);
		updateJobRateInOysterStore(id, newRateScaled, newDuration);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFinaliseCreditJobRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	newDuration: number
) {
	const { id } = jobData;
	try {
		await finaliseRateReviseOysterCreditJob(id);
		updateJobRateInOysterStore(id, newRateScaled, newDuration);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFinaliseCreditJobBandwidthRateRevise(
	jobData: OysterInventoryDataModel,
	newRateScaled: bigint,
	newDuration: number
) {
	const { id } = jobData;
	try {
		await finaliseBandwidthRateReviseOysterCreditJob(id);
		updateJobRateInOysterStore(id, newRateScaled, newDuration);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleJobStopConfirm(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const txn = await stopOysterJob(id);
		stopJobInOysterStore(id, txn, jobData);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleCreditJobStopConfirm(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const txn = await stopOysterCreditJob(id);
		stopJobInOysterStore(id, txn, jobData);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleCreateJob(
	owner: { name?: string; address: Address },
	metadata: string,
	provider: { name?: string; address: Address },
	rate: bigint,
	balance: bigint,
	durationInSec: number,
	scalingFactor: bigint,
	chainId: number,
	walletAddress: string
) {
	try {
		const { txn, approveReciept } = await createNewOysterJob(
			metadata,
			provider.address,
			rate,
			balance
		);
		const jobEntry = transformOysterJobDataToInventoryDataModel(
			txn,
			approveReciept,
			owner,
			metadata,
			provider,
			rate,
			balance,
			durationInSec,
			scalingFactor,
			false
		);
		addJobToOysterLocalStorageStore(chainId, walletAddress, jobEntry);
		decreaseOysterAllowanceInOysterStore(balance);
		withdrawUsdcFromWalletBalanceStore(balance);
		return true;
	} catch (e) {
		console.log('e :>> ', e);
		return false;
	}
}

export async function handleCreateJobWithCredits(
	owner: { name?: string; address: Address },
	metadata: string,
	provider: { name?: string; address: Address },
	rate: bigint,
	balance: bigint,
	durationInSec: number,
	scalingFactor: bigint,
	chainId: number,
	walletAddress: string
) {
	try {
		const { txn, approveReciept } = await createNewOysterJobWithCredits(
			metadata,
			provider.address,
			rate,
			balance
		);
		const jobEntry = transformOysterJobDataToInventoryDataModel(
			txn,
			approveReciept,
			owner,
			metadata,
			provider,
			rate,
			balance,
			durationInSec,
			scalingFactor,
			true
		);
		addJobToOysterLocalStorageStore(chainId, walletAddress, jobEntry);
		withdrawCreditsFromOysterStore(balance);
		return true;
	} catch (e) {
		console.log('e :>> ', e);
		return false;
	}
}

export async function handleUpdateEnclaveUrlForOysterJob(jobId: BytesLike, metadata: string) {
	try {
		await updateEnclaveUrlForOysterJob(jobId, metadata);
		updateEnclaveUrlForOysterJobInOysterStore(jobId, metadata);
		return true;
	} catch (e) {
		console.log('e :>> ', e);
		return false;
	}
}
