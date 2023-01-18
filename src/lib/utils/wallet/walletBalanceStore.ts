import { PUBLIC_MPOND_TOKEN_ADDRESS, PUBLIC_POND_TOKEN_ADDRESS } from '$env/static/public';
import { ethers } from 'ethers';
import { writable, type Writable } from 'svelte/store';
import { DEFAULT_WALLET_BALANCE } from '../constants/storeConstants';
import type { WalletBalance } from '../types/wallet';
import ERC20ABI from '../abi.json';

export const walletBalance: Writable<WalletBalance> = writable(DEFAULT_WALLET_BALANCE);

export function resetWalletBalance() {
	walletBalance.set(DEFAULT_WALLET_BALANCE);
}

export async function getPondBalance(
	provider: ethers.providers.Web3Provider,
	WalletAddress: string
) {
	console.log('fetching POND balance...');
	let pondBalance;
	const pondTokenContract = await new ethers.Contract(
		PUBLIC_POND_TOKEN_ADDRESS,
		ERC20ABI,
		provider
	);
	pondBalance = await pondTokenContract.balanceOf(WalletAddress);
	pondBalance = ethers.utils.formatEther(pondBalance);
	return pondBalance;
}

export async function getMpondBalance(
	provider: ethers.providers.Web3Provider,
	WalletAddress: string
) {
	console.log('fetching MPOND balance...');
	let mpondBalance;
	const mpondTokenContract = await new ethers.Contract(
		PUBLIC_MPOND_TOKEN_ADDRESS,
		ERC20ABI,
		provider
	);
	mpondBalance = await mpondTokenContract.balanceOf(WalletAddress);
	mpondBalance = ethers.utils.formatEther(mpondBalance);
	return mpondBalance;
}
