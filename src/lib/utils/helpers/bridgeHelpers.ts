import type {
	MpondCoversionStateModel,
	MpondEligibleCyclesModel,
	MpondToPondConversionModel,
	MPondToPondHistoryDataModel,
	MpondToPondRequestModel
} from '$lib/types/bridgeComponentType';
import { BigNumber } from 'ethers';
import { mpondToPond } from '../conversion';
import { BigNumberUtils } from './bigNumberUtils';

export const getModifiedMpondToPondHistory = (
	mpondToPondConversions: MpondToPondConversionModel[],
	requests: MpondToPondRequestModel[],
	state: MpondCoversionStateModel
) => {
	const { liqudityReleaseEpochs, liquidityBP, liquidityStartTime } = state;

	// Start time of the liquidity release
	const _liquidityStartTime = Number(liquidityStartTime);
	// const _epochLength = Number(epochLength);

	// Intervals at which pending mpond is released
	const _liqudityReleaseEpochs = Number(liqudityReleaseEpochs);
	const _liquidityBP = Number(liquidityBP);

	// total number of release cycles based on liquidityBP
	const totalCycles = Math.ceil(1 / _liquidityBP);

	const _nowTime = Math.floor(Date.now() / 1000);

	// create history data model
	const ret: MPondToPondHistoryDataModel[] = requests.map((request) => {
		const {
			id,
			mpondAmount,
			mpondConverted,
			releaseTime,
			timestamp,
			transactionHash,
			isCancelled,
			cancelHash
		} = request;

		//basic conversions
		const _releaseTime = Number(releaseTime);
		const mpondAmountBN = BigNumber.from(mpondAmount);
		const mpondConvertedBN = BigNumber.from(mpondConverted);
		const mpondInitallyPending = mpondAmountBN.sub(mpondConvertedBN);
		const pondAmountBN = mpondToPond(mpondAmountBN);
		const pondInitiallyPending = mpondToPond(mpondInitallyPending);

		// TODO: check mul not working
		const bigNumberUtils = new BigNumberUtils();
		const pondProcessInACycle = bigNumberUtils.multiply(pondAmountBN, _liquidityBP);

		// first release of the eligiblity conversion is the release time or liquidity start time whichever is later
		const _releaseStartTime =
			_releaseTime < _liquidityStartTime ? _liquidityStartTime : _releaseTime;
		// strat time of the first cycle
		const _firstCycleStartTime = _releaseStartTime - _liqudityReleaseEpochs;

		const eligibleCycles: MpondEligibleCyclesModel[] = [];
		let totalEligible = BigNumber.from('0');

		let _cycleStartTime = _firstCycleStartTime;
		// create eligible convserion cycles
		for (let i = 0; i < totalCycles; i++) {
			//add equal fraction of the pond amount to the total eligible
			totalEligible = totalEligible.add(pondProcessInACycle);
			eligibleCycles.push({
				timestamp: _cycleStartTime,
				endTimestamp: _cycleStartTime + _liqudityReleaseEpochs,
				totalEligible,
				netPending: pondAmountBN.sub(totalEligible),
				cycle: i + 1
			});
			// start time of the cycle is the start time of the previous cycle plus the release interval
			_cycleStartTime = _cycleStartTime + _liqudityReleaseEpochs;
		}

		let pondInProcess = BigNumber.from('0');
		let nowEligiblePond = BigNumber.from('0');
		// current cycle
		let currentCycle = 0;

		// if liquidity release has started
		if (_nowTime > _firstCycleStartTime) {
			currentCycle = Math.floor((_nowTime - _firstCycleStartTime) / _liqudityReleaseEpochs);
			if (currentCycle < totalCycles) {
				// if liquidity release is in progress
				nowEligiblePond = nowEligiblePond.add(pondProcessInACycle.mul(currentCycle));
				pondInProcess = pondProcessInACycle;
			} else {
				// if liquidity release is completed
				nowEligiblePond = pondInitiallyPending;
				currentCycle = totalCycles + 1;
			}
		}

		// pending pond is the pond initially pending minus the pond eligible and pond in process
		const nowPendingPond = pondInitiallyPending.sub(nowEligiblePond).sub(pondInProcess);

		// filter the conversion history for the current request
		const conversionHistory = mpondToPondConversions
			.filter((conversion) => conversion.requestData.id === id)
			?.map((conversion) => {
				return {
					id: conversion.id,
					mpondToConvert: BigNumber.from(conversion.mpondToConvert),
					transactionHash: conversion.transactionHash,
					timestamp: Number(conversion.timestamp)
				};
			});

		return {
			id,
			mpondAmount: mpondAmountBN,
			mpondConverted: mpondConvertedBN,
			pondAmount: pondAmountBN,
			pondPending: nowPendingPond,
			pondInProcess: pondInProcess,
			pondEligible: nowEligiblePond,
			conversionHistory: conversionHistory,
			eligibleCycles: eligibleCycles,
			currentCycle: currentCycle,
			timestamp: Number(timestamp),
			transactionHash,
			isCancelled,
			cancelHash
		};
	});
	return ret;
};

export const bridgeTxnUrls = (txnHash: string) => {
	return `https://goerli.arbiscan.io/tx/${txnHash}`;
};
