import {
	addFundsToOysterJob,
	approveFundsForOysterJobAdd,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contractController';
import { oysterStore } from '$lib/data-stores/oysterStore';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { BigNumber } from 'ethers';

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
		return {
			...jobData,
			amountPaid: jobData.amountPaid.add(amount),
			settlementHistory: [
				...jobData.settlementHistory,
				{
					amount,
					id: txn.hash,
					timestamp: Date.now()
				}
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
			amountPaid: jobData.amountPaid.sub(amount),
			settlementHistory: [
				...jobData.settlementHistory,
				{
					amount,
					id: txn.hash,
					timestamp: Date.now()
				}
			]
		};
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleStopJob(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
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

export async function handleAmendRateToJob(jobData: OysterInventoryDataModel, rate: BigNumber) {
	const { id } = jobData;
	try {
		await stopOysterJob(id);
		return {
			...jobData,
			rate: rate
		};
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}
