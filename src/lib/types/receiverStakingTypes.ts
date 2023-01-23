import type { BigNumber } from 'ethers';

export type ReceiverStakedDataModel = {
	title: string;
	value: BigNumber;
	tooltipText?: string;
};
