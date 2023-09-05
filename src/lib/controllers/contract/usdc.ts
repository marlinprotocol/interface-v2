import { ethers } from 'ethers';

import type { Address } from '@web3-onboard/core/dist/types';
import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import type { ContractAddress } from '$lib/types/storeTypes';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
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
		return BIG_NUMBER_ZERO;
	}
}
