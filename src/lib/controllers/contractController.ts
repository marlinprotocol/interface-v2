import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { CPInstances, CPUrlDataModel } from '$lib/types/oysterComponentType';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import {
	GET_OPTIONS,
	mPondPrecisions,
	oysterMarketAbi,
	pondPrecisions
} from '$lib/utils/constants/constants';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToCommaString } from '$lib/utils/conversion';
import { capitalizeFirstLetter, minifyAddress } from '$lib/utils/helpers/commonHelper';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber, ethers, type Bytes } from 'ethers';
import { get } from 'svelte/store';

let contractAbi: ContractAbi;
let contractAddresses: ContractAddress;
let provider: WalletStore['provider'];
let signer: WalletStore['signer'];
let walletAddress: WalletStore['address'];

// TODO: Souvik to check its implementation, throwing error rn
// walletStore.subscribe((value) => {
// 	provider = value.provider;
// 	signer = value.signer;
// 	walletAddress = value.address;
// });
// contractAbiStore.subscribe((value) => {
// 	contractAbi = value;
// });
// contractAddressStore.subscribe((value) => {
// 	contractAddresses = value;
// });

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
// TODO: ask if /spec is expected in the input of control place or we have to explicitly check
export async function getInstancesFromControlPlane(controlPlaneUrl: string) {
	const options = GET_OPTIONS;
	console.log('controlPlaneUrl :>> ', controlPlaneUrl);
	const instances: CPInstances = await fetchHttpData(controlPlaneUrl, options);
	if (!instances) {
		throw new Error('Unable to fetch instances');
	}
	const { min_rates } = instances;

	// transforming response data so that each object in the array
	// corresponds to a row in the table
	const ret: CPUrlDataModel[] = min_rates.flatMap((region) => {
		return region.rate_cards.map((rate) => {
			return {
				url: controlPlaneUrl,
				instanceType: rate.instance,
				region: region.region,
				vcpu: region.region, //TODO: replace with actual vcpu value
				memory: region.region, // TODO: replace with actual memory value
				min_rate: BigNumber.from(rate.min_rate)
			};
		});
	});
	return ret;
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
		const tx = await bridgeContract.getMpond(expectedMPond);

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
			throw new Error('Unable to convert POND to MPond.');
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			throw new Error('Unable to place request for converting MPond to POND.');
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error',
			timeout: 5000
		});

		throw new Error('Transaction Error while placing request for converting MPond to POND');
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
			throw new Error('Unable to convert POND to MPond.');
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
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
			throw new Error('Unable to convert MPond to POND.');
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
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while confirming conversion of MPOND to POND');
	}
}

// ----------------------------- Oyster contract methods -----------------------------

export async function registerOysterInfrastructureProvider(controlPlaneUrl: string) {
	// TODO: move oysterContractAddress to a config file
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERING,
			variant: 'info'
		});

		const tx = await oysterContract.providerAdd(controlPlaneUrl);

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
			throw new Error('Unable to register as Oyster Infrastructure Provider.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while registering as Oyster Infrastructure Provider');
	}
}

export async function updateOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.UPDATE.UPDATING,
			variant: 'info'
		});

		const tx = await oysterContract.providerUpdateWithCp(controlPlaneUrl);

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
			throw new Error('Unable to update Oyster Infrastructure Provider.');
		}
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.UPDATE.UPDATED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while updating Oyster Infrastructure Provider');
	}
}

export async function removeOysterInfrastructureProvider() {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.REMOVE.REMOVING,
			variant: 'info'
		});

		const tx = await oysterContract.providerRemove();

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
			throw new Error('Unable to remove Oyster Infrastructure Provider.');
		}
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while removing Oyster Infrastructure Provider');
	}
}

export async function createNewOysterJob(
	metadata: string,
	provider: string,
	rate: string,
	balance: string
) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATING,
			variant: 'info'
		});

		const tx = await oysterContract.jobOpen(metadata, provider, rate, balance);

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
			throw new Error('Unable to create new Oyster Job.');
		}
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while creating new Oyster Job');
	}
}

export async function stopOysterJob(jobId: Bytes) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPING,
			variant: 'info'
		});

		const tx = await oysterContract.jobClose(jobId);

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
			throw new Error('Unable to stop Oyster Job.');
		}
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while stopping Oyster Job');
	}
}

export async function withdrawFundsFromOysterJob(jobId: Bytes, amount: BigNumber) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWING,
			variant: 'info'
		});

		const tx = await oysterContract.jobWithdraw(jobId, amount);

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
			throw new Error('Unable to withdraw funds from Oyster Job.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWN,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while withdrawing funds from Oyster Job');
	}
}

export async function approveFundsForOysterJobAdd(amount: BigNumber) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	// TODO: check token, its is POND on testnet
	const token = 'POND';
	const pondTokenContractAddress = contractAddresses.tokens[token].address;
	const ERC20ContractAbi = contractAbi.ERC20;
	const pondTokenContract = new ethers.Contract(pondTokenContractAddress, ERC20ContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.APPROVING(
				bigNumberToCommaString(amount, pondPrecisions),
				token
			),
			variant: 'info'
		});
		const tx = await pondTokenContract.approve(oysterContractAddress, amount);

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
				MESSAGES.TOAST.ACTIONS.APPROVE.APPROVED(
					bigNumberToCommaString(amount, pondPrecisions),
					token
				),
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while approving staking token');
	}
}

export async function addFundsToOysterJob(jobId: Bytes, amount: BigNumber) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.ADDING_FUNDS,
			variant: 'info'
		});

		const tx = await oysterContract.jobDeposit(jobId, amount);

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
			throw new Error('Unable to add funds to Oyster Job.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while adding funds to Oyster Job');
	}
}

export async function initiateAmendRateOfOysterJob(jobId: Bytes, rate: BigNumber) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATING,
			variant: 'info'
		});

		const tx = await oysterContract.jobReviseRateInitiate(jobId, rate);

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
			throw new Error('Unable to initiate rate revision for Oyster Job.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while initiating rate revision for Oyster Job');
	}
}

export async function finaliseAmendRateOfOysterJob(jobId: Bytes) {
	const oysterContractAddress = '0x0F5F91BA30a00bD43Bd19466f020B3E5fc7a49ec';
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDING,
			variant: 'info'
		});

		const tx = await oysterContract.jobReviseRateFinalize(jobId);

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
			throw new Error('Unable to finalise rate revision for Oyster Job.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDED,
			variant: 'success'
		});
		return tx;
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error('Transaction Error while finalising rate revision for Oyster Job');
	}
}
