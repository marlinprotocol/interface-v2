import { describe, it, expect } from 'vitest';
import {
	parseMetadata,
	getInstanceMetadatDataForOperator,
	getBandwidthRateForRegion,
	modifyOysterJobData,
	getOysterProvidersModified,
	getModifiedInstances
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
			allowed_regions: ['us-west-1'], // Add this line
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
