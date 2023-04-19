import {
	cancelRateReviseOysterJob,
	createNewOysterJob,
	initiateRateReviseOysterJob
} from '$lib/controllers/contractController';
import {
	addFundsToOysterJob,
	approveFundsForOysterJobAdd,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contractController';
import { oysterStore } from '$lib/data-stores/oysterStore';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { getReviseRateInitiateEndTimestamp } from '$lib/controllers/subgraphController';

export async function handleApproveFundForOysterJob(amount: BigNumber) {
	try {
		await approveFundsForOysterJobAdd(amount);
		oysterStore.update((value) => {
			return {
				...value,
				allowance: amount
			};
		});
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleFundsAddToJob(jobData: OysterInventoryDataModel, amount: BigNumber) {
	const { id } = jobData;
	try {
		const txn = await addFundsToOysterJob(id, amount);
		oysterStore.update((value) => {
			return {
				...value,
				allowance: value.allowance.sub(amount)
			};
		});
		return {
			...jobData,
			totalDeposit: jobData.totalDeposit.add(amount),
			depositHistory: [
				{
					amount,
					id: txn.hash,
					timestamp: Date.now() / 1000,
					isWithdrawal: false
				},
				...jobData.depositHistory
			]
		};
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleFundsWithdrawFromJob(
	jobData: OysterInventoryDataModel,
	amount: BigNumber
) {
	const { id } = jobData;
	try {
		const txn = await withdrawFundsFromOysterJob(id, amount);
		return {
			...jobData,
			totalDeposit: jobData.totalDeposit.sub(amount),
			depositHistory: [
				{
					amount,
					id: txn.hash,
					timestamp: Date.now() / 1000,
					isWithdrawal: true
				},
				...jobData.depositHistory
			]
		};
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleInitiateRateRevise(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await initiateRateReviseOysterJob(id, BigNumberZero);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleCancelRateRevise(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await cancelRateReviseOysterJob(id);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleGetReviseRateInititaeEndTimestamp(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const timestamp = await getReviseRateInitiateEndTimestamp(id);
		console.log('timestamp :>> ', timestamp);
		return timestamp;
	} catch (e) {
		console.log('e :>> ', e);
		return 0;
	}
}

export async function handleConfirmJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	// TODO: add logic to stop job
	try {
		await stopOysterJob(id);
		return {
			...jobData,
			live: false
		};
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleCreateJob(
	metadata: string,
	provider: string,
	rate: BigNumber,
	balance: BigNumber
) {
	try {
		const tx = await createNewOysterJob(metadata, provider, rate, balance);
		// return {
		// 	...jobData,
		// 	live: true
		// };
	} catch (e) {
		console.log('e :>> ', e);
		// return jobData;
	}
}
