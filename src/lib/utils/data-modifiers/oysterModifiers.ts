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

const modifyJobData = (job: any): OysterInventoryDataModel => {
	const { unitInSeconds } = kOysterRateMetaData;
	let {
		metadata,
		id,
		owner,
		rate = '0',
		provider,
		createdAt,
		totalDeposit = '0',
		lastSettled,
		balance = '0',
		refund = '0',
		settlementHistory = [],
		depositHistory = [],
		status = 'active'
	} = job ?? {};

	const nowTime = Date.now() / 1000;
	const _lastSettled = Number(lastSettled);

	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');
	const metadataParsed = JSON.parse(metadata);
	const { url, instanceType, region } = metadataParsed ?? {};

	const vcpuMemoryData = instanceVcpuMemoryData.find((item: any) => item[0] === instanceType);

	const vCPU = vcpuMemoryData?.[1];
	const memory = vcpuMemoryData?.[2];

	//convert to BigNumber
	const _totalDeposit = BigNumber.from(totalDeposit);
	const _balance = BigNumber.from(balance);
	const _rate = BigNumber.from(rate);
	const _refund = BigNumber.from(refund);

	let modifiedJob = {
		provider: {
			name: '', //TODO: get provider name from address
			address: provider
		},
		enclaveUrl: url,
		instance: instanceType,
		region,
		vcpu: vCPU,
		memory: memory,
		rate: _rate,
		totalDeposit: _totalDeposit,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id,
		owner,
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
				timestamp: Number(deposit.timestamp)
				// transactionStatus: deposit.isWithdrawal ? 'withdrawal' : 'deposit'
			};
		})
	};

	let live = false;
	let amountUsed = _totalDeposit.sub(_balance);
	let currentBalance = _balance;
	let durationLeft = 0;
	let endEpochTime = _lastSettled;

	if (_refund.gt(BigNumberZero)) {
		//job is stopped and refunded so amount is used is total deposit - refund and current balance is 0
		amountUsed = _totalDeposit.sub(_refund);
		currentBalance = BigNumberZero;
	} else {
		if (_balance.div(_rate).gt(hundredYears / unitInSeconds)) {
			//job is running and will never end
			live = true;
			durationLeft = hundredYears;
			endEpochTime = _lastSettled + durationLeft;
		} else {
			const _paidDuration = _balance.div(_rate).toNumber() / unitInSeconds;
			endEpochTime = _lastSettled + _paidDuration;

			if (endEpochTime > nowTime) {
				//job is running
				const timeSpent = nowTime - _lastSettled;
				live = true;
				try {
					currentBalance = _balance.sub(_rate.mul(timeSpent));
				} catch (e) {
					console.log('overflow error', e);
				}
				amountUsed = _totalDeposit.sub(currentBalance);
				durationLeft = _paidDuration - timeSpent;
			} else {
				//job is completed
				amountUsed = _totalDeposit;
				currentBalance = BigNumberZero;
			}
		}
	}

	return {
		...modifiedJob,
		balance: currentBalance,
		live,
		amountUsed,
		durationLeft,
		endEpochTime: lastSettled + durationLeft
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
