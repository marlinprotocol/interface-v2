import { BrowserProvider, ethers } from 'ethers';
import type { Address } from '@web3-onboard/core/dist/types';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { addToast } from '$lib/data-stores/toastStore';

export async function getAllowance(
	walletAddress: Address,
	contractAddress: Address,
	token: TokenMetadata,
	provider: BrowserProvider
) {
	const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
	try {
		const allowance = await tokenContract.allowance(walletAddress, contractAddress);
		return allowance;
	} catch (error: any) {
		addToast({
			message: {
				title: 'Error',
				description: `Error fetching ${token.currency} allowance from contract`
			},
			variant: 'error'
		});
		console.log(`error fetching ${token} allowance from contract :>> `, error);
		return 0n;
	}
}

export async function getBalanceOfToken(
	walletAddress: Address,
	contractAddress: Address,
	provider: BrowserProvider
) {
	const tokenContract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
	try {
		const balance = await tokenContract.balanceOf(walletAddress);
		return balance;
	} catch (error: any) {
		addToast({
			message: {
				title: 'Error',
				description: 'Error fetching token balance from contract'
			},
			variant: 'error'
		});
		console.log('error fetching token balance from contract :>> ', contractAddress, error);
		return 0n;
	}
}
