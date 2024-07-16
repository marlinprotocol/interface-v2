import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	oysterStore,
	resetOysterStore,
	initializeProviderDataInOysterStore,
	updateProviderInOysterStore,
	removeProviderFromOysterStore,
	updateJobStatusByIdInOysterStore,
	updateAmountToBeSettledForJobInOysterStore,
	updateMerchantJobsInOysterStore,
	setMerchantJobsLoadedInOysterStore,
	updateApprovedFundsInOysterStore,
	addFundsToJobInOysterStore,
	withdrawFundsFromJobInOysterStore,
	initiateRateReviseInOysterStore,
	cancelRateReviseInOysterStore,
	updateJobRateInOysterStore,
	decreaseOysterAllowanceInOysterStore,
	updateMarketplaceDataInOysterStore,
	setMarketplaceLoadedInOysterStore,
	initializeAllowanceInOysterStore
} from './oysterStore';
import { DEFAULT_OYSTER_STORE } from '$lib/utils/constants/storeDefaults';
import type { OysterStore } from '$lib/types/storeTypes';
import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';

describe('oysterStore', () => {
	it('should initialize with default values', () => {
		const storeValue = get(oysterStore);
		expect(storeValue).toEqual(expect.objectContaining(DEFAULT_OYSTER_STORE));
	});

	it('should reset the store to default values', () => {
		updateProviderInOysterStore('http://example.com', '0x123');

		resetOysterStore();

		const storeValue = get(oysterStore);
		expect(storeValue).toEqual(
			expect.objectContaining({
				...DEFAULT_OYSTER_STORE,
				providerData: {
					registered: false,
					data: undefined
				},
				marketplaceLoaded: true,
				merchantJobsLoaded: true,
				credits: {
					isWhitelisted: false,
					balance: 0n
				}
			})
		);
	});

	it('should initialize provider data', () => {
		const providerDetails = {
			cp: 'http://example.com',
			id: '0x123',
			live: true
		};

		initializeProviderDataInOysterStore(providerDetails);

		const storeValue = get(oysterStore);
		expect(storeValue.providerData).toEqual({
			data: providerDetails,
			registered: true
		});
		expect(storeValue.providerDetailsLoaded).toBe(true);
	});

	it('should update provider data', () => {
		updateProviderInOysterStore('http://example.com', '0x123');

		const storeValue = get(oysterStore);
		expect(storeValue.providerData).toEqual({
			registered: true,
			data: {
				cp: 'http://example.com',
				id: '0x123',
				live: true
			}
		});
	});

	it('should remove provider data', () => {
		updateProviderInOysterStore('http://example.com', '0x123');

		removeProviderFromOysterStore();

		const storeValue = get(oysterStore);
		expect(storeValue.providerData).toEqual({
			registered: false,
			data: {
				cp: '',
				id: '',
				live: false
			}
		});
	});
});

