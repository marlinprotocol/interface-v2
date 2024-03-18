// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
	getSearchAndFilteredMarketplaceData,
	getAllFiltersListforMarketplaceData,
	sortOysterOperatorInventory,
	addJobsToMap
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
	it('should return empty array if no data is present', () => {
		expect(getSearchedInventoryData('randomsearchstring', [])).toStrictEqual([]);
	});

	it('should return all the data if searchInput is empty', () => {
		expect(getSearchedInventoryData('', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
	});

	it('should return filtered data if searchInput is present', () => {
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

	it('should return empty array if no match is found', () => {
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
			owner: {
				address: 'addressa',
				name: 'namea'
			}
		},
		{
			instance: 'instanceb',
			region: 'regionb',
			owner: {
				address: 'addressb',
				name: 'nameb'
			}
		},
		{
			instance: 'instancec',
			region: 'regionc',
			owner: {
				address: 'addressc',
				name: 'namec'
			}
		}
	];

	it('should return empty array if no data is present', () => {
		expect(getSearchedOysterJobsData('randomsearchstring', [])).toStrictEqual([]);
	});

	it('should return all the data if searchInput is empty', () => {
		expect(getSearchedOysterJobsData('', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
	});

	it('should return filtered data if searchInput is present', () => {
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
			getSearchedOysterJobsData('addressa', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('ADDRESSA', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[0]]);
		expect(
			getSearchedOysterJobsData('nameb', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[1]]);
		expect(
			getSearchedOysterJobsData('NAMEB', mockData as OysterInventoryDataModel[])
		).toStrictEqual([mockData[1]]);
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
			getSearchedOysterJobsData('address', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(
			getSearchedOysterJobsData('ADDRESS', mockData as OysterInventoryDataModel[])
		).toStrictEqual(mockData);
		expect(getSearchedOysterJobsData('name', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
		expect(getSearchedOysterJobsData('NAME', mockData as OysterInventoryDataModel[])).toStrictEqual(
			mockData
		);
	});

	it('should return empty array if no match is found', () => {
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
	it('should return empty array if no data is present', () => {
		expect(getSearchedMarketplaceData('randomsearchstring', [])).toStrictEqual([]);
	});

	it('should return all the data if searchInput is empty', () => {
		expect(getSearchedMarketplaceData('', mockData as OysterMarketplaceDataModel[])).toStrictEqual(
			mockData
		);
	});

	it('should return filtered data if searchInput is present', () => {
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

	it('should return empty array if no match is found', () => {
		expect(
			getSearchedMarketplaceData('instanced', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([]);
		expect(
			getSearchedMarketplaceData('randomstring', mockData as OysterMarketplaceDataModel[])
		).toStrictEqual([]);
	});
});

describe('getInventoryStatusVariant', () => {
	it('should return success variant if status is running', () => {
		expect(getInventoryStatusVariant('running')).toBe('success');
	});

	it('should return success variant if status is active', () => {
		expect(getInventoryStatusVariant('active')).toBe('success');
	});

	it('should return completed variant if status is active', () => {
		expect(getInventoryStatusVariant('completed')).toBe('success');
	});

	it('should return error variant if status is inactive', () => {
		expect(getInventoryStatusVariant('inactive')).toBe('error');
	});

	it('should return error variant if status is stopped', () => {
		expect(getInventoryStatusVariant('stopped')).toBe('error');
	});

	it('should return warning variant if status is pending', () => {
		expect(getInventoryStatusVariant('pending')).toBe('warning');
	});

	it('should return primary variant if status is closed', () => {
		expect(getInventoryStatusVariant('closed')).toBe('primary');
	});

	it('should return primary variant if status is any other string', () => {
		expect(getInventoryStatusVariant('anyotherstring')).toBe('primary');
	});
});

describe('getInventoryDurationVariant', () => {
	it('should return error variant if duration is less than OYSTER_CAUTION_DURATION', () => {
		expect(getInventoryDurationVariant(1)).toBe('error');
	});

	it('should return warning variant if duration is less than OYSTER_WARNING_DURATION', () => {
		expect(getInventoryDurationVariant(86401)).toBe('warning');
	});

	it('should return success variant if duration is greater than OYSTER_WARNING_DURATION', () => {
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

	it('should return empty array if no data is present', () => {
		expect(sortOysterInventory([], 'memory', 'asc')).toStrictEqual([]);
	});

	it('should return ascending sorted data when passed asc as third arg', () => {
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

	it('should return descending sorted data when passed desc as third arg', () => {
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

	it('should return an empty array when no data is present', () => {
		expect(sortOysterOperatorInventory([], 'region', 'asc')).toStrictEqual([]);
	});

	it('should return ascending sorted data when passed asc as third arg', () => {
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

	it('should return descending sorted data when passed desc as third arg', () => {
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

	it('should return an empty array if no data is present', () => {
		expect(sortOysterOperatorHistory([], 'region', 'asc')).toStrictEqual([]);
	});

	it('should return ascending sorted data when passed asc as third arg', () => {
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

	it('should return descending sorted data when passed desc as third arg', () => {
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

	it('should return empty array if no data is present', () => {
		expect(sortOysterMarketplace([], 'memory', 'asc')).toStrictEqual([]);
	});

	it('should return ascending sorted data when passed asc as third arg', () => {
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

	it('should return descending sorted data when passed desc as third arg', () => {
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

describe('getSearchAndFilteredMarketplaceData', () => {
	const mockData = [
		{
			arch: 'amd64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'amd64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.8xlarge',
			memory: 128,
			provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 32
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'c6g.large',
			memory: 4,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 4
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'c6g.large',
			memory: 4,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'ap-southeast-1',
			regionName: 'Asia Pacific (Singapore)',
			vcpu: 4
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'c6g.large',
			memory: 41,
			provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'ap-southeast-2',
			regionName: 'Asia Pacific (Singapore)',
			vcpu: 8
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		}
	];

	it('should return all the mock data when filter map is an empty object', () => {
		expect(getSearchAndFilteredMarketplaceData(mockData, {}, true)).toStrictEqual(mockData);
		expect(getSearchAndFilteredMarketplaceData(mockData, {}, false)).toStrictEqual(mockData);
	});

	it('should return exact matched values when exactMatch is true', () => {
		expect(getSearchAndFilteredMarketplaceData(mockData, { arch: 'amd64' }, true)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			}
		]);
		expect(
			getSearchAndFilteredMarketplaceData(mockData, { instance: 'c6g.large' }, true)
		).toStrictEqual([
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 41,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-2',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 8
			}
		]);
		expect(
			getSearchAndFilteredMarketplaceData(mockData, { region: 'ap-southeast-1' }, true)
		).toStrictEqual([
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 4
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { vcpu: 32 }, true)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { memory: 128 }, true)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			}
		]);
		expect(
			getSearchAndFilteredMarketplaceData(mockData, { provider: 'Kivous Mirash' }, true)
		).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			}
		]);
	});

	it('should return results which contain filter map value when exactMatch is false', () => {
		expect(getSearchAndFilteredMarketplaceData(mockData, { arch: '64' }, false)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 41,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-2',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 8
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { instance: 'm5a' }, false)).toStrictEqual(
			[
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.8xlarge',
					memory: 128,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 32
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},

				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				}
			]
		);
		expect(
			getSearchAndFilteredMarketplaceData(mockData, { region: 'us-east' }, false)
		).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { vcpu: '4' }, false)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 4
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'c6g.large',
				memory: 4,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'ap-southeast-1',
				regionName: 'Asia Pacific (Singapore)',
				vcpu: 4
			},

			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { memory: '2' }, false)).toStrictEqual([
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'amd64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.8xlarge',
				memory: 128,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 32
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			},
			{
				arch: 'arch64',
				id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
				instance: 'm5a.16xlarge',
				memory: 256,
				provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
				rate: 0n,
				rateScaled: 810833333333333n,
				region: 'us-east-1',
				regionName: 'US East (N. Virginia)',
				vcpu: 64
			}
		]);
		expect(getSearchAndFilteredMarketplaceData(mockData, { provider: 'kiv' }, false)).toStrictEqual(
			[
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.8xlarge',
					memory: 128,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 32
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 4
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'ap-southeast-1',
					regionName: 'Asia Pacific (Singapore)',
					vcpu: 4
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				}
			]
		);
	});
});

describe('getAllFiltersListForMarketplaceData', () => {
	const mockData = [
		{
			arch: 'amd64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'amd64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.8xlarge',
			memory: 128,
			provider: { name: 'Kivous Mirash', address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 32
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'm5a.16xlarge',
			memory: 256,
			provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 64
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'c6g.large',
			memory: 4,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'us-east-1',
			regionName: 'US East (N. Virginia)',
			vcpu: 4
		},
		{
			arch: 'arch64',
			id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
			instance: 'c6g.large',
			memory: 4,
			provider: { name: 'Kivous Mirash', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
			rate: 0n,
			rateScaled: 810833333333333n,
			region: 'ap-southeast-1',
			regionName: 'Asia Pacific (Singapore)',
			vcpu: 4
		}
	];

	it('should return the filter object without any values when length of filteredData is zero ', () => {
		expect(getAllFiltersListforMarketplaceData([])).toStrictEqual({
			allMarketplaceData: [],
			provider: [],
			instance: [],
			region: [],
			vcpu: [],
			memory: [],
			arch: []
		});
		expect(getAllFiltersListforMarketplaceData([], true)).toStrictEqual({
			allMarketplaceData: [],
			provider: [],
			instance: [],
			region: [],
			vcpu: [],
			memory: [],
			arch: []
		});
	});

	it('should return the list of unique items as filters with the All option by default', () => {
		expect(getAllFiltersListforMarketplaceData(mockData)).toStrictEqual({
			allMarketplaceData: [
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.8xlarge',
					memory: 128,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 32
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 4
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8',
						name: 'Kivous Mirash'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'ap-southeast-1',
					regionName: 'Asia Pacific (Singapore)',
					vcpu: 4
				}
			],
			provider: ['All', 'Kivous Mirash', '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'],
			instance: ['All', 'm5a.16xlarge', 'm5a.8xlarge', 'c6g.large'],
			region: [
				'All',
				['US East (N. Virginia)', 'us-east-1'],
				['Asia Pacific (Singapore)', 'ap-southeast-1']
			],
			vcpu: ['All', 4, 32, 64],
			memory: ['All', 4, 128, 256],
			arch: ['All', 'amd64', 'arch64']
		});
	});

	it('should return the list of unique items as filters without the All option when second argument is false', () => {
		expect(getAllFiltersListforMarketplaceData(mockData, false)).toStrictEqual({
			allMarketplaceData: [
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'amd64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.8xlarge',
					memory: 128,
					provider: {
						name: 'Kivous Mirash',
						address: '0x47d40316867853189e1e04dc1eb53dc71c8eb946'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 32
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'm5a.16xlarge',
					memory: 256,
					provider: { name: '', address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8' },
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 64
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						name: 'Kivous Mirash',
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'us-east-1',
					regionName: 'US East (N. Virginia)',
					vcpu: 4
				},
				{
					arch: 'arch64',
					id: '0x47d40316867853189e1e04dc1eb53dc71c8eb946-0',
					instance: 'c6g.large',
					memory: 4,
					provider: {
						address: '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8',
						name: 'Kivous Mirash'
					},
					rate: 0n,
					rateScaled: 810833333333333n,
					region: 'ap-southeast-1',
					regionName: 'Asia Pacific (Singapore)',
					vcpu: 4
				}
			],
			provider: ['Kivous Mirash', '0x89f52915bd3bacdc15fc0eaba922d9f7727090a8'],
			instance: ['m5a.16xlarge', 'm5a.8xlarge', 'c6g.large'],
			region: [
				['US East (N. Virginia)', 'us-east-1'],
				['Asia Pacific (Singapore)', 'ap-southeast-1']
			],
			vcpu: [4, 32, 64],
			memory: [4, 128, 256],
			arch: ['amd64', 'arch64']
		});
	});
});

describe('addAllToList', () => {
	it('should return back the original data with set() performed on it when data length is zero or second argument is false', () => {
		expect(addAllToList([], true)).toStrictEqual([...new Set([])]);
		expect(addAllToList(['item1', 'item1', 'item2', 'item3'], false)).toStrictEqual([
			'item1',
			'item2',
			'item3'
		]);
	});

	it('should return all appended to set() of original data when arguments are truthy', () => {
		expect(addAllToList(['item1', 'item1', 'item2', 'item3'], true)).toStrictEqual([
			'All',
			'item1',
			'item2',
			'item3'
		]);
	});
});

describe('getUpdatedFiltersList', () => {
	it('should return the same filters when previousFilters and currentFilters are the same', () => {
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

	it('should return the current filter if filterIdOrders is an empty array', () => {
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

	it('should return object that matches prevFilters when prevFilters and currFilters are not same', () => {
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

	it('should return undefined if providerAddress, instance or region is falsy', () => {
		expect(getRateForProviderAndFilters(undefined, 'instance', 'region', mockData)).toBe(undefined);
		expect(getRateForProviderAndFilters('providerAddress', undefined, 'region', mockData)).toBe(
			undefined
		);
		expect(getRateForProviderAndFilters('providerAddress', 'instance', undefined, mockData)).toBe(
			undefined
		);
	});

	it('should return the rateScaled of the desired region instance and provider', () => {
		expect(getRateForProviderAndFilters('providerAddress1', 'instanca', 'regiona', mockData)).toBe(
			100n
		);
	});

	it('should return undefined when the instance exists but does not have the rateScaled key in its object', () => {
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

	it('should return an empty object when providerAddress or marketplaceData is falsy', () => {
		expect(getCreateOrderInstanceRegionFilters(undefined, mockData)).toStrictEqual({});
		expect(
			getCreateOrderInstanceRegionFilters('providerAddressDoesNotMatterSinceMockDataIsFalsy', [])
		).toStrictEqual({});
	});

	it('should return instance and region filters when inputs are truthy', () => {
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
	it('should return 0n when rate or duration are falsy', () => {
		expect(computeCost(0, 0n)).toBe(0n);
		expect(computeCost(1, 0n)).toBe(0n);
		expect(computeCost(0, 1n)).toBe(0n);
		expect(computeCost(0)).toBe(0n);
	});

	it('should return the cost when duration and rate are truthy', () => {
		expect(computeCost(1, 1n)).toBe(1n);
	});
});

describe('computeDuration', () => {
	it('should return 0 when the duration string is not a valid amount', () => {
		expect(computeDuration('invalidString', 1)).toBe(0);
		expect(computeDuration('1.!', 1)).toBe(0);
		expect(computeDuration('1.1.', 1)).toBe(0);
		expect(computeDuration('1. 1', 1)).toBe(0);
	});
	it('should return the duration when duration string is a valid amount', () => {
		expect(computeDuration('1.1', 1)).toBe(1);
		expect(computeDuration('1', 120)).toBe(120);
		expect(computeDuration('500', 3600)).toBe(1800000);
	});
});

describe('computeDurationString', () => {
	it('should return an empty string when duration is falsy or durationUnitInSec is zero', () => {
		expect(computeDurationString(undefined, 1)).toBe('');
		expect(computeDurationString(0, 1)).toBe('');
		expect(computeDurationString(10, 0)).toBe('');
	});

	it('should return a duration string when arguments are valid', () => {
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

	it('should return empty array when marketplace data is falsy or has length zero', () => {
		expect(addRegionNameToMarketplaceData([])).toStrictEqual([]);
	});

	it('should return region mapped data when marketplace data is present', () => {
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
	it('should return 0n when bandwidth range for that region is not present', () => {
		expect(getBandwidthFromRateAndRegion(1029968261718n, 'some-random-region')).toBe(0n);
		expect(getBandwidthFromRateAndRegion(0n, 'some-random-region')).toBe(0n);
	});

	it('should return the bandwidth when the bandwidth range for that region is present', () => {
		expect(getBandwidthFromRateAndRegion(1029968261718n, 'us-east-1')).toBe(12n);
		expect(getBandwidthFromRateAndRegion(2574920654296n, 'us-east-1')).toBe(30n);
	});
});

describe('getDurationInSecondsForUnit', () => {
	it('should return seconds for the unit', () => {
		expect(getDurationInSecondsForUnit('Days')).toBe(86400);
		expect(getDurationInSecondsForUnit('Hours')).toBe(3600);
		expect(getDurationInSecondsForUnit('Minutes')).toBe(60);
	});
});

describe('addJobsToMap', () => {
	it('should add jobs to the map with the correct id', () => {
		const map = new Map();
		const jobs: Pick<OysterInventoryDataModel, 'id' | 'createdAt'>[] = [
			{ id: 'job1', createdAt: Date.now() },
			{ id: 'job2', createdAt: Date.now() }
		];

		addJobsToMap(jobs, map);
		expect(map.size).toBe(2);
		expect(map.get('job1')).toBe(jobs[0]);
		expect(map.get('job2')).toBe(jobs[1]);
	});
});
