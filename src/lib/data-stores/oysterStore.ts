import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel,
	ProviderData
} from '$lib/types/oysterComponentType';
import type { Address, OysterStore } from '$lib/types/storeTypes';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import type { BytesLike } from 'ethers';
import { derived, writable, type Writable } from 'svelte/store';
import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
import { DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
import type { TokenMetadata } from '$lib/types/environmentTypes';

export const oysterStore: Writable<OysterStore> = writable(DEFAULT_OYSTER_STORE);
export const oysterTokenMetadataStore = derived([chainConfigStore], ([$chainConfigStore]) => {
	const oysterToken = $chainConfigStore.oyster_token;
	return $chainConfigStore.tokens[
		oysterToken as keyof typeof $chainConfigStore.tokens
	] as TokenMetadata;
});
export const oysterRateMetadataStore = derived(
	[chainConfigStore, oysterTokenMetadataStore],
	([$chainConfigStore, $oysterTokenMetadataStore]) => {
		return {
			...$chainConfigStore.oyster_rate_metadata,
			oysterRateScalingFactor:
				10n ** BigInt(DEFAULT_CURRENCY_DECIMALS - $oysterTokenMetadataStore.decimal)
		};
	}
);

// we keep the marketplace data untouched as it does not depend on the wallet address and is loaded
// regardless of whether the user is connected or not.
// NOTE: if the user switches network, the marketplace data is overwritten
/**
 * Resets the oysterStore to its default value. (read file comments)
 */
export function resetOysterStore() {
	oysterStore.update((state) => {
		return {
			...DEFAULT_OYSTER_STORE,
			providerData: {
				registered: false,
				data: undefined
			},
			allMarketplaceData: state.allMarketplaceData,
			jobsData: [],
			allowance: 0n,
			merchantJobsData: [],
			marketplaceLoaded: true,
			credits: {
				isWhitelisted: false,
				balance: 0n
			}
		};
	});
}

export function initializeProviderDataInOysterStore(providerDetails: ProviderData) {
	oysterStore.update((value) => {
		return {
			...value,
			providerData: {
				data: providerDetails,
				registered: true
			},
			providerDetailsLoaded: true
		};
	});
}

export function updateProviderInOysterStore(cpUrl: string, walletAddress: Address) {
	oysterStore.update((value) => {
		return {
			...value,
			providerData: {
				registered: true,
				data: {
					cp: cpUrl,
					id: walletAddress,
					live: true
				}
			}
		};
	});
}

export function removeProviderFromOysterStore() {
	oysterStore.update((value) => {
		value.providerData.registered = false;
		if (value.providerData.data) {
			value.providerData.data.cp = '';
			value.providerData.data.id = '';
			value.providerData.data.live = false;
		}
		return value;
	});
}

export function updateJobStatusByIdInOysterStore(updatedStatus: any) {
	oysterStore.update((state) => {
		const jobData = state.jobsData;
		const jobWithMatchingJobId = jobData.find((job) => updatedStatus.jobId === job.id);

		if (jobWithMatchingJobId) {
			jobWithMatchingJobId.ip = updatedStatus.ip;
		}
		return {
			...state,
			jobsData: jobData
		};
	});
}

export function updateAmountToBeSettledForJobInOysterStore(
	jobId: BytesLike,
	updatedAmount: bigint
) {
	oysterStore.update((value: OysterStore) => {
		return {
			...value,
			merchantJobsData: value.merchantJobsData.map((job) => {
				if (job.id === jobId) {
					return {
						...job,
						amountToBeSettled: updatedAmount
					};
				}
				return job;
			})
		};
	});
}

export function updateMerchantJobsInOysterStore(merchantJobs: OysterInventoryDataModel[] | []) {
	oysterStore.update((value) => {
		return {
			...value,
			merchantJobsData: merchantJobs,
			merchantJobsLoaded: true
		};
	});
}

export function setMerchantJobsLoadedInOysterStore(status: boolean) {
	oysterStore.update((value) => {
		return {
			...value,
			merchantJobsLoaded: status
		};
	});
}

export function updateApprovedFundsInOysterStore(updatedAmount: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			allowance: value.allowance < updatedAmount ? updatedAmount : value.allowance
		};
	});
}

