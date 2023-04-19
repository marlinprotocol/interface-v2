import type {
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterProviderDataModel
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

export async function getOysterProvidersModified(providers: any[]) {
	if (!providers?.length) return [];
	//fetch all names here
	return providers.map((provider: any) => {
		return {
			...provider,
			name: provider.id, //TODO: get name from address
			instances: []
		} as OysterProviderDataModel;
	});
}

export async function getFiltersDataForCreateJob(provider: OysterProviderDataModel | undefined) {
	const filters: {
		allInstances: CPUrlDataModel[];
		region: string[];
		instance: string[];
		vcpu: string[];
		memory: string[];
	} = {
		allInstances: [],
		region: [],
		instance: [],
		vcpu: [],
		memory: []
	};

	if (!provider) return filters;

	let instances: CPUrlDataModel[] = [];
	try {
		instances = await getInstancesFromControlPlane(provider.cp);
	} catch (e) {
		console.log('error fetching data from  controlPlaneUrl:>> ', e);
	}

	instances?.forEach((instance) => {
		if (!filters.region.includes(instance.region)) {
			filters.region.push(instance.region);
		}
		if (!filters.instance.includes(instance.instanceType)) {
			filters.instance.push(instance.instanceType);
		}
		if (!filters.vcpu.includes(instance.vcpu)) {
			filters.vcpu.push(instance.vcpu);
		}
		if (!filters.memory.includes(instance.memory)) {
			filters.memory.push(instance.memory);
		}
	});
	return {
		...filters,
		allInstances: instances
	};
}

export const getRateForProviderAndFilters = (values: any, instances: CPUrlDataModel[]) => {
	const { instance, region, vcpu, memory } = values;
	if (!instance.value || !region.value || !vcpu.value || !memory.value) return null;

	const instanceSelected = instances?.find(
		(_item) =>
			_item.instanceType === instance.value &&
			_item.region === region.value &&
			_item.vcpu === vcpu.value &&
			_item.memory === memory.value
	);

	return instanceSelected?.min_rate ?? null;
};
