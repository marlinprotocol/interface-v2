import {
	DEFAULT_RECEIVER_REWARDS_STORE,
	DEFAULT_RECEIVER_STAKING_DATA
} from '$lib/utils/constants/storeDefaults';
import type {
	MPondEligibleCyclesModel,
	MPondToPondHistoryDataModel,
	PondToMPondHistoryDataModel
} from '$lib/types/bridgeComponentType';

import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import { BigNumber } from 'ethers';
import { BigNumberUtils } from '$lib/utils/helpers/bigNumberUtils';
import type { ReceiverStakingData } from '$lib/types/storeTypes';
import { getCurrentEpochCycle } from '$lib/utils/helpers/commonHelper';
import { mPondToPond } from '$lib/utils/helpers/conversionHelper';

export function modifyReceiverStakingData(data: any) {
	const balance = data?.receiverBalance?.balance;
	const signer = data?.receiverBalance?.signer;
	const balanceSnapshots = data?.receiverBalanceSnapshots;
	const approvals = data?.pondUser?.approvals;
	const params = data?.params;

	let stakingData: ReceiverStakingData = DEFAULT_RECEIVER_STAKING_DATA;

	let epochData = DEFAULT_RECEIVER_STAKING_DATA.epochData;

	if (params?.length === 2) {
		let startTime = params.find((param: any) => param.id === 'START_TIME').value;
		let epochLength = params.find((param: any) => param.id === 'EPOCH_LENGTH').value;
		//string to number
		startTime = parseInt(startTime);
		epochLength = parseInt(epochLength);
		const epochCycle = getCurrentEpochCycle(startTime, epochLength);
		epochData = { startTime, epochLength, epochCycle };
	}

	//update staked and queued balance
	if (balance) {
		const totalBalance = BigNumber.from(balance);
		let queuedBalance = DEFAULT_RECEIVER_STAKING_DATA.queuedBalance;
		let stakedBalance = DEFAULT_RECEIVER_STAKING_DATA.stakedBalance;

		let balanceSnapshot = BIG_NUMBER_ZERO;

		if (balanceSnapshots?.length === 1 && balanceSnapshots[0].epoch === epochData.epochCycle) {
			//if balance snapshot for current epoch cycle is present, then update staked and queued balance
			balanceSnapshot = BigNumber.from(balanceSnapshots[0].balance ?? 0);
			//queued amount is the difference of balance and balance snapshot at current epoch cycle
			stakedBalance = balanceSnapshot;
			queuedBalance = totalBalance.sub(stakedBalance);
		} else {
			//if balance snapshot for current epoch cycle is not present, then update staked balance
			stakedBalance = totalBalance;
		}

		stakingData = {
			...stakingData,
			queuedBalance,
			stakedBalance,
			epochData,
			signer
		};
	}
	//update approved POND balance
	if (approvals?.length) {
		const approvalData = approvals[0];
		stakingData = {
			...stakingData,
			approvedBalance:
				BigNumber.from(approvalData.value) ?? DEFAULT_RECEIVER_STAKING_DATA.approvedBalance
		};
	}
	return stakingData;
}

export function modifyReceiverRewardsData(data: any) {
	const receiverRewards = data?.receiverRewards[0];
	const params = data?.params;
	const lastTicketIssuedEpoch = data?.ticketsIssueds?.[0]?.epoch;
	const pondApprovals = data?.pondApprovals[0]?.value;

	let rewardsStoreData = DEFAULT_RECEIVER_REWARDS_STORE;

	if (params?.length === 2) {
		const startTime = params.find(
			(param: Record<'id' | 'value', string>) => param.id === 'START_TIME'
		).value;
		const epochDuration = params.find(
			(param: Record<'id' | 'value', string>) => param.id === 'EPOCH_LENGTH'
		).value;
		rewardsStoreData = {
			...rewardsStoreData,
			startTime: parseInt(startTime),
			epochDuration: parseInt(epochDuration)
		};
	}

	if (receiverRewards?.amount && receiverRewards?.rewardPerEpoch) {
		const rewardBalance = BigNumber.from(receiverRewards.amount);
		const rewardPerEpoch = BigNumber.from(receiverRewards.rewardPerEpoch);
		rewardsStoreData = {
			...rewardsStoreData,
			rewardBalance,
			rewardPerEpoch
		};
	}

	if (pondApprovals) {
		rewardsStoreData = {
			...rewardsStoreData,
			amountApproved: BigNumber.from(pondApprovals)
		};
	}

	if (lastTicketIssuedEpoch) {
		rewardsStoreData = {
			...rewardsStoreData,
			lastTicketIssuedEpoch: parseInt(lastTicketIssuedEpoch)
		};
	}
	return rewardsStoreData;
}

export function modifyAllowancesData(data: any) {
	let mPond = BIG_NUMBER_ZERO;
	let pond = BIG_NUMBER_ZERO;

	const pondApprovals = data?.pondApprovals;
	const mpondApprovals = data?.mpondApprovals;

	// convert all to BigNumber
	if (pondApprovals?.length > 0) {
		pond = BigNumber.from(pondApprovals[0]?.value ?? 0);
	}
	if (mpondApprovals?.length > 0) {
		mPond = BigNumber.from(mpondApprovals[0]?.value ?? 0);
	}
	return { pond, mPond };
}

export function modifyPondToMpondConversionHistory(users: any) {
	const user = users[0];

	const pondToMpondConversions: PondToMPondHistoryDataModel[] | undefined =
		user?.pondToMpondConversions?.map((conversion: any) => {
			return {
				pondConverted: BigNumber.from(conversion.pondConverted),
				mpondReceived: BigNumber.from(conversion.mpondReceived),
				timestamp: Number(conversion.timestamp),
				transactionHash: conversion.transactionHash
			};
		});
	return pondToMpondConversions;
}

export function modifyMPondToPondConversionHistory(mpondToPondHistoryData: any) {
	const user = mpondToPondHistoryData['users'][0];
	const state = mpondToPondHistoryData['states'][0];
	if (!user || !state) return undefined;

	const { mpondToPondConversions, requests } = user;
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
	const ret: MPondToPondHistoryDataModel[] = requests.map((request: any) => {
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
		let totalEligible = BIG_NUMBER_ZERO;

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
		let currentPondInProcess = BIG_NUMBER_ZERO;
		let currentEligiblePond = BIG_NUMBER_ZERO;
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
		const conversionHistory = mpondToPondConversions
			.filter((conversion: any) => conversion.requestData.id === id)
			?.map((conversion: any) => {
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
}
