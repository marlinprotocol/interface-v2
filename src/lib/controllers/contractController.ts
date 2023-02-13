import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { bigNumberToCommaString } from '$lib/utils/conversion';
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

export async function depositStakingToken(amount: BigNumber) {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const recieverStakingContractAbi = contractAbi.ReceiverStaking;
	const recieverStakingContract = new ethers.Contract(
		recieverStakingContractAddress,
		recieverStakingContractAbi,
		signer
	);
	try {
		addToast({
			message: `Depositing ${bigNumberToCommaString(amount, 2)} POND.`,
			variant: 'info'
		});
		const Tx = await recieverStakingContract.deposit(amount);

		addToast({
			message: 'Transaction created, waiting for it to be mined.',
			variant: 'info'
		});
		const approveReciept = await Tx.wait();

		if (!approveReciept) {
			addToast({
				message: 'Uh-Oh, Transaction was not successful!',
				variant: 'error'
			});
			throw new Error('Unable to deposit staking token');
		}
		addToast({
			message: `Transaction successfully mined!. Deposited ${bigNumberToCommaString(
				amount,
				2
			)} POND.`,
			variant: 'success'
		});
	} catch (error: any) {
		addToast({
			message: 'Uh-Oh, Transaction was not successful!',
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while depositing staking token');
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
		addToast({
			message: `Withdrawing ${bigNumberToCommaString(amount, 2)} POND.`,
			variant: 'info'
		});
		const tx = await recieverStakingContract.withdraw(amount);

		addToast({
			message: 'Transaction created, waiting for it to be mined.',
			variant: 'info'
		});
		const approveReciept = await tx.wait();

		if (!approveReciept) {
			addToast({
				message: 'Uh-Oh, Transaction was not successful!',
				variant: 'error'
			});
			throw new Error('Unable to withdraw staking token');
		}
		addToast({
			message: `Transaction successfully mined! Withdrew ${bigNumberToCommaString(
				amount,
				2
			)} POND.`,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: 'Uh-Oh, Transaction was not successful!',
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while withdrawing staking token');
	}
}

// ----------------------------- POND contract methods -----------------------------

export async function approvePondTokenForReceiverStaking(amount: BigNumber) {
	const recieverStakingContractAddress = contractAddresses.ReceiverStaking;
	const pondTokenContractAddress = contractAddresses.tokens['POND'].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const pondTokenContract = new ethers.Contract(pondTokenContractAddress, ERC20ContractAbi, signer);
	try {
		addToast({
			message: `Approving ${bigNumberToCommaString(amount, 2)} POND.`,
			variant: 'info'
		});
		const tx = await pondTokenContract.approve(recieverStakingContractAddress, amount);

		addToast({
			message: 'Transaction created, waiting for it to be mined.',
			variant: 'info'
		});
		const approveReciept = await tx.wait();

		if (!approveReciept) {
			addToast({
				message: 'Uh-Oh, Transaction was not successful!',
				variant: 'error'
			});
			throw new Error('Unable to approve staking token');
		}
		addToast({
			message: `Transaction successfully mined! Approved ${bigNumberToCommaString(
				amount,
				2
			)} POND.`,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: 'Uh-Oh, Transaction was not successful!',
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while approving staking token');
	}
}
