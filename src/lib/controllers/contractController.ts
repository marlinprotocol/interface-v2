import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber, ethers } from 'ethers';
import { get } from 'svelte/store';

let contractAbi: ContractAbi;
let contractAddresses: ContractAddress;
let provider: WalletStore['provider'];
let signer: WalletStore['signer'];

walletStore.subscribe((value) => {
	provider = value.provider;
	signer = value.signer;
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
		contractAbiStore.set(contractDetails.ABI);
		contractAddressStore.set(contractDetails.addresses);
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));
	}
}

// ----------------------------- reciever staking contract methods -----------------------------

export async function getStakingToken() {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const recieverStakingContractAbi = contractAbi.ReceiverStaking;
	const recieverStakingContract = new ethers.Contract(
		recieverStakingContractAddress,
		recieverStakingContractAbi,
		provider
	);
	const stakingToken = await recieverStakingContract.STAKING_TOKEN();
	console.log(stakingToken);
	return stakingToken;
}

export async function depositStakingToken(amount: BigNumber) {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const recieverStakingContractAbi = contractAbi.ReceiverStaking;
	const recieverStakingContract = new ethers.Contract(
		recieverStakingContractAddress,
		recieverStakingContractAbi,
		signer
	);
	try {
		// TODO: add toasts for transaction status
		// create the transaction
		const Tx = await recieverStakingContract.deposit(amount);
		// wait for the transaction to be mined
		const approveReciept = await Tx.wait();
		// transaction was mined
		if (!approveReciept) {
			throw new Error('Unable to deposit staking token');
		}
	} catch (error) {
		console.log('Error while depositing staking token');
		console.log(error);
	}
}

export async function withdrawStakingToken(amount: BigNumber) {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const recieverStakingContractAbi = contractAbi.ReceiverStaking;
	const recieverStakingContract = new ethers.Contract(
		recieverStakingContractAddress,
		recieverStakingContractAbi,
		signer
	);
	try {
		// TODO: add toasts for transaction status
		// create the transaction
		const tx = await recieverStakingContract.withdraw(amount);
		// wait for the transaction to be mined
		const approveReciept = await tx.wait();
		if (!approveReciept) {
			throw new Error('Unable to withdraw staking token');
		}
		// transaction was mined
		return tx;
	} catch (error) {
		console.log('Error while withdrawing staking token');
		console.log(error);
	}
}

// ----------------------------- POND contract methods -----------------------------

export async function approvePondTokenForStaking(amount: BigNumber) {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const pondTokenContractAddress = contractAddresses.tokens['POND'].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const pondTokenContract = new ethers.Contract(pondTokenContractAddress, ERC20ContractAbi, signer);
	try {
		// TODO: add toasts for transaction status
		// create the transaction
		const tx = await pondTokenContract.approve(recieverStakingContractAddress, amount);
		// wait for the transaction to be mined
		const approveReciept = await tx.wait();
		if (!approveReciept) {
			throw new Error('Unable to approve staking token');
		}
		// transaction was mined
		return tx;
	} catch (error) {
		console.log('Error while approving staking token');
		console.log(error);
	}
}
