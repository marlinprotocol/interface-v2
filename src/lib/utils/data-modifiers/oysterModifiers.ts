import type {
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterProviderDataModel,
	ProviderMetaDataModel
} from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { kOysterRateMetaData } from '../constants/oysterConstants';
import { bigNumberToString } from '../conversion';
import { getInstancesFromControlPlane } from '$lib/controllers/httpController';

export function getOysterJobsModified(jobs: any[]) {
	if (!jobs?.length) return [];

	return jobs.map((job: any) => {
		return modifyJobData(job);
	}) as OysterInventoryDataModel[];
}

const modifyJobData = (job: any): OysterInventoryDataModel => {
	const { unitInSeconds, decimal } = kOysterRateMetaData;
	let {
		metadata,
		id,
		live = false,
		owner,
		rate = '0',
		provider,
		lastSettled,
		createdAt,
		amountPaid = '0',
		balance = '0',
		settlementHistory = [],
		depositHistory = [],
		status = 'active'
	} = job ?? {};

	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');
	const metadataParsed = JSON.parse(metadata);
	const { url, instanceType, region } = metadataParsed ?? {};

	const _amountPaid = BigNumber.from(amountPaid);
	const _balance = BigNumber.from(balance);
	const _rate = BigNumber.from(rate);

	// rate is per hour rate in usd, amountPaid is in usd
	const durationUsed = (Date.now() / 1000 - Number(createdAt)) / unitInSeconds;
	const durationPaid = _rate.gt(BigNumberZero) ? _amountPaid.div(_rate) : BigNumberZero;

	//convert to number
	const durationPaidInNumber = parseFloat(bigNumberToString(durationPaid, decimal));

	return {
		provider: {
			name: '', //TODO: get provider name from address
			address: provider
		},
		enclaveUrl: url,
		instance: instanceType,
		region,
		rate: _rate,
		amountPaid: _amountPaid,
		amountUsed: _amountPaid.sub(_balance),
		balance: _balance,
		durationLeft: durationPaidInNumber > durationUsed ? durationPaidInNumber - durationUsed : 0,
		endEpochTime: 1684075672,
		// endEpochTime: Number(createdAt) + durationPaidInNumber * unitInSeconds,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id,
		owner,
		live,
		status,
		settlementHistory: settlementHistory.map((settlement: any) => {
			return {
				...settlement,
				amount: BigNumber.from(settlement.amount),
				timestamp: Number(settlement.timestamp)
			};
		}),
		depositHistory: depositHistory.map((deposit: any, i: number) => {
			return {
				...deposit,
				amount: BigNumber.from(deposit.amount),
				timestamp: Number(deposit.timestamp),
				transactionStatus:
					i === 0 && !live ? status : deposit.isWithdrawal ? 'withdrawal' : 'deposit'
				// if job is not live, then the first item i.e the last transaction status is the job status
			};
		})
	};
};

async function _getInstancesForCpURL(controlPlaneUrl: string) {
	try {
		// TODO: check why its not working
		// controlPlaneUrl = 'http://3.108.237.212:8080/spec';
		// const instances = await getInstancesFromControlPlane(controlPlaneUrl);
		// console.log('instances :>> ', instances);

		return [
			{
				url: 'enclave_url',
				instanceType: 'instance 1',
				region: 'Region 1',
				min_rate: BigNumber.from('1000000000000000000000'),
				vcpu: '2',
				memory: '1.5GB'
			},
			{
				url: 'enclave_url',
				instanceType: 'instance 2',
				region: 'Region 2',
				min_rate: BigNumber.from('1500000000000000000000'),
				vcpu: '10',
				memory: '5GB'
			},
			{
				url: 'enclave_url',
				instanceType: 'instance 3',
				region: 'Region 3',
				min_rate: BigNumber.from('4000000000000000000000'),
				vcpu: '2',
				memory: '0.5GB'
			}
		];
	} catch (e) {
		console.log('error fetching data from  controlPlaneUrl:>> ', e);
		return [];
	}
}

export async function getOysterProvidersModified(providers: any[]) {
	if (!providers?.length) return [];

	const promises: {
		providerData: ProviderMetaDataModel;
		instances: Promise<CPUrlDataModel[] | undefined>;
	}[] = [];

	providers?.forEach((provider) => {
		promises.push({
			providerData: provider,
			instances: _getInstancesForCpURL(provider.cp)
		});
	});
	// TODO: implement name
	const results = await Promise.all(promises.map((p) => p.instances));
	const ret: OysterProviderDataModel[] = results?.map((result, index) => {
		const { providerData } = promises[index];
		return {
			...providerData,
			name: providerData.id, //TODO: get name from address
			instances: result
		};
	});
	return ret;
}

export function getFiltersDataForCreateJob(
	allProviders: OysterProviderDataModel[],
	selectedFilters: Record<string, string>
) {
	const filters: {
		merchant: string[];
		region: string[];
		instance: string[];
		vcpu: string[];
		memory: string[];
	} = {
		merchant: [],
		region: [],
		instance: [],
		vcpu: [],
		memory: []
	};

	interface ProviderListing extends CPUrlDataModel {
		merchantName: string;
		merchantAddress: string;
	}

	// get all instances from all providers and based on filters
	const instances = allProviders?.reduce((acc, provider) => {
		provider.instances?.forEach((instance) => {
			if (selectedFilters.merchant && selectedFilters.merchant !== provider.name) return;
			if (selectedFilters.region && selectedFilters.region !== instance.region) return;
			if (selectedFilters.instance && selectedFilters.instance !== instance.instanceType) return;
			if (selectedFilters.vcpu && selectedFilters.vcpu !== instance.vcpu) return;
			if (selectedFilters.memory && selectedFilters.memory !== instance.memory) return;
			acc.push({
				...instance,
				merchantName: provider.name, //TODO: get provider name from address
				merchantAddress: provider.id
			});
		});
		return acc;
	}, [] as ProviderListing[]);

	// get all unique values for each filter
	instances?.forEach((instance) => {
		if (!filters.merchant.includes(instance.merchantName))
			filters.merchant.push(instance.merchantName);
		if (!filters.region.includes(instance.region)) filters.region.push(instance.region);
		if (!filters.instance.includes(instance.instanceType))
			filters.instance.push(instance.instanceType);
		if (!filters.vcpu.includes(instance.vcpu)) filters.vcpu.push(instance.vcpu);
		if (!filters.memory.includes(instance.memory)) filters.memory.push(instance.memory);
	});

	return filters;
}