describe('oysterStore functions', () => {
	beforeEach(() => {
		oysterStore.set({
			jobsData: [
				{ id: '1', ip: 'old-ip' },
				{ id: '2', ip: 'another-ip' }
			],
			merchantJobsData: [
				{ id: '1', status: 'active', amountToBeSettled: 100n },
				{ id: '2', status: 'completed', amountToBeSettled: 200n }
			]
		} as OysterStore);
	});

	describe('updateJobStatusByIdInOysterStore', () => {
		it('should update the IP of a job with matching ID', () => {
			updateJobStatusByIdInOysterStore({ jobId: '1', ip: 'new-ip' });
			const updatedStore = get(oysterStore);
			expect(updatedStore.jobsData[0].ip).toBe('new-ip');
			expect(updatedStore.jobsData[1].ip).toBe('another-ip');
		});

		it('should not modify the store if no matching job is found', () => {
			updateJobStatusByIdInOysterStore({ jobId: '3', ip: 'non-existent' });
			const updatedStore = get(oysterStore);
			expect(updatedStore.jobsData).toEqual([
				{ id: '1', ip: 'old-ip' },
				{ id: '2', ip: 'another-ip' }
			]);
		});
	});

	describe('updateAmountToBeSettledForJobInOysterStore', () => {
		it('should update amountToBeSettled for an active job', () => {
			updateAmountToBeSettledForJobInOysterStore('1', 150n);
			const updatedStore = get(oysterStore);
			expect(updatedStore.merchantJobsData[0].amountToBeSettled).toBe(150n);
			expect(updatedStore.merchantJobsData[0].status).toBe('active');
		});

		it('should change status to stopped for a completed job', () => {
			updateAmountToBeSettledForJobInOysterStore('2', 250n);
			const updatedStore = get(oysterStore);
			expect(updatedStore.merchantJobsData[1].status).toBe('stopped');
			expect(updatedStore.merchantJobsData[1].amountToBeSettled).toBe(200n);
		});

		it('should not modify other jobs', () => {
			updateAmountToBeSettledForJobInOysterStore('1', 150n);
			const updatedStore = get(oysterStore);
			expect(updatedStore.merchantJobsData[1]).toEqual({
				id: '2',
				status: 'completed',
				amountToBeSettled: 200n
			});
		});
	});

	describe('updateMerchantJobsInOysterStore', () => {
		it('should update merchantJobsData with new jobs', () => {
			const newJobs = [
				{ id: '3', status: 'pending', amountToBeSettled: 300n },
				{ id: '4', status: 'pending', amountToBeSettled: 400n }
			] as OysterInventoryDataModel[];
			updateMerchantJobsInOysterStore(newJobs);
			const updatedStore = get(oysterStore);
			expect(updatedStore.merchantJobsData).toEqual(newJobs);
			expect(updatedStore.merchantJobsLoaded).toBe(true);
		});

		it('should set merchantJobsData to an empty array when given empty input', () => {
			updateMerchantJobsInOysterStore([]);
			const updatedStore = get(oysterStore);
			expect(updatedStore.merchantJobsData).toEqual([]);
			expect(updatedStore.merchantJobsLoaded).toBe(true);
		});
	});
});

describe('oysterStore1', () => {
	beforeEach(() => {
		oysterStore.set(DEFAULT_OYSTER_STORE);
	});

	it('setMerchantJobsLoadedInOysterStore updates merchantJobsLoaded', () => {
		setMerchantJobsLoadedInOysterStore(true);
		expect(get(oysterStore).merchantJobsLoaded).toBe(true);

		setMerchantJobsLoadedInOysterStore(false);
		expect(get(oysterStore).merchantJobsLoaded).toBe(false);
	});

	it('updateApprovedFundsInOysterStore updates allowance', () => {
		updateApprovedFundsInOysterStore(100n);
		expect(get(oysterStore).allowance).toBe(100n);

		updateApprovedFundsInOysterStore(50n);
		expect(get(oysterStore).allowance).toBe(100n);

		updateApprovedFundsInOysterStore(200n);
		expect(get(oysterStore).allowance).toBe(200n);
	});

	it('addFundsToJobInOysterStore updates job data and allowance', () => {
		const mockJob = {
			id: '0x123',
			totalDeposit: 100n,
			balance: 100n,
			durationLeft: 1000,
			endEpochTime: 1000000,
			depositHistory: []
		};
		oysterStore.update((store) => ({
			...store,
			jobsData: [mockJob] as unknown as OysterInventoryDataModel[],
			allowance: 500n
		}));

		const mockTxn = { id: 'txn1', hash: '0xabc' };
		vi.spyOn(Date, 'now').mockImplementation(() => 1000000000);

		addFundsToJobInOysterStore(
			'0x123',
			mockTxn,
			mockJob as unknown as OysterInventoryDataModel,
			50n,
			500
		);

		const updatedStore = get(oysterStore);
		expect(updatedStore.allowance).toBe(450n);
		expect(updatedStore.jobsData[0]).toEqual({
			...mockJob,
			totalDeposit: 150n,
			balance: 150n,
			durationLeft: 1500,
			endEpochTime: 1000500,
			depositHistory: [
				{
					amount: 50n,
					id: 'txn1',
					txHash: '0xabc',
					timestamp: 1000000,
					isWithdrawal: false,
					transactionStatus: 'deposit'
				}
			]
		});
	});

	it('withdrawFundsFromJobInOysterStore updates job data', () => {
		const mockJob = {
			id: '0x123',
			totalDeposit: 200n,
			balance: 200n,
			durationLeft: 2000,
			endEpochTime: 2000000,
			depositHistory: []
		};
		oysterStore.update((store) => ({
			...store,
			jobsData: [mockJob] as unknown as OysterInventoryDataModel[]
		}));

		const mockTxn = { id: 'txn2', hash: '0xdef' };
		vi.spyOn(Date, 'now').mockImplementation(() => 2000000000);

		withdrawFundsFromJobInOysterStore(
			'0x123',
			mockTxn,
			mockJob as unknown as OysterInventoryDataModel,
			50n,
			500
		);

		const updatedStore = get(oysterStore);
		expect(updatedStore.jobsData[0]).toEqual({
			...mockJob,
			totalDeposit: 150n,
			balance: 150n,
			durationLeft: 1500,
			endEpochTime: 1999500,
			depositHistory: [
				{
					amount: 50n,
					id: 'txn2',
					txHash: '0xdef',
					timestamp: 2000000,
					isWithdrawal: true,
					transactionStatus: 'withdrawal'
				}
			]
		});
	});

	it('initiateRateReviseInOysterStore updates job reviseRate', () => {
		const mockJob = { id: '0x123' };
		oysterStore.update((store) => ({
			...store,
			jobsData: [mockJob] as OysterInventoryDataModel[]
		}));

		vi.spyOn(Date, 'now').mockImplementation(() => 3000000000);

		initiateRateReviseInOysterStore('0x123', mockJob as OysterInventoryDataModel, 75n, 1000);

		const updatedStore = get(oysterStore);
		expect(updatedStore.jobsData[0].reviseRate).toEqual({
			newRateScaled: 75n,
			rateStatus: 'pending',
			stopStatus: 'disabled',
			updatesAt: 3001000
		});
	});

	it('cancelRateReviseInOysterStore removes reviseRate from job', () => {
		const mockJob = {
			id: '0x123',
			reviseRate: {
				newRateScaled: 75n,
				rateStatus: 'pending',
				stopStatus: 'disabled',
				updatesAt: 3001000
			}
		};
		oysterStore.update((store) => ({
			...store,
			jobsData: [mockJob] as OysterInventoryDataModel[]
		}));

		cancelRateReviseInOysterStore('0x123', mockJob as OysterInventoryDataModel);

		const updatedStore = get(oysterStore);
		expect(updatedStore.jobsData[0].reviseRate).toBeUndefined();
	});
});