export function addFundsToJobInOysterStore(
	id: BytesLike,
	txn: any,
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const nowTime = Date.now() / 1000;
	const modifiedJobData = {
		...jobData,
		totalDeposit: jobData.totalDeposit + amount,
		balance: jobData.balance + amount,
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
			allowance: value.allowance - amount,
			jobsData: value.jobsData.map((job) => {
				if (job.id === id) {
					return modifiedJobData;
				}
				return job;
			})
		};
	});
}

export function withdrawFundsFromJobInOysterStore(
	id: BytesLike,
	txn: any,
	jobData: OysterInventoryDataModel,
	amount: bigint,
	duration: number
) {
	const nowTime = Date.now() / 1000;
	const modifiedJobData = {
		...jobData,
		totalDeposit: jobData.totalDeposit - amount,
		balance: jobData.balance - amount,
		durationLeft: jobData.durationLeft - duration,
		endEpochTime: jobData.endEpochTime - duration,
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
}

export function initiateRateReviseInOysterStore(
	id: BytesLike,
	jobData: OysterInventoryDataModel,
	newRate: bigint,
	waitingTime: number
) {
	const nowTime = Date.now() / 1000;
	const modifiedJobData = {
		...jobData,
		reviseRate: {
			newRate: newRate,
			rateStatus: 'pending',
			stopStatus: newRate > 0n ? 'disabled' : 'pending',
			updatesAt: nowTime + waitingTime
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
}

export function cancelRateReviseInOysterStore(id: BytesLike, jobData: OysterInventoryDataModel) {
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
}

export function updateJobStatusOnTimerEndInOysterStore(jobData: OysterInventoryDataModel) {
	const { id } = jobData;
	const nowTime = Date.now() / 1000;
	const modifiedJobData = {
		...jobData,
		reviseRate: {
			newRate: 0n,
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
}

export function updateJobRateInOysterStore(id: BytesLike, newRate: bigint) {
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
}

export function stopJobInOysterStore(id: BytesLike, txn: any, jobData: OysterInventoryDataModel) {
	const nowTime = Date.now() / 1000;
	const modifiedJobData: OysterInventoryDataModel = {
		...jobData,
		live: false,
		refund: jobData.balance,
		balance: 0n,
		status: 'stopped',
		rate: 0n,
		reviseRate: undefined,
		endEpochTime: nowTime,
		depositHistory: [
			{
				amount: jobData.balance,
				id: txn.id,
				txHash: txn.hash,
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
}

export function decreaseOysterAllowanceInOysterStore(amountToBeDeducted: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			allowance: value.allowance - amountToBeDeducted
		};
	});
}

export function updateMarketplaceDataInOysterStore(marketPlaceData: OysterMarketplaceDataModel[]) {
	oysterStore.update((store) => {
		return {
			...store,
			allMarketplaceData: marketPlaceData,
			marketplaceLoaded: true
		};
	});
}

export function setMarketplaceLoadedInOysterStore(status: boolean) {
	oysterStore.update((store) => {
		return {
			...store,
			marketplaceLoaded: status
		};
	});
}

export function initializeAllowanceInOysterStore(allowance: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			allowance: allowance
		};
	});
}

export function initializeMarlinCreditsInOysterStore(credits: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			credits: {
				isWhitelisted: credits !== undefined,
				balance: credits
			}
		};
	});
}

export function withdrawCreditsFromOysterStore(amount: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			credits: {
				isWhitelisted: value.credits.isWhitelisted,
				balance: value.credits.balance - amount
			}
		};
	});
}

export function addCreditsToOysterStore(amount: bigint) {
	oysterStore.update((value) => {
		return {
			...value,
			credits: {
				isWhitelisted: value.credits.isWhitelisted,
				balance: value.credits.balance + amount
			}
		};
	});
}

export function initializeInventoryDataInOysterStore(oysterJobs: OysterInventoryDataModel[]) {
	oysterStore.update((value) => {
		return {
			...value,
			jobsData: oysterJobs,
			oysterStoreLoaded: true
		};
	});
}

export function setInventoryDataLoadedInOysterStore(status: boolean) {
	oysterStore.update((value) => {
		return {
			...value,
			oysterStoreLoaded: status
		};
	});
}

export function updateEnclaveUrlForOysterJobInOysterStore(jobId: BytesLike, metadata: string) {
	const enclaveUrl = JSON.parse(metadata).url;
	oysterStore.update((value) => {
		return {
			...value,
			jobsData: value.jobsData.map((job) => {
				if (job.id === jobId) {
					return {
						...job,
						metadata: metadata,
						enclaveUrl: enclaveUrl
					};
				}
				return job;
			})
		};
	});
}
