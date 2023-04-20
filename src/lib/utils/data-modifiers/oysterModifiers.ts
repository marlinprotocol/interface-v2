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

export function getOysterJobsModified(jobs: any[]) {
	if (!jobs?.length) return [];

	return jobs.map((job: any) => {
		return modifyJobData(job);
	}) as OysterInventoryDataModel[];
}

export const parseMetadata = (metadata: string) => {
	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');
	const metadataParsed = JSON.parse(metadata);

	const { url, instanceType, region } = metadataParsed ?? {};

	const vcpuMemoryData = instanceVcpuMemoryData.find((item) => item[0] === instanceType);

	const vcpu = vcpuMemoryData?.[1];
	const memory = vcpuMemoryData?.[2];
	return {
		enclaveUrl: url,
		instance: instanceType,
		region,
		vcpu,
		memory
	};
};

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

	const modifiedJob = {
		provider: {
			name: '', //TODO: get provider name from address
			address: provider
		},
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

	let live = false;
	let amountUsed = _totalDeposit.sub(_balance);
	let currentBalance = _balance;
	let durationLeft = 0;
	let durationRun = _lastSettled - _createdAt;
	let endEpochTime = _lastSettled;
	let status = 'running';

	if (_refund.gt(BigNumberZero)) {
		//job is stopped and refunded so amount is used is total deposit - refund and current balance is 0
		amountUsed = _totalDeposit.sub(_refund);
		currentBalance = BigNumberZero;
		status = 'stopped';
	} else {
		if (_balance.div(_rate).gt(hundredYears / rateUnitInSeconds)) {
			//job is running and will never end
			live = true;
			durationLeft = hundredYears;
			durationRun = nowTime - _createdAt;
			endEpochTime = _lastSettled + durationLeft;
			status = 'running';
		} else {
			const _paidDuration = _balance.div(_rate).toNumber() * rateUnitInSeconds;
			endEpochTime = _lastSettled + _paidDuration;

			if (endEpochTime > nowTime) {
				//job is running
				const timeSpent = nowTime - _lastSettled;
				live = true;
				try {
					currentBalance = _balance.sub(_rate.mul(timeSpent));
				} catch (e) {
					// TODO: handle overflow error
					console.log('overflow error', e);
				}
				amountUsed = _totalDeposit.sub(currentBalance);
				durationLeft = _paidDuration - timeSpent;
				durationRun = nowTime - _createdAt;
				status = 'running';
			} else {
				//job is completed
				amountUsed = _totalDeposit;
				currentBalance = BigNumberZero;
				status = 'completed';
				durationRun = _lastSettled + _paidDuration - _createdAt;
			}
		}
	}

	return {
		...modifiedJob,
		balance: currentBalance,
		live,
		status,
		amountUsed,
		durationLeft,
		durationRun,
		endEpochTime: _lastSettled + durationLeft
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
