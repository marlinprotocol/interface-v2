import type { BigNumber, Bytes } from 'ethers';
import {
	OYSTER_RATE_METADATA,
	OYSTER_RATE_SCALING_FACTOR
} from '$lib/utils/constants/oysterConstants';
import {
	addFundsToOysterJob,
	approveFundsForOysterJobAdd,
	cancelRateReviseOysterJob,
	createNewOysterJob,
	finaliseRateReviseOysterJob,
	initiateRateReviseOysterJob,
	settleOysterJob,
	stopOysterJob,
	withdrawFundsFromOysterJob
} from '$lib/controllers/contractController';

import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { OysterStore } from '$lib/types/storeTypes';
import { oysterStore } from '$lib/data-stores/oysterStore';
import { parseMetadata } from '$lib/utils/data-modifiers/oysterModifiers';

export async function handleClaimAmountFromOysterJob(jobId: Bytes) {
	try {
		await settleOysterJob(jobId);
		oysterStore.update((value: OysterStore) => {
			return {
				...value,
				merchantJobsData: value.merchantJobsData.map((job) => {
					if (job.id === jobId) {
						console.log('job :>> ', job);
						return {
							...job,
							amountToBeSettled: BIG_NUMBER_ZERO
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

export async function handleFundsAddToJob(
	jobData: OysterInventoryDataModel,
	amount: BigNumber,
	duration: number
) {
	const { id } = jobData;
	try {
		const txn = await addFundsToOysterJob(id, amount);
		const nowTime = Date.now() / 1000;
		const modifiedJobData = {
			...jobData,
			totalDeposit: jobData.totalDeposit.add(amount),
			balance: jobData.balance.add(amount),
			durationLeft: jobData.durationLeft + duration,
			endEpochTime: jobData.endEpochTime + duration,
			depositHistory: [
				{
					amount,
					id: txn.id,
					txHash: txn.hash,
					timestamp: nowTime,
					isWithdrawal: false,
					transactionStatus: 'deposit'
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
		const nowTime = Date.now() / 1000;
		const modifiedJobData = {
			...jobData,
			totalDeposit: jobData.totalDeposit.sub(amount),
			balance: jobData.balance.sub(amount),
			depositHistory: [
				{
					amount,
					id: txn.id,
					txHash: txn.hash,
					timestamp: nowTime,
					isWithdrawal: true,
					transactionStatus: 'withdrawal'
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

export async function handleInitiateRateRevise(
	jobData: OysterInventoryDataModel,
	newRate: BigNumber
) {
	const { rateReviseWaitingTime } = OYSTER_RATE_METADATA;
	const { id } = jobData;
	try {
		await initiateRateReviseOysterJob(id, newRate);
		const nowTime = Date.now() / 1000;
		const modifiedJobData = {
			...jobData,
			reviseRate: {
				newRate: newRate,
				rateStatus: 'pending',
				stopStatus: newRate.gt(BIG_NUMBER_ZERO) ? 'disabled' : 'pending',
				updatesAt: nowTime + rateReviseWaitingTime
			}
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
	}
}

export async function handleCancelRateRevise(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		await cancelRateReviseOysterJob(id);
		const modifiedJobData = {
			...jobData,
			reviseRate: undefined
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
	}
}

export async function handleJobStatusOnStopTimerEnd(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const nowTime = Date.now() / 1000;
		const modifiedJobData = {
			...jobData,
			reviseRate: {
				newRate: BIG_NUMBER_ZERO,
				rateStatus: 'pending',
				stopStatus: 'completed',
				updatesAt: nowTime
			}
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
							rate: newRate,
							reviseRate: undefined
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

export async function handleConfirmJobStop(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	try {
		const tx = await stopOysterJob(id);
		const nowTime = Date.now() / 1000;
		const modifiedJobData = {
			...jobData,
			live: false,
			refund: jobData.balance,
			balance: BIG_NUMBER_ZERO,
			status: 'stopped',
			rate: BIG_NUMBER_ZERO,
			reviseRate: undefined,
			endEpochTime: nowTime,
			depositHistory: [
				{
					amount: jobData.balance,
					id: tx.id,
					txHash: tx.hash,
					timestamp: nowTime,
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

		const txHash = txn.hash;
		const jobOpenEvent = approveReciept.events?.find((event: any) => event.event === 'JobOpened');
		const jobId = jobOpenEvent?.args?.job;

		const nowTime = Date.now() / 1000;

		const { enclaveUrl, instance, region, vcpu, memory } = parseMetadata(metadata);
		const newJob: OysterInventoryDataModel = {
			id: jobId,
			provider: {
				name: provider?.name || '',
				address: provider.address
			},
			owner,
			metadata,
			enclaveUrl,
			instance,
			region,
			vcpu,
			memory,
			amountUsed: BIG_NUMBER_ZERO,
			refund: BIG_NUMBER_ZERO,
			rate,
			downScaledRate: rate.div(OYSTER_RATE_SCALING_FACTOR),
			balance,
			totalDeposit: balance,
			live: true,
			lastSettled: nowTime,
			createdAt: nowTime,
			endEpochTime: nowTime + durationInSec,
			durationLeft: durationInSec,
			durationRun: 0,
			status: 'running',
			depositHistory: [
				{
					amount: balance,
					id: txHash,
					txHash: txHash,
					timestamp: nowTime,
					isWithdrawal: false,
					transactionStatus: 'deposit'
				}
			],
			amountToBeSettled: BIG_NUMBER_ZERO,
			settlementHistory: []
		};
		oysterStore.update((value) => {
			return {
				...value,
				jobsData: [newJob, ...value.jobsData],
				allowance: value.allowance.sub(balance)
			};
		});
		return true;
	} catch (e) {
		console.log('e :>> ', e);
		return false;
	}
}
