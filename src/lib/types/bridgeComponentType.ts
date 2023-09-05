export type PondToMPondHistoryDataModel = {
	timestamp: number;
	pondConverted: bigint;
	mpondReceived: bigint;
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
	mpondAmount: bigint;
	mpondConverted: bigint;
	pondAmount: bigint;
	pondEligible: bigint;
	pondPending: bigint;
	pondInProcess: bigint;
	timestamp: number;
	transactionHash: string;
	isCancelled: boolean;
	cancelHash: string;
	conversionHistory: {
		id: string;
		mpondToConvert: bigint;
		transactionHash: string;
		timestamp: number;
	}[];
	eligibleCycles: MPondEligibleCyclesModel[];
	currentCycle: number;
	requestEpoch: bigint;
};

export type MPondToPondConversionModel = {
	id: string;
	mpondToConvert: bigint;
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
	totalEligible: bigint;
	netPending: bigint;
	timestamp: number;
	endTimestamp: number;
	cycle: number;
};
