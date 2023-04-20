import { getInstancesFromControlPlane } from '$lib/controllers/httpController';
import { instanceVcpuMemoryData } from '$lib/page-components/oyster/data/instanceVcpuMemoryData';
import type {
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterProviderDataModel
} from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { kOysterRateMetaData } from '../constants/oysterConstants';
import { hundredYears } from '../conversion';

export const parseMetadata = (metadata: string) => {
	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');
	const metadataParsed = JSON.parse(metadata);

	const { url, instanceType, region } = metadataParsed ?? {};
	const { vcpu, memory } = getvCpuMemoryData(instanceType);

	return {
		enclaveUrl: url,
		instance: instanceType,
		region,
		vcpu,
		memory
	};
};

export const getvCpuMemoryData = (instance: string) => {
	const vcpuMemoryData = instanceVcpuMemoryData.find((item) => item[0] === instance);
	const vcpu = vcpuMemoryData?.[1];
	const memory = vcpuMemoryData?.[2];
	return {
		vcpu,
		memory
	};
};

export function getOysterJobsModified(jobs: any[]) {
	if (!jobs?.length) return [];

	return jobs.map((job: any) => {
		return modifyJobData(job);
	}) as OysterInventoryDataModel[];
}

const modifyJobData = (job: any): OysterInventoryDataModel => {
	const { rateUnitInSeconds } = kOysterRateMetaData;
	const {
		metadata,
		id,
		rate = '0',
		provider,
		createdAt,
		totalDeposit = '0',
		lastSettled,
		balance = '0',
		refund = '0',
		settlementHistory = [],
		depositHistory = []
	} = job ?? {};

	const nowTime = Date.now() / 1000;
	const _lastSettled = Number(lastSettled);
	const _createdAt = Number(createdAt);

	const { enclaveUrl, instance, region, vcpu, memory } = parseMetadata(metadata);

	//convert to BigNumber
	const _totalDeposit = BigNumber.from(totalDeposit);
	const _balance = BigNumber.from(balance);
	const _rate = BigNumber.from(rate);
	const _refund = BigNumber.from(refund);

	//job with all basic conversions
	const modifiedJob = {
		provider: {
			name: '', //TODO: get provider name from address
			address: provider
		},
		metadata,
		enclaveUrl,
		instance,
		region,
		vcpu,
		memory,
		refund: _refund,
		rate: _rate,
		totalDeposit: _totalDeposit,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id,
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
					_refund.gt(BigNumberZero) && i == 0
						? 'refunded'
						: deposit.isWithdrawal
						? 'withdrawal'
						: 'deposit'
			};
		})
	};

	if (_refund.gt(BigNumberZero)) {
		//job is stopped and refunded so amount is used is total deposit - refund and current balance is 0
		return {
			...modifiedJob,
			amountUsed: _totalDeposit.sub(_refund),
			balance: BigNumberZero,
			durationLeft: 0,
			durationRun: _lastSettled - _createdAt,
			endEpochTime: _lastSettled,
			live: false,
			status: 'stopped'
		};
	}

	if (_rate.eq(BigNumberZero) || _balance.div(_rate).gt(hundredYears / rateUnitInSeconds)) {
		//job is running and will never end
		return {
			...modifiedJob,
			amountUsed: _totalDeposit.sub(_balance),
			balance: _balance,
			durationLeft: hundredYears * 2,
			durationRun: nowTime - _createdAt,
			endEpochTime: _lastSettled + hundredYears * 2,
			live: true,
			status: 'running'
		};
	}

	//job is running or has completed
	const _paidDuration = _balance.div(_rate).toNumber() * rateUnitInSeconds;
	const endEpochTime = _lastSettled + _paidDuration;

	if (endEpochTime < nowTime) {
		//job is completed
		return {
			...modifiedJob,
			amountUsed: _totalDeposit,
			balance: BigNumberZero,
			durationLeft: 0,
			durationRun: endEpochTime - _createdAt,
			endEpochTime,
			live: false,
			status: 'completed'
		};
	}

	let currentBalance = _balance;
	//job is running
	try {
		currentBalance = _balance.sub(_rate.mul(nowTime - _lastSettled));
	} catch (e) {
		// TODO: handle overflow error
		console.log('overflow error', e);
	}

	return {
		...modifiedJob,
		amountUsed: _totalDeposit.sub(currentBalance),
		balance: currentBalance,
		durationLeft: _paidDuration - (nowTime - _lastSettled),
		durationRun: nowTime - _createdAt,
		endEpochTime,
		live: true,
		status: 'running'
	};
};

export async function getOysterProvidersModified(providers: any[]) {
	if (!providers?.length) return [];
	//fetch all names here
	return providers.map((provider) => {
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
	} = {
		allInstances: [],
		region: [],
		instance: []
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
	});
	return {
		...filters,
		allInstances: instances
	};
}

export const getRateForProviderAndFilters = (values: any, instances: CPUrlDataModel[]) => {
	const { instance, region } = values;
	if (!instance.value || !region.value) return null;
	const instanceSelected = instances?.find(
		(_item) => _item.instanceType === instance.value && _item.region === region.value
	);
	return instanceSelected?.min_rate ?? null;
};
