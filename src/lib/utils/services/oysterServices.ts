import {
	addFundsToJobInOysterStore,
	cancelRateReviseInOysterStore,
	createNewJobInOysterStore,
	initiateRateReviseInOysterStore,
	stopJobInOysterStore,
	updateAmountToBeSettledForJobInOysterStore,
	updateApprovedFundsInOysterStore,
	updateJobRateInOysterStore,
	updateJobStatusOnTimerEndInOysterStore,
	withdrawFundsFromJobInOysterStore
} from '$lib/data-stores/oysterStore';
import {
	addFundsToOysterJob,
	cancelRateReviseOysterJob,
	createNewOysterJob,
	finaliseRateReviseOysterJob,
	initiateRateReviseOysterJob,
	settleOysterJob,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contract/oyster';

import type { BytesLike } from 'ethers';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { approveToken } from '$lib/controllers/contract/token';

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
		await approveToken(
			{
				symbol: oysterToken.symbol,
				decimal: oysterToken.decimal,
				precision: oysterToken.precision,
				currency: oysterToken.currency
			},
			amount,
			oysterContractAddress
		);
		updateApprovedFundsInOysterStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFundsAddToJob(
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

export async function handleInitiateRateRevise(jobData: OysterInventoryDataModel, newRate: bigint) {
	const { id } = jobData;
	try {
		await initiateRateReviseOysterJob(id, newRate);
		initiateRateReviseInOysterStore(id, jobData, newRate);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleCancelRateRevise(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await cancelRateReviseOysterJob(id);
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

export async function handleFinaliseRateRevise(jobData: OysterInventoryDataModel, newRate: bigint) {
	const { id } = jobData;
	try {
		await finaliseRateReviseOysterJob(id);
		updateJobRateInOysterStore(id, newRate);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleConfirmJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const txn = await stopOysterJob(id);
		stopJobInOysterStore(id, txn, jobData);
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleCreateJob(
	owner: string,
	metadata: string,
	provider: { name?: string; address: string },
	rate: bigint,
	balance: bigint,
	durationInSec: number
) {
	try {
		const { txn, approveReciept } = await createNewOysterJob(
			metadata,
			provider.address,
			rate,
			balance
		);
		createNewJobInOysterStore(
			txn,
			approveReciept,
			owner,
			metadata,
			provider,
			rate,
			balance,
			durationInSec
		);

		return true;
	} catch (e) {
		console.log('e :>> ', e);
		return false;
	}
}
