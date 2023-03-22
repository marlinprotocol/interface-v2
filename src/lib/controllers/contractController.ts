import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { Address, ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { GET_OPTIONS, mPondPrecisions, pondPrecisions } from '$lib/utils/constants/constants';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToCommaString } from '$lib/utils/conversion';
import { minifyAddress } from '$lib/utils/helpers/commonHelper';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber, ethers } from 'ethers';
import { get } from 'svelte/store';

let contractAbi: ContractAbi;
let contractAddresses: ContractAddress;
let provider: WalletStore['provider'];
let signer: WalletStore['signer'];
let walletAddress: WalletStore['address'];

walletStore.subscribe((value) => {
	provider = value.provider;
	signer = value.signer;
	walletAddress = value.address;
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
		contractAbiStore.update((value) => {
			return {
				...value,
				ClusterRegistry: contractDetails.ABI.ClusterRegistry,
				ERC20: contractDetails.ABI.ERC20,
				EpochSelector: contractDetails.ABI.EpochSelector,
				MPond: contractDetails.ABI.MPond,
				ReceiverStaking: contractDetails.ABI.ReceiverStaking,
				RewardDelegators: contractDetails.ABI.RewardDelegators,
				StakeManager: contractDetails.ABI.StakeManager
			};
		});
		contractAddressStore.update((value) => {
			return {
				...value,
				ClusterRegistry: contractDetails.addresses.ClusterRegistry,
				ClusterRewards: contractDetails.addresses.ClusterRewards,
				EpochSelector: contractDetails.addresses.EpochSelector,
				ReceiverStaking: contractDetails.addresses.ReceiverStaking,
				RewardDelegators: contractDetails.addresses.RewardDelegators,
				StakeManager: contractDetails.addresses.StakeManager,
				tokens: contractDetails.addresses.tokens
			};
		});
		console.log('contractAbiStore', get(contractAbiStore));
		console.log('contractAddressStore', get(contractAddressStore));
	}
}

export async function getBridgeContractDetails() {
	const url = ENVIRONMENT.public_bridge_contract_details_url;
	const options = GET_OPTIONS;

	const bridgeContractDetails = await fetchHttpData(url, options);
	if (!bridgeContractDetails) {
		throw new Error('Unable to fetch bridge contract details');
	}
	if (!bridgeContractDetails.ABI) {
		throw new Error('Unable to fetch bridge contract ABI');
	}
	if (!bridgeContractDetails.addresses) {
		throw new Error('Unable to fetch bridge contract addresses');
	} else {
		console.log('bridgeContractDetails', bridgeContractDetails);
		contractAbiStore.update((value) => {
			return {
				...value,
				Bridge: bridgeContractDetails.ABI.Bridge
			};
		});
		contractAddressStore.update((value) => {
			return {
				...value,
				Bridge: bridgeContractDetails.addresses.bridge,
				tokens: bridgeContractDetails.addresses.tokens
			};
		});
		console.log(get(contractAbiStore));
		console.log(get(contractAddressStore));
	}
}

// ----------------------------- receiver staking contract methods -----------------------------

export async function setSignerAddress(address: string) {
	const receiverStakingContractAddress = contractAddresses.ReceiverStaking;
	const receiverStakingContractAbi = contractAbi.ReceiverStaking;
	const receiverStakingContract = new ethers.Contract(
		receiverStakingContractAddress,
		receiverStakingContractAbi,
		signer
	);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.UPDATING(minifyAddress(address)),
			variant: 'info'
		});
		const tx = await receiverStakingContract.setSigner(address);

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
			throw new Error('Unable to update signer address');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.SUCCESS(minifyAddress(address)),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while updating signer address');
	}
}

