import { describe, it, expect } from 'vitest';
import {
	parseMetadata,
	getInstanceMetadatDataForOperator,
	getBandwidthRateForRegion,
	modifyOysterJobData,
	getOysterProvidersModified,
	getModifiedInstances,
	modifyJobData
} from './oysterModifiers';
import { DEFAULT_JOB_METADATA } from '$lib/utils/constants/oysterConstants';
import { BANDWIDTH_RATES_LOOKUP } from '$lib/page-components/oyster/data/bandwidthRates';

vi.mock('$lib/controllers/httpController', () => {
	const names = { '0x123': 'Owner', '0x456': 'Provider' };
	const allInstances = {
		'0x456': {
			min_rates: [
				{
					region: 'us-west-1',
					rate_cards: [
						{
							instance: 'instance1',
							min_rate: '1000',
							arch: 'x86',
							cpu: 4,
							memory: 16
						}
					]
				}
			]
		}
	};
	return {
		getProvidersNameJSON: () => Promise.resolve(names),
		getProvidersInstancesJSON: () => Promise.resolve(allInstances)
	};
});

// Mock data
const mockMetadata = JSON.stringify({
	url: 'http://example.com',
	instance: 'instance1',
	region: 'us-west-1',
	vcpu: '4',
	memory: '16GB',
	arch: 'x86',
	name: 'Test Job'
});

const mockInstances = [
	{
		provider: { address: '0x123' },
		instance: 'instance1',
		region: 'us-west-1',
		vcpu: 4,
		memory: 16,
		arch: 'x86',
		name: 'Test Job',
		id: '123de',
		regionName: '',
		rateScaled: 33n
	}
];

describe('parseMetadata', () => {
	it('should parse valid metadata', () => {
		const result = parseMetadata(mockMetadata);
		expect(result).toEqual(JSON.parse(mockMetadata));
	});

	it('should return default metadata on error', () => {
		const result = parseMetadata('invalid metadata');
		expect(result).toEqual(DEFAULT_JOB_METADATA);
	});

	it('should return default metadata on empty metadata', () => {
		const result = parseMetadata('');
		expect(result).toEqual(DEFAULT_JOB_METADATA);
	});
});

describe('getInstanceMetadatDataForOperator', () => {
	it('should return instance metadata for valid operator, instance, and region', () => {
		const result = getInstanceMetadatDataForOperator(
			'0x123',
			'instance1',
			'us-west-1',
			mockInstances
		);
		expect(result).toEqual({
			vcpu: 4,
			memory: 16,
			arch: 'x86'
		});
	});

	it('should return undefined for invalid operator, instance, or region', () => {
		const result = getInstanceMetadatDataForOperator(
			'0x456',
			'instance1',
			'us-west-1',
			mockInstances
		);
		expect(result).toEqual({
			vcpu: 'N/A',
			memory: 'N/A',
			arch: 'N/A'
		});
	});
});

describe('getBandwidthRateForRegion', () => {
	it('should return the correct bandwidth rate for a valid region', () => {
		const region = 'us-west-1';
		BANDWIDTH_RATES_LOOKUP[region] = 100;
		const result = getBandwidthRateForRegion(region);
		expect(result).toBe(BigInt(100));
	});

	it('should return 0 for an invalid region', () => {
		const result = getBandwidthRateForRegion('invalid-region');
		expect(result).toBe(BigInt(0));
	});
});

describe('modifyOysterJobData', () => {
	it('should modify oyster job data correctly', async () => {
		const jobs = [
			{
				metadata: mockMetadata,
				ip: '127.0.0.1',
				id: 'job1',
				owner: '0x123',
				rate: '1000',
				provider: '0x456',
				createdAt: '1620000000',
				totalDeposit: '10000',
				lastSettled: '1620003600',
				balance: '5000',
				refund: '0',
				settlementHistory: [],
				depositHistory: [],
				rateRevisionHistory: [],
				isCreditJob: false
			}
		];
		const scalingFactor = BigInt(1);

		const result = await modifyOysterJobData(jobs, scalingFactor);

		expect(result).toHaveLength(1);
		expect(result[0].provider.name).toBe('Provider');
		expect(result[0].owner.name).toBe('Owner');
	});
});

