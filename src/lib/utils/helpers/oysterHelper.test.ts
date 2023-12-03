// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { describe, expect, test } from 'vitest';
import {
	addAllToList,
	addRegionNameToMarketplaceData,
	computeCost,
	computeDuration,
	computeDurationString,
	getBandwidthFromRateAndRegion,
	getDurationInSecondsForUnit,
	getInventoryDurationVariant,
	getInventoryStatusVariant,
	getRateForProviderAndFilters,
	getSearchedInventoryData,
	getSearchedMarketplaceData,
	getSearchedOysterJobsData,
	getUpdatedFiltersList,
	getCreateOrderInstanceRegionFilters,
	sortOysterInventory,
	sortOysterMarketplace,
	sortOysterOperatorHistory,
	sortOysterOperatorInventory
} from './oysterHelpers';
import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';

describe('getSearchedInventoryData', () => {
	const mockData = [
		{
			instance: 'instancea',
			region: 'regiona',
			provider: {
				name: 'namea',
				address: 'addressa'
			}
		},
		{
			instance: 'instanceb',
			region: 'regionb',
			provider: {
				name: 'nameb',
				address: 'addressb'
			}
		},
		{
			instance: 'instancec',
			region: 'regionc',
			provider: {
				name: 'namec',
				address: 'addressc'
			}
		}
	];
	test('should return empty array if no data is present', () => {
		expect(getSearchedInventoryData('randomsearchstring', [])).toStrictEqual([]);
	});

	test('should return all the data if searchInput is empty', () => {
		expect(getSearchedInventoryData('', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
	});

	test('should return filtered data if searchInput is present', () => {
		expect(
			getSearchedInventoryData('instancea', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedInventoryData('INSTANCEA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedInventoryData('regiona', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedInventoryData('REGIONA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(getSearchedInventoryData('namea', mockData as OysterInventoryDataModel[])).toStrictEqual(
			[mockData[0]]
		);
		expect(getSearchedInventoryData('NAMEA', mockData as OysterInventoryDataModel[])).toStrictEqual(
			[mockData[0]]
		);
		expect(
			getSearchedInventoryData('addressa', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedInventoryData('ADDRESSA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedInventoryData('instance', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedInventoryData('INSTANCE', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedInventoryData('region', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedInventoryData('REGION', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(getSearchedInventoryData('name', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
		expect(getSearchedInventoryData('NAME', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
		expect(
			getSearchedInventoryData('address', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedInventoryData('ADDRESS', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
	});

	test('should return empty array if no match is found', () => {
		expect(
			getSearchedInventoryData('instanced', mockData as OysterInventoryDataModel[])
		).toStrictEqual([]);
		expect(
			getSearchedInventoryData('randomstring', mockData as OysterInventoryDataModel[])
		).toStrictEqual([]);
	});
});

describe('getSearchedOysterJobsData', () => {
	const mockData = [
		{
			instance: 'instancea',
			region: 'regiona',
			owner: 'ownera'
		},
		{
			instance: 'instanceb',
			region: 'regionb',
			owner: 'ownerb'
		},
		{
			instance: 'instancec',
			region: 'regionc',
			owner: 'ownerc'
		}
	];

	test('should return empty array if no data is present', () => {
		expect(getSearchedOysterJobsData('randomsearchstring', [])).toStrictEqual([]);
	});

	test('should return all the data if searchInput is empty', () => {
		expect(getSearchedOysterJobsData('', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
	});

	test('should return filtered data if searchInput is present', () => {
		expect(
			getSearchedOysterJobsData('instancea', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('INSTANCEA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('regiona', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('REGIONA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);

		expect(
			getSearchedOysterJobsData('ownera', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('OWNERA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('instance', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedOysterJobsData('INSTANCE', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedOysterJobsData('region', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedOysterJobsData('REGION', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);

		expect(
			getSearchedOysterJobsData('owner', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedOysterJobsData('OWNER', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
	});

	test('should return empty array if no match is found', () => {
		expect(
			getSearchedOysterJobsData('instanced', mockData as OysterInventoryDataModel[])
		).toStrictEqual([]);
		expect(
			getSearchedOysterJobsData('randomstring', mockData as OysterInventoryDataModel[])
		).toStrictEqual([]);
	});
});

describe('getSearchedMarketplaceData', () => {
	const mockData = [
		{
			instance: 'instancea',
			region: 'regiona',
			provider: {
				name: 'namea',
				address: 'addressa'
			}
		},
		{
			instance: 'instanceb',
			region: 'regionb',
			provider: {
				name: 'nameb',
				address: 'addressb'
			}
		},
		{
			instance: 'instancec',
			region: 'regionc',
			provider: {
				name: 'namec',
				address: 'addressc'
			}
		}
	];
	test('should return empty array if no data is present', () => {
		expect(getSearchedMarketplaceData('randomsearchstring', [])).toStrictEqual([]);
	});

	test('should return all the data if searchInput is empty', () => {
		expect(getSearchedMarketplaceData('', mockData as OysterMarketplaceDataModel[])).toStrictEqual(
			mockData
		);
	});

	test('should return filtered data if searchInput is present', () => {
		expect(
			getSearchedMarketplaceData('instancea', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedMarketplaceData('INSTANCEA', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedMarketplaceData('regiona', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedMarketplaceData('REGIONA', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedMarketplaceData('instance', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedMarketplaceData('INSTANCE', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedMarketplaceData('region', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedMarketplaceData('REGION', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual(mockData);
	});

	test('should return empty array if no match is found', () => {
		expect(
			getSearchedMarketplaceData('instanced', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([]);
		expect(
			getSearchedMarketplaceData('randomstring', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([]);
	});
});

describe('getInventoryStatusVariant', () => {
	test('should return success variant if status is running', () => {
		expect(getInventoryStatusVariant('running')).toBe('success');
	});

	test('should return success variant if status is active', () => {
		expect(getInventoryStatusVariant('active')).toBe('success');
	});

	test('should return completed variant if status is active', () => {
		expect(getInventoryStatusVariant('completed')).toBe('success');
	});

	test('should return error variant if status is inactive', () => {
		expect(getInventoryStatusVariant('inactive')).toBe('error');
	});

	test('should return error variant if status is stopped', () => {
		expect(getInventoryStatusVariant('stopped')).toBe('error');
	});

	test('should return warning variant if status is pending', () => {
		expect(getInventoryStatusVariant('pending')).toBe('warning');
	});

	test('should return primary variant if status is closed', () => {
		expect(getInventoryStatusVariant('closed')).toBe('primary');
	});

	test('should return primary variant if status is any other string', () => {
		expect(getInventoryStatusVariant('anyotherstring')).toBe('primary');
	});
});

describe('getInventoryDurationVariant', () => {
	test('should return error variant if duration is less than OYSTER_CAUTION_DURATION', () => {
		expect(getInventoryDurationVariant(1)).toBe('error');
	});

	test('should return warning variant if duration is less than OYSTER_WARNING_DURATION', () => {
		expect(getInventoryDurationVariant(86401)).toBe('warning');
	});

	test('should return success variant if duration is greater than OYSTER_WARNING_DURATION', () => {
		expect(getInventoryDurationVariant(259201)).toBe('success');
	});
});

describe('sortOysterInventory', () => {
	const mockData = [
		{
			instance: 'instancea',
			balance: 1000n,
			memory: 2,
			rate: 100n,
			region: 'regiona',
			vcpu: 3,
			totalDeposit: 10003n,
			amountUsed: 111n,
			refund: 10n,
			durationLeft: 500,
			durationRun: 200,
			createdAt: 1000,
			lastSettled: 1001,
			endEpochTime: 2000,
			status: 'running'
		},
		{
			instance: 'instanceb',
			balance: 2000n,
			memory: 1,
			rate: 200n,
			region: 'regionb',
			vcpu: 2,
			totalDeposit: 10002n,
			amountUsed: 222n,
			refund: 20n,
			durationLeft: 400,
			durationRun: 300,
			createdAt: 2000,
			lastSettled: 2001,
			endEpochTime: 3000,
			status: 'closed'
		},
		{
			instance: 'instancec',
			balance: 3000n,
			memory: 3,
			rate: 300n,
			region: 'regionc',
			vcpu: 1,
			totalDeposit: 10001n,
			amountUsed: 333n,
			refund: 30n,
			durationLeft: 300,
			durationRun: 400,
			createdAt: 3000,
			lastSettled: 3001,
			endEpochTime: 4000,
			status: 'completed'
		}
	];

	test('should return empty array if no data is present', () => {
		expect(sortOysterInventory([], 'memory', 'asc')).toStrictEqual([]);
	});

	test('should return ascending sorted data when passed asc as third arg', () => {
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'memory', 'asc')
		).toStrictEqual([
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'instance', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'vcpu', 'asc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'rate', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'region', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'refund', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'amountUsed', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'balance', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'totalDeposit', 'asc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'durationLeft', 'asc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'durationRun', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'createdAt', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'lastSettled', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'endEpochTime', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'status', 'asc')
		).toStrictEqual([
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);
	});

	test('should return descending sorted data when passed desc as third arg', () => {
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'memory', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'instance', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'rate', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'region', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'vcpu', 'desc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'totalDeposit', 'desc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'amountUsed', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'refund', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'durationLeft', 'desc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'durationRun', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);

		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'createdAt', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'lastSettled', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'endEpochTime', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},
			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			},
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			}
		]);
		expect(
			sortOysterInventory(mockData as OysterInventoryDataModel[], 'status', 'desc')
		).toStrictEqual([
			{
				instance: 'instancea',
				balance: 1000n,
				memory: 2,
				rate: 100n,
				region: 'regiona',
				vcpu: 3,
				totalDeposit: 10003n,
				amountUsed: 111n,
				refund: 10n,
				durationLeft: 500,
				durationRun: 200,
				createdAt: 1000,
				lastSettled: 1001,
				endEpochTime: 2000,
				status: 'running'
			},
			{
				instance: 'instancec',
				balance: 3000n,
				memory: 3,
				rate: 300n,
				region: 'regionc',
				vcpu: 1,
				totalDeposit: 10001n,
				amountUsed: 333n,
				refund: 30n,
				durationLeft: 300,
				durationRun: 400,
				createdAt: 3000,
				lastSettled: 3001,
				endEpochTime: 4000,
				status: 'completed'
			},

			{
				instance: 'instanceb',
				balance: 2000n,
				memory: 1,
				rate: 200n,
				region: 'regionb',
				vcpu: 2,
				totalDeposit: 10002n,
				amountUsed: 222n,
				refund: 20n,
				durationLeft: 400,
				durationRun: 300,
				createdAt: 2000,
				lastSettled: 2001,
				endEpochTime: 3000,
				status: 'closed'
			}
		]);
	});
});

describe('sortOysterOperatorInventory', () => {
	const mockData = [
		{
			amountToBeSettled: 1001n,
			instance: 'instancea',
			region: 'regiona',
			status: 'running',
			owner: 'owner1',
			durationLeft: 500,
			durationRun: 201,
			createdAt: 1002
		},
		{
			amountToBeSettled: 1000n,
			instance: 'instanceb',
			region: 'regionb',
			status: 'pending',
			owner: 'owner2',
			durationLeft: 501,
			durationRun: 200,
			createdAt: 1001
		},
		{
			amountToBeSettled: 1002n,
			instance: 'instancec',
			region: 'regionc',
			status: 'completed',
			owner: 'owner3',
			durationLeft: 502,
			durationRun: 202,
			createdAt: 1000
		}
	];

	test('should return an empty array if no data is present', () => {
		expect(sortOysterOperatorInventory([], 'region', 'asc')).toStrictEqual([]);
	});

	test('should return ascending sorted data when passed asc as third arg', () => {
		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'region', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(
				mockData as OysterInventoryDataModel[],
				'amountToBeSettled',
				'asc'
			)
		).toStrictEqual([
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'instance', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'status', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'durationLeft', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'durationRun', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'createdAt', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'owner', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);
	});

	test('should return descending sorted data when passed desc as third arg', () => {
		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'region', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);

		expect(
			sortOysterOperatorInventory(
				mockData as OysterInventoryDataModel[],
				'amountToBeSettled',
				'desc'
			)
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'instance', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'status', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'durationLeft', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'durationRun', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'createdAt', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			}
		]);

		expect(
			sortOysterOperatorInventory(mockData as OysterInventoryDataModel[], 'owner', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3',
				durationLeft: 502,
				durationRun: 202,
				createdAt: 1000
			},
			{
				amountToBeSettled: 1000n,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2',
				durationLeft: 501,
				durationRun: 200,
				createdAt: 1001
			},
			{
				amountToBeSettled: 1001n,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1',
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002
			}
		]);
	});
});

describe('sortOysterOperatorHistory', () => {
	const mockData = [
		{
			amountToBeSettled: 1001n,
			durationLeft: 500,
			durationRun: 201,
			createdAt: 1002,
			instance: 'instancea',
			region: 'regiona',
			status: 'running',
			owner: 'owner1'
		},
		{
			amountToBeSettled: 1000n,
			durationLeft: 501,
			durationRun: 202,
			createdAt: 1001,
			instance: 'instanceb',
			region: 'regionb',
			status: 'pending',
			owner: 'owner2'
		},
		{
			amountToBeSettled: 1002n,
			durationLeft: 502,
			durationRun: 200,
			createdAt: 1000,
			instance: 'instancec',
			region: 'regionc',
			status: 'completed',
			owner: 'owner3'
		}
	];

	test('should return an empty array if no data is present', () => {
		expect(sortOysterOperatorHistory([], 'region', 'asc')).toStrictEqual([]);
	});

	test('should return ascending sorted data when passed asc as third arg', () => {
		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'region', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'amountToBeSettled', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'instance', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'status', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'durationLeft', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'durationRun', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'createdAt', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'owner', 'asc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);
	});

	test('should return descending sorted data when passed desc as third arg', () => {
		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'region', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'amountToBeSettled', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'instance', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'status', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'durationLeft', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'durationRun', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'createdAt', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			}
		]);

		expect(
			sortOysterOperatorHistory(mockData as OysterInventoryDataModel[], 'owner', 'desc')
		).toStrictEqual([
			{
				amountToBeSettled: 1002n,
				durationLeft: 502,
				durationRun: 200,
				createdAt: 1000,
				instance: 'instancec',
				region: 'regionc',
				status: 'completed',
				owner: 'owner3'
			},
			{
				amountToBeSettled: 1000n,
				durationLeft: 501,
				durationRun: 202,
				createdAt: 1001,
				instance: 'instanceb',
				region: 'regionb',
				status: 'pending',
				owner: 'owner2'
			},
			{
				amountToBeSettled: 1001n,
				durationLeft: 500,
				durationRun: 201,
				createdAt: 1002,
				instance: 'instancea',
				region: 'regiona',
				status: 'running',
				owner: 'owner1'
			}
		]);
	});
});

describe('sortOysterMarketplace', () => {
	const mockData = [
		{
			instance: 'instancea',
			memory: 2,
			rateScaled: 100n,
			region: 'regiona',
			vcpu: 3
		},
		{
			instance: 'instanceb',
			memory: 1,
			rateScaled: 200n,
			region: 'regionb',
			vcpu: 2
		},
		{
			instance: 'instancec',
			memory: 3,
			rateScaled: 300n,
			region: 'regionc',
			vcpu: 1
		}
	];

	test('should return empty array if no data is present', () => {
		expect(sortOysterMarketplace([], 'memory', 'asc')).toStrictEqual([]);
	});

	test('should return ascending sorted data when passed asc as third arg', () => {
		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'memory', 'asc')
		).toStrictEqual([
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'instance', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'vcpu', 'asc')
		).toStrictEqual([
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'rateScaled', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'region', 'asc')
		).toStrictEqual([
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			}
		]);
	});

	test('should return descending sorted data when passed desc as third arg', () => {
		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'memory', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'instance', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'rateScaled', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'region', 'desc')
		).toStrictEqual([
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			}
		]);

		expect(
			sortOysterMarketplace(mockData as OysterMarketplaceDataModel[], 'vcpu', 'desc')
		).toStrictEqual([
			{
				instance: 'instancea',
				memory: 2,
				rateScaled: 100n,
				region: 'regiona',
				vcpu: 3
			},
			{
				instance: 'instanceb',
				memory: 1,
				rateScaled: 200n,
				region: 'regionb',
				vcpu: 2
			},
			{
				instance: 'instancec',
				memory: 3,
				rateScaled: 300n,
				region: 'regionc',
				vcpu: 1
			}
		]);
	});
});

describe('addAllToList', () => {
	test('should return back the original data with set() performed on it if data length is zero or second argument is false', () => {
		expect(addAllToList([], true)).toStrictEqual([...new Set([])]);
		expect(addAllToList(['item1', 'item1', 'item2', 'item3'], false)).toStrictEqual([
			'item1',
			'item2',
			'item3'
		]);
	});

	test('should return all appended to set() of original data if arguments are truthy', () => {
		expect(addAllToList(['item1', 'item1', 'item2', 'item3'], true)).toStrictEqual([
			'All',
			'item1',
			'item2',
			'item3'
		]);
	});
});

describe('getUpdatedFiltersList', () => {
	test('should return the same filters when previousFilters and currentFilters are the same', () => {
		const prevFilters = {
			arch: ['All', 'x86_64'],
			instance: ['All', 't2.micro'],
			region: ['All', 'us-east-1'],
			vcpu: ['All', '1'],
			memory: ['All', '1'],
			provider: ['All', 'kivous mirash']
		};

		const currentFilters = {
			arch: ['All', 'x86_64'],
			instance: ['All', 't2.micro'],
			region: ['All', 'us-east-1'],
			vcpu: ['All', '1'],
			memory: ['All', '1'],
			provider: ['All', 'kivous mirash']
		};

		expect(getUpdatedFiltersList(prevFilters, currentFilters, ['instance'])).toStrictEqual(
			prevFilters
		);
	});

	test('should return the current filter if filterIdOrders is an empty array', () => {
		const prevFilters = {
			arch: ['All', 'arch'],
			instance: ['All', 't2.micro'],
			region: ['All', 'us-east-1'],
			vcpu: ['All', '1'],
			memory: ['All', '1'],
			provider: ['All', 'kivous mirash']
		};

		const currentFilters = {
			arch: ['All', 'amd'],
			instance: ['All', 't2.micro.2'],
			region: ['All', 'us-east-2'],
			vcpu: ['All', '4'],
			memory: ['All', '8'],
			provider: ['All', 'tensa zangetsu']
		};

		expect(getUpdatedFiltersList(prevFilters, currentFilters, [])).toStrictEqual(currentFilters);
	});

	test('should return object that matches prevFilters when prevFilters and currFilters are not same', () => {
		const prevFilters = {
			arch: ['All', 'arch', 'amd'],
			instance: ['All', 't2.micro', 't2.micro.2'],
			region: ['All', 'us-east-1', 'us-east-2'],
			vcpu: ['All', '1', '2', '3'],
			memory: ['All', '1', '2', '3'],
			provider: ['All', 'kivous mirash', 'tensa zangetsu']
		};

		const currentFilters = {
			arch: ['All', 'arch', 'amd'],
			instance: ['All', 't2.micro', 't2.micro.2'],
			region: ['All', 'us-east-1', 'us-east-2'],
			vcpu: ['All', '1'],
			memory: ['All', '1', '2', '3'],
			provider: ['All', 'kivous mirash', 'tensa zangetsu']
		};

		expect(getUpdatedFiltersList(prevFilters, currentFilters, ['vcpu'])).toStrictEqual(prevFilters);
	});
});

describe('getRateForProviderAndFilters', () => {
	const mockData = [
		{
			instance: 'instanca',
			region: 'regiona',
			provider: {
				name: 'provider1',
				address: 'providerAddress1'
			},
			rateScaled: 100n
		},
		{
			instance: 'instancb',
			region: 'regionb',
			provider: {
				name: 'provider2',
				address: 'providerAddress2'
			},
			rateScaled: 200n
		},
		{
			instance: 'instancc',
			region: 'regionc',
			provider: {
				name: 'provider3',
				address: 'providerAddress3'
			}
		}
	];

	test('should return undefined if providerAddress, instance or region is falsy', () => {
		expect(getRateForProviderAndFilters(undefined, 'instance', 'region', mockData)).toBe(undefined);
		expect(getRateForProviderAndFilters('providerAddress', undefined, 'region', mockData)).toBe(
			undefined
		);
		expect(getRateForProviderAndFilters('providerAddress', 'instance', undefined, mockData)).toBe(
			undefined
		);
	});

	test('should return the rateScaled of the desired region instance and provider', () => {
		expect(getRateForProviderAndFilters('providerAddress1', 'instanca', 'regiona', mockData)).toBe(
			100n
		);
	});

	test('should return undefined if the instance exists but does not have the rateScaled key in its object', () => {
		expect(getRateForProviderAndFilters('providerAddress3', 'instancc', 'regionc', mockData)).toBe(
			undefined
		);
	});
});

describe('getCreateOrderInstanceRegionFilters', () => {
	const mockData = [
		{
			provider: {
				address: 'providerAddress1',
				name: 'providerName1'
			},
			regionName: 'regionName1',
			region: 'region1',
			instance: 'instance1',
			arch: 'arch1',
			vcpu: 'vcpu1',
			memories: 'memories1'
		},
		{
			provider: {
				address: 'providerAddress1',
				name: 'providerName1'
			},
			regionName: 'regionName2',
			region: 'region2',
			instance: 'instance2',
			arch: 'arch2',
			vcpu: 'vcpu2',
			memories: 'memories2'
		},
		{
			provider: {
				address: 'providerAddress3',
				name: 'providerName3'
			},
			regionName: 'regionName3',
			region: 'region3',
			instance: 'instance3',
			arch: 'arch2',
			vcpu: 'vcpu2',
			memories: 'memories3'
		},
		{
			provider: {
				address: 'providerAddress4',
				name: 'providerName4'
			},
			regionName: 'regionName4',
			region: 'region4',
			instance: 'instance4',
			arch: 'arch1',
			vcpu: 'vcpu1',
			memories: 'memories4'
		},
		{
			provider: {
				address: 'providerAddress5',
				name: 'providerName5'
			},
			regionName: 'regionName5',
			region: 'region5',
			instance: 'instance5',
			arch: 'arch1',
			vcpu: 'vcpu1',
			memories: 'memories5'
		}
	];

	test('should return an empty object if providerAddress or marketplaceData is falsy', () => {
		expect(getCreateOrderInstanceRegionFilters(undefined, mockData)).toStrictEqual({});
		expect(
			getCreateOrderInstanceRegionFilters('providerAddressDoesNotMatterSinceMockDataIsFalsy', [])
		).toStrictEqual({});
	});

	test('should return instance and region filters if inputs are truthy', () => {
		expect(getCreateOrderInstanceRegionFilters('providerAddress1', mockData)).toStrictEqual({
			instance: ['instance1', 'instance2'],
			region: [
				['regionName1', 'region1'],
				['regionName2', 'region2']
			]
		});

		expect(getCreateOrderInstanceRegionFilters('providerAddress4', mockData)).toStrictEqual({
			instance: ['instance4'],
			region: [['regionName4', 'region4']]
		});
	});
});

describe('computeCost', () => {
	test('should return 0n if rate or duration are falsy', () => {
		expect(computeCost(0, 0n)).toBe(0n);
		expect(computeCost(1, 0n)).toBe(0n);
		expect(computeCost(0, 1n)).toBe(0n);
		expect(computeCost(0)).toBe(0n);
	});

	test('should return the cost when duration and rate are truthy', () => {
		expect(computeCost(1, 1n)).toBe(1n);
	});
});

describe('computeDuration', () => {
	test('should return 0 if the duration string is not a valid amount', () => {
		expect(computeDuration('invalidString', 1)).toBe(0);
		expect(computeDuration('1.!', 1)).toBe(0);
		expect(computeDuration('1.1.', 1)).toBe(0);
		expect(computeDuration('1. 1', 1)).toBe(0);
	});
	test('should return the duration when duration string is a valid amount', () => {
		expect(computeDuration('1.1', 1)).toBe(1);
		expect(computeDuration('1', 120)).toBe(120);
		expect(computeDuration('500', 3600)).toBe(1800000);
	});
});

describe('computeDurationString', () => {
	test('should return an empty string if duration is falsy or durationUnitInSec is zero', () => {
		expect(computeDurationString(undefined, 1)).toBe('');
		expect(computeDurationString(0, 1)).toBe('');
		expect(computeDurationString(10, 0)).toBe('');
	});

	test('should return a duration string', () => {
		expect(computeDurationString(10, 1)).toBe('10');
		expect(computeDurationString(60, 60)).toBe('1');
		expect(computeDurationString(3600, 60)).toBe('60');
		expect(computeDurationString(3601, 60)).toBe('60');
	});
});

describe('addRegionNameToMarketplaceData', () => {
	const mockData = [
		{
			region: 'us-east-1'
		},
		{
			region: 'ap-east-1'
		},
		{
			region: 'ap-southeast-1'
		}
	];

	test('should return empty array if marketplace data is falsy or has length zero', () => {
		expect(addRegionNameToMarketplaceData([])).toStrictEqual([]);
	});

	test('should return region mapped data if marketplace data is present', () => {
		expect(addRegionNameToMarketplaceData(mockData as OysterMarketplaceDataModel[])).toStrictEqual([
			{
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)'
			},
			{
				region: 'ap-east-1',
				regionName: 'Asia Pacific (Hong Kong)'
			},
			{
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)'
			}
		]);
	});
});

describe('getBandwidthFromRateAndRegion', () => {
	test('should return 0n if bandwidth range for that region is not present', () => {
		expect(getBandwidthFromRateAndRegion(1029968261718n, 'some-random-region')).toBe(0n);
		expect(getBandwidthFromRateAndRegion(0n, 'some-random-region')).toBe(0n);
	});

	test('should return the bandwidth ', () => {
		expect(getBandwidthFromRateAndRegion(1029968261718n, 'us-east-1')).toBe(12n);
		expect(getBandwidthFromRateAndRegion(2574920654296n, 'us-east-1')).toBe(30n);
	});
});

describe('getDurationInSecondsForUnit', () => {
	test('should return seconds for the unit', () => {
		expect(getDurationInSecondsForUnit('Days')).toBe(86400);
		expect(getDurationInSecondsForUnit('Hours')).toBe(3600);
		expect(getDurationInSecondsForUnit('Minutes')).toBe(60);
	});
});
