import type { BigNumber } from 'ethers';

export type ReceiverStakedDataModel = {
	title: string;
	value: BigNumber;
	tooltipText?: string;
};

export type ReceiverStakeModalInputModel = {
	title: string;
	tooltipText?: string;
	maxBalance: BigNumber;
	approveRequired?: boolean;
};