describe('modifyJobData', () => {
	const scalingFactor = BigInt(1000);
	const SECONDS_IN_HUNDRED_YEARS = 3153600000;

	const createJob = (overrides: any) => ({
		metadata: '',
		ip: '127.0.0.1',
		id: '1',
		owner: 'owner1',
		rate: '1000',
		provider: 'provider1',
		createdAt: Math.floor(Date.now() / 1000).toString(),
		totalDeposit: '1000000',
		lastSettled: Math.floor(Date.now() / 1000).toString(),
		balance: '500000',
		refund: '0',
		settlementHistory: [],
		depositHistory: [],
		rateRevisionHistory: [],
		isCreditJob: false,
		...overrides
	});

	const names = {
		owner1: 'Owner One',
		provider1: 'Provider One'
	};

	it('should handle a refunded job', () => {
		const job = createJob({ refund: '1000000' });
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.status).toBe('stopped');
		expect(result.balance).toBe(0n);
	});

	it('should handle a settled job', () => {
		const job = createJob({ balance: '0' });
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.status).toBe('running');
		expect(result.balance).toBe(0n);
	});

	it('should handle a never-ending job', () => {
		const job = createJob({ rate: '0' });
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.status).toBe('running');
		expect(result.durationLeft).toBe(SECONDS_IN_HUNDRED_YEARS * 2);
	});

	it('should handle a running job', () => {
		const job = createJob({});
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.status).toBe('running');
		expect(result.balance).toBeGreaterThan(0n);
	});

	it('should handle a completed job', () => {
		const nowTime = Math.floor(Date.now() / 1000);
		const job = createJob({
			lastSettled: (nowTime - 2000).toString(),
			balance: '0'
		});
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.status).toBe('completed');
		expect(result.balance).toBe(0n);
	});
});

describe('modifyJobData', () => {
	const scalingFactor = BigInt(1000000);
	const names = { provider1: 'Provider One', owner1: 'Owner One' };
	const job = {
		metadata: `{
			url: 'http://example.com',
			instance: 'instance1',
			region: 'us-west',
			vcpu: 4,
			memory: 16,
			arch: 'x86',
			name: 'testJob'
		}`,
		ip: '192.168.1.1',
		id: 'job1',
		owner: 'owner1',
		rate: '1000000000',
		provider: 'provider1',
		createdAt: '1625097600',
		totalDeposit: '1000000000000000',
		lastSettled: '1625097600',
		balance: '1000000000000000',
		refund: '0',
		settlementHistory: [],
		depositHistory: [],
		rateRevisionHistory: [],
		isCreditJob: false
	};

	it('handles a job with all default values', () => {
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.provider.name).toBe('Provider One');
		expect(result.owner.name).toBe('Owner One');
		expect(result.metadata).toEqual(job.metadata);
	});

	it('handles a job with a refund', () => {
		const jobWithRefund = { ...job, refund: '500000000000000' };
		const result = modifyJobData(jobWithRefund, names, scalingFactor);
		expect(result.status).toBe('stopped');
		expect(result.amountUsed).toBe(BigInt('500000000000000'));
		expect(result.balance).toBe(0n);
	});

	it('handles a settled job', () => {
		const jobSettled = {
			...job,
			balance: '0',
			settlementHistory: [{ amount: '1000000000000000', timestamp: '1625097600' }]
		};
		const result = modifyJobData(jobSettled, names, scalingFactor);
		expect(result.status).toBe('stopped');
		expect(result.amountUsed).toBe(BigInt('1000000000000000'));
		expect(result.balance).toBe(0n);
	});

	it('handles a job that runs indefinitely', () => {
		const jobIndefinite = { ...job, rate: '0' };
		const result = modifyJobData(jobIndefinite, names, scalingFactor);
		expect(result.status).toBe('running');
		expect(result.durationLeft).toBe(6307200000);
	});

	it('handles a running job', () => {
		const jobRunning = { ...job, lastSettled: Math.floor(Date.now() / 1000 - 1000).toString() };
		const result = modifyJobData(jobRunning, names, scalingFactor);
		expect(result.status).toBe('running');
		expect(result.balance).toBeLessThan(BigInt(job.balance));
		expect(result.durationLeft).toBeGreaterThan(0);
	});

	it('handles a completed job', () => {
		const jobCompleted = {
			...job,
			lastSettled: (Math.floor(Date.now() / 1000) - 2000).toString(),
			balance: '1000000'
		};
		const result = modifyJobData(jobCompleted, names, scalingFactor);
		expect(result.status).toBe('completed');
		expect(result.balance).toBe(0n);
		expect(result.amountUsed).toBe(BigInt(job.totalDeposit));
	});
});

