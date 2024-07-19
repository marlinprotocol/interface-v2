import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import type { ContractAddress } from '$lib/types/storeTypes';
import { COMMON_TXN_MESSAGES, RECEIVER_STAKING_TXN_MESSAGES } from '$lib/utils/constants/messages';
import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
import { RECEIVER_STAKING_ABI } from '$lib/utils/abis/receiverStaking';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import { minifyAddress } from '$lib/utils/helpers/commonHelper';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function setSignerAddress(address: string) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const parentFunctionName = 'setSignerAddress';
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.UPDATE_SIGNER.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.UPDATE_SIGNER.CREATED.description(
					minifyAddress(address)
				)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.UPDATE_SIGNER.SUCCESS.description(
					minifyAddress(address)
				)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.UPDATE_SIGNER.FAILED.description(
					minifyAddress(address)
				)
			}
		};
		const { txn } = await createTransaction(
			() => receiverStakingContract.setSigner(address),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function depositStakingToken(amount: bigint) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const parentFunctionName = 'depositStakingToken';
		const amountInString = bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS);
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_STAKE.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_STAKE.CREATED.description(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_STAKE.SUCCESS.description(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_STAKE.FAILED.description(amountInString)
			}
		};
		const { txn } = await createTransaction(
			() => receiverStakingContract.deposit(amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}
export async function depositStakingTokenAndSetSigner(amount: bigint, signerAddress = '') {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const parentFunctionName = 'depositStakingTokenAndSetSigner';
		const amountInString = bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS);
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_AND_SET_SIGNER.INITIATED.description
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_AND_SET_SIGNER.CREATED.description(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_AND_SET_SIGNER.SUCCESS.description(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.DEPOSIT_AND_SET_SIGNER.FAILED.description(amountInString)
			}
		};
		const { txn } = await createTransaction(
			() => receiverStakingContract.depositAndSetSigner(amount, signerAddress),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error) {
		throw new Error('Transaction Error');
	}
}

export async function withdrawStakingToken(amount: bigint) {
	const receiverStakingContract = createSignerContract(
		contractAddresses.RECEIVER_STAKING,
		RECEIVER_STAKING_ABI
	);
	try {
		const parentFunctionName = 'withdrawStakingToken';
		const amountInString = bigNumberToString(amount, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS);
		const messages = {
			initiate: {
				title: COMMON_TXN_MESSAGES.INITIATED.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.WITHDRAW_STAKE.INITIATED.description(amountInString)
			},
			created: {
				title: COMMON_TXN_MESSAGES.CREATED.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.WITHDRAW_STAKE.CREATED.description(amountInString)
			},
			success: {
				title: COMMON_TXN_MESSAGES.SUCCESS.title,
				description:
					RECEIVER_STAKING_TXN_MESSAGES.WITHDRAW_STAKE.SUCCESS.description(amountInString)
			},
			failed: {
				title: COMMON_TXN_MESSAGES.FAILED.title,
				description: RECEIVER_STAKING_TXN_MESSAGES.WITHDRAW_STAKE.FAILED.description(amountInString)
			}
		};
		const { txn } = await createTransaction(
			() => receiverStakingContract.withdraw(amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
