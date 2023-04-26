import type { BigNumber, Bytes } from 'ethers';

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

export type CPUrlDataModel = {
	instance: string;
	region: string;
	rate: BigNumber;
	vcpu?: number;
	memory?: number;
};

export interface OysterMarketplaceDataModel extends CPUrlDataModel {
	provider: {
		name?: string;
		address: string;
	};
}

export interface OysterMarketplaceFilterModel extends CPUrlDataModel {
	provider: string;
}
export interface OysterInventoryDataModel extends OysterMarketplaceDataModel {
	metadata: string;
	enclaveUrl: string;
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
	amountToBeSettled: BigNumber;
}

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

export interface OysterFiltersModel {
	allMarketplaceData: OysterMarketplaceDataModel[];
	provider: string[];
	instance: string[];
	region: string[];
	vcpu: (number | string)[];
	memory: (number | string)[];
	rate: (number | string)[];
}
