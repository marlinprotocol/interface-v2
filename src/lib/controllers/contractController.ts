import { contractAddressStore } from '$lib/data-stores/contractStore';
import { addToast } from '$lib/data-stores/toastStore';
import { walletStore } from '$lib/data-stores/walletProviderStore';
import type { Address, ContractAddress, WalletStore } from '$lib/types/storeTypes';
import {
	DEFAULT_CURRENCY_DECIMALS,
	MPOND_PRECISIONS,
	POND_PRECISIONS
} from '$lib/utils/constants/constants';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToCommaString, bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { capitalizeFirstLetter, minifyAddress } from '$lib/utils/helpers/commonHelper';
import { BigNumber, ethers, type Bytes } from 'ethers';
import { OYSTER_RATE_METADATA } from '$lib/utils/constants/oysterConstants';
import { RECEIVER_STAKING_ABI } from '$lib/utils/abis/receiverStaking';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import { BRIDGE_ABI } from '$lib/utils/abis/bridge';
import { OYSTER_MARKET_ABI } from '$lib/utils/abis/oysterMarket';

let contractAddresses: ContractAddress;
let signer: WalletStore['signer'];

walletStore.subscribe((value) => {
	signer = value.signer;
});
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

function createSignerContract(contractAddress: Address, contractAbi: any) {
	return new ethers.Contract(contractAddress, contractAbi, signer);
}

async function createTransaction(
	contractFunctionCall: () => Promise<any>,
	initiateTxnMessage: string,
	successTxnMessage: string,
	errorTxnMessage: string,
	parentFunctionName: string
) {
	try {
		addToast({
			message: initiateTxnMessage,
			variant: 'info'
		});

		const txn = await contractFunctionCall();

		addToast({
			message: MESSAGES.TOAST.TRANSACTION.CREATED,
			variant: 'info'
		});

		// waiting for the transaction to be mined
		const approveReciept = await txn.wait();

		// if the transaction is not mined, throw an error and show a toast
		if (!approveReciept) {
			addToast({
				message: MESSAGES.TOAST.TRANSACTION.FAILED,
				variant: 'error'
			});
			throw new Error(errorTxnMessage);
		}

		// if the transaction is mined, show a toast with success message and return the txn
		addToast({
			message: MESSAGES.TOAST.TRANSACTION.SUCCESS + ' ' + successTxnMessage,
			variant: 'success'
		});
		return { txn: txn, approveReciept: approveReciept };
	} catch (error: any) {
		addToast({
			message: error.reason
				? capitalizeFirstLetter(error.reason)
				: MESSAGES.TOAST.TRANSACTION.FAILED,
			variant: 'error'
		});
		console.log('error :>> ', error);
		throw new Error(`Transaction Error while creating transaction for ${parentFunctionName}`);
	}
}
// ----------------------------- receiver staking contract methods -----------------------------

