import type {
	MpondCoversionStateModel,
	MpondEligibleCyclesModel,
	MpondToPondConversionModel,
	MPondToPondHistoryDataModel,
	MpondToPondRequestModel
} from '$lib/types/bridgeComponentType';
import { BigNumber } from 'ethers';
import { mpondToPond } from '../conversion';

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

	// total number of release cycles based on liquidityBP
	const totalCycles = Math.ceil(1 / Number(liquidityBP));

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
		const pondProcessInACycle = pondAmountBN.div(totalCycles);

		// Start time of the eligiblity conversion is the release time or liquidity start time whichever is later
		const _startTime = _releaseTime < _liquidityStartTime ? _liquidityStartTime : _releaseTime;

		const eligibleCycles: MpondEligibleCyclesModel[] = [];
		let totalEligible = BigNumber.from('0');

		// create eligible convserion cycles
		for (let i = 0; i < totalCycles; i++) {
			const _cycleStartTime = _startTime + _liqudityReleaseEpochs * i;
			//add equal fraction of the pond amount to the total eligible
			totalEligible = totalEligible.add(pondProcessInACycle);
			eligibleCycles.push({
				timestamp: _cycleStartTime,
				totalEligible,
				netPending: pondAmountBN.sub(totalEligible),
				cycle: i + 1
			});
		}

		let pondInProcess = BigNumber.from('0');
		let nowEligiblePond = BigNumber.from('0');
		// current cycle
		let currentCycle = 0;

		// if liquidity release has started
		if (_nowTime > _startTime) {
			currentCycle = Math.floor((_nowTime - _startTime) / _liqudityReleaseEpochs);
			// if liquidity release is in progress
			if (currentCycle < totalCycles) {
				nowEligiblePond = eligibleCycles[currentCycle].totalEligible;
				pondInProcess = pondProcessInACycle;
			} else {
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
