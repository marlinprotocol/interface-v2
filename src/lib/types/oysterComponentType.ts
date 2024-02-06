import type { BytesLike } from 'ethers';

export type OysterOperatorInventorySortKeys =
	| 'amountToBeSettled'
	| 'durationLeft'
	| 'durationRun'
	| 'createdAt'
	| 'instance'
	| 'region'
	| 'status'
	| 'owner';

export type OysterInventorySortKeys =
	| 'balance'
	| 'rate'
	| 'totalDeposit'
	| 'amountUsed'
	| 'refund'
	| 'durationLeft'
	| 'memory'
	| 'vcpu'
	| 'durationRun'
	| 'createdAt'
	| 'lastSettled'
	| 'endEpochTime'
	| 'instance'
	| 'region'
	| 'status';

export type OysterMarketplaceSortKeys = 'rateScaled' | 'vcpu' | 'memory' | 'instance' | 'region';

export type OysterDurationUnits = 'Hours' | 'Days' | 'Minutes';

export interface OysterDurationUnitList {
	label: OysterDurationUnits;
	id: string;
	value: number;
}

export type CPInstances = {
	allowed_regions: string[];
	min_rates: {
		region: string;
		rate_cards: {
			instance: string;
			min_rate: number;
			cpu: number;
			memory: number;
			arch: string;
		}[];
	}[];
	error?: string;
};

export type ProviderMetaDataModel = {
	cp: string;
	id: string;
	live: boolean;
};

export type CPUrlDataModel = {
	instance: string;
	region: string;
	rateScaled: bigint;
	arch: string;
	vcpu: number;
	memory: number;
};

export interface OysterMarketplaceDataModel extends CPUrlDataModel {
	provider: {
		name?: string;
		address: string;
	};
	id: string;
	regionName: string;
}

export interface OysterMarketplaceFilterModel extends CPUrlDataModel {
	provider: string;
}

export interface OysterInventoryDataModel extends CPUrlDataModel {
	provider: {
		name?: string;
		address: string;
	};
	owner: string;
	metadata: string;
	enclaveUrl: string;
	totalDeposit: bigint;
	amountUsed: bigint;
	balance: bigint;
	refund: bigint;
	lastSettled: number;
	createdAt: number;
	durationLeft: number;
	endEpochTime: number;
	live: boolean;
	status: 'closed' | 'running' | 'pending' | 'completed' | 'stopped';
	settlementHistory: OysterSettlementHistoryDataModel[];
	depositHistory: OysterDepositHistoryDataModel[];
	durationRun: number;
	id: BytesLike;
	amountToBeSettled: bigint;
	rate: bigint;
	reviseRate?: {
		newRate: bigint;
		updatesAt: number;
		rateStatus: string; //'' | 'pending' | 'completed'
		stopStatus: string; //'' | 'disabled' | 'pending' | 'completed'
	};
	ip?: string;
}

export interface CreateOrderPreFilledModel extends CPUrlDataModel {
	provider: {
		name?: string;
		address: string;
	};
	metadata: string;
	enclaveUrl: string;
}

export type OysterSettlementHistoryDataModel = {
	amount: bigint;
	id: string;
	timestamp: number;
};
export type OysterDepositHistoryDataModel = {
	amount: bigint;
	id: string;
	timestamp: number;
	isWithdrawal: boolean;
	transactionStatus: string;
	txHash: string;
};

export type OysterRateRequestModel = {
	id: string;
	job: string;
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
	arch: string[];
	// rate: (number | string)[];
}

export interface ProviderData {
	cp: string;
	id: string;
	live: boolean;
}

export type OysterJobMetadata = {
	url: string;
	instance: string;
	region: string;
	vcpu: number;
	memory: number;
	arch: string;
};