export async function setSignerAddress(address: string) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.UPDATING(
			minifyAddress(address)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE_SIGNER.SUCCESS(minifyAddress(address));
		const errorTxnMessage = 'Unable to update signer address';
		const parentFunctionName = 'setSignerAddress';

		const { txn } = await createTransaction(
			() => receiverStakingContract.setSigner(address),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function depositStakingToken(amount: BigNumber) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to deposit staking token';
		const parentFunctionName = 'depositStakingToken';

		const { txn } = await createTransaction(
			() => receiverStakingContract.deposit(amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}
export async function depositStakingTokenAndSetSigner(amount: BigNumber, signerAddress = '') {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.DEPOSIT.POND_DEPOSITED(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to deposit staking token and set signer';
		const parentFunctionName = 'depositStakingTokenAndSetSigner';

		const { txn } = await createTransaction(
			() => receiverStakingContract.depositAndSetSigner(amount, signerAddress),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function withdrawStakingToken(amount: BigNumber) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW.POND(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW.POND_WITHDREW(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to withdraw staking token';
		const parentFunctionName = 'withdrawStakingToken';

		const { txn } = await createTransaction(
			() => receiverStakingContract.withdraw(amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// ----------------------------- POND contract methods -----------------------------

// approval in pond contract so that the receiver staking contract can spend our pond
export async function approvePondTokenForReceiverStaking(amount: BigNumber) {
	const pondTokenContract = createSignerContract(contractAddresses.POND, ERC20_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approvePondTokenForReceiverStaking';

		const { txn } = await createTransaction(
			() => pondTokenContract.approve(contractAddresses.RECEIVER_STAKING, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// approval in pond contract so that the receiver rewards contract can spend our pond
export async function approvePondTokenForReceiverRewards(amount: BigNumber) {
	const pondTokenContract = createSignerContract(contractAddresses.POND, contractAbi.ERC20);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(
			bigNumberToCommaString(amount, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approvePondTokenForReceiverRewards';

		const { txn } = await createTransaction(
			() => pondTokenContract.approve(contractAddresses.REWARD_DELEGATORS, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// approval in pond contract so that the bridge contract can spend our pond
export async function approvePondTokenForConversion(amount: BigNumber) {
	const pondTokenContract = createSignerContract(contractAddresses.POND, ERC20_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.POND_APPROVED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approvePondTokenForConversion';

		const { txn } = await createTransaction(
			() => pondTokenContract.approve(contractAddresses.BRIDGE, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// approval in mpond contract so that the bridge contract can spend our mpond
export async function approveMPondTokenForConversion(amount: BigNumber) {
	const mPondTokenContract = createSignerContract(contractAddresses.POND, ERC20_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.MPOND(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.MPOND_APPROVED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approveMPondTokenForConversion';

		const { txn } = await createTransaction(
			() => mPondTokenContract.approve(contractAddresses.BRIDGE, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function convertPondToMPond(expectedMPond: BigNumber) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTING(
			bigNumberToString(expectedMPond, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.POND_TO_MPOND_CONVERTED(
			bigNumberToString(expectedMPond, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to convert POND to MPond';
		const parentFunctionName = 'convertPondToMPond';

		const { txn } = await createTransaction(
			() => bridgeContract.getMpond(expectedMPond),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function requestMPondConversion(amount: BigNumber) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTING(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_REQUESTED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to place request for converting MPond to POND.';
		const parentFunctionName = 'requestMPondConversion';

		const { txn } = await createTransaction(
			() => bridgeContract.placeRequest(amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function cancelMPondConversionRequest(epoch: BigNumber) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REQUEST.MPOND_TO_POND_CANCELLED;
		const errorTxnMessage = 'Unable to cancel request for converting MPond to POND.';
		const parentFunctionName = 'cancelMPondConversionRequest';

		const { txn } = await createTransaction(
			() => bridgeContract.cancelRequest(epoch),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function confirmMPondConversion(epoch: BigNumber, amount: BigNumber) {
	const bridgeContract = createSignerContract(contractAddresses.BRIDGE, BRIDGE_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTING(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CONVERT.MPOND_TO_POND_CONVERTED(
			bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to convert MPond to POND.';
		const parentFunctionName = 'confirmMPondConversion';

		const { txn } = await createTransaction(
			() => bridgeContract.convert(epoch, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// ----------------------------- Oyster contract methods -----------------------------

export async function registerOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REGISTER.REGISTERED;
		const errorTxnMessage = 'Unable to register as Oyster Infrastructure Provider.';
		const parentFunctionName = 'registerOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerAdd(controlPlaneUrl),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function updateOysterInfrastructureProvider(controlPlaneUrl: string) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.UPDATE.UPDATED;
		const errorTxnMessage = 'Unable to update Oyster Infrastructure Provider.';
		const parentFunctionName = 'updateOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerUpdateWithCp(controlPlaneUrl),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function removeOysterInfrastructureProvider() {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.REMOVE.REMOVED;
		const errorTxnMessage = 'Unable to remove Oyster Infrastructure Provider.';
		const parentFunctionName = 'removeOysterInfrastructureProvider';

		const { txn } = await createTransaction(
			() => oysterContract.providerRemove(),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function createNewOysterJob(
	metadata: string,
	provider: string,
	rate: BigNumber,
	balance: BigNumber
) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.CREATE_JOB.CREATED;
		const errorTxnMessage = 'Unable to create new Oyster Job.';
		const parentFunctionName = 'createNewOysterJob';
		const { txn, approveReciept } = await createTransaction(
			() => oysterContract.jobOpen(metadata, provider, rate, balance),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return {
			txn,
			approveReciept
		};
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function stopOysterJob(jobId: Bytes) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.STOP_JOB.STOPPED;
		const errorTxnMessage = 'Unable to stop Oyster Job.';
		const parentFunctionName = 'stopOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobClose(jobId),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function withdrawFundsFromOysterJob(jobId: Bytes, amount: BigNumber) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.WITHDRAW_JOB.WITHDRAWN;
		const errorTxnMessage = 'Unable to withdraw funds from Oyster Job.';
		const parentFunctionName = 'withdrawFundsFromOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobWithdraw(jobId, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// approval in pond contract so that the oyster contract can spend pond
export async function approveFundsForOysterJobAdd(amount: BigNumber) {
	const token = OYSTER_RATE_METADATA.currency;
	const pondTokenContract = createSignerContract(contractAddresses[token], ERC20_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVING(
			bigNumberToString(amount, OYSTER_RATE_METADATA.decimal, OYSTER_RATE_METADATA.precision, true),
			token
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVED(
			bigNumberToString(amount, OYSTER_RATE_METADATA.decimal, OYSTER_RATE_METADATA.precision, true),
			token
		);
		const errorTxnMessage = 'Unable to approve funds for Oyster Job.';
		const parentFunctionName = 'approveFundsForOysterJobAdd';

		const { txn } = await createTransaction(
			() => pondTokenContract.approve(contractAddresses.OYSTER, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function addFundsToOysterJob(jobId: Bytes, amount: BigNumber) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.ADDING_FUNDS;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.ADD_FUNDS_JOB.FUNDS_ADDED;
		const errorTxnMessage = 'Unable to add funds to Oyster Job.';
		const parentFunctionName = 'addFundsToOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobDeposit(jobId, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function initiateRateReviseOysterJob(jobId: Bytes, rate: BigNumber) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED;
		const errorTxnMessage = 'Unable to initiate rate revision for Oyster Job.';
		const parentFunctionName = 'initiateRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateInitiate(jobId, rate),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function cancelRateReviseOysterJob(jobId: Bytes) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.CANCELLED;
		const errorTxnMessage = 'Unable to cancel rate revision for Oyster Job.';
		const parentFunctionName = 'cancelRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateCancel(jobId),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function finaliseRateReviseOysterJob(jobId: Bytes) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.AMENDED;
		const errorTxnMessage = 'Unable to finalise rate revision for Oyster Job.';
		const parentFunctionName = 'finaliseRateReviseOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobReviseRateFinalize(jobId),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

export async function settleOysterJob(jobId: Bytes) {
	const oysterContract = createSignerContract(contractAddresses.OYSTER, OYSTER_MARKET_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.SETTLE_JOB.SETTLED;
		const errorTxnMessage = 'Unable to settle Oyster Job.';
		const parentFunctionName = 'settleOysterJob';

		const { txn } = await createTransaction(
			() => oysterContract.jobSettle(jobId),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}

// ----------------------------- Receiver Rewards contract methods -----------------------------

export async function initiateReceiverRewards(rewardBalance: BigNumber, rewardPerEpoch: BigNumber) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		contractAbi.RewardDelegators
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.INITIATING;
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.INITIATED;
		const errorTxnMessage = 'Unable to initiate receiver rewards.';
		const parentFunctionName = 'initiateReceiverRewards';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setupReceiverReward(rewardBalance, rewardPerEpoch),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
export async function addReceiverBalance(receiverAddress: Address, rewardBalance: BigNumber) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		contractAbi.RewardDelegators
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATING_REWARDS(
			bigNumberToCommaString(rewardBalance, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATED_REWARDS(
			bigNumberToCommaString(rewardBalance, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to add receiver balance.';
		const parentFunctionName = 'addReceiverBalance';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.addReceiverBalance(receiverAddress, rewardBalance),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
export async function updateReceiverTicketReward(rewardPerEpoch: BigNumber) {
	const rewardDelegatorContract = createSignerContract(
		contractAddresses.REWARD_DELEGATORS,
		contractAbi.RewardDelegators
	);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATING_REWARDS(
			bigNumberToCommaString(rewardPerEpoch, POND_PRECISIONS)
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.RECEIVER_REWARDS.UPDATED_REWARDS(
			bigNumberToCommaString(rewardPerEpoch, POND_PRECISIONS)
		);
		const errorTxnMessage = 'Unable to update ticket rewards.';
		const parentFunctionName = 'updateReceiverTicketReward';

		const { txn } = await createTransaction(
			() => rewardDelegatorContract.setReceiverRewardPerEpoch(rewardPerEpoch),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);

		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