describe('modifyJobData rateRevisionHistory', () => {
	const scalingFactor = BigInt(1000);
	const createJob = (overrides: any) => ({
		metadata: '{}',
		ip: '127.0.0.1',
		id: '1',
		owner: 'owner1',
		rate: '1000',
		provider: 'provider1',
		createdAt: Math.floor(Date.now() / 1000).toString(),
		totalDeposit: '1000000',
		lastSettled: Math.floor(Date.now() / 1000).toString(),
		balance: '500000',
		refund: '0',
		settlementHistory: [],
		depositHistory: [],
		rateRevisionHistory: [],
		isCreditJob: false,
		...overrides
	});
	const names = {
		owner1: 'Owner One',
		provider1: 'Provider One'
	};

	it('should handle rate revision with pending status', () => {
		const nowTime = Math.floor(Date.now() / 1000);
		const job = createJob({
			rateRevisionHistory: [
				{
					value: '2000',
					updatesAt: (nowTime + 1000).toString()
				}
			]
		});
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.reviseRate).toEqual({
			newRateScaled: BigInt(2000),
			rateStatus: 'pending',
			stopStatus: 'disabled',
			updatesAt: nowTime + 1000
		});
	});

	it('should handle rate revision with completed status', () => {
		const nowTime = Math.floor(Date.now() / 1000);
		const job = createJob({
			rateRevisionHistory: [
				{
					value: '2000',
					updatesAt: (nowTime - 1000).toString()
				}
			]
		});
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.reviseRate).toEqual({
			newRateScaled: BigInt(2000),
			rateStatus: 'completed',
			stopStatus: 'disabled',
			updatesAt: nowTime - 1000
		});
	});

	it('should handle rate revision with zero value', () => {
		const nowTime = Math.floor(Date.now() / 1000);
		const job = createJob({
			rateRevisionHistory: [
				{
					value: '0',
					updatesAt: (nowTime - 1000).toString()
				}
			]
		});
		const result = modifyJobData(job, names, scalingFactor);
		expect(result.reviseRate).toEqual({
			newRateScaled: BigInt(0),
			rateStatus: 'completed',
			stopStatus: 'completed',
			updatesAt: nowTime - 1000
		});
	});
});

describe('getOysterProvidersModified', () => {
	it('should modify oyster providers correctly', async () => {
		const providers = [{ id: '0x456' }];
		const rateCPUrlUnitInSeconds = 3600;

		const result = await getOysterProvidersModified(providers, rateCPUrlUnitInSeconds);
		expect(result).toHaveLength(1);
		expect(result[0].provider.name).toBe('Provider');
	});
});

describe('getModifiedInstances', () => {
	it('should modify instances correctly', () => {
		const instances = {
			allowed_regions: ['us-west-1'],
			min_rates: [
				{
					region: 'us-west-1',
					rate_cards: [
						{
							instance: 'instance1',
							min_rate: 1000,
							arch: 'x86',
							cpu: 4,
							memory: 16
						}
					]
				}
			]
		};

		const result = getModifiedInstances(instances);
		expect(result).toHaveLength(1);
		expect(result[0].instance).toBe('instance1');
		expect(result[0].rateScaled).toBe(BigInt(1000));
	});
});
