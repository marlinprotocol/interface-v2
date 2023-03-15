import type { BigNumber } from 'ethers';

export type PondToMPondHistoryDataModel = {
	timestamp: number;
	pondConverted: BigNumber;
	mpondReceived: BigNumber;
	transactionHash: string;
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
	eligibleCycles: MpondEligibleCyclesModel[];
	currentCycle: number;
	requestEpoch: string;
};

export type MpondToPondRequestModel = {
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

export type MPondToPond2HistoryDataModel = {
	requests: MpondToPondRequestModel[];
	mpondToPondConversions: MpondToPondConversionModel[];
	totalMpondConverted: BigNumber;
	totalPondConverted: BigNumber;
	transactionHash: string;
};

export type MpondToPondConversionModel = {
	id: string;
	mpondToConvert: BigNumber;
	transactionHash: string;
	timestamp: string;
	requestData: {
		id: string;
	};
};

export type MpondCoversionStateModel = {
	epochLength: string;
	liqudityReleaseEpochs: string;
	liquidityBP: string;
	liquidityStartTime: string;
	pondPerMpond: string;
};

export type MpondEligibleCyclesModel = {
	totalEligible: BigNumber;
	netPending: BigNumber;
	timestamp: number;
	endTimestamp: number;
	cycle: number;
};