describe('oysterStore2', () => {
	beforeEach(() => {
		oysterStore.set({
			...DEFAULT_OYSTER_STORE,
			jobsData: [],
			allowance: 0n,
			allMarketplaceData: [],
			marketplaceLoaded: false
		});
	});

	it('should update job rate', () => {
		oysterStore.update((store) => ({
			...store,
			jobsData: [{ id: '1', rateScaled: 10n, durationLeft: 100 } as OysterInventoryDataModel]
		}));
		updateJobRateInOysterStore('1', 20n, 200);
		const updatedStore = get(oysterStore);
		expect(updatedStore.jobsData[0]).toEqual({
			id: '1',
			rateScaled: 20n,
			durationLeft: 200,
			reviseRate: undefined
		});
	});

	it('should decrease oyster allowance', () => {
		oysterStore.update((store) => ({ ...store, allowance: 100n }));
		decreaseOysterAllowanceInOysterStore(30n);
		const updatedStore = get(oysterStore);
		expect(updatedStore.allowance).toBe(70n);
	});

	it('should update marketplace data', () => {
		const marketplaceData: OysterMarketplaceDataModel[] = [
			{
				id: '1',
				name: 'Marketplace 1',
				allowed_regions: ['us-west-1']
			} as unknown as OysterMarketplaceDataModel
		];
		updateMarketplaceDataInOysterStore(marketplaceData);
		const updatedStore = get(oysterStore);
		expect(updatedStore.allMarketplaceData).toEqual(marketplaceData);
		expect(updatedStore.marketplaceLoaded).toBe(true);
	});

	it('should set marketplace loaded status', () => {
		setMarketplaceLoadedInOysterStore(true);
		const updatedStore = get(oysterStore);
		expect(updatedStore.marketplaceLoaded).toBe(true);
	});

	it('should initialize allowance', () => {
		initializeAllowanceInOysterStore(500n);
		const updatedStore = get(oysterStore);
		expect(updatedStore.allowance).toBe(500n);
	});
});
