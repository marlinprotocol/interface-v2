import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { kOysterRateMetaData } from '../constants/oysterConstants';
import { bigNumberToString } from '../conversion';

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
		settlementHistory = []
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
		cpUrl: url,
		instance: instanceType,
		region,
		rate: _rate,
		amountPaid: _amountPaid,
		amountUsed: _amountPaid.sub(_balance),
		balance: _balance,
		durationLeft: durationPaidInNumber > durationUsed ? durationPaidInNumber - durationUsed : 0,
		// endEpochTime: 1684075672,
		endEpochTime: Number(createdAt) + durationPaidInNumber * unitInSeconds,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id: id,
		owner: owner,
		live: live,
		settlementHistory: settlementHistory.map((settlement: any) => {
			return {
				amount: BigNumber.from(settlement.amount),
				ts: Number(settlement.ts),
				id: settlement.id
			};
		})
	};
};
