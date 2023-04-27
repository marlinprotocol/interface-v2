import { getProvidersInstancesJSON, getProvidersNameJSON } from '$lib/controllers/httpController';
import { instanceVcpuMemoryData } from '$lib/page-components/oyster/data/instanceVcpuMemoryData';
import type {
	CPInstances,
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { kOysterRateMetaData } from '../constants/oysterConstants';
import { hundredYears } from '../conversion';

export const parseMetadata = (metadata: string) => {
	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');

	const metadataParsed = metadata ? JSON.parse(metadata) : {};
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
	const memory = vcpuMemoryData?.[1];
	const vcpu = vcpuMemoryData?.[2];
	return {
		vcpu,
		memory
	};
};

export async function getOysterJobsModified(jobs: any[]) {
	if (!jobs?.length) return [];

	const names = await getProvidersNameJSON();

	return jobs.map((job: any) => {
		return modifyJobData(job, names);
	}) as OysterInventoryDataModel[];
}

const modifyJobData = (job: any, names: any): OysterInventoryDataModel => {
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

	const nowTime = Math.floor(Date.now() / 1000);
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
			name: names[provider] ?? '',
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

	const _totalSettledAmount = settlementHistory.reduce((acc: any, settlement: any) => {
		return acc.add(settlement.amount);
	}, BigNumberZero);

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
			status: 'stopped',
			amountToBeSettled: _totalDeposit.sub(_refund).sub(_totalSettledAmount)
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
			status: 'running',
			amountToBeSettled: _totalDeposit.sub(_refund).sub(_totalSettledAmount)
		};
	}

	//job is running or has completed
	const _paidDuration = _balance.mul(rateUnitInSeconds).div(_rate).toNumber();
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
			status: 'completed',
			amountToBeSettled: _totalDeposit.sub(_totalSettledAmount)
		};
	}

	let currentBalance = _balance;
	//job is running
	try {
		// check for overflow and underflow errors
		currentBalance = _balance.sub(_rate.mul(nowTime - _lastSettled));
	} catch (e) {
		console.log('overflow error', e, id);
	}

	return {
		...modifiedJob,
		amountUsed: _totalDeposit.sub(currentBalance),
		balance: currentBalance,
		durationLeft: _paidDuration - (nowTime - _lastSettled),
		durationRun: nowTime - _createdAt,
		endEpochTime,
		live: true,
		status: 'running',
		amountToBeSettled: _totalDeposit.sub(currentBalance).sub(_totalSettledAmount)
	};
};

export async function getOysterProvidersModified(providers: any[]) {
	if (!providers?.length) return [];

	//fetch all providers name and instances
	const [allNames, allInstances] = await Promise.all([
		getProvidersNameJSON(),
		getProvidersInstancesJSON()
	]);
	const ret: OysterMarketplaceDataModel[] = [];

	providers.forEach((provider) => {
		const instances = getModifiedInstances(allInstances[provider.id]);
		instances?.forEach((instance: any, index: number) => {
			ret.push({
				...instance,
				provider: {
					name: allNames[provider.id] ?? '',
					address: provider.id
				},
				id: `${provider.id}-${index}`
			});
		});
	});
	return ret;
}

export const getModifiedInstances = (instances?: CPInstances) => {
	const { min_rates } = instances ?? {};
	// transforming response data so that each object in the array
	// corresponds to a row in the table
	const ret: CPUrlDataModel[] | undefined = min_rates?.flatMap((region) => {
		return region.rate_cards.map((rate) => {
			const { vcpu, memory } = getvCpuMemoryData(rate.instance);
			return {
				instance: rate.instance,
				region: region.region,
				rate: BigNumber.from(rate.min_rate),
				vcpu,
				memory
			};
		});
	});
	return ret;
};
