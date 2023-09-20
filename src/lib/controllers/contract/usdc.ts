import { BrowserProvider, ethers } from 'ethers';

import type { Address } from '@web3-onboard/core/dist/types';
import type { ContractAddress } from '$lib/types/storeTypes';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { contractAddressStore } from '$lib/data-stores/contractStore';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function getUsdcBalanceFromProvider(address: Address, provider: any) {
	const usdcContract = new ethers.Contract(contractAddresses.USDC, ERC20_ABI, provider);

	try {
		const balance = await usdcContract.balanceOf(address);
		return BigInt(balance);
	} catch (error: any) {
		console.log('error fetching usdc balance :>> ', error);
		return 0n;
	}
}

export async function getAllowance(
	walletAddress: Address,
	contractAddress: Address,
	token: TokenMetadata,
	provider: BrowserProvider
) {
	const tokenContract = new ethers.Contract(contractAddresses[token.currency], ERC20_ABI, provider);
	try {
		const allowance = await tokenContract.allowance(walletAddress, contractAddress);
		return allowance;
	} catch (error: any) {
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
		console.log(`error fetching balance from contract :>> `, contractAddress, error);
		return 0n;
	}
}