export async function depositStakingToken(amount: BigNumber, signerAddress = '') {
	const receiverStakingContractAddress = contractAddresses.ReceiverStaking;
	const receiverStakingContractAbi = contractAbi.ReceiverStaking;
	const receiverStakingContract = new ethers.Contract(
		receiverStakingContractAddress,
		receiverStakingContractAbi,
		signer
	);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(bigNumberToCommaString(amount, pondPrecisions)),
			variant: 'info'
		});

		const tx =
			signerAddress === ''
				? await receiverStakingContract.deposit(amount)
				: await receiverStakingContract.depositAndSetSigner(amount, signerAddress);

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
			throw new Error('Unable to deposit staking token');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(
					bigNumberToCommaString(amount, pondPrecisions)
				),
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
			message: MESSAGES.TOAST.ACTIONS.WITHDRAW.POND(bigNumberToCommaString(amount, pondPrecisions)),
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
				MESSAGES.TOAST.ACTIONS.WITHDRAW.POND_WITHDREW(
					bigNumberToCommaString(amount, pondPrecisions)
				),
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
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(bigNumberToCommaString(amount, pondPrecisions)),
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
				MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(
					bigNumberToCommaString(amount, pondPrecisions)
				),
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

export async function approvePondTokenForConversion(amount: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const pondTokenContractAddress = contractAddresses.tokens['POND'].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const pondTokenContract = new ethers.Contract(pondTokenContractAddress, ERC20ContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(bigNumberToCommaString(amount, pondPrecisions)),
			variant: 'info'
		});
		const tx = await pondTokenContract.approve(bridgeContractAddress, amount);

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
				MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(
					bigNumberToCommaString(amount, pondPrecisions)
				),
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

export async function approveMPondTokenForConversion(amount: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const mPondTokenContractAddress = contractAddresses.tokens['MPOND'].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const mPondTokenContract = new ethers.Contract(
		mPondTokenContractAddress,
		ERC20ContractAbi,
		signer
	);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.MPOND(
				bigNumberToCommaString(amount, mPondPrecisions)
			),
			variant: 'info'
		});
		const tx = await mPondTokenContract.approve(bridgeContractAddress, amount);

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
				MESSAGES.TOAST.ACTIONS.APPROVE.MPOND_APPROVED(
					bigNumberToCommaString(amount, mPondPrecisions)
				),
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

export async function convertPondToMPond(expectedMPond: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const bridgeContractAbi = contractAbi.Bridge;
	const bridgeContract = new ethers.Contract(bridgeContractAddress, bridgeContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTING(
				bigNumberToCommaString(expectedMPond, mPondPrecisions)
			),
			variant: 'info'
		});
		const tx = await bridgeContract.getMPond(expectedMPond);

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
			throw new Error('Unable to convert Pond to MPond.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTED(
					bigNumberToCommaString(expectedMPond, mPondPrecisions)
				),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while converting pond to mPond');
	}
}

export async function requestMPondConversion(amount: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const bridgeContractAbi = contractAbi.Bridge;
	const bridgeContract = new ethers.Contract(bridgeContractAddress, bridgeContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTING(
				bigNumberToCommaString(amount, mPondPrecisions)
			),
			variant: 'info'
		});

		const tx = await bridgeContract.placeRequest(amount);

		console.log('tx :>> ', tx);
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});
		const approveReciept = await tx.wait();

		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error',
				timeout: 5000
			});
			throw new Error('Unable to place request for converting MPond to Pond.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTED(
					bigNumberToCommaString(amount, mPondPrecisions)
				),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason ? error.reason : MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error',
			timeout: 5000
		});

		throw new Error('Transaction Error while placing request for converting MPond to Pond');
	}
}

export async function cancelMPondConversionRequest(epoch: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const bridgeContractAbi = contractAbi.Bridge;
	const bridgeContract = new ethers.Contract(bridgeContractAddress, bridgeContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLING,
			variant: 'info'
		});

		console.log('epochepoch :>> ', epoch);
		const tx = await bridgeContract.cancelRequest(epoch);

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
			throw new Error('Unable to convert Pond to MPond.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while placing request for converting MPOND to POND');
	}
}

export async function confirmMPondConversion(epoch: BigNumber, amount: BigNumber) {
	const bridgeContractAddress = contractAddresses.Bridge;
	const bridgeContractAbi = contractAbi.Bridge;
	const bridgeContract = new ethers.Contract(bridgeContractAddress, bridgeContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTING(
				bigNumberToCommaString(amount, mPondPrecisions)
			),
			variant: 'info'
		});

		const tx = await bridgeContract.convert(epoch, amount);

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
			throw new Error('Unable to convert MPond to Pond.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS +
				' ' +
				MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTED(
					bigNumberToCommaString(amount, mPondPrecisions)
				),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while confirming conversion of MPOND to POND');
	}
}
