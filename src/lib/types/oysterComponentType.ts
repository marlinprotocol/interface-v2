import type { BigNumber, Bytes } from 'ethers';

export type CPUrlDataModel = {
	url?: string;
	instanceType: string;
	region: string;
	min_rate: BigNumber;
};

export type CPInstances = {
	allowed_regions: string[];
	min_rates: {
		region: string;
		rate_cards: {
			instance: string;
			min_rate: number;
		}[];
	}[];
};

export type ProviderMetaDataModel = {
	cp: string;
	id: string;
	live: boolean;
};

export type OysterProviderDataModel = {
	cp: string;
	id: string;
	live: boolean;
	name: string;
	instances?: CPUrlDataModel[];
};

export type OysterInventoryDataModel = {
	provider: {
		name?: string;
		address: string;
	};
	metadata: string;
	enclaveUrl: string;
	instance: string;
	region: string;
	vcpu?: number;
	memory?: number;
	rate: BigNumber;
	totalDeposit: BigNumber;
	amountUsed: BigNumber;
	balance: BigNumber;
	refund: BigNumber;
	lastSettled: number;
	createdAt: number;
	durationLeft: number;
	endEpochTime: number;
	live: boolean;
	status: string; //job status - running, stopped, completed
	settlementHistory: OysterSettlementHistoryDataModel[];
	depositHistory: OysterDepositHistoryDataModel[];
	durationRun: number;
	id: Bytes;
};

export type OysterMerchantJobsDataModel = {
	provider: {
		name?: string;
		address: string;
	};
	enclaveUrl: string;
	instance: string;
	region: string;
	vcpu?: number;
	memory?: number;
	rate: BigNumber;
	totalDeposit: BigNumber;
	amountUsed: BigNumber;
	balance: BigNumber;
	refund: BigNumber;
	lastSettled: number;
	createdAt: number;
	durationLeft: number;
	endEpochTime: number;
	live: boolean;
	status: string; //job status - running, stopped, completed
	settlementHistory: OysterSettlementHistoryDataModel[];
	depositHistory: OysterDepositHistoryDataModel[];
	durationRun: number;
	id: Bytes;
};

export type OysterSettlementHistoryDataModel = {
	amount: BigNumber;
	id: string;
	timestamp: number;
};
export type OysterDepositHistoryDataModel = {
	amount: BigNumber;
	id: string;
	timestamp: number;
	isWithdrawal: boolean;
	transactionStatus: string;
	txHash: string;
};

export type OysterRateRequestModel = {
	id: string;
	jobId: string;
	status: string;
	updatesAt: number;
	value: string;
};
