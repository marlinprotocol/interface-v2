import type { BigNumber } from 'ethers';

export type OysterInventoryDataModel = {
	merchant: {
		name: string;
		address: string;
	};
	instance: string;
	region: string;
	rate: {
		amount: BigNumber;
		symbol: string;
	};
	amountPaid: {
		amount: BigNumber;
		symbol: string;
	};
	amountUsed: {
		amount: BigNumber;
		symbol: string;
	};
	balance: {
		amount: BigNumber;
		symbol: string;
	};
	durationLeft: number;
	status: 'Active' | 'Inactive';
};
