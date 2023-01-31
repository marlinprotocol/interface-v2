import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

let contractAbi: ContractAbi;
let contractAddresses: ContractAddress;
let provider: WalletStore['provider'];

walletStore.subscribe((value) => {
	provider = value.provider;
});
contractAbiStore.subscribe((value) => {
	contractAbi = value;
});
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function getContractDetails() {
	const url = ENVIRONMENT.public_contract_details_url;
	const options = GET_OPTIONS;
	// TODO: add type for contractDetails
	const contractDetails = await fetchHttpData(url, options);
	if (!contractDetails) {
		throw new Error('Unable to fetch contract details');
	}
	if (!contractDetails.ABI) {
		throw new Error('Unable to fetch contract ABI');
	}
	if (!contractDetails.addresses) {
		throw new Error('Unable to fetch contract addresses');
	} else {
		contractAbiStore.set(contractDetails?.ABI);
		contractAddressStore.set(contractDetails?.addresses);
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));
	}
}

export async function getStakingToken() {
	const recieverStakingContractAddress = contractAddresses?.ReceiverStaking;
	const recieverStakingContractAbi = contractAbi?.ReceiverStaking;
	const contract = new ethers.Contract(
		recieverStakingContractAddress,
		recieverStakingContractAbi,
		provider
	);
	const stakingToken = await contract.STAKING_TOKEN();
	console.log(stakingToken);
	return stakingToken;
}
