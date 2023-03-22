import type { BigNumber } from 'ethers';

export type PondToMPondHistoryDataModel = {
	timestamp: number;
	pondConverted: BigNumber;
	mpondReceived: BigNumber;
	transactionHash: string;
};

export type MPondToPondRequestModel = {
	id: string;
	mpondAmount: string;
	mpondConverted: string;
	requestEpoch: string;
	releaseTime: string;
	timestamp: string;
	transactionHash: string;
	isCancelled: boolean;
	cancelHash: string;
};

export type MPondToPondHistoryDataModel = {
	id: string;
	mpondAmount: BigNumber;
	mpondConverted: BigNumber;
	pondAmount: BigNumber;
	pondEligible: BigNumber;
	pondPending: BigNumber;
	pondInProcess: BigNumber;
	timestamp: number;
	transactionHash: string;
	isCancelled: boolean;
	cancelHash: string;
	conversionHistory: {
		id: string;
		mpondToConvert: BigNumber;
		transactionHash: string;
		timestamp: number;
	}[];
	eligibleCycles: MPondEligibleCyclesModel[];
	currentCycle: number;
	requestEpoch: BigNumber;
};

export type MPondToPondConversionModel = {
	id: string;
	mpondToConvert: BigNumber;
	transactionHash: string;
	timestamp: string;
	requestData: {
		id: string;
	};
};

export type MPondCoversionStateModel = {
	epochLength: string;
	liqudityReleaseEpochs: string;
	liquidityBP: string;
	liquidityStartTime: string;
	pondPerMpond: string;
};

export type MPondEligibleCyclesModel = {
	totalEligible: BigNumber;
	netPending: BigNumber;
	timestamp: number;
	endTimestamp: number;
	cycle: number;
};
