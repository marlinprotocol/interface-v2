import type { BigNumber, Bytes } from 'ethers';

// balance: '999999999999964700';
// id: '0x0000000000000000000000000000000000000000000000000000000000000000';
// lastSettled: '1681470561';
// live: true;
// metadata: '\'{"url": "http://2.2.2.2:3000", "instanceType": "215342", "region": "124123"}\'';
// owner: '0x7aa8e222deddd49a6bdb5bffd0ac5fe17e1e0176';
// provider: '0x47d40316867853189e1e04dc1eb53dc71c8eb946';
// rate: '100';

export type CPUrlDataModel = {
	url: string;
	instanceType: string;
	region: string;
	min_rate: BigNumber;
	vcpu?: string; //TODO: make mandatory
	memory?: string;
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
	name?: string;
	instances?: CPUrlDataModel[];
};

export type OysterInventoryDataModel = {
	provider: {
		name?: string;
		address: string;
	};
	enclaveUrl: string;
	instance: string;
	region: string;
	rate: BigNumber;
	amountPaid: BigNumber;
	amountUsed: BigNumber;
	balance: BigNumber;
	lastSettled: number;
	createdAt: number;
	durationLeft: number;
	endEpochTime: number;
	owner: string;
	live: boolean;
	status: string; //job status - active, inactive, stopped, completed
	settlementHistory: OysterSettlementHistoryDataModel[];
	depositHistory: OysterDepositHistoryDataModel[];
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
};

const _new = {
	allowed_regions: ['ap-south-1', 'ap-east-1', 'us-east-1'],
	min_rates: [
		{
			region: 'ap-south-1',
			rate_cards: [
				{ instance: 'c6a.xlarge', min_rate: 2 },
				{ instance: 'c6a.large', min_rate: 1 },
				{ instance: 'c6a.2xlarge', min_rate: 3 }
			]
		},
		{
			region: 'ap-east-1',
			rate_cards: [
				{ instance: 'c6a.xlarge', min_rate: 1 },
				{ instance: 'c6a.large', min_rate: 1 },
				{ instance: 'c6a.2xlarge', min_rate: 2 }
			]
		}
	]
};

const metadata = '{region: ap-south-1, instance_type: c6a.xlarge, url: 2}';

// "'{\"url\": \"http://3.2.3.2:7000\", \"instanceType\": \"4543452\", \"region\": \"pdfskod\"}'";
