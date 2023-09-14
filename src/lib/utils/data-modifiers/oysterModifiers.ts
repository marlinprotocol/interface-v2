import type {
	CPInstances,
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';
import { getProvidersInstancesJSON, getProvidersNameJSON } from '$lib/controllers/httpController';

import { BANDWIDTH_RATES_LOOKUP } from '$lib/page-components/oyster/data/bandwidthRates';
import { SECONDS_IN_HUNDRED_YEARS } from '$lib/utils/constants/constants';
import { instanceVcpuMemoryData } from '$lib/page-components/oyster/data/instanceVcpuMemoryData';

export const parseMetadata = (metadata: string) => {
	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');

	const metadataParsed = metadata ? JSON.parse(metadata) : {};
	const { url, instance, region } = metadataParsed ?? {};
	const { vcpu, memory } = getvCpuMemoryData(instance);

	return {
		enclaveUrl: url,
		instance,
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

export const getBandwidthRateForRegion = (region: string) => {
	const bandwidthRate = BANDWIDTH_RATES_LOOKUP[region] ?? 0;
	return BigInt(bandwidthRate);
};

export async function modifyOysterJobData(jobs: any[], scalingFactor: bigint) {
	if (!jobs?.length) return [];

	const names = await getProvidersNameJSON();

	return jobs.map((job: any) => {
		return modifyJobData(job, names, scalingFactor);
	}) as OysterInventoryDataModel[];
}

const modifyJobData = (job: any, names: any, scalingFactor: bigint): OysterInventoryDataModel => {
	const {
		metadata,
		ip,
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
		rateRevisionHistory = []
	} = job ?? {};

	const nowTime = Math.floor(Date.now() / 1000);
	const _lastSettled = Number(lastSettled);
	const _createdAt = Number(createdAt);

	let reviseRateMap: OysterInventoryDataModel['reviseRate'];

	if (rateRevisionHistory?.length > 0) {
		const { value, updatesAt } = rateRevisionHistory[0];
		const _rateUpdatesAt = Number(updatesAt);
		const _rateStatus = _rateUpdatesAt > nowTime ? 'pending' : 'completed';
		reviseRateMap = {
			newRate: BigInt(value),
			rateStatus: _rateStatus,
			stopStatus: BigInt(value) > 0n ? 'disabled' : _rateStatus,
			updatesAt: Number(updatesAt)
		};
	}

	const { enclaveUrl, instance, region, vcpu, memory } = parseMetadata(metadata);

	//convert to BigNumber
	const _totalDeposit = BigInt(totalDeposit);
	const _balance = BigInt(balance);
	const _rate = BigInt(rate); // in seconds
	const _refund = BigInt(refund);
	const _downScaledRate = _rate / scalingFactor;

	//job with all basic conversions
	const modifiedJob = {
		provider: {
			name: names[provider] ?? '',
			address: provider
		},
		ip,
		owner,
		metadata,
		enclaveUrl,
		instance,
		region,
		vcpu,
		memory,
		refund: _refund,
		rate: _rate,
		downScaledRate: _downScaledRate,
		totalDeposit: _totalDeposit,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id,
		reviseRate: reviseRateMap,
		settlementHistory: settlementHistory.map((settlement: any) => {
			return {
				...settlement,
				amount: BigInt(settlement.amount),
				timestamp: Number(settlement.timestamp)
			};
		}),
		depositHistory: depositHistory.map((deposit: any, i: number) => {
			return {
				...deposit,
				amount: BigInt(deposit.amount),
				timestamp: Number(deposit.timestamp),
				transactionStatus:
					_refund > 0n && i === 0 ? 'refunded' : deposit.isWithdrawal ? 'withdrawal' : 'deposit'
			};
		})
	};

	const _totalSettledAmount = settlementHistory.reduce((acc: bigint, settlement: any) => {
		return acc + BigInt(settlement.amount);
	}, 0n);

	if (_refund > 0n) {
		//job is stopped and refunded so amount used is total deposit - refund and current balance is 0
		return {
			...modifiedJob,
			amountUsed: _totalDeposit - _refund,
			balance: 0n,
			durationLeft: 0,
			durationRun: _lastSettled - _createdAt,
			endEpochTime: _lastSettled,
			live: true,
			status: 'closed',
			amountToBeSettled: _totalDeposit - _refund - _totalSettledAmount
		};
	}

	if (_totalDeposit === _totalSettledAmount && _balance === 0n) {
		// job is settled so amount used is total deposit and current balance is 0,
		// we call this job completed as from operator perspective it is completed
		return {
			...modifiedJob,
			amountUsed: _totalDeposit,
			balance: 0n,
			durationLeft: 0,
			durationRun: _lastSettled - _createdAt,
			endEpochTime: _lastSettled,
			live: true,
			status: 'closed',
			amountToBeSettled: 0n
		};
	}

	if (
		_rate === 0n ||
		((_balance * scalingFactor) / _rate > SECONDS_IN_HUNDRED_YEARS && _balance > 0n)
	) {
		const time = Math.floor(nowTime - _lastSettled);
		const _balanceUpdated = _balance - _downScaledRate * BigInt(time);
		//job is running and will never end
		return {
			...modifiedJob,
			amountUsed: _totalDeposit - _balanceUpdated,
			balance: _balanceUpdated,
			durationLeft: SECONDS_IN_HUNDRED_YEARS * 2,
			durationRun: nowTime - _createdAt,
			endEpochTime: _lastSettled + SECONDS_IN_HUNDRED_YEARS * 2,
			live: true,
			status: 'running',
			amountToBeSettled: _totalDeposit - _balanceUpdated - _totalSettledAmount
		};
	}

	//job is running or has completed
	const _paidDuration = (_balance * scalingFactor) / _rate;
	const endEpochTime = _lastSettled + Number(_paidDuration);

	if (endEpochTime < nowTime) {
		//job is completed
		return {
			...modifiedJob,
			amountUsed: _totalDeposit,
			balance: 0n,
			durationLeft: 0,
			durationRun: endEpochTime - _createdAt,
			endEpochTime,
			live: true,
			status: 'completed',
			amountToBeSettled: _totalDeposit - _totalSettledAmount
		};
	}

	let currentBalance = _balance;
	//job is running
	const time = Math.floor(nowTime - _lastSettled);
	currentBalance = _balance - (_rate * BigInt(time)) / scalingFactor;

	return {
		...modifiedJob,
		amountUsed: _totalDeposit - currentBalance,
		balance: currentBalance,
		durationLeft: Number(_paidDuration - BigInt(nowTime - _lastSettled)),
		durationRun: nowTime - _createdAt,
		endEpochTime,
		live: true,
		status: ip ? 'running' : 'pending',
		amountToBeSettled: _totalDeposit - currentBalance - _totalSettledAmount
	};
};

export async function getOysterProvidersModified(providers: any[], rateCPUrlUnitInSeconds: number) {
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
			//rate is hourly rate so convert it to per second rate
			const rateFromCPUrl = instance.rate ? BigInt(instance.rate) : 0n;
			ret.push({
				...instance,
				rate: rateFromCPUrl / BigInt(rateCPUrlUnitInSeconds),
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
	const { min_rates } = instances ?? { min_rates: [] };
	// transforming response data so that each object in the array
	// corresponds to a row in the table
	const ret: CPUrlDataModel[] = min_rates?.flatMap((region) => {
		return region.rate_cards.map((rate) => {
			const { vcpu, memory } = getvCpuMemoryData(rate.instance);
			return {
				instance: rate.instance,
				region: region.region,
				rate: BigInt(rate.min_rate),
				vcpu,
				memory
			};
		});
	});
	return ret;
};
