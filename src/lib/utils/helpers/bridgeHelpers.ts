import type {
	MPondCoversionStateModel,
	MPondEligibleCyclesModel,
	MPondToPondConversionModel,
	MPondToPondHistoryDataModel,
	MPondToPondRequestModel
} from '$lib/types/bridgeComponentType';
import { BigNumber } from 'ethers';
import { BigNumberZero } from '../constants/constants';
import { mPondToPond } from '../conversion';
import { BigNumberUtils } from './bigNumberUtils';

export const getModifiedMPondToPondHistory = (
	mpondToPondConversions: MPondToPondConversionModel[],
	requests: MPondToPondRequestModel[],
	state: MPondCoversionStateModel
) => {
	const { liqudityReleaseEpochs, liquidityBP, liquidityStartTime } = state;

	// Start time of the liquidity release
	const _liquidityStartTime = Number(liquidityStartTime);
	// const _epochLength = Number(epochLength);

	// Intervals at which pending mPond is released
	// const _liqudityReleaseEpochs = 803; //for testing
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
			requestEpoch,
			timestamp,
			transactionHash,
			isCancelled,
			cancelHash
		} = request;

		//basic conversions
		const _releaseTime = Number(releaseTime);
		const mpondAmountBN = BigNumber.from(mpondAmount);
		const mPondConvertedBN = BigNumber.from(mpondConverted);
		const pondConvertedBN = mPondToPond(mPondConvertedBN);
		// const mPondInitallyPending = mpondAmountBN.sub(mPondConvertedBN);
		const pondAmountBN = mPondToPond(mpondAmountBN);
		// const pondInitiallyPending = mPondToPond(mPondInitallyPending);

		const bigNumberUtils = new BigNumberUtils();
		const pondProcessInACycle = bigNumberUtils.multiply(pondAmountBN, _liquidityBP);

		// strat time of the first cycle
		const _releaseStartTime = _releaseTime - _liqudityReleaseEpochs;

		// first release of the eligiblity conversion is the release time or liquidity start time whichever is later
		const _firstCycleStartTime =
			_releaseStartTime < _liquidityStartTime ? _liquidityStartTime : _releaseStartTime;

		const eligibleCycles: MPondEligibleCyclesModel[] = [];
		let totalEligible = BigNumberZero;

		let _cycleStartTime = _firstCycleStartTime;
		// create eligible convserion cycles
		for (let i = 0; i < totalCycles; i++) {
			//add equal fraction of the pond amount to the total eligible
			totalEligible = i === totalCycles - 1 ? pondAmountBN : totalEligible.add(pondProcessInACycle);
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

		//current states
		let currentPondInProcess = BigNumberZero;
		let currentEligiblePond = BigNumberZero;
		let currentCycle = 0;

		// if liquidity release has started
		if (_nowTime > _firstCycleStartTime) {
			currentCycle = Math.floor((_nowTime - _firstCycleStartTime) / _liqudityReleaseEpochs);

			if (currentCycle < totalCycles) {
				// if liquidity release is in progress
				currentEligiblePond = currentEligiblePond.add(pondProcessInACycle.mul(currentCycle));

				if (currentCycle < totalCycles - 1) {
					currentPondInProcess = pondProcessInACycle;
				} else {
					currentPondInProcess = pondAmountBN.sub(currentEligiblePond);
				}
			} else {
				// if liquidity release is completed
				currentEligiblePond = pondAmountBN;
				currentCycle = totalCycles + 1;
			}
		}

		// net eligible pond is the pond eligible at current minus the pond converted
		const netEligiblePond = currentEligiblePond.sub(pondConvertedBN);
		// pending pond is the pond initially pending minus the pond eligible at current cycle plus pond in process
		const netPendingPond = pondAmountBN.sub(currentEligiblePond).sub(currentPondInProcess);

		// filter the conversion history for the current request
		let conversionHistory = mpondToPondConversions
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
			mpondConverted: mPondConvertedBN,
			pondAmount: pondAmountBN,
			pondPending: netPendingPond,
			pondInProcess: currentPondInProcess,
			pondEligible: netEligiblePond,
			conversionHistory: conversionHistory,
			eligibleCycles: eligibleCycles,
			currentCycle: currentCycle,
			timestamp: Number(timestamp),
			transactionHash,
			requestEpoch: BigNumber.from(requestEpoch),
			isCancelled,
			cancelHash
		};
	});
	return ret;
};

export const bridgeTxnUrls = (txnHash: string) => {
	return `https://goerli.arbiscan.io/tx/${txnHash}`;
};
