import { ethers, type BigNumber } from 'ethers';

export const amountDivideByPow18 = (amount: number) => {
	return amount / Math.pow(10, 18);
};

export const bigNumbertoString = (amount: BigNumber) => {
	return ethers.utils.formatEther(amount);
};

export const bigNumbertoNumber = (amount: BigNumber) => {
	return parseFloat(ethers.utils.formatEther(amount));
};
