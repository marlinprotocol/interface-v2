import { ethers, type BigNumber } from 'ethers';

export const amountDivideByPow18 = (amount: number) => {
	return amount / Math.pow(10, 18);
};

export const bigNumbertoString = (amount: BigNumber, decimal = 0) => {
	return parseFloat(ethers.utils.formatEther(amount)).toFixed(decimal);
};
