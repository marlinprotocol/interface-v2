import {
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
			amountPaid: jobData.amountPaid.add(amount),
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
			amountPaid: jobData.amountPaid.sub(amount),
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

export async function handleInitiateJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const tx = await initiateRateReviseOysterJob(id, BigNumberZero);
		return 1781892132;
	} catch (e) {
		console.log('e :>> ', e);
		return null;
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
