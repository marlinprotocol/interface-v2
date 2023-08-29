import type { BigNumber, Bytes } from 'ethers';
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
	approveToken,
	cancelRateReviseOysterJob,
	createNewOysterJob,
	finaliseRateReviseOysterJob,
	initiateRateReviseOysterJob,
	settleOysterJob,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contractController';

import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import type { ContractAddress } from '$lib/types/storeTypes';
import { OYSTER_RATE_METADATA } from '../constants/oysterConstants';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import { contractAddressStore } from '$lib/data-stores/contractStore';

let contractAddress: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddress = value;
});

export async function handleClaimAmountFromOysterJob(jobId: Bytes) {
	try {
		await settleOysterJob(jobId);
		updateAmountToBeSettledForJobInOysterStore(jobId, BIG_NUMBER_ZERO);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleApproveFundForOysterJob(amount: BigNumber) {
	try {
		await approveToken(
			{
				symbol: OYSTER_RATE_METADATA.currency as string,
				token_decimals: OYSTER_RATE_METADATA.decimal,
				token_precision: OYSTER_RATE_METADATA.precision
			},
			amount,
			contractAddress.OYSTER
		);
		updateApprovedFundsInOysterStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFundsAddToJob(
	jobData: OysterInventoryDataModel,
	amount: BigNumber,
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
	amount: BigNumber,
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

export async function handleInitiateRateRevise(
	jobData: OysterInventoryDataModel,
	newRate: BigNumber
) {
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

export async function handleFinaliseRateRevise(
	jobData: OysterInventoryDataModel,
	newRate: BigNumber
) {
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
	rate: BigNumber,
	balance: BigNumber,
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
