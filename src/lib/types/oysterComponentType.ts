import type { BigNumber } from 'ethers';

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
	settlementHistory: OysterSettlementHistoryDataModel[];
	id: string;
};

export type OysterSettlementHistoryDataModel = {
	amount: BigNumber;
	id: string;
	ts: number;
};

export type OysterHistoryDataModel = {
	merchant: {
		name: string;
		address: string;
	};
	instance: string;
	region: string;
	amountPaid: {
		amount: BigNumber;
		symbol: string;
	};
	amountUsed: {
		amount: BigNumber;
		symbol: string;
	};
	refund: {
		amount: BigNumber;
		symbol: string;
	};
	status: 'Completed' | 'Stopped' | 'Refunded';
	txHash: string;
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
