import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { GET_OPTIONS } from '$lib/utils/constants/constants';
import { MESSAGES } from '$lib/utils/constants/messages';
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

// ----------------------------- receiver staking contract methods -----------------------------

export async function depositStakingToken(amount: BigNumber, signerAddress: string) {
	const receiverStakingContractAddress = contractAddresses.ReceiverStaking;
	const receiverStakingContractAbi = contractAbi.ReceiverStaking;
	const receiverStakingContract = new ethers.Contract(
		receiverStakingContractAddress,
		receiverStakingContractAbi,
		signer
	);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(bigNumberToCommaString(amount)),
			variant: 'info'
		});

		const Tx = await receiverStakingContract['deposit(uint256,address)'](amount, signerAddress);

		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});
		const approveReciept = await Tx.wait();

		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error'
			});
			throw new Error('Unable to deposit staking token');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(bigNumberToCommaString(amount)),
			variant: 'success'
		});
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while depositing staking token');
	}
}

export async function withdrawStakingToken(amount: BigNumber) {
	const receiverStakingContractAddress = contractAddresses.ReceiverStaking;
	const receiverStakingContractAbi = contractAbi.ReceiverStaking;
	const receiverStakingContract = new ethers.Contract(
		receiverStakingContractAddress,
		receiverStakingContractAbi,
		signer
	);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.WITHDRAW.POND(bigNumberToCommaString(amount)),
			variant: 'info'
		});
		const tx = await receiverStakingContract.withdraw(amount);

		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});
		const approveReciept = await tx.wait();

		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error'
			});
			throw new Error('Unable to withdraw staking token');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.WITHDRAW.POND_WITHDREW(bigNumberToCommaString(amount)),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while withdrawing staking token');
	}
}

// ----------------------------- POND contract methods -----------------------------

export async function approvePondTokenForReceiverStaking(amount: BigNumber) {
	const receiverStakingContractAddress = contractAddresses.ReceiverStaking;
	const pondTokenContractAddress = contractAddresses.tokens['POND'].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const pondTokenContract = new ethers.Contract(pondTokenContractAddress, ERC20ContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(bigNumberToCommaString(amount)),
			variant: 'info'
		});
		const tx = await pondTokenContract.approve(receiverStakingContractAddress, amount);

		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});
		const approveReciept = await tx.wait();

		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error'
			});
			throw new Error('Unable to approve staking token');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(bigNumberToCommaString(amount)),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while approving staking token');
	}
}
