import {
	cancelRateReviseOysterJob,
	createNewOysterJob,
	finaliseRateReviseOysterJob,
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
import { parseMetadata } from '../data-modifiers/oysterModifiers';
import type { OysterStore } from '$lib/types/storeTypes';

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
		const modifiedJobData = {
			...jobData,
			totalDeposit: jobData.totalDeposit.add(amount),
			balance: jobData.balance.add(amount),
			depositHistory: [
				{
					amount,
					id: txn.hash,
					timestamp: Date.now() / 1000,
					isWithdrawal: false,
					transactionStatus: 'running'
				},
				...jobData.depositHistory
			]
		};
		oysterStore.update((value: OysterStore) => {
			return {
				...value,
				allowance: value.allowance.sub(amount),
				jobsData: value.jobsData.map((job) => {
					if (job.id === id) {
						return modifiedJobData;
					}
					return job;
				})
			};
		});
		// return modifiedJobData;
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
		const modifiedJobData = {
			...jobData,
			totalDeposit: jobData.totalDeposit.sub(amount),
			balance: jobData.balance.sub(amount),
			depositHistory: [
				{
					amount,
					id: txn.hash,
					timestamp: Date.now() / 1000,
					isWithdrawal: true,
					transactionStatus: 'running'
				},
				...jobData.depositHistory
			]
		};
		oysterStore.update((value: OysterStore) => {
			return {
				...value,
				jobsData: value.jobsData.map((job) => {
					if (job.id === id) {
						return modifiedJobData;
					}
					return job;
				})
			};
		});
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

export async function handleFinaliseRateRevise(
	jobData: OysterInventoryDataModel,
	newRate: BigNumber
) {
	const { id } = jobData;
	try {
		await finaliseRateReviseOysterJob(id);
		oysterStore.update((value) => {
			return {
				...value,
				jobsData: value.jobsData.map((job) => {
					if (job.id === id) {
						return {
							...job,
							rate: newRate
						};
					}
					return job;
				})
			};
		});
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleGetReviseRateInititaeEndTimestamp(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const timestamp = await getReviseRateInitiateEndTimestamp(id);
		return timestamp;
	} catch (e) {
		console.log('e :>> ', e);
		return 0;
	}
}

export async function handleConfirmJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const tx = await stopOysterJob(id);
		const modifiedJobData = {
			...jobData,
			live: false,
			refund: jobData.balance,
			balance: BigNumberZero,
			status: 'stopped',
			depositHistory: [
				{
					amount: jobData.balance,
					id: tx,
					timestamp: Date.now() / 1000,
					isWithdrawal: true,
					transactionStatus: 'stopped'
				},
				...jobData.depositHistory
			]
		};
		oysterStore.update((value) => {
			return {
				...value,
				jobsData: value.jobsData.map((job) => {
					if (job.id === id) {
						return modifiedJobData;
					}
					return job;
				})
			};
		});
	} catch (e) {
		console.log('e :>> ', e);
		return jobData;
	}
}

export async function handleCreateJob(
	metadata: string,
	provider: string,
	rate: BigNumber,
	balance: BigNumber,
	duration: number
) {
	try {
		const tx = await createNewOysterJob(metadata, provider, rate, balance);
		const nowTime = Date.now() / 1000;
		const { enclaveUrl, instance, region, vcpu, memory } = parseMetadata(metadata);
		const newJob: OysterInventoryDataModel = {
			id: tx,
			provider: {
				address: provider,
				name: ''
			},
			enclaveUrl,
			instance,
			region,
			vcpu,
			memory,
			amountUsed: BigNumberZero,
			refund: BigNumberZero,
			rate,
			balance,
			totalDeposit: balance,
			live: true,
			lastSettled: nowTime,
			createdAt: nowTime,
			endEpochTime: nowTime + duration,
			durationLeft: duration,
			durationRun: 0,
			status: 'running',
			depositHistory: [
				{
					amount: balance,
					id: tx,
					timestamp: nowTime,
					isWithdrawal: false,
					transactionStatus: 'running'
				}
			],
			settlementHistory: []
		};
		oysterStore.update((value) => {
			return {
				...value,
				jobsData: [newJob, ...value.jobsData]
			};
		});
	} catch (e) {
		console.log('e :>> ', e);
		// return jobData;
	}
}
