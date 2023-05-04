import { contractAbiStore, contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { ContractAbi, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import { mPondPrecisions, oysterMarketAbi, pondPrecisions } from '$lib/utils/constants/constants';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToCommaString } from '$lib/utils/conversion';
import { capitalizeFirstLetter, minifyAddress } from '$lib/utils/helpers/commonHelper';
import { BigNumber, ethers, type Bytes } from 'ethers';

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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	rate: BigNumber,
	balance: BigNumber
) {
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
		const jobOpenEvent = approveReciept.events?.find((event: any) => event.event === 'JobOpened');
		const jobId = jobOpenEvent?.args?.job;
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATED,
			variant: 'success'
		});
		return {
			jobId,
			txHash: tx.hash
		};
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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	// TODO: check token on mainnet, its POND on testnet
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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

export async function initiateRateReviseOysterJob(jobId: Bytes, rate: BigNumber) {
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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

export async function cancelRateReviseOysterJob(jobId: Bytes) {
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLING,
			variant: 'info'
		});

		const tx = await oysterContract.jobReviseRateCancel(jobId);

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
			throw new Error('Unable to cancel rate revision for Oyster Job.');
		}
		addToast({
			message:
				MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLED,
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
		throw new Error('Transaction Error while cancelling rate revision for Oyster Job');
	}
}

export async function finaliseRateReviseOysterJob(jobId: Bytes) {
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
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

export async function settleOysterJob(jobId: Bytes) {
	const oysterContractAddress = ENVIRONMENT.public_oyster_contract_address;
	const oysterContractAbi = oysterMarketAbi;
	const oysterContract = new ethers.Contract(oysterContractAddress, oysterContractAbi, signer);
	try {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLING,
			variant: 'info'
		});

		const tx = await oysterContract.jobSettle(jobId);

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
			throw new Error('Unable to settle Oyster Job.');
		}
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLED,
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
		throw new Error('Transaction Error while settling Oyster Job');
	}
}
