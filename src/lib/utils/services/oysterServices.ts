import {
	addFundsToOysterJob,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contractController';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { BigNumber } from 'ethers';

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
					ts: Date.now()
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
					ts: Date.now()
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
